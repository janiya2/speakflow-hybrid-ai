"use client";

import React, { useState, useEffect } from "react";
import { db, COLLECTIONS } from "@/lib/firebase";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  serverTimestamp
} from "firebase/firestore";
import {
  Trophy,
  Target,
  Flame,
  Award,
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Edit2,
  Users,
  Medal,
  Crown
} from "lucide-react";

interface WeeklyTarget {
  id: string;
  title: string;
  description: string;
  dailyMinutesGoal: number;
  weeklyMinutesGoal: number;
  minDaysActive: number;
  rewardBadge: string;
  rewardPoints: number;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  createdAt?: any;
}

interface StudentRank {
  userId: string;
  userName: string;
  userEmail: string;
  totalMinutes: number;
  averageScore: number;
  callsCount: number;
  streak: number;
}

export default function TargetsPage() {
  const [targets, setTargets] = useState<WeeklyTarget[]>([]);
  const [leaderboard, setLeaderboard] = useState<StudentRank[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingTarget, setEditingTarget] = useState<WeeklyTarget | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form State
  const [title, setTitle] = useState("Weekly Fluency Sprint");
  const [description, setDescription] = useState("Practice speaking minimum 10 minutes every day to unlock the Gold Fluency Champion Trophy!");
  const [dailyMinutesGoal, setDailyMinutesGoal] = useState(10);
  const [weeklyMinutesGoal, setWeeklyMinutesGoal] = useState(60);
  const [minDaysActive, setMinDaysActive] = useState(5);
  const [rewardBadge, setRewardBadge] = useState("🏆 Gold Fluency Champion");
  const [rewardPoints, setRewardPoints] = useState(500);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    fetchTargetsAndLeaderboard();
  }, []);

  const fetchTargetsAndLeaderboard = async () => {
    setLoading(true);
    try {
      // 1. Fetch Targets
      const targetsSnap = await getDocs(collection(db, COLLECTIONS.TARGETS));
      const targetList: WeeklyTarget[] = [];
      targetsSnap.forEach((doc) => {
        targetList.push({ id: doc.id, ...(doc.data() as any) });
      });

      // Default target if none exist
      if (targetList.length === 0) {
        const defaultTarget: WeeklyTarget = {
          id: "weekly_active_sprint",
          title: "Weekly Fluency Sprint",
          description: "Practice speaking minimum 10 minutes every day to unlock the Gold Fluency Champion Trophy!",
          dailyMinutesGoal: 10,
          weeklyMinutesGoal: 60,
          minDaysActive: 5,
          rewardBadge: "🏆 Gold Fluency Champion",
          rewardPoints: 500,
          isActive: true,
        };
        await setDoc(doc(db, COLLECTIONS.TARGETS, defaultTarget.id), {
          ...defaultTarget,
          createdAt: serverTimestamp(),
        });
        targetList.push(defaultTarget);
      }
      setTargets(targetList);

      // 2. Fetch Sessions for Leaderboard calculation
      const sessionsSnap = await getDocs(
        query(collection(db, COLLECTIONS.SESSIONS), orderBy("timestamp", "desc"), limit(200))
      );

      const userStatsMap: Record<string, { name: string; email: string; totalSec: number; totalScore: number; count: number }> = {};

      sessionsSnap.forEach((d) => {
        const data = d.data();
        const uid = data.userId || "anonymous";
        const durationSec = Number(data.durationSeconds) || 0;
        const score = Number(data.score?.totalScore) || Number(data.compositeScore) || 75;

        if (!userStatsMap[uid]) {
          userStatsMap[uid] = {
            name: data.userName || "Student",
            email: data.userEmail || "",
            totalSec: 0,
            totalScore: 0,
            count: 0,
          };
        }
        userStatsMap[uid].totalSec += durationSec;
        userStatsMap[uid].totalScore += score;
        userStatsMap[uid].count += 1;
      });

      // 3. Fetch user accounts to augment names/streaks
      const usersSnap = await getDocs(collection(db, COLLECTIONS.USERS));
      const userDocMap: Record<string, any> = {};
      usersSnap.forEach((d) => {
        userDocMap[d.id] = d.data();
      });

      const ranks: StudentRank[] = Object.keys(userStatsMap).map((uid) => {
        const stat = userStatsMap[uid];
        const userDoc = userDocMap[uid] || {};
        return {
          userId: uid,
          userName: userDoc.displayName || stat.name || "Student Speaker",
          userEmail: userDoc.email || stat.email || "student@speakflow.ai",
          totalMinutes: Math.round(stat.totalSec / 60),
          averageScore: Math.round(stat.totalScore / (stat.count || 1)),
          callsCount: stat.count,
          streak: Number(userDoc.streak) || 1,
        };
      });

      // Sort by total minutes & average score
      ranks.sort((a, b) => b.totalMinutes - a.totalMinutes || b.averageScore - a.averageScore);
      setLeaderboard(ranks);
    } catch (err: any) {
      console.error("Error fetching targets:", err);
      setStatusMessage({ type: "error", text: "Failed to load targets and leaderboard: " + err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (target?: WeeklyTarget) => {
    if (target) {
      setEditingTarget(target);
      setTitle(target.title);
      setDescription(target.description);
      setDailyMinutesGoal(target.dailyMinutesGoal);
      setWeeklyMinutesGoal(target.weeklyMinutesGoal);
      setMinDaysActive(target.minDaysActive);
      setRewardBadge(target.rewardBadge);
      setRewardPoints(target.rewardPoints);
      setIsActive(target.isActive);
    } else {
      setEditingTarget(null);
      setTitle("Weekly Fluency Sprint");
      setDescription("Practice speaking minimum 10 minutes every day to unlock the Gold Fluency Champion Trophy!");
      setDailyMinutesGoal(10);
      setWeeklyMinutesGoal(60);
      setMinDaysActive(5);
      setRewardBadge("🏆 Gold Fluency Champion");
      setRewardPoints(500);
      setIsActive(true);
    }
    setShowModal(true);
  };

  const handleSaveTarget = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    try {
      const targetData = {
        title,
        description,
        dailyMinutesGoal: Number(dailyMinutesGoal),
        weeklyMinutesGoal: Number(weeklyMinutesGoal),
        minDaysActive: Number(minDaysActive),
        rewardBadge,
        rewardPoints: Number(rewardPoints),
        isActive,
        updatedAt: serverTimestamp(),
      };

      if (editingTarget) {
        await updateDoc(doc(db, COLLECTIONS.TARGETS, editingTarget.id), targetData);
        setStatusMessage({ type: "success", text: "Weekly Target updated successfully!" });
      } else {
        const newId = "target_" + Date.now();
        await setDoc(doc(db, COLLECTIONS.TARGETS, newId), {
          ...targetData,
          createdAt: serverTimestamp(),
        });
        setStatusMessage({ type: "success", text: "New Weekly Target created successfully!" });
      }

      setShowModal(false);
      fetchTargetsAndLeaderboard();
    } catch (err: any) {
      setStatusMessage({ type: "error", text: "Failed to save target: " + err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (target: WeeklyTarget) => {
    try {
      await updateDoc(doc(db, COLLECTIONS.TARGETS, target.id), {
        isActive: !target.isActive,
      });
      fetchTargetsAndLeaderboard();
    } catch (err: any) {
      alert("Error updating status: " + err.message);
    }
  };

  const handleDeleteTarget = async (id: string) => {
    if (!confirm("Are you sure you want to delete this target?")) return;
    try {
      await deleteDoc(doc(db, COLLECTIONS.TARGETS, id));
      setStatusMessage({ type: "success", text: "Target deleted." });
      fetchTargetsAndLeaderboard();
    } catch (err: any) {
      alert("Error deleting target: " + err.message);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/30 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Trophy className="w-3.5 h-3.5" />
              Student Engagement & Gamification
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Weekly Targets & Winners Leaderboard
            </h1>
            <p className="text-slate-400 mt-2 max-w-2xl text-sm leading-relaxed">
              Configure daily speaking thresholds, weekly speaking minute goals, and track high-performing student winners. Enabled targets appear live on the student mobile app!
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            Create Weekly Target
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

      {/* Target Cards Grid */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-400" />
          Active Weekly Goals for Mobile App
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="h-48 rounded-2xl bg-slate-800/40 border border-slate-800 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {targets.map((target) => (
              <div
                key={target.id}
                className={`rounded-2xl p-6 border transition-all duration-200 relative overflow-hidden ${
                  target.isActive
                    ? "bg-slate-900/90 border-indigo-500/40 shadow-xl shadow-indigo-950/30"
                    : "bg-slate-900/50 border-slate-800 opacity-60"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                      <Flame className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white">{target.title}</h3>
                      <span
                        className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full mt-1 ${
                          target.isActive
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-slate-800 text-slate-400 border border-slate-700"
                        }`}
                      >
                        {target.isActive ? "● Live on Mobile App" : "○ Disabled"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleToggleActive(target)}
                      title={target.isActive ? "Disable" : "Enable"}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        target.isActive
                          ? "bg-amber-500/20 text-amber-300 hover:bg-amber-500/30"
                          : "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                      }`}
                    >
                      {target.isActive ? "Pause" : "Activate"}
                    </button>
                    <button
                      onClick={() => handleOpenModal(target)}
                      className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteTarget(target.id)}
                      className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-slate-400 text-sm mt-4 leading-relaxed">{target.description}</p>

                {/* Metrics Badges */}
                <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-slate-800/80">
                  <div className="bg-slate-800/50 rounded-xl p-3 text-center border border-slate-800">
                    <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" />
                      Daily Min
                    </div>
                    <div className="text-lg font-bold text-white">{target.dailyMinutesGoal} mins</div>
                  </div>

                  <div className="bg-slate-800/50 rounded-xl p-3 text-center border border-slate-800">
                    <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
                      <Calendar className="w-3.5 h-3.5 text-purple-400" />
                      Weekly Goal
                    </div>
                    <div className="text-lg font-bold text-white">{target.weeklyMinutesGoal} mins</div>
                  </div>

                  <div className="bg-slate-800/50 rounded-xl p-3 text-center border border-slate-800">
                    <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      Active Days
                    </div>
                    <div className="text-lg font-bold text-white">{target.minDaysActive} days/wk</div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-400 bg-indigo-950/30 p-2.5 rounded-xl border border-indigo-500/20">
                  <span className="flex items-center gap-1.5 text-indigo-300 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Reward Badge: {target.rewardBadge}
                  </span>
                  <span className="text-amber-400 font-bold">+{target.rewardPoints} XP</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TOP WINNERS LEADERBOARD SECTION */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-6 border-b border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Crown className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-bold text-white">This Week's Student Winners & Rankings</h2>
            </div>
            <p className="text-slate-400 text-xs mt-1">
              Ranked automatically by total spoken minutes and pronunciation fluency scores from live practice calls.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              {leaderboard.length} Active Speakers
            </span>
          </div>
        </div>

        {/* Podium Top 3 */}
        {leaderboard.length >= 3 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-slate-950/40 border-b border-slate-800/60">
            {/* Rank 2 Silver */}
            <div className="order-2 md:order-1 rounded-xl p-5 bg-gradient-to-b from-slate-800/60 to-slate-900 border border-slate-700/60 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-slate-400/20 border-2 border-slate-300 flex items-center justify-center text-xl font-bold text-slate-200 mb-2">
                🥈
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">2nd Place</span>
              <h4 className="font-bold text-white text-base mt-1">{leaderboard[1].userName}</h4>
              <p className="text-xs text-slate-400">{leaderboard[1].userEmail}</p>
              <div className="mt-3 flex items-center gap-3 text-xs">
                <span className="text-indigo-400 font-bold">{leaderboard[1].totalMinutes} mins spoken</span>
                <span className="text-emerald-400 font-bold">{leaderboard[1].averageScore}% avg score</span>
              </div>
            </div>

            {/* Rank 1 Gold */}
            <div className="order-1 md:order-2 rounded-xl p-6 bg-gradient-to-b from-amber-500/20 via-slate-900 to-indigo-950/40 border-2 border-amber-500/50 flex flex-col items-center text-center shadow-xl shadow-amber-500/10">
              <div className="w-14 h-14 rounded-full bg-amber-500/30 border-2 border-amber-400 flex items-center justify-center text-2xl font-bold text-amber-300 mb-2 shadow-lg shadow-amber-500/30 animate-pulse">
                👑
              </div>
              <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest">Weekly Champion</span>
              <h4 className="font-extrabold text-white text-lg mt-1">{leaderboard[0].userName}</h4>
              <p className="text-xs text-slate-400">{leaderboard[0].userEmail}</p>
              <div className="mt-4 flex items-center gap-4 text-xs bg-slate-800/80 px-4 py-2 rounded-lg border border-amber-500/30">
                <span className="text-amber-400 font-extrabold">{leaderboard[0].totalMinutes} mins spoken</span>
                <span className="text-emerald-400 font-extrabold">{leaderboard[0].averageScore}% avg score</span>
              </div>
            </div>

            {/* Rank 3 Bronze */}
            <div className="order-3 md:order-3 rounded-xl p-5 bg-gradient-to-b from-orange-950/20 to-slate-900 border border-orange-700/40 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-orange-700/20 border-2 border-orange-400 flex items-center justify-center text-xl font-bold text-orange-300 mb-2">
                🥉
              </div>
              <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">3rd Place</span>
              <h4 className="font-bold text-white text-base mt-1">{leaderboard[2].userName}</h4>
              <p className="text-xs text-slate-400">{leaderboard[2].userEmail}</p>
              <div className="mt-3 flex items-center gap-3 text-xs">
                <span className="text-indigo-400 font-bold">{leaderboard[2].totalMinutes} mins spoken</span>
                <span className="text-emerald-400 font-bold">{leaderboard[2].averageScore}% avg score</span>
              </div>
            </div>
          </div>
        )}

        {/* Full Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/60 text-xs text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Rank</th>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Total Time</th>
                <th className="px-6 py-4">Avg Score</th>
                <th className="px-6 py-4">Call Sessions</th>
                <th className="px-6 py-4">Streak</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {leaderboard.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    No student call sessions recorded yet this week.
                  </td>
                </tr>
              ) : (
                leaderboard.map((student, idx) => (
                  <tr key={student.userId} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      {idx === 0 ? (
                        <span className="text-amber-400 font-bold">🥇 1st</span>
                      ) : idx === 1 ? (
                        <span className="text-slate-300 font-bold">🥈 2nd</span>
                      ) : idx === 2 ? (
                        <span className="text-orange-400 font-bold">🥉 3rd</span>
                      ) : (
                        <span className="text-slate-500">#{idx + 1}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-white">{student.userName}</div>
                      <div className="text-xs text-slate-400">{student.userEmail}</div>
                    </td>
                    <td className="px-6 py-4 text-indigo-400 font-bold">{student.totalMinutes} mins</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {student.averageScore}%
                      </span>
                    </td>
                    <td className="px-6 py-4">{student.callsCount} calls</td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1 text-orange-400 font-bold">
                        🔥 {student.streak} days
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <h3 className="text-xl font-bold text-white mb-4">
              {editingTarget ? "Edit Weekly Target" : "Create New Weekly Target"}
            </h3>

            <form onSubmit={handleSaveTarget} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                  Target Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Weekly Fluency Sprint"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                  Target Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain what the student must do to achieve this target..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                    Daily Min (Minutes)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={120}
                    value={dailyMinutesGoal}
                    onChange={(e) => setDailyMinutesGoal(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                    Weekly Total (Minutes)
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={1000}
                    value={weeklyMinutesGoal}
                    onChange={(e) => setWeeklyMinutesGoal(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                    Min Active Days/Wk
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={7}
                    value={minDaysActive}
                    onChange={(e) => setMinDaysActive(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                    Reward XP Points
                  </label>
                  <input
                    type="number"
                    value={rewardPoints}
                    onChange={(e) => setRewardPoints(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                  Reward Trophy / Badge
                </label>
                <input
                  type="text"
                  value={rewardBadge}
                  onChange={(e) => setRewardBadge(e.target.value)}
                  placeholder="e.g. 🏆 Gold Fluency Champion"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="targetActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-950 border-slate-800"
                />
                <label htmlFor="targetActive" className="text-sm font-medium text-white cursor-pointer">
                  Activate this target on student Mobile App immediately
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
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30"
                >
                  {saving ? "Saving..." : editingTarget ? "Update Target" : "Create Target"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

