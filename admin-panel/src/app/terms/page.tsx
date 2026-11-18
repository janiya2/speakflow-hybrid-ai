"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  ShieldCheck,
  CreditCard,
  Scale,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  ListOrdered,
  ArrowUp,
  AlertCircle,
  HelpCircle,
  RefreshCw,
  Ban,
  Lock,
  ExternalLink,
  ChevronRight,
  Info
} from "lucide-react";

export default function TermsOfServicePage() {
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
    { id: "acceptance", label: "1. Acceptance of Terms & Parties" },
    { id: "eligibility", label: "2. Eligibility & Account Security" },
    { id: "service-scope", label: "3. AI Coaching Scope & Educational Purpose" },
    { id: "subscriptions", label: "4. Free Trial, Subscriptions & Auto-Renewal" },
    { id: "cancellation", label: "5. Cancellation & Google Play Refund Policy" },
    { id: "voice-content", label: "6. Microphone, Voice Input & User Content" },
    { id: "acceptable-use", label: "7. Acceptable Use & Conduct Rules" },
    { id: "ai-disclaimer", label: "8. AI Limitations & Accuracy Disclaimers" },
    { id: "intellectual-prop", label: "9. Intellectual Property & Trademarks" },
    { id: "technical-reqs", label: "10. Technical Requirements & Updates" },
    { id: "termination", label: "11. Account Suspension & Termination" },
    { id: "warranty", label: "12. Disclaimer of Warranties (AS-IS)" },
    { id: "liability", label: "13. Limitation of Liability & Indemnity" },
    { id: "governing-law", label: "14. Governing Law, Disputes & Contact" },
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
                Terms of Service
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
              <Scale className="w-3.5 h-3.5" />
              Google Play In-App Billing v7
            </span>
            <Link
              href="/privacy"
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Privacy Policy
            </Link>
            <button
              onClick={() => setShowTocModal(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-300 hover:text-white bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 px-3 py-1.5 rounded-lg transition-colors"
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Jump to Section</span>
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

      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-900/80 via-slate-950 to-slate-950 py-12 sm:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 mb-5">
            <Scale className="w-4 h-4 text-indigo-400" />
            Official End User License Agreement & Subscription Terms
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Terms of Service & <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              Subscription Agreement
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Welcome to SpeakFlow AI. These Terms govern your access to and use of our mobile application, voice coaching services, subscriptions, and website. Please read them thoroughly.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Effective Date: November 9, 2026
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1 rounded-full">
              <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
              Last Updated: November 2026
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              Developer: InnoXpert
            </span>
          </div>

          {/* KEY HIGHLIGHTS BOX */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <CreditCard className="w-5 h-5 text-indigo-400 mb-2" />
              <h4 className="text-xs font-bold text-white">3-Day Free Trial</h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Zero initial payment. Renews at selected tier unless cancelled 24 hours prior.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <RefreshCw className="w-5 h-5 text-emerald-400 mb-2" />
              <h4 className="text-xs font-bold text-white">Cancel Anytime</h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Manage or cancel anytime directly in Google Play Store Subscriptions.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <Sparkles className="w-5 h-5 text-pink-400 mb-2" />
              <h4 className="text-xs font-bold text-white">Educational AI</h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Voice coaching is for educational fluency practice and self-improvement.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <Lock className="w-5 h-5 text-purple-400 mb-2" />
              <h4 className="text-xs font-bold text-white">Your Data Security</h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Live audio is processed ephemerally in RAM and never sold or shared.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN LEGAL CONTENT CONTAINER */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* QUICK JUMP DIRECTORY */}
        <div className="mb-12 p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <ListOrdered className="w-4 h-4 text-indigo-400" />
            Quick Navigation Index
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {tocItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left text-slate-300 hover:text-indigo-300 transition-colors py-1 flex items-center justify-between group"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-indigo-400 transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* 1. ACCEPTANCE OF TERMS */}
        <section id="acceptance" className="mb-14 scroll-mt-24">
          <span className="text-xs font-bold font-mono tracking-wider text-indigo-400 uppercase">Section 01</span>
          <h2 className="text-2xl font-black text-white mt-1 mb-4 flex items-center gap-2">
            1. Acceptance of Terms & Contracting Parties
          </h2>
          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <p>
              These Terms of Service (the &quot;<strong>Terms</strong>&quot;) constitute a legally binding agreement entered into between you (&quot;<strong>User</strong>&quot;, &quot;<strong>you</strong>&quot;, or &quot;<strong>your</strong>&quot;) and <strong>InnoXpert</strong> (&quot;<strong>InnoXpert</strong>&quot;, &quot;<strong>we</strong>&quot;, &quot;<strong>us</strong>&quot;, or &quot;<strong>our</strong>&quot;), regarding your access to and use of the <strong>SpeakFlow AI: Language Coach</strong> mobile application, related digital services, websites, backend APIs, and conversational coaching environments (collectively referred to as the &quot;<strong>Service</strong>&quot; or &quot;<strong>SpeakFlow AI</strong>&quot;).
            </p>
            <p>
              BY DOWNLOADING, INSTALLING, REGISTERING FOR, ACCESSING, OR USING SPEAKFLOW AI, OR BY INITIATING A FREE TRIAL OR PAID SUBSCRIPTION VIA GOOGLE PLAY, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS AND OUR <Link href="/privacy" className="text-indigo-400 hover:underline font-semibold">PRIVACY POLICY</Link>. IF YOU DO NOT AGREE TO ALL OF THESE TERMS, YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICE AND MUST IMMEDIATELY CEASE USAGE AND UNINSTALL THE APPLICATION.
            </p>
          </div>
        </section>

        {/* 2. ELIGIBILITY */}
        <section id="eligibility" className="mb-14 scroll-mt-24">
          <span className="text-xs font-bold font-mono tracking-wider text-indigo-400 uppercase">Section 02</span>
          <h2 className="text-2xl font-black text-white mt-1 mb-4 flex items-center gap-2">
            2. Eligibility, Account Registration & Security
          </h2>
          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <p>
              <strong>2.1 Age Requirements:</strong> The Service is intended for individuals who are at least 13 years of age (or the minimum legal age for digital consent in your jurisdiction, such as 16 in certain European Economic Area nations). If you are between 13 and the legal age of majority in your jurisdiction, you may only access SpeakFlow AI with the active consent, supervision, and agreement of your parent or legal guardian.
            </p>
            <p>
              <strong>2.2 Account Credentials:</strong> To access conversational coaching, fluency trackers, and subscription tiers, you may be required to register an account using Google Sign-In or verified email authentication powered by Google Firebase. You agree to provide accurate, current, and complete information and maintain the confidentiality of your account credentials. You are solely responsible for all activities conducted through your account.
            </p>
            <p>
              <strong>2.3 Prohibited Sharing:</strong> Subscriptions are licensed on a single-user personal basis. You may not share, sell, transfer, or sublicense your login credentials or active subscription to third parties.
            </p>
          </div>
        </section>

        {/* 3. SERVICE SCOPE */}
        <section id="service-scope" className="mb-14 scroll-mt-24">
          <span className="text-xs font-bold font-mono tracking-wider text-indigo-400 uppercase">Section 03</span>
          <h2 className="text-2xl font-black text-white mt-1 mb-4 flex items-center gap-2">
            3. AI Coaching Scope & Educational Disclaimer
          </h2>
          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <p>
              <strong>3.1 Real-Time Conversational Practice:</strong> SpeakFlow AI provides interactive, real-time simulated spoken English dialogue, vocabulary expansion prompts, pronunciation evaluation, grammatical suggestions, and personalized learning plans driven by artificial intelligence language models (including Google Gemini and integrated speech recognition pipelines).
            </p>
            <p>
              <strong>3.2 Educational Purpose Only:</strong> The Service is strictly designed for educational self-study, language practice, and accent familiarization. SpeakFlow AI does NOT grant official academic credits, state-certified diplomas, or formal accreditation for standardized tests (such as IELTS, TOEFL, or CEFR certifications) unless explicitly stated under a designated institutional partnership.
            </p>
            <p>
              <strong>3.3 No Human Tutor Representation:</strong> AI personas and tutor avatars (such as &quot;Elena - Professional English Tutor&quot;) are algorithmic synthetic agents designed to facilitate engaging language learning exercises. They are not licensed human educators, medical therapists, or legal counselors.
            </p>
          </div>
        </section>

        {/* 4. SUBSCRIPTIONS & FREE TRIALS */}
        <section id="subscriptions" className="mb-14 scroll-mt-24">
          <span className="text-xs font-bold font-mono tracking-wider text-indigo-400 uppercase">Section 04</span>
          <h2 className="text-2xl font-black text-white mt-1 mb-4 flex items-center gap-2">
            4. Subscriptions, 3-Day Free Trial, Auto-Renewal & Billing
          </h2>
          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/50 mb-3">
              <h4 className="text-sm font-bold text-indigo-200 flex items-center gap-2 mb-1.5">
                <CreditCard className="w-4 h-4 text-indigo-400" />
                Google Play Billing & Free Trial Transparency Policy
              </h4>
              <p className="text-xs text-indigo-200/80 leading-relaxed">
                All subscriptions, trials, and charges are processed securely through Google Play In-App Billing in full compliance with the Google Play Developer Distribution Agreement. InnoXpert does not store or process your credit card numbers or payment instruments.
              </p>
            </div>

            <p>
              <strong>4.1 3-Day Free Trial Policy:</strong> SpeakFlow AI offers a 3-day complimentary trial for new subscribers choosing the Weekly Pro Tier. The trial begins immediately upon checkout verification ($0.00 initial charge on Google Play). During this trial, you enjoy unrestricted access to AI conversational sessions, pronunciation feedback, and lesson plans.
            </p>
            <p>
              <strong>4.2 Automatic Renewal:</strong> UNLESS YOU CANCEL YOUR SUBSCRIPTION AT LEAST TWENTY-FOUR (24) HOURS BEFORE THE EXPIRATION OF THE 3-DAY TRIAL PERIOD, YOUR SUBSCRIPTION WILL AUTOMATICALLY CONVERT INTO A PAID RECURRING SUBSCRIPTION, AND YOUR GOOGLE PLAY PAYMENT METHOD WILL BE CHARGED THE APPLICABLE WEEKLY RATE (USD $6.99/WEEK OR LOCAL CURRENCY EQUIVALENT).
            </p>
            <p>
              <strong>4.3 Recurring Billing Cycles:</strong> Following the activation of a paid subscription (Weekly, Monthly at USD $19.99/month, or Yearly at USD $39.99/year), the subscription automatically renews at the beginning of each billing interval unless cancelled prior to the renewal date. Renewal fees will be charged to your linked Google Play account within twenty-four (24) hours preceding the end of the current billing cycle.
            </p>
            <p>
              <strong>4.4 Pricing & Currency Conversions:</strong> Subscription rates are displayed in United States Dollars (USD) and converted into your local domestic currency (such as LKR, EUR, GBP, INR) at checkout by Google Play based on prevailing foreign exchange rates and applicable regional taxes (e.g., VAT, GST). InnoXpert reserves the right to revise subscription fees upon thirty (30) days advance notice via email or in-app announcement; price changes will only take effect on subsequent renewal periods.
            </p>
          </div>
        </section>

        {/* 5. CANCELLATION & REFUNDS */}
        <section id="cancellation" className="mb-14 scroll-mt-24">
          <span className="text-xs font-bold font-mono tracking-wider text-indigo-400 uppercase">Section 05</span>
          <h2 className="text-2xl font-black text-white mt-1 mb-4 flex items-center gap-2">
            5. Cancellation Procedure & Refund Policy
          </h2>
          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <p>
              <strong>5.1 How to Cancel Anytime:</strong> You may cancel your subscription or trial at any time directly through your Google Play account. Uninstalling the SpeakFlow AI mobile application does NOT cancel your subscription. To cancel:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-xs text-slate-300 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <li>Open the <strong>Google Play Store</strong> app on your Android device.</li>
              <li>Tap your profile avatar at the top right corner.</li>
              <li>Tap <strong>Payments &amp; subscriptions</strong> &gt; <strong>Subscriptions</strong>.</li>
              <li>Select <strong>SpeakFlow AI: Language Coach</strong>.</li>
              <li>Tap <strong>Cancel subscription</strong> and follow on-screen instructions.</li>
            </ol>
            <p>
              <strong>5.2 Continued Access Post-Cancellation:</strong> If you cancel during an active billing cycle, you retain full access to Pro features until the end of your prepaid period. No further recurring charges will occur.
            </p>
            <p>
              <strong>5.3 Refund Policy:</strong> Because all transactions are executed directly by Google Play, refund requests are governed by the official <a href="https://support.google.com/googleplay/answer/2479637" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">Google Play Refund Policy</a>. Typically, if you request a refund within 48 hours of purchase through Google Play, Google may grant a refund. After 48 hours, refunds are granted at Google Play&apos;s sole discretion. InnoXpert does not issue manual cash refunds for store-billed subscriptions.
            </p>
          </div>
        </section>

        {/* 6. VOICE CONTENT & MICROPHONE */}
        <section id="voice-content" className="mb-14 scroll-mt-24">
          <span className="text-xs font-bold font-mono tracking-wider text-indigo-400 uppercase">Section 06</span>
          <h2 className="text-2xl font-black text-white mt-1 mb-4 flex items-center gap-2">
            6. Microphone Access, Voice Input & User Content
          </h2>
          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <p>
              <strong>6.1 Microphone Permission:</strong> SpeakFlow AI requires dynamic runtime microphone access (<code className="text-xs bg-slate-800 px-1.5 py-0.5 rounded text-indigo-300">RECORD_AUDIO</code>) to facilitate speech-to-text processing, phoneme evaluation, and responsive conversational dialogues. You may revoke microphone access at any time via Android Device Settings, though doing so prevents interactive voice calls.
            </p>
            <p>
              <strong>6.2 Ephemeral Audio Processing:</strong> As detailed in our Privacy Policy, your live audio streams are processed ephemerally in RAM solely to generate textual transcripts and phoneme scores. Raw audio recordings are NOT archived or sold.
            </p>
            <p>
              <strong>6.3 Limited License:</strong> You retain full ownership of any content, statements, and practice sentences you speak or submit. By using the Service, you grant InnoXpert a worldwide, royalty-free, non-exclusive license solely to transmit, process, and render such inputs for the purpose of providing real-time AI voice feedback to you.
            </p>
          </div>
        </section>

        {/* 7. ACCEPTABLE USE */}
        <section id="acceptable-use" className="mb-14 scroll-mt-24">
          <span className="text-xs font-bold font-mono tracking-wider text-indigo-400 uppercase">Section 07</span>
          <h2 className="text-2xl font-black text-white mt-1 mb-4 flex items-center gap-2">
            7. Acceptable Use Policy & Community Guidelines
          </h2>
          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <p>You agree NOT to engage in any of the following prohibited activities:</p>
            <ul className="list-disc pl-6 space-y-2 text-xs text-slate-300">
              <li><strong>Model Abuse & Jailbreaking:</strong> Attempting to prompt-inject, exploit, reverse-engineer, or circumvent safety guardrails of our AI models to produce illegal, abusive, defamatory, or harmful content.</li>
              <li><strong>Harmful Voice Transmissions:</strong> Transmitting harassing, hate speech, explicit, sexually suggestive, or violent spoken audio into the conversational simulator.</li>
              <li><strong>Automated Scraping:</strong> Using bots, crawlers, spiders, or automated scripts to scrape learning content, curriculum datasets, or session transcripts.</li>
              <li><strong>Reverse Engineering:</strong> Decompiling, disassembling, modifying, or copying the source code, APK binaries, or proprietary algorithms of SpeakFlow AI.</li>
              <li><strong>Security Circumvention:</strong> Bypassing subscription paywalls, receipt verification handshakes, or API token authentication mechanisms.</li>
            </ul>
          </div>
        </section>

        {/* 8. AI DISCLAIMERS */}
        <section id="ai-disclaimer" className="mb-14 scroll-mt-24">
          <span className="text-xs font-bold font-mono tracking-wider text-indigo-400 uppercase">Section 08</span>
          <h2 className="text-2xl font-black text-white mt-1 mb-4 flex items-center gap-2">
            8. Artificial Intelligence Limitations & Accuracy Disclaimers
          </h2>
          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <p>
              <strong>8.1 Inherent Nature of AI:</strong> Generative AI models generate natural language responses probabilistically. While we implement strict quality prompts and system constraints, outputs may occasionally include linguistic nuances, grammatical anomalies, or hallucinations. You acknowledge that AI output is for self-study and conversational practice only.
            </p>
            <p>
              <strong>8.2 Speech Recognition Accuracy:</strong> Speech-to-text accuracy is affected by environmental background noise, microphone hardware quality, regional accents, and speaker volume. InnoXpert does not warrant 100% precision in speech recognition or pronunciation scoring.
            </p>
          </div>
        </section>

        {/* 9. INTELLECTUAL PROPERTY */}
        <section id="intellectual-prop" className="mb-14 scroll-mt-24">
          <span className="text-xs font-bold font-mono tracking-wider text-indigo-400 uppercase">Section 09</span>
          <h2 className="text-2xl font-black text-white mt-1 mb-4 flex items-center gap-2">
            9. Intellectual Property Rights & Trademarks
          </h2>
          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <p>
              All software, algorithms, user interface designs, logos, graphics, audio prompts, lesson scenarios, database schemas, and documentation related to SpeakFlow AI are the exclusive intellectual property of <strong>InnoXpert</strong> and its licensors.
            </p>
            <p>
              &quot;SpeakFlow AI&quot;, &quot;InnoXpert&quot;, and related brand insignia are trademarks of InnoXpert. Google Play, Android, and Gemini are trademarks of Google LLC. All third-party trademarks belong to their respective owners.
            </p>
          </div>
        </section>

        {/* 10. TECHNICAL REQS */}
        <section id="technical-reqs" className="mb-14 scroll-mt-24">
          <span className="text-xs font-bold font-mono tracking-wider text-indigo-400 uppercase">Section 10</span>
          <h2 className="text-2xl font-black text-white mt-1 mb-4 flex items-center gap-2">
            10. Technical Requirements & Updates
          </h2>
          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <p>
              <strong>10.1 Connectivity:</strong> SpeakFlow AI requires an active internet connection (Wi-Fi, 4G, or 5G mobile data) to communicate with AI servers. Standard data carrier rates may apply.
            </p>
            <p>
              <strong>10.2 App Updates:</strong> InnoXpert may release mandatory or optional application updates via Google Play to introduce features, address security patches, or enhance compatibility. Certain features may require updating to the latest application version.
            </p>
          </div>
        </section>

        {/* 11. TERMINATION */}
        <section id="termination" className="mb-14 scroll-mt-24">
          <span className="text-xs font-bold font-mono tracking-wider text-indigo-400 uppercase">Section 11</span>
          <h2 className="text-2xl font-black text-white mt-1 mb-4 flex items-center gap-2">
            11. Account Suspension & Termination
          </h2>
          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <p>
              We reserve the right to suspend or terminate your account and access to the Service immediately, without prior notice or liability, if you violate these Terms, engage in fraudulent subscription activities, or abuse our conversational servers.
            </p>
            <p>
              Upon termination, your right to use the Service immediately ceases. You may terminate your agreement with us at any time by cancelling your subscription in Google Play and deleting your account.
            </p>
          </div>
        </section>

        {/* 12. WARRANTY DISCLAIMER */}
        <section id="warranty" className="mb-14 scroll-mt-24">
          <span className="text-xs font-bold font-mono tracking-wider text-indigo-400 uppercase">Section 12</span>
          <h2 className="text-2xl font-black text-white mt-1 mb-4 flex items-center gap-2">
            12. Disclaimer of Warranties (&quot;AS IS&quot;)
          </h2>
          <div className="space-y-4 text-sm text-slate-300 leading-relaxed p-5 bg-slate-900/60 rounded-xl border border-slate-800">
            <p className="text-xs uppercase tracking-wider text-amber-400 font-bold">Important Statutory Notice</p>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, SPEAKFLOW AI AND ALL ASSOCIATED SERVICES ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE. INNOXPERT DISCLAIMS ALL WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND UNINTERRUPTED AVAILABILITY.
            </p>
          </div>
        </section>

        {/* 13. LIMITATION OF LIABILITY */}
        <section id="liability" className="mb-14 scroll-mt-24">
          <span className="text-xs font-bold font-mono tracking-wider text-indigo-400 uppercase">Section 13</span>
          <h2 className="text-2xl font-black text-white mt-1 mb-4 flex items-center gap-2">
            13. Limitation of Liability & Indemnification
          </h2>
          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <p>
              IN NO EVENT SHALL INNOXPERT, ITS DIRECTORS, EMPLOYEES, PARTNERS, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES (INCLUDING LOSS OF PROFITS, DATA, USE, OR GOODWILL) ARISING OUT OF OR IN CONNECTION WITH YOUR USE OR INABILITY TO USE THE SERVICE. IN NO EVENT SHALL INNOXPERT&apos;S TOTAL AGGREGATE LIABILITY EXCEED THE TOTAL AMOUNT PAID BY YOU TO INNOXPERT VIA GOOGLE PLAY IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
            </p>
            <p>
              You agree to defend, indemnify, and hold harmless InnoXpert against any claims, damages, liabilities, and expenses arising from your violation of these Terms or misuse of the Service.
            </p>
          </div>
        </section>

        {/* 14. GOVERNING LAW & CONTACT */}
        <section id="governing-law" className="mb-14 scroll-mt-24">
          <span className="text-xs font-bold font-mono tracking-wider text-indigo-400 uppercase">Section 14</span>
          <h2 className="text-2xl font-black text-white mt-1 mb-4 flex items-center gap-2">
            14. Governing Law, Dispute Resolution & Contact Information
          </h2>
          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <p>
              <strong>14.1 Governing Law:</strong> These Terms shall be governed by and construed in accordance with the laws of the Democratic Socialist Republic of Sri Lanka, without regard to conflict of law principles. Any dispute arising out of or in connection with these Terms shall be resolved amicably through good-faith informal negotiations before initiating legal proceedings.
            </p>
            <p>
              <strong>14.2 Contact for Legal Inquiries:</strong> If you have questions regarding these Terms or subscription policies, contact our legal desk:
            </p>

            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
              <p className="font-bold text-white text-sm">SpeakFlow AI Legal &amp; Compliance Desk</p>
              <p className="text-slate-400">Developer Entity: <span className="text-white font-medium">InnoXpert</span></p>
              <p className="text-slate-400">
                Official Support Email:{" "}
                <a href="mailto:support@innoxpert.com" className="text-indigo-400 hover:underline">
                  support@innoxpert.com
                </a>{" "}
                or{" "}
                <a href="mailto:privacy@speakflow.ai" className="text-indigo-400 hover:underline">
                  privacy@speakflow.ai
                </a>
              </p>
              <p className="text-slate-400">Inquiry Response SLA: All user inquiries are answered within 2 business days.</p>
            </div>
          </div>
        </section>
      </main>

      {/* FLOATING ACTION PILLS */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
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
          <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <span>•</span>
          <Link href="/terms" className="text-indigo-400 font-semibold hover:text-white transition-colors">
            Terms of Service
          </Link>
        </div>
        <p>&copy; {new Date().getFullYear()} InnoXpert • SpeakFlow AI. All rights reserved.</p>
        <p className="mt-1">Google Play and the Google Play logo are trademarks of Google LLC.</p>
      </footer>
    </div>
  );
}

