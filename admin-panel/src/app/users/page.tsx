"use client";

import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db, COLLECTIONS } from "@/lib/firebase";
import { useAuth, UserProfile } from "@/lib/auth-context";
import { Users, ShieldCheck, UserCheck, ShieldAlert, Search, RefreshCw } from "lucide-react";

export default function UsersPage() {
  const { userProfile: currentUserProfile } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [updatingUid, setUpdatingUid] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, COLLECTIONS.USERS));
      const loaded: UserProfile[] = snap.docs.map((d) => ({
        uid: d.id,
        ...d.data()
      })) as UserProfile[];
      setUsers(loaded);
    } catch (err) {
      console.error("Error loading users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleRole = async (targetUser: UserProfile) => {
    if (targetUser.uid === currentUserProfile?.uid) {
      alert("You cannot change your own admin role.");
      return;
    }

    const newRole = targetUser.role === "admin" ? "user" : "admin";
    const confirmed = confirm(
      `Are you sure you want to change ${targetUser.displayName || targetUser.email}'s role to "${newRole}"?`
    );
    if (!confirmed) return;

    setUpdatingUid(targetUser.uid);
    try {
      await updateDoc(doc(db, COLLECTIONS.USERS, targetUser.uid), {
        role: newRole
      });
      setUsers(users.map((u) => (u.uid === targetUser.uid ? { ...u, role: newRole } : u)));
    } catch (err) {
      console.error("Failed to update role:", err);
    } finally {
      setUpdatingUid(null);
    }
  };

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.email?.toLowerCase().includes(q) ||
      u.displayName?.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Users & Admin Permissions</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
              {users.length} Registered
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage student accounts and promote administrators for the AI Language Coach system.
          </p>
        </div>

        <button
          onClick={fetchUsers}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search by name, email, or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Users Table */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="w-8 h-8 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            No users found matching your search.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-5 py-3.5">User Profile</th>
                  <th className="px-5 py-3.5">Role</th>
                  <th className="px-5 py-3.5">Joined Date</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((u) => {
                  const isSelf = u.uid === currentUserProfile?.uid;
                  return (
                    <tr key={u.uid} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600/30 to-purple-600/30 border border-indigo-500/20 text-indigo-300 font-bold text-xs flex items-center justify-center uppercase">
                            {u.displayName?.charAt(0) || u.email?.charAt(0) || "U"}
                          </div>
                          <div>
                            <div className="font-semibold text-white flex items-center gap-1.5">
                              <span>{u.displayName || "User"}</span>
                              {isSelf && (
                                <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded border border-slate-700">
                                  You
                                </span>
                              )}
                            </div>
                            <div className="text-slate-400 text-[11px] font-mono">{u.email}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-semibold text-[10px] uppercase border ${
                          u.role === "admin"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : "bg-slate-800 text-slate-300 border-slate-700"
                        }`}>
                          {u.role === "admin" ? (
                            <>
                              <ShieldCheck className="w-3 h-3 text-emerald-400" />
                              <span>Admin</span>
                            </>
                          ) : (
                            <>
                              <UserCheck className="w-3 h-3 text-slate-400" />
                              <span>Student</span>
                            </>
                          )}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-slate-400 text-[11px]">
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "N/A"}
                      </td>

                      <td className="px-5 py-4 text-right">
                        {!isSelf && (
                          <button
                            onClick={() => handleToggleRole(u)}
                            disabled={updatingUid === u.uid}
                            className={`px-3 py-1.5 rounded-lg text-[11px] font-medium border transition-colors ${
                              u.role === "admin"
                                ? "border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
                                : "border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10"
                            }`}
                          >
                            {updatingUid === u.uid
                              ? "Updating..."
                              : u.role === "admin"
                              ? "Demote to Student"
                              : "Promote to Admin"}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

