"use client";

import React, { useState, useEffect } from "react";

interface ProductTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartPracticeCall?: () => void;
  isLight?: boolean;
}

interface TourStepOption {
  icon: string;
  label: string;
  detail: string;
}

interface TourStep {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  options: TourStepOption[];
  accentColor: string;
  accentBg: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    id: "quick-call",
    badge: "Step 1 of 5 • Quick Call",
    title: "Start Instant AI Voice Call",
    tagline: "Sub-20ms real-time speaking practice with native AI tutors.",
    description: "Launch immediate 1-on-1 conversations with zero waiting time. Practice English, Sinhala, Spanish, Japanese, and more in a judgment-free space.",
    icon: "🎙️",
    accentColor: "from-blue-600 via-indigo-600 to-cyan-500",
    accentBg: "bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-cyan-400",
    options: [
      { icon: "⚡", label: "Quick Call (English / Sinhala)", detail: "One tap on the hero banner to enter live audio studio" },
      { icon: "🤖", label: "6 Photorealistic Tutors", detail: "Coach Sarah, Oliver, Diego, Sophia, and Sameera" },
      { icon: "🛡️", label: "Zero Embarrassment", detail: "Repeat mistakes 50 times without stress or judgment" },
    ],
  },
  {
    id: "scenarios",
    badge: "Step 2 of 5 • Practice Catalog",
    title: "256+ Real-World Scenarios",
    tagline: "Curated roleplay drills for career, travel, and daily situations.",
    description: "Browse targeted speaking simulations designed for high-stakes interviews, technical discussions, or everyday banter.",
    icon: "🎯",
    accentColor: "from-purple-600 via-indigo-600 to-blue-600",
    accentBg: "bg-purple-500/10 border-purple-500/30 text-purple-600 dark:text-purple-400",
    options: [
      { icon: "💼", label: "Job & Salary Negotiation", detail: "Salary defense, technical cross-exams, and pitch drills" },
      { icon: "✈️", label: "Travel & Hospitality", detail: "Airport customs, restaurant orders, and hotel check-in" },
      { icon: "🏏", label: "Sports & Culture", detail: "Live cricket match discussions and cultural conversations" },
    ],
  },
  {
    id: "voicerooms",
    badge: "Step 3 of 5 • Voicerooms",
    title: "Live Social Voicerooms",
    tagline: "Multi-speaker audio rooms with global learners and AI co-hosts.",
    description: "Step onto a friendly virtual audio stage. Practice real listening and speaking alongside participants from 140+ countries.",
    icon: "🎧",
    accentColor: "from-amber-500 via-orange-600 to-rose-600",
    accentBg: "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400",
    options: [
      { icon: "🤖", label: "24/7 AI Co-Host", detail: "Moderates turn-taking and keeps conversation flowing" },
      { icon: "🤫", label: "Silent Listener Mode", detail: "Listen quietly until you are ready to raise your hand" },
      { icon: "🌍", label: "Global Accents", detail: "Hear authentic accents and practice conversational rhythm" },
    ],
  },
  {
    id: "telemetry",
    badge: "Step 4 of 5 • Streaks & Metrics",
    title: "Streak, VIP & Telemetry",
    tagline: "Track your fluency score, speaking streak, and cadence in real-time.",
    description: "Review your daily progress on the right panel. Watch your hesitation gaps shrink as your speaking confidence grows.",
    icon: "📈",
    accentColor: "from-emerald-500 via-teal-600 to-cyan-600",
    accentBg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
    options: [
      { icon: "🔥", label: "5-Day Streak & XP Multiplier", detail: "Daily momentum tracking with level-up rewards" },
      { icon: "📊", label: "CEFR Cadence & Accuracy", detail: "Real-time WPM, hesitation pauses, and grammar health" },
      { icon: "👑", label: "Yearly VIP Pass", detail: "Full unlock of all 6 tutors, audio rooms, and cloud models" },
    ],
  },
  {
    id: "dock",
    badge: "Step 5 of 5 • Command Bar",
    title: "Header Tools & AI Engine",
    tagline: "Toggle dark mode, latency engines, or CMS with one click.",
    description: "Use the top header dock to configure your audio preferences, switch themes, or re-open this tour at any time.",
    icon: "⚙️",
    accentColor: "from-cyan-500 via-blue-600 to-indigo-600",
    accentBg: "bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400",
    options: [
      { icon: "⚡", label: "SpeakFlow Neural (12ms Edge)", detail: "Toggle between on-device Nano and Cloud Gemini Flash" },
      { icon: "🌙", label: "Light / Dark Theme", detail: "Instant high-contrast dark mode or clean daylight view" },
      { icon: "✨", label: "Product Tour Button", detail: "Click 'Product Tour' in the top header to revisit anytime" },
    ],
  },
];

