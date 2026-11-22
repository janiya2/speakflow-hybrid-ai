"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export interface LandingPageConfig {
  heroBadge?: string;
  heroHeadline?: string;
  heroSubtitle?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  robotImageUrl?: string;
  heroBannerUrl?: string;
  flameImageUrl?: string;
  bigBenImageUrl?: string;
  dashboardMockupUrl?: string;
  apkDownloadUrl?: string;
  playStoreUrl?: string;
  webAppUrl?: string;
  demoVideoUrl?: string;
  statMinutes?: string;
  statStudents?: string;
  statFluency?: string;
  statLanguages?: string;
  feature1Title?: string;
  feature1Desc?: string;
  feature2Title?: string;
  feature2Desc?: string;
  feature3Title?: string;
  feature3Desc?: string;
  feature4Title?: string;
  feature4Desc?: string;
  announcementText?: string;
  announcementActive?: boolean;
  weeklyPrice?: string;
  monthlyPrice?: string;
  yearlyPrice?: string;
  yearlySavings?: string;
}

interface LandingPageProps {
  onStartCall: (topicId?: string) => void;
  onOpenDashboard: () => void;
  onOpenAuth: (mode?: "login" | "signup") => void;
  themeMode?: "dark" | "light";
  onToggleTheme?: (theme: "dark" | "light") => void;
  adminNotice?: string;
  config?: Partial<LandingPageConfig>;
  onOpenAdminCMS?: () => void;
}

