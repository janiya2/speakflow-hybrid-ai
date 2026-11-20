"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  User
} from "firebase/auth";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  addDoc,
  query,
  where,
  orderBy
} from "firebase/firestore";
import { auth, db, COLLECTIONS } from "@/lib/firebase";
import {
  executeHybridInference,
  checkOnDeviceNanoAvailability
} from "@/lib/hybrid-ai";

type HybridEngineType = "ON_DEVICE_NANO" | "CLOUD_GEMINI_FLASH";
type HybridModeSetting = "auto" | "nano_only" | "cloud_only";

import {
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  Bot,
  ArrowRight,
  Search,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Languages,
  Award,
  Flame,
  Repeat,
  RotateCcw,
  Zap,
  Clock,
  History,
  User as UserIcon,
  LogOut,
  BarChart3,
  TrendingUp,
  ShieldAlert,
  ChevronRight,
  Smile,
  Check,
  Calendar,
  Compass,
  Crown,
  Star,
  Globe,
  Gem,
  BookOpen,
  GraduationCap,
  MessageCircle,
  Play,
  Bell,
  ChevronDown,
  Smartphone,
  Download,
  LayoutDashboard,
  Menu,
  X,
  ExternalLink,
  Target,
  Trophy,
  Sparkle,
  Shield,
  Headphones,
  Pause
} from "lucide-react";

interface TopicModel {
  id: string;
  title: string;
  language: string;
  level: string;
  category?: string;
  icon: string;
  scenario: string;
  starterPrompt: string;
  starterQuestions?: string[];
}

interface CoachModel {
  id: string;
  name: string;
  gender: "female" | "male";
  tagline: string;
  accent: string;
  avatar: string;
  voice: string;
}

const COACHES: CoachModel[] = [
  {
    id: "sophia",
    name: "Sophia Miller",
    gender: "female",
    tagline: "Executive Speech & Silicon Valley Pitch Coach",
    accent: "American English 🇺🇸 / Executive Tone",
    avatar: "/images/coaches/sophia.jpg",
    voice: "en-US-JennyNeural"
  },
  {
    id: "sarah",
    name: "Sarah Jenkins",
    gender: "female",
    tagline: "Warm & Patient • Master English Tutor",
    accent: "American English 🇺🇸 / Warm Tone",
    avatar: "/images/coaches/sarah.jpg",
    voice: "en-US-JennyNeural"
  },
  {
    id: "emma",
    name: "Emma Watson",
    gender: "female",
    tagline: "Executive & Cambridge Business English",
    accent: "British 🇬🇧 / Confident RP Tone",
    avatar: "/images/coaches/emma.jpg",
    voice: "en-GB-SoniaNeural"
  },
  {
    id: "chloe",
    name: "Camille Laurent",
    gender: "female",
    tagline: "French & European Accent & Conversational Master",
    accent: "French 🇫🇷 / Elegant Tone",
    avatar: "/images/coaches/chloe.jpg",
    voice: "fr-FR-DeniseNeural"
  },
  {
    id: "alex",
    name: "Alex Rivera",
    gender: "male",
    tagline: "Energetic & Friendly • Daily Fluency & Idioms",
    accent: "American English 🇺🇸 / Energetic Tone",
    avatar: "/images/coaches/alex.jpg",
    voice: "en-US-GuyNeural"
  },
  {
    id: "oliver",
    name: "Oliver Wright",
    gender: "male",
    tagline: "Cambridge Scholarly • Executive Debate & Prep",
    accent: "British Oxford RP 🇬🇧 / Scholarly",
    avatar: "/images/coaches/oliver.jpg",
    voice: "en-GB-RyanNeural"
  },
  {
    id: "kenji",
    name: "Kenji Sato",
    gender: "male",
    tagline: "Analytical & Calm • Global Tech & Bilingual JP/EN",
    accent: "Bilingual Japanese 🇯🇵 / Tech English",
    avatar: "/images/coaches/kenji.jpg",
    voice: "en-US-ChristopherNeural"
  },
  {
    id: "aoi",
    name: "Aoi Tanaka",
    gender: "female",
    tagline: "Gentle & Clear • Multilingual Specialist",
    accent: "Multilingual 🇯🇵 / Gentle & Clear Tone",
    avatar: "/images/coaches/aoi.jpg",
    voice: "ja-JP-NanamiNeural"
  }
];

interface CallSessionRecord {
  id?: string;
  userId: string;
  userEmail: string;
  userName: string;
  topicTitle: string;
  language: string;
  durationSeconds: number;
  score: number;
  grade: string;
  fluencyScore: number;
  accuracyScore: number;
  totalCorrections: number;
  correctionsList: Array<{
    original: string;
    correction: string;
    explanation: string;
  }>;
  coachFeedback: string;
  createdAt: string;
}

interface LandingPageConfig {
  heroBadge: string;
  heroHeadline: string;
  heroSubtitle: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  robotImageUrl: string;
  heroBannerUrl: string;
  flameImageUrl: string;
  bigBenImageUrl: string;
  dashboardMockupUrl: string;
  apkDownloadUrl: string;
  playStoreUrl: string;
  webAppUrl: string;
  demoVideoUrl: string;
  statMinutes: string;
  statStudents: string;
  statFluency: string;
  statLanguages: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  feature4Title: string;
  feature4Desc: string;
  announcementText: string;
  announcementActive: boolean;
}

const DEFAULT_LANDING_CONFIG: LandingPageConfig = {
  heroBadge: "Next-Gen AI Voice Coach • #BuildHybridAI 2026",
  heroHeadline: "Speak Any Language Like a Native Partner.",
  heroSubtitle:
    "Zero typing, zero flashcards. Practice real-time spoken phone conversations with AI in English, Spanish, Korean, Japanese, and more. Perfect your pronunciation through intelligent on-device repetition loops!",
  primaryCtaText: "Start Free Practice →",
  secondaryCtaText: "Download Android APK",
  robotImageUrl: "/images/dashboard-robot.png",
  heroBannerUrl: "/images/dashboard-hero-banner.jpg",
  flameImageUrl: "/images/flame-streak.png",
  bigBenImageUrl: "/images/lesson-london-travel.jpg",
  dashboardMockupUrl: "/images/dashboard-full-mockup.jpg",
  apkDownloadUrl: "https://github.com/janithad2/speakflow-ai/releases/download/v1.0.0/speakflow-ai.apk",
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.innoxpert.speakflow",
  webAppUrl: "http://localhost:3001",
  demoVideoUrl: "https://youtube.com/watch?v=speakflow-demo",
  statMinutes: "125,000+",
  statStudents: "10,000+",
  statFluency: "98.4%",
  statLanguages: "6 Languages",
  feature1Title: "Hybrid On-Device AI Engine",
  feature1Desc: "Zero-latency voice feedback powered by Gemini Nano on-device with smart cloud fallback.",
  feature2Title: "100+ Real Voice Scenarios",
  feature2Desc: "Immersive simulated phone calls across Food, Travel, Business, Airport, and Sports.",
  feature3Title: "Live Subtitles & Instant Scoring",
  feature3Desc: "0-100 fluency metrics, phonetic precision grading, and active pronunciation drill loops.",
  feature4Title: "Seamless Cross-Platform Sync",
  feature4Desc: "Unified learning progress across Flutter Mobile (Android/iOS) and Next.js Web Dashboard.",
  announcementText: "🎉 Google Firebase #BuildHybridAI 2026 Hackathon Finalist Edition Live!",
  announcementActive: true,
};

interface AchievementBadge {
  id: string;
  title: string;
  category: "Onboarding" | "Speaking Time" | "Streaks" | "Targets & Podium" | "Accuracy & Mastery";
  description: string;
  iconType: "sparkles" | "crown" | "mic" | "zap" | "flame" | "clock" | "target" | "trophy" | "award" | "gem" | "globe" | "star" | "shield";
  gradient: string;
  accentBorder: string;
  glow: string;
  xpReward: number;
  requirement: string;
  progressCurrent: number;
  progressTarget: number;
  progressUnit: string;
  isUnlocked: boolean;
  isClaimed: boolean;
}

const DEFAULT_ACHIEVEMENTS: AchievementBadge[] = [
  {
    id: "welcome_explorer",
    title: "Welcome Explorer",
    category: "Onboarding",
    description: "Joined SpeakFlow AI to revolutionize your language fluency!",
    iconType: "sparkles",
    gradient: "from-cyan-500 to-blue-600",
    accentBorder: "border-cyan-500/40",
    glow: "shadow-cyan-500/30",
    xpReward: 100,
    requirement: "Sign up and create your account",
    progressCurrent: 1,
    progressTarget: 1,
    progressUnit: "signup",
    isUnlocked: true,
    isClaimed: false
  },
  {
    id: "pro_champion",
    title: "VIP Crown Elite",
    category: "Onboarding",
    description: "Unlocked SpeakFlow Pro for unlimited AI voice calls and offline Nano inference.",
    iconType: "crown",
    gradient: "from-amber-400 via-orange-500 to-pink-500",
    accentBorder: "border-amber-500/40",
    glow: "shadow-amber-500/30",
    xpReward: 500,
    requirement: "Acquire SpeakFlow VIP / Pro status",
    progressCurrent: 1,
    progressTarget: 1,
    progressUnit: "pro",
    isUnlocked: true,
    isClaimed: false
  },
  {
    id: "first_words",
    title: "Hello World Call",
    category: "Speaking Time",
    description: "Completed your first live interactive phone call with an AI voice coach.",
    iconType: "mic",
    gradient: "from-purple-500 to-indigo-600",
    accentBorder: "border-purple-500/40",
    glow: "shadow-purple-500/30",
    xpReward: 150,
    requirement: "Complete 1 speaking call",
    progressCurrent: 1,
    progressTarget: 1,
    progressUnit: "call",
    isUnlocked: true,
    isClaimed: true
  },
  {
    id: "nano_pioneer",
    title: "Gemini Nano Pioneer",
    category: "Accuracy & Mastery",
    description: "Practiced with on-device Gemini Nano hybrid AI with zero cloud latency.",
    iconType: "zap",
    gradient: "from-emerald-400 to-teal-500",
    accentBorder: "border-emerald-500/40",
    glow: "shadow-emerald-500/30",
    xpReward: 250,
    requirement: "Complete an on-device AI session",
    progressCurrent: 1,
    progressTarget: 1,
    progressUnit: "session",
    isUnlocked: true,
    isClaimed: true
  },
  {
    id: "streak_spark",
    title: "Streak Spark",
    category: "Streaks",
    description: "Ignited a consistent daily habit with 3 consecutive days of practice.",
    iconType: "flame",
    gradient: "from-orange-500 to-amber-500",
    accentBorder: "border-orange-500/40",
    glow: "shadow-orange-500/30",
    xpReward: 150,
    requirement: "Maintain a 3-day speaking streak",
    progressCurrent: 12,
    progressTarget: 3,
    progressUnit: "days",
    isUnlocked: true,
    isClaimed: true
  },
  {
    id: "streak_blaze",
    title: "Streak Blaze",
    category: "Streaks",
    description: "Kept the fire burning strong for an entire 7-day week!",
    iconType: "flame",
    gradient: "from-red-500 to-amber-500",
    accentBorder: "border-red-500/40",
    glow: "shadow-red-500/30",
    xpReward: 300,
    requirement: "Reach a 7-day speaking streak",
    progressCurrent: 12,
    progressTarget: 7,
    progressUnit: "days",
    isUnlocked: true,
    isClaimed: true
  },
  {
    id: "streak_inferno",
    title: "Streak Inferno",
    category: "Streaks",
    description: "Two entire weeks of non-stop spoken English fluency momentum.",
    iconType: "flame",
    gradient: "from-rose-500 to-purple-600",
    accentBorder: "border-rose-500/40",
    glow: "shadow-rose-500/30",
    xpReward: 600,
    requirement: "Reach a 14-day speaking streak",
    progressCurrent: 12,
    progressTarget: 14,
    progressUnit: "days",
    isUnlocked: false,
    isClaimed: false
  },
  {
    id: "streak_titan",
    title: "Streak Titan",
    category: "Streaks",
    description: "A legendary 30-day streak! Speaking English is now second nature.",
    iconType: "award",
    gradient: "from-fuchsia-600 to-indigo-600",
    accentBorder: "border-fuchsia-500/40",
    glow: "shadow-fuchsia-500/30",
    xpReward: 1200,
    requirement: "Reach a 30-day speaking streak",
    progressCurrent: 12,
    progressTarget: 30,
    progressUnit: "days",
    isUnlocked: false,
    isClaimed: false
  },
  {
    id: "time_conversationalist",
    title: "15-Min Conversationalist",
    category: "Speaking Time",
    description: "Crossed 15 minutes of live spoken dialogue practice.",
    iconType: "clock",
    gradient: "from-blue-500 to-cyan-500",
    accentBorder: "border-blue-500/40",
    glow: "shadow-blue-500/30",
    xpReward: 150,
    requirement: "Accumulate 15 minutes of speaking",
    progressCurrent: 150,
    progressTarget: 15,
    progressUnit: "mins",
    isUnlocked: true,
    isClaimed: true
  },
  {
    id: "time_fluent_hour",
    title: "1-Hour Fluency Master",
    category: "Speaking Time",
    description: "Invested 60 full minutes training your tongue and ears with AI.",
    iconType: "clock",
    gradient: "from-indigo-500 to-purple-500",
    accentBorder: "border-indigo-500/40",
    glow: "shadow-indigo-500/30",
    xpReward: 350,
    requirement: "Accumulate 60 minutes of speaking",
    progressCurrent: 150,
    progressTarget: 60,
    progressUnit: "mins",
    isUnlocked: true,
    isClaimed: true
  },
  {
    id: "time_prodigy",
    title: "2.5-Hour Prodigy",
    category: "Speaking Time",
    description: "Logged 150 minutes of deep conversational practice with AI coaches!",
    iconType: "target",
    gradient: "from-purple-600 to-pink-500",
    accentBorder: "border-purple-500/40",
    glow: "shadow-purple-500/30",
    xpReward: 500,
    requirement: "Accumulate 150 minutes of speaking",
    progressCurrent: 150,
    progressTarget: 150,
    progressUnit: "mins",
    isUnlocked: true,
    isClaimed: false
  },
  {
    id: "time_marathon",
    title: "5-Hour Marathoner",
    category: "Speaking Time",
    description: "Achieve 300 minutes of active voice calls across any language.",
    iconType: "award",
    gradient: "from-amber-500 to-yellow-500",
    accentBorder: "border-amber-500/40",
    glow: "shadow-amber-500/30",
    xpReward: 1000,
    requirement: "Accumulate 300 minutes of speaking",
    progressCurrent: 150,
    progressTarget: 300,
    progressUnit: "mins",
    isUnlocked: false,
    isClaimed: false
  },
  {
    id: "sprint_champion",
    title: "Sprint Champion",
    category: "Targets & Podium",
    description: "Smashed the 60-minute Weekly Fluency Sprint target (115/60 mins clocked)!",
    iconType: "trophy",
    gradient: "from-emerald-500 to-green-600",
    accentBorder: "border-emerald-500/40",
    glow: "shadow-emerald-500/30",
    xpReward: 500,
    requirement: "Hit 60+ spoken minutes in one week",
    progressCurrent: 115,
    progressTarget: 60,
    progressUnit: "mins",
    isUnlocked: true,
    isClaimed: false
  },
  {
    id: "podium_king",
    title: "Podium Conqueror",
    category: "Targets & Podium",
    description: "Secured #1 First Place on the Weekly Global Championship Podium!",
    iconType: "crown",
    gradient: "from-amber-400 via-yellow-500 to-orange-500",
    accentBorder: "border-amber-400/50",
    glow: "shadow-amber-400/30",
    xpReward: 750,
    requirement: "Rank #1 on weekly championship leaderboard",
    progressCurrent: 1,
    progressTarget: 1,
    progressUnit: "rank",
    isUnlocked: true,
    isClaimed: false
  },
  {
    id: "target_crusher",
    title: "7-Day Target Crusher",
    category: "Targets & Podium",
    description: "Complete daily practice targets every single day from Mon through Sun.",
    iconType: "target",
    gradient: "from-rose-500 to-pink-600",
    accentBorder: "border-rose-500/40",
    glow: "shadow-rose-500/30",
    xpReward: 400,
    requirement: "Complete all 7 daily targets in a week",
    progressCurrent: 5,
    progressTarget: 7,
    progressUnit: "days",
    isUnlocked: false,
    isClaimed: false
  },
  {
    id: "weekend_warrior",
    title: "Weekend Warrior",
    category: "Streaks",
    description: "Kept practicing through the weekend when everyone else took a break.",
    iconType: "shield",
    gradient: "from-teal-500 to-cyan-600",
    accentBorder: "border-teal-500/40",
    glow: "shadow-teal-500/30",
    xpReward: 250,
    requirement: "Complete speaking sessions on both Saturday and Sunday",
    progressCurrent: 1,
    progressTarget: 2,
    progressUnit: "days",
    isUnlocked: false,
    isClaimed: false
  },
  {
    id: "phonetic_perfection",
    title: "Phonetic Perfectionist",
    category: "Accuracy & Mastery",
    description: "Achieved an astounding 95%+ pronunciation accuracy in a lesson.",
    iconType: "gem",
    gradient: "from-cyan-400 to-sky-500",
    accentBorder: "border-cyan-400/40",
    glow: "shadow-cyan-400/30",
    xpReward: 300,
    requirement: "Score 95%+ pronunciation accuracy in a session",
    progressCurrent: 96,
    progressTarget: 95,
    progressUnit: "%",
    isUnlocked: true,
    isClaimed: true
  },
  {
    id: "drill_champion",
    title: "Drill Loop Ace",
    category: "Accuracy & Mastery",
    description: "Mastered 10 repeat-until-accurate on-device pronunciation drills.",
    iconType: "sparkles",
    gradient: "from-fuchsia-500 to-pink-500",
    accentBorder: "border-fuchsia-500/40",
    glow: "shadow-fuchsia-500/30",
    xpReward: 300,
    requirement: "Pass 10 pronunciation drill challenges",
    progressCurrent: 8,
    progressTarget: 10,
    progressUnit: "drills",
    isUnlocked: false,
    isClaimed: false
  },
  {
    id: "world_polyglot",
    title: "World Polyglot",
    category: "Accuracy & Mastery",
    description: "Practiced conversations across 3 or more distinct languages.",
    iconType: "globe",
    gradient: "from-blue-600 to-indigo-600",
    accentBorder: "border-blue-500/40",
    glow: "shadow-blue-500/30",
    xpReward: 450,
    requirement: "Practice in 3 foreign languages",
    progressCurrent: 2,
    progressTarget: 3,
    progressUnit: "languages",
    isUnlocked: false,
    isClaimed: false
  },
  {
    id: "fluency_diamond",
    title: "Diamond Master C2",
    category: "Accuracy & Mastery",
    description: "Achieved the pinnacle 98%+ overall fluency score with native conversational flow.",
    iconType: "star",
    gradient: "from-purple-600 via-fuchsia-500 to-pink-500",
    accentBorder: "border-purple-400/50",
    glow: "shadow-purple-500/40",
    xpReward: 1500,
    requirement: "Reach a 98%+ cumulative fluency grade",
    progressCurrent: 95,
    progressTarget: 98,
    progressUnit: "%",
    isUnlocked: false,
    isClaimed: false
  }
];

