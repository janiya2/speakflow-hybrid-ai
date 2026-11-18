import { NextRequest, NextResponse } from "next/server";
import { adminDb, adminMessaging, isFirebaseConfigured } from "@/lib/firebase-admin";

const AUTO_CAMPAIGNS = [
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
];

async function executeAutoPilotCampaign(req: NextRequest) {
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

  // 1. Pick campaign (by day of week or random selection)
  const url = new URL(req.url);
  const requestedIndex = url.searchParams.get("index");
  const isRandom = url.searchParams.get("random") === "true";

  let campaign = AUTO_CAMPAIGNS[0];
  if (requestedIndex !== null && !isNaN(parseInt(requestedIndex))) {
    const idx = parseInt(requestedIndex) % AUTO_CAMPAIGNS.length;
    campaign = AUTO_CAMPAIGNS[idx];
  } else if (isRandom) {
    campaign = AUTO_CAMPAIGNS[Math.floor(Math.random() * AUTO_CAMPAIGNS.length)];
  } else {
    // Select based on day of week
    const dayOfWeek = new Date().getDay();
    if (dayOfWeek === 0) {
      // Sunday: Pro Plan Nudge
      campaign = AUTO_CAMPAIGNS[5];
    } else if (dayOfWeek === 6) {
      // Saturday: Coffee Shop or Weekend Challenge
      campaign = AUTO_CAMPAIGNS[1];
    } else {
      campaign = AUTO_CAMPAIGNS[dayOfWeek % AUTO_CAMPAIGNS.length];
    }
  }

  const { title, body, actionRoute, audience } = campaign;

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

  // 3. Dispatch multicast push
  if (tokens.length > 0) {
    const messagePayload = {
      notification: { title, body },
      data: {
        route: actionRoute,
        click_action: "FLUTTER_NOTIFICATION_CLICK",
        source: "autopilot_cron",
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
    createdAt: new Date().toISOString(),
    sentAt: new Date().toISOString(),
  });

  return NextResponse.json({
    success: true,
    autoPilotRan: true,
    campaign,
    recipients: tokens.length,
    successCount,
    failureCount,
    message: tokens.length === 0
      ? "Auto-pilot executed successfully! 0 active devices currently registered with FCM tokens."
      : `Dispatched auto-pilot notification to ${tokens.length} device(s) (${successCount} successful).`,
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
