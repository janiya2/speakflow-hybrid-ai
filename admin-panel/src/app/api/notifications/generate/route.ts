import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const { campaignType = "streak", promptTopic = "" } = await req.json();

    // 1. Retrieve Gemini API key from Firestore ai_config or env
    let apiKey = process.env.GEMINI_API_KEY;
    try {
      const configDoc = await adminDb.collection("lang_settings").doc("ai_config").get();
      if (configDoc.exists) {
        const data = configDoc.data();
        if (data?.geminiApiKey) apiKey = data.geminiApiKey;
      }
    } catch (e) {
      console.warn("Could not read ai_config doc, falling back to env:", e);
    }

    if (!apiKey) {
      // Fallback pre-crafted smart suggestions if no key set yet
      const fallbacks: Record<string, { title: string; body: string }> = {
        streak: {
          title: "🔥 Don't break your speaking streak!",
          body: "Just 5 minutes of practice with Elena today will boost your confidence. Tap to speak!",
        },
        pro_promo: {
          title: "🎁 Unlock Unlimited AI Conversations!",
          body: "Start your 3-day Free Trial now. Experience Elena & our professional coaches with zero restrictions.",
        },
        tutor_voice: {
          title: "🎙️ Elena is waiting for you!",
          body: "Let's practice your English pronunciation and everyday idioms today. How was your morning?",
        },
        weekend: {
          title: "🌟 Weekend Fluency Sprint!",
          body: "Level up your speaking score this weekend. 3 interactive topics just unlocked for you!",
        },
      };
      return NextResponse.json(fallbacks[campaignType] || fallbacks.streak);
    }

    // 2. Call Gemini API to craft creative push notifications
    const systemPrompt = `You are an expert mobile growth & user retention copywriter for "SpeakFlow AI: Language Coach", an app where learners practice speaking English with AI voice coaches (like Elena).
Generate 1 punchy, friendly, high-converting mobile push notification.
Rules:
- Title must be short (under 40 characters) and include a relevant emoji.
- Body must be engaging and motivating (under 90 characters).
- Include an action-oriented call to action.
- Return strictly raw JSON in this exact structure:
{"title": "Title here", "body": "Body here"}
Do not wrap in markdown or backticks.`;

    let userPrompt = `Create a notification for campaign type: ${campaignType}.`;
    if (promptTopic) {
      userPrompt += ` Topic or theme: ${promptTopic}.`;
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${systemPrompt}\n\nTask: ${userPrompt}` }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 200,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
    const cleanJson = candidateText.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleanJson);

    return NextResponse.json({
      title: parsed.title,
      body: parsed.body,
    });
  } catch (error: any) {
    console.error("AI Generation error:", error);
    return NextResponse.json({
      title: "🔥 Don't break your speaking streak!",
      body: "Elena is waiting for you! Practice 5 minutes today to keep your daily goal active.",
    });
  }
}