const FALLBACK_TOPICS: TopicModel[] = [
  {
    id: "tr_london",
    title: "Daily Conversation (Travel & Tourism)",
    language: "English",
    level: "Intermediate",
    category: "Travel",
    icon: "✈️",
    scenario: "You are speaking with a local guide in London exploring historic landmarks, Big Ben, and the Thames river.",
    starterPrompt: "Welcome to London! It's a gorgeous evening by the Thames. What would you love to explore first?",
    starterQuestions: ["Have you visited Big Ben or Westminster Abbey yet?", "What's your favorite mode of transport here?"]
  },
  {
    id: "sp_1",
    title: "Talking About Cricket & T20 World Cup",
    language: "English",
    level: "Intermediate",
    category: "Sports",
    icon: "🏏",
    scenario: "You are chatting with a passionate cricket fan about recent international matches and legendary players.",
    starterPrompt: "Hey mate! Did you catch the thrilling cricket match yesterday? Who's your all-time favorite cricket player?",
    starterQuestions: ["What do you think makes a great captain in cricket?", "Do you prefer Test matches or T20?"]
  },
  {
    id: "sp_2",
    title: "Playing Football & Premier League",
    language: "English",
    level: "Beginner",
    category: "Sports",
    icon: "⚽",
    scenario: "You are talking with a teammate before a friendly weekend football match.",
    starterPrompt: "Hey! Ready for the football game? Which position do you usually like playing on the field?",
    starterQuestions: ["Which football club do you support?", "How often do you play football?"]
  },
  {
    id: "tr_1",
    title: "Airport Check-In & Boarding Gate",
    language: "English",
    level: "Beginner",
    category: "Travel",
    icon: "✈️",
    scenario: "You are talking to an airline counter agent checking in your luggage for an international flight.",
    starterPrompt: "Good morning! Welcome to Airways. May I please see your passport and booking reference?",
    starterQuestions: ["Do you have any check-in bags or just carry-on?", "Would you prefer a window or aisle seat?"]
  },
  {
    id: "tr_2",
    title: "Hotel Check-In & Room Requests",
    language: "English",
    level: "Beginner",
    category: "Travel",
    icon: "🏨",
    scenario: "You are arriving at a boutique seaside hotel and checking into your reserved room with the receptionist.",
    starterPrompt: "Welcome to Paradise Resort! How can I assist you today, and under what name is your reservation?",
    starterQuestions: ["Would you like a room with a balcony view?", "Do you need breakfast included each morning?"]
  },
  {
    id: "1",
    title: "Job Interview: Self Introduction",
    language: "English",
    level: "Intermediate",
    category: "Career",
    icon: "💼",
    scenario: "You are an interviewer at a global company interviewing a candidate for a new role.",
    starterPrompt: "Hello! Welcome to our interview today. To start off, could you please tell me a little bit about yourself and your background?",
    starterQuestions: ["Tell me about your previous experience.", "What are your core strengths?"]
  },
  {
    id: "2",
    title: "Ordering Coffee in Tokyo Cafe",
    language: "Japanese",
    level: "Beginner",
    category: "Food",
    icon: "☕",
    scenario: "You are a friendly barista at a popular Shibuya cafe taking a coffee order.",
    starterPrompt: "いらっしゃいませ！何にしますか？ (Irasshaimase! Nani ni shimasu ka? - Welcome! What would you like to order?)",
    starterQuestions: ["Hot or iced?", "Takeout or drink here?"]
  },
  {
    id: "3",
    title: "Ordering K-BBQ in Seoul",
    language: "Korean",
    level: "Beginner",
    category: "Food",
    icon: "🥩",
    scenario: "You are a warm Korean BBQ restaurant owner welcoming a guest who wants to try authentic meat.",
    starterPrompt: "어서오세요! 몇 분이세요? (Eoseo oseyo! Myeot bun-iseyo? - Welcome! How many people are in your party?)",
    starterQuestions: ["What meat would you like?", "Would you like some kimchi jjigae?"]
  },
  {
    id: "tech_1",
    title: "AI and The Future of Robotics",
    language: "English",
    level: "Advanced",
    category: "Tech",
    icon: "🤖",
    scenario: "You are having an intellectual debate on how AI models and robotics will reshape human jobs.",
    starterPrompt: "AI is accelerating faster than ever! In your view, will AI help workers or displace them?",
    starterQuestions: ["What jobs do you think cannot be automated?", "Are you excited about humanoid robots?"]
  }
];

