import { NextRequest, NextResponse } from "next/server";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const { spokenText, language = "English", scenario = "", drillModeEnabled = true } = await req.json();

    if (!spokenText || typeof spokenText !== "string") {
      return NextResponse.json({ error: "Spoken text is required" }, { status: 400 });
    }

    // Server-side secure API key retrieval (Never exposed to client browser)
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server-side GEMINI_API_KEY environment variable not configured" },
        { status: 500 }
      );
    }

    const prompt = `You are an AI Language Coach conducting a live telephone call in ${language}.
Scenario context: ${scenario}
Learner said: "${spokenText}"
Drill Mode active: ${drillModeEnabled}

Analyze for grammar, pronunciation, or vocabulary errors.
Reply ONLY with valid JSON:
{
  "hasCorrection": boolean,
  "original": "incorrect phrase if any",
  "correction": "corrected natural version",
  "explanation": "concise 1-sentence tip in ${language}",
  "targetPhrase": "exact phrase to repeat",
  "spokenReply": "warm natural response in ${language}",
  "nextQuestion": "engaging scenario question in ${language}"
}`;

    const candidateModels = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];
    let lastError: any = null;

    for (const model of candidateModels) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ role: "user", parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 600,
                responseMimeType: "application/json",
              },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
          const parsed = JSON.parse(rawText);
          return NextResponse.json(parsed);
        } else {
          lastError = await response.text();
        }
      } catch (err: any) {
        lastError = err?.message || err;
      }
    }

    return NextResponse.json(
      { error: "Cloud inference failed across candidate models", details: lastError },
      { status: 502 }
    );
  } catch (error: any) {
    console.error("API /api/chat error:", error);
    return NextResponse.json({ error: error?.message || "Internal server error" }, { status: 500 });
  }
}
