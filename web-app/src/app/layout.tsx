import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SpeakFlow AI • Real-Time Voice Language Coach",
  description: "Master English, Japanese, and Korean through real-time voice calls with AI. Interactive, voice-first speaking practice with live pronunciation drill.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#090D16] text-slate-100 selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}

