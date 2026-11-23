"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Bot, User, Volume2, Mic, Flame, Shield, CheckCircle2 } from "lucide-react";

interface CallSetupSideStageProps {
  isLight?: boolean;
  topicTitle?: string;
  topicLanguage?: string;
  coachName?: string;
  durationMinutes?: number | null;
}

const CONVERSATION_TURNS = [
  {
    robot: "Hi Janitha! Ready for your speaking sprint? 🎙️",
    student: "Ready Coach! Let's conquer speaking anxiety! 💪",
    robotSub: "Sub-15ms Neural Edge Voice Engaged",
    studentSub: "Targeting 95%+ Fluency Score Today"
  },
  {
    robot: "Speak naturally — zero stress or judgment here! 🛡️",
    student: "Let's practice real interview & career banter! 🚀",
    robotSub: "Real-time Phonetic Cadence Analysis",
    studentSub: "Mastering Natural Conversational Rhythm"
  },
  {
    robot: "6 Photorealistic native coaches tuned to your dialect! 🤖",
    student: "Awesome! Ready to boost my XP and speaking streak! 🔥",
    robotSub: "Hybrid Edge + Cloud Ultra Intelligence",
    studentSub: "Leveling up to CEFR Advanced Fluency"
  }
];

export default function CallSetupSideStage({
  isLight = true,
  topicTitle,
  topicLanguage = "English",
  coachName = "Sarah Jenkins",
  durationMinutes = 5
}: CallSetupSideStageProps) {
  const [turnIndex, setTurnIndex] = useState(0);

  // Cycle dialog turns smoothly every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTurnIndex((prev) => (prev + 1) % CONVERSATION_TURNS.length);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  const currentDialog = CONVERSATION_TURNS[turnIndex];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 hidden xl:flex items-center justify-between px-6 2xl:px-14">
      {/* ------------------------------------------------------------- */}
      {/* LEFT STAGE: 3D AI ROBOT TUTOR + LIVE AUDIO TELEMETRY          */}
      {/* ------------------------------------------------------------- */}
      <div className="w-[280px] 2xl:w-[320px] flex flex-col items-center space-y-4 animate-in fade-in slide-in-from-left-6 duration-500">
        {/* Robot Speech Bubble */}
        <div
          className={`w-full p-4 rounded-3xl border shadow-2xl backdrop-blur-xl relative transition-all duration-300 ${
            isLight
              ? "bg-white/95 border-blue-200 shadow-[0_15px_40px_rgba(37,99,235,0.15)] text-slate-800"
              : "bg-[#0A1022]/95 border-cyan-500/35 shadow-[0_15px_45px_rgba(0,0,0,0.8)] text-white"
          }`}
        >
          {/* Top Robot Badge & Status */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800/80">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                isLight
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : "bg-cyan-500/15 text-cyan-300 border-cyan-400/30"
              }`}
            >
              <Bot className="w-3 h-3" />
              <span>AI Robot Coach</span>
            </span>
            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Speaking</span>
            </span>
          </div>

          {/* Dynamic Dialogue Text */}
          <div className="pt-2.5 space-y-1">
            <p className={`text-xs font-black leading-snug ${isLight ? "text-slate-900" : "text-cyan-200"}`}>
              &ldquo;{currentDialog.robot}&rdquo;
            </p>
            <p className="text-[10px] text-slate-400 font-medium">
              {currentDialog.robotSub}
            </p>
          </div>

          {/* Sound Wave Equalizer Animation */}
          <div className="flex items-center gap-1 pt-2.5 justify-center">
            {[40, 75, 100, 60, 90, 45, 80, 50].map((h, i) => (
              <span
                key={i}
                className="w-1 rounded-full bg-gradient-to-t from-cyan-500 to-blue-600 transition-all duration-300 animate-pulse"
                style={{
                  height: `${h * 0.22}px`,
                  animationDelay: `${i * 120}ms`
                }}
              />
            ))}
          </div>

          {/* Bubble Tail */}
          <div
            className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 border-r border-b ${
              isLight ? "bg-white border-blue-200" : "bg-[#0A1022] border-cyan-500/35"
            }`}
          />
        </div>

        {/* 3D Robot Mascot Stage with Holographic Audio Pedestal & Circular Studio Aura */}
        <div className="relative flex flex-col items-center justify-center w-52 2xl:w-60 flex-shrink-0 group">
          {/* Ambient Lighting Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-tr from-cyan-500/25 to-blue-600/25 rounded-full blur-2xl animate-pulse -z-10 pointer-events-none" />

          {/* Perfect 100% Geometric Studio Backdrop Circle (Guaranteed aspect-square, flex-shrink-0) */}
          <div
            className={`absolute top-6 left-1/2 -translate-x-1/2 w-40 h-40 2xl:w-48 2xl:h-48 rounded-full flex-shrink-0 border shadow-xl flex items-center justify-center -z-0 transition-transform duration-500 group-hover:scale-105 ${
              isLight
                ? "bg-gradient-to-b from-blue-50/90 via-white/80 to-sky-100/90 border-blue-200/90 shadow-[0_12px_35px_rgba(37,99,235,0.14)]"
                : "bg-gradient-to-b from-[#0F1B38]/90 via-[#091124]/90 to-[#040813]/90 border-cyan-400/40 shadow-[0_12px_45px_rgba(0,0,0,0.8)]"
            }`}
            style={{ aspectRatio: "1 / 1" }}
          >
            {/* High-tech spinning dashed telemetry ring */}
            <div className="absolute inset-2 rounded-full border border-dashed border-cyan-400/30 animate-spin [animation-duration:24s]" />
            <div className="absolute inset-5 rounded-full border border-blue-400/20" />
          </div>

          {/* 3D Robot Mascot Character - Naturally Standing, NO Clipping! */}
          <div className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
            <img
              src="/images/robot_tutor_3d.png"
              alt="3D AI Robot Tutor"
              className="h-44 2xl:h-52 w-auto object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.3)] select-none"
              onError={(e) => {
                // Fallback to high-definition transparent dashboard robot if bespoke generation is still saving
                (e.currentTarget as any).src = "/images/dashboard-robot-transparent.png";
              }}
            />
          </div>

          {/* Holographic 3D Stage Pedestal beneath Feet */}
          <div className="relative -mt-3 z-10 flex flex-col items-center">
            {/* Pedestal Base Oval Disk */}
            <div
              className={`w-36 2xl:w-44 h-6 rounded-[100%] border flex items-center justify-center shadow-lg backdrop-blur-sm transition-all duration-300 ${
                isLight
                  ? "bg-gradient-to-r from-blue-500/20 via-sky-300/30 to-blue-500/20 border-blue-300/60 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                  : "bg-gradient-to-r from-cyan-500/25 via-blue-600/35 to-cyan-500/25 border-cyan-400/50 shadow-[0_0_25px_rgba(34,211,238,0.4)]"
              }`}
            >
              {/* Inner glowing pulse ring */}
              <div className="w-24 2xl:w-32 h-3 rounded-[100%] bg-cyan-400/30 animate-pulse" />
            </div>

            {/* Bottom Floating Telemetry Pill */}
            <div
              className={`mt-2 px-3 py-1 rounded-full border shadow-md flex items-center gap-1.5 whitespace-nowrap text-[10px] font-black ${
                isLight
                  ? "bg-white/95 border-slate-200 text-blue-700 shadow-sm"
                  : "bg-[#0B1226]/95 border-cyan-500/40 text-cyan-300 shadow-md"
              }`}
            >
              <Sparkles className="w-3 h-3 text-cyan-400 animate-spin" style={{ animationDuration: "6s" }} />
              <span>Sub-15ms Neural VAD</span>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* RIGHT STAGE: 3D STUDENT LEARNER + STREAK & XP TELEMETRY       */}
      {/* ------------------------------------------------------------- */}
      <div className="w-[280px] 2xl:w-[320px] flex flex-col items-center space-y-4 animate-in fade-in slide-in-from-right-6 duration-500">
        {/* Student Speech Bubble */}
        <div
          className={`w-full p-4 rounded-3xl border shadow-2xl backdrop-blur-xl relative transition-all duration-300 ${
            isLight
              ? "bg-white/95 border-emerald-200 shadow-[0_15px_40px_rgba(16,185,129,0.15)] text-slate-800"
              : "bg-[#0A1022]/95 border-indigo-500/35 shadow-[0_15px_45px_rgba(0,0,0,0.8)] text-white"
          }`}
        >
          {/* Top Student Badge & Status */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800/80">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                isLight
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-indigo-500/15 text-indigo-300 border-indigo-400/30"
              }`}
            >
              <User className="w-3 h-3" />
              <span>Janitha (Learner)</span>
            </span>
            <span className="flex items-center gap-1 text-[10px] font-bold text-amber-500">
              <Flame className="w-3 h-3 fill-amber-500" />
              <span>5d Streak</span>
            </span>
          </div>

          {/* Dynamic Dialogue Text */}
          <div className="pt-2.5 space-y-1">
            <p className={`text-xs font-black leading-snug ${isLight ? "text-slate-900" : "text-white"}`}>
              &ldquo;{currentDialog.student}&rdquo;
            </p>
            <p className="text-[10px] text-slate-400 font-medium">
              {currentDialog.studentSub}
            </p>
          </div>

          {/* Floating Language Tags */}
          <div className="flex items-center gap-1.5 pt-2.5 justify-center flex-wrap">
            {["English", "Sinhala", "Español", "日本語"].map((lang, idx) => (
              <span
                key={lang}
                className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                  idx === 0
                    ? isLight
                      ? "bg-blue-50 text-blue-700 border-blue-200"
                      : "bg-cyan-500/20 text-cyan-300 border-cyan-400/30"
                    : isLight
                    ? "bg-slate-100 text-slate-600 border-slate-200"
                    : "bg-slate-900 text-slate-400 border-slate-800"
                }`}
              >
                {lang}
              </span>
            ))}
          </div>

          {/* Bubble Tail */}
          <div
            className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 border-r border-b ${
              isLight ? "bg-white border-emerald-200" : "bg-[#0A1022] border-indigo-500/35"
            }`}
          />
        </div>

        {/* 3D Student Mascot Stage with Holographic Audio Pedestal & Circular Studio Aura */}
        <div className="relative flex flex-col items-center justify-center w-52 2xl:w-60 flex-shrink-0 group">
          {/* Ambient Lighting Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-tr from-purple-500/25 to-pink-600/25 rounded-full blur-2xl animate-pulse -z-10 pointer-events-none" />

          {/* Perfect 100% Geometric Studio Backdrop Circle (Guaranteed aspect-square, flex-shrink-0) */}
          <div
            className={`absolute top-6 left-1/2 -translate-x-1/2 w-40 h-40 2xl:w-48 2xl:h-48 rounded-full flex-shrink-0 border shadow-xl flex items-center justify-center -z-0 transition-transform duration-500 group-hover:scale-105 ${
              isLight
                ? "bg-gradient-to-b from-indigo-50/90 via-white/80 to-purple-100/90 border-indigo-200/90 shadow-[0_12px_35px_rgba(99,102,241,0.14)]"
                : "bg-gradient-to-b from-[#1C1033]/90 via-[#100824]/90 to-[#06030F]/90 border-purple-400/40 shadow-[0_12px_45px_rgba(0,0,0,0.8)]"
            }`}
            style={{ aspectRatio: "1 / 1" }}
          >
            {/* High-tech spinning dashed telemetry ring */}
            <div className="absolute inset-2 rounded-full border border-dashed border-purple-400/30 animate-spin [animation-duration:24s]" />
            <div className="absolute inset-5 rounded-full border border-indigo-400/20" />
          </div>

          {/* 3D Student Mascot Character - Naturally Standing, NO Clipping! */}
          <div className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
            <img
              src="/images/student_learner_3d.png"
              alt="3D Student Learner"
              className="h-44 2xl:h-52 w-auto object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.3)] select-none"
              onError={(e) => {
                // Fallback to student image if bespoke generation is still saving
                (e.currentTarget as any).src = "/images/student_1.webp";
              }}
            />
          </div>

          {/* Holographic 3D Stage Pedestal beneath Feet */}
          <div className="relative -mt-3 z-10 flex flex-col items-center">
            {/* Pedestal Base Oval Disk */}
            <div
              className={`w-36 2xl:w-44 h-6 rounded-[100%] border flex items-center justify-center shadow-lg backdrop-blur-sm transition-all duration-300 ${
                isLight
                  ? "bg-gradient-to-r from-purple-500/20 via-pink-300/30 to-purple-500/20 border-purple-300/60 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                  : "bg-gradient-to-r from-purple-500/25 via-pink-600/35 to-purple-500/25 border-purple-400/50 shadow-[0_0_25px_rgba(168,85,247,0.4)]"
              }`}
            >
              {/* Inner glowing pulse ring */}
              <div className="w-24 2xl:w-32 h-3 rounded-[100%] bg-purple-400/30 animate-pulse" />
            </div>

            {/* Bottom Floating Reward Pill */}
            <div
              className={`mt-2 px-3 py-1 rounded-full border shadow-md flex items-center gap-1.5 whitespace-nowrap text-[10px] font-black ${
                isLight
                  ? "bg-white/95 border-slate-200 text-amber-700 shadow-sm"
                  : "bg-[#180B2B]/95 border-purple-500/40 text-amber-300 shadow-md"
              }`}
            >
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Ready for 1-on-1 Audio</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
