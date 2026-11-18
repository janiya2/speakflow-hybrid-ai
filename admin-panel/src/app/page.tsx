"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db, COLLECTIONS } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import {
  MessageSquare,
  KeyRound,
  Users,
  PhoneCall,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Bot,
  Activity,
  Mic,
  Languages
} from "lucide-react";

export default function DashboardPage() {
  const { userProfile } = useAuth();
  const [stats, setStats] = useState({
    topicsCount: 0,
    usersCount: 0,
    hasApiKey: false,
    selectedModel: "gemini-2.0-flash",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Fetch topics count
        const topicsSnap = await getDocs(collection(db, COLLECTIONS.TOPICS));
        const topicsCount = topicsSnap.size;

        // Fetch users count
        const usersSnap = await getDocs(collection(db, COLLECTIONS.USERS));
        const usersCount = usersSnap.size;

        // Fetch API config
        const aiConfigDoc = await getDoc(doc(db, COLLECTIONS.SETTINGS, "ai_config"));
        let hasApiKey = false;
        let selectedModel = "gemini-2.0-flash";
        if (aiConfigDoc.exists()) {
          const data = aiConfigDoc.data();
          hasApiKey = Boolean(data.geminiApiKey && data.geminiApiKey.length > 20);
          if (data.selectedModel) selectedModel = data.selectedModel;
        }

        setStats({
          topicsCount,
          usersCount,
          hasApiKey,
          selectedModel,
        });
      } catch (err) {
        console.error("Dashboard data load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 border border-indigo-500/20 p-8 shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Language Practice Ecosystem</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
            Welcome, {userProfile?.displayName || "Admin"}! 👋
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Manage your AI real-time voice scenarios, configure Gemini API keys, monitor student call sessions, and guide non-native speakers to speak fluently.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <Link
              href="/topics"
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Manage Scenarios</span>
            </Link>
            <Link
              href="/api-keys"
              className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all flex items-center gap-2"
            >
              <KeyRound className="w-4 h-4 text-purple-400" />
              <span>Configure AI Keys</span>
            </Link>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Scenarios */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 backdrop-blur">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Active Scenarios</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{stats.topicsCount}</div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <Languages className="w-3.5 h-3.5 text-indigo-400" />
            <span>English, Korean, Japanese</span>
          </div>
        </div>

        {/* Gemini API Status */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 backdrop-blur">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Gemini Live Engine</span>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
              stats.hasApiKey ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
            }`}>
              {stats.hasApiKey ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            </div>
          </div>
          <div className="text-sm font-bold text-white truncate">
            {stats.hasApiKey ? stats.selectedModel : "Missing API Key"}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${stats.hasApiKey ? "bg-emerald-400" : "bg-amber-400"}`} />
            <span>{stats.hasApiKey ? "Ready for Live Calls" : "Action Required"}</span>
          </div>
        </div>

        {/* Registered Users */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 backdrop-blur">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Users & Admins</span>
            <div className="w-8 h-8 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{stats.usersCount}</div>
          <div className="text-[11px] text-slate-500 mt-1">Firestore lang_users</div>
        </div>

        {/* Live Call Engine */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 backdrop-blur">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Live Voice Feedback</span>
            <div className="w-8 h-8 rounded-xl bg-pink-600/20 text-pink-400 flex items-center justify-center">
              <Mic className="w-4 h-4" />
            </div>
          </div>
          <div className="text-sm font-bold text-white">Live Captions + AI</div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
            <Activity className="w-3.5 h-3.5" />
            <span>Interactive Coaching Mode</span>
          </div>
        </div>
      </div>

      {/* Quick Setup Checklist */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-indigo-400" />
          <span>Quick Setup Checklist</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-indigo-400">Step 1</span>
                {stats.hasApiKey ? (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-semibold">Done</span>
                ) : (
                  <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-semibold">Pending</span>
                )}
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">Enter Gemini API Key</h4>
              <p className="text-xs text-slate-400">Save your Google AI Studio key to power voice conversations.</p>
            </div>
            <Link
              href="/api-keys"
              className="mt-3 text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
            >
              <span>Go to API Keys</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-indigo-400">Step 2</span>
                {stats.topicsCount > 0 ? (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-semibold">Done</span>
                ) : (
                  <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-semibold">Pending</span>
                )}
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">Add Practice Scenarios</h4>
              <p className="text-xs text-slate-400">Create topics for English, Japanese, or Korean.</p>
            </div>
            <Link
              href="/topics"
              className="mt-3 text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
            >
              <span>View Topics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-indigo-400">Step 3</span>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full font-semibold">Next Up</span>
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">Build Flutter App</h4>
              <p className="text-xs text-slate-400">Deploy the full-screen mobile call app with live captions.</p>
            </div>
            <span className="mt-3 text-xs text-slate-500 font-medium">In Progress</span>
          </div>
        </div>
      </div>
    </div>
  );
}

