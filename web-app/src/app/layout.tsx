import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SpeakFlow AI • Real-Time Voice Language Coach",
  description: "Master English, Spanish, Japanese, and Korean through real-time voice calls with AI. Interactive, voice-first speaking practice with live pronunciation drill.",
  icons: {
    icon: [
      { url: "/images/app_logo.png", sizes: "any" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/images/app_logo.png",
    shortcut: "/images/app_logo.png",
  },
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