export default function ProductTourModal({
  isOpen,
  onClose,
  onStartPracticeCall,
  isLight = true,
}: ProductTourModalProps) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStepIdx(0);
      setIsMinimized(false);
    }
  }, [isOpen]);

  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleDismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const step = TOUR_STEPS[currentStepIdx];
  const isFirst = currentStepIdx === 0;
  const isLast = currentStepIdx === TOUR_STEPS.length - 1;

  const handleNext = () => {
    if (isLast) {
      handleComplete();
    } else {
      setCurrentStepIdx((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (!isFirst) {
      setCurrentStepIdx((prev) => prev - 1);
    }
  };

  const handleDismiss = () => {
    try {
      localStorage.setItem("speakflow_tour_completed", "true");
    } catch (_) {}
    onClose();
  };

  const handleComplete = () => {
    try {
      localStorage.setItem("speakflow_tour_completed", "true");
    } catch (_) {}
    onClose();
    if (onStartPracticeCall) {
      onStartPracticeCall();
    }
  };

  // Minimized Floating Pill State (Docked at bottom-right)
  if (isMinimized) {
    return (
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[95] animate-in fade-in slide-in-from-bottom-2 duration-200">
        <div
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border shadow-xl backdrop-blur-xl transition-all ${
            isLight
              ? "bg-white/95 border-slate-200/90 shadow-[0_10px_30px_rgba(15,23,42,0.15)] text-slate-800"
              : "bg-slate-900/95 border-slate-800/90 shadow-[0_10px_30px_rgba(0,0,0,0.6)] text-white"
          }`}
        >
          <span className="text-lg animate-pulse">{step.icon}</span>
          <div className="flex flex-col cursor-pointer" onClick={() => setIsMinimized(false)}>
            <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 dark:text-cyan-400">
              Tour • {step.badge.split("•")[1]?.trim() || `Step ${currentStepIdx + 1}`}
            </span>
            <span className="text-xs font-bold line-clamp-1">{step.title}</span>
          </div>

          <button
            type="button"
            onClick={() => setIsMinimized(false)}
            className="ml-2 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Expand ↗
          </button>

          <button
            type="button"
            onClick={handleDismiss}
            className={`p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors`}
            title="Close Tour"
          >
            ✕
          </button>
        </div>
      </div>
    );
  }

  // Expanded Floating Tour Card (Docked at bottom-right, non-blocking!)
  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[95] w-[350px] sm:w-[390px] max-w-[calc(100vw-2.5rem)] animate-in fade-in slide-in-from-bottom-5 duration-300 pointer-events-auto">
      <div
        className={`rounded-3xl border shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-300 ${
          isLight
            ? "bg-white/95 border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.22)] text-slate-800"
            : "bg-[#0A0F1F]/95 border-slate-800/90 shadow-[0_20px_60px_rgba(0,0,0,0.75)] text-white"
        }`}
      >
        {/* Top Gradient Accent Strip */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${step.accentColor}`} />

        {/* Header Bar */}
        <div className="px-5 pt-4 pb-2 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/70">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{step.icon}</span>
            <div>
              <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${step.accentBg}`}>
                {step.badge}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Minimize Button */}
            <button
              type="button"
              onClick={() => setIsMinimized(true)}
              className={`p-1.5 rounded-lg border transition-all text-xs ${
                isLight
                  ? "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
              title="Minimize Tour"
            >
              _
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={handleDismiss}
              className={`p-1.5 rounded-lg border transition-all text-xs ${
                isLight
                  ? "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
              title="Skip Tour"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tour Body */}
        <div className="px-5 py-3.5 space-y-3">
          <div>
            <h4 className={`text-base font-black tracking-tight leading-snug ${isLight ? "text-slate-900" : "text-white"}`}>
              {step.title}
            </h4>
            <p className={`text-[11.5px] font-semibold leading-tight mt-0.5 ${isLight ? "text-blue-600" : "text-cyan-400"}`}>
              {step.tagline}
            </p>
            <p className={`text-[11.5px] leading-relaxed mt-1 ${isLight ? "text-slate-600" : "text-slate-400"}`}>
              {step.description}
            </p>
          </div>

          {/* Key Options / Mentions List */}
          <div className="space-y-1.5 pt-0.5">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <span>Key Options Mentioned</span>
              <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></span>
            </div>
            {step.options.map((opt, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2.5 p-2 rounded-xl border transition-all ${
                  isLight
                    ? "bg-slate-50/80 border-slate-200/70 hover:bg-white hover:border-blue-300"
                    : "bg-slate-900/50 border-slate-800/80 hover:bg-slate-900 hover:border-cyan-500/30"
                }`}
              >
                <span className="text-sm mt-0.5 shrink-0">{opt.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className={`text-[11.5px] font-bold leading-tight ${isLight ? "text-slate-900" : "text-slate-200"}`}>
                    {opt.label}
                  </div>
                  <div className={`text-[10.5px] leading-tight mt-0.5 ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                    {opt.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Indicator Dots */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[10.5px] font-semibold text-slate-400">
              Step {currentStepIdx + 1} of {TOUR_STEPS.length}
            </span>

            <div className="flex items-center gap-1.5">
              {TOUR_STEPS.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setCurrentStepIdx(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    idx === currentStepIdx
                      ? "w-6 h-1.5 bg-blue-600 dark:bg-cyan-400"
                      : "w-1.5 h-1.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
                  }`}
                  aria-label={`Jump to step ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer Controls */}
        <div className="px-5 py-3 bg-slate-50/90 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800/70 flex items-center justify-between">
          <button
            type="button"
            onClick={handleDismiss}
            className={`text-xs font-bold transition-colors ${
              isLight ? "text-slate-400 hover:text-slate-700" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            Skip
          </button>

          <div className="flex items-center gap-2">
            {!isFirst && (
              <button
                type="button"
                onClick={handleBack}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  isLight
                    ? "bg-white border-slate-300 text-slate-700 hover:bg-slate-100"
                    : "bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800"
                }`}
              >
                ← Back
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black text-white shadow-md transition-all duration-200 hover:scale-105 active:scale-95 bg-gradient-to-r ${step.accentColor}`}
            >
              {isLast ? "Got It! Start 🎙️" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
