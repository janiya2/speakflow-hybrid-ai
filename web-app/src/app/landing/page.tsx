"use client";

import React, { useState } from "react";
import LandingPage from "@/components/LandingPage";
import { useRouter } from "next/navigation";

export default function StandaloneLandingPage() {
  const router = useRouter();
  const [themeMode, setThemeMode] = useState<"dark" | "light">("dark");

  return (
    <LandingPage
      themeMode={themeMode}
      onToggleTheme={(t) => setThemeMode(t)}
      onOpenDashboard={() => router.push("/?view=app")}
      onOpenAuth={(mode) => {
        if (mode === "signup") {
          router.push("/signup");
        } else {
          router.push("/login");
        }
      }}
      onStartCall={(topicId) => {
        if (topicId) {
          router.push(`/?view=app&call=${topicId}`);
        } else {
          router.push("/?view=app");
        }
      }}
    />
  );
}
