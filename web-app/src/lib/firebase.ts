import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAXlKI0I8yNMtHIFxKk3lC_hixfuZkj5_Y",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "uscut-a78e9.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "uscut-a78e9",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "uscut-a78e9.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "265385222467",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:265385222467:web:fd5c2a7551cf558b988ff6",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-VCSC94X6QJ"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Official Firebase App Check initialization (#BuildHybridAI Requirement)
let appCheck: any = null;
if (typeof window !== "undefined") {
  try {
    (window as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (siteKey) {
      appCheck = initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(siteKey),
        isTokenAutoRefreshEnabled: true,
      });
    }
  } catch (_) {}
}
export { appCheck };

export const COLLECTIONS = {
  USERS: "lang_users",
  TOPICS: "lang_topics",
  SETTINGS: "lang_settings",
  SESSIONS: "lang_sessions",
  NOTIFICATIONS: "lang_notifications"
} as const;

export default app;

