"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shield,
  Lock,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Globe,
  Mic,
  Database,
  EyeOff,
  UserCheck
} from "lucide-react";

export default function PrivacyPolicyPage() {
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
              href="/login"
              className={`p-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                isLight
                  ? "bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to Login</span>
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
                  Privacy Policy
                </span>
              </div>
            </Link>
          </div>

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
      </header>

      {/* ------------------------------------------------------------- */}
      {/* Hero Header Section                                           */}
      {/* ------------------------------------------------------------- */}
      <section className="relative overflow-hidden py-12 sm:py-16 border-b border-slate-200 dark:border-slate-800/80">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-500 border border-emerald-400/30">
            <Shield className="w-3.5 h-3.5" />
            <span>Privacy First Architecture</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Privacy Policy
          </h1>

          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Your conversational voice data is sacred. We believe in 100% judgment-free speaking practice with zero surveillance and zero data-broker exploitation.
          </p>

          <div className="flex items-center justify-center gap-6 pt-2 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Effective Date: November 24, 2026</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>End-to-End Encrypted Cloud Storage</span>
            </span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* Privacy Policy Body                                           */}
      {/* ------------------------------------------------------------- */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        {/* Core Privacy Pillar Banner */}
        <div
          className={`p-6 sm:p-7 rounded-3xl border ${
            isLight
              ? "bg-emerald-50/70 border-emerald-200"
              : "bg-emerald-950/20 border-emerald-500/30"
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <EyeOff className="w-5 h-5" />
            </div>
            <h3 className="font-black text-base text-emerald-900 dark:text-emerald-200">
              Our Non-Commercialization Voice Commitment
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-emerald-900/90 dark:text-emerald-200/90 leading-relaxed">
            We do NOT sell, lease, or monetize your microphone audio, speech transcripts, or conversational answers to third-party ad networks, telemetry brokers, or unauthorized foundation model training repositories.
          </p>
        </div>

        {/* Section 1: Data We Collect */}
        <section className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-500/15 border border-blue-400/30 text-blue-400 flex items-center justify-center font-black text-sm">
              1
            </div>
            <h2 className="text-xl font-black tracking-tight">Information We Collect</h2>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed list-disc list-inside">
            <li><strong>Account Information:</strong> Name, email address, profile avatar, and authentication provider (Google OAuth or Email).</li>
            <li><strong>Voice Audio & Transcripts:</strong> Real-time microphone audio streams processed temporarily in volatile memory to detect pronunciation cadence, pause ratios, and vocabulary mastery.</li>
            <li><strong>Learning Telemetry:</strong> Spoken minutes, active streak counts, CEFR fluency score levels, and grammar mistakes saved in your personal vault.</li>
            <li><strong>Device & Session Data:</strong> Browser user-agent, local storage state (active theme, target language), and performance latency metrics.</li>
          </ul>
        </section>

        {/* Section 2: How We Use Data */}
        <section className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/15 border border-indigo-400/30 text-indigo-400 flex items-center justify-center font-black text-sm">
              2
            </div>
            <h2 className="text-xl font-black tracking-tight">How We Use Your Information</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            We use your data solely to provide, calibrate, and improve your conversational fluency:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className={`p-4 rounded-2xl border ${isLight ? "bg-white border-slate-200" : "bg-slate-900/60 border-slate-800"}`}>
              <h4 className="font-bold text-xs text-cyan-400 mb-1">Adaptive AI Tutors</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Tuning AI coach responses to your vocabulary tier and speech speed in real-time.</p>
            </div>
            <div className={`p-4 rounded-2xl border ${isLight ? "bg-white border-slate-200" : "bg-slate-900/60 border-slate-800"}`}>
              <h4 className="font-bold text-xs text-purple-400 mb-1">Personalized Review Drills</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Extracting frequent spoken grammar slips into 1-click targeted pattern practice drills.</p>
            </div>
          </div>
        </section>

        {/* Section 3: Firebase Cloud Infrastructure */}
        <section className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-400 flex items-center justify-center font-black text-sm">
              3
            </div>
            <h2 className="text-xl font-black tracking-tight">Cloud Security & Firebase Infrastructure</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            SpeakFlow AI is built on Google Cloud Platform and Firebase. All data transmissions between your browser and our servers utilize TLS 1.3 encryption. Stored session records and profile documents in Google Cloud Firestore are encrypted at rest with AES-256 standards.
          </p>
        </section>

        {/* Section 4: User Rights (GDPR & CCPA) */}
        <section className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-500/15 border border-purple-400/30 text-purple-400 flex items-center justify-center font-black text-sm">
              4
            </div>
            <h2 className="text-xl font-black tracking-tight">Your Rights Under GDPR & CCPA</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            You retain complete ownership of your learning data:
          </p>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 list-disc list-inside">
            <li><strong>Right to Access:</strong> Request a complete copy of all stored call transcripts and fluency records.</li>
            <li><strong>Right to Erasure (&ldquo;Right to be Forgotten&rdquo;):</strong> Delete your account and all associated Firestore records with one click in Settings.</li>
            <li><strong>Right to Rectification:</strong> Edit your name, photo, and dialect settings at any time in Profile.</li>
          </ul>
        </section>

        {/* Section 5: Contact Information */}
        <section
          className={`p-6 sm:p-7 rounded-3xl border ${
            isLight ? "bg-slate-100 border-slate-200" : "bg-slate-900/80 border-slate-800"
          }`}
        >
          <h3 className="font-black text-base mb-1">Data Privacy Inquiries</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            To submit a data access or deletion request, please reach out to our team:
          </p>
          <div className="pt-2 text-xs font-mono text-cyan-500 space-y-0.5">
            <div>Email: privacy@speakflow.ai / janithad2@gmail.com</div>
            <div>InnoXpert Technologies • Colombo, Sri Lanka</div>
          </div>
        </section>

        {/* Bottom CTA to return */}
        <div className="text-center pt-4">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 shadow-xl shadow-cyan-500/25 hover:brightness-110 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Back to Login</span>
            <span>→</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
