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
  languagesSliderActive?: boolean;
  languagesSliderTitle?: string;
  scenariosHeadingTag?: string;
  scenariosTitle?: string;
  scenariosSubtitle?: string;
  scenariosStripImageUrl?: string;
}

const LANGUAGES_LIST = [
  { name: "Sinhala", native: "සිංහල", flag: "🇱🇰" },
  { name: "English", native: "English", flag: "🇬🇧" },
  { name: "Tamil", native: "தமிழ்", flag: "🇮🇳" },
  { name: "Japanese", native: "日本語", flag: "🇯🇵" },
  { name: "Spanish", native: "Español", flag: "🇪🇸" },
  { name: "French", native: "Français", flag: "🇫🇷" },
  { name: "German", native: "Deutsch", flag: "🇩🇪" },
  { name: "Italian", native: "Italiano", flag: "🇮🇹" },
  { name: "Korean", native: "한국어", flag: "🇰🇷" },
  { name: "Chinese", native: "中文", flag: "🇨🇳" },
  { name: "Russian", native: "Русский", flag: "🇷🇺" },
  { name: "Arabic", native: "العربية", flag: "🇦🇪" },
  { name: "Hindi", native: "हिन्दी", flag: "🇮🇳" },
  { name: "Portuguese", native: "Português", flag: "🇧🇷" },
  { name: "Turkish", native: "Türkçe", flag: "🇹🇷" },
  { name: "Dutch", native: "Nederlands", flag: "🇳🇱" },
  { name: "Swedish", native: "Svenska", flag: "🇸🇪" },
  { name: "Indonesian", native: "Bahasa", flag: "🇮🇩" },
  { name: "Thai", native: "ไทย", flag: "🇹🇭" },
  { name: "Vietnamese", native: "Tiếng Việt", flag: "🇻🇳" },
];

