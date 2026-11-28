import { NextRequest, NextResponse } from "next/server";
import { adminDb, adminMessaging, isFirebaseConfigured } from "@/lib/firebase-admin";
import { verifyAdminRequest } from "@/lib/api-auth";

const FALLBACK_CAMPAIGNS = [
  {
    title: "🔥 Don't break your speaking streak!",
    body: "Consistency is key! Spend just 5 minutes today with Coach Sarah to stay on track.",
    actionRoute: "/home",
    audience: "all",
  },
  {
    title: "☕ Coffee Shop Challenge!",
    body: "Can you order your favorite coffee in fluent English? Practice the scenario now!",
    actionRoute: "/topics",
    audience: "all",
  },
  {
    title: "🎯 Pronunciation Tip of the Day!",
    body: "Master natural conversational flow and clear diction. Tap to practice with AI feedback.",
    actionRoute: "/home",
    audience: "all",
  },
  {
    title: "💼 Ace your next Job Interview!",
    body: "Practice self-introductions and tricky questions with Coach Emma in a mock interview.",
    actionRoute: "/topics",
    audience: "all",
  },
  {
    title: "🌙 5-Minute Nighttime Speaking Practice",
    body: "Train your brain to think in English before bed. Tap to start a relaxed voice call.",
    actionRoute: "/home",
    audience: "all",
  },
  {
    title: "🚀 Supercharge your Fluency!",
    body: "Unlock unlimited live voice calls & instant grammar drill feedback. Start your Free Trial!",
    actionRoute: "/paywall",
    audience: "free_trial",
  },
  {
    title: "✈️ Airport & Travel Speaking Drill",
    body: "Heading abroad soon? Practice baggage claims and gate inquiries with Coach Alex!",
    actionRoute: "/topics",
    audience: "all",
  },
];

interface GeneratedCampaign {
  title: string;
  body: string;
  actionRoute: string;
  audience: string;
  isAiGenerated: boolean;
  theme: string;
}

/**
 * Dynamically generate a brand-new, unique notification campaign using Gemini AI.
 * Rotates daily themes so users never receive the same repetitive message.
 */
async function generateDynamicAiCampaign(requestedTheme?: string | null): Promise<GeneratedCampaign> {
  const dayOfWeek = new Date().getDay();
  const dailyThemes = [
    { theme: "Sunday Fluency Review & Pro Speaking Pass", audience: "free_trial", route: "/paywall", hint: "Motivate learner to review their weekly progress and unlock uncapped AI voice calls" },
    { theme: "Monday Speaking Streak & Morning Confidence", audience: "all", route: "/home", hint: "Start the workweek strong with a 5-minute relaxed morning voice conversation" },
    { theme: "Tuesday Coffee Shop & Restaurant Scenario", audience: "all", route: "/topics", hint: "Invite learner to practice ordering food, asking for the bill, and making small talk" },
    { theme: "Wednesday Native Idiom & Pronunciation Drill", audience: "all", route: "/home", hint: "Teach an everyday natural idiom or quick pronunciation drill to sound like a native" },
    { theme: "Thursday Professional Career & Job Interview", audience: "all", route: "/topics", hint: "Practice answering tough interview questions or giving a 60-second elevator pitch" },
    { theme: "Friday Weekend Fluency Sprint & Friendly Banter", audience: "all", route: "/home", hint: "Unwind on Friday with a fun, casual AI conversation about weekend plans" },
    { theme: "Saturday Global Culture & Travel Adventures", audience: "all", route: "/topics", hint: "Discuss world destinations, travel stories, and navigating international airports" },
  ];

  const currentTheme = requestedTheme
    ? { theme: requestedTheme, audience: "all", route: "/topics", hint: requestedTheme }
    : dailyThemes[dayOfWeek % dailyThemes.length];

  // 1. Retrieve Gemini API key from Firestore ai_config or process.env
  let apiKey = process.env.GEMINI_API_KEY;
  try {
    const configDoc = await adminDb.collection("lang_settings").doc("ai_config").get();
    if (configDoc.exists) {
      const data = configDoc.data();
      if (data?.geminiApiKey) apiKey = data.geminiApiKey;
    }
  } catch (e) {
    console.warn("Could not read ai_config from Firestore, falling back to process.env:", e);
  }

  // 2. Call Gemini AI if key is available
  if (apiKey) {
    try {
      const systemPrompt = `You are a world-class growth copywriter for "SpeakFlow AI: Language Coach", an app where learners practice speaking languages with real-time AI voice coaches (Alex, Emma, Sarah, Kenji, Aoi, Sophia).
Generate 1 punchy, friendly, high-converting mobile push notification for learners.
Rules:
- Title must be short (under 38 characters), exciting, and start with an engaging emoji.
- Body must be warm and action-oriented (under 85 characters).
- Tone: Friendly, encouraging, never pushy.
- Return strictly raw JSON in this exact structure:
{"title": "Title with emoji", "body": "Body text under 85 chars"}
Do NOT wrap in markdown or backticks.`;

      const userPrompt = `Create a brand-new notification for theme: ${currentTheme.theme} (${currentTheme.hint}).`;

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
              temperature: 0.85,
              maxOutputTokens: 180,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
        const cleanJson = candidateText.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(cleanJson);

        if (parsed.title && parsed.body) {
          return {
            title: parsed.title.trim(),
            body: parsed.body.trim(),
            actionRoute: currentTheme.route,
            audience: currentTheme.audience,
            isAiGenerated: true,
            theme: currentTheme.theme,
          };
        }
      }
    } catch (err) {
      console.warn("Gemini dynamic campaign generation encountered an error, using smart fallback:", err);
    }
  }

  // 3. Fallback to curated campaign
  const fallback = FALLBACK_CAMPAIGNS[dayOfWeek % FALLBACK_CAMPAIGNS.length];
  return {
    ...fallback,
    isAiGenerated: false,
    theme: currentTheme.theme,
  };
}

