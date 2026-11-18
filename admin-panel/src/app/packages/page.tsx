"use client";

import React, { useState, useEffect } from "react";
import { db, COLLECTIONS } from "@/lib/firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from "firebase/firestore";
import {
  Clock,
  Package,
  CreditCard,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Edit2,
  Zap,
  ShieldCheck,
  Calendar,
  Layers,
  Save,
  Rocket,
  Smartphone,
  Check,
  ExternalLink,
  HelpCircle
} from "lucide-react";

interface PracticePackage {
  id: string;
  name: string;
  description: string;
  minutes: number;
  price: string;
  isMonthly: boolean;
  badge?: string;
  features: string[];
  isActive: boolean;
  createdAt?: any;
}

export default function PackagesPage() {
  // Free Allowance & Limit Settings
  const [dailyFreeMinutes, setDailyFreeMinutes] = useState(10);
  const [maxCallDuration, setMaxCallDuration] = useState(5);
  const [allowGuestCalls, setAllowGuestCalls] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);

  // Subscription Plans & Paywall Settings
  const [revenueCatApiKey, setRevenueCatApiKey] = useState("goog_YtmphTylsIXKLnPBAPRYWaLmnoB");
  const [trialDays, setTrialDays] = useState(3);
  const [weeklyName, setWeeklyName] = useState("Weekly Access");
  const [weeklyPrice, setWeeklyPrice] = useState("$1.99");
  const [monthlyName, setMonthlyName] = useState("Monthly Pro");
  const [monthlyPrice, setMonthlyPrice] = useState("$3.99");
  const [yearlyName, setYearlyName] = useState("Yearly VIP");
  const [yearlyPrice, setYearlyPrice] = useState("$39.00");
  const [yearlySavings, setYearlySavings] = useState("Save 92%");
  const [paywallTitle, setPaywallTitle] = useState("Unlock Full Access");
  const [paywallSubtitle, setPaywallSubtitle] = useState("Learn anytime and anywhere at your own pace");
  const [savingSubscription, setSavingSubscription] = useState(false);

  // Packages list
  const [packages, setPackages] = useState<PracticePackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingPkg, setSavingPkg] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingPkg, setEditingPkg] = useState<PracticePackage | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form State for individual packages
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [minutes, setMinutes] = useState(60);
  const [price, setPrice] = useState("$4.99");
  const [isMonthly, setIsMonthly] = useState(false);
  const [badge, setBadge] = useState("Popular");
  const [featuresText, setFeaturesText] = useState("60 Spoken Voice Minutes\nAll 6 Languages Supported\nInstant AI Grammar Fixes");
  const [isActive, setIsActive] = useState(true);

  // Preview State
  const [previewTier, setPreviewTier] = useState<"weekly" | "monthly" | "yearly">("weekly");

  useEffect(() => {
    fetchSettingsAndPackages();
  }, []);

  const fetchSettingsAndPackages = async () => {
    setLoading(true);
    try {
      // 1. Fetch System Time Limits from lang_settings/time_limits
      const settingsRef = doc(db, COLLECTIONS.SETTINGS, "time_limits");
      const settingsSnap = await getDoc(settingsRef);
      if (settingsSnap.exists()) {
        const data = settingsSnap.data();
        setDailyFreeMinutes(Number(data.dailyFreeMinutes) || 10);
        setMaxCallDuration(Number(data.maxCallDuration) || 5);
        setAllowGuestCalls(data.allowGuestCalls ?? true);
      } else {
        await setDoc(settingsRef, {
          dailyFreeMinutes: 10,
          maxCallDuration: 5,
          allowGuestCalls: true,
          updatedAt: serverTimestamp(),
        });
      }

      // 2. Fetch Subscription & Paywall settings from lang_settings/subscription_plans
      const subRef = doc(db, COLLECTIONS.SETTINGS, "subscription_plans");
      const subSnap = await getDoc(subRef);
      if (subSnap.exists()) {
        const subData = subSnap.data();
        setRevenueCatApiKey(subData.revenueCatApiKey || "goog_YtmphTylsIXKLnPBAPRYWaLmnoB");
        setTrialDays(Number(subData.trialDays) ?? 3);
        setWeeklyName(subData.weeklyName || "Weekly Access");
        setWeeklyPrice(subData.weeklyPrice || "$1.99");
        setMonthlyName(subData.monthlyName || "Monthly Pro");
        setMonthlyPrice(subData.monthlyPrice || "$3.99");
        setYearlyName(subData.yearlyName || "Yearly VIP");
        setYearlyPrice(subData.yearlyPrice || "$39.00");
        setYearlySavings(subData.yearlySavings || "Save 92%");
        setPaywallTitle(subData.paywallTitle || "Unlock Full Access");
        setPaywallSubtitle(subData.paywallSubtitle || "Unlimited practice with all 6 native AI coaches");
      } else {
        await setDoc(subRef, {
          revenueCatApiKey: "goog_YtmphTylsIXKLnPBAPRYWaLmnoB",
          trialDays: 3,
          weeklyName: "Weekly Access",
          weeklyPrice: "$1.99",
          monthlyName: "Monthly Pro",
          monthlyPrice: "$3.99",
          yearlyName: "Yearly VIP",
          yearlyPrice: "$39.00",
          yearlySavings: "Save 92%",
          paywallTitle: "Unlock Full Access",
          paywallSubtitle: "Unlimited practice with all 6 native AI coaches",
          updatedAt: serverTimestamp(),
        });
      }

      // 3. Fetch Packages from lang_packages
      const pkgsSnap = await getDocs(collection(db, COLLECTIONS.PACKAGES));
      const pkgList: PracticePackage[] = [];
      pkgsSnap.forEach((d) => {
        pkgList.push({ id: d.id, ...(d.data() as any) });
      });

      if (pkgList.length === 0) {
        const defaultPkgs: PracticePackage[] = [
          {
            id: "pkg_extra_60",
            name: "60 Extra Minutes",
            description: "Quick voice practice booster with instant activation.",
            minutes: 60,
            price: "$3.49",
            isMonthly: false,
            badge: "POPULAR",
            features: ["60 Live Spoken Minutes", "Valid across all 6 languages", "Real-time grammar corrections", "No expiry date"],
            isActive: true,
          },
          {
            id: "pkg_extra_180",
            name: "180 Extra Minutes Super Pack",
            description: "Best value top-up for serious daily language learners.",
            minutes: 180,
            price: "$7.99",
            isMonthly: false,
            badge: "BEST VALUE",
            features: ["180 Live Spoken Minutes", "All male & female AI coaches", "Interactive Pronunciation Drills", "Priority low-latency audio engine"],
            isActive: true,
          },
          {
            id: "pkg_monthly_pro",
            name: "Monthly Pro Speaking Pass",
            description: "Daily speaking practice pass with generous 600 monthly minutes.",
            minutes: 600,
            price: "$14.99/mo",
            isMonthly: true,
            badge: "RECOMMENDED",
            features: ["600 Monthly Practice Minutes (20 min/day)", "Full access to all 80+ conversation scenarios", "AI Custom Topic Generator", "Weekly Challenge Bonus Points"],
            isActive: true,
          },
          {
            id: "pkg_unlimited_vip",
            name: "Unlimited VIP Master Pass",
            description: "Completely unlimited voice practice with zero restrictions.",
            minutes: 9999,
            price: "$29.99/mo",
            isMonthly: true,
            badge: "VIP UNLIMITED",
            features: ["UNLIMITED Speaking Time Every Day", "Zero waiting time & VIP cloud servers", "All 6 languages & all Coach Personas unlocked", "Personalized Fluency Certificate"],
            isActive: true,
          },
        ];

        for (const p of defaultPkgs) {
          await setDoc(doc(db, COLLECTIONS.PACKAGES, p.id), {
            ...p,
            createdAt: serverTimestamp(),
          });
        }
        setPackages(defaultPkgs);
      } else {
        setPackages(pkgList);
      }
    } catch (err: any) {
      console.error("Error fetching packages:", err);
      setStatusMessage({ type: "error", text: "Failed to load data: " + err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSubscriptionSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSubscription(true);
    setStatusMessage(null);
    try {
      await setDoc(
        doc(db, COLLECTIONS.SETTINGS, "subscription_plans"),
        {
          revenueCatApiKey: revenueCatApiKey.trim(),
          trialDays: Number(trialDays),
          weeklyName: weeklyName.trim() || "Weekly Access",
          weeklyPrice: weeklyPrice.trim().startsWith("$") ? weeklyPrice.trim() : `$${weeklyPrice.trim()}`,
          monthlyName: monthlyName.trim() || "Monthly Pro",
          monthlyPrice: monthlyPrice.trim().startsWith("$") ? monthlyPrice.trim() : `$${monthlyPrice.trim()}`,
          yearlyName: yearlyName.trim() || "Yearly VIP",
          yearlyPrice: yearlyPrice.trim().startsWith("$") ? yearlyPrice.trim() : `$${yearlyPrice.trim()}`,
          yearlySavings: yearlySavings.trim(),
          paywallTitle: paywallTitle.trim(),
          paywallSubtitle: paywallSubtitle.trim(),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      setStatusMessage({
        type: "success",
        text: "Google Play Free Trial & Subscription Plans updated! Mobile app will reflect these immediately."
      });
    } catch (err: any) {
      setStatusMessage({ type: "error", text: "Failed to save subscription settings: " + err.message });
    } finally {
      setSavingSubscription(false);
    }
  };

  const handleSaveTimeLimits = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setStatusMessage(null);
    try {
      await setDoc(
        doc(db, COLLECTIONS.SETTINGS, "time_limits"),
        {
          dailyFreeMinutes: Number(dailyFreeMinutes),
          maxCallDuration: Number(maxCallDuration),
          allowGuestCalls,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      setStatusMessage({ type: "success", text: "Daily free time limits & call rules saved successfully!" });
    } catch (err: any) {
      setStatusMessage({ type: "error", text: "Failed to save settings: " + err.message });
    } finally {
      setSavingSettings(false);
    }
  };

  const handleOpenModal = (pkg?: PracticePackage) => {
    if (pkg) {
      setEditingPkg(pkg);
      setName(pkg.name);
      setDescription(pkg.description);
      setMinutes(pkg.minutes);
      setPrice(pkg.price);
      setIsMonthly(pkg.isMonthly);
      setBadge(pkg.badge || "");
      setFeaturesText(pkg.features?.join("\n") || "");
      setIsActive(pkg.isActive);
    } else {
      setEditingPkg(null);
      setName("Monthly Practice Pass");
      setDescription("Consistent monthly voice calls with instant AI pronunciation feedback.");
      setMinutes(180);
      setPrice("$7.99/mo");
      setIsMonthly(true);
      setBadge("New");
      setFeaturesText("180 Spoken Minutes / Month\nAll 6 Languages\nInstant Grammar Drills");
      setIsActive(true);
    }
    setShowModal(true);
  };

  const handleSavePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingPkg(true);
    setStatusMessage(null);

    const features = featuresText
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    try {
      const pkgData = {
        name,
        description,
        minutes: Number(minutes),
        price,
        isMonthly,
        badge,
        features,
        isActive,
        updatedAt: serverTimestamp(),
      };

      if (editingPkg) {
        await updateDoc(doc(db, COLLECTIONS.PACKAGES, editingPkg.id), pkgData);
        setStatusMessage({ type: "success", text: "Package updated successfully!" });
      } else {
        const newId = "pkg_" + Date.now();
        await setDoc(doc(db, COLLECTIONS.PACKAGES, newId), {
          ...pkgData,
          createdAt: serverTimestamp(),
        });
        setStatusMessage({ type: "success", text: "New Package created successfully!" });
      }

      setShowModal(false);
      fetchSettingsAndPackages();
    } catch (err: any) {
      setStatusMessage({ type: "error", text: "Failed to save package: " + err.message });
    } finally {
      setSavingPkg(false);
    }
  };

  const handleDeletePackage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this package?")) return;
    try {
      await deleteDoc(doc(db, COLLECTIONS.PACKAGES, id));
      setStatusMessage({ type: "success", text: "Package deleted." });
      fetchSettingsAndPackages();
    } catch (err: any) {
      alert("Error deleting package: " + err.message);
    }
  };

  const handleTogglePkgActive = async (pkg: PracticePackage) => {
    try {
      await updateDoc(doc(db, COLLECTIONS.PACKAGES, pkg.id), {
        isActive: !pkg.isActive,
      });
      fetchSettingsAndPackages();
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/30 p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Monetization & Google Play Subscriptions
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Subscriptions, Free Trials & Store Packages
            </h1>
            <p className="text-slate-400 mt-2 max-w-2xl text-sm leading-relaxed">
              Configure your multi-tier subscription plans (Weekly, Monthly, Yearly), set free trial days, and manage daily free student quotas. Changes sync in real-time to the mobile app paywall!
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add Custom Package
          </button>
        </div>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 border ${
            statusMessage.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
              : "bg-red-500/10 border-red-500/30 text-red-300"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          )}
          <span className="text-sm font-medium">{statusMessage.text}</span>
        </div>
      )}

      {/* SECTION 1: GOOGLE PLAY SUBSCRIPTION & FREE TRIAL PAYWALL MANAGER */}
      <div className="rounded-2xl bg-slate-900 border border-indigo-500/30 p-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between pb-5 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
              <Rocket className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Paywall & Subscription Tiers (Google Play Store)
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Live Sync
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Setup the 3-tier subscription model (Weekly, Monthly, Yearly) shown on signup & in-app paywall.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Settings Form (7 Columns) */}
          <form onSubmit={handleSaveSubscriptionSettings} className="lg:col-span-7 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* RevenueCat Public API Key */}
              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                <label className="block text-xs font-semibold text-indigo-400 uppercase mb-1">
                  🔑 RevenueCat Public API Key (Google Play)
                </label>
                <input
                  type="text"
                  value={revenueCatApiKey}
                  onChange={(e) => setRevenueCatApiKey(e.target.value)}
                  placeholder="goog_..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-white text-xs font-mono focus:border-indigo-500"
                />
                <p className="text-[11px] text-slate-500 mt-2">
                  Connected to Google Play In-App Billing via RevenueCat.
                </p>
              </div>

              {/* Free Trial Days */}
              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  🎁 Free Trial Days
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    max={30}
                    value={trialDays}
                    onChange={(e) => setTrialDays(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-white text-base font-bold focus:border-indigo-500"
                  />
                  <span className="text-xs font-bold text-slate-400">Days Free</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Users get {trialDays} days free before Google charges their card. Set 0 to disable trial.
                </p>
              </div>

              {/* Weekly Tier Details */}
              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  📅 Weekly Plan Name & Price
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={weeklyName}
                    onChange={(e) => setWeeklyName(e.target.value)}
                    placeholder="Weekly Access"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm font-semibold focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    value={weeklyPrice}
                    onChange={(e) => setWeeklyPrice(e.target.value)}
                    placeholder="$9.99"
                    className="w-28 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm font-bold text-center focus:border-indigo-500"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Includes &quot;No payment now&quot; badge with the {trialDays}-day free trial.
                </p>
              </div>

              {/* Monthly Tier Details */}
              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  🗓️ Monthly Plan Name & Price
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={monthlyName}
                    onChange={(e) => setMonthlyName(e.target.value)}
                    placeholder="Monthly Pro"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm font-semibold focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    value={monthlyPrice}
                    onChange={(e) => setMonthlyPrice(e.target.value)}
                    placeholder="$19.99"
                    className="w-28 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm font-bold text-center focus:border-indigo-500"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Recommended for consistent learners (~{monthlyPrice}/month).
                </p>
              </div>

              {/* Yearly Tier Details & Savings */}
              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-slate-300 uppercase">
                    👑 Yearly Plan Name & Price
                  </label>
                  <span className="text-[10px] text-emerald-400 font-bold">{yearlySavings}</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={yearlyName}
                    onChange={(e) => setYearlyName(e.target.value)}
                    placeholder="Yearly VIP"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm font-semibold focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    value={yearlyPrice}
                    onChange={(e) => setYearlyPrice(e.target.value)}
                    placeholder="$39.99"
                    className="w-24 bg-slate-900 border border-slate-700 rounded-lg px-2 py-2 text-white text-sm font-bold text-center focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    value={yearlySavings}
                    onChange={(e) => setYearlySavings(e.target.value)}
                    placeholder="Save 92%"
                    className="w-24 bg-slate-900 border border-slate-700 rounded-lg px-2 py-2 text-emerald-400 text-xs font-bold text-center focus:border-indigo-500"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Best value badge displayed on mobile paywall.
                </p>
              </div>
            </div>

            {/* Paywall Title & Subtitle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  Paywall Headline
                </label>
                <input
                  type="text"
                  value={paywallTitle}
                  onChange={(e) => setPaywallTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  Paywall Subtitle
                </label>
                <input
                  type="text"
                  value={paywallSubtitle}
                  onChange={(e) => setPaywallSubtitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:border-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={savingSubscription}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all"
            >
              <Save className="w-4 h-4" />
              {savingSubscription ? "Updating Mobile App..." : "Save Subscription Tiers & Paywall"}
            </button>
          </form>

          {/* Interactive Mobile Paywall Preview (5 Columns) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-950 to-slate-900 p-5 rounded-2xl border border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-indigo-400" />
                Live Mobile Paywall Preview
              </span>
              <span className="text-[10px] text-slate-500">Exact App Replica</span>
            </div>

            {/* Mock Screen */}
            <div className="bg-[#F8FAFC] rounded-2xl p-4 text-slate-900 border border-slate-200 shadow-inner">
              <div className="flex justify-between items-center mb-3">
                <div className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-600 text-xs font-bold">
                  ✕
                </div>
                <span className="text-xs font-semibold text-slate-600 px-2.5 py-1 rounded-full bg-white shadow-sm">
                  Restore
                </span>
              </div>

              {/* Tutor Avatar */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-indigo-100 border-2 border-indigo-400 flex items-center justify-center mb-2 shadow-md">
                  <span className="text-2xl">👩‍🏫</span>
                </div>
                <span className="text-[11px] font-bold text-indigo-600 tracking-wide uppercase">
                  SpeakFlow Pro
                </span>
                <h4 className="text-base font-black text-slate-900 mt-0.5 leading-tight">
                  {paywallTitle}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {paywallSubtitle}
                </p>
              </div>

              {/* Checklist */}
              <div className="my-3 space-y-1 bg-white/70 p-2.5 rounded-xl border border-slate-200">
                {[
                  "Unlimited Learning with AI",
                  "Instant Speaking Analysis",
                  "Your Unique Study Plan",
                  "Track Your Daily Progress",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700">
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px]">
                      ✓
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Tiers in Preview */}
              <div className="space-y-2">
                {/* Weekly with Trial */}
                <div
                  onClick={() => setPreviewTier("weekly")}
                  className={`relative p-2.5 rounded-xl border cursor-pointer transition-all ${
                    previewTier === "weekly"
                      ? "bg-indigo-50/80 border-indigo-500 shadow-sm"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <span className="absolute -top-2 right-3 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500 text-white shadow-sm flex items-center gap-1">
                    <Check className="w-2.5 h-2.5" /> No payment now
                  </span>
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] text-white ${
                      previewTier === "weekly" ? "bg-indigo-600" : "bg-slate-200"
                    }`}>
                      {previewTier === "weekly" ? "✓" : ""}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Weekly</div>
                      <div className="text-[10px] text-slate-500">
                        {trialDays}-day free trial, then {weeklyPrice}/week
                      </div>
                    </div>
                  </div>
                </div>

                {/* Monthly */}
                <div
                  onClick={() => setPreviewTier("monthly")}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                    previewTier === "monthly"
                      ? "bg-indigo-50/80 border-indigo-500 shadow-sm"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] text-white ${
                        previewTier === "monthly" ? "bg-indigo-600" : "bg-slate-200"
                      }`}>
                        {previewTier === "monthly" ? "✓" : ""}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Monthly</div>
                        <div className="text-[10px] text-slate-500">{monthlyPrice}/month</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-md">
                      Popular
                    </span>
                  </div>
                </div>

                {/* Yearly */}
                <div
                  onClick={() => setPreviewTier("yearly")}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                    previewTier === "yearly"
                      ? "bg-indigo-50/80 border-indigo-500 shadow-sm"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] text-white ${
                        previewTier === "yearly" ? "bg-indigo-600" : "bg-slate-200"
                      }`}>
                        {previewTier === "yearly" ? "✓" : ""}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Yearly</div>
                        <div className="text-[10px] text-slate-500">{yearlyPrice}/year</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-md">
                      {yearlySavings}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Button in Preview */}
              <div className="mt-3">
                <div className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs text-center shadow-md">
                  {previewTier === "weekly" ? "Start for Free" : "Continue"}
                </div>
                <p className="text-[9px] text-slate-400 text-center mt-1">
                  Auto-renewable, cancel anytime • Google Play Store
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: FREE TIME LIMITS CONFIGURATION */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
            <Clock className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Daily Free Practice Limits</h2>
            <p className="text-xs text-slate-400">
              Configure how many minutes free non-paying users can speak each day before being prompted to subscribe or top-up.
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveTimeLimits} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
              Daily Free Minutes Per User
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={120}
                value={dailyFreeMinutes}
                onChange={(e) => setDailyFreeMinutes(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-white text-base font-bold focus:border-blue-500"
              />
              <span className="text-xs font-bold text-slate-400">Mins/Day</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Resets every night at 12:00 AM local time.
            </p>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
              Max Minutes Per Single Call
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={60}
                value={maxCallDuration}
                onChange={(e) => setMaxCallDuration(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-white text-base font-bold focus:border-blue-500"
              />
              <span className="text-xs font-bold text-slate-400">Mins/Call</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Default maximum duration of one single phone call.
            </p>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                Save Daily Limits
              </label>
              <p className="text-xs text-slate-400">
                Immediately applies to all mobile app calls.
              </p>
            </div>
            <button
              type="submit"
              disabled={savingSettings}
              className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-colors"
            >
              <Save className="w-4 h-4" />
              {savingSettings ? "Saving..." : "Save Time Limits"}
            </button>
          </div>
        </form>
      </div>

      {/* SECTION 3: STORE PACKAGES & TOP-UPS */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-indigo-400" />
            Individual Store Packages & Top-Ups
          </h2>
          <span className="text-xs text-slate-400">
            {packages.filter((p) => p.isActive).length} active packages in Mobile Store
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 rounded-2xl bg-slate-800/40 border border-slate-800 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-2xl p-6 border flex flex-col justify-between transition-all ${
                  pkg.isActive
                    ? "bg-slate-900 border-indigo-500/30 shadow-xl shadow-indigo-950/20"
                    : "bg-slate-900/40 border-slate-800 opacity-60"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {pkg.badge || (pkg.isMonthly ? "Monthly" : "Top-Up")}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleTogglePkgActive(pkg)}
                        className={`text-xs px-2 py-1 rounded font-semibold ${
                          pkg.isActive ? "text-emerald-400 bg-emerald-500/10" : "text-slate-400 bg-slate-800"
                        }`}
                      >
                        {pkg.isActive ? "Active" : "Hidden"}
                      </button>
                      <button
                        onClick={() => handleOpenModal(pkg)}
                        className="p-1 text-slate-400 hover:text-white"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeletePackage(pkg.id)}
                        className="p-1 text-slate-400 hover:text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mt-3">{pkg.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{pkg.description}</p>

                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-white">{pkg.price}</span>
                    <span className="text-xs text-slate-400">
                      {pkg.minutes > 0 ? `${pkg.minutes} spoken mins` : "Unlimited speaking"}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-1.5 border-t border-slate-800 pt-3">
                    {pkg.features?.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
                  <span>Type: {pkg.isMonthly ? "Monthly Subscription" : "One-Time Booster"}</span>
                  <button
                    onClick={() => handleOpenModal(pkg)}
                    className="text-indigo-400 hover:text-indigo-300 font-semibold"
                  >
                    Edit Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL FOR ADDING / EDITING CUSTOM PACKAGES */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">
              {editingPkg ? "Edit Practice Package" : "Create New Package"}
            </h3>

            <form onSubmit={handleSavePackage} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  Package Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Monthly Fluency Pass (300 Mins)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description for mobile store..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    Spoken Minutes
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={minutes}
                    onChange={(e) => setMinutes(Number(e.target.value))}
                    placeholder="e.g. 180"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    Display Price
                  </label>
                  <input
                    type="text"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. $9.99/mo or $3.49"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">Pricing currency is USD ($).</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    Badge Pill
                  </label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="e.g. Popular, Best Value"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="isMonthlyCheck"
                    checked={isMonthly}
                    onChange={(e) => setIsMonthly(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 bg-slate-950 border-slate-800"
                  />
                  <label htmlFor="isMonthlyCheck" className="text-xs font-medium text-white cursor-pointer">
                    Monthly Recurring Subscription
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  Features List (One feature per line)
                </label>
                <textarea
                  rows={3}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  placeholder="One feature per line..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-indigo-500 font-mono text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="pkgActiveCheck"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-950 border-slate-800"
                />
                <label htmlFor="pkgActiveCheck" className="text-xs font-medium text-white cursor-pointer">
                  Show this package on student Mobile App Store
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingPkg}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-600/30"
                >
                  {savingPkg ? "Saving..." : editingPkg ? "Update Package" : "Create Package"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
