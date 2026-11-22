import { NextRequest, NextResponse } from "next/server";

const VERIFIED_MODEL_PRIORITY = [
  "gemini-3.1-flash-lite",
  "gemini-3.5-flash-lite",
  "gemini-flash-lite-latest",
  "gemini-3-flash-preview",
  "gemini-3.5-flash",
  "gemini-flash-latest",
  "gemini-2.5-flash",
];

const RETIRED_MODELS = new Set([
  "gemini-1.5-flash",
  "gemini-1.5-pro",
  "gemini-2.0-flash",
  "gemini-2.5-flash-lite",
]);

function extractJsonObject(rawText: string): any {
  const cleaned = rawText
    .replace(/^\s*```(?:json)?/i, "")
    .replace(/```\s*$/i, "")
    .trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start !== -1 && end > start) {
      return JSON.parse(cleaned.slice(start, end + 1));
    }
    throw new Error("Invalid JSON returned by model");
  }
}

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
    const {
      spokenText,
      language = "English",
      scenario = "",
      drillModeEnabled = true,
      conversationHistory = [],
      apiKeys = [],
      selectedModel = "",
    } = await req.json();

    if (!spokenText || typeof spokenText !== "string") {
      return NextResponse.json({ error: "Spoken text is required" }, { status: 400 });
    }

    // Build deduplicated server + rotated key pool
    const keySet = new Set<string>();
    const envPrimary = process.env.GEMINI_API_KEY?.trim();
    const envPublic = process.env.NEXT_PUBLIC_GEMINI_API_KEY?.trim();
    if (envPrimary && envPrimary.length > 10) keySet.add(envPrimary);
    if (envPublic && envPublic.length > 10) keySet.add(envPublic);
    if (Array.isArray(apiKeys)) {
      for (const k of apiKeys) {
        if (typeof k === "string" && k.trim().length > 10) {
          keySet.add(k.trim());
        }
      }
    }
    const candidateKeys = Array.from(keySet);
    if (candidateKeys.length === 0) {
      return NextResponse.json(
        { error: "Server-side GEMINI_API_KEY environment variable not configured" },
        { status: 500 }
      );
    }

    const historyLines = Array.isArray(conversationHistory)
      ? conversationHistory
          .slice(-8)
          .map((turn: any) => {
            const roleLabel =
              String(turn?.sender || "").toLowerCase() === "user" ? "LEARNER" : "COACH";
            return `${roleLabel}: ${String(turn?.text || "").trim()}`;
          })
          .filter(Boolean)
      : [];

    const historyBlock =
      historyLines.length > 0
        ? `\nRECENT CONVERSATION HISTORY (do NOT repeat your previous questions or phrases):\n${historyLines.join("\n")}\n`
        : "";

    const isTargetedGrammarCall =
      scenario.includes("TARGETED GRAMMAR DRILL") ||
      scenario.includes("TARGETED CALL GRAMMAR REPAIR");

    const grammarFocusGuidance = isTargetedGrammarCall
      ? `
TARGETED GRAMMAR DRILL PEDAGOGY (CRITICAL):
- This is a focused Grammar Mastery Call, NOT generic small talk.
- Validate meaning briefly, explicitly check whether they used the target grammar structure accurately, and ask an engaging real-life follow-up question that naturally elicits the SAME target grammar rule in their next turn.`
      : "";

    const prompt = `You are a sharp, warm, realistic AI Language Coach conducting a live roleplay phone call in ${language}.
Scenario context: "${scenario || "Everyday Fluency & Conversation"}"
${historyBlock}
Learner just said: "${spokenText}"
Drill Mode active: ${drillModeEnabled}
${grammarFocusGuidance}

STRICT EVALUATION & CONVERSATION RULES:
1. ACTUALLY ANALYZE GRAMMAR & NATURALNESS (NO FAKE PRAISE!):
   - Carefully inspect "${spokenText}" for grammar mistakes, missing verbs/articles/prepositions, awkward word order, broken fragments (e.g. "I like to that", "I very tired", "he don't", "yesterday I go", "am agree"), or mismatched phrasing.
   - If there IS any grammatical error, missing word, or clearly unnatural phrasing, set "hasCorrection": true, put the exact broken phrase in "original", put the natural native fix in "correction", give a clear 1-sentence reason in "explanation", and pick a concise 2-6 word practice chunk in "targetPhrase". NEVER praise a broken sentence as "very clear and well phrased"!
   - If "${spokenText}" is a direct question to you (e.g. "What do you want to know?") or off-topic/confused, answer it directly IN CHARACTER for the scenario and move the roleplay forward!
2. ZERO REPETITIVE STOCK PHRASES:
   - NEVER use generic cliché openers like "That sounds very clear and well phrased!", "Interesting point!", "Sounds exciting!", or "That's great!".
   - React specifically to the exact words/intent in "${spokenText}" and stay 100% consistent with RECENT CONVERSATION HISTORY.
   - NEVER repeat a question or wording already shown in RECENT CONVERSATION HISTORY.
3. KEEP IT CONCISE & SPOKEN:
   - "spokenReply": 1–2 natural conversational sentences reacting to what the learner actually said (plus a warm tip if corrected).
   - "nextQuestion": 1 concrete, scenario-grounded follow-up question advancing the roleplay (do NOT duplicate inside spokenReply unless seamless).

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

    // Build candidate model chain, keeping fast flash-lite first so turn latency stays ~1.2-1.8s
    const candidateModels: string[] = [...VERIFIED_MODEL_PRIORITY];
    if (
      selectedModel &&
      typeof selectedModel === "string" &&
      !RETIRED_MODELS.has(selectedModel) &&
      !candidateModels.includes(selectedModel)
    ) {
      candidateModels.unshift(selectedModel);
    }

    let lastError: any = null;

    for (const model of candidateModels) {
      const isGemma = model.startsWith("gemma");
      for (const apiKey of candidateKeys) {
        try {
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
            {
              method: "POST",
              signal: AbortSignal.timeout(4500),
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: prompt }] }],
                generationConfig: {
                  temperature: 0.75,
                  maxOutputTokens: 512,
                  ...(isGemma ? {} : { responseMimeType: "application/json" }),
                },
              }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
            if (!rawText) {
              lastError = `${model} returned empty candidate`;
              continue;
            }
            const parsed = extractJsonObject(rawText);
            return NextResponse.json({
              hasCorrection: Boolean(parsed.hasCorrection),
              original: typeof parsed.original === "string" ? parsed.original : "",
              correction: typeof parsed.correction === "string" ? parsed.correction : "",
              explanation: typeof parsed.explanation === "string" ? parsed.explanation : "",
              targetPhrase:
                typeof parsed.targetPhrase === "string"
                  ? parsed.targetPhrase
                  : parsed.correction || "",
              spokenReply:
                typeof parsed.spokenReply === "string" && parsed.spokenReply.trim()
                  ? parsed.spokenReply.trim()
                  : "Got it — let's keep going with our scenario.",
              nextQuestion:
                typeof parsed.nextQuestion === "string" ? parsed.nextQuestion.trim() : "",
              modelIdentifier: model,
            });
          } else {
            const errTxt = await response.text();
            lastError = `${model} HTTP ${response.status}: ${errTxt.slice(0, 220)}`;
            // If 404 (unsupported/retired model), skip remaining keys for this dead model
            if (response.status === 404) break;
          }
        } catch (err: any) {
          lastError = err?.message || String(err);
        }
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
