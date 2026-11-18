"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Mic,
  CreditCard,
  Eye,
  FileText,
  UserCheck,
  Server,
  Globe2,
  AlertTriangle,
  Mail,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Sparkles,
  ArrowLeft,
  Smartphone,
  Info,
  ListOrdered,
  ArrowUp
} from "lucide-react";

export default function PrivacyPolicyPage() {
  const [showTocModal, setShowTocModal] = useState(false);

  const scrollTo = (id: string) => {
    setShowTocModal(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const tocItems = [
    { id: "overview", label: "1. Overview & Scope" },
    { id: "collection", label: "2. Information We Collect" },
    { id: "audio-policy", label: "3. Microphone & Voice Data Policy" },
    { id: "ai-processing", label: "4. AI Models & Speech Processing" },
    { id: "subscriptions", label: "5. Subscriptions, Free Trials & Billing" },
    { id: "legal-basis", label: "6. Legal Bases for Processing (GDPR)" },
    { id: "subprocessors", label: "7. Third-Party Service Providers" },
    { id: "retention", label: "8. Data Retention & Deletion Schedules" },
    { id: "user-rights", label: "9. Your Rights (Access, Erasure, Export)" },
    { id: "children", label: "10. Children's Online Privacy (COPPA)" },
    { id: "security", label: "11. Security Measures & Encryption" },
    { id: "california", label: "12. California Privacy Notice (CCPA/CPRA)" },
    { id: "changes", label: "13. Updates to this Policy" },
    { id: "contact", label: "14. Data Protection Officer & Contact" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* TOP NAVIGATION HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/85 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg text-white tracking-tight">
                SpeakFlow <span className="text-indigo-400">AI</span>
              </span>
              <span className="block text-[10px] text-slate-400 font-mono tracking-wider uppercase">
                Legal & Trust Center
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Google Play Policy Compliant (v2.4)
            </span>
            <Link
              href="/terms"
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              Terms
            </Link>
            <button
              onClick={() => setShowTocModal(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-300 hover:text-white bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 px-3 py-1.5 rounded-lg transition-colors"
            >
              <ListOrdered className="w-3.5 h-3.5" />
              Jump to Section
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </Link>
          </div>
        </div>
      </header>

      {/* HERO BANNER (CENTERED) */}
      <section className="relative overflow-hidden py-14 border-b border-slate-800/80 bg-gradient-to-b from-slate-900/60 via-slate-950 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.25),rgba(255,255,255,0))] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-5">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            Privacy Policy & Personal Data Protection Charter
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Privacy Policy & Security Standards
          </h1>

          <div className="flex items-center justify-center gap-4 mt-4 text-xs sm:text-sm text-slate-400">
            <span>Effective Date: <strong className="text-white">November 8, 2026</strong></span>
            <span>•</span>
            <span>Last Updated: <strong className="text-white">November 9, 2026</strong></span>
            <span>•</span>
            <span className="text-indigo-400 font-semibold">Version 2.4</span>
          </div>

          <p className="mt-4 text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
            SpeakFlow AI (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your personal data, audio recordings, and privacy rights under the European Union General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA/CPRA), and the Google Play Developer Distribution Policy.
          </p>

          {/* Centered Graphic + Quick Highlights */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 bg-slate-900/80 p-5 rounded-2xl border border-slate-800 text-left">
            <img
              src="/images/privacy_shield.jpg"
              alt="Security Shield"
              className="w-28 h-28 rounded-xl object-cover shadow-xl border border-indigo-500/30 shrink-0"
            />
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Microphone captured only during active calls • Never in background</span>
              </div>
              <div className="flex items-center gap-2 text-indigo-300 font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Zero selling of voice samples or personal learning records</span>
              </div>
              <div className="flex items-center gap-2 text-purple-300 font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Google Play In-App Subscriptions with $0.00 3-day Free Trial</span>
              </div>
              <div className="flex items-center gap-2 text-pink-300 font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Full user control: 1-click account and data erasure in app settings</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK TABLE OF CONTENTS (INTERACTIVE IN-PAGE GRID) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              Quick Navigation (14 Complete Legal Sections)
            </h3>
            <span className="text-[11px] text-slate-500">Click to jump directly</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {tocItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left text-xs px-3 py-2 rounded-lg bg-slate-950/60 hover:bg-indigo-600/20 border border-slate-800/80 hover:border-indigo-500/40 text-slate-300 hover:text-white transition-all flex items-center justify-between group"
              >
                <span className="truncate">{item.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 shrink-0 ml-1" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN DOCUMENT BODY (BALANCED, BEAUTIFULLY CENTERED) */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <article className="space-y-12 text-slate-300 text-sm leading-relaxed">
          {/* SECTION 1 */}
          <section id="overview" className="scroll-mt-24 space-y-4 bg-slate-900/40 border border-slate-800/80 p-6 sm:p-8 rounded-2xl">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Globe2 className="w-4 h-4" /> Section 1
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              1. Overview & Scope of Application
            </h2>
            <p>
              This Privacy Policy applies to the <strong>SpeakFlow: AI Language Coach</strong> mobile application (Package Name: <code>com.innoxpert.speakflow</code>), available on the Google Play Store, our official website, cloud APIs, and administrative portals (collectively referred to as the &quot;Services&quot;).
            </p>
            <p>
              SpeakFlow AI is designed as a conversational foreign language learning companion. Our application allows users to practice real-time spoken English, Spanish, Japanese, Korean, Arabic, and Tamil with interactive AI personas. Because spoken conversation necessitates processing audio input from your device microphone, we prioritize rigorous transparency and data minimization.
            </p>
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 text-xs text-slate-400">
              <strong className="text-white block mb-1">Notice of Consent:</strong>
              By installing, downloading, registering for, or interacting with the SpeakFlow AI mobile application, you acknowledge that you have read, understood, and agreed to the practices outlined in this Privacy Policy. If you do not agree with any provision of this document, you must discontinue use of the Services immediately.
            </div>
          </section>

          {/* SECTION 2 */}
          <section id="collection" className="scroll-mt-24 space-y-4 bg-slate-900/40 border border-slate-800/80 p-6 sm:p-8 rounded-2xl">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Eye className="w-4 h-4" /> Section 2
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              2. Information We Collect
            </h2>
            <p>
              We adhere strictly to the principle of <em>data minimization</em>. We only collect personal data that is directly necessary to deliver, maintain, personalize, and secure your language practice experience. The categories of information we collect include:
            </p>

            <h3 className="text-base font-semibold text-white mt-4">A. Information You Provide Voluntarily</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li>
                <strong className="text-white">Account & Authentication Data:</strong> When you register via email and password, or through third-party federated login (such as Google Sign-In), we collect your unique user identifier (UID), email address, display name, and optional avatar URL managed via Google Firebase Authentication.
              </li>
              <li>
                <strong className="text-white">Language Learning Preferences:</strong> Your selected target practice language (e.g. English, Japanese), proficiency level (Beginner, Intermediate, Advanced), preferred AI coach persona (e.g. Sarah, Marcus, Elena), and topics of interest.
              </li>
              <li>
                <strong className="text-white">Custom Practice Topics:</strong> Text strings and subject prompts that you manually input when requesting dynamic custom scenario voice calls.
              </li>
            </ul>

            <h3 className="text-base font-semibold text-white mt-4">B. Audio & Conversational Interaction Data</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li>
                <strong className="text-white">Spoken Audio Inputs:</strong> Audio captured through your device microphone during an active voice practice call session.
              </li>
              <li>
                <strong className="text-white">Speech Transcripts & Grammar Analysis:</strong> The textual transcription of your speech generated in real-time, accompanied by automated pronunciation scores, fluency feedback, and grammatical error corrections.
              </li>
              <li>
                <strong className="text-white">Session Metadata:</strong> Call duration in seconds, timestamp, language spoken, coach persona utilized, and weekly target progress points earned.
              </li>
            </ul>

            <h3 className="text-base font-semibold text-white mt-4">C. In-App Purchase & Subscription Information</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li>
                <strong className="text-white">Transaction Metadata:</strong> Google Play Order IDs, subscription tier identifier (Weekly Pro Trial, Monthly Pass, Yearly VIP), subscription purchase date, expiry date, and auto-renewal status validated through RevenueCat and Google Play Billing.
              </li>
              <li>
                <strong className="text-white">Payment Method Security:</strong> <span className="underline text-emerald-400">We do NOT collect, view, process, or store credit card numbers, CVVs, or bank account credentials.</span> All monetary transactions are processed exclusively by Google Play through your Google Account.
              </li>
            </ul>

            <h3 className="text-base font-semibold text-white mt-4">D. Automated Technical & Device Information</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li>
                <strong className="text-white">Device Attributes:</strong> Device model, manufacturer, Android OS version, app version (e.g., 1.0.0), screen resolution, preferred system locale, and network connection type (Wi-Fi/Cellular).
              </li>
              <li>
                <strong className="text-white">Diagnostics & Telemetry:</strong> Anonymized application crash logs, API latency metrics, and performance counters to resolve audio stuttering or connection dropouts.
              </li>
            </ul>
          </section>

          {/* SECTION 3 */}
          <section id="audio-policy" className="scroll-mt-24 space-y-4 bg-slate-900/40 border border-slate-800/80 p-6 sm:p-8 rounded-2xl">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Mic className="w-4 h-4" /> Section 3
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              3. Device Microphone & Voice Data Policy
            </h2>
            <div className="bg-indigo-950/40 border border-indigo-500/30 p-5 rounded-xl">
              <h4 className="text-sm font-bold text-indigo-300 flex items-center gap-2 mb-1">
                <ShieldCheck className="w-5 h-5 text-indigo-400" />
                Google Play Microphone Permission Strict Compliance
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                The Android permission <code>RECORD_AUDIO</code> is declared solely for user-initiated spoken voice calls with your AI coach. SpeakFlow AI strictly complies with the Google Play Developer Policy regarding Dangerous Permissions and Personal & Sensitive User Data.
              </p>
            </div>

            <p>We enforce the following technical guarantees regarding your voice data:</p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">1</span>
                <div>
                  <strong className="text-white">Explicit User Initiation:</strong> The microphone is activated <em>only</em> when you explicitly press the green &quot;Quick Call&quot;, &quot;Call Scenario&quot;, or custom topic call button.
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">2</span>
                <div>
                  <strong className="text-white">No Background Audio Monitoring:</strong> When you hang up the call or navigate away from the call screen, the audio recorder and audio stream are immediately terminated and released from hardware memory. We never listen in the background.
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">3</span>
                <div>
                  <strong className="text-white">No Voice Commercialization:</strong> We will never sell, lease, monetize, or license your raw voice recordings, transcripts, or acoustic profiles to advertising brokers, data aggregators, or telemetry providers.
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">4</span>
                <div>
                  <strong className="text-white">Transient Audio Processing:</strong> Streaming audio chunks used for real-time speech recognition are held in volatile memory only for the duration required to generate the textual response and grammar analysis.
                </div>
              </div>
            </div>

            {/* Graphic Illustration */}
            <div className="my-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/30 via-slate-900 to-indigo-950/30 border border-emerald-500/20 flex flex-col sm:flex-row items-center gap-6">
              <img
                src="/images/voice_privacy.jpg"
                alt="Voice Privacy Protection"
                className="w-32 h-32 rounded-xl object-cover shrink-0 shadow-lg border border-emerald-500/30"
              />
              <div>
                <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  Encrypted Live Voice Channel
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Voice calls are streamed directly through TLS 1.3 cryptographic pipes to the speech engine. We do not store permanent audio voiceprints and we never share your voice samples with advertisers or public generative model training pools.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 4 */}
          <section id="ai-processing" className="scroll-mt-24 space-y-4 bg-slate-900/40 border border-slate-800/80 p-6 sm:p-8 rounded-2xl">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Section 4
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              4. Artificial Intelligence & Speech Processing Architecture
            </h2>
            <p>
              SpeakFlow AI utilizes Google DeepMind&apos;s multimodal generative models (including the Gemini Flash family) via secure Google Cloud Vertex AI infrastructure to power conversation turn-taking, grammatical corrections, and accent scoring.
            </p>
            <h3 className="text-base font-semibold text-white mt-4">Enterprise AI Privacy Protections:</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li>
                <strong className="text-white">Zero Public Model Training:</strong> Under our Google Cloud enterprise service agreements, customer conversational audio and prompts processed through the API are <strong>not used to train or refine foundation public AI models</strong>.
              </li>
              <li>
                <strong className="text-white">Deterministic Safety Guardrails:</strong> System prompts instruct AI coaches to refuse inappropriate, defamatory, sexually explicit, harmful, or illegal topics.
              </li>
              <li>
                <strong className="text-white">Feedback Storage:</strong> Corrected sentences and grammar feedback are stored under your personal profile document in Google Firestore (encrypted at rest) so you can review your learning progress. You may delete past call histories at any time from the Profile tab.
              </li>
            </ul>
          </section>

          {/* SECTION 5 */}
          <section id="subscriptions" className="scroll-mt-24 space-y-4 bg-slate-900/40 border border-slate-800/80 p-6 sm:p-8 rounded-2xl">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <CreditCard className="w-4 h-4" /> Section 5
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              5. In-App Subscriptions, Free Trials & Billing Compliance
            </h2>
            <p>
              SpeakFlow AI offers optional premium subscriptions (&quot;SpeakFlow Pro&quot;) providing uncapped daily voice practice minutes, priority AI low-latency voice engines, and full access to all 80+ conversational scenarios and coach personas.
            </p>

            <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-white">Official Google Play In-App Billing Terms:</h4>
              <ul className="list-disc pl-5 space-y-2 text-xs text-slate-300">
                <li>
                  <strong className="text-white">3-Day Free Trial:</strong> Certain subscription options (such as the Weekly Plan) include a 3-day free trial. The initial checkout registers at <strong>$0.00</strong> with Google Play. No funds are charged upon initial subscription start.
                </li>
                <li>
                  <strong className="text-white">Auto-Renewal Mechanism:</strong> Unless canceled at least 24 hours prior to the conclusion of the 3-day free trial, the subscription automatically converts to a paid recurring subscription at the price indicated on the in-app paywall (e.g. $9.99/week or $19.99/month).
                </li>
                <li>
                  <strong className="text-white">Cancellation Policy:</strong> You may cancel auto-renewal at any time without penalty by navigating to your <em>Google Play Store app &rarr; Account Profile &rarr; Payments & Subscriptions &rarr; Subscriptions</em>. Following cancellation, your premium access will remain active until the end of your current paid billing period.
                </li>
                <li>
                  <strong className="text-white">Refunds:</strong> Refund requests are governed by Google Play&apos;s standard refund policy. You may request a refund directly through the Google Play Help Center.
                </li>
              </ul>
            </div>
          </section>

          {/* SECTION 6 */}
          <section id="legal-basis" className="scroll-mt-24 space-y-4 bg-slate-900/40 border border-slate-800/80 p-6 sm:p-8 rounded-2xl">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <FileText className="w-4 h-4" /> Section 6
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              6. Legal Bases for Processing Personal Data (GDPR Article 6)
            </h2>
            <p>
              If you reside within the European Economic Area (EEA), the United Kingdom, or Switzerland, our processing of your personal data is justified under specific legal bases recognized by the General Data Protection Regulation (GDPR):
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <h4 className="text-sm font-bold text-indigo-300">1. Performance of Contract</h4>
                <p className="text-slate-400 mt-1">
                  Processing your account data, language level, and live microphone audio is necessary to provide the interactive language learning service you requested.
                </p>
              </div>
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <h4 className="text-sm font-bold text-emerald-300">2. Explicit Consent</h4>
                <p className="text-slate-400 mt-1">
                  Device runtime permissions for microphone audio capture and opt-in diagnostic crash reporting are processed solely upon your explicit consent.
                </p>
              </div>
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <h4 className="text-sm font-bold text-purple-300">3. Legitimate Interests</h4>
                <p className="text-slate-400 mt-1">
                  To prevent fraudulent access, secure our servers, analyze aggregated performance bottlenecks, and protect the integrity of our platform.
                </p>
              </div>
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <h4 className="text-sm font-bold text-pink-300">4. Legal Compliance</h4>
                <p className="text-slate-400 mt-1">
                  Where statutory laws, tax regulations, or consumer protection authorities require maintaining transaction or consent audit logs.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 7 */}
          <section id="subprocessors" className="scroll-mt-24 space-y-4 bg-slate-900/40 border border-slate-800/80 p-6 sm:p-8 rounded-2xl">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Server className="w-4 h-4" /> Section 7
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              7. Third-Party Service Providers & Subprocessors
            </h2>
            <p>
              To provide enterprise-grade reliability and low-latency audio transmission, we share limited categories of personal data with vetted subprocessor organizations bound by stringent Data Processing Agreements (DPAs):
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
                <thead className="bg-slate-950 text-slate-300 font-semibold uppercase">
                  <tr>
                    <th className="p-3 border-b border-slate-800">Provider</th>
                    <th className="p-3 border-b border-slate-800">Purpose</th>
                    <th className="p-3 border-b border-slate-800">Data Transferred</th>
                    <th className="p-3 border-b border-slate-800">Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300 bg-slate-950/40">
                  <tr>
                    <td className="p-3 font-semibold text-white">Google Cloud & Firebase</td>
                    <td className="p-3">Authentication, Firestore database, cloud storage, AI processing</td>
                    <td className="p-3">UID, email, practice stats, encrypted audio stream</td>
                    <td className="p-3">United States / Global</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">Google Play Billing</td>
                    <td className="p-3">Payment processing, recurring subscription auto-renewal</td>
                    <td className="p-3">Order token, package ID (No card details stored by us)</td>
                    <td className="p-3">United States / Global</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">RevenueCat Inc.</td>
                    <td className="p-3">Subscription receipt validation and entitlement management</td>
                    <td className="p-3">App User ID (UID), purchase token, receipt hash</td>
                    <td className="p-3">United States</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 8 */}
          <section id="retention" className="scroll-mt-24 space-y-4 bg-slate-900/40 border border-slate-800/80 p-6 sm:p-8 rounded-2xl">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <ClockIcon className="w-4 h-4" /> Section 8
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              8. Data Retention & Automated Deletion Cycles
            </h2>
            <p>
              We do not retain personal information for longer than necessary to fulfill the educational purposes for which it was gathered.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li>
                <strong className="text-white">Streaming Audio Chunks:</strong> Retained only in volatile memory during the active phone call session, then discarded within seconds of the conversational turn completing.
              </li>
              <li>
                <strong className="text-white">Past Call Summaries:</strong> Saved in your account history until you manually delete them from the Profile tab or until you terminate your account.
              </li>
              <li>
                <strong className="text-white">Account Deletion:</strong> When an account deletion request is triggered, all profile documents, target scores, and linked conversation summaries are permanently expunged within 30 days.
              </li>
            </ul>
          </section>

          {/* SECTION 9 */}
          <section id="user-rights" className="scroll-mt-24 space-y-4 bg-slate-900/40 border border-slate-800/80 p-6 sm:p-8 rounded-2xl">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <UserCheck className="w-4 h-4" /> Section 9
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              9. Your Rights (Access, Correction, Erasure, Export)
            </h2>
            <p>
              Depending on your geographical jurisdiction, you possess statutory rights concerning your personal information:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <strong className="text-white block mb-1">Right to Access & Portability</strong>
                Request a readable copy of all learning stats, transcripts, and profile attributes we store.
              </div>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <strong className="text-white block mb-1">Right to Rectification</strong>
                Modify incorrect target languages, names, or learning preferences directly in the app settings.
              </div>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <strong className="text-white block mb-1">Right to Erasure (&quot;Right to be Forgotten&quot;)</strong>
                Request irreversible purging of your user record and conversational logs.
              </div>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <strong className="text-white block mb-1">Right to Withdraw Consent</strong>
                Revoke microphone permissions in your Android system settings at any moment.
              </div>
            </div>
          </section>

          {/* SECTION 10 */}
          <section id="children" className="scroll-mt-24 space-y-4 bg-slate-900/40 border border-slate-800/80 p-6 sm:p-8 rounded-2xl">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" /> Section 10
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              10. Children&apos;s Online Privacy Protection (COPPA & GDPR Article 8)
            </h2>
            <p>
              SpeakFlow AI is designed for general audiences and foreign language students aged 13 and older (or 16 in certain European member states). We do not knowingly solicit, collect, or market to children under the age of 13.
            </p>
            <p>
              If we become aware that personal information of a child under the statutory minimum age has been collected without verified parental consent, we will immediately take steps to permanently delete that information from our servers. Parents or guardians who believe their child has created an account may contact us at <code>privacy@speakflow.ai</code> for expedited removal.
            </p>
          </section>

          {/* SECTION 11 */}
          <section id="security" className="scroll-mt-24 space-y-4 bg-slate-900/40 border border-slate-800/80 p-6 sm:p-8 rounded-2xl">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Lock className="w-4 h-4" /> Section 11
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              11. Security Measures & Encryption Protocols
            </h2>
            <p>
              We implement comprehensive administrative, technical, and physical safeguards designed to prevent unauthorized access, alteration, disclosure, or destruction of personal data:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li><strong className="text-white">Encryption in Transit:</strong> All data transmitted between the mobile application, Firebase, and AI APIs is encrypted via TLS 1.3 cryptographic protocols with modern cipher suites.</li>
              <li><strong className="text-white">Encryption at Rest:</strong> Firestore databases and cloud storage buckets employ AES-256 server-side encryption.</li>
              <li><strong className="text-white">Least-Privilege Access:</strong> Access to production databases is strictly restricted to authorized engineers via multi-factor authentication (MFA) and audited security logs.</li>
            </ul>
          </section>

          {/* SECTION 12 */}
          <section id="california" className="scroll-mt-24 space-y-4 bg-slate-900/40 border border-slate-800/80 p-6 sm:p-8 rounded-2xl">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <FileText className="w-4 h-4" /> Section 12
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              12. Notice to California Residents (CCPA / CPRA)
            </h2>
            <p>
              Under the California Consumer Privacy Act as amended by the California Privacy Rights Act (CPRA), California residents are entitled to specific disclosures:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li><strong className="text-white">We Do NOT Sell Personal Information:</strong> In the preceding twelve (12) months, SpeakFlow AI has not sold or shared any personal information for cross-context behavioral advertising.</li>
              <li><strong className="text-white">Non-Discrimination:</strong> We will not discriminate against you (by denying services, charging different rates, or degrading service quality) for exercising your privacy rights under California law.</li>
            </ul>
          </section>

          {/* SECTION 13 */}
          <section id="changes" className="scroll-mt-24 space-y-4 bg-slate-900/40 border border-slate-800/80 p-6 sm:p-8 rounded-2xl">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Info className="w-4 h-4" /> Section 13
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              13. Updates to this Privacy Policy
            </h2>
            <p>
              We may periodically update this Privacy Policy to reflect changes in legal mandates, Google Play developer requirements, or new learning features in our app. When modifications occur, we will update the &quot;Last Updated&quot; date at the top of this document and notify active users via an in-app dialog or push announcement if changes are material.
            </p>
          </section>

          {/* SECTION 14 */}
          <section id="contact" className="scroll-mt-24 space-y-4 bg-slate-900/40 border border-slate-800/80 p-6 sm:p-8 rounded-2xl">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Mail className="w-4 h-4" /> Section 14
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              14. Data Protection Officer & Contact Information
            </h2>
            <p>
              If you have questions, comments, or wish to exercise any of your statutory privacy rights under GDPR or CCPA, our dedicated Data Protection Officer (DPO) and privacy compliance team may be reached directly:
            </p>

            <div className="bg-slate-950/80 p-6 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="text-white font-bold text-sm">SpeakFlow AI Privacy & Compliance Office</div>
              <p className="text-slate-400">Developer Organization: <strong className="text-white">InnoXpert Digital Systems</strong></p>
              <p className="text-slate-400">Email: <a href="mailto:privacy@speakflow.ai" className="text-indigo-400 hover:underline">privacy@speakflow.ai</a> or <a href="mailto:support@innoxpert.com" className="text-indigo-400 hover:underline">support@innoxpert.com</a></p>
              <p className="text-slate-500">Inquiries SLA: We acknowledge all Data Subject Access Requests (DSARs) within 48 business hours.</p>
            </div>
          </section>
        </article>
      </main>

      {/* FLOATING ACTION BUTTONS (QUICK JUMP & SCROLL TO TOP) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2">
        <button
          onClick={scrollToTop}
          title="Scroll to Top"
          className="w-10 h-10 rounded-full bg-slate-900/90 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 shadow-xl flex items-center justify-center transition-all"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
        <button
          onClick={() => setShowTocModal(true)}
          title="Table of Contents"
          className="w-10 h-10 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 shadow-xl shadow-indigo-600/30 flex items-center justify-center transition-all"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
      </div>

      {/* MODAL JUMP DIALOG */}
      {showTocModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                Select Section to Jump
              </h4>
              <button
                onClick={() => setShowTocModal(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded-lg bg-slate-800"
              >
                Close ✕
              </button>
            </div>

            <div className="grid grid-cols-1 gap-1.5 max-h-[60vh] overflow-y-auto pr-1">
              {tocItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="w-full text-left text-xs px-3.5 py-2.5 rounded-xl bg-slate-950/60 hover:bg-indigo-600/20 border border-slate-800 hover:border-indigo-500/30 text-slate-300 hover:text-white transition-all flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="flex items-center justify-center gap-4 mb-2">
          <Link href="/privacy" className="text-emerald-400 font-semibold hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <span>•</span>
          <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">
            Terms of Service
          </Link>
        </div>
        <p>&copy; {new Date().getFullYear()} InnoXpert • SpeakFlow AI. All rights reserved.</p>
        <p className="mt-1">Google Play and the Google Play logo are trademarks of Google LLC.</p>
      </footer>
    </div>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
