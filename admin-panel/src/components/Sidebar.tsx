"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  LayoutDashboard,
  MessageSquareText,
  KeyRound,
  Users,
  BarChart3,
  LogOut,
  ShieldCheck,
  Bot,
  Menu,
  X,
  Sparkles,
  PhoneCall,
  Smartphone,
  Trophy,
  Clock,
  Package,
  Bell,
  Globe
} from "lucide-react";

const NAV_ITEMS = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: "Landing Page & CMS",
    href: "/landing-cms",
    icon: Globe,
    badge: "Web CMS 🌐",
  },
  {
    name: "Push Notifications",
    href: "/notifications",
    icon: Bell,
    badge: "FCM 🔔",
  },
  {
    name: "Live Call Simulator",
    href: "/simulator",
    icon: PhoneCall,
    badge: "LIVE 🎙️",
  },
  {
    name: "Weekly Targets & Winners",
    href: "/targets",
    icon: Trophy,
    badge: "Goals 🏆",
  },
  {
    name: "Time Limits & Packages",
    href: "/packages",
    icon: Clock,
    badge: "Pricing ⏱️",
  },
  {
    name: "Topics & Scenarios",
    href: "/topics",
    icon: MessageSquareText,
    badge: "Interactive",
  },
  {
    name: "API Keys & AI Config",
    href: "/api-keys",
    icon: KeyRound,
    badge: "Gemini",
  },
  {
    name: "Users & Students",
    href: "/users",
    icon: Users,
    badge: null,
  },
  {
    name: "Call Sessions & Stats",
    href: "/sessions",
    icon: BarChart3,
    badge: null,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { userProfile, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Don't render sidebar on login page, student mobile app, or public legal pages
  if (
    pathname === "/login" ||
    pathname.startsWith("/app") ||
    pathname.startsWith("/privacy") ||
    pathname.startsWith("/terms")
  ) {
    return null;
  }

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-900/95 border-r border-slate-800 text-slate-200">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-white tracking-tight flex items-center gap-1.5">
              LangCoach <span className="text-xs bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-1.5 py-0.5 rounded font-mono">AI</span>
            </h1>
            <p className="text-xs text-slate-400">Admin Control Panel</p>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <p className="px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Management
        </p>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${isActive
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/25"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${isActive ? "bg-white/20 text-white" : "bg-slate-800 text-indigo-400 border border-indigo-500/20"
                  }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Profile & Logout */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-slate-800/40 border border-slate-800 mb-3">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs uppercase border border-indigo-500/30 flex-shrink-0">
              {userProfile?.displayName?.charAt(0) || userProfile?.email?.charAt(0) || "A"}
            </div>
            <div className="truncate text-left">
              <div className="text-xs font-medium text-white truncate flex items-center gap-1">
                {userProfile?.displayName || "Admin User"}
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              </div>
              <div className="text-[11px] text-slate-400 truncate">{userProfile?.email}</div>
            </div>
          </div>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded font-semibold uppercase">
            ADMIN
          </span>
        </div>

        <button
          onClick={signOut}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Trigger */}
      <div className="md:hidden fixed top-3 left-3 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2.5 bg-slate-800/90 border border-slate-700 text-slate-200 rounded-xl shadow-lg backdrop-blur"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-72 h-screen sticky top-0 flex-shrink-0 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="w-72 h-full z-50">{sidebarContent}</div>
          <div
            className="flex-1 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
        </div>
      )}
    </>
  );
}

