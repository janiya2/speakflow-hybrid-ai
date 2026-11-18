"use client";

import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, COLLECTIONS } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import {
  KeyRound,
  ShieldCheck,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Save,
  Cpu,
  Sparkles,
  Sliders,
  Volume2,
  RefreshCw,
  Zap,
  Clock,
  Check,
  Repeat,
  Plus,
  Trash2,
  Layers,
  ArrowRight,
  ShieldAlert,
  Server
} from "lucide-react";

interface TestResult {
  success: boolean;
  latencyMs?: number;
  modelUsed?: string;
  responsePreview?: string;
  errorMessage?: string;
  details?: string;
  keyType?: string;
}

interface FallbackKeyStatus {
  success: boolean;
  latencyMs?: number;
  isRateLimited?: boolean;
  isQuotaExhausted?: boolean;
  error?: string;
}

export default function ApiKeysPage() {
  const { isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [showPrimaryKey, setShowPrimaryKey] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  // Multi-Key Failover Pool State
  const [geminiApiKey, setGeminiApiKey] = useState("");
  const [fallbackKeys, setFallbackKeys] = useState<string[]>([]);
  const [keyRotationStrategy, setKeyRotationStrategy] = useState<"free-first-then-paid" | "paid-only" | "round-robin">("free-first-then-paid");
  const [testingKeyIndex, setTestingKeyIndex] = useState<number | null>(null);
  const [batchTesting, setBatchTesting] = useState(false);
  const [fallbackStatuses, setFallbackStatuses] = useState<Record<number, FallbackKeyStatus>>({});
  const [showFallbackIndex, setShowFallbackIndex] = useState<Record<number, boolean>>({});

  // AI Configuration State
  const [selectedModel, setSelectedModel] = useState("smart-routing");
  const [correctionStrictness, setCorrectionStrictness] = useState<"gentle" | "balanced" | "strict">("balanced");
  const [drillModeEnabled, setDrillModeEnabled] = useState(true);
  const [voiceSpeed, setVoiceSpeed] = useState<number>(1.0);
  const [supportedLanguages, setSupportedLanguages] = useState<string[]>(["English", "Korean", "Japanese"]);
  const [coachPersonaPrompt, setCoachPersonaPrompt] = useState(
    `You are an empathetic, encouraging, and highly skilled AI Language Coach. 
Your goal is to conduct a natural, spoken voice conversation with the user in their chosen practice language.
Follow these rules strictly:
1. Speak naturally as a native conversation partner.
2. If the user makes a grammar or pronunciation mistake, gently highlight the mistake, give the correct natural alternative, and invite them to repeat it.
3. Keep spoken replies concise and conversational (1-3 sentences) so the conversation flows seamlessly like a real phone call.`
  );

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const configDoc = await getDoc(doc(db, COLLECTIONS.SETTINGS, "ai_config"));
        if (configDoc.exists()) {
          const data = configDoc.data();
          if (data.geminiApiKey) setGeminiApiKey(data.geminiApiKey);
          if (Array.isArray(data.fallbackKeys)) {
            setFallbackKeys(data.fallbackKeys);
          }
          if (data.keyRotationStrategy) {
            setKeyRotationStrategy(data.keyRotationStrategy);
          }
          if (data.selectedModel) setSelectedModel(data.selectedModel);
          if (data.correctionStrictness) setCorrectionStrictness(data.correctionStrictness);
          if (data.drillModeEnabled !== undefined) setDrillModeEnabled(data.drillModeEnabled);
          if (data.voiceSpeed) setVoiceSpeed(data.voiceSpeed);
          if (data.supportedLanguages) setSupportedLanguages(data.supportedLanguages);
          if (data.coachPersonaPrompt) setCoachPersonaPrompt(data.coachPersonaPrompt);
          if (data.lastTestResult) setTestResult(data.lastTestResult);
        }
      } catch (err) {
        console.error("Failed to load AI config:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  // Test Primary Key
  const handleTestConnection = async () => {
    const key = geminiApiKey.trim();
    if (!key) {
      setTestResult({
        success: false,
        errorMessage: "Please enter your Primary Gemini API Key before running the test.",
      });
      return;
    }

    setTesting(true);
    setTestResult(null);
    const startTime = performance.now();

    try {
      const res = await fetch("/api/test-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: key,
          model: selectedModel,
        }),
      });

      const endTime = performance.now();
      const latency = Math.round(endTime - startTime);
      const data = await res.json();

      if (data.success) {
        const result: TestResult = {
          success: true,
          latencyMs: latency,
          modelUsed: data.workingModel,
          responsePreview: data.reply,
          keyType: data.keyType,
          details: `Connected successfully using ${data.keyType || "Gemini API Key"}. Endpoint version ${data.apiVersion}. Ready for live voice coaching!`,
        };
        setTestResult(result);

        await setDoc(
          doc(db, COLLECTIONS.SETTINGS, "ai_config"),
          {
            lastTestResult: result,
            lastTestedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      } else {
        setTestResult({
          success: false,
          latencyMs: latency,
          errorMessage: data.error || "Failed to authenticate with Google Gemini API.",
          details: data.status ? `Status: ${data.status}` : undefined,
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        errorMessage: err.message || "Network error while connecting to Gemini API endpoint.",
      });
    } finally {
      setTesting(false);
    }
  };

  // Add a new empty fallback key slot
  const handleAddFallbackKey = () => {
    setFallbackKeys([...fallbackKeys, ""]);
  };

  // Remove fallback key
  const handleRemoveFallbackKey = (index: number) => {
    const updated = fallbackKeys.filter((_, i) => i !== index);
    setFallbackKeys(updated);
    const updatedStatuses = { ...fallbackStatuses };
    delete updatedStatuses[index];
    setFallbackStatuses(updatedStatuses);
  };

  // Update fallback key text
  const handleFallbackKeyChange = (index: number, val: string) => {
    const updated = [...fallbackKeys];
    updated[index] = val;
    setFallbackKeys(updated);
  };

  // Test individual fallback key
  const handleTestIndividualKey = async (index: number) => {
    const key = fallbackKeys[index]?.trim();
    if (!key) return;

    setTestingKeyIndex(index);
    try {
      const res = await fetch("/api/test-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: key, model: selectedModel }),
      });
      const data = await res.json();
      setFallbackStatuses((prev) => ({
        ...prev,
        [index]: {
          success: data.success,
          latencyMs: data.latencyMs,
          isRateLimited: data.isRateLimited,
          isQuotaExhausted: data.isQuotaExhausted,
          error: data.error || (data.success ? "Active" : "Failed"),
        },
      }));
    } catch (err: any) {
      setFallbackStatuses((prev) => ({
        ...prev,
        [index]: {
          success: false,
          error: err.message || "Network error",
        },
      }));
    } finally {
      setTestingKeyIndex(null);
    }
  };

  // Test entire pool in parallel
  const handleTestEntirePool = async () => {
    setBatchTesting(true);
    const activeFallbackKeys = fallbackKeys.filter((k) => k.trim().length > 10);
    
    // Also test primary key
    if (geminiApiKey.trim()) {
      handleTestConnection();
    }

    try {
      const res = await fetch("/api/test-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fallbackKeys: fallbackKeys, model: selectedModel }),
      });
      const data = await res.json();
      if (data.results && Array.isArray(data.results)) {
        const statuses: Record<number, FallbackKeyStatus> = {};
        data.results.forEach((r: any, idx: number) => {
          statuses[idx] = {
            success: r.success,
            latencyMs: r.latencyMs,
            isRateLimited: r.isRateLimited,
            isQuotaExhausted: r.isQuotaExhausted,
            error: r.error || (r.success ? "Active" : "Failed"),
          };
        });
        setFallbackStatuses(statuses);
      }
    } catch (e) {
      console.error("Batch pool test error:", e);
    } finally {
      setBatchTesting(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    try {
      const cleanedFallbacks = fallbackKeys
        .map((k) => k.trim())
        .filter((k) => k.length > 0);

      await setDoc(
        doc(db, COLLECTIONS.SETTINGS, "ai_config"),
        {
          geminiApiKey: geminiApiKey.trim(),
          fallbackKeys: cleanedFallbacks,
          keyRotationStrategy,
          selectedModel,
          correctionStrictness,
          drillModeEnabled,
          voiceSpeed,
          supportedLanguages,
          coachPersonaPrompt,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      setStatusMessage({
        type: "success",
        text: "AI Settings, Multi-Key Pool & Rotation Strategy saved successfully!",
      });
    } catch (err: any) {
      console.error("Error saving settings:", err);
      setStatusMessage({ type: "error", text: err.message || "Failed to save settings." });
    } finally {
      setSaving(false);
    }
  };

  const isConfigured = Boolean(geminiApiKey && geminiApiKey.length > 20);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="w-8 h-8 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-white tracking-tight">API Keys & AI Model Settings</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              Multi-Key Failover Active
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Configure Google Gemini API keys, free fallback pools, zero-latency failover, and voice coaching parameters.
          </p>
        </div>

        {/* Status Indicator */}
        <div
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-medium ${
            testResult?.success || isConfigured
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : "bg-amber-500/10 text-amber-400 border-amber-500/20"
          }`}
        >
          {testResult?.success ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Verified & Active ({testResult.latencyMs}ms)</span>
            </>
          ) : isConfigured ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Gemini Keys Configured ({fallbackKeys.length + 1} Keys)</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span>API Key Required</span>
            </>
          )}
        </div>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-xl border flex items-center gap-3 text-sm ${
            statusMessage.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
              : "bg-rose-500/10 border-rose-500/20 text-rose-300"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Failover Strategy Selector Card */}
        <div className="bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 backdrop-blur">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white flex items-center gap-2">
                  <span>Smart Key Rotation & Failover Strategy</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Zero Student Delay
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Select how calls route between your Free Tier keys (AIza...) and Primary Paid key (AQ...).
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label
              className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                keyRotationStrategy === "free-first-then-paid"
                  ? "bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-600/10"
                  : "bg-slate-950/50 border-slate-800 text-slate-400 hover:bg-slate-800/40"
              }`}
            >
              <input
                type="radio"
                name="strategy"
                value="free-first-then-paid"
                checked={keyRotationStrategy === "free-first-then-paid"}
                onChange={() => setKeyRotationStrategy("free-first-then-paid")}
                className="mt-1 accent-indigo-500"
              />
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>⚡ Free Keys First ➔ Auto Failover to Paid</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                    Saves Money ($0/day)
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Calls always use free-tier keys first. If a free key hits 429 Rate Limit or Quota Full, the client instantly rotates to the next free key, falling back to the Paid Key with 0ms interruption to the student.
                </p>
              </div>
            </label>

            <label
              className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                keyRotationStrategy === "paid-only"
                  ? "bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-600/10"
                  : "bg-slate-950/50 border-slate-800 text-slate-400 hover:bg-slate-800/40"
              }`}
            >
              <input
                type="radio"
                name="strategy"
                value="paid-only"
                checked={keyRotationStrategy === "paid-only"}
                onChange={() => setKeyRotationStrategy("paid-only")}
                className="mt-1 accent-indigo-500"
              />
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>💎 Primary Paid Key Only</span>
                  <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">
                    Max Speed
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Exclusively routes requests to your prepaid Google Cloud / AI Studio key with high throughput and unlimited concurrent live voice streams.
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* PRIMARY PAID KEY SECTION */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 backdrop-blur">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center border border-purple-500/20">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-white">Primary Paid / Prepaid API Key</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Paid Fallback (e.g. AQ...)
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  The failover guarantee key used when free keys hit rate limits or daily quotas.
                </p>
              </div>
            </div>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-indigo-400 hover:text-indigo-300 underline underline-offset-4 flex items-center gap-1"
            >
              <span>Google AI Studio</span>
              <Sparkles className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="relative">
            <input
              type={showPrimaryKey ? "text" : "password"}
              value={geminiApiKey}
              onChange={(e) => setGeminiApiKey(e.target.value)}
              placeholder="Paste your Paid API Key (e.g. AQ.Ab8RN6...)"
              className="w-full pr-12 pl-4 py-3 bg-slate-950/70 border border-slate-800 rounded-xl text-sm font-mono text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowPrimaryKey(!showPrimaryKey)}
              className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300 transition-colors"
            >
              {showPrimaryKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Test Connection Action Bar */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800/60">
            <p className="text-[11px] text-slate-500">
              Prepaid billing ($10) ensures guaranteed uptime whenever free tier limits are exceeded.
            </p>

            <button
              type="button"
              onClick={handleTestConnection}
              disabled={testing || !geminiApiKey}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 flex-shrink-0"
            >
              {testing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Testing Paid Key...</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                  <span>Test Paid Key (පරීක්ෂා කරන්න)</span>
                </>
              )}
            </button>
          </div>

          {/* LIVE TEST RESULT CARD */}
          {testResult && (
            <div
              className={`mt-4 p-4 rounded-xl border backdrop-blur-md transition-all animate-fadeIn ${
                testResult.success
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                  : "bg-rose-500/10 border-rose-500/30 text-rose-300"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  {testResult.success ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-400 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{testResult.success ? "Paid Key is Active & Verified! 🚀" : "Paid Key Test Failed"}</span>
                      {testResult.latencyMs && (
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-indigo-400" />
                          {testResult.latencyMs} ms
                        </span>
                      )}
                    </h4>

                    {testResult.success ? (
                      <div className="mt-2 space-y-1 text-xs">
                        <p className="text-emerald-200">{testResult.details}</p>
                        <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-300 mt-2">
                          <span className="text-indigo-400 font-bold">Model ({testResult.modelUsed}): </span>
                          "{testResult.responsePreview}"
                        </div>
                      </div>
                    ) : (
                      <div className="mt-2 text-xs space-y-1">
                        <p className="text-rose-200 font-semibold">{testResult.errorMessage}</p>
                        {testResult.details && (
                          <p className="text-rose-400/80 font-mono text-[11px]">{testResult.details}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FREE TIER FALLBACK KEY POOL SECTION */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 backdrop-blur">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-600/20 text-teal-400 flex items-center justify-center border border-teal-500/20">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-white">Free-Tier Fallback Key Pool</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    {fallbackKeys.length} Free Keys Added
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Add your 5+ free Google AI Studio keys (AIzaSy...). The app exhausts these first before spending money.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleTestEntirePool}
                disabled={batchTesting || fallbackKeys.length === 0}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                {batchTesting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-teal-400" />
                    <span>Testing Pool...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-3.5 h-3.5 text-teal-400" />
                    <span>Test Entire Pool</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleAddFallbackKey}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 shadow-md shadow-teal-600/20 transition-all flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Free Key</span>
              </button>
            </div>
          </div>

          {/* Informational Banner in Sinhala & English */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 mb-4 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
            <div className="space-y-0.5">
              <p className="font-semibold text-white">
                ස්වයංක්‍රීය Zero-Delay Key Rotation ක්‍රමය:
              </p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                ශිෂ්‍යයෙක් කතා කරන විට මුලින්ම මෙම Free Keys මගින් නොමිලේ AI Response ලැබේ. යම් Key එකක 15 RPM limit හෝ Quota Exceeded (429) වූ වහාම, call එක නතර නොවී මිලි තත්පර ගණනකින් ඊළඟ Free Key එකට මාරු වේ. Free Keys සියල්ලම අවසන් වූ පසු පමණක් Paid Key එකෙන් Live Session එක දිගටම පවත්වාගෙන යයි.
              </p>
            </div>
          </div>

          {/* List of Fallback Keys */}
          {fallbackKeys.length === 0 ? (
            <div className="py-8 text-center border-2 border-dashed border-slate-800/80 rounded-xl">
              <Server className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-xs text-slate-400 font-medium">No free fallback keys added yet.</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Click "+ Add Free Key" above to paste your old AIzaSy... keys.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {fallbackKeys.map((key, idx) => {
                const status = fallbackStatuses[idx];
                const isTestingThis = testingKeyIndex === idx;
                const isShowing = showFallbackIndex[idx];

                return (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5 flex-1 min-w-0">
                      <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-400 text-xs font-mono flex items-center justify-center flex-shrink-0">
                        #{idx + 1}
                      </span>

                      <div className="relative flex-1">
                        <input
                          type={isShowing ? "text" : "password"}
                          value={key}
                          onChange={(e) => handleFallbackKeyChange(idx, e.target.value)}
                          placeholder="Paste Free Key (e.g. AIzaSy...)"
                          className="w-full pr-10 pl-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowFallbackIndex((prev) => ({
                              ...prev,
                              [idx]: !prev[idx],
                            }))
                          }
                          className="absolute right-2.5 top-2 text-slate-500 hover:text-slate-300"
                        >
                          {isShowing ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Status & Actions */}
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      {status && (
                        <div
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold flex items-center gap-1.5 ${
                            status.success
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : status.isRateLimited || status.isQuotaExhausted
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                          }`}
                        >
                          {status.success ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              <span>Active ({status.latencyMs}ms)</span>
                            </>
                          ) : status.isRateLimited ? (
                            <>
                              <Clock className="w-3 h-3 text-amber-400" />
                              <span>429 Rate Limit (Will Auto-Failover)</span>
                            </>
                          ) : status.isQuotaExhausted ? (
                            <>
                              <AlertCircle className="w-3 h-3 text-amber-400" />
                              <span>Quota Full</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-3 h-3 text-rose-400" />
                              <span>Invalid Key</span>
                            </>
                          )}
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => handleTestIndividualKey(idx)}
                        disabled={isTestingThis || !key.trim()}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors disabled:opacity-40"
                        title="Test this key"
                      >
                        {isTestingThis ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin text-teal-400" />
                        ) : (
                          <Zap className="w-3.5 h-3.5 text-teal-400" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleRemoveFallbackKey(idx)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-rose-950/50 text-slate-400 hover:text-rose-400 transition-colors"
                        title="Remove key"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Model Selection & Voice Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Model Selector */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Cpu className="w-5 h-5 text-purple-400" />
              <h3 className="text-sm font-semibold text-white">AI Model</h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">Choose the LLM engine for voice latency and accuracy.</p>

            <div className="space-y-2.5">
              {[
                {
                  id: "smart-routing",
                  name: "⚡ Smart Auto-Routing (Recommended)",
                  desc: "Dynamically switches between Gemini 2.0 Flash (for fast voice) and Pro (for complex grammar), with automatic zero-downtime failover.",
                },
                { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash (Fixed)", desc: "Ultra-low latency for real-time live voice calls" },
                { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash (Fixed)", desc: "Fast & lightweight, highly efficient token usage" },
                { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro (Fixed)", desc: "Highest intelligence & deep linguistic nuances" },
              ].map((m) => (
                <label
                  key={m.id}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedModel === m.id
                      ? "bg-indigo-600/15 border-indigo-500/50 text-white"
                      : "bg-slate-950/40 border-slate-800/80 text-slate-400 hover:bg-slate-800/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="model"
                    value={m.id}
                    checked={selectedModel === m.id}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="mt-1 accent-indigo-600"
                  />
                  <div>
                    <div className="text-xs font-semibold text-white">{m.name}</div>
                    <div className="text-[11px] text-slate-400">{m.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Grammar & Voice Coaching Feedback */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Sliders className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-semibold text-white">Coaching Strictness</h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">How actively should the AI correct speech errors?</p>

            <div className="grid grid-cols-3 gap-2 mb-6">
              {[
                { id: "gentle", label: "Gentle", desc: "Corrects only major blockers" },
                { id: "balanced", label: "Balanced", desc: "Friendly natural corrections" },
                { id: "strict", label: "Strict", desc: "Punctual grammar & accents" },
              ].map((s) => (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => setCorrectionStrictness(s.id as any)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    correctionStrictness === s.id
                      ? "bg-indigo-600/20 border-indigo-500 text-white font-semibold"
                      : "bg-slate-950/40 border-slate-800 text-slate-400 hover:bg-slate-800/40"
                  }`}
                >
                  <div className="text-xs">{s.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">{s.desc}</div>
                </button>
              ))}
            </div>

            {/* Active Pronunciation Drill Mode (Repeat to Continue) */}
            <div className="border-t border-slate-800/80 pt-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <Repeat className="w-4 h-4 text-emerald-400" />
                    Active Pronunciation Drill Mode (Repeat to Continue)
                  </span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Pauses conversation when an error occurs and requires the user to repeat the correct phrase before continuing.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-3 flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={drillModeEnabled}
                    onChange={(e) => setDrillModeEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
            </div>

            {/* Voice Speech Speed */}
            <div className="border-t border-slate-800/80 pt-4">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-indigo-400" />
                  Bot Voice Speed:
                </span>
                <span className="text-xs font-mono text-indigo-400 font-semibold">{voiceSpeed}x</span>
              </div>
              <input
                type="range"
                min="0.75"
                max="1.25"
                step="0.05"
                value={voiceSpeed}
                onChange={(e) => setVoiceSpeed(parseFloat(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>0.75x (Beginner)</span>
                <span>1.0x (Normal)</span>
                <span>1.25x (Native)</span>
              </div>
            </div>
          </div>
        </div>

        {/* System Prompt / Coach Instructions */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-semibold text-white">AI Coach System Instructions (Persona)</h3>
            </div>
          </div>
          <p className="text-xs text-slate-400 mb-3">
            This core prompt shapes how the AI talks, behaves, and formats corrections during live calls.
          </p>
          <textarea
            rows={5}
            value={coachPersonaPrompt}
            onChange={(e) => setCoachPersonaPrompt(e.target.value)}
            className="w-full p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 leading-relaxed"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
          >
            {saving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Saving Configuration...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save All Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