export default function StudentWebApp() {
  // Authentication State
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [authError, setAuthError] = useState("");
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Landing Page CMS configuration
  const [landingConfig, setLandingConfig] = useState<LandingPageConfig>(DEFAULT_LANDING_CONFIG);

  // Active Navigation Tab
  type MainTab =
    | "dashboard"
    | "practice"
    | "conversation"
    | "vocabulary"
    | "grammar"
    | "progress"
    | "achievements"
    | "settings"
    | "history";
  const [activeTab, setActiveTab] = useState<MainTab>("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Top Bar State
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showVipModal, setShowVipModal] = useState(false);

  // Membership Tier & Expiration System (Free vs VIP Pro)
  const [isPremiumMember, setIsPremiumMember] = useState<boolean>(true);
  const [premiumPlanName, setPremiumPlanName] = useState<string>("Annual VIP Pro Pass");
  const [premiumExpiryDate, setPremiumExpiryDate] = useState<string>("2027-01-15");
  const [streakFreezesCount, setStreakFreezesCount] = useState<number>(2);

  const toggleMembershipTier = () => {
    const nextVal = !isPremiumMember;
    setIsPremiumMember(nextVal);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("speakflow_is_premium", String(nextVal));
      } catch (_) {}
    }
  };

  const getDaysUntilExpiry = (expiryDateStr: string) => {
    try {
      const expiry = new Date(expiryDateStr);
      const now = new Date();
      const diffTime = expiry.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    } catch (_) {
      return 56;
    }
  };

  // 20-Achievement Gamification System
  const [achievements, setAchievements] = useState<AchievementBadge[]>(DEFAULT_ACHIEVEMENTS);
  const [totalXp, setTotalXp] = useState<number>(2450);
  const [activeClaimModalBadge, setActiveClaimModalBadge] = useState<AchievementBadge | null>(null);
  const [achievementFilter, setAchievementFilter] = useState<"all" | "ready" | "claimed" | "in_progress">("all");
  const [celebrationToast, setCelebrationToast] = useState<string | null>(null);

  // Load persisted achievements & XP
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedBadges = localStorage.getItem("speakflow_achievements_v2");
        if (savedBadges) {
          const parsed = JSON.parse(savedBadges);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setAchievements(parsed);
          }
        }
        const savedXp = localStorage.getItem("speakflow_total_xp_v2");
        if (savedXp) {
          setTotalXp(parseInt(savedXp, 10) || 2450);
        }
      } catch (e) {
        console.error("Failed to load achievements from local storage", e);
      }
    }
  }, []);

  const handleClaimBadge = (badgeId: string) => {
    const targetBadge = achievements.find((b) => b.id === badgeId);
    if (!targetBadge || targetBadge.isClaimed) return;

    const nextBadges = achievements.map((b) => {
      if (b.id === badgeId) {
        return { ...b, isClaimed: true };
      }
      return b;
    });
    setAchievements(nextBadges);

    const nextXp = totalXp + targetBadge.xpReward;
    setTotalXp(nextXp);

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("speakflow_achievements_v2", JSON.stringify(nextBadges));
        localStorage.setItem("speakflow_total_xp_v2", String(nextXp));
      } catch (e) {
        console.error(e);
      }
    }

    setCelebrationToast(`🎉 +${targetBadge.xpReward} XP Added! Unlocked "${targetBadge.title}"!`);
    setTimeout(() => setCelebrationToast(null), 4500);
  };

  const renderBadgeIcon = (iconType: string, className: string = "w-5 h-5") => {
    switch (iconType) {
      case "sparkles": return <Sparkles className={className} />;
      case "crown": return <Crown className={className} />;
      case "mic": return <Mic className={className} />;
      case "zap": return <Zap className={className} />;
      case "flame": return <Flame className={className} />;
      case "clock": return <Clock className={className} />;
      case "target": return <Target className={className} />;
      case "trophy": return <Trophy className={className} />;
      case "award": return <Award className={className} />;
      case "gem": return <Gem className={className} />;
      case "globe": return <Globe className={className} />;
      case "star": return <Star className={className} />;
      case "shield": return <Shield className={className} />;
      default: return <Award className={className} />;
    }
  };

  // Topics & Filtering
  const [topics, setTopics] = useState<TopicModel[]>(FALLBACK_TOPICS);

  // Gemini Settings & Multi-Key Failover Pool
  const [geminiApiKey, setGeminiApiKey] = useState("");
  const [fallbackKeys, setFallbackKeys] = useState<string[]>([]);
  const [keyRotationStrategy, setKeyRotationStrategy] = useState("free-first-then-paid");
  const [selectedModel, setSelectedModel] = useState("gemini-3.5-flash");
  const [drillModeEnabled, setDrillModeEnabled] = useState(true);

  // Google Firebase #BuildHybridAI 2026: Hybrid Inference State
  const [hybridEngine, setHybridEngine] = useState<HybridEngineType>("CLOUD_GEMINI_FLASH");
  const [hybridLatency, setHybridLatency] = useState<number>(0);
  const [hybridModeSetting, setHybridModeSetting] = useState<HybridModeSetting>("auto");
  const [simulateOffline, setSimulateOffline] = useState<boolean>(false);
  const [engineModelLabel, setEngineModelLabel] = useState<string>("Cloud Gemini 2.5 Flash");
  const keyCooldownsRef = useRef<Map<string, number>>(new Map());

  // AI Voice Coach Persona Selection
  const [selectedCoach, setSelectedCoach] = useState<CoachModel>(COACHES[0]);
  const activeAudioRef = useRef<HTMLAudioElement | null>(null);
  const [previewingCoachVoiceId, setPreviewingCoachVoiceId] = useState<string | null>(null);

  const handlePreviewCoachVoice = (e: React.MouseEvent, coach: CoachModel) => {
    e.stopPropagation();
    if (previewingCoachVoiceId === coach.id) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setPreviewingCoachVoiceId(null);
    } else {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const sampleText = `Hello Janitha! I'm ${coach.name}. I'm excited to practice speaking with you today. Let's start!`;
        const utter = new SpeechSynthesisUtterance(sampleText);
        utter.rate = 0.95;
        utter.pitch = coach.gender === "female" ? 1.15 : 0.9;
        utter.onend = () => setPreviewingCoachVoiceId(null);
        utter.onerror = () => setPreviewingCoachVoiceId(null);
        window.speechSynthesis.speak(utter);
        setPreviewingCoachVoiceId(coach.id);
      }
    }
  };

  // Call Setup Modal State
  const [showDurationModal, setShowDurationModal] = useState(false);
  const [pendingTopic, setPendingTopic] = useState<TopicModel | null>(null);
  const [selectedDurationMinutes, setSelectedDurationMinutes] = useState<number | null>(5); // null = unlimited

  // Active Call View State
  const [activeCallTopic, setActiveCallTopic] = useState<TopicModel | null>(null);
  const [callDuration, setCallDuration] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isBotSpeaking, setIsBotSpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Conversation Turns & Captions
  const [userCaption, setUserCaption] = useState("");
  const [botCaption, setBotCaption] = useState("");
  const [conversationTurns, setConversationTurns] = useState<
    Array<{ sender: "user" | "bot"; text: string; timestamp: Date }>
  >([]);

  // Real-Time Active Repetition Loop (Drill Mode)
  const [isDrillMode, setIsDrillMode] = useState(false);
  const [targetPhraseToRepeat, setTargetPhraseToRepeat] = useState("");
  const [nextScenarioQuestion, setNextScenarioQuestion] = useState("");
  const [drillAttempts, setDrillAttempts] = useState(0);
  const [successfulDrillsCount, setSuccessfulDrillsCount] = useState(0);
  const [userSpeechTurnsCount, setUserSpeechTurnsCount] = useState(0);

  // Live Inline Grammar/Pronunciation Alert
  const [activeCorrection, setActiveCorrection] = useState<{
    original: string;
    correction: string;
    explanation: string;
  } | null>(null);

  // Session Summary & Scoring
  const [sessionCorrections, setSessionCorrections] = useState<
    Array<{ original: string; correction: string; explanation: string }>
  >([]);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [completedSession, setCompletedSession] = useState<CallSessionRecord | null>(null);

  // Call History State
  const [callHistory, setCallHistory] = useState<CallSessionRecord[]>([]);

  // Recent Speaking Activity & Review Modal State
  const [selectedReviewSession, setSelectedReviewSession] = useState<{
    id: string;
    topicTitle: string;
    coachName: string;
    coachAvatar: string;
    coachRole: string;
    coachCountry: string;
    coachFlag: string;
    category: string;
    timeAgo: string;
    durationFormatted: string;
    score: number;
    grade: string;
    fluencyScore: number;
    accuracyScore: number;
    engine: "ON_DEVICE_NANO" | "CLOUD_GEMINI_FLASH";
    latencyMs: number;
    audioPreviewText: string;
    dialogueSnippet: {
      user: string;
      ai: string;
      tip: string;
    };
  } | null>(null);
  const [playingSessionAudioId, setPlayingSessionAudioId] = useState<string | null>(null);

  const defaultRecentSessions = [
    {
      id: "session-rec-1",
      topicTitle: "Business English & Strategic Pitching",
      coachName: "Coach Sophia Miller",
      coachAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      coachRole: "Executive Speech & Pitch Coach",
      coachCountry: "United States",
      coachFlag: "🇺🇸",
      category: "Business & Pitching",
      timeAgo: "2h ago",
      durationFormatted: "3m 42s",
      score: 98,
      grade: "A+",
      fluencyScore: 98,
      accuracyScore: 96,
      engine: "ON_DEVICE_NANO" as const,
      latencyMs: 14,
      audioPreviewText: "Hello Janitha! In our executive pitch session, your intonation and pacing reached an outstanding 98% fluency score. Excellent delivery!",
      dialogueSnippet: {
        user: "We should deploy on-device Gemini Nano to guarantee sub-20ms inference latency for real-time mobile voice sessions.",
        ai: "Magnificent technical vocabulary! Your stress on 'on-device' and 'inference latency' sounded completely natural.",
        tip: "Pro Tip: Maintain an assertive falling pitch when stating performance metrics to reinforce leadership authority.",
      },
    },
    {
      id: "session-rec-2",
      topicTitle: "Parisian Café & Everyday Etiquette",
      coachName: "Coach Camille Laurent",
      coachAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
      coachRole: "Native French Accent Specialist",
      coachCountry: "France",
      coachFlag: "🇫🇷",
      category: "Travel & Culture",
      timeAgo: "Yesterday",
      durationFormatted: "4m 15s",
      score: 95,
      grade: "A",
      fluencyScore: 95,
      accuracyScore: 94,
      engine: "CLOUD_GEMINI_FLASH" as const,
      latencyMs: 240,
      audioPreviewText: "Bonjour Janitha! Your French ordering cadence at the Parisian café was delightful, with smooth vowel transitions.",
      dialogueSnippet: {
        user: "Bonjour madame! Je voudrais commander un café au lait et un croissant s'il vous plaît.",
        ai: "Très bien Janitha! Your pronunciation of 'croissant' had authentic Parisian tongue positioning.",
        tip: "Pro Tip: In informal French cafés, keep 's'il vous plaît' smoothly contracted without pause.",
      },
    },
    {
      id: "session-rec-3",
      topicTitle: "Tokyo AI Summit Networking & Q&A",
      coachName: "Coach Kenji Sato",
      coachAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      coachRole: "Global Tech Liaison Coach",
      coachCountry: "Japan",
      coachFlag: "🇯🇵",
      category: "Tech Networking",
      timeAgo: "Nov 18",
      durationFormatted: "2m 50s",
      score: 96,
      grade: "A",
      fluencyScore: 96,
      accuracyScore: 95,
      engine: "ON_DEVICE_NANO" as const,
      latencyMs: 16,
      audioPreviewText: "Konnichiwa Janitha! Your polite introduction for the Tokyo tech summit networking was clear, polite, and confident.",
      dialogueSnippet: {
        user: "Hajimemashite! SpeakFlow AI no CEO Janitha to moushimasu. Onsha no AI purojekuto ni tsuite oshiete kudasai.",
        ai: "Subarashii desu! Formal business humbleness 'moushimasu' was executed with high professional clarity.",
        tip: "Pro Tip: A subtle breath pause after 'CEO' creates a calm, commanding conversational rhythm.",
      },
    },
  ];

  const handleToggleAudioPreview = (e: React.MouseEvent, session: (typeof defaultRecentSessions)[0]) => {
    e.stopPropagation();
    if (playingSessionAudioId === session.id) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setPlayingSessionAudioId(null);
    } else {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(session.audioPreviewText);
        utter.rate = 0.95;
        utter.onend = () => setPlayingSessionAudioId(null);
        utter.onerror = () => setPlayingSessionAudioId(null);
        window.speechSynthesis.speak(utter);
      }
      setPlayingSessionAudioId(session.id);
    }
  };

  // Interactive Learning Progress Chart State & Datasets
  const [learningChartMetric, setLearningChartMetric] = useState<"fluency" | "time" | "xp">("fluency");
  const [learningChartRange, setLearningChartRange] = useState<"7d" | "30d" | "all">("30d");
  const [hoveredChartPointIndex, setHoveredChartPointIndex] = useState<number | null>(null);

  const learningDatasets = {
    fluency: {
      label: "Fluency Score",
      unit: "%",
      color: "#38BDF8",
      gradientId: "fluencyGradient",
      kpis: [
        { label: "Peak Fluency", value: "96.8%", change: "↑ +14.2% this mo", color: "text-cyan-400" },
        { label: "Avg Cadence", value: "92.4%", change: "Top 5% Cohort", color: "text-emerald-400" },
        { label: "Pronunciation", value: "95.1%", change: "Native Cadence", color: "text-blue-400" },
      ],
      insight: "Your sentence fluency improved by +24% after French Café & Business Pitch sessions!",
      points: [
        { label: "Nov 1", value: "55%", cx: 50, cy: 120, note: "Day 1 Baseline (55%)" },
        { label: "Nov 5", value: "68%", cx: 110, cy: 102, note: "Airport Flow (68%)" },
        { label: "Nov 9", value: "76%", cx: 180, cy: 88, note: "Grammar Sprints (76%)" },
        { label: "Nov 13", value: "84%", cx: 240, cy: 72, note: "Business Pitch (84%)" },
        { label: "Nov 17", value: "91%", cx: 300, cy: 50, note: "Tokyo Tech Q&A (91%)" },
        { label: "Nov 19", value: "96%", cx: 365, cy: 30, note: "Current Peak: 96% 🔥" },
      ],
      pathD: "M 50 120 C 80 115, 95 105, 110 102 C 145 95, 160 90, 180 88 C 210 82, 225 75, 240 72 C 270 62, 285 54, 300 50 C 330 40, 345 32, 365 30",
      areaD: "M 50 120 C 80 115, 95 105, 110 102 C 145 95, 160 90, 180 88 C 210 82, 225 75, 240 72 C 270 62, 285 54, 300 50 C 330 40, 345 32, 365 30 L 365 140 L 50 140 Z",
    },
    time: {
      label: "Practice Time",
      unit: "mins",
      color: "#10B981",
      gradientId: "timeGradient",
      kpis: [
        { label: "Today Spoken", value: "32 mins", change: "↑ +18 mins goal", color: "text-emerald-400" },
        { label: "Weekly Total", value: "3.8 hrs", change: "14 Sessions", color: "text-cyan-400" },
        { label: "Avg Session", value: "4m 20s", change: "Optimal Cadence", color: "text-teal-400" },
      ],
      insight: "You spoke 42% more conversational minutes this week than last week!",
      points: [
        { label: "Nov 1", value: "10m", cx: 50, cy: 125, note: "10 mins spoken" },
        { label: "Nov 5", value: "18m", cx: 110, cy: 110, note: "18 mins spoken" },
        { label: "Nov 9", value: "24m", cx: 180, cy: 95, note: "24 mins spoken" },
        { label: "Nov 13", value: "35m", cx: 240, cy: 70, note: "35 mins spoken" },
        { label: "Nov 17", value: "42m", cx: 300, cy: 52, note: "42 mins spoken" },
        { label: "Nov 19", value: "50m", cx: 365, cy: 35, note: "50 mins peak day!" },
      ],
      pathD: "M 50 125 C 80 120, 95 115, 110 110 C 145 102, 160 98, 180 95 C 210 82, 225 76, 240 70 C 270 60, 285 55, 300 52 C 330 42, 345 38, 365 35",
      areaD: "M 50 125 C 80 120, 95 115, 110 110 C 145 102, 160 98, 180 95 C 210 82, 225 76, 240 70 C 270 60, 285 55, 300 52 C 330 42, 345 38, 365 35 L 365 140 L 50 140 Z",
    },
    xp: {
      label: "Language Mastery XP",
      unit: "XP",
      color: "#F59E0B",
      gradientId: "xpGradient",
      kpis: [
        { label: "Total Earned", value: "2,450 XP", change: "Level 4 Fluent", color: "text-amber-400" },
        { label: "Weekly Sprint", value: "+850 XP", change: "Rank #3 🏆", color: "text-yellow-400" },
        { label: "VIP Multiplier", value: "2x Boost", change: "Active", color: "text-orange-400" },
      ],
      insight: "You're just 550 XP away from unlocking Level 5 Global Diplomat rank!",
      points: [
        { label: "Nov 1", value: "+300", cx: 50, cy: 122, note: "+300 XP Earned" },
        { label: "Nov 5", value: "+650", cx: 110, cy: 104, note: "+650 XP Total" },
        { label: "Nov 9", value: "+1.1k", cx: 180, cy: 86, note: "+1,100 XP Total" },
        { label: "Nov 13", value: "+1.6k", cx: 240, cy: 68, note: "+1,600 XP Total" },
        { label: "Nov 17", value: "+2.0k", cx: 300, cy: 46, note: "+2,050 XP Total" },
        { label: "Nov 19", value: "+2.4k", cx: 365, cy: 26, note: "+2,450 XP Peak ⚡" },
      ],
      pathD: "M 50 122 C 80 116, 95 108, 110 104 C 145 96, 160 90, 180 86 C 210 78, 225 72, 240 68 C 270 56, 285 50, 300 46 C 330 36, 345 30, 365 26",
      areaD: "M 50 122 C 80 116, 95 108, 110 104 C 145 96, 160 90, 180 86 C 210 78, 225 72, 240 68 C 270 56, 285 50, 300 46 C 330 36, 345 30, 365 26 L 365 140 L 50 140 Z",
    },
  };

  // Today's Live AI Voice Challenge State & Audio Handler
  const [isPlayingChallengeAudio, setIsPlayingChallengeAudio] = useState(false);

  const handleToggleChallengeAudio = () => {
    if (isPlayingChallengeAudio) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingChallengeAudio(false);
    } else {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(
          "Hi Janitha! I am Coach Sophia. In today's AI voice challenge, your mission is to pitch your SpeakFlow Hybrid AI architecture in under three minutes. Speak with confidence, maintain steady cadence, and aim for 95% fluency. Whenever you are ready, tap Call Coach Sophia and let's begin!"
        );
        utter.rate = 0.95;
        utter.onend = () => setIsPlayingChallengeAudio(false);
        utter.onerror = () => setIsPlayingChallengeAudio(false);
        window.speechSynthesis.speak(utter);
      }
      setIsPlayingChallengeAudio(true);
    }
  };

  // Web Speech API Refs
  const recognitionRef = useRef<any>(null);
  const proactiveNudgeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Load Landing Settings from Firestore (Synced with Admin Panel CMS)
  useEffect(() => {
    async function fetchLanding() {
      try {
        const docRef = doc(db, COLLECTIONS.SETTINGS, "landing_page");
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setLandingConfig({ ...DEFAULT_LANDING_CONFIG, ...snap.data() });
        }
      } catch (e) {
        console.warn("Could not fetch landing config from Firestore, using defaults", e);
      }
    }
    fetchLanding();
  }, []);

  // 2. Auth State Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      if (currentUser) {
        loadUserSessions(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  // 3. Load Remote Topics from Firestore
  useEffect(() => {
    async function loadTopics() {
      try {
        const querySnapshot = await getDocs(collection(db, COLLECTIONS.TOPICS));
        const loaded: TopicModel[] = [];
        querySnapshot.forEach((d) => {
          const data = d.data();
          loaded.push({
            id: d.id,
            title: data.title || "Untitled Scenario",
            language: data.language || "English",
            level: data.level || "Beginner",
            category: data.category || "General",
            icon: data.icon || "🎙️",
            scenario: data.scenario || "",
            starterPrompt: data.starterPrompt || "Hello! Let's start practicing.",
            starterQuestions: data.starterQuestions || []
          });
        });
        if (loaded.length > 0) {
          // Merge with fallback to keep full coverage
          const existingIds = new Set(loaded.map((t) => t.id));
          const merged = [...loaded, ...FALLBACK_TOPICS.filter((t) => !existingIds.has(t.id))];
          setTopics(merged);
        }
      } catch (err) {
        console.warn("Using fallback topics due to network/rules:", err);
      }
    }
    loadTopics();
  }, []);

  // 4. Load API Keys from Firestore
  useEffect(() => {
    async function loadApiKeys() {
      try {
        const docRef = doc(db, COLLECTIONS.SETTINGS, "api_keys");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.geminiApiKey) setGeminiApiKey(data.geminiApiKey);
          if (data.fallbackKeys && Array.isArray(data.fallbackKeys)) {
            setFallbackKeys(data.fallbackKeys);
          }
          if (data.keyRotationStrategy) {
            setKeyRotationStrategy(data.keyRotationStrategy);
          }
          if (data.activeModel) setSelectedModel(data.activeModel);
        }
      } catch (err) {
        console.warn("Could not load API keys settings from Firestore:", err);
      }
    }
    loadApiKeys();
  }, []);

  // 5. Load User Sessions History
  const loadUserSessions = async (userId: string) => {
    try {
      const q = query(
        collection(db, COLLECTIONS.SESSIONS),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const history: CallSessionRecord[] = [];
      querySnapshot.forEach((d) => {
        history.push({ id: d.id, ...(d.data() as CallSessionRecord) });
      });
      setCallHistory(history);
    } catch (e) {
      console.warn("Could not fetch sessions history:", e);
    }
  };

  // 6. Call Duration Timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (activeCallTopic) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);

        if (remainingSeconds !== null) {
          setRemainingSeconds((prev) => {
            if (prev === null) return null;
            if (prev <= 1) {
              handleEndCall();
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    } else {
      setCallDuration(0);
      setRemainingSeconds(null);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeCallTopic, remainingSeconds]);

  // Clean audio on unmount
  useEffect(() => {
    return () => {
      if (activeAudioRef.current) {
        try {
          activeAudioRef.current.pause();
          activeAudioRef.current.currentTime = 0;
        } catch (_) { }
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // 7. Text-To-Speech (TTS) Engine
  const speakText = async (text: string, langName: string) => {
    setIsBotSpeaking(true);
    setBotCaption(text);
    setConversationTurns((prev) => [
      ...prev,
      { sender: "bot", text, timestamp: new Date() }
    ]);

    if (activeAudioRef.current) {
      try {
        activeAudioRef.current.pause();
        activeAudioRef.current.currentTime = 0;
      } catch (_) { }
      activeAudioRef.current = null;
    }

    try {
      const ttsUrl = `/api/tts?text=${encodeURIComponent(text)}&coach=${selectedCoach.id}&gender=${selectedCoach.gender}&language=${encodeURIComponent(langName)}`;
      const audio = new Audio(ttsUrl);
      activeAudioRef.current = audio;

      audio.onended = () => {
        setIsBotSpeaking(false);
        activeAudioRef.current = null;
        startListening();
        scheduleProactiveNudge();
      };

      audio.onerror = () => {
        console.warn("Neural TTS server failed, falling back to Web Speech Synthesis.");
        fallbackBrowserTts(text, langName);
      };

      await audio.play();
      return;
    } catch (e) {
      fallbackBrowserTts(text, langName);
    }
  };

  const fallbackBrowserTts = (text: string, langName: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setIsBotSpeaking(false);
      startListening();
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = selectedCoach.gender === "female" ? 1.15 : 0.9;

    let targetLang = "en-US";
    if (langName === "Japanese") targetLang = "ja-JP";
    else if (langName === "Korean") targetLang = "ko-KR";
    else if (langName === "Spanish") targetLang = "es-ES";
    utterance.lang = targetLang;

    utterance.onend = () => {
      setIsBotSpeaking(false);
      startListening();
      scheduleProactiveNudge();
    };
    utterance.onerror = () => {
      setIsBotSpeaking(false);
      startListening();
    };
    window.speechSynthesis.speak(utterance);
  };

  const scheduleProactiveNudge = () => {
    if (proactiveNudgeTimerRef.current) clearTimeout(proactiveNudgeTimerRef.current);
    proactiveNudgeTimerRef.current = setTimeout(() => {
      if (!isBotSpeaking && !isUserSpeaking && activeCallTopic) {
        const lang = activeCallTopic.language;
        let nudge = "I'm listening! What do you think about that?";
        if (lang === "Japanese") nudge = "聞いていますよ！どう思いますか？";
        else if (lang === "Korean") nudge = "듣고 있어요! 어떻게 생각하세요?";
        speakText(nudge, lang);
      }
    }, 12000);
  };

  // 8. Speech Recognition (STT)
  const startListening = () => {
    if (isMuted || !activeCallTopic) return;
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("Speech recognition is not supported in this browser.");
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = true;

      const langName = activeCallTopic.language;
      let targetLang = "en-US";
      if (langName === "Japanese") targetLang = "ja-JP";
      else if (langName === "Korean") targetLang = "ko-KR";
      else if (langName === "Spanish") targetLang = "es-ES";
      recognition.lang = targetLang;

      recognition.onstart = () => {
        setIsUserSpeaking(true);
      };

      recognition.onresult = (event: any) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setUserCaption(transcript);

        if (event.results[0].isFinal) {
          handleUserSpeech(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        if (event.error !== "no-speech") {
          console.warn("Speech Recognition Error:", event.error);
        }
        setIsUserSpeaking(false);
      };

      recognition.onend = () => {
        setIsUserSpeaking(false);
      };

      recognition.start();
    } catch (e) {
      console.error("Failed to start speech recognition:", e);
      setIsUserSpeaking(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) { }
      recognitionRef.current = null;
    }
    setIsUserSpeaking(false);
  };

  // 9. Start Call Flow with Duration Selection
  const handleInitiateCallPrompt = (topic: TopicModel) => {
    setPendingTopic(topic);
    setShowDurationModal(true);
  };

  const handleConfirmStartCall = () => {
    if (!pendingTopic) return;
    const topic = pendingTopic;
    setShowDurationModal(false);

    setActiveCallTopic(topic);
    setActiveCorrection(null);
    setSessionCorrections([]);
    setSuccessfulDrillsCount(0);
    setUserSpeechTurnsCount(0);
    setIsDrillMode(false);
    setTargetPhraseToRepeat("");
    setNextScenarioQuestion("");
    setDrillAttempts(0);
    setUserCaption("");
    setShowScoreModal(false);

    if (selectedDurationMinutes !== null) {
      setRemainingSeconds(selectedDurationMinutes * 60);
    } else {
      setRemainingSeconds(null);
    }

    speakText(topic.starterPrompt, topic.language);
  };

  // 10. Repeat Match Helper
  const checkRepetitionMatch = (spoken: string, target: string) => {
    const cleanSpoken = spoken.toLowerCase().replace(/[^\w\s]/g, "").trim();
    const cleanTarget = target.toLowerCase().replace(/[^\w\s]/g, "").trim();

    if (!cleanSpoken || !cleanTarget) return false;
    if (
      cleanSpoken === cleanTarget ||
      cleanSpoken.includes(cleanTarget) ||
      cleanTarget.includes(cleanSpoken)
    ) {
      return true;
    }

    const spokenTokens = new Set(cleanSpoken.split(/\s+/).filter(Boolean));
    const targetTokens = new Set(cleanTarget.split(/\s+/).filter(Boolean));
    const matches = Array.from(targetTokens).filter((t) => spokenTokens.has(t));
    return matches.length / targetTokens.size >= 0.6;
  };

  // 11. Process User Speech Turn
  const handleUserSpeech = async (spokenText: string) => {
    stopListening();
    setIsProcessing(true);
    setUserSpeechTurnsCount((prev) => prev + 1);
    if (proactiveNudgeTimerRef.current) clearTimeout(proactiveNudgeTimerRef.current);

    const lang = activeCallTopic?.language || "English";

    // Active Drill Repetition Loop
    if (isDrillMode && targetPhraseToRepeat) {
      const isMatch = checkRepetitionMatch(spokenText, targetPhraseToRepeat);

      if (isMatch) {
        setSuccessfulDrillsCount((prev) => prev + 1);
        setIsDrillMode(false);
        setActiveCorrection(null);
        setDrillAttempts(0);
        setIsProcessing(false);

        let praise = "Awesome! Perfect pronunciation! 🎉";
        if (lang === "Japanese") praise = "素晴らしい！完璧な発音です！ 🎉";
        else if (lang === "Korean") praise = "아주 좋아요! 완벽한 발음이에요! 🎉";

        const continuation = nextScenarioQuestion
          ? `${praise} ${nextScenarioQuestion}`
          : `${praise} What else would you like to share?`;

        speakText(continuation, lang);
        return;
      } else {
        const nextAttempt = drillAttempts + 1;
        setDrillAttempts(nextAttempt);

        if (nextAttempt >= 2) {
          setIsDrillMode(false);
          setActiveCorrection(null);
          setDrillAttempts(0);
          setIsProcessing(false);

          let grace = "Good effort! Don't worry, you'll master it next time. Let's keep going!";
          if (lang === "Japanese") grace = "よく頑張りました！大丈夫です、続けていきましょう！";
          else if (lang === "Korean") grace = "좋은 시도였어요! 괜찮아요, 계속해서 이야기해 봐요!";

          const continuation = nextScenarioQuestion
            ? `${grace} ${nextScenarioQuestion}`
            : `${grace} Tell me more!`;

          speakText(continuation, lang);
          return;
        } else {
          setIsProcessing(false);
          let retry = `Very close! Listen carefully: '${targetPhraseToRepeat}'. Try once more!`;
          if (lang === "Japanese") retry = `惜しいです！よく聞いてもう一度言ってみてください:「${targetPhraseToRepeat}」`;
          else if (lang === "Korean") retry = `아쉬워요! 잘 듣고 한 번 더 말해보세요: '${targetPhraseToRepeat}'`;

          speakText(retry, lang);
          return;
        }
      }
    }

    // Hybrid Inference Execution
    const now = Date.now();
    const orderedKeyPool: string[] = [];

    if (keyRotationStrategy === "paid-only") {
      if (geminiApiKey && geminiApiKey.length > 10) orderedKeyPool.push(geminiApiKey);
    } else {
      for (const k of fallbackKeys) {
        if (k && k.length > 10) {
          const cd = keyCooldownsRef.current.get(k) || 0;
          if (now >= cd) orderedKeyPool.push(k);
        }
      }
      if (geminiApiKey && geminiApiKey.length > 10) {
        orderedKeyPool.push(geminiApiKey);
      }
    }

    const conversationHistoryText = conversationTurns
      .slice(-6)
      .map((t) => `${t.sender.toUpperCase()}: ${t.text}`)
      .join("\n");

    const hybridResult = await executeHybridInference({
      spokenText: spokenText,
      language: lang,
      scenario: activeCallTopic?.scenario || "",
      drillModeEnabled: drillModeEnabled,
      orderedKeyPool: orderedKeyPool,
      selectedModel: selectedModel,
      modeSetting: hybridModeSetting,
      simulateOffline: simulateOffline,
    });

    setHybridEngine(hybridResult.engineUsed);
    setHybridLatency(hybridResult.latencyMs);
    setEngineModelLabel(hybridResult.modelIdentifier || "Cloud Gemini 2.5 Flash");
    setIsProcessing(false);

    if (hybridResult.hasCorrection && drillModeEnabled) {
      setActiveCorrection({
        original: hybridResult.original,
        correction: hybridResult.correction,
        explanation: hybridResult.explanation
      });
      setSessionCorrections((prev) => [
        ...prev,
        {
          original: hybridResult.original,
          correction: hybridResult.correction,
          explanation: hybridResult.explanation
        }
      ]);

      if (hybridResult.targetPhrase) {
        setIsDrillMode(true);
        setTargetPhraseToRepeat(hybridResult.targetPhrase);
        setNextScenarioQuestion(hybridResult.spokenReply);
        setDrillAttempts(0);

        let drillLeadIn = `Let's practice saying: '${hybridResult.targetPhrase}'. Try repeating it!`;
        if (lang === "Japanese") drillLeadIn = `練習しましょう:「${hybridResult.targetPhrase}」。リピートしてください！`;
        else if (lang === "Korean") drillLeadIn = `함께 연습해 봐요: '${hybridResult.targetPhrase}'. 따라 말해보세요!`;

        speakText(drillLeadIn, lang);
        return;
      }
    }

    speakText(hybridResult.spokenReply, lang);
  };

  // 12. Calculate Score & End Call
  const handleEndCall = async () => {
    stopListening();
    if (proactiveNudgeTimerRef.current) clearTimeout(proactiveNudgeTimerRef.current);
    if (activeAudioRef.current) {
      try {
        activeAudioRef.current.pause();
        activeAudioRef.current.currentTime = 0;
      } catch (_) { }
      activeAudioRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    if (!activeCallTopic) return;

    const turns = userSpeechTurnsCount;
    const errors = sessionCorrections.length;
    const drillsMastered = successfulDrillsCount;

    let fluency = Math.min(95, 70 + Math.round(turns * 4) + (callDuration > 60 ? 10 : 5));
    let accuracy = Math.max(50, 100 - errors * 7 + drillsMastered * 5);
    let totalScore = Math.round(fluency * 0.45 + accuracy * 0.55);
    totalScore = Math.max(55, Math.min(98, totalScore));

    let grade = "A";
    if (totalScore >= 90) grade = "A+";
    else if (totalScore >= 80) grade = "A";
    else if (totalScore >= 70) grade = "B";
    else grade = "C";

    let feedback = "Excellent communication skills! You carried the conversation naturally.";
    if (errors > 2) {
      feedback = "Great conversational courage! Keep focusing on past tenses and subject-verb agreement.";
    } else if (drillsMastered > 0) {
      feedback = "Outstanding pronunciation improvement! You corrected yourself quickly and effectively.";
    }

    const sessionRecord: CallSessionRecord = {
      userId: user?.uid || "guest-user",
      userEmail: user?.email || "guest@speakflow.ai",
      userName: user?.displayName || "Janitha Dilshan",
      topicTitle: activeCallTopic.title,
      language: activeCallTopic.language,
      durationSeconds: callDuration,
      score: totalScore,
      grade,
      fluencyScore: fluency,
      accuracyScore: accuracy,
      totalCorrections: errors,
      correctionsList: sessionCorrections,
      coachFeedback: feedback,
      createdAt: new Date().toISOString()
    };

    if (user) {
      try {
        await addDoc(collection(db, COLLECTIONS.SESSIONS), sessionRecord);
        loadUserSessions(user.uid);
      } catch (err) {
        console.warn("Could not save session to Firestore:", err);
      }
    }

    setCompletedSession(sessionRecord);
    setShowScoreModal(true);
    setActiveCallTopic(null);
  };

  // 13. Auth Handlers
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthSubmitting(true);
    try {
      if (authMode === "login") {
        await signInWithEmailAndPassword(auth, authEmail, authPassword);
      } else {
        const cred = await createUserWithEmailAndPassword(auth, authEmail, authPassword);
        if (authName && cred.user) {
          await updateProfile(cred.user, { displayName: authName });
        }
      }
      setShowAuthModal(false);
    } catch (err: any) {
      setAuthError(err.message || "Authentication failed. Please check credentials.");
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setAuthError("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setShowAuthModal(false);
    } catch (err: any) {
      setAuthError(err.message || "Google sign-in was interrupted.");
    }
  };

  const handleSignOut = async () => {
    if (activeCallTopic) handleEndCall();
    await signOut(auth);
    setActiveTab("dashboard");
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Quick Lesson Launch Helper
  const launchTopicByKeyword = (keyword: string) => {
    const found =
      topics.find((t) => t.title.toLowerCase().includes(keyword.toLowerCase())) ||
      topics[0];
    handleInitiateCallPrompt(found);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0A0F1D] flex items-center justify-center text-white">
        <div className="w-8 h-8 border-3 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // =========================================================================
  // VIEW A: PUBLIC LANDING PAGE (VISITORS / NOT LOGGED IN)
  // =========================================================================
  if (!user) {
    return (
      <div className="min-h-screen bg-[#0A0F1D] text-slate-100 flex flex-col relative overflow-hidden selection:bg-blue-500 selection:text-white">
        {/* Ambient Glowing Orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none"></div>

        {/* Top Announcement Bar (from CMS) */}
        {landingConfig.announcementActive && (
          <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white text-xs font-semibold py-2 px-4 text-center border-b border-indigo-500/30 flex items-center justify-center gap-2">
            <span>{landingConfig.announcementText}</span>
          </div>
        )}

        {/* Public Header */}
        <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight flex items-center gap-2">
                  SpeakFlow <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-cyan-400 border border-blue-500/40 font-mono">AI</span>
                </span>
                <p className="text-[10px] text-slate-400 hidden sm:block">Practice • Speak • Grow</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
              <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
              <a href="#demo" className="hover:text-cyan-400 transition-colors">Web Demo</a>
              <a href="#hybrid" className="hover:text-cyan-400 transition-colors">Hybrid On-Device AI</a>
              <a href={landingConfig.apkDownloadUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1 text-emerald-400">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Download APK</span>
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <a
                href={landingConfig.apkDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>APK v1.0</span>
              </a>

              <button
                onClick={() => {
                  setAuthMode("login");
                  setShowAuthModal(true);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-500/25 flex items-center gap-1.5 transition-all"
              >
                <span>Launch Practice</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-20 flex flex-col items-center text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs font-bold text-blue-300 tracking-wider">
              {landingConfig.heroBadge}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-4xl mb-6">
            Speak Any Language<br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              Like a Native Partner.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
            {landingConfig.heroSubtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-14 w-full sm:w-auto">
            <button
              onClick={() => {
                setAuthMode("login");
                setShowAuthModal(true);
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <span>{landingConfig.primaryCtaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={landingConfig.apkDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 transition-all"
            >
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span>{landingConfig.secondaryCtaText}</span>
            </a>
          </div>

          {/* Live Proof Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl p-4 bg-slate-900/60 rounded-2xl border border-slate-800/80 backdrop-blur mb-14">
            <div className="p-3 text-center">
              <span className="text-xl sm:text-2xl font-black text-white block">{landingConfig.statMinutes}</span>
              <span className="text-xs text-slate-400">Practice Minutes</span>
            </div>
            <div className="p-3 text-center">
              <span className="text-xl sm:text-2xl font-black text-cyan-400 block">{landingConfig.statStudents}</span>
              <span className="text-xs text-slate-400">Active Students</span>
            </div>
            <div className="p-3 text-center">
              <span className="text-xl sm:text-2xl font-black text-emerald-400 block">{landingConfig.statFluency}</span>
              <span className="text-xs text-slate-400">Fluency Score</span>
            </div>
            <div className="p-3 text-center">
              <span className="text-xl sm:text-2xl font-black text-purple-400 block">{landingConfig.statLanguages}</span>
              <span className="text-xs text-slate-400">Multi-Language</span>
            </div>
          </div>

          {/* Full Dashboard Mockup Showcase */}
          <div id="demo" className="w-full max-w-5xl rounded-3xl overflow-hidden border border-blue-500/30 shadow-2xl shadow-blue-500/20 bg-slate-950 relative group">
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-bold text-slate-200">Interactive Student Dashboard 1:1</span>
            </div>
            <img
              src={landingConfig.dashboardMockupUrl}
              alt="SpeakFlow Student Dashboard"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
            />
            {/* Overlay click prompt */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end justify-center p-8 pointer-events-none">
              <button
                onClick={() => {
                  setAuthMode("login");
                  setShowAuthModal(true);
                }}
                className="pointer-events-auto px-6 py-3 rounded-2xl bg-blue-600/90 hover:bg-blue-600 text-white font-bold text-xs backdrop-blur shadow-xl flex items-center gap-2 transition-all hover:scale-105"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Launch Web Experience Now</span>
              </button>
            </div>
          </div>

          {/* 4 Feature Value Pillars */}
          <div id="features" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full max-w-6xl mt-20 text-left">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">{landingConfig.feature1Title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{landingConfig.feature1Desc}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">{landingConfig.feature2Title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{landingConfig.feature2Desc}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">{landingConfig.feature3Title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{landingConfig.feature3Desc}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">{landingConfig.feature4Title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{landingConfig.feature4Desc}</p>
            </div>
          </div>
        </section>

        {/* Public Footer */}
        <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-blue-400" />
              <span className="text-slate-300 font-semibold">SpeakFlow AI</span>
              <span>— Google Firebase #BuildHybridAI 2026 Hackathon</span>
            </div>
            <div className="flex items-center gap-4">
              <a href={landingConfig.apkDownloadUrl} className="hover:text-slate-300 transition-colors">Download Android App</a>
              <a href="/login" className="hover:text-slate-300 transition-colors">Admin Panel</a>
            </div>
          </div>
        </footer>

        {/* Auth Modal */}
        {showAuthModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-slate-900 border border-blue-500/30 rounded-3xl p-7 shadow-2xl relative space-y-6">
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">Student Portal</h2>
                <p className="text-xs text-slate-400">Sign in to launch your interactive voice dashboard</p>
              </div>

              {/* Toggle Mode */}
              <div className="flex p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setAuthMode("login")}
                  className={`flex-1 py-2 rounded-lg transition-all ${authMode === "login"
                    ? "bg-blue-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                    }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode("register")}
                  className={`flex-1 py-2 rounded-lg transition-all ${authMode === "register"
                    ? "bg-blue-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                    }`}
                >
                  Create Account
                </button>
              </div>

              {/* Error message */}
              {authError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleAuthSubmit} className="space-y-4 text-left">
                {authMode === "register" && (
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Janitha Dilshan"
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="student@speakflow.ai"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={authSubmitting}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {authSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <span>{authMode === "login" ? "Sign In & Launch" : "Create Account"}</span>
                  )}
                </button>
              </form>

              {/* Social Login */}
              <div className="relative border-t border-slate-800 pt-4 text-center">
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-slate-900 px-2 text-[10px] text-slate-500 uppercase">
                  or
                </span>
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </div>

              {/* Demo 1-Click Login for Hackathon Jury */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={async () => {
                    setAuthEmail("student@speakflow.ai");
                    setAuthPassword("hackathon2026");
                    try {
                      setAuthSubmitting(true);
                      await signInWithEmailAndPassword(auth, "student@speakflow.ai", "hackathon2026");
                      setShowAuthModal(false);
                    } catch (e) {
                      // fallback guest state
                      setUser({ displayName: "Janitha Dilshan", email: "janithad2@gmail.com", uid: "demo-jury" } as any);
                      setShowAuthModal(false);
                    } finally {
                      setAuthSubmitting(false);
                    }
                  }}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold underline"
                >
                  ⚡ 1-Click Instant Demo Access (Janitha Dilshan)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // VIEW B: LOGGED-IN 1:1 DESKTOP DASHBOARD (MATCHING media_1795125850996_608b6b20.png)
  // =========================================================================
  const filteredTopics = topics.filter((t) => {
    const matchesLang = selectedLanguage === "All" || t.language === selectedLanguage;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.scenario.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLang && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0A0F1D] text-slate-100 flex flex-col md:flex-row selection:bg-blue-500 selection:text-white relative">
      {/* ------------------------------------------------------------- */}
      {/* 1. LEFT SIDEBAR (Luxury Cyber-Glass Theme) */}
      {/* ------------------------------------------------------------- */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-68 bg-gradient-to-b from-[#0D111E] via-[#0A0F1D] to-[#080C18] border-r border-slate-800/80 flex flex-col justify-between p-5 transition-transform duration-300 shadow-2xl ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="space-y-6">
          {/* Logo Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 border border-cyan-400/30 shrink-0">
                <Bot className="w-5.5 h-5.5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-xl text-white tracking-tight">SpeakFlow</span>
                  <span className="text-[9px] font-black bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 px-1.5 py-0.5 rounded-md shadow-sm">
                    AI
                  </span>
                </div>
                <p className="text-[10px] text-cyan-300/80 font-medium">Hybrid Real-Time Voice Coach</p>
              </div>
            </div>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5 text-xs font-semibold">
            {/* Dashboard */}
            <button
              onClick={() => {
                setActiveTab("dashboard");
                setActiveCallTopic(null);
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "dashboard" && !activeCallTopic
                  ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-bold shadow-lg shadow-blue-600/30 border border-blue-400/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/70"
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </div>
              {activeTab === "dashboard" && !activeCallTopic && (
                <span className="w-1.5 h-4 rounded-full bg-cyan-400 shadow-[0_0_8px_#38BDF8]" />
              )}
            </button>

            {/* Practice */}
            <button
              onClick={() => {
                setActiveTab("practice");
                setActiveCallTopic(null);
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "practice" && !activeCallTopic
                  ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-bold shadow-lg shadow-blue-600/30 border border-blue-400/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/70"
              }`}
            >
              <div className="flex items-center gap-3">
                <Mic className="w-4 h-4" />
                <span>Practice</span>
              </div>
              <span className="text-[8.5px] font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.2 rounded-full">
                ⚡ Voice
              </span>
            </button>

            {/* Conversation AI */}
            <button
              onClick={() => {
                setActiveTab("conversation");
                setMobileSidebarOpen(false);
                launchTopicByKeyword("travel");
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "conversation"
                  ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-bold shadow-lg shadow-blue-600/30 border border-blue-400/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/70"
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4" />
                <span>Conversation AI</span>
              </div>
              <span className="text-[8.5px] font-bold text-cyan-300 bg-cyan-500/15 border border-cyan-500/30 px-1.5 py-0.2 rounded-full">
                Live Call
              </span>
            </button>

            {/* Vocabulary */}
            <button
              onClick={() => {
                setActiveTab("vocabulary");
                setActiveCallTopic(null);
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "vocabulary"
                  ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-bold shadow-lg shadow-blue-600/30 border border-blue-400/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/70"
              }`}
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4" />
                <span>Vocabulary</span>
              </div>
              <span className="text-[8.5px] font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-1.5 py-0.2 rounded-full">
                18 Due
              </span>
            </button>

            {/* Grammar */}
            <button
              onClick={() => {
                setActiveTab("grammar");
                setActiveCallTopic(null);
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "grammar"
                  ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-bold shadow-lg shadow-blue-600/30 border border-blue-400/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/70"
              }`}
            >
              <div className="flex items-center gap-3">
                <GraduationCap className="w-4 h-4" />
                <span>Grammar</span>
              </div>
              <span className="text-[8.5px] font-bold text-purple-300 bg-purple-500/15 border border-purple-500/30 px-1.5 py-0.2 rounded-full">
                Level B2
              </span>
            </button>

            {/* Progress */}
            <button
              onClick={() => {
                setActiveTab("progress");
                setActiveCallTopic(null);
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "progress"
                  ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-bold shadow-lg shadow-blue-600/30 border border-blue-400/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/70"
              }`}
            >
              <div className="flex items-center gap-3">
                <BarChart3 className="w-4 h-4" />
                <span>Progress</span>
              </div>
              <span className="text-[8.5px] font-bold text-emerald-400">96.8%</span>
            </button>

            {/* Achievements */}
            <button
              onClick={() => {
                setActiveTab("achievements");
                setActiveCallTopic(null);
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "achievements"
                  ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-bold shadow-lg shadow-blue-600/30 border border-blue-400/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/70"
              }`}
            >
              <div className="flex items-center gap-3">
                <Trophy className="w-4 h-4" />
                <span>Achievements</span>
              </div>
              <span className="text-[8.5px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40 px-1.5 py-0.2 rounded-full animate-pulse">
                🎁 5 Ready
              </span>
            </button>

            {/* Settings */}
            <button
              onClick={() => {
                setActiveTab("settings");
                setActiveCallTopic(null);
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "settings"
                  ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-bold shadow-lg shadow-blue-600/30 border border-blue-400/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/70"
              }`}
            >
              <div className="flex items-center gap-3">
                <Compass className="w-4 h-4" />
                <span>Settings</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Bottom Section: VIP Card & User Profile */}
        <div className="space-y-4 pt-4 border-t border-slate-800/80">
          {/* Go Premium VIP Card */}
          <div className="p-4 rounded-3xl bg-gradient-to-br from-[#1E1B4B] via-[#141838] to-[#0B0F20] border border-amber-500/35 text-center relative overflow-hidden space-y-2.5 shadow-xl group">
            {/* Ambient Gold Glow */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-amber-500/20 rounded-full blur-xl pointer-events-none" />

            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/25">
              <Crown className="w-4.5 h-4.5 fill-slate-950" />
            </div>
            <div>
              <span className="font-black text-xs text-white block">SpeakFlow VIP Pro</span>
              <p className="text-[10px] text-amber-200/80 font-medium">Unlimited Gemini Nano &amp; Cloud</p>
            </div>
            <button
              onClick={() => setShowVipModal(true)}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/30 flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isPremiumMember ? "Manage VIP Pass" : "Upgrade to Pro"}</span>
            </button>
          </div>

          {/* User Profile Footer */}
          <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <img
                  src="/images/janitha-avatar.jpg"
                  alt="Janitha Dilshan"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/50"
                  onError={(e) => {
                    (e.currentTarget as any).src = "https://ui-avatars.com/api/?name=Janitha+Dilshan&background=3b82f6&color=fff";
                  }}
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950 animate-ping" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
              </div>
              <div className="min-w-0">
                <span className="font-bold text-xs text-white block truncate">
                  {user?.displayName || "Janitha Dilshan"}
                </span>
                <span className={`text-[10px] flex items-center gap-1 font-semibold truncate ${
                  isPremiumMember ? "text-amber-300" : "text-slate-400"
                }`}>
                  {isPremiumMember ? (
                    <>
                      <Crown className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
                      <span>VIP Pro Member</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-slate-500 shrink-0" />
                      <span>Free Explorer</span>
                    </>
                  )}
                </span>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              title="Sign Out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ------------------------------------------------------------- */}
      {/* 2. MAIN DASHBOARD CONTENT AREA */}
      {/* ------------------------------------------------------------- */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP BAR (1:1 with Screenshot) */}
        <header className="h-16 border-b border-slate-800/80 bg-[#0A0F1D]/80 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden text-slate-400 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search lessons, words... */}
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lessons, words..."
                className="w-full bg-[#111827] border border-slate-800 rounded-full pl-9 pr-4 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            {/* Notification Bell with Badge 3 */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-xl bg-[#111827] border border-slate-800 text-slate-300 hover:text-white relative transition-colors"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl z-50 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">Notifications</span>
                    <span className="text-[10px] text-blue-400 font-semibold cursor-pointer">Mark all read</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <p className="font-semibold text-white">🔥 12-Day Streak Achieved!</p>
                      <p className="text-[10px] text-slate-400">Keep up your daily speaking momentum.</p>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <p className="font-semibold text-white">🏆 #1 on Weekly Winners Podium!</p>
                      <p className="text-[10px] text-slate-400">190 min practice logged this week.</p>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <p className="font-semibold text-white">✨ 40 New Food & Travel Topics</p>
                      <p className="text-[10px] text-slate-400">Explore authentic restaurant and airport calls.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Language Selector Dropdown */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111827] border border-slate-800 text-xs font-semibold text-slate-200">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-transparent text-white focus:outline-none cursor-pointer"
              >
                <option value="English" className="bg-slate-900 text-white">English</option>
                <option value="Spanish" className="bg-slate-900 text-white">Spanish</option>
                <option value="Korean" className="bg-slate-900 text-white">Korean</option>
                <option value="Japanese" className="bg-slate-900 text-white">Japanese</option>
                <option value="Arabic" className="bg-slate-900 text-white">Arabic</option>
                <option value="Tamil" className="bg-slate-900 text-white">Tamil</option>
              </select>
            </div>
          </div>
        </header>

        {/* MAIN BODY CONTENT */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-6 w-full max-w-[1680px] mx-auto">
          {/* IF ACTIVE CALL IS RUNNING: FULL SCREEN VOICE COACH CALL */}
          {activeCallTopic ? (
            <div className="max-w-2xl mx-auto bg-slate-900/95 border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur relative overflow-hidden flex flex-col min-h-[580px]">
              {/* Call Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xl border border-blue-500/30">
                    {activeCallTopic.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">{activeCallTopic.title}</h3>
                    <p className="text-xs text-slate-400">{activeCallTopic.language} • {activeCallTopic.level}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-cyan-400">
                    {formatTimer(callDuration)}
                  </div>
                  <button
                    onClick={handleEndCall}
                    className="p-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30 transition-all"
                    title="End Call & Score"
                  >
                    <PhoneOff className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Central Coach & Soundwave Animation */}
              <div className="flex-1 flex flex-col items-center justify-center py-8 text-center space-y-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 shadow-2xl animate-pulse">
                    <img
                      src={selectedCoach.avatar}
                      alt={selectedCoach.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  {isBotSpeaking && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold shadow animate-bounce">
                      Speaking...
                    </span>
                  )}
                  {isUserSpeaking && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold shadow animate-bounce">
                      Listening...
                    </span>
                  )}
                </div>

                {/* Live soundwave */}
                <div className="flex items-center gap-1 h-10">
                  <span className={`w-1 bg-cyan-400 rounded-full transition-all duration-150 ${isBotSpeaking || isUserSpeaking ? "h-6 animate-pulse" : "h-2"}`}></span>
                  <span className={`w-1 bg-blue-500 rounded-full transition-all duration-150 ${isBotSpeaking || isUserSpeaking ? "h-9 animate-bounce" : "h-3"}`}></span>
                  <span className={`w-1 bg-indigo-500 rounded-full transition-all duration-150 ${isBotSpeaking || isUserSpeaking ? "h-10 animate-pulse" : "h-2"}`}></span>
                  <span className={`w-1 bg-purple-500 rounded-full transition-all duration-150 ${isBotSpeaking || isUserSpeaking ? "h-7 animate-bounce" : "h-4"}`}></span>
                  <span className={`w-1 bg-pink-500 rounded-full transition-all duration-150 ${isBotSpeaking || isUserSpeaking ? "h-5 animate-pulse" : "h-2"}`}></span>
                </div>

                {/* Live Captions */}
                <div className="w-full max-w-lg space-y-2">
                  {botCaption && (
                    <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-500/30 text-xs text-blue-200 leading-relaxed text-left">
                      <span className="font-bold text-cyan-400 block mb-0.5">{selectedCoach.name}:</span>
                      {botCaption}
                    </div>
                  )}

                  {userCaption && (
                    <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-200 leading-relaxed text-right">
                      <span className="font-bold text-emerald-400 block mb-0.5">You:</span>
                      {userCaption}
                    </div>
                  )}

                  {/* Active Repetition Drill Prompt */}
                  {isDrillMode && targetPhraseToRepeat && (
                    <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-xs text-amber-200 text-center animate-pulse">
                      <span className="font-bold block mb-1">🎯 Pronunciation Drill — Repeat this:</span>
                      <span className="text-sm font-bold text-white underline">"{targetPhraseToRepeat}"</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Call Controls Footer */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3 rounded-2xl border transition-all ${isMuted
                    ? "bg-rose-500/20 border-rose-500/40 text-rose-300"
                    : "bg-slate-800 border-slate-700 text-slate-200 hover:text-white"
                    }`}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>

                <div className="text-center text-[11px] text-slate-400">
                  {isProcessing ? (
                    <span className="text-cyan-400 font-semibold animate-pulse">AI is thinking...</span>
                  ) : (
                    <span>Speak naturally into your microphone</span>
                  )}
                </div>

                <button
                  onClick={handleEndCall}
                  className="px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 flex items-center gap-2 transition-all"
                >
                  <span>End & Score</span>
                  <PhoneOff className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : activeTab === "dashboard" ? (
            /* ----------------------------------------------------------- */
            /* TAB: 1:1 DASHBOARD VIEW (MATCHING THE SCREENSHOT EXACTLY)    */
            /* ----------------------------------------------------------- */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
              {/* LEFT & CENTER MAIN COLUMN (8 cols of 12) */}
              <div className="lg:col-span-8 space-y-6">
                {/* 1. HERO BANNER: Welcome Back Janitha! (Fully Visible Artwork & Centered Typography) */}
                <div className="relative rounded-3xl overflow-hidden border border-blue-500/30 bg-[#0B132B] shadow-[0_20px_50px_rgba(30,58,138,0.3)] min-h-[250px] sm:min-h-[275px] lg:min-h-[290px] flex items-center justify-center p-6 sm:p-8">
                  {/* High Resolution Background Artwork (Full Robot on Left, Full Globe on Right, Clean Center) */}
                  <img
                    src="/images/hero_banner_panoramic_clean.jpg"
                    alt="SpeakFlow AI Hero"
                    className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none opacity-90"
                    onError={(e) => {
                      (e.currentTarget as any).src = "/images/exact_reference_banner.png";
                    }}
                  />

                  {/* Ambient Glow Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-950/30 via-transparent to-blue-950/30 pointer-events-none" />

                  {/* Top-Right Floating Badges */}
                  <div className="absolute top-3.5 right-4 sm:top-4 sm:right-6 flex items-center gap-2 z-20">
                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/75 border border-cyan-500/40 text-cyan-300 text-[11px] font-bold backdrop-blur-md shadow-lg shadow-cyan-950/40">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Gemini Nano Hybrid AI</span>
                    </div>
                    <button
                      onClick={() => setActiveTab("achievements")}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-amber-500/40 text-amber-300 text-[11px] font-bold backdrop-blur-md shadow-lg transition-all hover:scale-105 active:scale-95"
                      title="View All 20 Achievements"
                    >
                      <Trophy className="w-3.5 h-3.5 text-amber-400" />
                      <span>Badges ({achievements.filter(a => a.isUnlocked).length}/20)</span>
                    </button>
                  </div>

                  {/* CENTERED CRISP NATIVE VECTOR TYPOGRAPHY */}
                  <div className="relative z-10 max-w-sm sm:max-w-md lg:max-w-lg mx-auto text-center flex flex-col items-center justify-center space-y-2.5">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight flex items-center justify-center gap-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
                      <span>Welcome back, {user?.displayName?.split(" ")[0] || "Janitha"}!</span>
                      <span className="text-2xl sm:text-3xl animate-bounce">👋</span>
                    </h1>
                    <p className="text-xs sm:text-sm lg:text-base text-blue-100/90 leading-relaxed font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] max-w-sm sm:max-w-md">
                      Let's practice your language skills today and become more fluent!
                    </p>
                    <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                      <button
                        onClick={() => launchTopicByKeyword("travel")}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-700 hover:from-blue-400 hover:to-indigo-500 text-white font-bold text-xs shadow-xl shadow-blue-500/40 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Start Practice →</span>
                      </button>
                      <button
                        onClick={() => setActiveTab("achievements")}
                        className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/20 transition-all flex items-center gap-1.5 backdrop-blur-md shadow-md hover:scale-105"
                      >
                        <Trophy className="w-3.5 h-3.5 text-amber-300" />
                        <span>View Badges & XP</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. 4 QUICK STAT CARDS (Ultra-Luxury Cyber Glass Suite) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4.5 w-full">
                  {/* Card 1: Practice Time */}
                  <div 
                    onClick={() => setActiveTab("practice")}
                    className="p-4 sm:p-5 rounded-3xl bg-gradient-to-b from-[#1b153b]/95 via-[#130f2d]/90 to-[#0a081a]/95 border border-purple-500/40 hover:border-purple-400 shadow-xl shadow-purple-950/30 hover:shadow-purple-600/20 relative overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 cursor-pointer flex flex-col justify-between min-h-[142px] group"
                  >
                    {/* Top specular highlight line */}
                    <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-400/60 to-transparent" />
                    {/* Ambient Purple Glow */}
                    <div className="absolute -top-10 -right-10 w-28 h-28 bg-purple-600/20 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/35 transition-all" />

                    {/* Top Row: 3D Squircle Icon + Trend Badge */}
                    <div className="flex items-center justify-between relative z-10">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500/30 via-purple-600/20 to-indigo-600/25 border border-purple-400/40 text-purple-300 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.35)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        <Mic className="w-5 h-5 text-purple-300 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]" />
                      </div>
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[10px] font-bold shadow-sm shadow-emerald-950/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>↑ +25%</span>
                      </div>
                    </div>

                    {/* Middle: Big Stat Number */}
                    <div className="relative z-10 my-2">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)] font-sans">
                          2.5
                        </span>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-300 bg-purple-500/20 px-1.5 py-0.5 rounded-md border border-purple-400/30">
                          HRS
                        </span>
                      </div>
                    </div>

                    {/* Bottom Row: Label + Glowing Waveform Bars */}
                    <div className="flex items-end justify-between relative z-10 pt-1 border-t border-purple-500/15">
                      <div className="flex flex-col">
                        <span className="text-[11px] text-slate-300 font-semibold group-hover:text-purple-200 transition-colors">
                          Practice Time
                        </span>
                        <span className="text-[9px] text-purple-400/70 font-mono">
                          150 mins logged
                        </span>
                      </div>
                      {/* Animated Soundwave Equalizer */}
                      <div className="flex items-end gap-1 h-5 px-1 py-0.5 rounded-lg bg-purple-950/40 border border-purple-500/20">
                        <span className="w-1 bg-purple-400 rounded-full animate-[pulse_1.2s_ease-in-out_infinite] h-3" />
                        <span className="w-1 bg-purple-300 rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-4.5" />
                        <span className="w-1 bg-indigo-400 rounded-full animate-[pulse_1.5s_ease-in-out_infinite] h-2.5" />
                        <span className="w-1 bg-purple-400 rounded-full animate-[pulse_1.0s_ease-in-out_infinite] h-4" />
                        <span className="w-1 bg-purple-300 rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Lessons Completed */}
                  <div 
                    onClick={() => setActiveTab("practice")}
                    className="p-4 sm:p-5 rounded-3xl bg-gradient-to-b from-[#0e2c22]/95 via-[#092018]/90 to-[#05140f]/95 border border-emerald-500/40 hover:border-emerald-400 shadow-xl shadow-emerald-950/30 hover:shadow-emerald-600/20 relative overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 cursor-pointer flex flex-col justify-between min-h-[142px] group"
                  >
                    <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
                    <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-600/20 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/35 transition-all" />

                    {/* Top Row: 3D Squircle Icon + Trend Badge */}
                    <div className="flex items-center justify-between relative z-10">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500/30 via-emerald-600/20 to-teal-600/25 border border-emerald-400/40 text-emerald-300 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.35)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        <Target className="w-5 h-5 text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)] stroke-[2.5]" />
                      </div>
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[10px] font-bold shadow-sm shadow-emerald-950/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>↑ +12%</span>
                      </div>
                    </div>

                    {/* Middle: Big Stat Number */}
                    <div className="relative z-10 my-2">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)] font-sans">
                          48
                        </span>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-300 bg-emerald-500/20 px-1.5 py-0.5 rounded-md border border-emerald-400/30">
                          / 60 UNITS
                        </span>
                      </div>
                    </div>

                    {/* Bottom Row: Label + 6-Segment Cyber Bar */}
                    <div className="flex flex-col relative z-10 pt-1 border-t border-emerald-500/15 space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-300 font-semibold group-hover:text-emerald-200 transition-colors">
                          Lessons Done
                        </span>
                        <span className="text-[9px] text-emerald-300 font-bold font-mono">
                          80% Complete
                        </span>
                      </div>
                      {/* Segmented Cyber Progress Bar */}
                      <div className="flex items-center gap-1 w-full">
                        <div className="flex-1 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                        <div className="flex-1 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                        <div className="flex-1 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                        <div className="flex-1 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                        <div className="flex-1 h-1.5 rounded-full bg-emerald-500/40" />
                        <div className="flex-1 h-1.5 rounded-full bg-emerald-950/60" />
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Current Streak */}
                  <div 
                    onClick={() => setActiveTab("achievements")}
                    className="p-4 sm:p-5 rounded-3xl bg-gradient-to-b from-[#331c0c]/95 via-[#231307]/90 to-[#120803]/95 border border-amber-500/40 hover:border-amber-400 shadow-xl shadow-amber-950/30 hover:shadow-amber-600/20 relative overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 cursor-pointer flex flex-col justify-between min-h-[142px] group"
                  >
                    <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
                    <div className="absolute -top-10 -right-10 w-28 h-28 bg-amber-600/20 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/35 transition-all" />

                    {/* Top Row: 3D Squircle Icon + Rank Badge */}
                    <div className="flex items-center justify-between relative z-10">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500/30 via-orange-600/20 to-yellow-600/25 border border-amber-400/40 text-amber-300 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.35)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        <Flame className="w-5 h-5 text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)] animate-pulse" />
                      </div>
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/35 text-amber-300 text-[10px] font-black tracking-wide shadow-sm">
                        <span>👑 Top 5%</span>
                      </div>
                    </div>

                    {/* Middle: Big Stat Number */}
                    <div className="relative z-10 my-2">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)] font-sans">
                          12
                        </span>
                        <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 bg-amber-500/20 px-1.5 py-0.5 rounded-md border border-amber-400/30 flex items-center gap-1">
                          DAYS <span className="text-xs">🔥</span>
                        </span>
                      </div>
                    </div>

                    {/* Bottom Row: Label + Multiplier Pill */}
                    <div className="flex items-end justify-between relative z-10 pt-1 border-t border-amber-500/15">
                      <div className="flex flex-col">
                        <span className="text-[11px] text-slate-300 font-semibold group-hover:text-amber-200 transition-colors">
                          Daily Streak
                        </span>
                        <span className="text-[9px] text-amber-400/80 font-mono">
                          Personal Best!
                        </span>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/15 border border-amber-400/30 text-amber-300 text-[9px] font-black uppercase tracking-wider">
                        <Zap className="w-2.5 h-2.5 text-amber-400 fill-amber-400 animate-bounce" />
                        <span>2x XP Boost</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 4: Overall Level */}
                  <div 
                    onClick={() => setActiveTab("progress")}
                    className="p-4 sm:p-5 rounded-3xl bg-gradient-to-b from-[#10253d]/95 via-[#0b1b2d]/90 to-[#06101c]/95 border border-cyan-500/40 hover:border-cyan-400 shadow-xl shadow-cyan-950/30 hover:shadow-cyan-600/20 relative overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 cursor-pointer flex flex-col justify-between min-h-[142px] group"
                  >
                    <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
                    <div className="absolute -top-10 -right-10 w-28 h-28 bg-cyan-600/20 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/35 transition-all" />

                    {/* Top Row: 3D Squircle Icon + CEFR Badge */}
                    <div className="flex items-center justify-between relative z-10">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500/30 via-blue-600/20 to-indigo-600/25 border border-cyan-400/40 text-cyan-300 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.35)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        <Award className="w-5 h-5 text-cyan-300 drop-shadow-[0_0_8px_rgba(103,232,249,0.8)] stroke-[2.5]" />
                      </div>
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-[10px] font-black font-mono shadow-sm">
                        <span>CEFR B2</span>
                      </div>
                    </div>

                    {/* Middle: Big Stat Text */}
                    <div className="relative z-10 my-2">
                      <div className="flex items-baseline gap-1.5 truncate">
                        <span className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)] font-sans truncate">
                          Intermediate
                        </span>
                        <span className="text-[10px] font-bold text-cyan-300 bg-cyan-500/20 px-1.5 py-0.5 rounded border border-cyan-400/30">
                          68%
                        </span>
                      </div>
                    </div>

                    {/* Bottom Row: Label + Glowing XP Progress Bar */}
                    <div className="flex flex-col relative z-10 pt-1 border-t border-cyan-500/15 space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-300 font-semibold group-hover:text-cyan-200 transition-colors">
                          Fluency Tier
                        </span>
                        <span className="text-[9px] text-cyan-300 font-bold font-mono">
                          2.4k / 3k XP
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-900/80 p-0.5 border border-cyan-500/20 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 rounded-full shadow-[0_0_8px_#38bdf8] transition-all duration-500"
                          style={{ width: "68%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. YOUR LEARNING PROGRESS & QUICK ACTIONS ROW */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                  {/* Your Learning Progress Chart (7 cols) */}
                  <div className="md:col-span-7 p-5 rounded-3xl bg-gradient-to-br from-[#111827] via-[#0D172A] to-[#111E38] border border-cyan-500/30 shadow-xl flex flex-col justify-between space-y-4 relative overflow-hidden group/chart">
                    {/* Ambient Neon Glow */}
                    <div className="absolute -top-10 -left-10 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                    {/* Header: Title + Metric Switcher Tabs */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-emerald-500/25">
                          <TrendingUp className="w-4.5 h-4.5 stroke-[2.5]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-xs text-white">Your Learning Progress</h3>
                            <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                              +24.8% This Mo
                            </span>
                          </div>
                          <span className="text-[10px] text-cyan-300/80 font-medium">
                            Global Cohort: Top 5% • High Retention
                          </span>
                        </div>
                      </div>

                      {/* Interactive Metric Switcher Pills */}
                      <div className="flex items-center gap-1 bg-slate-950/80 border border-slate-800/80 p-1 rounded-xl">
                        {(["fluency", "time", "xp"] as const).map((m) => {
                          const isActive = learningChartMetric === m;
                          const titles = {
                            fluency: "Fluency",
                            time: "Practice Time",
                            xp: "Mastery XP",
                          };
                          return (
                            <button
                              key={m}
                              onClick={() => {
                                setLearningChartMetric(m);
                                setHoveredChartPointIndex(null);
                              }}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                                isActive
                                  ? m === "fluency"
                                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30"
                                    : m === "time"
                                    ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30"
                                    : "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30"
                                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                              }`}
                            >
                              {titles[m]}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 3 Key Metric Micro-Cards */}
                    <div className="grid grid-cols-3 gap-2 relative z-10">
                      {learningDatasets[learningChartMetric].kpis.map((kpi, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between"
                        >
                          <span className="text-[10px] text-slate-400 font-medium truncate">{kpi.label}</span>
                          <div className="flex items-baseline gap-1 mt-0.5">
                            <span className={`text-sm sm:text-base font-black ${kpi.color}`}>
                              {kpi.value}
                            </span>
                          </div>
                          <span className="text-[9px] text-emerald-400 font-semibold truncate mt-0.5">
                            {kpi.change}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Smooth Spline Chart Area */}
                    <div className="relative pt-2 relative z-10">
                      {/* Floating Active Hover Tooltip */}
                      {hoveredChartPointIndex !== null ? (
                        <div
                          className="absolute -top-3 px-2.5 py-1 rounded-xl bg-slate-900 border border-cyan-400 text-white text-[10px] font-bold shadow-xl shadow-cyan-500/20 z-20 pointer-events-none transition-all duration-200 -translate-x-1/2"
                          style={{
                            left: `${(learningDatasets[learningChartMetric].points[hoveredChartPointIndex].cx / 400) * 100}%`,
                          }}
                        >
                          <span className="text-cyan-300">
                            {learningDatasets[learningChartMetric].points[hoveredChartPointIndex].note}
                          </span>
                        </div>
                      ) : (
                        <div className="absolute top-0 right-4 px-2 py-0.5 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-[9.5px] font-black shadow-md flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                          <span>Current: {learningDatasets[learningChartMetric].points[5].value}</span>
                        </div>
                      )}

                      <svg className="w-full h-40 overflow-visible" viewBox="0 0 400 150">
                        <defs>
                          <linearGradient id="chartSplineGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop
                              offset="0%"
                              stopColor={learningDatasets[learningChartMetric].color}
                              stopOpacity="0.4"
                            />
                            <stop
                              offset="100%"
                              stopColor={learningDatasets[learningChartMetric].color}
                              stopOpacity="0.0"
                            />
                          </linearGradient>
                        </defs>

                        {/* Horizontal Grid lines */}
                        <line x1="40" y1="20" x2="385" y2="20" stroke="#1F2937" strokeDasharray="3 3" opacity="0.7" />
                        <line x1="40" y1="55" x2="385" y2="55" stroke="#1F2937" strokeDasharray="3 3" opacity="0.7" />
                        <line x1="40" y1="90" x2="385" y2="90" stroke="#1F2937" strokeDasharray="3 3" opacity="0.7" />
                        <line x1="40" y1="125" x2="385" y2="125" stroke="#1F2937" strokeDasharray="3 3" opacity="0.7" />

                        {/* Y-axis Labels */}
                        <text x="5" y="23" fill="#64748B" fontSize="9" fontWeight="bold">100%</text>
                        <text x="10" y="58" fill="#64748B" fontSize="9" fontWeight="bold">75%</text>
                        <text x="10" y="93" fill="#64748B" fontSize="9" fontWeight="bold">50%</text>
                        <text x="10" y="128" fill="#64748B" fontSize="9" fontWeight="bold">25%</text>

                        {/* Spline Area Fill */}
                        <path
                          d={learningDatasets[learningChartMetric].areaD}
                          fill="url(#chartSplineGradient)"
                          className="transition-all duration-300"
                        />

                        {/* Spline Line */}
                        <path
                          d={learningDatasets[learningChartMetric].pathD}
                          fill="none"
                          stroke={learningDatasets[learningChartMetric].color}
                          strokeWidth="3"
                          strokeLinecap="round"
                          className="transition-all duration-300 drop-shadow-[0_4px_10px_rgba(56,189,248,0.5)]"
                        />

                        {/* Data Points */}
                        {learningDatasets[learningChartMetric].points.map((pt, idx) => {
                          const isHovered = hoveredChartPointIndex === idx;
                          const isLast = idx === 5;
                          return (
                            <g
                              key={idx}
                              className="cursor-pointer group"
                              onMouseEnter={() => setHoveredChartPointIndex(idx)}
                              onMouseLeave={() => setHoveredChartPointIndex(null)}
                            >
                              {/* Invisible touch/hover hit zone */}
                              <circle cx={pt.cx} cy={pt.cy} r="14" fill="transparent" />

                              {/* Outer glow ring on hover or last */}
                              {(isHovered || isLast) && (
                                <circle
                                  cx={pt.cx}
                                  cy={pt.cy}
                                  r={isHovered ? "8" : "6"}
                                  fill={learningDatasets[learningChartMetric].color}
                                  opacity="0.3"
                                  className={isLast ? "animate-ping" : ""}
                                />
                              )}

                              {/* Core dot */}
                              <circle
                                cx={pt.cx}
                                cy={pt.cy}
                                r={isHovered ? "5" : isLast ? "4.5" : "3.5"}
                                fill={isHovered ? "#FFFFFF" : learningDatasets[learningChartMetric].color}
                                stroke={learningDatasets[learningChartMetric].color}
                                strokeWidth="2"
                                className="transition-all duration-200"
                              />
                            </g>
                          );
                        })}
                      </svg>

                      {/* X-axis date labels */}
                      <div className="flex justify-between text-[10px] text-slate-400 px-6 pt-1 font-mono">
                        {learningDatasets[learningChartMetric].points.map((pt, idx) => (
                          <span
                            key={idx}
                            onMouseEnter={() => setHoveredChartPointIndex(idx)}
                            onMouseLeave={() => setHoveredChartPointIndex(null)}
                            className={`cursor-pointer transition-colors ${
                              hoveredChartPointIndex === idx ? "text-cyan-300 font-bold" : "hover:text-slate-200"
                            }`}
                          >
                            {pt.label}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* AI Insight Callout */}
                    <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-between text-[10.5px] text-cyan-200 relative z-10">
                      <div className="flex items-center gap-2 truncate">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">
                          {learningDatasets[learningChartMetric].insight}
                        </span>
                      </div>
                      <span className="text-[9.5px] text-cyan-400 font-bold shrink-0 hidden sm:inline">
                        AI Adaptive Engine ✓
                      </span>
                    </div>
                  </div>

                  {/* Quick Actions (5 cols) */}
                  <div className="md:col-span-5 p-5 rounded-3xl bg-gradient-to-br from-[#111827] via-[#0E1629] to-[#151D38] border border-amber-500/30 shadow-xl flex flex-col justify-between space-y-3.5 relative overflow-hidden group/actions">
                    {/* Ambient Gold Glow */}
                    <div className="absolute -top-10 -right-10 w-44 h-44 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

                    {/* Header */}
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-amber-500/25">
                          <Zap className="w-4.5 h-4.5 fill-slate-950" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-xs text-white">Quick Actions</h3>
                            <span className="text-[9px] font-bold text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full">
                              Instant Launch
                            </span>
                          </div>
                          <span className="text-[10px] text-amber-200/80 font-medium">
                            Sub-20ms Real-Time Voice & Drills
                          </span>
                        </div>
                      </div>

                      <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        Nano Ready
                      </span>
                    </div>

                    {/* 2x2 Feature Action Tiles */}
                    <div className="grid grid-cols-2 gap-2.5 relative z-10">
                      {/* Tile 1: Start Speaking Practice */}
                      <button
                        onClick={() => launchTopicByKeyword("cricket")}
                        className="p-3 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white flex flex-col justify-between text-left gap-2 border border-blue-400/30 shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] group"
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Mic className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-[8.5px] font-bold bg-blue-400/20 border border-blue-300/30 text-blue-100 px-1.5 py-0.2 rounded-full">
                            ⚡ AI Voice
                          </span>
                        </div>
                        <div>
                          <span className="font-black text-xs block text-white leading-tight">
                            Speaking Practice
                          </span>
                          <span className="text-[9.5px] text-blue-100/80 font-medium mt-0.5 block line-clamp-1">
                            14ms Nano Coach
                          </span>
                        </div>
                      </button>

                      {/* Tile 2: Learn Vocabulary */}
                      <button
                        onClick={() => setActiveTab("vocabulary")}
                        className="p-3 rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white flex flex-col justify-between text-left gap-2 border border-emerald-400/30 shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02] group"
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <BookOpen className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-[8.5px] font-bold bg-emerald-400/20 border border-emerald-300/30 text-emerald-100 px-1.5 py-0.2 rounded-full">
                            +150 XP
                          </span>
                        </div>
                        <div>
                          <span className="font-black text-xs block text-white leading-tight">
                            Learn Vocabulary
                          </span>
                          <span className="text-[9.5px] text-emerald-100/80 font-medium mt-0.5 block line-clamp-1">
                            Spaced Repetition
                          </span>
                        </div>
                      </button>

                      {/* Tile 3: Grammar Exercises */}
                      <button
                        onClick={() => setActiveTab("grammar")}
                        className="p-3 rounded-2xl bg-gradient-to-br from-purple-600 via-violet-700 to-indigo-800 hover:from-purple-500 hover:to-violet-600 text-white flex flex-col justify-between text-left gap-2 border border-purple-400/30 shadow-lg shadow-purple-600/20 transition-all hover:scale-[1.02] group"
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <GraduationCap className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-[8.5px] font-bold bg-purple-400/20 border border-purple-300/30 text-purple-100 px-1.5 py-0.2 rounded-full">
                            Level B2
                          </span>
                        </div>
                        <div>
                          <span className="font-black text-xs block text-white leading-tight">
                            Grammar Drills
                          </span>
                          <span className="text-[9.5px] text-purple-100/80 font-medium mt-0.5 block line-clamp-1">
                            Adaptive Fixes
                          </span>
                        </div>
                      </button>

                      {/* Tile 4: Chat with AI */}
                      <button
                        onClick={() => launchTopicByKeyword("travel")}
                        className="p-3 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-600 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-white flex flex-col justify-between text-left gap-2 border border-amber-400/30 shadow-lg shadow-amber-600/20 transition-all hover:scale-[1.02] group"
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <MessageCircle className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-[8.5px] font-bold bg-amber-400/20 border border-amber-300/30 text-amber-100 px-1.5 py-0.2 rounded-full">
                            4 Online
                          </span>
                        </div>
                        <div>
                          <span className="font-black text-xs block text-white leading-tight">
                            Chat with AI
                          </span>
                          <span className="text-[9.5px] text-amber-100/80 font-medium mt-0.5 block line-clamp-1">
                            Roleplay Scenarios
                          </span>
                        </div>
                      </button>
                    </div>

                    {/* Instant Lightning Drill Banner */}
                    <button
                      onClick={() => launchTopicByKeyword("travel")}
                      className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/25 to-yellow-500/20 border border-amber-400/40 text-amber-200 flex items-center justify-between text-[11px] font-bold hover:scale-[1.01] transition-all shadow-md shadow-amber-500/10 cursor-pointer relative z-10"
                    >
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>Daily Sprint: 2-min Fluency Warmup</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black text-[10px] shadow">
                        Launch (+100 XP) →
                      </span>
                    </button>
                  </div>
                </div>

                {/* 4. RECENT ACTIVITY & DELUXE ACHIEVEMENTS SHOWCASE ROW */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                  {/* Left: Deluxe Recent Speaking Activity Feed (5 cols of 12) */}
                  <div className="md:col-span-5 p-5 rounded-3xl bg-gradient-to-br from-[#111827] via-[#0D172A] to-[#0F1E36] border border-cyan-500/30 shadow-xl flex flex-col justify-between space-y-3.5 relative overflow-hidden group/recent">
                    {/* Ambient High-Tech Glow */}
                    <div className="absolute -top-10 -left-10 w-44 h-44 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                    {/* Header */}
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-cyan-500/25">
                          <Headphones className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-xs text-white">Recent Activity</h3>
                            <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                              3 Today
                            </span>
                          </div>
                          <span className="text-[10px] text-cyan-300/80 font-medium">
                            2.5 hrs spoken • Avg 96.5% Fluency
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedReviewSession(defaultRecentSessions[0])}
                        className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 group"
                        title="Open Detailed AI Session Review"
                      >
                        <span>Review</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>

                    {/* 3 Rich Interactive Session Cards */}
                    <div className="space-y-2 relative z-10">
                      {defaultRecentSessions.map((session) => {
                        const isAudioPlaying = playingSessionAudioId === session.id;
                        return (
                          <div
                            key={session.id}
                            onClick={() => setSelectedReviewSession(session)}
                            className="p-2.5 sm:p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all duration-200 cursor-pointer group flex items-center justify-between gap-2.5 shadow-sm"
                          >
                            {/* Left: Avatar with Flag & Details */}
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="relative shrink-0">
                                <img
                                  src={session.coachAvatar}
                                  alt={session.coachName}
                                  className="w-9 h-9 rounded-xl object-cover border border-slate-700/80 group-hover:border-cyan-400/60 transition-colors shadow-sm"
                                />
                                <span className="absolute -bottom-1 -right-1 text-[10px] leading-none drop-shadow">
                                  {session.coachFlag}
                                </span>
                              </div>

                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="font-bold text-[11px] text-white group-hover:text-cyan-300 transition-colors truncate max-w-[130px] sm:max-w-[170px]">
                                    {session.topicTitle}
                                  </span>
                                  {session.engine === "ON_DEVICE_NANO" ? (
                                    <span className="inline-flex items-center gap-0.5 text-[8px] font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.2 rounded-full">
                                      <Zap className="w-2.5 h-2.5 text-emerald-400" />
                                      Nano ({session.latencyMs}ms)
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-0.5 text-[8px] font-bold text-cyan-300 bg-cyan-500/15 border border-cyan-500/30 px-1.5 py-0.2 rounded-full">
                                      <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                                      Cloud Flash
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center gap-1.5 mt-0.5 text-[9.5px] text-slate-400">
                                  <span className="text-slate-300 font-medium">{session.coachName.replace("Coach ", "")}</span>
                                  <span>•</span>
                                  <span className="font-mono text-slate-400">{session.durationFormatted}</span>
                                  <span>•</span>
                                  <span className="text-slate-500">{session.timeAgo}</span>
                                </div>
                              </div>
                            </div>

                            {/* Right: Score Pill + Audio Play + Action */}
                            <div className="flex items-center gap-1.5 shrink-0">
                              {/* Fluency Badge */}
                              <div className="px-1.5 py-0.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-black text-[10px] flex items-center gap-1">
                                <span>{session.fluencyScore}%</span>
                                <span className="text-[8.5px] text-emerald-400 font-bold">{session.grade}</span>
                              </div>

                              {/* Audio Speech Button */}
                              <button
                                onClick={(e) => handleToggleAudioPreview(e, session)}
                                title={isAudioPlaying ? "Stop Voice Feedback" : "Listen to Coach Voice Review"}
                                className={`w-6.5 h-6.5 p-1 rounded-xl flex items-center justify-center transition-all ${
                                  isAudioPlaying
                                    ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/40 animate-pulse"
                                    : "bg-slate-800/80 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-300 border border-slate-700/60"
                                }`}
                              >
                                {isAudioPlaying ? (
                                  <Pause className="w-3 h-3" />
                                ) : (
                                  <Volume2 className="w-3 h-3" />
                                )}
                              </button>

                              {/* Review Chevron */}
                              <div className="w-5 h-5 rounded-lg bg-slate-800/40 group-hover:bg-cyan-500/20 text-slate-500 group-hover:text-cyan-300 flex items-center justify-center transition-all">
                                <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Footer Stats Bar */}
                    <div className="pt-1.5 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800/60 relative z-10">
                      <div className="flex items-center gap-2">
                        <span>Total: <b className="text-white font-mono">48 Calls</b></span>
                        <span>•</span>
                        <span className="text-amber-300 font-bold">+1,250 XP Today</span>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-400 font-bold text-[9.5px]">
                        <Check className="w-3 h-3" />
                        <span>Firestore Synced</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Deluxe 3D Achievements Trophy Showcase (7 cols of 12) */}
                  <div className="md:col-span-7 p-5 rounded-3xl bg-gradient-to-br from-[#111827] via-[#0D1527] to-[#121B35] border border-amber-500/30 shadow-xl space-y-4 flex flex-col justify-between relative overflow-hidden">
                    {/* Ambient Trophy Gold Glow */}
                    <div className="absolute -top-10 -right-10 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                    {/* Card Header */}
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-amber-500/25">
                          <Trophy className="w-4.5 h-4.5 fill-slate-950" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-xs text-white">Achievements Showcase</h3>
                            <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/15 border border-cyan-500/30 px-2 py-0.2 rounded-full">
                              {achievements.filter(a => a.isUnlocked).length} / 20 Unlocked
                            </span>
                          </div>
                          <span className="text-[10px] text-amber-300/90 font-medium">
                            {totalXp.toLocaleString()} Total XP Earned
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => setActiveTab("achievements")}
                        className="text-[11px] font-bold text-amber-400 hover:text-yellow-300 transition-colors flex items-center gap-1 group"
                        title="View All 20 Achievements"
                      >
                        <span>View All 20</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>

                    {/* Unclaimed Badges Alert Bar */}
                    {achievements.some(a => a.isUnlocked && !a.isClaimed) && (
                      <button
                        onClick={() => {
                          const firstUnclaimed = achievements.find(a => a.isUnlocked && !a.isClaimed);
                          if (firstUnclaimed) setActiveClaimModalBadge(firstUnclaimed);
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500/20 via-yellow-500/25 to-amber-500/20 border border-amber-400/50 text-amber-200 flex items-center justify-between text-[11px] font-bold hover:scale-[1.01] transition-all shadow-md shadow-amber-500/15 animate-pulse relative z-10"
                      >
                        <div className="flex items-center gap-1.5">
                          <span>🎁</span>
                          <span>{achievements.filter(a => a.isUnlocked && !a.isClaimed).length} Badges Ready to Claim!</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black text-[10px] shadow">
                          Claim Rewards (+{achievements.filter(a => a.isUnlocked && !a.isClaimed).length * 250} XP) →
                        </span>
                      </button>
                    )}

                    {/* 5 Big Glowing 3D Jewel Badges Showcase */}
                    <div className="grid grid-cols-5 gap-2 relative z-10 pt-1">
                      {achievements.slice(0, 5).map((badge) => {
                        const isReady = badge.isUnlocked && !badge.isClaimed;
                        return (
                          <button
                            key={badge.id}
                            onClick={() => {
                              if (isReady) {
                                setActiveClaimModalBadge(badge);
                              } else {
                                setActiveTab("achievements");
                              }
                            }}
                            className="flex flex-col items-center text-center group cursor-pointer"
                            title={`${badge.title} (${badge.isClaimed ? "Claimed" : isReady ? "Click to Claim!" : "Locked"})`}
                          >
                            {/* 3D Glowing Hexagon / Jewel Orb */}
                            <div
                              className={`w-12 h-12 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 relative ${
                                badge.isClaimed
                                  ? `bg-gradient-to-tr ${badge.gradient} border-2 border-white/30 shadow-lg ${badge.glow}`
                                  : isReady
                                  ? "bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 border-2 border-white shadow-xl shadow-amber-500/40 animate-bounce ring-2 ring-amber-400 ring-offset-2 ring-offset-[#111827]"
                                  : "bg-slate-900 border border-slate-800 text-slate-600 opacity-60"
                              }`}
                            >
                              {renderBadgeIcon(badge.iconType, `w-5 h-5 sm:w-6 sm:h-6 ${badge.isClaimed ? "text-white fill-white/20 drop-shadow" : isReady ? "text-slate-950 fill-slate-950" : "text-slate-500"}`)}

                              {/* Claimed Tick Badge in Corner */}
                              {badge.isClaimed && (
                                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-black border border-slate-950 shadow">
                                  ✓
                                </div>
                              )}

                              {/* Unclaimed Alert Badge in Corner */}
                              {isReady && (
                                <div className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 rounded-full bg-red-500 text-white flex items-center justify-center text-[9px] font-black border border-white shadow animate-ping">
                                  !
                                </div>
                              )}
                            </div>

                            {/* Badge Title */}
                            <span className="text-[10px] font-bold text-slate-200 mt-1.5 truncate max-w-[65px] group-hover:text-amber-300 transition-colors">
                              {badge.title.split(" ")[0]}
                            </span>

                            {/* XP Pill */}
                            <span className="text-[8px] font-bold text-amber-400 bg-amber-500/10 px-1 py-0.2 rounded-full mt-0.5 border border-amber-500/20">
                              +{badge.xpReward} XP
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Level 4 XP Progress Bar */}
                    <div className="pt-2 border-t border-slate-800/80 space-y-1 relative z-10">
                      <div className="flex items-center justify-between text-[10px]">
                        <div className="flex items-center gap-1.5">
                          <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span className="font-bold text-white">Level 4: Fluent Speaker</span>
                        </div>
                        <span className="font-mono font-bold text-cyan-400">2,450 / 3,000 XP (81%)</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-950 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-400 via-yellow-400 to-emerald-400 rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(250,204,21,0.5)]"
                          style={{ width: "81%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN (4 cols in 12-col grid): Your Streak, Upcoming Lesson & Sprint Targets */}
              <div className="lg:col-span-4 space-y-6">
                {/* 1. YOUR STREAK CARD (Adaptive Tier Badge & Expiry System) */}
                <div
                  className={`p-6 rounded-3xl border text-center relative overflow-hidden space-y-4 shadow-xl transition-all duration-300 ${
                    isPremiumMember
                      ? "bg-gradient-to-b from-[#121629] to-[#0D111E] border-amber-500/35 ring-1 ring-amber-400/20"
                      : "bg-[#111827] border-slate-800/80"
                  }`}
                >
                  {/* Ambient Aura: Violet/Gold for Premium, Amber for Free */}
                  <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full pointer-events-none animate-flame-glow ${
                      isPremiumMember
                        ? "bg-gradient-to-tr from-amber-500/25 via-purple-600/25 to-pink-500/20"
                        : "bg-orange-600/15"
                    }`}
                  />

                  {/* Top Header with Interactive Tier Switcher Badge */}
                  <div className="flex items-center justify-between text-left relative z-10">
                    <div className="flex items-center gap-2">
                      <Flame
                        className={`w-4 h-4 animate-pulse ${
                          isPremiumMember ? "text-amber-400 fill-amber-400" : "text-orange-500 fill-orange-500"
                        }`}
                      />
                      <h3 className="font-bold text-xs text-white">Your Streak</h3>
                    </div>

                    {/* Dynamic Membership Tier Pill (Clickable to demo toggle Free vs Pro!) */}
                    <button
                      onClick={toggleMembershipTier}
                      title="Click to toggle between Free Explorer and VIP Pro Member"
                      className={`text-[10px] font-black px-2.5 py-1 rounded-full border flex items-center gap-1.5 shadow-md transition-all hover:scale-105 active:scale-95 ${
                        isPremiumMember
                          ? "bg-gradient-to-r from-amber-500/20 via-purple-500/25 to-pink-500/20 border-amber-400/50 text-amber-300 shadow-amber-500/10"
                          : "bg-slate-800 text-slate-300 border-slate-700"
                      }`}
                    >
                      {isPremiumMember ? (
                        <>
                          <Crown className="w-3 h-3 text-amber-400 fill-amber-400 animate-pulse" />
                          <span>👑 VIP PRO</span>
                        </>
                      ) : (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                          <span>Free Explorer</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* LIVE ANIMATED BURNING FLAME BADGE */}
                  <div className="relative py-2 flex flex-col items-center justify-center">
                    <div className="relative w-36 h-36 flex items-center justify-center">
                      {/* Floating Crown above flame when VIP PRO */}
                      {isPremiumMember && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 animate-bounce">
                          <div className="p-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 shadow-[0_0_15px_#facc15] text-slate-950">
                            <Crown className="w-3.5 h-3.5 fill-slate-950" />
                          </div>
                        </div>
                      )}

                      {/* Rising Fire Sparks / Embers */}
                      <span className="absolute top-6 left-12 w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_#fde047] animate-ember-1 pointer-events-none" />
                      <span
                        className={`absolute top-8 right-12 w-2 h-2 rounded-full shadow-[0_0_10px_#f97316] animate-ember-2 pointer-events-none ${
                          isPremiumMember ? "bg-purple-300 shadow-[0_0_10px_#c084fc]" : "bg-orange-400"
                        }`}
                      />
                      <span className="absolute top-4 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-yellow-200 shadow-[0_0_6px_#fef08a] animate-ember-3 pointer-events-none" />

                      {/* Animated SVG Fire */}
                      <svg viewBox="0 0 200 200" className="w-full h-full select-none pointer-events-none overflow-visible">
                        <defs>
                          <radialGradient id="haloBurn" cx="50%" cy="58%" r="50%">
                            <stop offset="0%" stopColor={isPremiumMember ? "#c084fc" : "#fb923c"} stopOpacity="0.4" />
                            <stop offset="50%" stopColor="#ea580c" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                          </radialGradient>
                          <radialGradient id="innerBallBurn" cx="50%" cy="45%" r="55%">
                            <stop offset="0%" stopColor={isPremiumMember ? "#2e1065" : "#3d1405"} />
                            <stop offset="65%" stopColor="#1a0b2e" />
                            <stop offset="100%" stopColor="#0b0314" />
                          </radialGradient>
                          <linearGradient id="flameRingBurn" x1="0%" y1="100%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor={isPremiumMember ? "#a855f7" : "#dc2626"} />
                            <stop offset="35%" stopColor="#ea580c" />
                            <stop offset="70%" stopColor="#f97316" />
                            <stop offset="100%" stopColor="#fde047" />
                          </linearGradient>
                          <linearGradient id="mainFlameBurn" x1="0%" y1="100%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor="#c2410c" />
                            <stop offset="30%" stopColor="#ea580c" />
                            <stop offset="60%" stopColor="#f59e0b" />
                            <stop offset="90%" stopColor="#fef08a" />
                            <stop offset="100%" stopColor="#ffffff" />
                          </linearGradient>
                          <filter id="fireGlowBurn" x="-30%" y="-30%" width="160%" height="160%">
                            <feGaussianBlur stdDeviation="5" result="blur" />
                            <feMerge>
                              <feMergeNode in="blur" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>

                        {/* Ambient Halo */}
                        <circle cx="100" cy="115" r="75" fill="url(#haloBurn)" />

                        {/* Left Dancing Flame */}
                        <path
                          d="M 72 32 C 55 58, 48 85, 58 116 C 62 92, 70 70, 72 32 Z"
                          fill="url(#flameRingBurn)"
                          opacity="0.95"
                          className="animate-flame-left"
                        />
                        {/* Right Dancing Flame */}
                        <path
                          d="M 128 32 C 145 58, 152 85, 142 116 C 138 92, 130 70, 128 32 Z"
                          fill="url(#flameRingBurn)"
                          opacity="0.95"
                          className="animate-flame-right"
                        />
                        {/* Center Dominant Flame Lick */}
                        <path
                          d="M 100 12 C 82 45, 68 75, 78 112 C 82 85, 94 55, 100 12 Z"
                          fill="url(#mainFlameBurn)"
                          filter="url(#fireGlowBurn)"
                          className="animate-flame-center"
                        />
                        {/* Hot Inner Flame Spikes */}
                        <path
                          d="M 88 28 C 78 52, 74 76, 84 105 C 88 80, 96 60, 88 28 Z"
                          fill="#fef08a"
                          opacity="0.9"
                          className="animate-flame-left"
                        />
                        <path
                          d="M 112 28 C 122 52, 126 76, 116 105 C 112 80, 104 60, 112 28 Z"
                          fill="#fef08a"
                          opacity="0.9"
                          className="animate-flame-right"
                        />

                        {/* Fiery Burning Ring */}
                        <circle
                          cx="100"
                          cy="115"
                          r="54"
                          fill="url(#innerBallBurn)"
                          stroke="url(#flameRingBurn)"
                          strokeWidth="4.5"
                          filter="url(#fireGlowBurn)"
                        />
                        <circle
                          cx="100"
                          cy="115"
                          r="49"
                          fill="none"
                          stroke={isPremiumMember ? "#a855f7" : "#ea580c"}
                          strokeWidth="1.5"
                          strokeDasharray="4 2"
                          opacity="0.5"
                        />
                      </svg>

                      {/* 100% Vector Crisp Text Inside the Fiery Orb */}
                      <div className="absolute inset-0 pt-7 flex flex-col items-center justify-center pointer-events-none z-10">
                        <span className="text-3xl sm:text-4xl font-black text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] animate-pulse">
                          12
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-black text-amber-300 uppercase tracking-widest -mt-1 drop-shadow">
                          Days
                        </span>
                        {/* Dynamic Multiplier Badge */}
                        <span
                          className={`text-[8px] font-black px-1.5 py-0.2 rounded-full mt-0.5 shadow-sm ${
                            isPremiumMember
                              ? "bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black"
                              : "bg-slate-800 text-slate-400 border border-slate-700"
                          }`}
                        >
                          {isPremiumMember ? "2x XP BOOST" : "1x XP"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="font-bold text-xs text-white relative z-10 flex items-center justify-center gap-1.5">
                    <span>Keep going! You're on fire!</span>
                    <span className="animate-bounce">🔥</span>
                  </p>

                  {/* DYNAMIC MEMBERSHIP & PACKAGE EXPIRY DETAILS BOX */}
                  {isPremiumMember ? (
                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-950/70 via-slate-900/90 to-purple-950/60 border border-amber-500/30 text-left space-y-2 relative z-10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span className="text-[11px] font-bold text-white">{premiumPlanName}</span>
                        </div>
                        <span className="text-[9px] font-extrabold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.2 rounded-full flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          Active
                        </span>
                      </div>

                      {/* Package Expiry Date & Countdown */}
                      <div className="p-2 rounded-xl bg-slate-950/75 border border-slate-800/90 flex items-center justify-between text-[10px]">
                        <div className="flex items-center gap-1.5 text-slate-300">
                          <Calendar className="w-3 h-3 text-cyan-400" />
                          <span>Renews: <b className="text-white">Jan 15, 2027</b></span>
                        </div>
                        <span className="font-mono font-bold text-amber-300 bg-amber-500/15 px-1.5 py-0.2 rounded border border-amber-500/25">
                          {getDaysUntilExpiry(premiumExpiryDate)} Days Left
                        </span>
                      </div>

                      {/* Streak Freeze & Perks Status */}
                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                        <span className="flex items-center gap-1">
                          <Shield className="w-3 h-3 text-cyan-400" />
                          Streak Freeze:
                        </span>
                        <span className="font-bold text-cyan-300">{streakFreezesCount}/2 Protected 🛡️</span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-blue-500/10 border border-amber-500/30 text-left space-y-2 relative z-10">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                          <Crown className="w-3.5 h-3.5 text-amber-400" />
                          Upgrade to VIP Pro
                        </span>
                        <span className="text-[9px] font-bold text-slate-400">Unlock 2x XP</span>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-relaxed">
                        Get Streak Freeze protection so you never lose your 12-day streak when busy!
                      </p>
                      <button
                        onClick={() => setShowVipModal(true)}
                        className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-[11px] shadow-lg shadow-amber-500/20 flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02]"
                      >
                        <Crown className="w-3.5 h-3.5 fill-slate-950" />
                        <span>Unlock Pro Package ($9.99/mo) →</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* 2. TODAY'S LIVE AI VOICE CHALLENGE (Daily Coach on Call) */}
                <div className="p-5 rounded-3xl bg-gradient-to-br from-[#111827] via-[#0E1629] to-[#151E3D] border border-indigo-500/35 shadow-xl space-y-4 relative overflow-hidden group/voice-challenge">
                  {/* Ambient Cyber Violet Glow */}
                  <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                  {/* Header: Title + Live Status */}
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/25">
                        <PhoneCall className="w-4 h-4 animate-bounce" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xs text-white">Daily Voice Challenge</h3>
                        <span className="text-[10px] text-indigo-300 font-medium">
                          Today&apos;s AI Roleplay Sprint
                        </span>
                      </div>
                    </div>

                    <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Coach Online
                    </span>
                  </div>

                  {/* Featured Coach on Duty Banner */}
                  <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between gap-3 relative z-10">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative shrink-0">
                        <img
                          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                          alt="Coach Sophia Miller"
                          className="w-10 h-10 rounded-xl object-cover border border-indigo-400/50 shadow-md"
                        />
                        <span className="absolute -bottom-1 -right-1 text-[11px] leading-none drop-shadow">
                          🇺🇸
                        </span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs text-white truncate">
                            Coach Sophia Miller
                          </span>
                        </div>
                        <span className="text-[9.5px] text-slate-400 block truncate font-medium">
                          Executive Speech &amp; VC Pitch Coach
                        </span>
                      </div>
                    </div>

                    {/* Live Audio Challenge Preview Button */}
                    <button
                      onClick={handleToggleChallengeAudio}
                      title={isPlayingChallengeAudio ? "Stop Audio Briefing" : "Listen to Coach Sophia's Briefing"}
                      className={`px-2 py-1 rounded-xl text-[9px] font-bold flex items-center gap-1 transition-all shrink-0 ${
                        isPlayingChallengeAudio
                          ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/40 animate-pulse"
                          : "bg-slate-800 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30"
                      }`}
                    >
                      {isPlayingChallengeAudio ? (
                        <>
                          <Pause className="w-3 h-3" />
                          <span>Playing</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3 h-3" />
                          <span>Briefing 🔊</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Challenge Mission Details */}
                  <div className="space-y-2 p-3 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 relative z-10">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded-full border border-indigo-400/30">
                        💼 Business Pitching
                      </span>
                      <span className="font-mono text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        3-5 min sprint
                      </span>
                    </div>

                    <h4 className="font-black text-sm text-white leading-snug">
                      &ldquo;Pitching Hybrid AI to Silicon Valley VCs&rdquo;
                    </h4>

                    <p className="text-[11px] text-slate-300 leading-relaxed font-serif italic">
                      &ldquo;Explain why on-device Gemini Nano guarantees sub-20ms voice response with 100% privacy.&rdquo;
                    </p>

                    {/* Target & Reward Bar */}
                    <div className="pt-1.5 flex items-center justify-between text-[10px] text-amber-300 border-t border-indigo-500/20 font-bold">
                      <span className="flex items-center gap-1">
                        <Target className="w-3 h-3 text-emerald-400" />
                        Target: Fluency 90%+ (A)
                      </span>
                      <span className="flex items-center gap-1 text-amber-400">
                        <Sparkles className="w-3 h-3" />
                        +250 XP Reward
                      </span>
                    </div>
                  </div>

                  {/* Primary 1-Click Call CTA Button */}
                  <button
                    onClick={() => launchTopicByKeyword("business")}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black text-xs shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-98 relative z-10"
                  >
                    <PhoneCall className="w-4 h-4 animate-bounce" />
                    <span>Call Coach Sophia Now (14ms Nano) →</span>
                  </button>
                </div>

                {/* 3. WEEKLY TARGETS & SPRINT TRACKER */}
                <div className="p-5 rounded-3xl bg-[#111827] border border-slate-800/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-amber-400" />
                      <h3 className="font-bold text-xs text-white">Weekly Targets & Winners</h3>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      +500 XP Reward
                    </span>
                  </div>

                  {/* Main Sprint Goal Box */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/60 via-slate-900/90 to-purple-950/40 border border-indigo-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shadow">
                          <Award className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-bold text-xs text-white block">Weekly Fluency Sprint</span>
                          <span className="text-[10px] text-amber-300/80">Goal: 60 mins speaking</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        🔥 100% Done
                      </span>
                    </div>

                    {/* Today's practice progress */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-400">Today: 2 / 10 mins</span>
                        <span className="text-cyan-400 font-bold">20%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-cyan-400 rounded-full" style={{ width: "20%" }}></div>
                      </div>
                    </div>

                    {/* Total weekly sprint */}
                    <div className="space-y-1 pt-1 border-t border-slate-800/80">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-400">Weekly Goal: 115 / 60 mins</span>
                        <span className="text-emerald-400 font-bold">191% 🔥</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full" style={{ width: "100%" }}></div>
                      </div>
                    </div>
                  </div>

                  {/* 7-Day Streak Pills */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      7-Day Streak Tracker:
                    </span>
                    <div className="grid grid-cols-7 gap-1">
                      {[
                        { day: "MON", done: true },
                        { day: "TUE", done: true },
                        { day: "WED", done: true },
                        { day: "THU", done: true },
                        { day: "FRI", done: true },
                        { day: "SAT", done: false },
                        { day: "SUN", done: false },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className={`py-1.5 rounded-lg text-center border text-[9px] font-bold transition-all ${item.done
                            ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400 shadow-sm"
                            : "bg-slate-900 border-slate-800 text-slate-600"
                            }`}
                        >
                          <div className="text-[8px] text-slate-500 leading-none mb-0.5">{item.day}</div>
                          {item.done ? "✓" : "○"}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* View Leaderboard CTA */}
                  <button
                    onClick={() => setActiveTab("achievements")}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Trophy className="w-3.5 h-3.5 text-slate-950" />
                    <span>View Winners Podium & Leaderboard →</span>
                  </button>
                </div>
              </div>
            </div>
          ) : activeTab === "practice" ? (
            /* ----------------------------------------------------------- */
            /* TAB: PRACTICE TOPIC SCENARIOS CATALOG                        */
            /* ----------------------------------------------------------- */
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#111827] border border-slate-800">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Mic className="w-5 h-5 text-blue-400" />
                    Practice Scenarios Catalog ({filteredTopics.length})
                  </h2>
                  <p className="text-xs text-slate-400">Choose any scenario to start a real-time AI phone conversation.</p>
                </div>

                <button
                  onClick={() => setActiveTab("dashboard")}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold self-start sm:self-auto"
                >
                  ← Back to Dashboard
                </button>
              </div>

              {/* Grid of Topics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTopics.map((topic) => (
                  <div
                    key={topic.id}
                    className="p-5 rounded-2xl bg-[#111827] border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{topic.icon}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
                          {topic.level}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-white group-hover:text-cyan-400 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {topic.scenario}
                      </p>
                    </div>

                    <button
                      onClick={() => handleInitiateCallPrompt(topic)}
                      className="w-full py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600 border border-blue-500/30 hover:border-transparent text-blue-300 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Start Voice Call</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : activeTab === "vocabulary" ? (
            /* ----------------------------------------------------------- */
            /* TAB: VOCABULARY DRILLS                                      */
            /* ----------------------------------------------------------- */
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-emerald-400" />
                    Essential Fluency Vocabulary
                  </h2>
                  <p className="text-xs text-slate-400">Master essential idioms, phrasal verbs, and daily conversation words.</p>
                </div>
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  ← Back to Dashboard
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { word: "Under the weather", meaning: "Feeling slightly unwell or tired.", example: "I'm feeling a bit under the weather today." },
                  { word: "Cut to the chase", meaning: "Get straight to the main point.", example: "Let's cut to the chase and discuss numbers." },
                  { word: "Piece of cake", meaning: "Something very easy to accomplish.", example: "Passing this language test was a piece of cake!" },
                  { word: "Break a leg", meaning: "Good luck in performance or exam.", example: "Break a leg on your job interview today!" },
                  { word: "Hit the road", meaning: "Depart or begin a journey.", example: "It's getting late, let's hit the road." },
                  { word: "Call it a day", meaning: "Stop working for the remainder of the day.", example: "Great progress everyone, let's call it a day." }
                ].map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-[#111827] border border-slate-800 space-y-2">
                    <span className="text-sm font-bold text-cyan-400 block">{item.word}</span>
                    <p className="text-xs text-white font-medium">{item.meaning}</p>
                    <p className="text-[11px] text-slate-400 italic">"{item.example}"</p>
                  </div>
                ))}
              </div>
            </div>
          ) : activeTab === "grammar" ? (
            /* ----------------------------------------------------------- */
            /* TAB: GRAMMAR EXERCISES                                      */
            /* ----------------------------------------------------------- */
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-purple-400" />
                    Intelligent Grammar Fixes
                  </h2>
                  <p className="text-xs text-slate-400">Common spoken slips caught and repaired by Gemini AI.</p>
                </div>
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  ← Back to Dashboard
                </button>
              </div>

              <div className="space-y-3">
                {[
                  { wrong: "I am agree with your point.", correct: "I agree with your point.", rule: "'Agree' is a verb, so you do not need 'am'." },
                  { wrong: "She don't like spicy food.", correct: "She doesn't like spicy food.", rule: "Third-person singular takes 'doesn't' (does not)." },
                  { wrong: "I look forward to meet you.", correct: "I look forward to meeting you.", rule: "The phrasal verb 'look forward to' requires a gerund (-ing)." },
                  { wrong: "He explained me the route.", correct: "He explained the route to me.", rule: "'Explain' takes an indirect object introduced by 'to'." }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#111827] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs line-through text-rose-400">{item.wrong}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                        <span className="text-xs font-bold text-emerald-400">{item.correct}</span>
                      </div>
                      <p className="text-[11px] text-slate-400">{item.rule}</p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 self-start sm:self-auto">
                      AI Verified
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : activeTab === "achievements" ? (
            /* ----------------------------------------------------------- */
            /* TAB: 20 ACHIEVEMENTS & WEEKLY CHAMPIONSHIP HUB              */
            /* ----------------------------------------------------------- */
            <div className="space-y-6">
              {/* Top Banner & XP Stats */}
              <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#111827] via-[#0E172E] to-[#121B35] border border-cyan-500/30 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-[10px] font-bold tracking-wide">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span>GAMIFICATION & PROGRESS REWARDS</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-amber-400" />
                    Achievements & Weekly Championship Hub
                  </h2>
                  <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                    Earn badges through spoken practice time, continuous daily streaks, and weekly fluency sprints. Claim badges to level up your global XP score!
                  </p>
                </div>

                {/* User Stats Ribbons */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="px-4 py-2.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center gap-2">
                    <Zap className="w-4 h-4 fill-amber-300" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-400/80 block">Total XP</span>
                      <span className="text-sm font-black text-white">{totalXp.toLocaleString()} XP</span>
                    </div>
                  </div>

                  <div className="px-4 py-2.5 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-cyan-400" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-cyan-400/80 block">Badges Unlocked</span>
                      <span className="text-sm font-black text-white">{achievements.filter(a => a.isUnlocked).length} / 20</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab("dashboard")}
                    className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
                  >
                    ← Dashboard
                  </button>
                </div>
              </div>

              {/* Weekly Winners Championship Podium */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#111827] border border-slate-800 space-y-4">
                <div className="text-center space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-white flex items-center justify-center gap-2">
                    <Crown className="w-4 h-4 text-amber-400" />
                    Weekly Winners Championship Podium
                  </h3>
                  <p className="text-xs text-slate-400">Top learners this week ranked by spoken conversation minutes.</p>
                </div>

                <div className="flex items-end justify-center gap-3 sm:gap-6 pt-4 max-w-lg mx-auto">
                  {/* 2nd Place */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-slate-700 border-2 border-slate-400 flex items-center justify-center font-bold text-white mb-2">
                      J
                    </div>
                    <span className="text-xs font-bold text-white">Jaji</span>
                    <span className="text-[10px] text-slate-400">13m • 50%</span>
                    <div className="w-24 sm:w-28 h-28 rounded-t-2xl bg-gradient-to-t from-slate-800 to-slate-700 mt-2 flex items-center justify-center font-black text-xl text-slate-300">
                      #2
                    </div>
                  </div>

                  {/* 1st Place (Janitha Dilshan) */}
                  <div className="flex flex-col items-center">
                    <Crown className="w-6 h-6 text-amber-400 mb-1 animate-bounce" />
                    <img
                      src="/images/janitha-avatar.jpg"
                      alt="Janitha Dilshan"
                      className="w-16 h-16 rounded-full object-cover ring-4 ring-amber-400 mb-2 shadow-lg shadow-amber-400/20"
                    />
                    <span className="text-xs font-bold text-amber-300">Janitha Dilshan</span>
                    <span className="text-[10px] text-amber-200">190m • 95%</span>
                    <div className="w-28 sm:w-32 h-36 rounded-t-2xl bg-gradient-to-t from-amber-600 to-amber-500 mt-2 flex items-center justify-center font-black text-2xl text-slate-950 shadow-xl shadow-amber-500/20">
                      #1
                    </div>
                  </div>

                  {/* 3rd Place */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-orange-950 border-2 border-orange-600 flex items-center justify-center font-bold text-orange-300 mb-2">
                      A
                    </div>
                    <span className="text-xs font-bold text-white">admin</span>
                    <span className="text-[10px] text-slate-400">8m • 89%</span>
                    <div className="w-24 sm:w-28 h-20 rounded-t-2xl bg-gradient-to-t from-orange-950 to-orange-800 mt-2 flex items-center justify-center font-black text-xl text-orange-200">
                      #3
                    </div>
                  </div>
                </div>
              </div>

              {/* Badges Filter Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#111827] border border-slate-800">
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { id: "all", label: `All Badges (20)` },
                    { id: "ready", label: `🎁 Ready to Claim (${achievements.filter(a => a.isUnlocked && !a.isClaimed).length})` },
                    { id: "claimed", label: `Claimed (${achievements.filter(a => a.isClaimed).length})` },
                    { id: "in_progress", label: `In Progress (${achievements.filter(a => !a.isUnlocked).length})` }
                  ].map((filterTab) => (
                    <button
                      key={filterTab.id}
                      onClick={() => setAchievementFilter(filterTab.id as any)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${achievementFilter === filterTab.id
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                        : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
                        }`}
                    >
                      {filterTab.label}
                    </button>
                  ))}
                </div>

                {achievements.some(a => a.isUnlocked && !a.isClaimed) && (
                  <button
                    onClick={() => {
                      const firstUnclaimed = achievements.find(a => a.isUnlocked && !a.isClaimed);
                      if (firstUnclaimed) setActiveClaimModalBadge(firstUnclaimed);
                    }}
                    className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/30 flex items-center gap-1.5 transition-all hover:scale-[1.02] animate-pulse"
                  >
                    <Trophy className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Claim Next Reward →</span>
                  </button>
                )}
              </div>

              {/* 20 ACHIEVEMENTS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {achievements
                  .filter((badge) => {
                    if (achievementFilter === "ready") return badge.isUnlocked && !badge.isClaimed;
                    if (achievementFilter === "claimed") return badge.isClaimed;
                    if (achievementFilter === "in_progress") return !badge.isUnlocked;
                    return true;
                  })
                  .map((badge) => {
                    const percent = Math.min(100, Math.round((badge.progressCurrent / badge.progressTarget) * 100));
                    return (
                      <div
                        key={badge.id}
                        className={`p-5 rounded-3xl border transition-all duration-200 flex flex-col justify-between gap-4 relative overflow-hidden group ${badge.isClaimed
                          ? "bg-gradient-to-br from-[#111827] via-[#0D1527] to-[#0A1020] border-emerald-500/30 shadow-lg"
                          : badge.isUnlocked
                            ? "bg-gradient-to-br from-[#111827] via-[#1E1B4B]/35 to-[#0F172A] border-amber-500/50 shadow-xl shadow-amber-500/10 ring-1 ring-amber-400/25"
                            : "bg-[#111827]/75 border-slate-800/80 opacity-85 hover:opacity-100"
                          }`}
                      >
                        {/* Corner Glow for Unlocked / Ready */}
                        {badge.isUnlocked && !badge.isClaimed && (
                          <div className="absolute -top-10 -right-10 w-24 h-24 bg-amber-500/20 rounded-full blur-2xl pointer-events-none animate-pulse"></div>
                        )}

                        <div className="space-y-3 relative z-10">
                          {/* Top Row: Icon + Category + XP Reward */}
                          <div className="flex items-start justify-between gap-3">
                            <div className={`w-13 h-13 rounded-2xl bg-gradient-to-tr ${badge.gradient} border border-white/20 flex items-center justify-center shadow-lg ${badge.glow} shrink-0 p-3`}>
                              {renderBadgeIcon(badge.iconType, "w-7 h-7 text-white drop-shadow")}
                            </div>

                            <div className="flex flex-col items-end gap-1.5">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-slate-900 border border-slate-800 text-slate-300">
                                {badge.category}
                              </span>
                              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center gap-1">
                                <Zap className="w-3 h-3 fill-amber-300" />
                                +{badge.xpReward} XP
                              </span>
                            </div>
                          </div>

                          {/* Title & Description */}
                          <div>
                            <h4 className="font-black text-sm text-white group-hover:text-cyan-300 transition-colors">
                              {badge.title}
                            </h4>
                            <p className="text-xs text-slate-300/90 leading-relaxed mt-1">
                              {badge.description}
                            </p>
                          </div>

                          {/* Requirement & Progress Bar */}
                          <div className="space-y-1.5 pt-1">
                            <div className="flex items-center justify-between text-[11px] text-slate-400">
                              <span className="truncate">{badge.requirement}</span>
                              <span className="font-bold text-white shrink-0 ml-2">
                                {badge.progressCurrent}/{badge.progressTarget} {badge.progressUnit} ({percent}%)
                              </span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${badge.isClaimed
                                  ? "bg-emerald-400"
                                  : badge.isUnlocked
                                    ? "bg-gradient-to-r from-amber-400 to-yellow-400"
                                    : "bg-gradient-to-r from-blue-500 to-cyan-400"
                                  }`}
                                style={{ width: `${percent}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Status / Action Button */}
                        <div className="pt-2 relative z-10">
                          {badge.isClaimed ? (
                            <div className="w-full py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              <span>Claimed ✓ (+{badge.xpReward} XP Earned)</span>
                            </div>
                          ) : badge.isUnlocked ? (
                            <button
                              onClick={() => setActiveClaimModalBadge(badge)}
                              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/30 flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] animate-pulse"
                            >
                              <Trophy className="w-3.5 h-3.5 fill-slate-950" />
                              <span>🎁 Claim Badge & +{badge.xpReward} XP!</span>
                            </button>
                          ) : (
                            <div className="w-full py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 text-xs font-semibold flex items-center justify-center gap-1.5">
                              <span>🔒 Locked • In Progress ({percent}%)</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            /* TAB: PROGRESS & HISTORY */
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <History className="w-5 h-5 text-blue-400" />
                    Speaking Session Records ({callHistory.length})
                  </h2>
                  <p className="text-xs text-slate-400">Full audit log of your past calls and fluency scores.</p>
                </div>
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  ← Back to Dashboard
                </button>
              </div>

              {callHistory.length === 0 ? (
                <div className="p-12 text-center text-slate-500 text-xs rounded-2xl bg-[#111827] border border-slate-800">
                  No call sessions recorded yet. Start your first practice call!
                </div>
              ) : (
                <div className="space-y-3">
                  {callHistory.map((s, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#111827] border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-sm text-white block">{s.topicTitle}</span>
                        <span className="text-xs text-slate-400">{s.language} • {formatTimer(s.durationSeconds)} duration</span>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-black text-cyan-400 block">{s.score}/100 ({s.grade})</span>
                        <span className="text-[10px] text-slate-500">{new Date(s.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. DELUXE CALL SETUP & AI COACH SELECTION MODAL                */}
      {/* ------------------------------------------------------------- */}
      {showDurationModal && pendingTopic && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-gradient-to-b from-[#131b2e] via-[#0d1527] to-[#070b16] border border-cyan-500/40 rounded-3xl p-5 sm:p-6 shadow-[0_25px_80px_rgba(0,0,0,0.9)] relative overflow-hidden my-auto space-y-5">
            {/* Ambient Corner Glows */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />

            {/* Top Bar: Topic Badge + Close */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 relative z-10">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-400/40 text-cyan-300 flex items-center justify-center text-2xl shadow-lg shadow-cyan-950/40 shrink-0">
                  {pendingTopic.icon}
                </div>
                <div className="truncate">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-[10px] font-black uppercase tracking-wider">
                      {pendingTopic.language}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-bold">
                      {pendingTopic.level}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live AI Call Ready
                    </span>
                  </div>
                  <h3 className="font-black text-base sm:text-lg text-white truncate mt-1">
                    {pendingTopic.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => {
                  if (typeof window !== "undefined" && "speechSynthesis" in window) {
                    window.speechSynthesis.cancel();
                  }
                  setPreviewingCoachVoiceId(null);
                  setShowDurationModal(false);
                }}
                className="w-8 h-8 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all shrink-0 ml-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Section 1: Choose Your AI Voice Coach */}
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">
                    Choose Your AI Speech Coach (8 Available)
                  </h4>
                </div>
                <span className="text-[11px] font-bold text-cyan-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Coach {selectedCoach.name} Active</span>
                </span>
              </div>

              {/* Coach Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-[240px] overflow-y-auto pr-1">
                {COACHES.map((coach) => {
                  const isSelected = selectedCoach.id === coach.id;
                  const isVoicePlaying = previewingCoachVoiceId === coach.id;

                  return (
                    <div
                      key={coach.id}
                      onClick={() => setSelectedCoach(coach)}
                      className={`p-3 rounded-2xl transition-all duration-200 cursor-pointer relative flex flex-col justify-between group ${
                        isSelected
                          ? "bg-gradient-to-b from-cyan-950/70 via-blue-950/50 to-slate-900 border-2 border-cyan-400 shadow-lg shadow-cyan-500/25 scale-[1.02]"
                          : "bg-slate-900/70 border border-slate-800/90 hover:border-slate-700 hover:bg-slate-800/50"
                      }`}
                    >
                      {/* Active Check Badge */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-4.5 h-4.5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shadow-md shadow-cyan-400/50">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}

                      <div className="flex flex-col items-center text-center space-y-1.5">
                        {/* Coach Avatar with Online Ring */}
                        <div className="relative">
                          <div className={`w-14 h-14 rounded-full p-0.5 transition-all ${
                            isSelected
                              ? "bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-500 shadow-md shadow-cyan-400/40"
                              : "bg-slate-700 group-hover:bg-slate-600"
                          }`}>
                            <img
                              src={coach.avatar}
                              alt={coach.name}
                              className="w-full h-full object-cover rounded-full"
                            />
                          </div>
                          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-900 shadow-sm" />
                        </div>

                        {/* Coach Name & Accent */}
                        <div>
                          <h5 className="font-black text-xs text-white group-hover:text-cyan-200 transition-colors">
                            {coach.name}
                          </h5>
                          <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                            {coach.accent}
                          </p>
                        </div>
                      </div>

                      {/* Listen Preview Button */}
                      <button
                        onClick={(e) => handlePreviewCoachVoice(e, coach)}
                        className={`mt-2 py-1 px-2 rounded-xl text-[9px] font-bold flex items-center justify-center gap-1 transition-all ${
                          isVoicePlaying
                            ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/40 animate-pulse"
                            : "bg-slate-800/80 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-700/60"
                        }`}
                        title="Click to preview coach voice"
                      >
                        {isVoicePlaying ? (
                          <>
                            <Pause className="w-2.5 h-2.5" />
                            <span>Playing...</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-2.5 h-2.5 text-cyan-400" />
                            <span>Preview Voice</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Spotlight Banner for Selected Coach */}
              <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-950/50 via-cyan-950/40 to-indigo-950/50 border border-cyan-500/30 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-cyan-400/80 shadow-md shadow-cyan-400/30 shrink-0">
                    <img src={selectedCoach.avatar} alt={selectedCoach.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="truncate">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-xs text-white truncate">{selectedCoach.name}</span>
                      <span className="text-[9px] font-bold text-cyan-300 bg-cyan-500/20 px-1.5 py-0.5 rounded border border-cyan-500/30 shrink-0">
                        {selectedCoach.accent}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-300 truncate mt-0.5">{selectedCoach.tagline}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[10px] font-bold hidden sm:inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Coach Online</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Section 2: Call Duration & Bonus XP */}
            <div className="space-y-2.5 relative z-10 pt-1 border-t border-slate-800/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">
                    Select Call Duration
                  </h4>
                </div>
                <span className="text-[10px] text-amber-400 font-mono font-bold">
                  Bonus XP Multipliers Active
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { mins: 3, label: "3 Mins", badge: "+50 XP", sub: "⚡ Quick Sprint" },
                  { mins: 5, label: "5 Mins", badge: "+100 XP", sub: "🎯 Recommended", popular: true },
                  { mins: 10, label: "10 Mins", badge: "+250 XP", sub: "👑 Immersion" }
                ].map((tier) => {
                  const isSelected = selectedDurationMinutes === tier.mins;
                  return (
                    <button
                      key={tier.mins}
                      onClick={() => setSelectedDurationMinutes(tier.mins)}
                      className={`p-3 rounded-2xl text-left transition-all duration-200 relative ${
                        isSelected
                          ? "bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-600 text-white shadow-lg shadow-blue-600/30 border border-cyan-400/60 scale-[1.02]"
                          : "bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      {tier.popular && (
                        <span className="absolute -top-2 right-3 px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[8px] font-black uppercase tracking-wide shadow-sm">
                          POPULAR
                        </span>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="font-black text-sm">{tier.label}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                          isSelected ? "bg-white/20 text-white" : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                        }`}>
                          {tier.badge}
                        </span>
                      </div>
                      <p className={`text-[10px] mt-1 font-medium ${
                        isSelected ? "text-cyan-100" : "text-slate-400"
                      }`}>
                        {tier.sub}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* AI Engine & Privacy Guarantee */}
            <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-[10px] text-slate-400 relative z-10">
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-yellow-400" />
                <span>Powered by <strong className="text-white">Gemini Nano Hybrid AI</strong></span>
              </div>
              <div className="flex items-center gap-1 text-emerald-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Sub-15ms Live Voice Latency</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-1 relative z-10">
              <button
                onClick={() => {
                  if (typeof window !== "undefined" && "speechSynthesis" in window) {
                    window.speechSynthesis.cancel();
                  }
                  setPreviewingCoachVoiceId(null);
                  setShowDurationModal(false);
                }}
                className="py-3 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (typeof window !== "undefined" && "speechSynthesis" in window) {
                    window.speechSynthesis.cancel();
                  }
                  setPreviewingCoachVoiceId(null);
                  handleConfirmStartCall();
                }}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-xs sm:text-sm shadow-xl shadow-blue-600/40 hover:shadow-cyan-500/50 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 animate-bounce" />
                <span>
                  Start Call with Coach {selectedCoach.name} ({selectedDurationMinutes} Mins) →
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 4. VIP UPGRADE MODAL                                          */}
      {/* ------------------------------------------------------------- */}
      {showVipModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-gradient-to-b from-[#1E1B4B] to-[#0A0F1D] border border-pink-500/40 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 relative">
            <button
              onClick={() => setShowVipModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-pink-500 flex items-center justify-center mx-auto shadow-lg shadow-pink-500/30">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-black text-white">SpeakFlow VIP Membership</h3>
              <p className="text-xs text-slate-300">Unlimited real-time phone calls & AI coaches across all languages</p>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-white block">Monthly VIP Pass</span>
                  <span className="text-[10px] text-slate-400">Unlimited Gemini Nano + Cloud inferences</span>
                </div>
                <span className="font-black text-sm text-cyan-400">$9.99 / mo</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-pink-500/40 flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-white flex items-center gap-1.5">
                    Annual Pro Pass <span className="text-[9px] bg-pink-500 text-white px-1.5 py-0.2 rounded font-bold">SAVE 40%</span>
                  </span>
                  <span className="text-[10px] text-slate-300">Includes all 6 language studios & certificates</span>
                </div>
                <span className="font-black text-sm text-pink-400">$59.99 / yr</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-[11px] text-emerald-400 font-semibold block">
                ✓ Active for user {user.displayName || "Janitha Dilshan"}
              </span>
              <span className="text-[10px] text-slate-400">
                Subscription synced with Google Play Store Billing in Mobile App.
              </span>
            </div>

            <button
              onClick={() => {
                alert("You are recognized as an VIP Champion! Unlimited access is active.");
                setShowVipModal(false);
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-500 text-white font-bold text-xs shadow-lg shadow-pink-600/30 transition-all"
            >
              Continue VIP Experience
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 5. CALL SCORING SUMMARY MODAL                                 */}
      {/* ------------------------------------------------------------- */}
      {showScoreModal && completedSession && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-blue-500/40 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4">
            <div className="text-center space-y-1">
              <span className="text-3xl">🎉</span>
              <h3 className="text-lg font-black text-white">Call Completed!</h3>
              <p className="text-xs text-slate-400">{completedSession.topicTitle}</p>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-tr from-blue-950 via-slate-900 to-slate-950 border border-blue-500/30 text-center">
              <span className="text-3xl font-black text-cyan-400">{completedSession.score}</span>
              <span className="text-sm font-bold text-slate-400"> / 100 ({completedSession.grade})</span>
              <p className="text-xs text-slate-300 mt-2">{completedSession.coachFeedback}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Fluency</span>
                <span className="font-bold text-emerald-400 text-sm">{completedSession.fluencyScore}%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Accuracy</span>
                <span className="font-bold text-blue-400 text-sm">{completedSession.accuracyScore}%</span>
              </div>
            </div>

            <button
              onClick={() => {
                setShowScoreModal(false);
                setActiveTab("dashboard");
              }}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* 6. CELEBRATORY CLAIM BADGE & XP MODAL */}
      {activeClaimModalBadge && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in zoom-in duration-200">
          <div className="w-full max-w-md bg-gradient-to-b from-[#111827] via-[#0F172A] to-[#0A0F1D] border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(245,158,11,0.25)] space-y-6 relative text-center overflow-hidden">
            {/* Ambient Background Glow & Sparks */}
            <div className="absolute -top-16 -left-16 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>

            {/* Close Button */}
            <button
              onClick={() => setActiveClaimModalBadge(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Confetti & Trophy Visual */}
            <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 opacity-25 blur-xl animate-pulse"></div>
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-tr ${activeClaimModalBadge.gradient} border-2 border-amber-300/60 shadow-2xl ${activeClaimModalBadge.glow} flex items-center justify-center transform hover:rotate-6 transition-transform`}>
                {renderBadgeIcon(activeClaimModalBadge.iconType, "w-10 h-10 text-white fill-white/20 drop-shadow")}
              </div>
            </div>

            {/* Title & Celebration */}
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span>NEW ACHIEVEMENT UNLOCKED!</span>
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight">
                {activeClaimModalBadge.title}
              </h3>
              <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider block">
                {activeClaimModalBadge.category} Milestone
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-medium pt-1">
                {activeClaimModalBadge.description}
              </p>
            </div>

            {/* XP Reward Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-yellow-500/15 to-orange-500/10 border border-amber-500/30 flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">XP Reward</span>
                <span className="text-xs text-slate-200">Added to your global ranking</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/25 border border-amber-400/40 text-amber-300 font-black text-base shadow-lg shadow-amber-500/20">
                <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>+{activeClaimModalBadge.xpReward} XP</span>
              </div>
            </div>

            {/* Claim Action Button */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  handleClaimBadge(activeClaimModalBadge.id);
                  setActiveClaimModalBadge(null);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/35 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <Trophy className="w-4 h-4 fill-slate-950" />
                <span>Claim Badge & +{activeClaimModalBadge.xpReward} XP 🚀</span>
              </button>

              <button
                onClick={() => {
                  setActiveClaimModalBadge(null);
                  setActiveTab("achievements");
                }}
                className="text-[11px] font-semibold text-slate-400 hover:text-white transition-colors"
              >
                View All 20 Achievements →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6.5 DELUXE SPEAKING SESSION REVIEW & TELEMETRY MODAL */}
      {selectedReviewSession && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in zoom-in duration-200">
          <div className="w-full max-w-xl bg-gradient-to-br from-[#111827] via-[#0F172A] to-[#0A0F1D] border border-cyan-500/40 rounded-3xl p-6 sm:p-7 shadow-[0_25px_60px_rgba(6,182,212,0.25)] space-y-5 relative overflow-hidden">
            {/* Ambient High-Tech Glow */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Top Bar: Coach Info & Close Button */}
            <div className="flex items-start justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={selectedReviewSession.coachAvatar}
                    alt={selectedReviewSession.coachName}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-cyan-400/50 shadow-lg"
                  />
                  <span className="absolute -bottom-1 -right-1 text-sm leading-none drop-shadow">
                    {selectedReviewSession.coachFlag}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-white">
                      {selectedReviewSession.coachName}
                    </h3>
                    <span className="text-[10px] text-cyan-300 bg-cyan-500/15 border border-cyan-500/30 px-2 py-0.5 rounded-full font-semibold">
                      {selectedReviewSession.coachRole}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-semibold mt-0.5">
                    {selectedReviewSession.topicTitle}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5 font-mono">
                    Completed: {selectedReviewSession.timeAgo} • Spoken Duration: {selectedReviewSession.durationFormatted}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  if (typeof window !== "undefined" && "speechSynthesis" in window) {
                    window.speechSynthesis.cancel();
                  }
                  setPlayingSessionAudioId(null);
                  setSelectedReviewSession(null);
                }}
                className="w-8 h-8 rounded-full bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 4 Metrics Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 relative z-10">
              <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-center">
                <span className="text-[10px] text-slate-400 block font-medium">Overall Score</span>
                <span className="font-black text-xl text-cyan-400">{selectedReviewSession.score}/100</span>
                <span className="text-[9px] text-cyan-300 font-bold block">{selectedReviewSession.grade}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-center">
                <span className="text-[10px] text-slate-400 block font-medium">Fluency</span>
                <span className="font-black text-xl text-emerald-400">{selectedReviewSession.fluencyScore}%</span>
                <span className="text-[9px] text-emerald-300 font-bold block">Native Cadence</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-center">
                <span className="text-[10px] text-slate-400 block font-medium">Accuracy</span>
                <span className="font-black text-xl text-blue-400">{selectedReviewSession.accuracyScore}%</span>
                <span className="text-[9px] text-blue-300 font-bold block">Grammar Precision</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-center">
                <span className="text-[10px] text-slate-400 block font-medium">Inference Engine</span>
                <span className="font-black text-base text-amber-400 mt-1 block">
                  {selectedReviewSession.engine === "ON_DEVICE_NANO" ? "Nano ⚡" : "Cloud ☁️"}
                </span>
                <span className="text-[9px] text-amber-300 font-bold block font-mono">
                  {selectedReviewSession.latencyMs}ms Latency
                </span>
              </div>
            </div>

            {/* Hybrid AI Telemetry Banner */}
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-200 relative z-10">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-medium text-[11px]">
                  {selectedReviewSession.engine === "ON_DEVICE_NANO"
                    ? "Processed 100% On-Device via Chrome Built-in Gemini Nano • Zero Cloud Telemetry Leakage"
                    : "Processed via Google Gemini 2.5 Flash Cloud Endpoint • Ultra-High Context Window"}
                </span>
              </div>
              <span className="font-mono text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30 text-emerald-300 font-bold shrink-0">
                100% Private 🔒
              </span>
            </div>

            {/* Dialogue Transcript Snippet & Real-Time AI Coaching Critique */}
            <div className="space-y-2.5 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/90 text-xs relative z-10">
              <div className="flex items-center justify-between text-[11px] text-slate-400 pb-1 border-b border-slate-800/60 font-semibold">
                <span>Conversation Transcript & AI Coach Critique</span>
                <span className="text-cyan-400 font-mono">Turn #3 Analyzed</span>
              </div>

              {/* Student Speech */}
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30 mt-0.5">
                  <Mic className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-blue-300 block">Janitha (Student Spoken):</span>
                  <p className="text-slate-200 italic font-serif leading-relaxed">
                    &ldquo;{selectedReviewSession.dialogueSnippet.user}&rdquo;
                  </p>
                </div>
              </div>

              {/* AI Coach Feedback */}
              <div className="flex items-start gap-2.5 pt-1">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-emerald-300 block">
                    {selectedReviewSession.coachName} (Feedback):
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {selectedReviewSession.dialogueSnippet.ai}
                  </p>
                </div>
              </div>

              {/* Pro Tip */}
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2 text-amber-200 text-[11px]">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{selectedReviewSession.dialogueSnippet.tip}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 relative z-10">
              {/* Listen to Voice Feedback */}
              <button
                onClick={(e) => handleToggleAudioPreview(e, selectedReviewSession)}
                className={`py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  playingSessionAudioId === selectedReviewSession.id
                    ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/40 animate-pulse"
                    : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                }`}
              >
                {playingSessionAudioId === selectedReviewSession.id ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Stop Voice Audio</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-cyan-400" />
                    <span>Listen to Coach Audio Review</span>
                  </>
                )}
              </button>

              {/* Practice This Scenario Again */}
              <button
                onClick={() => {
                  if (typeof window !== "undefined" && "speechSynthesis" in window) {
                    window.speechSynthesis.cancel();
                  }
                  setPlayingSessionAudioId(null);
                  setSelectedReviewSession(null);
                  launchTopicByKeyword(selectedReviewSession.category.toLowerCase().split(" ")[0] || "business");
                }}
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Practice Scenario Again →</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. FLOATING CELEBRATION TOAST */}
      {celebrationToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <div className="px-5 py-3 rounded-2xl bg-[#0F172A] border border-amber-500/50 shadow-2xl shadow-amber-500/30 flex items-center gap-3 text-white text-xs font-bold">
            <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
            <span>{celebrationToast}</span>
          </div>
        </div>
      )}
    </div>
  );
}
