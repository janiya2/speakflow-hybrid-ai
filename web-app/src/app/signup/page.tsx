"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [targetLang, setTargetLang] = useState("Sinhala");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [themeMode, setThemeMode] = useState<"dark" | "light">("dark");

  const isLight = themeMode === "light";

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrorMsg("Please fill out all fields.");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name.trim() });

      // Save user document into Firestore
      try {
        await setDoc(doc(db, "lang_users", user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: name.trim(),
          targetLanguage: targetLang,
          createdAt: new Date().toISOString(),
          isVip: true,
          plan: "Yearly VIP",
          totalXp: 1250,
          speakingStreak: 1,
        });
      } catch (_) {}

      // Save selected language to localStorage
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("speakflow_selected_language", targetLang);
        } catch (_) {}
      }

      router.push("/?view=app");
    } catch (err: any) {
      const code = err?.code || "";
      if (code.includes("email-already-in-use")) {
        setErrorMsg("This email is already registered. Please log in instead.");
      } else {
        setErrorMsg(err?.message || "Failed to create account. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      const user = res.user;

      try {
        await setDoc(
          doc(db, "lang_users", user.uid),
          {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || name || "Learner",
            targetLanguage: targetLang,
            createdAt: new Date().toISOString(),
            isVip: true,
            plan: "Yearly VIP",
          },
          { merge: true }
        );
      } catch (_) {}

      router.push("/?view=app");
    } catch (err: any) {
      if (err?.code !== "auth/popup-closed-by-user") {
        setErrorMsg(err?.message || "Google sign-up failed.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col lg:flex-row transition-colors duration-300 font-sans selection:bg-indigo-500 selection:text-white ${
        isLight ? "bg-[#F8FAFC] text-slate-800" : "bg-[#060913] text-slate-100"
      }`}
    >
      {/* Left Column: Visual Showcase Card */}
      <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-between p-12 overflow-hidden bg-gradient-to-br from-indigo-950 via-[#0B122C] to-slate-950 border-r border-indigo-900/30">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-[120px] pointer-events-none" />

        {/* Top Header Logo */}
        <div className="relative z-10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
              <span className="text-xl">🎙️</span>
            </div>
            <div>
              <span className="font-black text-xl tracking-tight bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                SpeakFlow<span className="text-cyan-400 font-serif">.ai</span>
              </span>
              <p className="text-[10px] text-slate-400 font-medium">Real-Time AI Voice Tutor</p>
            </div>
          </Link>

          <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-400/30">
            Free 7-Day Access
          </span>
        </div>

        {/* Center Hero Visual Mockup */}
        <div className="relative z-10 my-auto py-8">
          <div className="relative rounded-3xl overflow-hidden border border-indigo-500/30 shadow-2xl aspect-[16/10] bg-slate-950 group">
            <Image
              src="/images/landing/scenario_section.webp"
              alt="SpeakFlow AI 256 Scenarios Showcase"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-indigo-500/30 space-y-2 text-left">
              <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold">
                <span>⚡ Sub-20ms Real-Time Edge Latency</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed italic">
                &ldquo;Create your account and jump into your first 5-minute speaking sprint in less than 30 seconds.&rdquo;
              </p>
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold pt-1 border-t border-slate-800">
                <span>Supported in 20 Languages</span>
                <span className="text-emerald-300">100% On-Device Privacy Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Feature Badges */}
        <div className="relative z-10 grid grid-cols-3 gap-3 text-center text-xs">
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-indigo-500/20">
            <div className="text-base font-black text-cyan-400">20</div>
            <div className="text-[10px] text-slate-400 uppercase font-bold">Languages</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-indigo-500/20">
            <div className="text-base font-black text-purple-400">6</div>
            <div className="text-[10px] text-slate-400 uppercase font-bold">Video Tutors</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-indigo-500/20">
            <div className="text-base font-black text-emerald-400">50x</div>
            <div className="text-[10px] text-slate-400 uppercase font-bold">Cheaper</div>
          </div>
        </div>
      </div>

      {/* Right Column: Registration Form */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-12 lg:p-16 max-w-xl mx-auto w-full">
        <div className="flex items-center justify-between w-full">
          <Link
            href="/"
            className={`text-xs font-bold flex items-center gap-1.5 transition-colors ${
              isLight ? "text-slate-500 hover:text-slate-900" : "text-slate-400 hover:text-white"
            }`}
          >
            <span>←</span>
            <span>Back to Home</span>
          </Link>

          <button
            onClick={() => setThemeMode(isLight ? "dark" : "light")}
            className={`p-2 rounded-xl border text-sm transition-all ${
              isLight
                ? "bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200"
                : "bg-slate-900 border-indigo-500/30 text-amber-300 hover:border-amber-400/50"
            }`}
          >
            {isLight ? "🌙" : "☀️"}
          </button>
        </div>

        <div className="my-auto py-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tight">Create your account</h2>
            <p className={`text-xs ${isLight ? "text-slate-500" : "text-slate-400"}`}>
              Start your journey to native conversational fluency with personalized AI tutors.
            </p>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={isLoading}
            className={`w-full py-3.5 px-4 rounded-2xl border font-bold text-xs flex items-center justify-center gap-3 transition-all ${
              isLight
                ? "bg-white border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm"
                : "bg-slate-900 border-indigo-500/30 text-white hover:border-cyan-400/60 shadow-lg"
            }`}
          >
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
            <span>Sign up with Google</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className={`w-full border-t ${isLight ? "border-slate-300" : "border-slate-800"}`} />
            <span
              className={`absolute px-3 text-[11px] font-bold uppercase tracking-wider ${
                isLight ? "bg-[#F8FAFC] text-slate-400" : "bg-[#060913] text-slate-500"
              }`}
            >
              Or with email
            </span>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <span>⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleEmailSignup} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">Your Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Janitha Dilshan"
                required
                className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all ${
                  isLight
                    ? "bg-white border-slate-300 text-slate-900"
                    : "bg-slate-900/90 border-indigo-500/30 text-slate-100 placeholder-slate-500"
                }`}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">Primary Target Language</label>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all cursor-pointer ${
                  isLight
                    ? "bg-white border-slate-300 text-slate-900"
                    : "bg-slate-900/90 border-indigo-500/30 text-slate-100"
                }`}
              >
                <option value="Sinhala">🇱🇰 Sinhala (සිංහල)</option>
                <option value="English">🇬🇧 English (British / US)</option>
                <option value="Spanish">🇪🇸 Spanish (Español)</option>
                <option value="French">🇫🇷 French (Français)</option>
                <option value="German">🇩🇪 German (Deutsch)</option>
                <option value="Japanese">🇯🇵 Japanese (日本語)</option>
                <option value="Korean">🇰🇷 Korean (한국어)</option>
                <option value="Italian">🇮🇹 Italian (Italiano)</option>
                <option value="Portuguese">🇧🇷 Portuguese (Português)</option>
                <option value="Arabic">🇦🇪 Arabic (العربية)</option>
                <option value="Tamil">🇮🇳 Tamil (தமிழ்)</option>
                <option value="Hindi">🇮🇳 Hindi (हिन्दी)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="janitha@example.com"
                required
                className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all ${
                  isLight
                    ? "bg-white border-slate-300 text-slate-900"
                    : "bg-slate-900/90 border-indigo-500/30 text-slate-100 placeholder-slate-500"
                }`}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">Create Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  required
                  className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all ${
                    isLight
                      ? "bg-white border-slate-300 text-slate-900"
                      : "bg-slate-900/90 border-indigo-500/30 text-slate-100 placeholder-slate-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-black text-xs shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Creating account...</span>
              ) : (
                <>
                  <span>Create Account & Start Free Practice</span>
                  <span>→</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center text-xs text-slate-500">
          <span>Already have an account? </span>
          <Link href="/login" className="font-bold text-cyan-400 hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