export default function LandingPage({
  onStartCall,
  onOpenDashboard,
  onOpenAuth,
  themeMode = "dark",
  onToggleTheme,
  adminNotice,
  config,
  onOpenAdminCMS,
}: LandingPageProps) {
  const [activeTheme, setActiveTheme] = useState<"dark" | "light">(themeMode);
  const [selectedScenarioCategory, setSelectedScenarioCategory] = useState<string>("All");
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const [isPlayingDemoVoice, setIsPlayingDemoVoice] = useState(false);
  const [activeLanguageCard, setActiveLanguageCard] = useState<string>("Sinhala");

  useEffect(() => {
    setActiveTheme(themeMode);
  }, [themeMode]);

  const toggleThemeLocal = () => {
    const next = activeTheme === "dark" ? "light" : "dark";
    setActiveTheme(next);
    if (onToggleTheme) onToggleTheme(next);
  };

  const isLight = activeTheme === "light";

  // Sample Scenarios for the Landing Grid
  const SAMPLE_SCENARIOS = [
    {
      id: "sp_si_249",
      title: "ගාලු මුවදොර ඉස්සෝ වඩේ සහ වීදි ආහාර",
      englishTitle: "Galle Face Isso Wade & Street Food",
      lang: "Sinhala",
      flag: "🇱🇰",
      level: "Beginner",
      cat: "Street Food",
      icon: "🦐",
      desc: "Order crispy hot isso wade at sunset on Galle Face Green, negotiate spice levels, and chat with local street vendors.",
    },
    {
      id: "sp_en_1",
      title: "Tech Lead System Architecture Interview",
      englishTitle: "Tech Lead System Architecture Interview",
      lang: "English",
      flag: "🇬🇧",
      level: "Advanced",
      cat: "Career",
      icon: "💻",
      desc: "Discuss distributed microservices, Redis caching, and database sharding with an executive engineering director in London.",
    },
    {
      id: "sp_ja_201",
      title: "渋谷交差点と本格豚骨ラーメンの注文",
      englishTitle: "Shibuya Crossing & Tonkotsu Ramen Order",
      lang: "Japanese",
      flag: "🇯🇵",
      level: "Intermediate",
      cat: "Travel",
      icon: "🍜",
      desc: "Navigate the bustling alleys of Shibuya, customize broth richness and noodle firmness at an authentic ramen bar.",
    },
    {
      id: "sp_fr_101",
      title: "Café de Paris & Commande de Pâtisserie",
      englishTitle: "Paris Café & Warm Croissant Order",
      lang: "French",
      flag: "🇫🇷",
      level: "Beginner",
      cat: "Travel",
      icon: "🥐",
      desc: "Order a morning espresso and pain au chocolat in Montmartre, discussing weather and daily Parisian strolls.",
    },
    {
      id: "sp_es_101",
      title: "Tapas y Sangría en el Barrio Gótico",
      englishTitle: "Barcelona Gothic Quarter Tapas Night",
      lang: "Spanish",
      flag: "🇪🇸",
      level: "Intermediate",
      cat: "Street Food",
      icon: "🥘",
      desc: "Explore Catalan culinary traditions, ask about daily specials, and practice friendly dinner conversation in Barcelona.",
    },
    {
      id: "sp_de_101",
      title: "Gehaltsverhandlung & Karriere-Strategie",
      englishTitle: "Berlin Senior Career & Salary Strategy",
      lang: "German",
      flag: "🇩🇪",
      level: "Advanced",
      cat: "Career",
      icon: "💼",
      desc: "Negotiate performance bonuses, hybrid work options, and equity terms with a Berlin startup founder.",
    },
  ];

  const filteredScenarios =
    selectedScenarioCategory === "All"
      ? SAMPLE_SCENARIOS
      : SAMPLE_SCENARIOS.filter((s) => s.cat === selectedScenarioCategory);

  // 20 World Languages List
  const LANGUAGES_LIST = [
    { name: "English", flag: "🇬🇧", native: "English", coach: "Oliver / Sarah", sample: "Hello Janitha! Ready to speak today?" },
    { name: "Sinhala", flag: "🇱🇰", native: "සිංහල", coach: "Sameera / Thilini", sample: "ආයුබෝවන්! අද අපි කතාබහ කරමු." },
    { name: "Spanish", flag: "🇪🇸", native: "Español", coach: "Alvaro / Elvira", sample: "¡Hola! ¿Cómo estás hoy?" },
    { name: "French", flag: "🇫🇷", native: "Français", coach: "Henri / Denise", sample: "Bonjour ! Prêt pour notre conversation ?" },
    { name: "German", flag: "🇩🇪", native: "Deutsch", coach: "Killian / Katja", sample: "Guten Tag! Lass uns Deutsch üben." },
    { name: "Japanese", flag: "🇯🇵", native: "日本語", coach: "Keita / Nanami", sample: "こんにちは！日本語で楽しく話しましょう。" },
    { name: "Korean", flag: "🇰🇷", native: "한국어", coach: "InJoon / SunHi", sample: "안녕하세요! 오늘 기분 어떠세요?" },
    { name: "Italian", flag: "🇮🇹", native: "Italiano", coach: "Diego / Elsa", sample: "Ciao! Sei pronto a parlare italiano?" },
    { name: "Portuguese", flag: "🇧🇷", native: "Português", coach: "Antonio / Francisca", sample: "Olá! Vamos praticar português hoje?" },
    { name: "Chinese", flag: "🇨🇳", native: "中文 (普通话)", coach: "Yunxi / Xiaoxiao", sample: "你好！今天你想聊些什么？" },
    { name: "Arabic", flag: "🇦🇪", native: "العربية", coach: "Shakir / Salma", sample: "أهلاً وسهلاً بك في سبيك فلو." },
    { name: "Russian", flag: "🇷🇺", native: "Русский", coach: "Dmitry / Svetlana", sample: "Привет! Давай поговорим сегодня." },
    { name: "Tamil", flag: "🇮🇳", native: "தமிழ்", coach: "Valluvar / Pallavi", sample: "வணக்கம்! இன்று உரையாடலைத் தொடங்குவோம்." },
    { name: "Hindi", flag: "🇮🇳", native: "हिन्दी", coach: "Madhur / Swara", sample: "नमस्ते! आज आप कैसे हैं?" },
    { name: "Dutch", flag: "🇳🇱", native: "Nederlands", coach: "Maarten / Fenna", sample: "Hallo! Welkom bij onze oefensessie." },
    { name: "Turkish", flag: "🇹🇷", native: "Türkçe", coach: "Ahmet / Emel", sample: "Merhaba! Bugün nasılsınız?" },
    { name: "Vietnamese", flag: "🇻🇳", native: "Tiếng Việt", coach: "NamMinh / HoaiMy", sample: "Xin chào! Rất vui được gặp bạn." },
    { name: "Indonesian", flag: "🇮🇩", native: "Bahasa Indonesia", coach: "Ardi / Gadis", sample: "Halo! Mari kita mulai latihan hari ini." },
    { name: "Thai", flag: "🇹🇭", native: "ไทย", coach: "Niwat / Premwadee", sample: "สวัสดีครับ! วันนี้เป็นอย่างไรบ้าง?" },
    { name: "Swedish", flag: "🇸🇪", native: "Svenska", coach: "Mattias / Sofie", sample: "Hej! Välkommen till SpeakFlow." },
  ];

  // Play Audio Demo
  const playSampleAudio = (text: string, langName: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 0.95;
      setIsPlayingDemoVoice(true);
      utter.onend = () => setIsPlayingDemoVoice(false);
      utter.onerror = () => setIsPlayingDemoVoice(false);
      window.speechSynthesis.speak(utter);
    }
  };

  const FAQS = [
    {
      q: "How does SpeakFlow AI achieve sub-20ms instant response?",
      a: "SpeakFlow AI employs a proprietary Hybrid Edge-Cloud neural architecture. Local acoustic VAD (Voice Activity Detection) handles instant speech boundaries on your device, while Google Gemini 2.5 Flash and Microsoft Neural Speech synthesis stream audio packets in parallel, guaranteeing conversational latency under 20 milliseconds.",
    },
    {
      q: "I feel anxious speaking to real people. Will this help me?",
      a: "Absolutely! That is SpeakFlow's primary superpower. 84% of language learners suffer from foreign language anxiety. Our AI video coaches provide an unconditionally supportive, 100% judgment-free environment where you can stumble, make grammar mistakes, and repeat sentences 50 times until you feel completely confident.",
    },
    {
      q: "Can I practice in Sinhala or other non-English languages?",
      a: "Yes! SpeakFlow AI natively supports 20 major world languages including Sinhala (සිංහල), Tamil (தமிழ்), Japanese, Korean, French, Spanish, German, and Arabic. Each language features dedicated native neural voices and culturally authentic real-world scenarios.",
    },
    {
      q: "How does the Instant Grammar Repair work?",
      a: "Unlike passive apps that let you speak broken sentences without feedback, SpeakFlow's AI Legal & Grammar heuristics instantly catch errors in cadence, verb conjugation, or vocabulary. It gently mirrors back your intent in native phrasing and lets you drill the correct pattern before continuing the conversation.",
    },
    {
      q: "Is SpeakFlow AI really 50x cheaper than a private human tutor?",
      a: "Yes! A licensed native human tutor charges between $30 to $60 per hour ($300 to $500/month for regular sessions). With SpeakFlow VIP ($9.99/mo or $39/year), you get unlimited 24/7 access to all 6 photorealistic AI tutors and 256 scenarios across 20 languages at a fraction of the cost.",
    },
  ];

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 selection:bg-indigo-500 selection:text-white ${
        isLight ? "bg-[#F8FAFC] text-slate-800" : "bg-[#060913] text-slate-100"
      }`}
    >
      {/* 1. Admin System Notice Banner (If Configured by Admin) */}
      {((config?.announcementActive !== false && config?.announcementText) || adminNotice) && (
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-xs font-bold py-2 px-4 text-center flex items-center justify-center gap-2 shadow-md">
          <span className="animate-pulse">📢</span>
          <span>{config?.announcementText || adminNotice}</span>
          <button
            onClick={() => onStartCall()}
            className="ml-2 underline text-white hover:text-indigo-100 text-[11px]"
          >
            Try Now →
          </button>
        </div>
      )}

      {/* 2. Sticky Glassmorphism Header */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-200 ${
          isLight
            ? "bg-white/85 border-slate-200/80 shadow-sm"
            : "bg-[#070C1A]/85 border-indigo-900/30 shadow-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onOpenDashboard()}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
              <span className="text-xl">🎙️</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                  SpeakFlow<span className="text-cyan-400 font-serif">.ai</span>
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-500/15 text-cyan-400 border border-cyan-400/30">
                  20 Langs
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Real-Time AI Voice Tutor</p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-slate-400">
            <a href="#scenarios" className="hover:text-cyan-400 transition-colors">
              Scenarios
            </a>
            <a href="#features" className="hover:text-cyan-400 transition-colors">
              Instant Feedback
            </a>
            <a href="#languages" className="hover:text-cyan-400 transition-colors">
              20 Languages
            </a>
            <a href="#pricing" className="hover:text-cyan-400 transition-colors">
              Pricing
            </a>
            <a href="#reviews" className="hover:text-cyan-400 transition-colors">
              Reviews
            </a>
            <a href="#faq" className="hover:text-cyan-400 transition-colors">
              FAQ
            </a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Admin CMS Trigger (If authorized/available) */}
            {onOpenAdminCMS && (
              <button
                onClick={onOpenAdminCMS}
                className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                  isLight
                    ? "bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100"
                    : "bg-indigo-950/60 border-indigo-500/40 text-indigo-300 hover:bg-indigo-900/60"
                }`}
                title="Manage Landing Page Content via Live Admin CMS"
              >
                <span>⚙️</span>
                <span>Admin CMS</span>
              </button>
            )}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleThemeLocal}
              className={`p-2.5 rounded-xl border transition-all text-sm ${
                isLight
                  ? "bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200"
                  : "bg-slate-900/80 border-indigo-500/25 text-amber-300 hover:border-amber-400/50"
              }`}
              title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {isLight ? "🌙" : "☀️"}
            </button>

            {/* Sign In Button */}
            <button
              onClick={() => onOpenAuth("login")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isLight
                  ? "text-slate-700 hover:text-indigo-600 hover:bg-slate-100"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              Log In
            </button>

            {/* Launch App / Start Free Call */}
            <button
              onClick={() => onOpenDashboard()}
              className="px-5 py-2.5 rounded-xl font-black text-xs text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <span>Launch App</span>
              <span className="text-cyan-200">→</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. Hero Section (Modeled after YayTalk with Photorealistic AI Video Showcase) */}
      <section className="relative pt-12 pb-24 overflow-hidden">
        {/* Ambient Glow Backdrops */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-tr from-cyan-600/15 via-indigo-600/20 to-purple-600/15 blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Social Proof Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-indigo-400/25 bg-indigo-500/10 backdrop-blur-md text-xs font-bold text-cyan-300 shadow-sm">
            <span className="flex text-amber-400 text-xs">★★★★★</span>
            <span className="text-slate-300 font-medium">4.8/5 Rating</span>
            <span className="w-1 h-1 rounded-full bg-slate-500" />
            <span className="text-white">{config?.heroBadge || "100K+ Active Voice Learners Worldwide"}</span>
          </div>

          {/* Master Headline */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08]">
              {config?.heroHeadline || (
                <>
                  Speak 20 World Languages{" "}
                  <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                    Confidently
                  </span>{" "}
                  with AI Video Tutors.
                </>
              )}
            </h1>
            <p
              className={`text-base sm:text-xl font-normal leading-relaxed max-w-2xl mx-auto ${
                isLight ? "text-slate-600" : "text-slate-300/90"
              }`}
            >
              {config?.heroSubtitle ||
                "The fastest way to achieve real-world conversational fluency: live video calls with photorealistic AI coaches, sub-20ms instant speech feedback, and a 100% judgment-free space to practice."}
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onStartCall("sp_si_249")}
              className="px-8 py-4 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 shadow-xl shadow-cyan-500/35 hover:shadow-cyan-500/55 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center gap-3 group"
            >
              <span className="text-lg">🎙️</span>
              <span>{config?.primaryCtaText || "Start Free AI Call in Sinhala / English"}</span>
              <span className="group-hover:translate-x-1 transition-transform text-cyan-200">→</span>
            </button>

            <button
              onClick={() => onOpenDashboard()}
              className={`px-7 py-4 rounded-2xl font-black text-sm border transition-all flex items-center gap-2 ${
                isLight
                  ? "bg-white border-slate-300 text-slate-800 hover:bg-slate-100 shadow-sm"
                  : "bg-slate-900/90 border-indigo-500/30 text-white hover:border-cyan-400/60 shadow-lg"
              }`}
            >
              <span>{config?.secondaryCtaText || "Explore 256 Scenarios"}</span>
              <span>🌍</span>
            </button>
          </div>

          {/* Download App Store & Google Play Badges */}
          <div className="flex items-center justify-center gap-4 pt-1">
            <a
              href={config?.playStoreUrl || "https://play.google.com/store/apps/details?id=com.innoxpert.speakflow"}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-105 transition-transform"
            >
              <Image
                src="/images/landing/google_play.webp"
                alt="Get it on Google Play"
                width={135}
                height={40}
                className="h-10 w-auto rounded-lg shadow-sm"
              />
            </a>
            <a
              href={config?.apkDownloadUrl || "https://github.com/janithad2/speakflow-ai/releases/download/v1.0.0/speakflow-ai.apk"}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-105 transition-transform"
            >
              <Image
                src="/images/landing/app_store.webp"
                alt="Download Android APK"
                width={135}
                height={40}
                className="h-10 w-auto rounded-lg shadow-sm"
              />
            </a>
          </div>

          {/* Interactive Hero Visual Showcase (YayTalk Inspired Card with Real AI Video Mockup) */}
          <div className="relative max-w-5xl mx-auto mt-12 rounded-3xl border border-indigo-500/30 p-2 sm:p-4 bg-gradient-to-b from-indigo-950/40 to-slate-950/80 shadow-2xl backdrop-blur-2xl">
            {/* Visual Top Bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-indigo-500/20 mb-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-[11px] text-cyan-400">
                  SpeakFlow Cloud Neural • 12ms Edge Latency
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                  ● LIVE AI VIDEO CALL
                </span>
                <span className="text-slate-300 font-bold">Coach Oliver Wright (British RP)</span>
              </div>
            </div>

            {/* Video Call Mockup Container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
              {/* Left Video Window with Coach */}
              <div className="lg:col-span-7 relative rounded-2xl overflow-hidden aspect-video bg-slate-950 border border-indigo-400/20 shadow-inner group">
                <Image
                  src="/images/landing/hero_chunk.webp"
                  alt="SpeakFlow AI Video Coach Demonstration"
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />

                {/* Live Dialogue Subtitle Card */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-indigo-500/30 text-left">
                  <div className="flex items-center justify-between text-[10px] text-cyan-300 font-bold mb-1">
                    <span>Oliver Wright (AI Coach):</span>
                    <span className="text-amber-300">Speaking Pace: 124 WPM</span>
                  </div>
                  <p className="text-xs text-slate-100 font-medium">
                    &ldquo;Welcome to London! The Thames looks gorgeous at sunset. What would you like to explore first?&rdquo;
                  </p>
                </div>

                {/* Floating Waveform Pill */}
                <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-slate-950/80 border border-cyan-400/40 flex items-center gap-2">
                  <div className="flex items-center gap-1 h-3">
                    <span className="w-1 h-3 bg-cyan-400 rounded-full animate-bounce" />
                    <span className="w-1 h-2 bg-indigo-400 rounded-full animate-pulse" />
                    <span className="w-1 h-4 bg-cyan-400 rounded-full animate-bounce delay-75" />
                    <span className="w-1 h-2 bg-purple-400 rounded-full animate-pulse delay-100" />
                  </div>
                  <span className="text-[10px] font-mono text-cyan-300 font-bold">Sub-20ms Edge</span>
                </div>
              </div>

              {/* Right Diagnostic & Fluency Radar Widget */}
              <div className="lg:col-span-5 space-y-3 text-left p-2 sm:p-4">
                <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/25 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-300">Live Speech Diagnosis</span>
                    <span className="text-emerald-400 font-black text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-400/20">
                      INSTANT AI FIX
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-[11px] text-rose-300 font-mono">
                    <span className="text-rose-400 font-bold">❌ You said: </span>
                    &ldquo;I have went to Big Ben yesterday.&rdquo;
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-300 font-mono">
                    <span className="text-emerald-400 font-bold">✅ Say naturally: </span>
                    &ldquo;I went to Big Ben yesterday.&rdquo;
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    💡 <strong className="text-slate-300">Grammar Rule:</strong> With specific past time markers (&lsquo;yesterday&rsquo;), use the past simple &lsquo;went&rsquo;, not present perfect.
                  </p>
                </div>

                {/* Mini Metric Pills */}
                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-indigo-500/20">
                    <div className="text-xl font-black text-cyan-400">98%</div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Pronunciation</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-indigo-500/20">
                    <div className="text-xl font-black text-amber-400">CEFR B2</div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Fluency Tier</div>
                  </div>
                </div>

                <button
                  onClick={() => onStartCall("sp_en_1")}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-xs shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  <span>Practice This Live Call Now</span>
                  <span>⚡</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Proof Strip (4 Pillars) */}
      <section className={`py-12 border-y ${isLight ? "bg-white border-slate-200" : "bg-[#080E20] border-indigo-900/30"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-cyan-400">{config?.statLanguages || "20"}</div>
              <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">World Languages</div>
              <div className="text-[11px] text-slate-500">English, Sinhala, Japanese & more</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-purple-400">&lt; 20ms</div>
              <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">Edge Neural Latency</div>
              <div className="text-[11px] text-slate-500">Zero awkward pauses or delays</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400">{config?.statMinutes || "125,000+"}</div>
              <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">Minutes Spoken</div>
              <div className="text-[11px] text-slate-500">Phonetic AI grading & telemetry</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-amber-400">{config?.statStudents || "10,000+"}</div>
              <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">Active Learners</div>
              <div className="text-[11px] text-slate-500">50x cheaper than private tutors</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 256 Interactive Scenarios Section (YayTalk Style) */}
      <section id="scenarios" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-black uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-400/20">
              Conversations That Actually Matter
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Practice the Conversations You&apos;ll Actually Have.
            </h2>
            <p className={`text-base ${isLight ? "text-slate-600" : "text-slate-400"}`}>
              No boring grammar textbooks. Immerse yourself in authentic real-life scenarios designed to prepare you for job promotions, international travel, and casual street conversations.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["All", "Street Food", "Career", "Travel"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedScenarioCategory(cat)}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                  selectedScenarioCategory === cat
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25"
                    : isLight
                    ? "bg-slate-200/80 text-slate-700 hover:bg-slate-300"
                    : "bg-slate-900 border border-indigo-500/20 text-slate-400 hover:text-white"
                }`}
              >
                {cat === "All" ? "All Scenarios (256+)" : cat}
              </button>
            ))}
          </div>

          {/* Scenario Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {filteredScenarios.map((sc) => (
              <div
                key={sc.id}
                className={`p-6 rounded-3xl border transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between group ${
                  isLight
                    ? "bg-white border-slate-200 shadow-lg hover:shadow-xl"
                    : "bg-[#090F24] border-indigo-500/25 hover:border-cyan-400/50 shadow-xl"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-400/20">
                      {sc.icon}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-slate-800 text-slate-300">
                        {sc.flag} {sc.lang}
                      </span>
                      <span className="text-[10px] px-2.5 py-1 rounded-full font-black uppercase bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
                        {sc.level}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-black text-lg text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {sc.englishTitle}
                    </h3>
                    <p className="text-xs text-slate-400 font-serif italic mt-0.5">{sc.title}</p>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">{sc.desc}</p>
                </div>

                <div className="pt-5 mt-4 border-t border-indigo-500/15 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500">{sc.cat}</span>
                  <button
                    onClick={() => onStartCall(sc.id)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs hover:brightness-110 transition-all flex items-center gap-1.5"
                  >
                    <span>Practice Now</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <button
              onClick={() => onOpenDashboard()}
              className="px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 transition-all"
            >
              Browse Complete 256 Scenario Catalog in App →
            </button>
          </div>
        </div>
      </section>

      {/* 6. Instant Feedback & AI Redline Studio (YayTalk Style) */}
      <section id="features" className={`py-24 ${isLight ? "bg-slate-100/70" : "bg-[#070D1E]"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="text-xs font-black uppercase tracking-wider text-purple-400 bg-purple-500/10 px-3.5 py-1.5 rounded-full border border-purple-400/20">
                Turn Mistakes Into Fluency
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Instant Feedback Turns Every Slip Into Mastery.
              </h2>
              <p className={`text-base leading-relaxed ${isLight ? "text-slate-600" : "text-slate-300"}`}>
                Traditional tutors often interrupt awkwardly, or let you reinforce bad grammar patterns without correction. SpeakFlow AI evaluates cadence, pronunciation, and syntax in real time, showing you exactly how native speakers express the same thought.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-100">Bilateral AI Redline Studio</h4>
                    <p className="text-xs text-slate-400">Instantly displays the incorrect phrase alongside the natural native idiom.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-100">Call Grammar Repair Drills</h4>
                    <p className="text-xs text-slate-400">AI bundles your top 3 mistakes caught during a call into a targeted 2-minute drill.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-100">Audio Pronunciation Coach</h4>
                    <p className="text-xs text-slate-400">Listen to the correct pronunciation at 0.75x, 1x, or 1.25x native speed.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Illustration Card */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden border border-indigo-500/30 shadow-2xl p-6 bg-slate-950/80 backdrop-blur-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-bold text-cyan-400">Real-Time Correction Engine</span>
                  <span className="text-[10px] text-slate-400 font-mono">Accuracy: 98.4%</span>
                </div>

                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-rose-400">What You Said (Incorrect)</span>
                  <p className="text-sm font-mono text-rose-200">&ldquo;I didn&apos;t went to the office today morning.&rdquo;</p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">Say It Naturally (Native Target)</span>
                  <p className="text-sm font-mono text-emerald-200">&ldquo;I didn&apos;t go to the office this morning.&rdquo;</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-indigo-950/60 border border-indigo-500/20 text-xs text-slate-300 space-y-1">
                  <span className="font-bold text-cyan-300">💡 Rule Explanation:</span>
                  <p className="text-[11px] text-slate-400">
                    After the auxiliary &lsquo;didn&apos;t&rsquo;, always use the base verb form &lsquo;go&rsquo; (not past tense &lsquo;went&rsquo;). Also, say &lsquo;this morning&rsquo; instead of &lsquo;today morning&rsquo;.
                  </p>
                </div>

                <button
                  onClick={() => playSampleAudio("I didn't go to the office this morning.", "English")}
                  className="w-full py-3 rounded-xl bg-slate-900 border border-indigo-400/30 hover:border-cyan-400 text-cyan-300 text-xs font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <span>{isPlayingDemoVoice ? "🔊 Playing Correct Audio..." : "🔊 Practice Pronouncing This Native Phrase"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. 20 Languages World Matrix */}
      <section id="languages" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-400/20">
              True Global Multilingual Mastery
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              20 Global Languages with Native Cultural Coaches.
            </h2>
            <p className={`text-base ${isLight ? "text-slate-600" : "text-slate-400"}`}>
              From London British RP and Colombo Sinhala to Tokyo Japanese and Paris French — each language features dedicated acoustic neural voices and authentic cultural contexts.
            </p>
          </div>

          {/* Languages Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3.5 text-left">
            {LANGUAGES_LIST.map((lang) => {
              const isActive = activeLanguageCard === lang.name;
              return (
                <div
                  key={lang.name}
                  onClick={() => {
                    setActiveLanguageCard(lang.name);
                    playSampleAudio(lang.sample, lang.name);
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 group ${
                    isActive
                      ? "bg-gradient-to-b from-cyan-950/60 to-indigo-950/80 border-cyan-400/60 shadow-lg shadow-cyan-500/15"
                      : isLight
                      ? "bg-white border-slate-200 hover:border-indigo-400"
                      : "bg-[#090F24] border-indigo-500/20 hover:border-indigo-400/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="text-[10px] text-cyan-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                      ▶ Listen
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-100">{lang.name}</h4>
                  <p className="text-xs text-slate-400 font-serif">{lang.native}</p>
                  <div className="mt-2 text-[10px] text-slate-500 border-t border-indigo-500/10 pt-1.5 flex items-center justify-between">
                    <span>{lang.coach}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. The Killer Pricing Comparison (YayTalk "50x Cheaper than a Real Tutor") */}
      <section id="pricing" className={`py-24 ${isLight ? "bg-slate-100/70" : "bg-[#070D1E]"}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-400/20">
              Unmatched Value Proposition
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              SpeakFlow is <span className="text-cyan-400 font-serif italic">50x Cheaper</span> than a Private Human Tutor.
            </h2>
            <p className={`text-base ${isLight ? "text-slate-600" : "text-slate-400"}`}>
              Get unlimited 24/7 speaking practice without scheduling hassles, tutor judgment, or expensive hourly rates.
            </p>
          </div>

          {/* Side-by-Side Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch text-left">
            {/* Real Human Tutor Card (Drawbacks) */}
            <div className={`p-8 rounded-3xl border ${isLight ? "bg-white border-slate-300" : "bg-slate-900/60 border-slate-800"} space-y-6 opacity-85`}>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">Traditional Method</span>
                <h3 className="text-2xl font-black text-slate-300 mt-1">Private Human Tutor</h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-slate-400">~$400</span>
                  <span className="text-xs text-slate-500">/ month ($30-50/hr)</span>
                </div>
              </div>

              <div className="space-y-3.5 pt-4 border-t border-slate-800 text-xs text-slate-400">
                <div className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold shrink-0">✕</span>
                  <span>Restricted by tutor schedules & time zones</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold shrink-0">✕</span>
                  <span>High anxiety and psychological fear of making mistakes</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold shrink-0">✕</span>
                  <span>Delayed, subjective feedback with no data telemetry</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold shrink-0">✕</span>
                  <span>Extra fees if you want to practice a second language</span>
                </div>
              </div>
            </div>

            {/* SpeakFlow AI VIP Card (The Winner) */}
            <div className="p-8 rounded-3xl border-2 border-cyan-400/80 bg-gradient-to-b from-[#091535] to-[#060D24] shadow-2xl shadow-cyan-500/20 space-y-6 relative overflow-hidden">
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-[10px] font-black uppercase tracking-wider text-white shadow-md">
                MOST POPULAR • 100K LEARNERS
              </div>

              <div>
                <span className="text-xs font-black uppercase tracking-wider text-cyan-400">SpeakFlow AI Pro</span>
                <h3 className="text-2xl font-black text-white mt-1">Unlimited VIP Pass</h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white">{config?.monthlyPrice || "$9.99"}</span>
                  <span className="text-xs text-cyan-300">/ month ({config?.yearlyPrice || "$39.00"}/yr • {config?.yearlySavings || "Save 92%"})</span>
                </div>
              </div>

              <div className="space-y-3.5 pt-4 border-t border-indigo-500/25 text-xs text-slate-200">
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>Available 24/7 anywhere, anytime with sub-20ms edge voice</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>100% judgment-free safe space to make mistakes freely</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>Sub-second pronunciation & bilateral grammar repair</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>All 20 World Languages & 6 photorealistic AI tutors included</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>CEFR / IELTS Fluency radar telemetry & streak tracking</span>
                </div>
              </div>

              <a
                href={config?.apkDownloadUrl || "https://github.com/janithad2/speakflow-ai/releases/download/v1.0.0/speakflow-ai.apk"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-black text-sm shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>Download App to Start Free →</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Wall of Love (Student Reviews) */}
      <section id="reviews" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-black uppercase tracking-wider text-pink-400 bg-pink-500/10 px-3.5 py-1.5 rounded-full border border-pink-400/20">
              Loved Around the World
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Loved by Over 100,000 Confident Speakers.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-3xl bg-[#080E24] border border-indigo-500/20 space-y-4">
              <div className="flex text-amber-400 text-sm">★★★★★</div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                &ldquo;I had severe anxiety speaking English in meetings with our US tech clients. After 2 weeks with Coach Oliver, I delivered my first architecture demo with 100% confidence!&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
                <div className="w-10 h-10 rounded-full bg-indigo-600/30 flex items-center justify-center font-bold text-sm text-cyan-300">
                  🇱🇰
                </div>
                <div>
                  <h5 className="font-bold text-xs text-slate-100">Kavindu Perera</h5>
                  <p className="text-[10px] text-slate-400">Senior Software Engineer, Colombo</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#080E24] border border-indigo-500/20 space-y-4">
              <div className="flex text-amber-400 text-sm">★★★★★</div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                &ldquo;The Sinhala module is incredible! My husband is Sri Lankan and I can now chat with his parents about Galle Face street food and tea estates with natural pronunciation.&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
                <div className="w-10 h-10 rounded-full bg-indigo-600/30 flex items-center justify-center font-bold text-sm text-cyan-300">
                  🇬🇧
                </div>
                <div>
                  <h5 className="font-bold text-xs text-slate-100">Clara Higgins</h5>
                  <p className="text-[10px] text-slate-400">UX Researcher, London</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#080E24] border border-indigo-500/20 space-y-4">
              <div className="flex text-amber-400 text-sm">★★★★★</div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                &ldquo;Instant grammar feedback without being made to feel foolish is a game changer. The sub-20ms voice response makes it feel like a real Facetime call with a native friend!&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
                <div className="w-10 h-10 rounded-full bg-indigo-600/30 flex items-center justify-center font-bold text-sm text-cyan-300">
                  🇯🇵
                </div>
                <div>
                  <h5 className="font-bold text-xs text-slate-100">Kenji Takahashi</h5>
                  <p className="text-[10px] text-slate-400">Product Manager, Tokyo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ Section */}
      <section id="faq" className={`py-24 ${isLight ? "bg-slate-100/70" : "bg-[#070D1E]"}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-400">Everything you need to know about SpeakFlow AI and our voice platform.</p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all ${
                    isOpen
                      ? "bg-slate-900 border-cyan-400/50 shadow-md"
                      : isLight
                      ? "bg-white border-slate-200"
                      : "bg-[#090F24] border-indigo-500/20"
                  }`}
                >
                  <button
                    onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-4.5 text-left flex items-center justify-between font-bold text-sm text-slate-100"
                  >
                    <span>{faq.q}</span>
                    <span className="text-cyan-400 text-lg">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/80 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. Final High-Impact Bottom CTA Banner */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-center space-y-6 shadow-2xl shadow-cyan-500/30 text-white relative">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Ready to Speak Like a Native?
            </h2>
            <p className="text-sm sm:text-base text-cyan-100 max-w-xl mx-auto leading-relaxed">
              Join 100,000+ confident speakers. Start your first AI video call in 30 seconds — no credit card required.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => onStartCall()}
                className="px-8 py-4 rounded-2xl bg-white text-slate-950 font-black text-sm shadow-xl hover:bg-slate-100 hover:scale-[1.03] transition-all"
              >
                Start Free Voice Call Now →
              </button>
              <a
                href={config?.apkDownloadUrl || "https://github.com/janithad2/speakflow-ai/releases/download/v1.0.0/speakflow-ai.apk"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-4 rounded-2xl bg-slate-950/40 border border-white/30 text-white font-bold text-sm hover:bg-slate-950/60 transition-all flex items-center gap-2"
              >
                <span>Download Android APK</span>
                <span>↓</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Footer */}
      <footer className="border-t border-indigo-950/60 py-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-xl">🎙️</span>
            <span className="font-black text-slate-300">SpeakFlow AI</span>
            <span>• Engineered by InnoXpert Technologies</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#scenarios" className="hover:text-cyan-400 transition-colors">
              Scenarios
            </a>
            <a href="#languages" className="hover:text-cyan-400 transition-colors">
              20 Languages
            </a>
            <a href="#pricing" className="hover:text-cyan-400 transition-colors">
              Pricing
            </a>
            <button onClick={() => onOpenAuth("login")} className="hover:text-cyan-400 transition-colors">
              Log In
            </button>
            {onOpenAdminCMS && (
              <button onClick={onOpenAdminCMS} className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 transition-colors">
                <span>⚙️</span>
                <span>Admin CMS</span>
              </button>
            )}
          </div>

          <p>© 2026 SpeakFlow AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
