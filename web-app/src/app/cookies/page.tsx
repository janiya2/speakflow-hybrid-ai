"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Cookie,
  Shield,
  Lock,
  Sliders,
  CheckCircle2,
  ArrowLeft,
  Info,
  ExternalLink,
  Cpu,
  Mic,
  Sparkles,
  HelpCircle,
  Clock,
  Globe
} from "lucide-react";

export default function CookiesPolicyPage() {
  const [isLight, setIsLight] = useState(true);

  // Sync theme with localStorage
  useEffect(() => {
    try {
      const theme = localStorage.getItem("speakflow_theme");
      setIsLight(theme !== "dark");
    } catch {
      setIsLight(true);
    }
  }, []);

  const openCookieSettings = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("speakflow_open_cookie_settings"));
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans selection:bg-indigo-500 selection:text-white ${
        isLight ? "bg-[#F8FAFC] text-slate-800" : "bg-[#060913] text-slate-100"
      }`}
    >
      {/* ------------------------------------------------------------- */}
      {/* Top Navigation Bar                                            */}
      {/* ------------------------------------------------------------- */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors ${
          isLight
            ? "bg-white/85 border-slate-200/90 shadow-sm"
            : "bg-[#0A0F1D]/85 border-slate-800/80 shadow-[0_4px_25px_rgba(0,0,0,0.6)]"
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className={`p-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                isLight
                  ? "bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to SpeakFlow</span>
            </Link>

            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-cyan-500/20">
                <span className="text-lg">🎙️</span>
              </div>
              <div>
                <span className="font-black text-lg tracking-tight bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                  SpeakFlow<span className="text-cyan-400 font-serif">.ai</span>
                </span>
                <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Legal & Privacy
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={openCookieSettings}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 shadow-sm hover:brightness-110 transition-all flex items-center gap-1.5"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Cookie Settings</span>
            </button>

            <button
              onClick={() => {
                const next = !isLight;
                setIsLight(next);
                if (typeof window !== "undefined") {
                  localStorage.setItem("speakflow_theme", next ? "light" : "dark");
                  if (next) {
                    document.documentElement.classList.remove("dark");
                    document.documentElement.classList.add("theme-light");
                  } else {
                    document.documentElement.classList.remove("theme-light");
                    document.documentElement.classList.add("dark");
                  }
                }
              }}
              className={`p-2 rounded-xl border text-sm transition-all ${
                isLight
                  ? "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                  : "bg-slate-900 border-slate-800 text-amber-300 hover:border-amber-400/50"
              }`}
              title="Toggle Theme"
            >
              {isLight ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* Hero Header Section                                           */}
      {/* ------------------------------------------------------------- */}
      <section className="relative overflow-hidden py-12 sm:py-16 border-b border-slate-200 dark:border-slate-800/80">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-cyan-500/15 text-cyan-500 border border-cyan-400/30">
            <Cookie className="w-3.5 h-3.5" />
            <span>GDPR, CCPA & GPC Compliant</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Cookies & Tracking Technologies Policy
          </h1>

          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Transparent disclosure of the cookies, client-side browser storage, and low-latency audio caching technologies used to power SpeakFlow AI&apos;s real-time voice coaching experience.
          </p>

          <div className="flex items-center justify-center gap-6 pt-2 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Effective Date: November 24, 2026</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>Version 2.4 (Production Release)</span>
            </span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* Main Content Body                                             */}
      {/* ------------------------------------------------------------- */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        {/* Interactive Notice Box */}
        <div
          className={`p-6 rounded-3xl border shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
            isLight
              ? "bg-gradient-to-br from-blue-50/90 via-sky-50/60 to-white border-blue-200"
              : "bg-gradient-to-br from-[#0C152B] via-[#091024] to-[#040814] border-cyan-500/30 shadow-[0_10px_40px_rgba(0,0,0,0.7)]"
          }`}
        >
          <div className="space-y-1 max-w-xl">
            <h3 className="font-black text-sm sm:text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Your Privacy Controls Are Always Available</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              You can modify or withdraw your cookie consent at any time. Non-essential cookies, audio model caches, and analytics tracking can be toggled in 1 click.
            </p>
          </div>
          <button
            type="button"
            onClick={openCookieSettings}
            className="px-5 py-2.5 rounded-2xl text-xs font-black text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 shadow-lg shadow-blue-500/25 transition-all shrink-0"
          >
            Open Cookie Manager
          </button>
        </div>

        {/* Section 1: Introduction */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-500/15 border border-blue-400/30 text-blue-400 flex items-center justify-center font-black text-sm">
              1
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">Introduction & Purpose</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            This Cookies Policy explains how <strong>SpeakFlow AI</strong> (developed by InnoXpert Technologies, Colombo, Sri Lanka) uses cookies, pixel tags, HTML5 Local Storage, and IndexedDB caching (collectively referred to as &ldquo;Tracking Technologies&rdquo;) when you access our web application, conversational AI audio studio, and related digital services at <code>speakflow.ai</code>.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            We are committed to operating in full compliance with the <strong>General Data Protection Regulation (GDPR)</strong>, the <strong>California Consumer Privacy Act (CCPA/CPRA)</strong>, and recognizing the <strong>Global Privacy Control (GPC)</strong> signal broadcast by your web browser.
          </p>
        </section>

        {/* Section 2: What Are Cookies */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/15 border border-indigo-400/30 text-indigo-400 flex items-center justify-center font-black text-sm">
              2
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">What Are Cookies & Local Storage?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div
              className={`p-5 rounded-2xl border ${
                isLight ? "bg-white border-slate-200" : "bg-slate-900/60 border-slate-800"
              }`}
            >
              <h4 className="font-bold text-sm flex items-center gap-2 mb-2 text-cyan-400">
                <Cookie className="w-4 h-4" />
                <span>HTTP Cookies</span>
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Small text files placed on your computer or mobile device by websites that you visit. They are widely used to make websites function efficiently, retain login sessions, and provide high-level usage metrics to website owners.
              </p>
            </div>

            <div
              className={`p-5 rounded-2xl border ${
                isLight ? "bg-white border-slate-200" : "bg-slate-900/60 border-slate-800"
              }`}
            >
              <h4 className="font-bold text-sm flex items-center gap-2 mb-2 text-purple-400">
                <Cpu className="w-4 h-4" />
                <span>HTML5 LocalStorage & IndexedDB</span>
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Modern client-side web browser databases that store your active language preferences, UI theme state, and low-latency audio synthesized voice waveforms locally on your device without sending redundant network requests.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Categories of Cookies We Use */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-400 flex items-center justify-center font-black text-sm">
              3
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">Categories of Tracking Technologies We Use</h2>
          </div>

          <div className="space-y-4 pt-2">
            {/* Category A */}
            <div
              className={`p-5 rounded-2xl border ${
                isLight ? "bg-white border-slate-200" : "bg-slate-900/60 border-slate-800"
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800/80 mb-3">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span className="font-black text-sm">1. Strictly Necessary Cookies (Essential)</span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Always Active
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                These are vital for the core functionality of SpeakFlow AI. They enable user authentication, Firebase security rules, and user state preservation. Without these, the application cannot provide requested services like phone call simulations or vocabulary vault synchronisation.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-[11px] text-left">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-mono">
                      <th className="py-2 pr-4 font-bold">Key / Cookie Name</th>
                      <th className="py-2 pr-4 font-bold">Provider</th>
                      <th className="py-2 pr-4 font-bold">Purpose</th>
                      <th className="py-2 font-bold">Lifespan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-600 dark:text-slate-300">
                    <tr>
                      <td className="py-2 pr-4 font-mono font-bold text-cyan-400">firebase:authUser:...</td>
                      <td className="py-2 pr-4">Google Firebase</td>
                      <td className="py-2 pr-4">Maintains your authenticated login session and token refresh.</td>
                      <td className="py-2 font-mono">Persistent</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono font-bold text-cyan-400">speakflow_cookie_consent</td>
                      <td className="py-2 pr-4">SpeakFlow AI</td>
                      <td className="py-2 pr-4">Stores your cookie preferences (Accepted, Declined, Custom).</td>
                      <td className="py-2 font-mono">1 Year</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono font-bold text-cyan-400">speakflow_theme</td>
                      <td className="py-2 pr-4">SpeakFlow AI</td>
                      <td className="py-2 pr-4">Prevents UI flash by remembering Light or Dark mode.</td>
                      <td className="py-2 font-mono">Persistent</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Category B */}
            <div
              className={`p-5 rounded-2xl border ${
                isLight ? "bg-white border-slate-200" : "bg-slate-900/60 border-slate-800"
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800/80 mb-3">
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4 text-cyan-400" />
                  <span className="font-black text-sm">2. Voice Models & Audio Waveform Caching</span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-400/30">
                  Configurable
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                To achieve sub-20ms edge voice latency, SpeakFlow caches frequent AI conversational prompts (e.g. coach greetings, pronunciation correction sounds, and CEFR feedback clips) in IndexedDB and browser cache memory.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-[11px] text-left">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-mono">
                      <th className="py-2 pr-4 font-bold">Key / Storage Area</th>
                      <th className="py-2 pr-4 font-bold">Provider</th>
                      <th className="py-2 pr-4 font-bold">Purpose</th>
                      <th className="py-2 font-bold">Lifespan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-600 dark:text-slate-300">
                    <tr>
                      <td className="py-2 pr-4 font-mono font-bold text-cyan-400">speakflow_tts_cache_v2</td>
                      <td className="py-2 pr-4">Edge TTS / SpeakFlow</td>
                      <td className="py-2 pr-4">Caches audio buffers for instant replay without re-synthesizing.</td>
                      <td className="py-2 font-mono">Session / 30 Days</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono font-bold text-cyan-400">speakflow_selected_language</td>
                      <td className="py-2 pr-4">SpeakFlow AI</td>
                      <td className="py-2 pr-4">Remembers chosen language (e.g. Sinhala, Spanish, Japanese).</td>
                      <td className="py-2 font-mono">Persistent</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Category C */}
            <div
              className={`p-5 rounded-2xl border ${
                isLight ? "bg-white border-slate-200" : "bg-slate-900/60 border-slate-800"
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800/80 mb-3">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-400" />
                  <span className="font-black text-sm">3. Fluency & Telemetry Analytics</span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30">
                  Configurable
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                These tools collect anonymous telemetry on spoken cadence (Words Per Minute), pause durations, and error rates to adjust AI coach difficulty and improve our automated speech recognition algorithms.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-[11px] text-left">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-mono">
                      <th className="py-2 pr-4 font-bold">Key / Name</th>
                      <th className="py-2 pr-4 font-bold">Provider</th>
                      <th className="py-2 pr-4 font-bold">Purpose</th>
                      <th className="py-2 font-bold">Lifespan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-600 dark:text-slate-300">
                    <tr>
                      <td className="py-2 pr-4 font-mono font-bold text-cyan-400">speakflow_telemetry_cadence</td>
                      <td className="py-2 pr-4">SpeakFlow Analytics</td>
                      <td className="py-2 pr-4">Calculates running fluency averages across completed practice sessions.</td>
                      <td className="py-2 font-mono">Persistent</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Live Audio & Privacy Guarantee */}
        <section
          className={`p-6 sm:p-7 rounded-3xl border ${
            isLight
              ? "bg-emerald-50/70 border-emerald-200"
              : "bg-emerald-950/20 border-emerald-500/30 shadow-[0_10px_40px_rgba(16,185,129,0.08)]"
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base text-emerald-900 dark:text-emerald-200">
                Our Zero-Surveillance Speech Privacy Guarantee
              </h3>
              <p className="text-xs text-emerald-700 dark:text-emerald-400">
                Microphone audio is strictly used for real-time practice and never sold.
              </p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-emerald-900/90 dark:text-emerald-200/90 leading-relaxed">
            Live microphone audio transmitted during interactive calls is converted to speech vectors in real-time to compute your conversational score. <strong>We do NOT sell, rent, or trade your voice recordings to data brokers or advertising networks.</strong> Audio cookies and cached models stored in your browser can be deleted at any time with zero impact on your account credentials.
          </p>
        </section>

        {/* Section 5: How to Control Cookies in Browsers */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-500/15 border border-purple-400/30 text-purple-400 flex items-center justify-center font-black text-sm">
              4
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">How You Can Control Cookies</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            You have the absolute right to accept, customize, or refuse cookies. You can exercise your preferences through our built-in Cookie Manager or by configuring your web browser settings:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <a
              href="https://support.google.com/chrome/answer/95647"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all hover:scale-[1.01] ${
                isLight ? "bg-white border-slate-200 hover:border-blue-400" : "bg-slate-900/60 border-slate-800 hover:border-cyan-400"
              }`}
            >
              <span className="font-bold text-xs">Google Chrome Cookie Controls</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <a
              href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all hover:scale-[1.01] ${
                isLight ? "bg-white border-slate-200 hover:border-blue-400" : "bg-slate-900/60 border-slate-800 hover:border-cyan-400"
              }`}
            >
              <span className="font-bold text-xs">Apple Safari Cookie Controls</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <a
              href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all hover:scale-[1.01] ${
                isLight ? "bg-white border-slate-200 hover:border-blue-400" : "bg-slate-900/60 border-slate-800 hover:border-cyan-400"
              }`}
            >
              <span className="font-bold text-xs">Mozilla Firefox Protection</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <a
              href="https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all hover:scale-[1.01] ${
                isLight ? "bg-white border-slate-200 hover:border-blue-400" : "bg-slate-900/60 border-slate-800 hover:border-cyan-400"
              }`}
            >
              <span className="font-bold text-xs">Microsoft Edge Privacy</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </section>

        {/* Section 6: Contact Information */}
        <section
          className={`p-6 sm:p-8 rounded-3xl border space-y-3 ${
            isLight ? "bg-slate-100 border-slate-200" : "bg-slate-900/80 border-slate-800"
          }`}
        >
          <h3 className="font-black text-base">Questions Regarding This Policy?</h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            If you have questions about our use of cookies or wish to submit a data subject access request (DSAR), please contact our Data Protection Officer:
          </p>
          <div className="pt-1 text-xs space-y-1 font-mono text-cyan-500">
            <div>Email: privacy@speakflow.ai / janithad2@gmail.com</div>
            <div>Organization: InnoXpert Technologies, Colombo, Sri Lanka</div>
            <div>Build Version: SpeakFlow AI v2.4 (Google Firebase Hybrid AI Track)</div>
          </div>
        </section>

        {/* Bottom CTA to return */}
        <div className="text-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 shadow-xl shadow-cyan-500/25 hover:brightness-110 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Return to SpeakFlow Dashboard</span>
            <span>→</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
