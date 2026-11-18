import { NextRequest, NextResponse } from "next/server";
import { adminDb, adminMessaging, isFirebaseConfigured } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  try {
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

    const { title, body, audience = "all", actionRoute = "/home", imageUrl } = await req.json();

    if (!title || !body) {
      return NextResponse.json({ error: "Title and Body are required." }, { status: 400 });
    }

    // 1. Fetch targeted users with FCM tokens from Firestore
    let querySnapshot: any;
    const usersRef = adminDb.collection("lang_users");

    if (audience === "pro") {
      querySnapshot = await usersRef.where("isPro", "==", true).get();
    } else if (audience === "free_trial") {
      querySnapshot = await usersRef.where("isPro", "==", false).get();
    } else {
      querySnapshot = await usersRef.get();
    }

    const tokens: string[] = [];
    const userUids: string[] = [];

    querySnapshot.forEach((doc: any) => {
      const data = doc.data();
      if (data.fcmToken && typeof data.fcmToken === "string" && data.fcmToken.length > 10) {
        tokens.push(data.fcmToken);
        userUids.push(doc.id);
      }
    });

    let successCount = 0;
    let failureCount = 0;

    // 2. Dispatch FCM Push Notifications if active tokens exist
    if (tokens.length > 0) {
      const messagePayload = {
        notification: {
          title,
          body,
          ...(imageUrl ? { imageUrl } : {}),
        },
        data: {
          route: actionRoute || "/home",
          click_action: "FLUTTER_NOTIFICATION_CLICK",
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

    // 3. Log notification to history collection
    const notificationDoc = {
      title,
      body,
      audience,
      actionRoute,
      imageUrl: imageUrl || null,
      totalRecipients: tokens.length,
      successCount,
      failureCount,
      status: tokens.length === 0 ? "Queued (Waiting for Devices)" : successCount > 0 ? "Delivered" : "Failed",
      createdAt: new Date().toISOString(),
      sentAt: new Date().toISOString(),
    };

    const docRef = await adminDb.collection("lang_notifications").add(notificationDoc);

    return NextResponse.json({
      success: true,
      id: docRef.id,
      recipients: tokens.length,
      successCount,
      failureCount,
      status: notificationDoc.status,
    });
  } catch (error: any) {
    console.error("Push Notification error:", error);
    return NextResponse.json({ error: error.message || "Failed to send notification" }, { status: 500 });
  }
}

export async function GET() {
  try {
    if (!isFirebaseConfigured()) {
      return NextResponse.json({
        history: [],
        metrics: {
          totalUsers: 0,
          pushEnabledUsers: 0,
        },
        isFirebaseConfigured: false,
        warning: "Firebase credentials missing on server. Add FIREBASE_SERVICE_ACCOUNT_KEY in Vercel settings.",
      });
    }

    // Return notification history and audience counts
    const historySnap = await adminDb
      .collection("lang_notifications")
      .orderBy("createdAt", "desc")
      .limit(30)
      .get();

    const history: any[] = [];
    historySnap.forEach((doc: any) => {
      history.push({ id: doc.id, ...doc.data() });
    });

    const usersSnap = await adminDb.collection("lang_users").get();
    let totalUsers = usersSnap.size;
    let pushEnabledUsers = 0;

    usersSnap.forEach((doc: any) => {
      const data = doc.data();
      if (data.fcmToken) pushEnabledUsers++;
    });

    return NextResponse.json({
      history,
      metrics: {
        totalUsers,
        pushEnabledUsers,
      },
      isFirebaseConfigured: true,
    });
  } catch (error: any) {
    console.error("Fetch notifications error:", error);
    return NextResponse.json({
      history: [],
      metrics: { totalUsers: 0, pushEnabledUsers: 0 },
      error: error.message,
      isFirebaseConfigured: false,
    }, { status: 200 });
  }
}
