"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Shield,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Globe,
  Sparkles,
  Lock,
  Scale
} from "lucide-react";

export default function TermsOfServicePage() {
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
                  Terms of Service
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-500/15 text-blue-500 border border-blue-400/30">
            <Scale className="w-3.5 h-3.5" />
            <span>Legal Agreement</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Terms of Service
          </h1>

          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Please read these terms carefully before utilizing SpeakFlow AI&apos;s conversational platform, real-time speech evaluation algorithms, and audio call simulation features.
          </p>

          <div className="flex items-center justify-center gap-6 pt-2 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Last Updated: November 24, 2026</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>Applicable Globally</span>
            </span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* Terms Content Body                                            */}
      {/* ------------------------------------------------------------- */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        {/* Section 1: Agreement to Terms */}
        <section className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-500/15 border border-blue-400/30 text-blue-400 flex items-center justify-center font-black text-sm">
              1
            </div>
            <h2 className="text-xl font-black tracking-tight">Acceptance of Terms</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            By creating an account, signing in via Google Auth, or using SpeakFlow AI (operated by InnoXpert Technologies), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use the application.
          </p>
        </section>

        {/* Section 2: Service Description */}
        <section className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/15 border border-indigo-400/30 text-indigo-400 flex items-center justify-center font-black text-sm">
              2
            </div>
            <h2 className="text-xl font-black tracking-tight">Description of Services</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            SpeakFlow AI provides an interactive, real-time voice language learning platform powered by artificial intelligence. Services include simulated phone calls with photorealistic AI coaches, live spoken grammar correction, vocabulary drills, and CEFR fluency metric calculation across 20+ supported world languages (including English, Sinhala, Spanish, Japanese, and Mandarin).
          </p>
        </section>

        {/* Section 3: User Accounts & Hackathon Demo Access */}
        <section className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-400 flex items-center justify-center font-black text-sm">
              3
            </div>
            <h2 className="text-xl font-black tracking-tight">User Accounts & Hackathon Evaluation Access</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            To access certain features, you may authenticate via email or Google Single Sign-On. For official hackathon judging and evaluation, 1-click instant demo access is provided. You are responsible for maintaining the confidentiality of your account credentials and all activities that occur under your account.
          </p>
        </section>

        {/* Section 4: Acceptable Use Policy */}
        <section className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-500/15 border border-purple-400/30 text-purple-400 flex items-center justify-center font-black text-sm">
              4
            </div>
            <h2 className="text-xl font-black tracking-tight">Acceptable Use Policy</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            You agree not to use the voice call features to transmit abusive, hateful, defamatory, or unlawful audio content. You may not attempt to reverse engineer, scrape, or probe SpeakFlow AI&apos;s real-time streaming sockets or automated speech recognition models.
          </p>
        </section>

        {/* Section 5: Intellectual Property */}
        <section className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-400 flex items-center justify-center font-black text-sm">
              5
            </div>
            <h2 className="text-xl font-black tracking-tight">Intellectual Property Rights</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            All proprietary code, 3D mascot artwork, UI animations, audio cadence scoring models, and brand logos are the exclusive property of InnoXpert Technologies and protected by intellectual property laws.
          </p>
        </section>

        {/* Section 6: Limitation of Liability */}
        <section className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-400 flex items-center justify-center font-black text-sm">
              6
            </div>
            <h2 className="text-xl font-black tracking-tight">Limitation of Liability</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            SpeakFlow AI is provided &ldquo;as is&rdquo; without warranties of any kind. In no event shall InnoXpert Technologies be liable for any indirect, incidental, or consequential damages resulting from your use or inability to use the platform.
          </p>
        </section>

        {/* Section 7: Contact Us */}
        <section
          className={`p-6 sm:p-7 rounded-3xl border ${
            isLight ? "bg-slate-100 border-slate-200" : "bg-slate-900/80 border-slate-800"
          }`}
        >
          <h3 className="font-black text-base mb-1">Legal Inquiries</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            For questions regarding these Terms of Service, please contact:
          </p>
          <div className="pt-2 text-xs font-mono text-cyan-500 space-y-0.5">
            <div>Email: legal@speakflow.ai / janithad2@gmail.com</div>
            <div>InnoXpert Technologies • Colombo, Sri Lanka</div>
          </div>
        </section>

        {/* Bottom CTA to return */}
        <div className="text-center pt-4">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 shadow-xl shadow-cyan-500/25 hover:brightness-110 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Proceed to Login</span>
            <span>→</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
