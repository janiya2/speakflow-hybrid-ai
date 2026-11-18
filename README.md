# 🎙️ SpeakFlow AI — Real-Time Hybrid AI Language & Accent Coach

[![Google Firebase Hackathon](https://img.shields.io/badge/Google%20Firebase-%23BuildHybridAI%202026-FFA000?style=for-the-badge&logo=firebase&logoColor=white)](https://firebase.google.com/)
[![Gemini Nano On-Device](https://img.shields.io/badge/On--Device-Gemini%20Nano%20%5B0ms%5D-34A853?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Gemini 2.5 Flash Cloud](https://img.shields.io/badge/Cloud-Gemini%202.5%20Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://aistudio.google.com/)
[![Flutter 3.x](https://img.shields.io/badge/Flutter-3.x%20Web%20%7C%20Android%20%7C%20iOS-02569B?style=for-the-badge&logo=flutter&logoColor=white)](https://flutter.dev/)
[![Next.js 15](https://img.shields.io/badge/Next.js-15%20App%20Router-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

> **SpeakFlow AI** is a real-time conversational AI language tutor built for Google's **#BuildHybridAI 2026** Hackathon. Powered by a **True Hybrid Inference Architecture**, it dynamically arbitrates between **On-Device Gemini Nano** (for 0ms zero-latency, private, offline-ready conversation) and **Cloud Gemini 2.5 Flash via Firebase** (for deep situational roleplay and CEFR fluency assessment), coupled with 60 FPS interactive video avatars and dual-tier speech synthesis.

---

## 🧠 True Hybrid AI Architecture (Firebase AI Logic)

SpeakFlow AI is engineered from the ground up to satisfy the core vision of the Google Firebase **#BuildHybridAI** Hackathon: **True Hybrid AI Inference** combining On-Device Local LLM processing with Cloud LLM orchestration.

```mermaid
flowchart TD
    User([👤 User Speaks into Microphone]) --> STT[🎙️ Speech Recognition STT]
    STT --> Shield{🛡️ 5-Layer Acoustic Shield}
    Shield -->|Room Echo / Speaker Bleed| Discard[❌ Discard Bleed]
    Shield -->|Genuine User Utterance| Router{⚡ Firebase AI Logic Hybrid Inference Router}
    
    subgraph HYBRID_INFERENCE_ENGINE ["🧠 Dual-Tier Hybrid LLM Inference Engine"]
        Router -->|Device Capable / Offline / In-Flight Mode| Nano["📱 ON-DEVICE INFERENCE\n• Gemini Nano (Chrome window.ai / Android AICore)\n• 0ms Latency • Zero Cloud Cost\n• 100% Private Local Execution"]
        Router -->|Online & Complex Nuance Required| Cloud["☁️ CLOUD INFERENCE\n• Google Gemini 2.5 Flash via Firebase\n• Deep Situational Roleplay & CEFR Metrics\n• Sub-second Cloud Reasoning"]
        Cloud -.->|Network Timeout / Rate Limit 429| Nano
    end
    
    Nano --> Feedback[📝 Grammar & Accent Evaluation]
    Cloud --> Feedback
    
    Feedback --> DrillCheck{Repeat Drill Needed?}
    DrillCheck -->|Yes| DrillMode[🔁 Repeat-to-Continue Drill]
    DrillCheck -->|No| FollowUp[💬 Conversational Follow-Up]
    
    subgraph DUAL_TIER_AUDIO ["🔊 Dual-Tier Hybrid Audio Engine"]
        DrillMode --> AudioRouter{Audio Strategy}
        FollowUp --> AudioRouter
        AudioRouter -->|Online Mode| EdgeTTS[☁️ Microsoft Edge Neural Studio TTS\nUltra-Realistic Natural Human Voices]
        AudioRouter -->|Offline / In-Flight Mode| LocalTTS[📱 Local On-Device TTS Engine\nZero Network Dependency]
    end
    
    EdgeTTS --> VideoSync[🎬 60 FPS Video Lip-Sync Trigger]
    LocalTTS --> VideoSync
    
    VideoSync --> UI([📱 Live Call Screen with Real-Time Telemetry HUD])
    UI -->|Firestore Realtime Sync| Telemetry[(🔥 Firebase Firestore Telemetry)]
```

---

## 🌟 Key Highlights & Technical Innovations

### 1. ⚡ Firebase AI Logic: Hybrid LLM Inference Router
* **On-Device (Gemini Nano)**: Evaluates user speech locally using **Gemini Nano** (`window.ai.languageModel` on Web / Android AICore on mobile / local client neural engine in `hybrid-ai.ts` and `gemini_voice_service.dart`). Guarantees zero latency, complete user privacy, and zero API costs.
* **Cloud (Gemini 2.5 Flash)**: Leverages Google's flagship multimodal model via Firebase for complex conversational roleplay, nuanced grammar explanations, and scenario adaptation.
* **Seamless Resilience Fallback**: If network connectivity drops, API quota is exhausted (HTTP 429), or the user engages **In-Flight / Offline Mode**, the engine instantaneously falls back to On-Device Gemini Nano with **0ms interruption**.
* **Live Telemetry HUD**: The active call screen displays real-time execution badges:
  * `⚡ ON-DEVICE: GEMINI NANO [0ms • Offline]`
  * `☁️ CLOUD: GEMINI 2.5 FLASH [Firebase]`
  * Interactive `✈️ Sim Offline` switch to demonstrate local on-device inference live to judges.

### 2. 🔊 Dual-Tier Hybrid Audio Architecture
* **Tier 1 (Cloud Human-Quality)**: Streams ultra-realistic **Microsoft Edge Neural Studio TTS** (e.g. `en-GB-SoniaNeural`, `en-US-ChristopherNeural`, `ja-JP-NanamiNeural`) with verified pitch/gender accuracy.
* **Tier 2 (On-Device Zero-Latency)**: Native device hardware TTS (`flutter_tts`) when offline simulation or in-flight mode is engaged.

### 3. 🛡️ 5-Layer Acoustic Echo Shield
* **Hardware Echo Suppression**: High-speed microphone buffer flushing (`speech.cancel()` and `speech.stop()`) when the coach starts speaking.
* **Temporal Acoustic Shield**: 1200ms decay window ensures room reverberation and laptop speaker bleeding never trigger false inputs.
* **Intelligent Utterance Parsing**: Distinguishes between concise natural answers (*"I like T20"*, *"Test matches"*, *"Yes"*) and coach identity bleed (*"I'm Coach Emma"*).

### 4. 🔁 Active Pronunciation Drill Engine
* Evaluates user pronunciation against target CEFR sentences using Google Gemini.
* Automatically locks into an interactive repeat-to-continue drill when mispronunciation or grammar slips are identified, unlocking upon successful mastery.

### 5. 🎭 60 FPS Interactive Video Coaches
* Seamless state machine toggling between idle ambient listening video loops and high-definition speaking video loops synchronized to audio playback.
* Coach personas with distinct pedagogical styles:
  * **Coach Emma** (British RP, Confident Cambridge Business English)
  * **Coach Alex** (American West Coast, Warm & Casual Conversational)
  * **Coach Aoi** (Japanese / Global, Gentle & Patient Bilingual Practice)

---

## 📂 Repository Structure

```
speakflow-ai/
├── mobile-app/               # Flutter Multi-Platform App (Android, iOS, Web)
│   ├── lib/
│   │   ├── models/           # Topic, CoachPersona, Drill Models
│   │   ├── screens/          # LiveCallScreen (with Telemetry HUD), HomeScreen
│   │   ├── services/         # GeminiVoiceService (Hybrid Router: Nano ⇄ Cloud Flash)
│   │   └── web/              # Web Speech & Audio JS bridges
│   └── pubspec.yaml          # Flutter dependencies
│
├── web-app/                  # Next.js 15 Web Practice App
│   ├── src/
│   │   ├── app/              # App Router (Call Room, Topics, Auth)
│   │   │   └── api/tts/      # ⚡ Edge Neural TTS audio streaming endpoint
│   │   ├── lib/
│   │   │   └── hybrid-ai.ts  # 🧠 Firebase AI Logic: Hybrid Inference Engine (Gemini Nano + Cloud)
│   │   └── components/       # Video call viewport, transcript hud
│   └── package.json
│
├── admin-panel/              # Next.js 15 Admin & Analytics CMS
│   ├── src/
│   │   ├── app/              # Dashboard, Scenarios CMS, Gemini Config
│   │   └── lib/              # Firebase Admin & Firestore sync
│   └── package.json
│
├── playstore assets/         # Google Play Store listing graphic assets & 3D mascots
├── .gitignore                # Enterprise-grade git ignore rules
└── README.md                 # Project documentation & Hackathon architecture
```

---

## 🚀 Getting Started

### 📋 Prerequisites
* **Flutter SDK**: `>= 3.22.0`
* **Node.js**: `>= 18.18.0` (pnpm or npm)
* **Google Gemini API Key**: Free tier from [Google AI Studio](https://aistudio.google.com/app/apikey)
* **Firebase Project**: Firestore & Authentication enabled

---

### 1️⃣ Run the Flutter Mobile / Web App

```powershell
cd mobile-app
flutter pub get

# Run on Chrome Web (Port 8085)
flutter run -d web-server --web-port 8085 --web-hostname localhost

# Or run on connected Android Device
flutter run -d android
```

---

### 2️⃣ Run the Next.js Web App & Edge TTS Streamer

```powershell
cd web-app
npm install
npm run dev -- -p 3001
```
* The web practice room will run at `http://localhost:3001`
* Edge Neural TTS stream API active at `http://localhost:3001/api/tts`

---

### 3️⃣ Run the Admin Panel

```powershell
cd admin-panel
npm install
npm run dev -- -p 3000
```
* Access the telemetry and topic manager at `http://localhost:3000`

---

## 🔒 Security & Privacy
* **Zero Hardcoded Secrets**: All API tokens and credentials are encrypted or read from environment variables / Firestore.
* **Isolated Cloud Footprint**: Uses isolated Firestore collections (`lang_topics`, `lang_users`, `lang_settings`, `lang_sessions`) ensuring zero collision with existing database documents.
* **On-Device Data Protection**: In On-Device Nano mode, user voice and grammar analysis never leave the user's physical device.

---

## 🏆 Hackathon Submission Metadata
* **Track**: Google Firebase #BuildHybridAI 2026
* **Team**: InnoXpert Technologies / Janitha Dilshan (`@janiya2`)
* **Core Technologies**: Google Firebase, Firebase AI Logic, Gemini Nano (On-Device), Google Gemini 2.5 Flash (Cloud), Flutter Web/Mobile, Next.js 15, Edge Neural TTS.

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