async function executeAutoPilotCampaign(req: NextRequest) {
  // Allow authentication via Bearer token, x-admin-key, or query param key/secret (for cron-job.org / external cron)
  const url = new URL(req.url);
  const querySecret = url.searchParams.get("key") || url.searchParams.get("secret");
  const adminSecret = process.env.ADMIN_API_KEY || process.env.CRON_SECRET;

  const isQuerySecretValid = adminSecret && querySecret && querySecret === adminSecret;

  if (!isQuerySecretValid) {
    const authCheck = await verifyAdminRequest(req);
    if (!authCheck.authorized) {
      return authCheck.errorResponse!;
    }
  }

  if (!isFirebaseConfigured()) {
    return NextResponse.json(
      {
        error:
          "Firebase credentials are not configured on Vercel. Please add 'FIREBASE_SERVICE_ACCOUNT_KEY' to your Vercel Environment Variables.",
        isFirebaseConfigured: false,
      },
      { status: 500 }
    );
  }

  // 1. Generate dynamic AI campaign (fresh every dispatch)
  const requestedTheme = url.searchParams.get("theme");
  const forceFallback = url.searchParams.get("fallback") === "true";

  let campaign: GeneratedCampaign;
  if (forceFallback) {
    const idx = Math.floor(Math.random() * FALLBACK_CAMPAIGNS.length);
    campaign = { ...FALLBACK_CAMPAIGNS[idx], isAiGenerated: false, theme: "Manual Fallback" };
  } else {
    campaign = await generateDynamicAiCampaign(requestedTheme);
  }

  const { title, body, actionRoute, audience, isAiGenerated, theme } = campaign;

  // 2. Query target FCM tokens from Firestore
  const usersRef = adminDb.collection("lang_users");
  const querySnapshot =
    audience === "free_trial"
      ? await usersRef.where("isPro", "==", false).get()
      : await usersRef.get();

  const tokens: string[] = [];
  querySnapshot.forEach((doc: any) => {
    const data = doc.data();
    if (data.fcmToken && typeof data.fcmToken === "string" && data.fcmToken.length > 10) {
      tokens.push(data.fcmToken);
    }
  });

  let successCount = 0;
  let failureCount = 0;

  // 3. Dispatch multicast push to registered devices
  if (tokens.length > 0) {
    const messagePayload = {
      notification: { title, body },
      data: {
        route: actionRoute,
        click_action: "FLUTTER_NOTIFICATION_CLICK",
        source: "autopilot_cron",
        isAiGenerated: isAiGenerated ? "true" : "false",
        timestamp: new Date().toISOString(),
      },
      android: {
        priority: "high" as const,
        notification: {
          channelId: "speakflow_coach_channel",
          sound: "default",
          priority: "high" as const,
          defaultVibrateTimings: true,
        },
      },
    };

    const chunkSize = 500;
    for (let i = 0; i < tokens.length; i += chunkSize) {
      const chunkTokens = tokens.slice(i, i + chunkSize);
      const response = await adminMessaging.sendEachForMulticast({
        ...messagePayload,
        tokens: chunkTokens,
      });
      successCount += response.successCount;
      failureCount += response.failureCount;
    }
  }

  // 4. Record to notifications collection
  await adminDb.collection("lang_notifications").add({
    title,
    body,
    audience,
    actionRoute,
    totalRecipients: tokens.length,
    successCount,
    failureCount,
    status: tokens.length === 0 ? "Queued (Waiting for Registered Devices)" : successCount > 0 ? "Delivered" : "Failed",
    isAutoPilot: true,
    isAiGenerated,
    theme,
    createdAt: new Date().toISOString(),
    sentAt: new Date().toISOString(),
  });

  return NextResponse.json({
    success: true,
    autoPilotRan: true,
    campaign: {
      title,
      body,
      actionRoute,
      audience,
      isAiGenerated,
      theme,
    },
    recipients: tokens.length,
    successCount,
    failureCount,
    message: tokens.length === 0
      ? `Auto-pilot AI campaign "${title}" generated! 0 active devices currently registered with FCM tokens.`
      : `Dispatched AI campaign "${title}" to ${tokens.length} device(s) (${successCount} successful).`,
  });
}

export async function GET(req: NextRequest) {
  try {
    return await executeAutoPilotCampaign(req);
  } catch (error: any) {
    console.error("Cron notification error (GET):", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    return await executeAutoPilotCampaign(req);
  } catch (error: any) {
    console.error("Cron notification error (POST):", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
