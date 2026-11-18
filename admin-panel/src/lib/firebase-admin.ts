import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getMessaging, Messaging } from "firebase-admin/messaging";
import { getAuth, Auth } from "firebase-admin/auth";
import fs from "fs";
import path from "path";

let app: App;

function getServiceAccount(): any | null {
  // 1. Try FIREBASE_SERVICE_ACCOUNT_KEY env (accepts raw JSON or base64 encoded JSON)
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY.trim();
      if (raw.startsWith("{")) {
        return JSON.parse(raw);
      }
      // If Base64 encoded
      const decoded = Buffer.from(raw, "base64").toString("utf-8");
      return JSON.parse(decoded);
    } catch (e) {
      console.error("Error parsing FIREBASE_SERVICE_ACCOUNT_KEY env variable:", e);
    }
  }

  // 2. Try individual environment variables
  if (process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
    return {
      project_id: process.env.FIREBASE_PROJECT_ID || "uscut-a78e9",
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    };
  }

  // 3. Try local service-account.json file
  try {
    const serviceAccountPath = path.resolve(process.cwd(), "service-account.json");
    if (fs.existsSync(serviceAccountPath)) {
      return JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));
    }
  } catch (e) {
    console.error("Error reading local service-account.json file:", e);
  }

  return null;
}

if (!getApps().length) {
  const sa = getServiceAccount();
  if (sa) {
    app = initializeApp({
      credential: cert(sa),
      projectId: sa.project_id || process.env.FIREBASE_PROJECT_ID || "uscut-a78e9",
    });
    console.log("Firebase Admin successfully initialized with service account credentials.");
  } else {
    console.warn("⚠️ Warning: No Firebase service account credentials found. Set FIREBASE_SERVICE_ACCOUNT_KEY in Vercel.");
    app = initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID || "uscut-a78e9",
    });
  }
} else {
  app = getApps()[0];
}

export const adminDb: Firestore = getFirestore(app);
export const adminMessaging: Messaging = getMessaging(app);
export const adminAuth: Auth = getAuth(app);
export const isFirebaseConfigured = (): boolean => getServiceAccount() !== null;
