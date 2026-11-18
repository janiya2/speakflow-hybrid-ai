import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "AI Language Coach - Admin Panel",
  description: "Real-time AI Voice Coach Management Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 flex min-h-screen">
        <AuthProvider>
          <Sidebar />
          <main className="flex-1 min-w-0 overflow-y-auto">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}

