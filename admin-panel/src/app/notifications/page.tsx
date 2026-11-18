"use client";

import React, { useState, useEffect } from "react";
import {
  Bell,
  Send,
  Sparkles,
  Users,
  Smartphone,
  CheckCircle2,
  Clock,
  RefreshCw,
  AlertCircle,
  ExternalLink,
  Flame,
  CreditCard,
  Mic,
  Calendar,
  History,
  Info,
  ChevronRight,
  Copy,
  Check,
  Terminal,
  KeyRound
} from "lucide-react";

interface NotificationHistoryItem {
  id: string;
  title: string;
  body: string;
  audience: string;
  actionRoute: string;
  totalRecipients: number;
  successCount: number;
  failureCount: number;
  status: string;
  isAutoPilot?: boolean;
  createdAt: string;
}

export default function NotificationsPage() {
  const [title, setTitle] = useState("🔥 Don't break your speaking streak!");
  const [body, setBody] = useState("Elena is waiting for you! Practice 5 minutes today to boost your fluency.");
  const [audience, setAudience] = useState("all");
  const [actionRoute, setActionRoute] = useState("/home");
  const [imageUrl, setImageUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [generatingAi, setGeneratingAi] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [isFirebaseConfigured, setIsFirebaseConfigured] = useState<boolean | null>(null);
  const [cronCopied, setCronCopied] = useState(false);
  const [showKeyGuide, setShowKeyGuide] = useState(false);

  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    pushEnabledUsers: 0,
    totalSent: 0,
  });
  const [history, setHistory] = useState<NotificationHistoryItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/notifications/send");
      if (res.ok) {
        const data = await res.json();
        setHistory(data.history || []);
        setMetrics({
          totalUsers: data.metrics?.totalUsers || 0,
          pushEnabledUsers: data.metrics?.pushEnabledUsers || 0,
          totalSent: data.history?.length || 0,
        });
        setIsFirebaseConfigured(data.isFirebaseConfigured ?? true);
      }
    } catch (err) {
      console.error("Error loading notification stats:", err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSendNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body) return;

    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/notifications/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          body,
          audience,
          actionRoute,
          imageUrl: imageUrl || undefined,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatusMessage({
          text: `Success! Broadcast dispatched to ${data.recipients} device(s). Status: ${data.status}.`,
          type: "success",
        });
        loadData();
      } else {
        setStatusMessage({
          text: data.error || "Failed to dispatch notification.",
          type: "error",
        });
      }
    } catch (err: any) {
      setStatusMessage({
        text: err.message || "Network error occurred.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAi = async (campaignType: string) => {
    setGeneratingAi(true);
    try {
      const res = await fetch("/api/notifications/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ campaignType }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.title && data.body) {
          setTitle(data.title);
          setBody(data.body);
          if (campaignType === "pro_promo") setActionRoute("/paywall");
          if (campaignType === "tutor_voice") setActionRoute("/topics");
        }
      }
    } catch (err) {
      console.error("Error generating notification with AI:", err);
    } finally {
      setGeneratingAi(false);
    }
  };

  const handleTriggerCron = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/cron/notifications");
      if (res.ok) {
        setStatusMessage({
          text: "Auto-Pilot Cron successfully executed! Campaign dispatched.",
          type: "success",
        });
        loadData();
      }
    } catch (e: any) {
      setStatusMessage({ text: "Cron execution error: " + e.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2">
            <Bell className="w-3.5 h-3.5 animate-bounce" />
            <span>Firebase Cloud Messaging (FCM v1) Active</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Push Notifications & AI Auto-Pilot
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Broadcast instant push alerts, automated speaking streak reminders, and Gemini AI conversion campaigns.
          </p>
        </div>

        <button
          onClick={loadData}
          disabled={refreshing}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
          Refresh Stats
        </button>
      </div>

      {/* METRICS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Push Enabled Devices</p>
            <h3 className="text-2xl font-bold text-white mt-1">{metrics.pushEnabledUsers}</h3>
            <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Ready for broadcast
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Smartphone className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Registered Users</p>
            <h3 className="text-2xl font-bold text-white mt-1">{metrics.totalUsers}</h3>
            <p className="text-[11px] text-slate-400 mt-1">Firebase registered students</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Campaigns Sent</p>
            <h3 className="text-2xl font-bold text-white mt-1">{metrics.totalSent}</h3>
            <p className="text-[11px] text-indigo-400 mt-1">Manual + Auto-Pilot</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center text-pink-400">
            <Send className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">AI Auto-Pilot Status</p>
            <h3 className="text-2xl font-bold text-emerald-400 mt-1">Active</h3>
            <p className="text-[11px] text-slate-400 mt-1">Daily 6PM & Weekend</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* FIREBASE CREDENTIALS WARNING (When running in Vercel without environment variables) */}
      {isFirebaseConfigured === false && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 text-amber-200">
          <div className="flex items-start gap-3">
            <KeyRound className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
            <div className="flex-1 space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                Firebase Service Account Credentials Needed in Vercel
              </h4>
              <p className="text-xs text-amber-300/90 leading-relaxed">
                Vercel serverless functions require Google Cloud credentials to send real FCM notifications.
                Add <code className="bg-black/40 px-2 py-0.5 rounded text-amber-300 font-mono">FIREBASE_SERVICE_ACCOUNT_KEY</code> in your 
                <strong> Vercel Project Settings &gt; Environment Variables</strong>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* AUTO-PILOT CRON WEBHOOK CARD */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                Auto-Pilot Cron Webhook URL
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 font-medium">
                  Vercel Cron Active
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Triggered automatically every day at 6:30 PM (13:00 UTC) or anytime via external webhook
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleTriggerCron}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 transition-colors disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {loading ? "Running..." : "Run Cron Now"}
            </button>
          </div>
        </div>

        {/* WEBHOOK URL DISPLAY WITH COPY BUTTON */}
        <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2">
          <Terminal className="w-4 h-4 text-slate-500 shrink-0" />
          <input
            type="text"
            readOnly
            value="https://speakflow.innoxtools.com/api/cron/notifications"
            className="flex-1 bg-transparent text-xs text-slate-300 font-mono focus:outline-none select-all"
          />
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText("https://speakflow.innoxtools.com/api/cron/notifications");
              setCronCopied(true);
              setTimeout(() => setCronCopied(false), 2500);
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            {cronCopied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-slate-400" />
                <span>Copy URL</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* STATUS BANNER */}
      {statusMessage && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium border ${
            statusMessage.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
              : "bg-rose-500/10 border-rose-500/30 text-rose-300"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* MAIN TWO COLUMN COMPOSER & PREVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* COMPOSER FORM (2 cols) */}
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Compose Push Campaign</h3>
                <p className="text-xs text-slate-400">Deliver instant notifications to Android devices</p>
              </div>
            </div>

            {/* AI GENERATOR PRESETS */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-400 font-semibold mr-1 hidden sm:inline">AI Generate:</span>
              <button
                type="button"
                onClick={() => handleGenerateAi("streak")}
                disabled={generatingAi}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 transition-all flex items-center gap-1"
              >
                <Flame className="w-3 h-3 text-amber-400" />
                Streak
              </button>
              <button
                type="button"
                onClick={() => handleGenerateAi("pro_promo")}
                disabled={generatingAi}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/20 transition-all flex items-center gap-1"
              >
                <CreditCard className="w-3 h-3 text-indigo-400" />
                Pro Deal
              </button>
              <button
                type="button"
                onClick={() => handleGenerateAi("tutor_voice")}
                disabled={generatingAi}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-pink-500/10 text-pink-300 border border-pink-500/30 hover:bg-pink-500/20 transition-all flex items-center gap-1"
              >
                <Mic className="w-3 h-3 text-pink-400" />
                Elena
              </button>
            </div>
          </div>

          <form onSubmit={handleSendNotification} className="space-y-4">
            {/* Notification Title */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Notification Title (Short &amp; Catchy)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={60}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="e.g. 🔥 Don't break your speaking streak!"
              />
            </div>

            {/* Notification Body */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Message Body
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={3}
                maxLength={160}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                placeholder="e.g. Practice 5 minutes of conversational English with Elena now!"
              />
            </div>

            {/* Target Audience & Action Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Target Audience
                </label>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                >
                  <option value="all">👥 All Registered Learners</option>
                  <option value="free_trial">⭐ Free Trial &amp; Free Users (Pro Upsell)</option>
                  <option value="pro">👑 Active Pro Subscribers Only</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  On-Click Destination Screen
                </label>
                <select
                  value={actionRoute}
                  onChange={(e) => setActionRoute(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                >
                  <option value="/home">🏠 Home Dashboard</option>
                  <option value="/paywall">💎 Subscription Paywall ($0 Free Trial)</option>
                  <option value="/topics">🎙️ Interactive Speaking Topics</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {loading ? "Broadcasting to Devices..." : "Send Push Notification Now 🚀"}
              </button>

              <button
                type="button"
                onClick={handleTriggerCron}
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-medium text-xs px-4 py-3 rounded-xl transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Trigger Auto-Pilot Test
              </button>
            </div>
          </form>
        </div>

        {/* LIVE MOBILE PREVIEW (1 col) */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-between">
          <div className="w-full">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">
              Live Android Push Preview
            </h4>

            {/* ANDROID PHONE FRAME */}
            <div className="w-full max-w-[280px] mx-auto bg-slate-950 border-2 border-slate-800 rounded-[28px] p-3 shadow-2xl relative overflow-hidden">
              {/* Speaker notch */}
              <div className="w-20 h-3 bg-slate-800 rounded-full mx-auto mb-3" />

              {/* Status Bar */}
              <div className="flex items-center justify-between text-[10px] text-slate-500 px-1 mb-2 font-mono">
                <span>09:41</span>
                <span className="flex items-center gap-1">5G 📶 100%</span>
              </div>

              {/* NOTIFICATION CARD */}
              <div className="bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-3 shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
                      <Sparkles className="w-2.5 h-2.5 text-white" />
                    </div>
                    <span className="text-[11px] font-bold text-white tracking-tight">SpeakFlow AI</span>
                  </div>
                  <span className="text-[9px] text-slate-400">now</span>
                </div>

                <h5 className="text-xs font-bold text-slate-100 leading-snug line-clamp-1">{title}</h5>
                <p className="text-[11px] text-slate-300 leading-tight mt-0.5 line-clamp-2">{body}</p>

                <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-indigo-400 font-semibold">
                  <span>Tap to open &amp; speak</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>

              {/* Empty space mimicking lockscreen */}
              <div className="h-28 flex items-center justify-center text-[10px] text-slate-700">
                Lock Screen
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 text-center mt-4">
            Delivered in real-time via Google FCM v1 with high-priority wake lock and heads-up banner.
          </p>
        </div>
      </div>

      {/* CAMPAIGN HISTORY TABLE */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-indigo-400" />
            <h3 className="text-base font-bold text-white">Broadcast History &amp; Delivery Logs</h3>
          </div>
          <span className="text-xs text-slate-500">Last 30 campaigns</span>
        </div>

        {history.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-slate-800 rounded-xl text-slate-500 text-xs">
            No push notifications sent yet. Create your first campaign above!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3">Time</th>
                  <th className="p-3">Notification</th>
                  <th className="p-3">Target Audience</th>
                  <th className="p-3 text-center">Recipients</th>
                  <th className="p-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {history.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="p-3 whitespace-nowrap text-slate-400 font-mono text-[11px]">
                      {new Date(item.createdAt).toLocaleDateString()} {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        {item.isAutoPilot && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            Auto-Pilot
                          </span>
                        )}
                        <span>{item.title}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{item.body}</div>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                        {item.audience === "all" ? "All Users" : item.audience === "pro" ? "Pro Only" : "Free Trial"}
                      </span>
                    </td>
                    <td className="p-3 text-center font-mono font-bold text-white">
                      {item.totalRecipients}
                    </td>
                    <td className="p-3 text-right whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                          item.status === "Delivered"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : item.status.includes("Waiting")
                            ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                            : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                        }`}
                      >
                        {item.status === "Delivered" ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

