"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupRedirectPage() {
  const router = useRouter();
  const [themeMode, setThemeMode] = useState<"dark" | "light">("light");

  const isLight = themeMode === "light";

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 transition-colors duration-300 font-sans selection:bg-indigo-500 selection:text-white ${
        isLight ? "bg-[#F8FAFC] text-slate-800" : "bg-[#060913] text-slate-100"
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-cyan-600/15 via-indigo-600/20 to-purple-600/15 blur-[140px] pointer-events-none -z-10" />

      {/* Main Container Card */}
      <div
        className={`w-full max-w-lg p-8 sm:p-10 rounded-3xl border shadow-2xl space-y-8 text-center relative backdrop-blur-xl ${
          isLight
            ? "bg-white/95 border-slate-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
            : "bg-[#0B132B]/90 border-indigo-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
        }`}
      >
        {/* Brand Logo */}
        <div className="flex flex-col items-center gap-2">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <span className="text-2xl">🎙️</span>
            </div>
            <span className="font-black text-2xl tracking-tight bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              SpeakFlow<span className="text-cyan-400 font-serif">.ai</span>
            </span>
          </Link>
          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-400/30">
            Mobile-First Ecosystem
          </span>
        </div>

        {/* Informational Hero Heading */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            Account Creation is Exclusive to the{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              SpeakFlow Mobile App
            </span>
          </h1>
          <p
            className={`text-xs sm:text-sm leading-relaxed max-w-sm mx-auto ${
              isLight ? "text-slate-600" : "text-slate-300"
            }`}
          >
            To calibrate your on-device neural voice model and microphone hardware, please create your account in the Android Mobile App first.
          </p>
        </div>

        {/* Mobile Download Action Container */}
        <div
          className={`p-6 rounded-2xl border space-y-4 text-left ${
            isLight ? "bg-slate-50 border-slate-200" : "bg-slate-900/70 border-indigo-500/25"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">📱</span>
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-cyan-400">Step 1</div>
              <div className="text-sm font-bold text-slate-100">Download SpeakFlow for Android</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <a
              href="https://github.com/janithad2/speakflow-ai/releases/download/v1.0.0/speakflow-ai.apk"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-black text-xs shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>Download APK</span>
              <span>↓</span>
            </a>

            <a
              href="https://play.google.com/store/apps/details?id=com.innoxpert.speakflow"
              target="_blank"
              rel="noopener noreferrer"
              className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                isLight
                  ? "bg-white border-slate-300 text-slate-800 hover:bg-slate-100"
                  : "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
              }`}
            >
              <span>Google Play Store</span>
              <span>→</span>
            </a>
          </div>

          <p className="text-[10.5px] text-slate-400 text-center pt-1">
            Compatible with Android 8.0+ • Hybrid On-Device Gemini Nano
          </p>
        </div>

        {/* Existing User Navigation */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-medium text-slate-400">
            Already created an account on the mobile app?
          </div>
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="w-full py-3.5 rounded-xl border border-indigo-500/40 bg-indigo-500/10 hover:bg-indigo-500/20 text-cyan-300 font-black text-xs transition-all flex items-center justify-center gap-2"
          >
            <span>Log In to Web Dashboard</span>
            <span>→</span>
          </button>
        </div>

        {/* Return to Landing Page */}
        <div>
          <Link
            href="/"
            className="text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
          >
            ← Back to SpeakFlow Home
          </Link>
        </div>
      </div>
    </div>
  );
}
