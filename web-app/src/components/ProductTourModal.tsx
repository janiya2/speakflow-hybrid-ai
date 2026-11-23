"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ProductTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartPracticeCall?: () => void;
  isLight?: boolean;
}

interface TourStep {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  highlightItems: { icon: string; title: string; desc: string }[];
  accentColor: string;
  accentBg: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    id: "welcome",
    badge: "Welcome to SpeakFlow AI",
    title: "Your Personal AI Speaking Studio",
    tagline: "Overcome speaking anxiety & master 20+ languages with sub-20ms real-time AI tutors.",
    description: "Welcome to the Google Firebase #BuildHybridAI 2026 showcase! SpeakFlow AI merges on-device neural voice intelligence with cloud LLMs to deliver zero-latency conversational practice.",
    icon: "🎙️",
    accentColor: "from-blue-600 via-indigo-600 to-cyan-500",
    accentBg: "bg-blue-500/10 border-blue-500/25 text-blue-600 dark:text-cyan-400",
    highlightItems: [
      { icon: "⚡", title: "Sub-20ms Latency", desc: "Edge Voice Activity Detection (VAD) eliminates awkward lag." },
      { icon: "🛡️", title: "Judgment-Free Zone", desc: "Repeat mistakes 50 times without stress or embarrassment." },
      { icon: "🌐", title: "20 Major Languages", desc: "Native Sinhala, Spanish, Japanese, French, German, and more." },
    ],
  },
  {
    id: "coaches",
    badge: "Step 1 of 5 • AI Tutors",
    title: "Photorealistic Native AI Coaches",
    tagline: "Practice 1-on-1 conversations with lifelike avatars tuned for conversational fluency.",
    description: "Choose from 6 photorealistic AI tutors across the world, each with cultural context, authentic accent intonation, and empathetic feedback.",
    icon: "🤖",
    accentColor: "from-emerald-500 via-teal-600 to-cyan-600",
    accentBg: "bg-emerald-500/10 border-emerald-500/25 text-emerald-600 dark:text-emerald-400",
    highlightItems: [
      { icon: "🇺🇸", title: "Coach Sarah & Oliver", desc: "American native pronunciation, idiom drills, and interview prep." },
      { icon: "🇪🇸", title: "Coach Diego & Sophia", desc: "Latin American & Castilian Spanish conversational mastery." },
      { icon: "🇱🇰", title: "Coach Sameera", desc: "Authentic Sri Lankan Sinhala & English bilingual immersion." },
    ],
  },
  {
    id: "scenarios",
    badge: "Step 2 of 5 • Scenarios Catalog",
    title: "256+ Real-World Scenarios",
    tagline: "From job interviews to casual coffee chats, prepare for real conversations.",
    description: "Our 4K Panoramic catalog lets you pick targeted conversational drills organized by difficulty, context, and career domain.",
    icon: "🌍",
    accentColor: "from-purple-600 via-indigo-600 to-blue-600",
    accentBg: "bg-purple-500/10 border-purple-500/25 text-purple-600 dark:text-purple-400",
    highlightItems: [
      { icon: "💼", title: "Career & Tech Interviews", desc: "Salary negotiation, technical defense, and client pitch practice." },
      { icon: "✈️", title: "Travel & Hospitality", desc: "Airport customs, restaurant ordering, hotel bookings, and emergencies." },
      { icon: "🏏", title: "Sports & Culture", desc: "Live match analysis, cricket captaincy debates, and local traditions." },
    ],
  },
  {
    id: "voicerooms",
    badge: "Step 3 of 5 • Social Immersion",
    title: "Live Voicerooms & Lounges",
    tagline: "Practice in multi-speaker audio rooms with global learners and AI co-hosts.",
    description: "Step onto a judgment-free virtual audio stage. Listen silently from the audience or raise your hand to speak when you feel ready.",
    icon: "🎧",
    accentColor: "from-amber-500 via-orange-600 to-rose-600",
    accentBg: "bg-amber-500/10 border-amber-500/25 text-amber-600 dark:text-amber-400",
    highlightItems: [
      { icon: "🤖", title: "24/7 AI Co-Host", desc: "Keeps conversation flowing and ensures everyone gets a turn." },
      { icon: "🌍", title: "140+ Countries", desc: "Hear real global accents and practice authentic listening." },
      { icon: "🤫", title: "Silent Listener Mode", desc: "Zero pressure to speak until you build inner confidence." },
    ],
  },
  {
    id: "telemetry",
    badge: "Step 4 of 5 • Real-Time AI Feedback",
    title: "Instant Grammar Redline & Telemetry",
    tagline: "Get gentle, instant repairs on grammar, cadence, and vocabulary in real time.",
    description: "SpeakFlow's neural heuristic engine mirrors back native phrasing without breaking your conversational momentum.",
    icon: "📈",
    accentColor: "from-cyan-500 via-blue-600 to-indigo-600",
    accentBg: "bg-cyan-500/10 border-cyan-500/25 text-cyan-600 dark:text-cyan-400",
    highlightItems: [
      { icon: "📝", title: "Visual Redline Repairs", desc: "See your sentence with mistakes struck out and native phrasing highlighted." },
      { icon: "📊", title: "Fluency & Cadence Scoring", desc: "Track words-per-minute, hesitation pauses, and CEFR level growth." },
      { icon: "🔥", title: "Daily Speaking Streaks", desc: "Build a persistent speaking habit with XP boosts and milestone badges." },
    ],
  },
  {
    id: "finish",
    badge: "Step 5 of 5 • You're Ready!",
    title: "Ready to Conquer Speaking Anxiety?",
    tagline: "Your AI Speaking Studio is fully loaded. Pick a coach or topic to start!",
    description: "You're all set! As a Judge or Learner, you have full VIP access to all 6 AI tutors, 256 scenarios, and live audio voicerooms.",
    icon: "🎉",
    accentColor: "from-blue-600 via-indigo-600 to-purple-600",
    accentBg: "bg-blue-500/10 border-blue-500/25 text-blue-600 dark:text-blue-400",
    highlightItems: [
      { icon: "🚀", title: "1-Click Launch", desc: "Click Quick Call on any card to begin speaking immediately." },
      { icon: "🎙️", title: "Hardware Check", desc: "Allow microphone permissions when prompted for instant audio streaming." },
      { icon: "✨", title: "Revisit Anytime", desc: "Click the 'Product Tour' button in the header anytime to review this guide." },
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

  useEffect(() => {
    if (!isOpen) {
      setCurrentStepIdx(0);
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

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Blurred Backdrop */}
      <div
        onClick={handleDismiss}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
      />

      {/* Modal Dialog Card */}
      <div
        className={`relative w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden transition-all duration-300 z-10 animate-in zoom-in-95 duration-200 ${
          isLight
            ? "bg-white/95 border-slate-200 shadow-[0_25px_60px_rgba(15,23,42,0.2)] text-slate-800"
            : "bg-[#0A0F1F]/95 border-slate-800 shadow-[0_25px_70px_rgba(0,0,0,0.8)] text-white"
        }`}
      >
        {/* Top Gradient Accent Strip */}
        <div className={`h-2 w-full bg-gradient-to-r ${step.accentColor}`} />

        {/* Modal Header */}
        <div className="px-6 sm:px-8 pt-6 pb-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl">{step.icon}</span>
            <div>
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-black uppercase tracking-wider border ${step.accentBg}`}>
                {step.badge}
              </span>
              <p className="text-xs text-slate-400 font-medium">
                Step {currentStepIdx + 1} of {TOUR_STEPS.length}
              </p>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className={`p-2 rounded-xl border transition-all text-sm ${
              isLight
                ? "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
            title="Skip Tour"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 sm:px-8 py-6 space-y-6">
          <div className="space-y-2">
            <h3 className={`text-xl sm:text-2xl font-black tracking-tight leading-tight ${isLight ? "text-slate-900" : "text-white"}`}>
              {step.title}
            </h3>
            <p className={`text-sm sm:text-base font-semibold leading-relaxed ${isLight ? "text-blue-600" : "text-cyan-400"}`}>
              {step.tagline}
            </p>
            <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>
              {step.description}
            </p>
          </div>

          {/* 3 Highlight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {step.highlightItems.map((item, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border transition-all duration-200 ${
                  isLight
                    ? "bg-slate-50 border-slate-200/80 hover:border-blue-400 hover:bg-white shadow-xs"
                    : "bg-slate-900/60 border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900"
                }`}
              >
                <div className="text-xl mb-1.5">{item.icon}</div>
                <div className={`text-xs font-bold leading-tight mb-1 ${isLight ? "text-slate-900" : "text-white"}`}>
                  {item.title}
                </div>
                <div className={`text-[11px] leading-relaxed ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Step Progress Dots */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {TOUR_STEPS.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentStepIdx(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentStepIdx
                    ? "w-8 h-2 bg-blue-600 dark:bg-cyan-400"
                    : "w-2 h-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
                }`}
                aria-label={`Jump to step ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 sm:px-8 py-4 bg-slate-50/80 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <button
            onClick={handleDismiss}
            className={`text-xs font-bold transition-colors ${
              isLight ? "text-slate-500 hover:text-slate-800" : "text-slate-400 hover:text-white"
            }`}
          >
            Skip Tour
          </button>

          <div className="flex items-center gap-2.5">
            {!isFirst && (
              <button
                onClick={handleBack}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  isLight
                    ? "bg-white border-slate-300 text-slate-700 hover:bg-slate-100"
                    : "bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800"
                }`}
              >
                ← Back
              </button>
            )}

            <button
              onClick={handleNext}
              className={`px-5 py-2.5 rounded-xl text-xs font-black text-white shadow-md transition-all duration-200 hover:scale-105 active:scale-95 bg-gradient-to-r ${step.accentColor}`}
            >
              {isLast ? "Start Exploring Studio 🎙️" : "Next Step →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
