"use client";

import React, { useEffect } from "react";
import { Bot, ArrowRight } from "lucide-react";

export default function AppRedirectPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.href = "http://localhost:3001";
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#090D16] flex items-center justify-center p-6 text-white text-center">
      <div className="max-w-md p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto">
          <Bot className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold">Redirecting to Student Web App...</h2>
        <p className="text-xs text-slate-400">
          The Student Web App is running as a dedicated standalone website at port 3001.
        </p>
        <a
          href="http://localhost:3001"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors"
        >
          <span>Open Student Web App (port 3001)</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
