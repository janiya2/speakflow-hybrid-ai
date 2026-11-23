"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, Check, Sliders, Shield, Info, Lock } from "lucide-react";

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  personalization: boolean;
  audioCache: boolean;
}

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: true,
  personalization: true,
  audioCache: true,
};

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Load saved consent preference on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("speakflow_cookie_consent");
      if (!saved) {
        // Show after a brief 600ms entrance delay for smooth page load
        const timer = setTimeout(() => setIsVisible(true), 600);
        return () => clearTimeout(timer);
      } else {
        const parsed = JSON.parse(saved);
        if (parsed.preferences) {
          setPreferences(parsed.preferences);
        }
        setHasInteracted(true);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  // Listen for custom trigger event (e.g. from Cookies Policy page or footer)
  useEffect(() => {
    const handleOpenSettings = () => {
      setShowManageModal(true);
      setIsVisible(true);
    };

    window.addEventListener("speakflow_open_cookie_settings", handleOpenSettings);
    return () => window.removeEventListener("speakflow_open_cookie_settings", handleOpenSettings);
  }, []);

  const saveConsent = (status: "accepted" | "declined" | "custom", prefs: CookiePreferences) => {
    try {
      localStorage.setItem(
        "speakflow_cookie_consent",
        JSON.stringify({
          status,
          preferences: prefs,
          timestamp: new Date().toISOString(),
        })
      );
    } catch (e) {
      console.warn("Could not save cookie preferences to localStorage", e);
    }
    setPreferences(prefs);
    setIsVisible(false);
    setShowManageModal(false);
    setHasInteracted(true);
  };

  const handleAcceptAll = () => {
    saveConsent("accepted", {
      necessary: true,
      analytics: true,
      personalization: true,
      audioCache: true,
    });
  };

  const handleRejectNonEssential = () => {
    saveConsent("declined", {
      necessary: true,
      analytics: false,
      personalization: false,
      audioCache: false,
    });
  };

  const handleSaveCustomPreferences = () => {
    saveConsent("custom", preferences);
  };

  const handleClose = () => {
    // If user dismisses without making explicit choice, honor necessary only
    handleRejectNonEssential();
  };

  if (!isVisible && !showManageModal) return null;

  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* 1. Sleek Floating Cookie Banner (Matches app.yaytalk.ai style) */}
      {/* ------------------------------------------------------------- */}
      {isVisible && !showManageModal && (
        <div className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-5 flex justify-center pointer-events-none animate-in fade-in slide-in-from-bottom-6 duration-300">
          <div className="pointer-events-auto w-full max-w-6xl rounded-2xl bg-[#090D1A]/95 backdrop-blur-xl border border-slate-800 text-white shadow-[0_20px_60px_rgba(0,0,0,0.85)] p-4 sm:py-3.5 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 ring-1 ring-white/10">
            {/* Banner Left Info Text */}
            <div className="flex items-start sm:items-center gap-3 text-xs text-slate-300 leading-relaxed pr-2">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                <Cookie className="w-4 h-4" />
              </div>
              <p className="text-[11px] sm:text-xs">
                This website uses cookies and other tracking technologies to enhance user experience and to analyze performance and traffic on our website. If we have detected an opt-out preference signal, then it will be honored. More information is available in our{" "}
                <Link
                  href="/cookies"
                  className="font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors inline-flex items-center gap-0.5"
                >
                  Cookies Policy
                </Link>
                .
              </p>
            </div>

            {/* Banner Right Actions */}
            <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto justify-end">
              <button
                type="button"
                onClick={() => setShowManageModal(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 transition-all flex items-center gap-1.5"
              >
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                <span>Manage Setting</span>
              </button>

              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-5 py-2 rounded-xl text-xs font-black text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Accept All
              </button>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Dismiss cookie notice"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0 ml-1"
                title="Dismiss (Accept Essential Only)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. Deluxe Manage Preferences Modal                             */}
      {/* ------------------------------------------------------------- */}
      {showManageModal && (
        <div className="fixed inset-0 z-50 backdrop-blur-md bg-black/80 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-3xl bg-[#0C1222] border border-slate-800 text-white shadow-2xl p-6 sm:p-7 space-y-5 relative my-auto ring-1 ring-white/10">
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-400 flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black tracking-tight">Cookie & Privacy Settings</h3>
                  <p className="text-xs text-slate-400">Choose which cookies and tracking tools SpeakFlow AI uses</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowManageModal(false)}
                className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cookie Categories */}
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {/* Category 1: Strictly Necessary */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs font-bold text-white">Strictly Necessary Cookies</span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Always Active
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Essential for secure authentication, Firebase login persistence, microphone session initialization, and saving your UI theme (Light/Dark mode).
                  </p>
                </div>
                <div className="pt-1">
                  <div className="w-11 h-6 rounded-full bg-emerald-500/30 border border-emerald-500/50 flex items-center px-1 cursor-not-allowed">
                    <div className="w-4 h-4 rounded-full bg-emerald-400 ml-auto flex items-center justify-center text-[9px] font-bold text-slate-950">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Category 2: Voice Models & Audio Cache */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Cookie className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-xs font-bold text-white">Voice Models & Audio Caching</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Caches low-latency neural TTS audio clips and pronunciation waveform data locally so your spoken practice calls load in under 20ms without redundant downloads.
                  </p>
                </div>
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() =>
                      setPreferences((prev) => ({ ...prev, audioCache: !prev.audioCache }))
                    }
                    className={`w-11 h-6 rounded-full border transition-colors flex items-center px-1 ${
                      preferences.audioCache
                        ? "bg-cyan-500/30 border-cyan-400/50 justify-end"
                        : "bg-slate-800 border-slate-700 justify-start"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full transition-transform ${
                        preferences.audioCache ? "bg-cyan-400" : "bg-slate-500"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Category 3: Analytics & Fluency Telemetry */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Info className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-xs font-bold text-white">Fluency & Telemetry Analytics</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Measures speaking pace (WPM), speech pause ratios, and CEFR fluency progress to calibrate AI tutor responses and generate personalized review recommendations.
                  </p>
                </div>
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() =>
                      setPreferences((prev) => ({ ...prev, analytics: !prev.analytics }))
                    }
                    className={`w-11 h-6 rounded-full border transition-colors flex items-center px-1 ${
                      preferences.analytics
                        ? "bg-blue-500/30 border-blue-400/50 justify-end"
                        : "bg-slate-800 border-slate-700 justify-start"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full transition-transform ${
                        preferences.analytics ? "bg-blue-400" : "bg-slate-500"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Category 4: Personalization & Language Selection */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-xs font-bold text-white">Personalization & Dialect Preferences</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Remembers your preferred tutor accent (US, British, Latin American, Tokyo, Colombo) and your active vocabulary focus between sessions.
                  </p>
                </div>
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() =>
                      setPreferences((prev) => ({
                        ...prev,
                        personalization: !prev.personalization,
                      }))
                    }
                    className={`w-11 h-6 rounded-full border transition-colors flex items-center px-1 ${
                      preferences.personalization
                        ? "bg-purple-500/30 border-purple-400/50 justify-end"
                        : "bg-slate-800 border-slate-700 justify-start"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full transition-transform ${
                        preferences.personalization ? "bg-purple-400" : "bg-slate-500"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <Link
                href="/cookies"
                onClick={() => setShowManageModal(false)}
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors order-2 sm:order-1"
              >
                Read Complete Cookies Policy →
              </Link>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end order-1 sm:order-2">
                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors"
                >
                  Essential Only
                </button>
                <button
                  type="button"
                  onClick={handleSaveCustomPreferences}
                  className="px-5 py-2 rounded-xl text-xs font-black text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:brightness-110 shadow-md shadow-cyan-500/25 transition-all"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