interface LandingPageProps {
  onStartCall: (topicId?: string) => void;
  onOpenDashboard: () => void;
  onOpenAuth: (mode?: "login" | "signup") => void;
  themeMode?: "dark" | "light";
  onToggleTheme?: (theme: "dark" | "light") => void;
  adminNotice?: string;
  config?: Partial<LandingPageConfig>;
  onOpenAdminCMS?: () => void;
  currentUser?: any;
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
  currentUser,
}: LandingPageProps) {
  const [activeTheme, setActiveTheme] = useState<"dark" | "light">(themeMode);
  const [selectedScenarioCategory, setSelectedScenarioCategory] = useState<string>("All");
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const [isPlayingDemoVoice, setIsPlayingDemoVoice] = useState(false);
  const [activeLanguageCard, setActiveLanguageCard] = useState<string>("Sinhala");

  useEffect(() => {
    setActiveTheme(themeMode);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("theme-light", themeMode === "light");
      document.documentElement.classList.toggle("dark", themeMode === "dark");
    }
  }, [themeMode]);

  const toggleThemeLocal = () => {
    const next = activeTheme === "dark" ? "light" : "dark";
    setActiveTheme(next);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("theme-light", next === "light");
      document.documentElement.classList.toggle("dark", next === "dark");
    }
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

      {/* 2. Sticky Glassmorphism Header (FULL WIDTH with Brand Logo) */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-200 ${
          isLight
            ? "bg-white/95 border-slate-200/90 shadow-sm"
            : "bg-[#070C1A]/90 border-indigo-900/30 shadow-lg"
        }`}
      >
        <div className="w-full px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
          {/* Brand Logo with Real app_logo.png */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onOpenDashboard()}>
            <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-lg shadow-cyan-500/25 shrink-0 border border-cyan-400/30">
              <Image
                src="/images/app_logo.png"
                alt="SpeakFlow Logo"
                width={40}
                height={40}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`font-black text-xl tracking-tight ${isLight ? "text-slate-900" : "text-white"}`}>
                  SpeakFlow<span className="text-cyan-500 font-serif">.ai</span>
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-400/30">
                  20 Langs
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Real-Time AI Voice Tutor</p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <a href="#scenarios" className="hover:text-cyan-500 transition-colors">
              Scenarios
            </a>
            <a href="#features" className="hover:text-cyan-500 transition-colors">
              Instant Feedback
            </a>
            <a href="#languages" className="hover:text-cyan-500 transition-colors">
              20 Languages
            </a>
            <a href="#pricing" className="hover:text-cyan-500 transition-colors">
              Pricing
            </a>
            <a href="#reviews" className="hover:text-cyan-500 transition-colors">
              Reviews
            </a>
            <a href="#faq" className="hover:text-cyan-500 transition-colors">
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

            {/* Log In OR Dashboard Button (If user is logged in, show Dashboard!) */}
            {currentUser ? (
              <button
                onClick={() => onOpenDashboard()}
                className="px-5 py-2.5 rounded-xl font-black text-xs text-white bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <span>Dashboard</span>
                <span>→</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => onOpenAuth("login")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isLight
                      ? "text-slate-800 hover:text-indigo-600 hover:bg-slate-100"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Log In
                </button>

                <button
                  onClick={() => onOpenDashboard()}
                  className="px-5 py-2.5 rounded-xl font-black text-xs text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                >
                  <span>Launch App</span>
                  <span className="text-cyan-200">→</span>
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* 3. Hero Section (Modeled after YayTalk Image 1 & Image 2) */}
      <section className={`relative pt-12 sm:pt-16 pb-12 sm:pb-16 overflow-hidden ${
        isLight ? "bg-gradient-to-b from-[#EFF4FF] via-[#F7FAFF] to-[#FFFFFF] text-slate-900" : "bg-[#060913] text-white"
      }`}>
        {/* Ambient Dark Mode Animation System: Cosmic Glowing Orbs */}
        {!isLight && (
          <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
            {/* Glowing Orb 1: Cyan-Blue pulsing */}
            <div className="dark-glow-orb-1 absolute -top-16 left-1/4 w-[620px] h-[620px] rounded-full bg-gradient-to-tr from-cyan-500/25 via-blue-600/20 to-indigo-600/10 blur-[140px]" />
            {/* Glowing Orb 2: Purple-Pink pulsing */}
            <div className="dark-glow-orb-2 absolute top-36 right-1/4 w-[560px] h-[560px] rounded-full bg-gradient-to-bl from-purple-600/25 via-pink-600/15 to-blue-600/15 blur-[150px]" />
            {/* Center soft backplate glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-indigo-500/10 rounded-full blur-[160px]" />
            {/* Subtle cyber grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0f_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />
          </div>
        )}

        {/* Ambient Light Mode Background: Soft sky/lavender vignette */}
        {isLight && (
          <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-b from-[#EAF1FF] via-[#F5F8FF] to-transparent blur-[110px]" />
          </div>
        )}

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8">
          {/* Social Proof Pill */}
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-bold shadow-sm ${
            isLight
              ? "border-blue-300 bg-blue-50 text-blue-700"
              : "border-indigo-400/25 bg-indigo-500/10 text-cyan-400"
          }`}>
            <span className="flex text-amber-500 text-xs">★★★★★</span>
            <span className={`${isLight ? "text-slate-600" : "text-slate-300"} font-medium`}>4.8/5 Rating</span>
            <span className="w-1 h-1 rounded-full bg-slate-400" />
            <span className={`font-bold ${isLight ? "text-slate-800" : "text-white"}`}>
              {config?.heroBadge || "Next-Gen AI Voice Tutor • #BuildHybridAI 2026"}
            </span>
          </div>

          {/* Master Headline (Modeled after Image 1 with Guaranteed High Contrast) */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] ${
              isLight ? "text-[#0F172A]" : "text-white"
            }`}>
              {config?.heroHeadline || (
                <>
                  Learn to speak 🎙️{" "}
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    20 Languages
                  </span>{" "}
                  confidently with AI Tutors.
                </>
              )}
            </h1>
            <p
              className={`text-base sm:text-xl font-medium leading-relaxed max-w-2xl mx-auto ${
                isLight ? "text-slate-700" : "text-slate-300/90"
              }`}
            >
              {config?.heroSubtitle ||
                "The fastest way to speak any language with confidence: real conversations with AI, instant feedback, and a safe space to practice."}
            </p>
          </div>

          {/* App Store & Google Play Badges + Quick Practice Action (Side by side like Image 1) */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={config?.apkDownloadUrl || "https://github.com/janithad2/speakflow-ai/releases/download/v1.0.0/speakflow-ai.apk"}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-105 active:scale-95 transition-transform"
            >
              <Image
                src="/images/landing/app_store.webp"
                alt="Download on the App Store / Android APK"
                width={160}
                height={48}
                className="h-12 w-auto rounded-xl shadow-md"
              />
            </a>

            <a
              href={config?.playStoreUrl || "https://play.google.com/store/apps/details?id=com.innoxpert.speakflow"}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-105 active:scale-95 transition-transform"
            >
              <Image
                src="/images/landing/google_play.webp"
                alt="Get it on Google Play"
                width={160}
                height={48}
                className="h-12 w-auto rounded-xl shadow-md"
              />
            </a>

            <button
              onClick={() => onOpenDashboard()}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-black text-xs shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <span>Try Live Studio</span>
              <span>→</span>
            </button>
          </div>

          {/* Center Cutout Hero Character Banner Image (User's Image 2) */}
          <div className="relative max-w-4xl mx-auto mt-6 sm:mt-10 px-2 sm:px-4">
            <Image
              src={config?.heroBannerUrl || "/images/landing/hero_tutors_banner.png"}
              alt="SpeakFlow AI Tutors and Learners"
              width={1024}
              height={475}
              className="w-full h-auto object-contain hero-banner-pulse drop-shadow-[0_25px_45px_rgba(0,0,0,0.3)]"
              priority
            />
            {!isLight && (
              <div className="absolute inset-x-8 bottom-0 h-36 bg-blue-600/25 blur-3xl -z-10 rounded-full" />
            )}
          </div>
        </div>
      </section>

      {/* 3.5. Supported Languages Infinite Marquee Slider */}
      {config?.languagesSliderActive !== false && (
        <section className={`py-6 border-y relative overflow-hidden ${
          isLight ? "bg-slate-100/70 border-slate-200" : "bg-[#070C1B]/80 border-indigo-900/40"
        }`}>
          {/* Gradient fade edge masks */}
          <div className={`pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 ${
            isLight ? "bg-gradient-to-r from-[#F8FAFC] to-transparent" : "bg-gradient-to-r from-[#060913] to-transparent"
          }`} />
          <div className={`pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 ${
            isLight ? "bg-gradient-to-l from-[#F8FAFC] to-transparent" : "bg-gradient-to-l from-[#060913] to-transparent"
          }`} />

          <div className="max-w-7xl mx-auto px-4 mb-3 text-center">
            <div className={`text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-2 ${
              isLight ? "text-slate-600" : "text-cyan-400/90"
            }`}>
              <span>🌍</span>
              <span>{config?.languagesSliderTitle || "20 Supported World Languages & Native Accents"}</span>
              <span>•</span>
              <span className="text-emerald-500 font-bold">Sub-20ms Neural Engine</span>
            </div>
          </div>

          <div className="overflow-hidden whitespace-nowrap">
            <div className="animate-marquee flex items-center gap-3">
              {[...LANGUAGES_LIST, ...LANGUAGES_LIST].map((item, idx) => (
                <button
                  key={`${item.name}-${idx}`}
                  onClick={() => onStartCall()}
                  className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl border text-xs font-bold transition-all shrink-0 ${
                    isLight
                      ? "bg-white border-slate-300 text-slate-800 hover:border-indigo-500 hover:shadow-md"
                      : "bg-slate-900/80 border-indigo-500/20 text-slate-200 hover:border-cyan-400/50 hover:bg-slate-800"
                  }`}
                >
                  <span className="text-base">{item.flag}</span>
                  <span className={`font-black ${isLight ? "text-slate-900" : "text-white"}`}>{item.name}</span>
                  <span className={`text-[10.5px] font-medium ${isLight ? "text-slate-500" : "text-slate-400"}`}>({item.native})</span>
                  <span className={`text-[10px] ${isLight ? "text-blue-600" : "text-cyan-400 opacity-60"}`}>→</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Panoramic Scenarios Section (FULL WIDTH - User requested: "me image eka full widght dnn") */}
      <section className={`py-20 sm:py-28 relative overflow-hidden text-center ${
        isLight ? "bg-white text-slate-900" : "bg-[#060A18] text-white"
      }`}>
        <div className="w-full px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="space-y-3 max-w-4xl mx-auto text-center">
            <div className={`text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-1.5 ${
              isLight ? "text-blue-600" : "text-cyan-400"
            }`}>
              <span>{config?.scenariosHeadingTag || "Everything you need to speak English 🔮 fluently"}</span>
            </div>

            <h2 className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight ${
              isLight ? "text-[#0F172A]" : "text-white"
            }`}>
              {config?.scenariosTitle || "Practice the conversations you'll actually have"}
            </h2>

            <p className={`text-sm sm:text-base leading-relaxed max-w-xl mx-auto ${
              isLight ? "text-slate-600" : "text-slate-400"
            }`}>
              {config?.scenariosSubtitle || "Practice English in scenarios that matter — job interviews, travel, daily life, dining, and more."}
            </p>
          </div>

          {/* Full-Width Panoramic Strip Image (Image 3) */}
          <div className="relative w-full max-w-[1700px] mx-auto mt-8 sm:mt-12 px-0 sm:px-2 md:px-6">
            <Image
              src={config?.scenariosStripImageUrl || "/images/landing/scenarios_panoramic_strip.png"}
              alt="Real-world conversations in multiple scenarios"
              width={1600}
              height={580}
              className="w-full h-auto object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.25)] hover:scale-[1.01] transition-transform duration-500 rounded-2xl sm:rounded-3xl"
              priority
            />
          </div>

          {/* Interactive Role / Scenario Quick Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-4 max-w-5xl mx-auto px-4">
            {[
              { icon: "🦐", label: "Street Food & Dining", topicId: "sp_si_249" },
              { icon: "🗺️", label: "Travel & Exploration", topicId: "sp_en_1" },
              { icon: "🛍️", label: "Shopping & Markets", topicId: "sp_si_249" },
              { icon: "🩺", label: "Medical & Doctor", topicId: "sp_en_1" },
              { icon: "💼", label: "Job Interview & Tech", topicId: "sp_en_1" },
              { icon: "🚴", label: "Sports & Fitness", topicId: "sp_1" },
            ].map((s, idx) => (
              <button
                key={idx}
                onClick={() => onStartCall(s.topicId)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all shadow-sm ${
                  isLight
                    ? "bg-slate-50 border-slate-300 text-slate-800 hover:bg-slate-100 hover:border-blue-400"
                    : "bg-slate-900/70 border-indigo-500/20 text-slate-300 hover:border-cyan-400/40 hover:text-white"
                }`}
              >
                <span>{s.icon}</span>
                <span>{s.label}</span>
                <span className={`text-[10px] ${isLight ? "text-blue-600" : "text-cyan-400"}`}>→</span>
              </button>
            ))}
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
