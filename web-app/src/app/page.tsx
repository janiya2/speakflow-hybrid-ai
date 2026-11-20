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
  Sparkle
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
    id: "sarah",
    name: "Sarah",
    gender: "female",
    tagline: "Warm & Patient • Master English Tutor",
    accent: "American English / Warm Tone",
    avatar: "/images/coaches/sarah.jpg",
    voice: "en-US-JennyNeural"
  },
  {
    id: "emma",
    name: "Emma",
    gender: "female",
    tagline: "Executive & Cambridge Business English",
    accent: "British / Confident Articulate Tone",
    avatar: "/images/coaches/emma.jpg",
    voice: "en-GB-SoniaNeural"
  },
  {
    id: "aoi",
    name: "Aoi",
    gender: "female",
    tagline: "Gentle & Clear • Multilingual Specialist",
    accent: "Multilingual / Gentle & Clear Tone",
    avatar: "/images/coaches/aoi.jpg",
    voice: "ja-JP-NanamiNeural"
  },
  {
    id: "alex",
    name: "Alex",
    gender: "male",
    tagline: "Energetic & Friendly • Daily Fluency & Idioms",
    accent: "American English / Energetic & Clear",
    avatar: "/images/coaches/alex.jpg",
    voice: "en-US-GuyNeural"
  },
  {
    id: "oliver",
    name: "Oliver",
    gender: "male",
    tagline: "Cambridge Scholarly • Executive Debate & Prep",
    accent: "British / Articulate & Scholarly",
    avatar: "/images/coaches/oliver.jpg",
    voice: "en-GB-RyanNeural"
  },
  {
    id: "kenji",
    name: "Kenji",
    gender: "male",
    tagline: "Analytical & Calm • Global Tech & Bilingual JP/EN",
    accent: "Bilingual Japanese & Global Tech English",
    avatar: "/images/coaches/kenji.jpg",
    voice: "en-US-ChristopherNeural"
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
        } catch (_) {}
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
      } catch (e) {}
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
    setEngineModelLabel(hybridResult.modelIdentifier);
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
                  className={`flex-1 py-2 rounded-lg transition-all ${
                    authMode === "login"
                      ? "bg-blue-600 text-white shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode("register")}
                  className={`flex-1 py-2 rounded-lg transition-all ${
                    authMode === "register"
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
      {/* 1. LEFT SIDEBAR (1:1 with Screenshot) */}
      {/* ------------------------------------------------------------- */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-[#0D111E] border-r border-slate-800/80 flex flex-col justify-between p-5 transition-transform duration-300 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="space-y-6">
          {/* Logo */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-black text-lg text-white tracking-tight">SpeakFlow</span>
                <p className="text-[10px] text-slate-400">Practice • Speak • Grow</p>
              </div>
            </div>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1 text-xs font-semibold">
            <button
              onClick={() => {
                setActiveTab("dashboard");
                setActiveCallTopic(null);
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "dashboard" && !activeCallTopic
                  ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("practice");
                setActiveCallTopic(null);
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "practice" && !activeCallTopic
                  ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              <Mic className="w-4 h-4" />
              <span>Practice</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("conversation");
                setMobileSidebarOpen(false);
                launchTopicByKeyword("travel");
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "conversation"
                  ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>Conversation AI</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("vocabulary");
                setActiveCallTopic(null);
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "vocabulary"
                  ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Vocabulary</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("grammar");
                setActiveCallTopic(null);
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "grammar"
                  ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Grammar</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("progress");
                setActiveCallTopic(null);
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "progress"
                  ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Progress</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("achievements");
                setActiveCallTopic(null);
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "achievements"
                  ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Achievements</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("settings");
                setActiveCallTopic(null);
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "settings"
                  ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Bottom Section: VIP Card & User Profile */}
        <div className="space-y-4 pt-4 border-t border-slate-800/80">
          {/* Go Premium VIP Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-b from-[#1E1B4B]/80 via-[#18182E]/90 to-[#0F172A] border border-indigo-500/30 text-center relative overflow-hidden space-y-2.5 shadow-xl">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto shadow-md">
              <Crown className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-xs text-white block">Go Premium</span>
              <p className="text-[10px] text-slate-400">Unlock unlimited AI conversation & more!</p>
            </div>
            <button
              onClick={() => setShowVipModal(true)}
              className="w-full py-1.5 px-3 rounded-xl bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-500 hover:opacity-90 text-white font-bold text-[11px] shadow-lg shadow-pink-600/25 flex items-center justify-center gap-1 transition-all"
            >
              <span>Upgrade Now</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* User Profile Footer */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/70 border border-slate-800">
            <div className="flex items-center gap-2.5">
              <img
                src="/images/janitha-avatar.jpg"
                alt="Janitha Dilshan"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/50"
                onError={(e) => {
                  (e.currentTarget as any).src = "https://ui-avatars.com/api/?name=Janitha+Dilshan&background=3b82f6&color=fff";
                }}
              />
              <div>
                <span className="font-bold text-xs text-white block">
                  {user.displayName || "Janitha Dilshan"}
                </span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3 h-3" />
                  Premium Member
                </span>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
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
        <main className="flex-1 w-full p-4 sm:p-6 lg:p-7 space-y-6">
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
                  className={`p-3 rounded-2xl border transition-all ${
                    isMuted
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
              {/* LEFT & CENTER MAIN COLUMN (9 cols on xl / 8 cols on lg) */}
              <div className="lg:col-span-8 xl:col-span-9 space-y-6">
                {/* 1. HERO BANNER: Welcome Back Janitha! (with Nano Banana Panoramic AI Background) */}
                <div className="relative rounded-3xl overflow-hidden border border-blue-500/30 shadow-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 min-h-[190px]">
                  {/* Panoramic AI Background Image */}
                  <img
                    src="/images/hero-banner-panoramic.png"
                    alt="AI Language Learning Studio"
                    className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                    onError={(e) => {
                      (e.currentTarget as any).style.display = "none";
                    }}
                  />
                  {/* Dark glass gradient overlay for ultra-crisp readable typography */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#070D1F]/90 via-[#0A132C]/75 to-[#081026]/90 backdrop-blur-[2px] pointer-events-none"></div>

                  {/* Left 3D Robot Mascot */}
                  <div className="shrink-0 relative z-10">
                    <img
                      src="/images/dashboard-robot-transparent.png"
                      alt="AI Robot Tutor"
                      className="w-32 h-36 sm:w-36 sm:h-40 object-contain drop-shadow-[0_10px_25px_rgba(56,189,248,0.4)] animate-in fade-in zoom-in duration-300"
                      onError={(e) => {
                        (e.currentTarget as any).src = "/images/dashboard-robot.png";
                      }}
                    />
                  </div>

                  {/* Center Text & Start Practice Button */}
                  <div className="flex-1 space-y-3 text-center md:text-left relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-[11px] font-bold text-cyan-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      <span>AI Voice Coach Online • On-Device Gemini Nano</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      Welcome back, Janitha! 👋
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-200 max-w-lg leading-relaxed font-medium">
                      Let's practice your language skills today and become more fluent!
                    </p>
                    <div className="pt-1">
                      <button
                        onClick={() => launchTopicByKeyword("travel")}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold text-xs shadow-xl shadow-blue-500/35 flex items-center justify-center md:justify-start gap-2 transition-all hover:scale-[1.02]"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Start Practice →</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Earth Globe with Multilingual Holographic Speech Bubbles */}
                  <div className="shrink-0 relative hidden sm:block z-10">
                    <img
                      src="/images/globe-landmarks-transparent.png"
                      alt="Global Languages"
                      className="w-48 h-36 object-contain drop-shadow-[0_0_25px_rgba(99,102,241,0.4)]"
                      onError={(e) => {
                        (e.currentTarget as any).src = "/images/globe-landmarks.png";
                      }}
                    />
                  </div>
                </div>

                {/* 2. 4 QUICK STAT CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
                  {/* Card 1: Practice Time */}
                  <div className="p-4 rounded-2xl bg-[#111827] border border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
                        <Mic className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block">Practice Time</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-lg font-bold text-white">2.5 hrs</span>
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded">
                            ↑ +25%
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Mini SVG Sparkline */}
                    <svg className="w-12 h-6 text-purple-400" fill="none" viewBox="0 0 48 24">
                      <path d="M0 20 Q 12 12, 24 16 T 48 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* Card 2: Lessons Completed */}
                  <div className="p-4 rounded-2xl bg-[#111827] border border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                        <Target className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block">Lessons Completed</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-lg font-bold text-white">48</span>
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded">
                            ↑ +12%
                          </span>
                        </div>
                      </div>
                    </div>
                    <svg className="w-12 h-6 text-emerald-400" fill="none" viewBox="0 0 48 24">
                      <path d="M0 18 Q 14 6, 26 12 T 48 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* Card 3: Current Streak */}
                  <div className="p-4 rounded-2xl bg-[#111827] border border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center">
                        <Star className="w-5 h-5 fill-amber-400" />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block">Current Streak</span>
                        <span className="text-lg font-bold text-white">12 days 🔥</span>
                      </div>
                    </div>
                    <svg className="w-12 h-6 text-amber-400" fill="none" viewBox="0 0 48 24">
                      <path d="M0 22 Q 15 15, 30 10 T 48 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* Card 4: Overall Level */}
                  <div className="p-4 rounded-2xl bg-[#111827] border border-slate-800/80 flex flex-col justify-between">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-yellow-600/20 text-yellow-400 flex items-center justify-center">
                        <Trophy className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block">Overall Level</span>
                        <span className="text-sm font-bold text-white">Intermediate</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                        <span>Progress</span>
                        <span className="font-bold text-cyan-400">68%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" style={{ width: "68%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. YOUR LEARNING PROGRESS & QUICK ACTIONS ROW */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
                  {/* Your Learning Progress Chart (7 cols on md, 7 cols on xl) */}
                  <div className="md:col-span-7 xl:col-span-7 p-5 rounded-3xl bg-[#111827] border border-slate-800/80 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-emerald-400" />
                        <h3 className="font-bold text-xs text-white">Your Learning Progress</h3>
                      </div>
                      <span className="text-[11px] text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-lg flex items-center gap-1">
                        Last 30 Days <ChevronDown className="w-3 h-3" />
                      </span>
                    </div>

                    {/* Smooth Spline Chart */}
                    <div className="relative pt-4">
                      {/* Floating tooltip 92% */}
                      <div className="absolute top-2 right-12 px-2 py-0.5 rounded bg-cyan-500 text-slate-950 text-[10px] font-black shadow-lg shadow-cyan-500/30">
                        92%
                      </div>

                      <svg className="w-full h-44" viewBox="0 0 400 150">
                        <defs>
                          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                          </linearGradient>
                        </defs>

                        {/* Horizontal Grid lines */}
                        <line x1="40" y1="20" x2="380" y2="20" stroke="#1F2937" strokeDasharray="3 3" />
                        <line x1="40" y1="55" x2="380" y2="55" stroke="#1F2937" strokeDasharray="3 3" />
                        <line x1="40" y1="90" x2="380" y2="90" stroke="#1F2937" strokeDasharray="3 3" />
                        <line x1="40" y1="125" x2="380" y2="125" stroke="#1F2937" strokeDasharray="3 3" />

                        {/* Y-axis Labels */}
                        <text x="5" y="23" fill="#6B7280" fontSize="9">100%</text>
                        <text x="10" y="58" fill="#6B7280" fontSize="9">75%</text>
                        <text x="10" y="93" fill="#6B7280" fontSize="9">50%</text>
                        <text x="10" y="128" fill="#6B7280" fontSize="9">25%</text>

                        {/* Spline Area Fill */}
                        <path
                          d="M 50 120 C 100 115, 140 100, 180 92 C 220 84, 250 95, 290 80 C 330 65, 345 35, 365 25 L 365 140 L 50 140 Z"
                          fill="url(#chartGradient)"
                        />

                        {/* Spline Line */}
                        <path
                          d="M 50 120 C 100 115, 140 100, 180 92 C 220 84, 250 95, 290 80 C 330 65, 345 35, 365 25"
                          fill="none"
                          stroke="#38BDF8"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />

                        {/* Data Points */}
                        <circle cx="50" cy="120" r="3.5" fill="#38BDF8" />
                        <circle cx="110" cy="112" r="3.5" fill="#38BDF8" />
                        <circle cx="180" cy="92" r="3.5" fill="#38BDF8" />
                        <circle cx="240" cy="88" r="3.5" fill="#38BDF8" />
                        <circle cx="290" cy="80" r="3.5" fill="#38BDF8" />
                        <circle cx="365" cy="25" r="4.5" fill="#38BDF8" className="animate-pulse" />
                      </svg>

                      {/* X-axis dates */}
                      <div className="flex justify-between text-[10px] text-slate-500 px-6 pt-1 font-mono">
                        <span>Nov 1</span>
                        <span>Nov 5</span>
                        <span>Nov 9</span>
                        <span>Nov 13</span>
                        <span>Nov 17</span>
                        <span>Nov 19</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions (5 cols on md, 5 cols on xl) */}
                  <div className="md:col-span-5 xl:col-span-5 p-5 rounded-3xl bg-[#111827] border border-slate-800/80 space-y-4">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <h3 className="font-bold text-xs text-white">Quick Actions</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {/* Button 1: Start Speaking Practice */}
                      <button
                        onClick={() => launchTopicByKeyword("cricket")}
                        className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 hover:opacity-90 text-white flex flex-col items-center justify-center text-center gap-2 shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02]"
                      >
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                          <Mic className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-[11px] leading-tight">Start Speaking Practice</span>
                      </button>

                      {/* Button 2: Learn Vocabulary */}
                      <button
                        onClick={() => setActiveTab("vocabulary")}
                        className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 hover:opacity-90 text-white flex flex-col items-center justify-center text-center gap-2 shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02]"
                      >
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-[11px] leading-tight">Learn Vocabulary</span>
                      </button>

                      {/* Button 3: Grammar Exercises */}
                      <button
                        onClick={() => setActiveTab("grammar")}
                        className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-800 hover:opacity-90 text-white flex flex-col items-center justify-center text-center gap-2 shadow-lg shadow-purple-600/20 transition-all hover:scale-[1.02]"
                      >
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                          <GraduationCap className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-[11px] leading-tight">Grammar Exercises</span>
                      </button>

                      {/* Button 4: Chat with AI */}
                      <button
                        onClick={() => launchTopicByKeyword("travel")}
                        className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 hover:opacity-90 text-white flex flex-col items-center justify-center text-center gap-2 shadow-lg shadow-amber-600/20 transition-all hover:scale-[1.02]"
                      >
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                          <MessageCircle className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-[11px] leading-tight">Chat with AI</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 4. RECENT ACTIVITY & ACHIEVEMENTS ROW */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
                  {/* Recent Activity (7 cols) */}
                  <div className="md:col-span-7 xl:col-span-7 p-4 rounded-3xl bg-[#111827] border border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <Check className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block">Recent Activity</span>
                        <span className="font-bold text-xs text-white">Completed: Business English Conversation</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 block">2 hours ago</span>
                      <button onClick={() => setActiveTab("history")} className="text-[10px] text-blue-400 hover:underline font-semibold">
                        View All →
                      </button>
                    </div>
                  </div>

                  {/* Achievements Hexagonal Badges (5 cols) */}
                  <div className="md:col-span-5 xl:col-span-5 p-4 rounded-3xl bg-[#111827] border border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-amber-400" />
                      <span className="font-bold text-xs text-white">Achievements</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* 5 Glowing Hexagonal Badges */}
                      <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center shadow-md shadow-amber-500/20" title="Gold Star Speaker">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/40 flex items-center justify-center shadow-md shadow-purple-500/20" title="Global Polyglot">
                        <Globe className="w-3.5 h-3.5" />
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shadow-md shadow-emerald-500/20" title="Fluency Champion">
                        <Trophy className="w-3.5 h-3.5" />
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center shadow-md shadow-cyan-500/20" title="VIP Royal Member">
                        <Crown className="w-3.5 h-3.5" />
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 flex items-center justify-center shadow-md shadow-indigo-500/20" title="Diamond Precision">
                        <Gem className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN (3 cols on xl / 4 cols on lg): Your Streak & Upcoming Lesson */}
              <div className="lg:col-span-4 xl:col-span-3 space-y-6">
                {/* 1. YOUR STREAK CARD */}
                <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800/80 text-center relative overflow-hidden space-y-3">
                  <div className="flex items-center justify-between text-left">
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-amber-500" />
                      <h3 className="font-bold text-xs text-white">Your Streak</h3>
                    </div>
                    <Flame className="w-4 h-4 text-orange-500" />
                  </div>

                  {/* Flame Graphic with 12 Days */}
                  <div className="relative py-3 flex flex-col items-center justify-center">
                    <img
                      src="/images/flame-streak-clean.png"
                      alt="12 Day Flame Streak"
                      className="w-28 h-28 object-contain drop-shadow-[0_0_25px_rgba(245,158,11,0.5)]"
                      onError={(e) => {
                        (e.currentTarget as any).src = "/images/flame-streak.png";
                      }}
                    />
                  </div>

                  <p className="font-bold text-xs text-white">
                    Keep going! You're on fire! 🔥
                  </p>
                </div>

                {/* 2. WEEKLY TARGETS & FLUENCY SPRINT CARD (Matching Mobile App Gamification) */}
                <div className="p-5 rounded-3xl bg-[#111827] border border-slate-800/80 space-y-4 shadow-xl">
                  {/* Header */}
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
                        <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" style={{ width: "20%" }}></div>
                      </div>
                    </div>

                    {/* Weekly sprint progress */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-400">Weekly Goal: 115 / 60 mins</span>
                        <span className="text-emerald-400 font-bold">191% 🔥</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full" style={{ width: "100%" }}></div>
                      </div>
                    </div>
                  </div>

                  {/* 7-Day Speaking Streak Tracker Chips */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-300 block flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-orange-400" />
                      7-Day Streak Tracker:
                    </span>
                    <div className="grid grid-cols-7 gap-1.5 text-center">
                      {[
                        { day: "Mon", done: true },
                        { day: "Tue", done: true },
                        { day: "Wed", done: true },
                        { day: "Thu", done: true },
                        { day: "Fri", done: true, today: true },
                        { day: "Sat", done: false },
                        { day: "Sun", done: false }
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className={`py-1.5 rounded-xl text-[10px] flex flex-col items-center justify-center gap-0.5 border ${
                            item.today
                              ? "bg-emerald-500/25 border-emerald-400 text-emerald-300 font-bold shadow-md shadow-emerald-500/20"
                              : item.done
                              ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400 font-semibold"
                              : "bg-slate-900 border-slate-800 text-slate-500 font-medium"
                          }`}
                        >
                          <span className="text-[9px] uppercase">{item.day}</span>
                          <span className="text-[11px]">{item.done ? "✓" : "○"}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button: Opens Weekly Winners Podium & Leaderboard */}
                  <button
                    onClick={() => setActiveTab("achievements")}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 flex items-center justify-center gap-1.5 transition-all hover:scale-[1.01]"
                  >
                    <Trophy className="w-3.5 h-3.5 fill-slate-950" />
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
            /* TAB: ACHIEVEMENTS & WEEKLY PODIUM                           */
            /* ----------------------------------------------------------- */
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-400" />
                    Weekly Winners Championship Podium
                  </h2>
                  <p className="text-xs text-slate-400">Top learners this week ranked by spoken practice minutes.</p>
                </div>
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  ← Back to Dashboard
                </button>
              </div>

              {/* Podium */}
              <div className="p-8 rounded-3xl bg-[#111827] border border-slate-800 flex items-end justify-center gap-4 max-w-xl mx-auto">
                {/* 2nd Place */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-slate-700 border-2 border-slate-400 flex items-center justify-center font-bold text-white mb-2">
                    J
                  </div>
                  <span className="text-xs font-bold text-white">Jaji</span>
                  <span className="text-[10px] text-slate-400">13m • 50%</span>
                  <div className="w-24 h-28 rounded-t-2xl bg-gradient-to-t from-slate-800 to-slate-700 mt-2 flex items-center justify-center font-black text-xl text-slate-300">
                    #2
                  </div>
                </div>

                {/* 1st Place (Janitha Dilshan) */}
                <div className="flex flex-col items-center">
                  <Crown className="w-6 h-6 text-amber-400 mb-1 animate-bounce" />
                  <img
                    src="/images/janitha-avatar.jpg"
                    alt="Janitha Dilshan"
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-amber-400 mb-2"
                  />
                  <span className="text-xs font-bold text-amber-300">Janitha Dilshan</span>
                  <span className="text-[10px] text-amber-200">190m • 95%</span>
                  <div className="w-28 h-36 rounded-t-2xl bg-gradient-to-t from-amber-600 to-amber-500 mt-2 flex items-center justify-center font-black text-2xl text-slate-950 shadow-xl shadow-amber-500/20">
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
                  <div className="w-24 h-20 rounded-t-2xl bg-gradient-to-t from-orange-950 to-orange-800 mt-2 flex items-center justify-center font-black text-xl text-orange-200">
                    #3
                  </div>
                </div>
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
      {/* 3. DURATION SELECTION MODAL                                   */}
      {/* ------------------------------------------------------------- */}
      {showDurationModal && pendingTopic && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="text-center space-y-1">
              <span className="text-3xl">{pendingTopic.icon}</span>
              <h3 className="font-bold text-sm text-white">{pendingTopic.title}</h3>
              <p className="text-xs text-slate-400">Select speaking call duration:</p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[3, 5, 10].map((mins) => (
                <button
                  key={mins}
                  onClick={() => setSelectedDurationMinutes(mins)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedDurationMinutes === mins
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  {mins} Mins
                </button>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowDurationModal(false)}
                className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmStartCall}
                className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30"
              >
                Start Call Now
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
    </div>
  );
}
