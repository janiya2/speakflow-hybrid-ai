"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { Eye, EyeOff, Sparkles, ShieldCheck, ArrowLeft, Sun, Moon } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isJudgeLoading, setIsJudgeLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [themeMode, setThemeMode] = useState<"dark" | "light">("light");

  const isLight = themeMode === "light";

  // Sync initial theme from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("speakflow_theme");
      if (stored === "dark") {
        setThemeMode("dark");
      } else {
        setThemeMode("light");
      }
    } catch {
      setThemeMode("light");
    }
  }, []);

  const toggleTheme = () => {
    const next = isLight ? "dark" : "light";
    setThemeMode(next);
    try {
      localStorage.setItem("speakflow_theme", next);
      localStorage.setItem("speakflow_theme_v2", next);
      if (next === "dark") {
        document.documentElement.classList.remove("theme-light");
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("theme-light");
      }
    } catch {}
  };

  // Automatically redirect authenticated users straight to User Area
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        router.push("/?view=app");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }
    setIsLoading(true);
    setErrorMsg("");
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.push("/?view=app");
    } catch (err: any) {
      const code = err?.code || "";
      if (code.includes("user-not-found") || code.includes("wrong-password") || code.includes("invalid-credential")) {
        setErrorMsg("Invalid email or password. You can also use 1-Click Judge Demo below.");
      } else {
        setErrorMsg(err?.message || "Failed to sign in. Please try again or use Judge Demo.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/?view=app");
    } catch (err: any) {
      if (err?.code !== "auth/popup-closed-by-user") {
        setErrorMsg(err?.message || "Google sign-in failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 1-Click Hackathon Judge Demo Login Bypass
  const handleJudgeInstantLogin = () => {
    setIsJudgeLoading(true);
    try {
      // Seed official demo jury user in local storage for seamless exploration
      localStorage.setItem("speakflow_is_premium", "true");
      localStorage.setItem(
        "speakflow_user_profile",
        JSON.stringify({
          displayName: "Hackathon Judge (VIP)",
          photoUrl: "/images/janitha-avatar.jpg",
          nativeLang: "English (US / UK)",
          targetLang: "Spanish (Español)",
          dailyGoalMins: 20
        })
      );
    } catch {}
    setTimeout(() => {
      router.push("/?view=app");
    }, 350);
  };

  return (
    <div
      className={`min-h-screen flex flex-col lg:flex-row transition-colors duration-300 font-sans selection:bg-indigo-500 selection:text-white ${
        isLight
          ? "bg-gradient-to-br from-[#dce7f6] via-[#e5eef9] to-[#d8e3f4] text-slate-800"
          : "bg-gradient-to-br from-[#060913] via-[#091128] to-[#04060E] text-slate-100"
      }`}
    >
      {/* ------------------------------------------------------------- */}
      {/* LEFT COLUMN: YayTalk-Style Visual Showcase (Seamless Blend)   */}
      {/* ------------------------------------------------------------- */}
      <div className="relative hidden lg:flex lg:w-[60%] xl:w-[62%] flex-col justify-between items-center p-6 sm:p-8 xl:p-10 overflow-hidden">
        {/* Soft Ambient Background Glows */}
        <div className="absolute top-1/4 left-1/4 w-[550px] h-[550px] bg-blue-500/10 dark:bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-purple-500/15 rounded-full blur-[130px] pointer-events-none" />
        {/* Luminous Glow behind Stats in Dark Mode */}
        <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[520px] h-[340px] bg-blue-400/10 dark:bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none" />

        {/* Top Floating Badge for SpeakFlow */}
        <div className="w-full flex items-center justify-start z-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-lg shadow-blue-500/25 shrink-0 border border-blue-400/30 transition-transform duration-200 group-hover:scale-105 p-0.5 bg-gradient-to-br from-cyan-400/40 via-blue-500/30 to-indigo-600/40">
              <div className="w-full h-full rounded-[14px] overflow-hidden bg-[#0A0F1D] flex items-center justify-center">
                <Image
                  src="/images/app_logo.png"
                  alt="SpeakFlow Logo"
                  width={38}
                  height={38}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
            <div>
              <div className="flex items-center">
                <span className={`font-black text-xl tracking-tight transition-colors ${isLight ? "text-slate-900" : "text-white"}`}>
                  SpeakFlow
                </span>
                <span
                  className="font-black text-xl tracking-tight ml-0.5"
                  style={{ color: isLight ? "#2563EB" : "#38BDF8" }}
                >
                  .ai
                </span>
                <span className="ml-1.5 px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-xs">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Real-Time AI Voice Tutor</p>
            </div>
          </Link>
        </div>

        {/* Main Artwork: login-sider.webp / login-sider-dark.webp (Expanded & Seamless) */}
        <div className="relative z-10 w-full max-w-[860px] xl:max-w-[940px] aspect-[1780/1536] flex items-center justify-center my-auto transition-transform duration-700 hover:scale-[1.01]">
          <Image
            src={isLight ? "/images/login-sider.webp" : "/images/login-sider-dark.webp"}
            alt="SpeakFlow AI Trusted Voice Coaching Showcase"
            fill
            priority
            className="object-contain drop-shadow-[0_20px_50px_rgba(37,99,235,0.12)] dark:drop-shadow-[0_25px_60px_rgba(0,0,0,0.85)] select-none pointer-events-none"
          />
        </div>

        {/* Bottom Social Proof Bar */}
        <div className="relative z-10 flex items-center justify-center flex-wrap gap-4 sm:gap-6 text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider pt-2">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>100% Judgment-Free Practice</span>
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-400/60 dark:bg-slate-700" />
          <span>20+ Dialects Supported</span>
          <span className="w-1 h-1 rounded-full bg-slate-400/60 dark:bg-slate-700" />
          <span>Sub-20ms Neural Speech</span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* RIGHT COLUMN: Clean Authentication Card (Matches Screenshot)   */}
      {/* ------------------------------------------------------------- */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-14 max-w-lg mx-auto w-full">
        {/* Top Navigation Row: Back Button & Theme Switcher */}
        <div className="flex items-center justify-between w-full">
          <Link
            href="/"
            className={`text-xs font-bold flex items-center gap-1.5 transition-colors ${
              isLight ? "text-slate-500 hover:text-slate-900" : "text-slate-400 hover:text-white"
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>

          <button
            type="button"
            onClick={toggleTheme}
            className={`p-2 rounded-xl border text-sm transition-all ${
              isLight
                ? "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                : "bg-slate-900 border-slate-800 text-amber-300 hover:border-amber-400/50"
            }`}
            title="Toggle Theme"
          >
            {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>

        {/* Center Form Section (Matches YayTalk Screenshot Layout) */}
        <div className="my-auto py-6 sm:py-8 space-y-6">
          {/* Logo & Headline */}
          <div className="text-center space-y-3">
            <div className="inline-block relative">
              <Image
                src="/images/app_logo.png"
                alt="SpeakFlow AI"
                width={56}
                height={56}
                className="rounded-2xl shadow-xl border border-slate-200/90 dark:border-slate-800 mx-auto transition-transform hover:scale-105 duration-300"
                priority
              />
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                Welcome to SpeakFlow
              </h2>
              <p className={`text-xs sm:text-sm ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                Create your account to save your progress
              </p>
            </div>
          </div>

          {/* Error Notice */}
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 dark:text-rose-300 text-xs flex items-center gap-2">
              <span>⚠️</span>
              <span className="flex-1">{errorMsg}</span>
            </div>
          )}

          {/* Email / Password Form (All-in-One, No Multi-Step Friction) */}
          <form onSubmit={handleEmailLogin} className="space-y-3.5">
            {/* Email Address */}
            <div className="space-y-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className={`w-full px-4 py-3.5 rounded-2xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  isLight
                    ? "bg-white border-slate-200 text-slate-900 placeholder-slate-400 shadow-sm"
                    : "bg-slate-900/90 border-slate-800 text-slate-100 placeholder-slate-500"
                }`}
              />
            </div>

            {/* Password Field (Extra, Single-Step) */}
            <div className="space-y-1 relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (minimum 6 characters)"
                required
                className={`w-full px-4 py-3.5 pr-11 rounded-2xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  isLight
                    ? "bg-white border-slate-200 text-slate-900 placeholder-slate-400 shadow-sm"
                    : "bg-slate-900/90 border-slate-800 text-slate-100 placeholder-slate-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Primary Action Button (Matches YayTalk blue button) */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-2xl bg-[#4361EE] hover:bg-[#3A53D0] text-white font-bold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Signing in...</span>
              ) : (
                <span>Continue with email</span>
              )}
            </button>
          </form>

          {/* Divider: "or" */}
          <div className="relative flex items-center justify-center my-2">
            <div className={`w-full border-t ${isLight ? "border-slate-200" : "border-slate-800"}`} />
            <span
              className={`absolute px-3 text-xs font-medium ${
                isLight ? "bg-[#F8FAFC] text-slate-400" : "bg-[#060913] text-slate-500"
              }`}
            >
              or
            </span>
          </div>

          {/* Social Auth: GOOGLE ONLY (Apple removed as requested) */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-2xl border font-bold text-xs sm:text-sm flex items-center justify-center gap-3 transition-all ${
              isLight
                ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm hover:border-slate-300"
                : "bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-800/80"
            }`}
          >
            {/* Google G Multicolor Icon */}
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google</span>
          </button>

          {/* ----------------------------------------------------------- */}
          {/* 1-CLICK HACKATHON JUDGE DEMO LOGIN                          */}
          {/* ----------------------------------------------------------- */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleJudgeInstantLogin}
              disabled={isJudgeLoading}
              className={`w-full py-3.5 px-4 rounded-2xl border font-black text-xs flex items-center justify-center gap-2 transition-all ${
                isLight
                  ? "bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border-amber-300 text-amber-900 hover:bg-amber-500/20 shadow-sm"
                  : "bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-amber-500/15 border-amber-500/40 text-amber-300 hover:border-amber-400 hover:bg-amber-500/25 shadow-lg"
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: "5s" }} />
              <span>
                {isJudgeLoading ? "Entering Live Studio..." : "⚡ 1-Click Judge Instant Demo Access"}
              </span>
            </button>
            <p className="text-[10px] text-center text-slate-400 pt-1.5">
              Judges & Evaluators: Instant 1-click bypass straight to User Dashboard
            </p>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Bottom Terms of Service & Privacy Policy Notice               */}
        {/* (Matches Screenshot: By continuing to use the app...)         */}
        {/* ------------------------------------------------------------- */}
        <div className="text-center pt-4 pb-2">
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
            By continuing to use the app, you agree to our{" "}
            <Link
              href="/terms"
              className="underline hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              Terms of Service
            </Link>{" "}
            &amp;{" "}
            <Link
              href="/privacy"
              className="underline hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
