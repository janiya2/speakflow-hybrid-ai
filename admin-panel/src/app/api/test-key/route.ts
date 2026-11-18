import { NextRequest, NextResponse } from "next/server";

interface TestKeyResult {
  apiKey: string;
  success: boolean;
  workingModel?: string;
  apiVersion?: string;
  reply?: string;
  keyType?: string;
  error?: string;
  status?: string | number;
  isRateLimited?: boolean;
  isQuotaExhausted?: boolean;
  latencyMs?: number;
}

async function testSingleKey(apiKey: string, model: string = "gemini-3.5-flash"): Promise<TestKeyResult> {
  const cleanKey = apiKey.trim();
  if (!cleanKey) {
    return { apiKey, success: false, error: "Empty key" };
  }

  const candidateModels = [
    model === "smart-routing" ? "gemini-3.5-flash" : model,
    "gemini-3.5-flash",
    "gemini-3.8-flash",
    "gemini-2.5-flash",
    "gemini-flash-latest",
  ];

  const endpointsToTry = ["v1beta", "v1"];
  let lastError: any = null;
  const start = performance.now();

  for (const apiVersion of endpointsToTry) {
    for (const targetModel of candidateModels) {
      try {
        const url = `https://generativelanguage.googleapis.com/${apiVersion}/models/${targetModel}:generateContent?key=${cleanKey}`;
        
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: "Ping test. Reply with: 'Gemini Active'",
                  },
                ],
              },
            ],
            generationConfig: {
              maxOutputTokens: 20,
              temperature: 0.2,
            },
          }),
        });

        const latencyMs = Math.round(performance.now() - start);
        const data = await response.json();

        if (response.ok) {
          const reply =
            data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
            "Verified successfully!";
          return {
            apiKey: cleanKey,
            success: true,
            workingModel: targetModel,
            apiVersion,
            reply,
            latencyMs,
            keyType: cleanKey.startsWith("AQ.") ? "Prepaid Paid Key (AQ)" : "Standard Free Tier Key (AIza)",
          };
        } else {
          lastError = data?.error || { message: `HTTP ${response.status}`, code: response.status };
          const errorMsg = (lastError.message || "").toLowerCase();
          const isRateLimited = response.status === 429 || errorMsg.includes("rate") || errorMsg.includes("429");
          const isQuotaExhausted = errorMsg.includes("quota") || errorMsg.includes("resource_exhausted");

          if (isRateLimited || isQuotaExhausted) {
            return {
              apiKey: cleanKey,
              success: false,
              isRateLimited,
              isQuotaExhausted,
              latencyMs,
              error: isQuotaExhausted ? "Quota Exceeded (Free limit reached)" : "Rate Limited (429 Too Many Requests)",
              status: response.status,
              keyType: cleanKey.startsWith("AQ.") ? "Prepaid Paid Key (AQ)" : "Standard Free Tier Key (AIza)",
            };
          }
        }
      } catch (e: any) {
        lastError = { message: e.message };
      }
    }
  }

  const latencyMs = Math.round(performance.now() - start);
  return {
    apiKey: cleanKey,
    success: false,
    latencyMs,
    error: lastError?.message || "Failed to authenticate with Gemini API",
    status: lastError?.status || lastError?.code,
    keyType: cleanKey.startsWith("AQ.") ? "Prepaid Paid Key (AQ)" : "Standard Free Tier Key (AIza)",
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { apiKey, fallbackKeys, model = "gemini-3.5-flash" } = body;

    // Batch mode
    if (Array.isArray(fallbackKeys)) {
      const results = await Promise.all(
        fallbackKeys.map((k: string) => testSingleKey(k, model))
      );
      return NextResponse.json({ success: true, results });
    }

    if (!apiKey || typeof apiKey !== "string") {
      return NextResponse.json(
        { success: false, error: "API Key is required" },
        { status: 400 }
      );
    }

    const singleResult = await testSingleKey(apiKey, model);
    if (singleResult.success) {
      return NextResponse.json(singleResult);
    } else {
      return NextResponse.json(singleResult, { status: 400 });
    }
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
