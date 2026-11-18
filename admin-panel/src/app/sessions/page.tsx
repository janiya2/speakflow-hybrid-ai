"use client";

import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, COLLECTIONS } from "@/lib/firebase";
import { PhoneCall, Clock, AlertTriangle, CheckCircle, Search, BarChart3, MessageSquare } from "lucide-react";

export interface SessionRecord {
  id: string;
  userId: string;
  userEmail?: string;
  topicTitle: string;
  language: string;
  durationSeconds: number;
  totalCorrections: number;
  createdAt: string;
}

export default function SessionsPage() {
  const [sessions, setSessions] = useState<SessionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const snap = await getDocs(collection(db, COLLECTIONS.SESSIONS));
        const loaded = snap.docs.map((d) => ({
          id: d.id,
          ...d.data()
        })) as SessionRecord[];
        setSessions(loaded);
      } catch (err) {
        console.error("Failed to load sessions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const filtered = sessions.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.topicTitle?.toLowerCase().includes(q) ||
      s.userEmail?.toLowerCase().includes(q) ||
      s.language?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <span>Student Call Practice Sessions</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            {sessions.length} Recorded
          </span>
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Review live voice call analytics, duration, and error correction rates from mobile app learners.
        </p>
      </div>

      <div className="relative max-w-sm">
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search by topic, language, or user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="w-8 h-8 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            <PhoneCall className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <p>No call sessions recorded yet.</p>
            <p className="text-slate-500 mt-0.5">When students initiate calls from the mobile app, session logs will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-5 py-3.5">Topic & Language</th>
                  <th className="px-5 py-3.5">Learner</th>
                  <th className="px-5 py-3.5">Call Duration</th>
                  <th className="px-5 py-3.5">Corrections Made</th>
                  <th className="px-5 py-3.5">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-semibold text-white">{s.topicTitle}</div>
                      <span className="text-[10px] text-indigo-400 font-medium">{s.language}</span>
                    </td>
                    <td className="px-5 py-4 font-mono text-slate-300">
                      {s.userEmail || s.userId || "Anonymous"}
                    </td>
                    <td className="px-5 py-4 text-slate-300 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{Math.round(s.durationSeconds / 60)} mins</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-semibold">
                        {s.totalCorrections || 0} Corrections
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-400 text-[11px]">
                      {s.createdAt ? new Date(s.createdAt).toLocaleDateString() : "Just now"}
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

