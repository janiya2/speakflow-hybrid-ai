# SpeakFlow AI — Complete Firebase Architecture & Setup Guide 🔥

This guide details the complete Firebase backend infrastructure for **SpeakFlow AI**, including Cloud Firestore collections, Security Rules, Firebase Authentication, Cloud Messaging (FCM), and Gemini 2.5 Flash AI configuration.

---

## 1. Firebase Project Overview
* **Project Name**: SpeakFlow AI (Hybrid Language Coach)
* **Services Used**:
  * **Firebase Authentication**: User accounts, Google Sign-In, Anonymous guest sessions.
  * **Cloud Firestore**: Real-time multi-tenant database for user profiles, topics, live session evaluations, settings, and notifications.
  * **Firebase Cloud Messaging (FCM)**: Daily dynamic AI study reminders & engagement push notifications.
  * **Firebase Hosting / Cloud Functions / Next.js API**: Serverless edge routes for Gemini 2.5 Flash inference & Edge Neural TTS proxying.

---

## 2. Cloud Firestore Collections & Schemas

### `lang_topics`
Stores the curated speaking practice topics and roleplay scenarios across 20+ languages.
* `id` *(string)*: Unique topic identifier (e.g., `french_bistro_01`, `spanish_travel_02`)
* `title` *(string)*: Display title (e.g., "Commander dans un Bistro Parisien")
* `language` *(string)*: Target language (e.g., "French", "Spanish", "Japanese")
* `level` *(string)*: CEFR difficulty level (`Beginner`, `Intermediate`, `Advanced`)
* `scenario` *(string)*: Immersive context setting for the AI Coach persona
* `starterPrompt` *(string)*: Initial opening statement spoken by the coach
* `starterQuestions` *(array of strings)*: Dynamic conversation starter prompts
* `coach` *(string)*: Assigned native AI coach ID (`emma`, `alex`, `sarah`, `kenji`, `aoi`, `oliver`)

### `lang_users`
User profiles, learning analytics, speaking streak, and subscription entitlements.
* `uid` *(string)*: Firebase Auth user UID
* `displayName` *(string)*: Learner's name
* `email` *(string)*: Learner's email
* `targetLanguage` *(string)*: Primary learning language
* `preferredCoach` *(string)*: Preferred default AI coach ID
* `dailyMinutesUsed` *(number)*: Free minutes consumed today
* `lastUsageDate` *(string)*: Date string in `YYYY-MM-DD` format
* `weeklyMinutes` *(number)*: Minutes spoken in current weekly cycle
* `totalSpokenSeconds` *(number)*: Lifetime spoken audio duration
* `streak` *(number)*: Active daily practice streak count
* `activeDates` *(array of strings)*: Distinct practice session dates
* `isVip` *(boolean)*: Active VIP status flag
* `isVipMonthly` *(boolean)*: Subscription entitlement (uncapped speaking)
* `subscriptionTier` *(string)*: `weekly` | `monthly` | `yearly`
* `subscriptionPlan` *(string)*: Plan display name (e.g., "Weekly Pro Trial")
* `hasTrialActive` *(boolean)*: True if currently inside free trial window
* `trialEndsAt` *(timestamp)*: Expiration timestamp for trial
* `extraMinutes` *(number)*: Top-up practice minutes balance
* `fcmToken` *(string)*: Device token for mobile push notifications

### `lang_sessions`
Completed call session evaluations, CEFR scores, and grammar correction logs.
* `sessionId` *(auto-id)*: Unique session document ID
* `userId` *(string)*: Student UID
* `topicTitle` *(string)*: Topic practiced
* `language` *(string)*: Target language
* `durationSeconds` *(number)*: Duration of call
* `score` *(number)*: Composite speaking score (0 - 100)
* `grade` *(string)*: CEFR Grade (`A+`, `A`, `B`, `C`, `D`, `F`)
* `fluencyScore` *(number)*: Rhythm, pace, words per turn (0 - 100)
* `accuracyScore` *(number)*: Grammar and sentence structure (0 - 100)
* `pronunciationScore` *(number)*: Clarity and phonetic confidence (0 - 100)
* `totalCorrections` *(number)*: Count of detected spoken errors
* `correctionsList` *(array of objects)*:
  * `original`: Spoken phrase with mistake
  * `correction`: Native idiomatic expression
  * `explanation`: Contextual grammar lesson
* `coachFeedback` *(string)*: Personalized debrief from the AI Coach
* `createdAt` *(ISO timestamp / serverTimestamp)*

### `lang_settings`
System-wide configurations, paywall pricing, and AI engine parameters.
* **Doc `time_limits`**:
  * `dailyFreeMinutes`: Default `10`
  * `maxCallDuration`: Default `5`
  * `allowGuestCalls`: `true`
* **Doc `subscription_plans`**:
  * `revenueCatApiKey`: RevenueCat Public SDK API key
  * `trialDays`: Free trial duration (default `3`)
  * `weeklyName`: "Weekly Access"
  * `weeklyPrice`: "$1.99"
  * `monthlyName`: "Monthly Pro"
  * `monthlyPrice`: "$3.99"
  * `yearlyName`: "Yearly VIP"
  * `yearlyPrice`: "$39.00"
  * `yearlySavings`: "Save 92%"

### `lang_notifications`
Log of automated daily push reminders dispatched via Gemini AI and Firebase Admin FCM.
* `title`: Notification title
* `body`: Personalized dynamic reminder message
* `topic`: Targeted language or interest
* `sentCount`: Successful deliveries
* `failedCount`: Failed deliveries
* `sentAt`: Timestamp

---

## 3. Firestore Security Rules Deployment

To deploy the production security rules using Firebase CLI:

```bash
# Login to Firebase
firebase login

# Set your active project
firebase use <YOUR_FIREBASE_PROJECT_ID>

# Deploy Firestore rules
firebase deploy --only firestore:rules
```

Or copy the contents of `firestore.rules` directly into the Firebase Console -> **Firestore Database** -> **Rules** tab.

---

## 4. Environment Variables Setup

### Admin Panel (`admin-panel/.env.local`)
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin Service Account (for dynamic FCM push & Cron jobs)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@your_project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key
```

### Web Practice App (`web-app/.env.local`)
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

GEMINI_API_KEY=your_gemini_api_key
```

### Mobile App (`mobile-app/lib/firebase_options.dart`)
Generated automatically using the FlutterFire CLI:
```bash
flutterfire configure --project=<YOUR_FIREBASE_PROJECT_ID>
```

---

## 5. Automated Daily Push Notifications (Cron)
Dynamic daily study notifications with personalized emojis and rotating topics are powered by the built-in Next.js cron route:
* **Route**: `/api/cron/notifications`
* **Method**: `GET` or `POST`
* **Triggering**: Can be called on a schedule via Vercel Cron, Google Cloud Scheduler, or GitHub Actions.
