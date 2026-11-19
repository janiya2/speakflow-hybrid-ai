"use client";

import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, COLLECTIONS } from "@/lib/firebase";
import {
  Globe,
  Sparkles,
  Save,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  Smartphone,
  Eye,
  Layers,
  Image as ImageIcon,
  Flame,
  Award,
  Calendar,
  Compass,
  ArrowRight,
  TrendingUp,
  Download,
  AlertCircle
} from "lucide-react";

export interface LandingPageConfig {
  heroBadge: string;
  heroHeadline: string;
  heroSubtitle: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  robotImageUrl: string;
  heroBannerUrl: string;
  flameImageUrl: string;
  bigBenImageUrl: string;
  dashboardMockupUrl: string;
  apkDownloadUrl: string;
  playStoreUrl: string;
  webAppUrl: string;
  demoVideoUrl: string;
  statMinutes: string;
  statStudents: string;
  statFluency: string;
  statLanguages: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  feature4Title: string;
  feature4Desc: string;
  announcementText: string;
  announcementActive: boolean;
}

const DEFAULT_CONFIG: LandingPageConfig = {
  heroBadge: "Next-Gen AI Voice Coach • #BuildHybridAI 2026",
  heroHeadline: "Speak Any Language Like a Native Partner.",
  heroSubtitle:
    "Zero typing, zero flashcards. Practice real-time spoken phone conversations with AI in English, Spanish, Korean, Japanese, and more. Perfect your pronunciation through intelligent on-device repetition loops!",
  primaryCtaText: "Start Free Practice →",
  secondaryCtaText: "Download Android APK",
  robotImageUrl: "/images/dashboard-robot.png",
  heroBannerUrl: "/images/dashboard-hero-banner.jpg",
  flameImageUrl: "/images/flame-streak.png",
  bigBenImageUrl: "/images/lesson-london-travel.jpg",
  dashboardMockupUrl: "/images/dashboard-full-mockup.jpg",
  apkDownloadUrl: "https://github.com/janithad2/speakflow-ai/releases/download/v1.0.0/speakflow-ai.apk",
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.innoxpert.speakflow",
  webAppUrl: "http://localhost:3001",
  demoVideoUrl: "https://youtube.com/watch?v=speakflow-demo",
  statMinutes: "125,000+",
  statStudents: "10,000+",
  statFluency: "98.4%",
  statLanguages: "6 Languages",
  feature1Title: "Hybrid On-Device AI Engine",
  feature1Desc: "Zero-latency voice feedback powered by Gemini Nano on-device with smart cloud fallback.",
  feature2Title: "100+ Real Voice Scenarios",
  feature2Desc: "Immersive simulated phone calls across Food, Travel, Business, Airport, and Sports.",
  feature3Title: "Live Subtitles & Instant Scoring",
  feature3Desc: "0-100 fluency metrics, phonetic precision grading, and active pronunciation drill loops.",
  feature4Title: "Seamless Cross-Platform Sync",
  feature4Desc: "Unified learning progress across Flutter Mobile (Android/iOS) and Next.js Web Dashboard.",
  announcementText: "🎉 Google Firebase #BuildHybridAI 2026 Hackathon Finalist Edition Live!",
  announcementActive: true,
};

