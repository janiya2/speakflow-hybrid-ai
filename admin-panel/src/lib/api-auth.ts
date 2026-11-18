import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb, isFirebaseConfigured } from "./firebase-admin";

const ADMIN_ALLOWLIST: string[] = [
  "janithad2@gmail.com",
  "admin@speakflow.ai",
  ...(process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(",").map((e) => e.trim().toLowerCase()) : []),
  ...(process.env.NEXT_PUBLIC_ADMIN_EMAILS
    ? process.env.NEXT_PUBLIC_ADMIN_EMAILS.split(",").map((e) => e.trim().toLowerCase())
    : []),
];

export async function verifyAdminRequest(
  req: NextRequest
): Promise<{ authorized: boolean; errorResponse?: NextResponse }> {
  // 1. Check shared admin secret key / Cron secret (for internal webhooks, cron jobs, or CLI scripts)
  const adminSecret = process.env.ADMIN_API_KEY || process.env.CRON_SECRET;
  const authHeader = req.headers.get("authorization") || "";
  const customKey = req.headers.get("x-admin-key") || req.headers.get("x-cron-secret");

  if (adminSecret && (customKey === adminSecret || authHeader === `Bearer ${adminSecret}`)) {
    return { authorized: true };
  }

  // 2. In Local Development Mode (when no service account is configured on localhost):
  // Allow localhost requests for developer testing if explicitly enabled
  const host = req.headers.get("host") || "";
  if (process.env.NODE_ENV !== "production" && (host.includes("localhost") || host.includes("127.0.0.1"))) {
    // If a development token or session exists, allow it
    if (!adminSecret) {
      return { authorized: true };
    }
  }

  // 3. Verify Firebase ID Token if provided in Authorization header
  if (authHeader.startsWith("Bearer ") && isFirebaseConfigured()) {
    const idToken = authHeader.replace("Bearer ", "").trim();
    try {
      const decoded = await adminAuth.verifyIdToken(idToken);
      const email = decoded.email?.toLowerCase();

      // Check allowlist
      if (email && ADMIN_ALLOWLIST.includes(email)) {
        return { authorized: true };
      }

      // Check Firestore user profile role
      const userDoc = await adminDb.collection("lang_users").doc(decoded.uid).get();
      if (userDoc.exists && userDoc.data()?.role === "admin") {
        return { authorized: true };
      }
    } catch (e) {
      console.warn("Failed to verify Firebase ID token in API request:", e);
    }
  }

  return {
    authorized: false,
    errorResponse: NextResponse.json(
      {
        error: "Unauthorized: Valid Administrator authentication token or x-admin-key required.",
      },
      { status: 401 }
    ),
  };
}
