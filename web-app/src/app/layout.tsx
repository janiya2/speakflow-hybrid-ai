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
    <html lang="en" className="theme-light" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                // Ensure default theme is permanent Light Mode (0ms dark flash)
                var v2 = localStorage.getItem('speakflow_theme_v2');
                if (!v2) {
                  localStorage.setItem('speakflow_theme_v2', 'light');
                  localStorage.setItem('speakflow_theme', 'light');
                }
                var t = localStorage.getItem('speakflow_theme');
                if (t === 'dark') {
                  document.documentElement.classList.remove('theme-light');
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('theme-light');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="antialiased bg-[#F8FAFC] text-slate-900 selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
