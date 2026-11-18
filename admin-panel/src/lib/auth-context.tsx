"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { COLLECTIONS } from "./constants";
import { useRouter, usePathname } from "next/navigation";

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: "admin" | "user";
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

// Authorized administrator email allowlist
export const ADMIN_ALLOWLIST: string[] = [
  "janithad2@gmail.com",
  "admin@speakflow.ai",
  ...(process.env.NEXT_PUBLIC_ADMIN_EMAILS
    ? process.env.NEXT_PUBLIC_ADMIN_EMAILS.split(",").map((e) => e.trim().toLowerCase())
    : []),
];

export function isEmailAuthorizedAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_ALLOWLIST.includes(email.toLowerCase().trim());
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  isAdmin: false,
  signOut: async () => {},
  refreshProfile: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const fetchProfile = async (firebaseUser: User) => {
    try {
      const userDocRef = doc(db, COLLECTIONS.USERS, firebaseUser.uid);
      const snapshot = await getDoc(userDocRef);

      if (snapshot.exists()) {
        const data = snapshot.data() as UserProfile;
        setUserProfile(data);
        return data;
      } else {
        // Enforce Server-Side Allowlist: Only pre-authorized administrator emails get 'admin' role
        const isAuthorized = isEmailAuthorizedAdmin(firebaseUser.email);
        const newProfile: UserProfile = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "User",
          role: isAuthorized ? "admin" : "user",
          createdAt: new Date().toISOString(),
        };
        await setDoc(userDocRef, newProfile);
        setUserProfile(newProfile);
        return newProfile;
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchProfile(currentUser);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user);
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
    setUserProfile(null);
    router.push("/login");
  };

  const isAdmin = userProfile?.role === "admin";

  // Route protection
  useEffect(() => {
    if (!loading) {
      const isAuthPage = pathname === "/login";
      const isStudentApp = pathname.startsWith("/app");
      const isPublicLegalPage = pathname.startsWith("/privacy") || pathname.startsWith("/terms");

      // Don't restrict the student mobile app interface or public legal pages
      if (isStudentApp || isPublicLegalPage) return;

      if (!user && !isAuthPage) {
        router.push("/login");
      } else if (user && userProfile && !isAdmin && !isAuthPage) {
        router.push("/login?error=unauthorized");
      }
    }
  }, [user, userProfile, loading, pathname, isAdmin, router]);

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, isAdmin, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