export default function LandingCmsPage() {
  const [config, setConfig] = useState<LandingPageConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState<"hero" | "media" | "stats" | "features" | "links">("hero");

  useEffect(() => {
    async function loadLandingSettings() {
      try {
        setLoading(true);
        const docRef = doc(db, COLLECTIONS.SETTINGS, "landing_page");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setConfig({ ...DEFAULT_CONFIG, ...docSnap.data() });
        }
      } catch (err: any) {
        console.error("Error loading landing settings:", err);
        setErrorMsg("Failed to load existing settings from Firestore. Loaded defaults.");
      } finally {
        setLoading(false);
      }
    }
    loadLandingSettings();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      setErrorMsg("");
      const docRef = doc(db, COLLECTIONS.SETTINGS, "landing_page");
      await setDoc(docRef, {
        ...config,
        updatedAt: new Date().toISOString(),
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3500);
    } catch (err: any) {
      console.error("Error saving landing settings:", err);
      setErrorMsg("Failed to save settings to Firestore: " + (err.message || String(err)));
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefaults = () => {
    if (confirm("Reset all landing page settings to default hackathon values?")) {
      setConfig(DEFAULT_CONFIG);
    }
  };

  const updateField = (field: keyof LandingPageConfig, value: any) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-slate-900/80 rounded-2xl border border-slate-800 backdrop-blur">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-lg">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                Landing Page & Marketing CMS
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                  Live Sync
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Manage SpeakFlow public landing page content, hero assets, download links, and live counters.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={config.webAppUrl || "http://localhost:3001"}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>View Live Site</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          <button
            onClick={handleResetDefaults}
            type="button"
            className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            type="button"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{saving ? "Publishing..." : "Save & Publish"}</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-300 text-sm animate-in fade-in duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>Landing page published successfully! Changes are instantly live on the public website.</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-rose-300 text-sm">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Grid Layout: Left Tabs + Form & Right Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Controls & Tabs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Navigation Pill Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveTab("hero")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === "hero"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hero & Headlines</span>
            </button>

            <button
              onClick={() => setActiveTab("media")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === "media"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Images & Media</span>
            </button>

            <button
              onClick={() => setActiveTab("stats")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === "stats"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Live Counters</span>
            </button>

            <button
              onClick={() => setActiveTab("features")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === "features"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Feature Cards</span>
            </button>

            <button
              onClick={() => setActiveTab("links")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === "links"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Downloads & Links</span>
            </button>
          </div>

          {/* TAB 1: HERO & HEADLINES */}
          {activeTab === "hero" && (
            <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-5">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                Hero Section Copywriting
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Top Announcement Banner Text
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={config.announcementText}
                      onChange={(e) => updateField("announcementText", e.target.value)}
                      className="flex-1 bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                    <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.announcementActive}
                        onChange={(e) => updateField("announcementActive", e.target.checked)}
                        className="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0"
                      />
                      <span>Show</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Hero Badge Text (e.g. Hackathon Finalist pill)
                  </label>
                  <input
                    type="text"
                    value={config.heroBadge}
                    onChange={(e) => updateField("heroBadge", e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Hero Main Headline
                  </label>
                  <input
                    type="text"
                    value={config.heroHeadline}
                    onChange={(e) => updateField("heroHeadline", e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Hero Subtitle & Pitch Description
                  </label>
                  <textarea
                    rows={4}
                    value={config.heroSubtitle}
                    onChange={(e) => updateField("heroSubtitle", e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Primary CTA Button Label
                    </label>
                    <input
                      type="text"
                      value={config.primaryCtaText}
                      onChange={(e) => updateField("primaryCtaText", e.target.value)}
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Secondary CTA Button Label
                    </label>
                    <input
                      type="text"
                      value={config.secondaryCtaText}
                      onChange={(e) => updateField("secondaryCtaText", e.target.value)}
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MEDIA & ASSETS */}
          {activeTab === "media" && (
            <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-5">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-purple-400" />
                Image Assets & AI Graphics
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    3D AI Robot Tutor Image URL (Hero Mascot)
                  </label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="text"
                      value={config.robotImageUrl}
                      onChange={(e) => updateField("robotImageUrl", e.target.value)}
                      className="flex-1 bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                    />
                    <img
                      src={config.robotImageUrl}
                      alt="Robot Preview"
                      className="w-10 h-10 object-contain rounded-lg bg-slate-950 border border-slate-800"
                      onError={(e) => {
                        (e.currentTarget as any).src = "/images/dashboard-robot.png";
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Hero Banner Background / Panorama URL
                  </label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="text"
                      value={config.heroBannerUrl}
                      onChange={(e) => updateField("heroBannerUrl", e.target.value)}
                      className="flex-1 bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                    />
                    <img
                      src={config.heroBannerUrl}
                      alt="Banner Preview"
                      className="w-16 h-10 object-cover rounded-lg bg-slate-950 border border-slate-800"
                      onError={(e) => {
                        (e.currentTarget as any).src = "/images/dashboard-hero-banner.jpg";
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Fire Flame Graphic URL (Streak Card)
                  </label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="text"
                      value={config.flameImageUrl}
                      onChange={(e) => updateField("flameImageUrl", e.target.value)}
                      className="flex-1 bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                    />
                    <img
                      src={config.flameImageUrl}
                      alt="Flame Preview"
                      className="w-10 h-10 object-contain rounded-lg bg-slate-950 border border-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Upcoming Lesson Landmark URL (London Big Ben)
                  </label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="text"
                      value={config.bigBenImageUrl}
                      onChange={(e) => updateField("bigBenImageUrl", e.target.value)}
                      className="flex-1 bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                    />
                    <img
                      src={config.bigBenImageUrl}
                      alt="Big Ben Preview"
                      className="w-16 h-10 object-cover rounded-lg bg-slate-950 border border-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Full Web Dashboard Mockup URL
                  </label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="text"
                      value={config.dashboardMockupUrl}
                      onChange={(e) => updateField("dashboardMockupUrl", e.target.value)}
                      className="flex-1 bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                    />
                    <img
                      src={config.dashboardMockupUrl}
                      alt="Mockup Preview"
                      className="w-16 h-10 object-cover rounded-lg bg-slate-950 border border-slate-800"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: STATS & COUNTERS */}
          {activeTab === "stats" && (
            <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-5">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Live Stat Metrics & Proof Numbers
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Practice Time Recorded
                  </label>
                  <input
                    type="text"
                    value={config.statMinutes}
                    onChange={(e) => updateField("statMinutes", e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Active Global Students
                  </label>
                  <input
                    type="text"
                    value={config.statStudents}
                    onChange={(e) => updateField("statStudents", e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Fluency Success Rate
                  </label>
                  <input
                    type="text"
                    value={config.statFluency}
                    onChange={(e) => updateField("statFluency", e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Supported Languages
                  </label>
                  <input
                    type="text"
                    value={config.statLanguages}
                    onChange={(e) => updateField("statLanguages", e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FEATURE CARDS */}
          {activeTab === "features" && (
            <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-5">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                Key Feature Showcase (4 Value Pillars)
              </h2>

              <div className="space-y-4">
                <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-[11px] font-bold text-indigo-400">Feature 1</span>
                  <input
                    type="text"
                    value={config.feature1Title}
                    onChange={(e) => updateField("feature1Title", e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white font-semibold"
                  />
                  <textarea
                    rows={2}
                    value={config.feature1Desc}
                    onChange={(e) => updateField("feature1Desc", e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300"
                  />
                </div>

                <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-[11px] font-bold text-purple-400">Feature 2</span>
                  <input
                    type="text"
                    value={config.feature2Title}
                    onChange={(e) => updateField("feature2Title", e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white font-semibold"
                  />
                  <textarea
                    rows={2}
                    value={config.feature2Desc}
                    onChange={(e) => updateField("feature2Desc", e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300"
                  />
                </div>

                <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-[11px] font-bold text-emerald-400">Feature 3</span>
                  <input
                    type="text"
                    value={config.feature3Title}
                    onChange={(e) => updateField("feature3Title", e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white font-semibold"
                  />
                  <textarea
                    rows={2}
                    value={config.feature3Desc}
                    onChange={(e) => updateField("feature3Desc", e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300"
                  />
                </div>

                <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-[11px] font-bold text-amber-400">Feature 4</span>
                  <input
                    type="text"
                    value={config.feature4Title}
                    onChange={(e) => updateField("feature4Title", e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white font-semibold"
                  />
                  <textarea
                    rows={2}
                    value={config.feature4Desc}
                    onChange={(e) => updateField("feature4Desc", e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: DOWNLOADS & LINKS */}
          {activeTab === "links" && (
            <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-5">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Download className="w-4 h-4 text-emerald-400" />
                Distribution & App Links Hub
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Direct Android APK Download URL
                  </label>
                  <input
                    type="text"
                    value={config.apkDownloadUrl}
                    onChange={(e) => updateField("apkDownloadUrl", e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Google Play Store Listing URL
                  </label>
                  <input
                    type="text"
                    value={config.playStoreUrl}
                    onChange={(e) => updateField("playStoreUrl", e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Web App Live URL
                  </label>
                  <input
                    type="text"
                    value={config.webAppUrl}
                    onChange={(e) => updateField("webAppUrl", e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    YouTube Demo / Pitch Video URL
                  </label>
                  <input
                    type="text"
                    value={config.demoVideoUrl}
                    onChange={(e) => updateField("demoVideoUrl", e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Interactive Live Real-Time Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4 sticky top-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-indigo-400" />
                Live Landing Hero Card Preview
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Real-Time Sync</span>
            </div>

            {/* Announcement preview */}
            {config.announcementActive && (
              <div className="p-2 text-center text-[10px] font-bold text-indigo-300 bg-indigo-500/15 border border-indigo-500/30 rounded-xl">
                {config.announcementText}
              </div>
            )}

            {/* Hero Card Miniature */}
            <div className="relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 p-5 shadow-2xl space-y-4">
              {/* Background ambient glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none"></div>

              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-[10px] font-bold text-indigo-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>{config.heroBadge}</span>
              </div>

              {/* Headline */}
              <h3 className="text-lg font-black text-white leading-tight">
                {config.heroHeadline}
              </h3>

              {/* Subtitle */}
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                {config.heroSubtitle}
              </p>

              {/* 3D Robot & Mascot Graphic Preview */}
              <div className="flex items-center justify-between p-3 bg-slate-900/80 rounded-xl border border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <img
                    src={config.robotImageUrl}
                    alt="AI Mascot"
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      (e.currentTarget as any).src = "/images/dashboard-robot.png";
                    }}
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">AI Robot Tutor</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Real-time Voice Ready</span>
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-blue-600/30 border border-blue-500/40 text-[10px] text-blue-300 font-semibold">
                  Gemini Nano + 2.5
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <button
                  type="button"
                  className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold text-center shadow-lg shadow-blue-500/25 flex items-center justify-center gap-1.5"
                >
                  <span>{config.primaryCtaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  className="py-2 px-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold text-center flex items-center justify-center gap-1.5"
                >
                  <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{config.secondaryCtaText}</span>
                </button>
              </div>

              {/* 4 Stats Grid in Preview */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/60">
                <div className="p-2 rounded-lg bg-slate-900/50 border border-slate-800/50 text-center">
                  <span className="text-xs font-black text-white block">{config.statMinutes}</span>
                  <span className="text-[10px] text-slate-400">Practice Mins</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/50 border border-slate-800/50 text-center">
                  <span className="text-xs font-black text-white block">{config.statStudents}</span>
                  <span className="text-[10px] text-slate-400">Active Students</span>
                </div>
              </div>
            </div>

            {/* Direct Web App link prompt */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-center space-y-2">
              <span className="text-xs text-slate-400 block">
                Want to test the full user web experience?
              </span>
              <a
                href={config.webAppUrl || "http://localhost:3001"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md"
              >
                <span>Launch Web Application</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
