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
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "AIzaSyAnnukRBGkqn6nhjcDMvw46BbxaqEkxdpw";
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server-side GEMINI_API_KEY environment variable not configured" },
        { status: 500 }
      );
    }

    const prompt = `You are an expert, encouraging AI Speech & Language Coach conducting an interactive live telephone call in ${language}.
Scenario context: "${scenario}"
Learner said: "${spokenText}"
Drill Mode active: ${drillModeEnabled}

CRITICAL CONVERSATIONAL RULES:
1. NEVER give a short, dead-end response! Always keep the conversation flowing smoothly like a real telephone call with an energetic, supportive tutor.
2. If the learner made a grammar or pronunciation mistake:
   - "hasCorrection": true
   - "original": exact incorrect words they said
   - "correction": natural native way to say it
   - "explanation": concise 1-sentence tip explaining why in ${language}
   - "targetPhrase": the short phrase (2-5 words) to practice repeating
   - "spokenReply": Warm acknowledgement, concise tip, AND an engaging follow-up question related to the scenario to keep the conversation going!
   - "nextQuestion": the engaging follow-up question
3. If the learner spoke correctly:
   - "hasCorrection": false
   - "original": ""
   - "correction": ""
   - "explanation": ""
   - "targetPhrase": ""
   - "spokenReply": Enthusiastic 1-sentence validation PLUS an engaging, natural follow-up question directly advancing the scenario "${scenario}"!
   - "nextQuestion": the engaging follow-up question
4. Ensure the spoken reply ends with an open-ended question so the learner always has something interesting to say next!

Reply ONLY with valid JSON:
{
  "hasCorrection": boolean,
  "original": string,
  "correction": string,
  "explanation": string,
  "targetPhrase": string,
  "spokenReply": string,
  "nextQuestion": string
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
