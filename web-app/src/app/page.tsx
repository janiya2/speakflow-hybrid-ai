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
  HybridEngineType,
  HybridModeSetting,
  checkOnDeviceNanoAvailability
} from "@/lib/hybrid-ai";
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
  Compass
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

const FALLBACK_TOPICS: TopicModel[] = [
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
  },
  {
    id: "4",
    title: "Casual Chat: Weekend & Movies",
    language: "English",
    level: "Beginner",
    category: "Entertainment",
    icon: "🎬",
    scenario: "You are meeting a friendly acquaintance at a lounge chatting about favorite movies and hobbies.",
    starterPrompt: "Hey there! It's so nice to talk to you. What kind of hobbies or movies do you usually enjoy?",
    starterQuestions: ["What did you do last weekend?", "Do you like comedy or action movies?"]
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

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<"topics" | "history" | "profile">("topics");

  // Topics & Filtering
  const [topics, setTopics] = useState<TopicModel[]>(FALLBACK_TOPICS);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

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

  // Active Pronunciation Drill Loop State
  const [isDrillMode, setIsDrillMode] = useState(false);
  const [targetPhraseToRepeat, setTargetPhraseToRepeat] = useState("");
  const [nextScenarioQuestion, setNextScenarioQuestion] = useState("");
  const [drillAttempts, setDrillAttempts] = useState(0);

  // In-Call Subtitles & Feedback Tracking
  const [botCaption, setBotCaption] = useState("");
  const [userCaption, setUserCaption] = useState("");
  const [activeCorrection, setActiveCorrection] = useState<{
    original: string;
    correction: string;
    explanation: string;
  } | null>(null);
  const [sessionCorrections, setSessionCorrections] = useState<Array<{
    original: string;
    correction: string;
    explanation: string;
  }>>([]);
  const [successfulDrillsCount, setSuccessfulDrillsCount] = useState(0);
  const [userSpeechTurnsCount, setUserSpeechTurnsCount] = useState(0);
  const [voiceSpeed, setVoiceSpeed] = useState(0.9);

  // Post-Call Score & History State
  const [callHistory, setCallHistory] = useState<CallSessionRecord[]>([]);
  const [latestScoreResult, setLatestScoreResult] = useState<CallSessionRecord | null>(null);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<CallSessionRecord | null>(null);

  // Audio, Speech & Silence Keep-Alive Refs
  const recognitionRef = useRef<any>(null);
  const callTimerRef = useRef<any>(null);
  const silenceTimerRef = useRef<any>(null);
  const proactiveNudgeTimerRef = useRef<any>(null);
  const activeCallTopicRef = useRef<TopicModel | null>(null);
  activeCallTopicRef.current = activeCallTopic;

  // 1. Monitor Authentication State & Ensure Session Persistence
  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).catch((err) => {
      console.warn("Auth persistence error:", err);
    });

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);

      if (currentUser) {
        // Sync or create user profile in lang_users
        try {
          const userDocRef = doc(db, COLLECTIONS.USERS, currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (!userDoc.exists()) {
            await setDoc(userDocRef, {
              email: currentUser.email || "guest@speakflow.ai",
              displayName: currentUser.displayName || (currentUser.isAnonymous ? "Guest Student" : "Language Student"),
              createdAt: new Date().toISOString(),
              totalCalls: 0,
              totalMinutes: 0,
              averageScore: 0,
              streak: 1,
              targetLanguages: ["English", "Japanese", "Spanish", "Korean", "Arabic", "Tamil"]
            });
          }
        } catch (e) {
          console.warn("User sync warning:", e);
        }

        // Fetch User Call History
        loadUserHistory(currentUser.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  // 2. Load Firestore Topics & AI Configuration
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const topicsSnap = await getDocs(collection(db, COLLECTIONS.TOPICS));
        if (!topicsSnap.empty) {
          const loaded = topicsSnap.docs.map((d) => ({
            id: d.id,
            ...d.data()
          })) as TopicModel[];
          setTopics(loaded);
        }

        const aiDoc = await getDoc(doc(db, COLLECTIONS.SETTINGS, "ai_config"));
        if (aiDoc.exists()) {
          const data = aiDoc.data();
          if (data.geminiApiKey) setGeminiApiKey(data.geminiApiKey);
          if (Array.isArray(data.fallbackKeys)) {
            setFallbackKeys(data.fallbackKeys.filter((k: any) => typeof k === "string" && k.trim().length > 10));
          }
          if (data.keyRotationStrategy) setKeyRotationStrategy(data.keyRotationStrategy);
          if (data.selectedModel) setSelectedModel(data.selectedModel);
          if (data.drillModeEnabled !== undefined) setDrillModeEnabled(data.drillModeEnabled);
          if (data.voiceSpeed) setVoiceSpeed(data.voiceSpeed);
        }
      } catch (e) {
        console.error("Config load error:", e);
      }
    };

    loadConfig();
  }, []);

  // 3. Load User History
  const loadUserHistory = async (uid: string) => {
    try {
      const q = query(
        collection(db, COLLECTIONS.SESSIONS),
        where("userId", "==", uid),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      const records = snap.docs.map((d) => ({
        id: d.id,
        ...d.data()
      })) as CallSessionRecord[];
      setCallHistory(records);
    } catch (e) {
      // Fallback query without index
      try {
        const q2 = query(collection(db, COLLECTIONS.SESSIONS), where("userId", "==", uid));
        const snap2 = await getDocs(q2);
        const records2 = snap2.docs.map((d) => ({
          id: d.id,
          ...d.data()
        })) as CallSessionRecord[];
        records2.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
        setCallHistory(records2);
      } catch (err) {
        console.warn("History load err:", err);
      }
    }
  };

  // 4. In-Call Duration & Countdown Timer
  useEffect(() => {
    if (activeCallTopic) {
      callTimerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);

        // If timed call: decrement countdown
        setRemainingSeconds((prev) => {
          if (prev === null) return null;
          if (prev <= 1) {
            // Time is up! Graceful conclusion
            triggerTimedCallWrapUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (callTimerRef.current) clearInterval(callTimerRef.current);
      setCallDuration(0);
      setRemainingSeconds(null);
    }

    return () => {
      if (callTimerRef.current) clearInterval(callTimerRef.current);
    };
  }, [activeCallTopic]);

  const triggerTimedCallWrapUp = () => {
    speakText("Our practice time for this call has concluded! You did an amazing job today. Let's look at your score!", activeCallTopic?.language || "English");
    setTimeout(() => {
      handleEndCall();
    }, 4500);
  };

  // 5. Proactive Bot Keep-Alive (Prompts user if silence > 8 seconds)
  const resetProactiveNudgeTimer = () => {
    if (proactiveNudgeTimerRef.current) clearTimeout(proactiveNudgeTimerRef.current);

    if (activeCallTopic && !isBotSpeaking && !isProcessing) {
      proactiveNudgeTimerRef.current = setTimeout(() => {
        handleSilenceNudge();
      }, 8500);
    }
  };

  const handleSilenceNudge = () => {
    if (!activeCallTopicRef.current || isBotSpeaking || isProcessing) return;

    const lang = activeCallTopicRef.current.language;
    let nudge = "Take your time! No rush at all. Would you like me to repeat the question, or give you a hint?";
    if (lang === "Japanese") nudge = "ゆっくりで大丈夫ですよ！質問をもう一度言いましょうか？";
    else if (lang === "Korean") nudge = "천천히 생각하고 말씀하셔도 괜찮아요! 질문을 다시 해드릴까요?";

    speakText(nudge, lang);
  };

  // 6. Audio Text-to-Speech (TTS): Dual-Engine (Online Edge Neural Studio / Offline Local Web Speech)
  const speakText = (text: string, lang: string = "English") => {
    if (typeof window === "undefined") return;
    if (proactiveNudgeTimerRef.current) clearTimeout(proactiveNudgeTimerRef.current);

    // Cancel any currently playing audio
    if (activeAudioRef.current) {
      try {
        activeAudioRef.current.pause();
        activeAudioRef.current.currentTime = 0;
      } catch (_) {}
      activeAudioRef.current = null;
    }
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    // ONLINE ENGINE: Microsoft Edge Neural TTS (Ultra-Realistic Human Voice)
    if (!simulateOffline) {
      try {
        const ttsUrl = `/api/tts?text=${encodeURIComponent(text)}&coach=${encodeURIComponent(selectedCoach.id)}&gender=${encodeURIComponent(selectedCoach.gender)}&language=${encodeURIComponent(lang)}&voice=${encodeURIComponent(selectedCoach.voice)}`;
        const audio = new Audio(ttsUrl);
        activeAudioRef.current = audio;

        audio.onplay = () => {
          setIsBotSpeaking(true);
          setBotCaption(text);
        };

        audio.onended = () => {
          setIsBotSpeaking(false);
          activeAudioRef.current = null;
          if (!isMuted && activeCallTopicRef.current) {
            startListening();
            resetProactiveNudgeTimer();
          }
        };

        audio.onerror = (e) => {
          console.warn("Neural TTS streaming failed, falling back to local speech synthesis:", e);
          fallbackLocalSpeechSynthesis(text, lang);
        };

        audio.play().catch((err) => {
          console.warn("Audio autoplay blocked or offline, falling back:", err);
          fallbackLocalSpeechSynthesis(text, lang);
        });
        return;
      } catch (err) {
        console.error("Neural TTS initialization error:", err);
      }
    }

    // OFFLINE FALLBACK: Local Browser Web Speech API
    fallbackLocalSpeechSynthesis(text, lang);
  };

  const fallbackLocalSpeechSynthesis = (text: string, lang: string = "English") => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    if (lang === "Japanese") utterance.lang = "ja-JP";
    else if (lang === "Korean") utterance.lang = "ko-KR";
    else if (lang === "Spanish") utterance.lang = "es-ES";
    else if (lang === "Arabic") utterance.lang = "ar-SA";
    else if (lang === "Tamil") utterance.lang = "ta-IN";
    else utterance.lang = "en-US";

    utterance.rate = voiceSpeed;
    utterance.pitch = selectedCoach.gender === "male" ? 0.9 : 1.2;

    utterance.onstart = () => {
      setIsBotSpeaking(true);
      setBotCaption(text);
    };

    utterance.onend = () => {
      setIsBotSpeaking(false);
      if (!isMuted && activeCallTopicRef.current) {
        startListening();
        resetProactiveNudgeTimer();
      }
    };

    utterance.onerror = () => {
      setIsBotSpeaking(false);
      if (!isMuted && activeCallTopicRef.current) {
        startListening();
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  // 7. Speech-to-Text (STT) with Keep-Alive Auto-Reconnect
  const startListening = () => {
    if (typeof window === "undefined" || !activeCallTopicRef.current) return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;

    const lang = activeCallTopicRef.current.language;
    if (lang === "Japanese") recognition.lang = "ja-JP";
    else if (lang === "Korean") recognition.lang = "ko-KR";
    else if (lang === "Spanish") recognition.lang = "es-ES";
    else if (lang === "Arabic") recognition.lang = "ar-SA";
    else if (lang === "Tamil") recognition.lang = "ta-IN";
    else recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsUserSpeaking(true);
    };

    recognition.onresult = (event: any) => {
      if (proactiveNudgeTimerRef.current) clearTimeout(proactiveNudgeTimerRef.current);

      let interim = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      const spoken = finalTranscript || interim;
      setUserCaption(spoken);

      // Smart silence auto-detection (1.4 seconds debounce)
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      if (spoken.trim().length > 0) {
        silenceTimerRef.current = setTimeout(() => {
          handleUserSpeech(spoken);
        }, 1400);
      }

      if (finalTranscript) {
        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
        handleUserSpeech(finalTranscript);
      }
    };

    recognition.onerror = (e: any) => {
      setIsUserSpeaking(false);
      // Auto reconnect on harmless speech timeout if call is active
      if (activeCallTopicRef.current && !isBotSpeaking && !isProcessing) {
        setTimeout(() => startListening(), 500);
      }
    };

    recognition.onend = () => {
      setIsUserSpeaking(false);
      // If recognition ended prematurely while call is still active, restart it seamlessly
      if (activeCallTopicRef.current && !isBotSpeaking && !isProcessing) {
        setTimeout(() => {
          if (activeCallTopicRef.current && !isBotSpeaking && !isProcessing) {
            startListening();
          }
        }, 300);
      }
    };

    try {
      recognition.start();
      recognitionRef.current = recognition;
    } catch (e) {
      console.warn("Recognition err:", e);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
      recognitionRef.current = null;
    }
    setIsUserSpeaking(false);
  };

  // 8. Start Call Flow with Duration Selection
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

    // Setup duration timer
    if (selectedDurationMinutes !== null) {
      setRemainingSeconds(selectedDurationMinutes * 60);
    } else {
      setRemainingSeconds(null);
    }

    // AI Greets first
    speakText(topic.starterPrompt, topic.language);
  };

  // 9. Repeat Match Helper
  const checkRepetitionMatch = (spoken: string, target: string) => {
    const cleanSpoken = spoken.toLowerCase().replace(/[^\w\s]/g, "").trim();
    const cleanTarget = target.toLowerCase().replace(/[^\w\s]/g, "").trim();

    if (!cleanSpoken || !cleanTarget) return false;
    if (cleanSpoken === cleanTarget || cleanSpoken.includes(cleanTarget) || cleanTarget.includes(cleanSpoken)) {
      return true;
    }

    const spokenTokens = new Set(cleanSpoken.split(/\s+/).filter(Boolean));
    const targetTokens = new Set(cleanTarget.split(/\s+/).filter(Boolean));
    const matches = Array.from(targetTokens).filter((t) => spokenTokens.has(t));
    return matches.length / targetTokens.size >= 0.6;
  };

  // 10. Process User Speech Turn
  const handleUserSpeech = async (spokenText: string) => {
    stopListening();
    setIsProcessing(true);
    setUserSpeechTurnsCount((prev) => prev + 1);
    if (proactiveNudgeTimerRef.current) clearTimeout(proactiveNudgeTimerRef.current);

    const lang = activeCallTopic?.language || "English";

    // A. ACTIVE PRONUNCIATION DRILL REPETITION EVALUATION
    if (isDrillMode && targetPhraseToRepeat) {
      const isMatch = checkRepetitionMatch(spokenText, targetPhraseToRepeat);

      if (isMatch) {
        // Success! User repeated correctly!
        setSuccessfulDrillsCount((prev) => prev + 1);
        setIsDrillMode(false);
        setActiveCorrection(null);
        setDrillAttempts(0);
        setIsProcessing(false);

        let praise = "Awesome! Perfect pronunciation! 🎉";
        if (lang === "Japanese") praise = "素晴らしい！完璧な発音です！🎉";
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
          // Gracefully continue after 2 tries
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
          // Retry prompt
          setIsProcessing(false);
          let retry = `Very close! Listen carefully: '${targetPhraseToRepeat}'. Try once more!`;
          if (lang === "Japanese") retry = `惜しいです！よく聞いてもう一度言ってみてください:「${targetPhraseToRepeat}」`;
          else if (lang === "Korean") retry = `아쉬워요! 잘 듣고 한 번 더 말해보세요: '${targetPhraseToRepeat}'`;

          speakText(retry, lang);
          return;
        }
      }
    }
    // B. EXECUTE FIREBASE AI LOGIC: HYBRID INFERENCE
    // Dual-Tier Routing between On-Device Gemini Nano and Cloud Gemini 2.5 Flash
    const now = Date.now();
    const orderedKeyPool: string[] = [];

    if (keyRotationStrategy === "paid-only") {
      if (geminiApiKey && geminiApiKey.length > 10) orderedKeyPool.push(geminiApiKey);
    } else {
      for (const k of fallbackKeys) {
        if (k && k.length > 10) {
          const cooldownEnd = keyCooldownsRef.current.get(k) || 0;
          if (now >= cooldownEnd) orderedKeyPool.push(k);
        }
      }
      if (geminiApiKey && geminiApiKey.length > 10) {
        const paidCooldown = keyCooldownsRef.current.get(geminiApiKey) || 0;
        if (now >= paidCooldown) orderedKeyPool.push(geminiApiKey);
      }
      if (orderedKeyPool.length === 0) {
        if (fallbackKeys.length > 0) orderedKeyPool.push(...fallbackKeys);
        if (geminiApiKey) orderedKeyPool.push(geminiApiKey);
      }
    }

    const hybridResult = await executeHybridInference({
      spokenText,
      language: lang,
      scenario: activeCallTopic?.scenario || "Spoken practice",
      drillModeEnabled,
      orderedKeyPool,
      selectedModel,
      modeSetting: hybridModeSetting,
      simulateOffline
    });

    setIsProcessing(false);
    setHybridEngine(hybridResult.engineUsed);
    setHybridLatency(hybridResult.latencyMs);
    setEngineModelLabel(hybridResult.modelIdentifier);

    if (hybridResult.hasCorrection) {
      const corObj = {
        original: hybridResult.original || hybridResult.correction,
        correction: hybridResult.correction,
        explanation: hybridResult.explanation
      };
      setActiveCorrection(corObj);
      setSessionCorrections((prev) => [...prev, corObj]);

      if (drillModeEnabled && hybridResult.targetPhrase) {
        setIsDrillMode(true);
        setTargetPhraseToRepeat(hybridResult.targetPhrase || hybridResult.correction);
        setNextScenarioQuestion(hybridResult.nextQuestion || "What do you think?");
        setDrillAttempts(0);
      }
    } else {
      setActiveCorrection(null);
      setIsDrillMode(false);
    }

    speakText(hybridResult.spokenReply, lang);
  };

  // 11. Calculate Score & End Call
  const handleEndCall = async () => {
    stopListening();
    if (proactiveNudgeTimerRef.current) clearTimeout(proactiveNudgeTimerRef.current);
    if (activeAudioRef.current) {
      try {
        activeAudioRef.current.pause();
        activeAudioRef.current.currentTime = 0;
      } catch (_) {}
      activeAudioRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    if (!activeCallTopic) return;

    // SCORING ENGINE:
    // Base 85
    // + Fluency bonus up to 15 (based on speaking turns and duration)
    // - Mistake penalty (6 pts per error)
    // + Drill mastery bonus (5 pts per successful repeat)
    const turns = userSpeechTurnsCount;
    const errors = sessionCorrections.length;
    const drillsMastered = successfulDrillsCount;

    let fluency = Math.min(95, 70 + Math.round(turns * 4) + (callDuration > 60 ? 10 : 5));
    let accuracy = Math.max(50, 100 - (errors * 7) + (drillsMastered * 5));
    let totalScore = Math.round((fluency * 0.45) + (accuracy * 0.55));
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
      userName: user?.displayName || "Student",
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

    setLatestScoreResult(sessionRecord);
    setShowScoreModal(true);

    // Save to Firestore lang_sessions
    try {
      if (callDuration > 5) {
        const docRef = await addDoc(collection(db, COLLECTIONS.SESSIONS), sessionRecord);
        sessionRecord.id = docRef.id;

        // Update User Profile Stats in lang_users
        if (user && !user.isAnonymous) {
          const userDocRef = doc(db, COLLECTIONS.USERS, user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const currentData = userDoc.data();
            const totalCalls = (currentData.totalCalls || 0) + 1;
            const totalMinutes = (currentData.totalMinutes || 0) + Math.round(callDuration / 60);
            const currentAvg = currentData.averageScore || totalScore;
            const newAvg = Math.round((currentAvg + totalScore) / 2);

            await setDoc(userDocRef, {
              totalCalls,
              totalMinutes,
              averageScore: newAvg,
              lastPracticedAt: new Date().toISOString()
            }, { merge: true });
          }
        }

        // Prepend to local history
        setCallHistory((prev) => [sessionRecord, ...prev]);
      }
    } catch (e) {
      console.error("Save session failed:", e);
    }
  };

  const handleCloseScoreModal = () => {
    setShowScoreModal(false);
    setActiveCallTopic(null);
    setIsBotSpeaking(false);
    setIsUserSpeaking(false);
    setIsDrillMode(false);
  };

  // 12. Authentication Handlers
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthSubmitting(true);

    try {
      if (authMode === "login") {
        await signInWithEmailAndPassword(auth, authEmail.trim(), authPassword);
      } else {
        const userCred = await createUserWithEmailAndPassword(auth, authEmail.trim(), authPassword);
        if (authName.trim()) {
          await updateProfile(userCred.user, { displayName: authName.trim() });
        }
      }
    } catch (err: any) {
      setAuthError(err.message || "Authentication failed.");
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setAuthError("");
    setAuthSubmitting(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope("email");
      provider.addScope("profile");
      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;
      if (googleUser) {
        const userDocRef = doc(db, COLLECTIONS.USERS, googleUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
          await setDoc(userDocRef, {
            email: googleUser.email,
            displayName: googleUser.displayName || "Language Student",
            photoURL: googleUser.photoURL,
            createdAt: new Date().toISOString(),
            totalCalls: 0,
            totalMinutes: 0,
            averageScore: 0,
            streak: 1,
            targetLanguages: ["English", "Japanese", "Spanish", "Korean", "Arabic", "Tamil"]
          });
        }
      }
    } catch (err: any) {
      setAuthError(err.message || "Google Sign-In failed.");
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    if (activeCallTopic) handleEndCall();
    await signOut(auth);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // 13. AUTHENTICATION GATE SCREEN
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#090D16] flex items-center justify-center text-white">
        <div className="w-8 h-8 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#090D16] text-slate-100 flex items-center justify-center px-4 sm:px-6 py-12 relative overflow-hidden">
        {/* Background ambient glowing orbs */}
        <div className="absolute top-1/4 -left-20 w-[550px] h-[550px] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-10 -right-20 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[160px] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/3 w-[350px] h-[350px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
          {/* LEFT SHOWCASE COLUMN (Desktop) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider">
                Next-Gen AI Voice Coach
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.12]">
              Speak Any Language<br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                Like a Native Partner.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Zero typing, zero flashcards. Practice real-time spoken phone conversations with AI in English, Japanese, and Korean. Perfect your pronunciation through intelligent active repetition loops!
            </p>

            {/* Animated Soundwave Card */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur flex items-center gap-4 max-w-lg">
              <div className="flex items-center gap-1.5 h-8">
                <span className="w-1 h-4 bg-emerald-400 rounded-full animate-pulse"></span>
                <span className="w-1 h-7 bg-indigo-500 rounded-full animate-bounce"></span>
                <span className="w-1 h-8 bg-purple-500 rounded-full animate-pulse"></span>
                <span className="w-1 h-5 bg-pink-500 rounded-full animate-bounce"></span>
                <span className="w-1 h-3 bg-emerald-400 rounded-full animate-pulse"></span>
              </div>
              <div>
                <p className="text-xs font-bold text-white">Ultra-Low Latency Speech Recognition</p>
                <p className="text-[11px] text-slate-400">Live subtitle captions, instant grammar fixes & speaking scores</p>
              </div>
            </div>

            {/* 3 Feature Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 text-center">
                <PhoneCall className="w-5 h-5 text-indigo-400 mx-auto mb-1" />
                <span className="text-xs font-semibold text-slate-200 block">Real Voice Calls</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 text-center">
                <Repeat className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                <span className="text-xs font-semibold text-slate-200 block">Pronounce Drill</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 text-center">
                <Award className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                <span className="text-xs font-semibold text-slate-200 block">0-100 Scores</span>
              </div>
            </div>
          </div>

          {/* RIGHT GLASSMORPHISM AUTH CARD */}
          <div className="lg:col-span-5 w-full">
            <div className="w-full bg-slate-900/85 border border-indigo-500/30 rounded-3xl p-7 sm:p-8 shadow-2xl backdrop-blur-xl relative space-y-6">
              {/* Header */}
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/30">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">Student Portal</h2>
                <p className="text-xs text-slate-400">
                  {authMode === "login" ? "Sign in to start your practice session" : "Create your student account in seconds"}
                </p>
              </div>

              {/* Tab Switcher */}
              <div className="flex p-1 bg-slate-950/80 rounded-2xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => { setAuthMode("login"); setAuthError(""); }}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    authMode === "login"
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthMode("register"); setAuthError(""); }}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    authMode === "register"
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Register
                </button>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 flex-shrink-0 text-rose-400" />
                  <span>{authError}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {authMode === "register" && (
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      placeholder="e.g. Kasun Perera"
                      className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 focus:border-indigo-500 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                    />
                  </div>
                )}

                <div>
                  <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 focus:border-indigo-500 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 focus:border-indigo-500 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={authSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
                >
                  {authSubmitting ? "Processing..." : authMode === "login" ? "Sign In & Practice" : "Create Account"}
                </button>
              </form>

              {/* OR Divider */}
              <div className="flex items-center gap-3 my-2">
                <div className="flex-1 h-px bg-slate-800"></div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">OR</span>
                <div className="flex-1 h-px bg-slate-800"></div>
              </div>

              {/* Official Google Sign In Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={authSubmitting}
                className="w-full py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs flex items-center justify-center gap-2.5 transition-all shadow-md"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 14. LOGGED-IN MAIN APPLICATION
  const filteredTopics = topics.filter((t) => {
    const matchesLang = selectedLanguage === "All" || t.language === selectedLanguage;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.scenario.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLang && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* GLOBAL NAVBAR */}
      <header className="border-b border-slate-800/80 bg-slate-900/70 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white tracking-tight">SpeakFlow AI</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  VOICE ACTIVE
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">AI Real-Time Voice Language Coach</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-950/70 rounded-2xl border border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab("topics")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === "topics"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Practice Topics</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("history")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === "history"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>History & Scores ({callHistory.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === "profile"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Profile</span>
            </button>
          </div>

          {/* User Profile Pill & Logout */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs">
              <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-[11px]">
                {user.displayName ? user.displayName[0].toUpperCase() : "S"}
              </div>
              <span className="text-slate-200 font-semibold">{user.displayName || "Student"}</span>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-700 hover:border-rose-500/30 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* IF A CALL IS ACTIVE: FULLSCREEN PHONE CALL INTERFACE */}
        {activeCallTopic ? (
          <div className="max-w-2xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur relative overflow-hidden flex flex-col min-h-[600px]">
            {/* CALL HEADER */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-800/80">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{activeCallTopic.icon}</span>
                <div>
                  <h3 className="font-bold text-white text-base leading-tight">{activeCallTopic.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="text-xs font-mono text-emerald-400 font-semibold">
                      {remainingSeconds !== null ? `Time Left: ${formatDuration(remainingSeconds)}` : `Duration: ${formatDuration(callDuration)}`}
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="text-xs text-slate-400">{activeCallTopic.language}</span>
                  </div>
                </div>
              </div>

              {/* VOICE SPEED SELECTOR */}
              <div className="flex items-center gap-2 bg-slate-950/70 border border-slate-800 rounded-xl px-2.5 py-1">
                <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
                <select
                  value={voiceSpeed}
                  onChange={(e) => setVoiceSpeed(parseFloat(e.target.value))}
                  className="bg-transparent text-xs text-slate-300 font-semibold focus:outline-none cursor-pointer"
                >
                  <option value={0.75} className="bg-slate-900 text-white">0.75x (Slow)</option>
                  <option value={0.9} className="bg-slate-900 text-white">0.9x (Natural)</option>
                  <option value={1.1} className="bg-slate-900 text-white">1.1x (Fast)</option>
                </select>
              </div>
            </div>

            {/* ======================================================== */}
            {/* GOOGLE FIREBASE #BUILDHYBRIDAI 2026: HYBRID INFERENCE HUD */}
            {/* ======================================================== */}
            <div className="mb-4 bg-slate-950/80 border border-slate-800 rounded-2xl p-3 shadow-inner">
              <div className="flex flex-wrap items-center justify-between gap-2">
                {/* Active Engine Badge */}
                <div className="flex items-center gap-2">
                  {hybridEngine === "ON_DEVICE_NANO" ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono bg-amber-500/15 border border-amber-500/40 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)]">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                      ⚡ ON-DEVICE: GEMINI NANO
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.25)]">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                      ☁️ CLOUD: GEMINI 2.5 FLASH (FIREBASE)
                    </span>
                  )}
                  
                  <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                    {hybridLatency > 0 ? `${hybridLatency}ms` : "Ready"} • {engineModelLabel}
                  </span>
                </div>

                {/* Mode Selector & In-Flight / Offline Simulator */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-slate-900 border border-slate-700/80 rounded-xl p-0.5 text-[11px] font-medium">
                    <button
                      onClick={() => setHybridModeSetting("auto")}
                      className={`px-2.5 py-1 rounded-lg transition-all ${
                        hybridModeSetting === "auto"
                          ? "bg-indigo-600 text-white font-bold shadow"
                          : "text-slate-400 hover:text-white"
                      }`}
                      title="Auto-route: Low latency / offline -> Nano; Deep roleplay -> Cloud"
                    >
                      🔄 Auto Hybrid
                    </button>
                    <button
                      onClick={() => setHybridModeSetting("nano_only")}
                      className={`px-2.5 py-1 rounded-lg transition-all ${
                        hybridModeSetting === "nano_only"
                          ? "bg-amber-600 text-white font-bold shadow"
                          : "text-slate-400 hover:text-white"
                      }`}
                      title="Force On-Device Nano Execution (0ms latency, zero API cost)"
                    >
                      ⚡ Nano Only
                    </button>
                    <button
                      onClick={() => setHybridModeSetting("cloud_only")}
                      className={`px-2.5 py-1 rounded-lg transition-all ${
                        hybridModeSetting === "cloud_only"
                          ? "bg-cyan-600 text-white font-bold shadow"
                          : "text-slate-400 hover:text-white"
                      }`}
                      title="Force Cloud Gemini Flash"
                    >
                      ☁️ Cloud Only
                    </button>
                  </div>

                  {/* Flight / Offline Mode Simulator Button */}
                  <button
                    onClick={() => setSimulateOffline(!simulateOffline)}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all flex items-center gap-1.5 ${
                      simulateOffline
                        ? "bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-[0_0_12px_rgba(244,63,94,0.3)] animate-pulse"
                        : "bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-500 hover:text-white"
                    }`}
                    title="Simulate In-Flight / Zero-Internet mode to test On-Device AI fallback live"
                  >
                    <span>✈️</span>
                    <span>{simulateOffline ? "In-Flight Mode ON" : "Simulate Offline"}</span>
                  </button>
                </div>
              </div>

              {/* Info Banner when in Offline mode */}
              {simulateOffline && (
                <div className="mt-2 text-[11px] text-amber-300/90 font-mono flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 rounded-lg px-2.5 py-1">
                  <span>📴 In-Flight / Offline Mode Active:</span>
                  <span className="text-slate-300">All spoken speech is processed 100% locally on-device with zero network latency!</span>
                </div>
              )}
            </div>

            {/* CALL CENTER: AVATAR & PROACTIVE STATUS */}
            <div className="flex-1 flex flex-col items-center justify-center py-8">
              <div className="relative flex items-center justify-center">
                {(isBotSpeaking || isUserSpeaking) && (
                  <div className="absolute w-44 h-44 rounded-full bg-indigo-500/20 animate-ping"></div>
                )}
                {isProcessing && (
                  <div className="absolute w-40 h-40 rounded-full bg-amber-500/20 animate-pulse"></div>
                )}

                <div className={`w-32 h-32 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 z-10 overflow-hidden relative border-4 ${
                  isBotSpeaking
                    ? "border-indigo-500 shadow-indigo-500/50 scale-105"
                    : isProcessing
                    ? "border-amber-500 shadow-amber-500/50 animate-pulse"
                    : isUserSpeaking
                    ? "border-emerald-500 shadow-emerald-500/50 scale-105"
                    : "border-slate-700 shadow-black/50"
                }`}>
                  <img
                    src={selectedCoach.avatar}
                    alt={selectedCoach.name}
                    className="w-full h-full object-cover"
                  />
                  {isBotSpeaking && (
                    <div className="absolute inset-0 bg-indigo-600/20 backdrop-blur-[1px] flex items-center justify-center">
                      <Volume2 className="w-8 h-8 text-white animate-bounce" />
                    </div>
                  )}
                </div>
              </div>

              {/* Coach Persona & Voice Indicator */}
              <div className="mt-4 flex items-center gap-2">
                <span className="font-bold text-white text-base">Coach {selectedCoach.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  selectedCoach.gender === "male"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                    : "bg-pink-500/20 text-pink-300 border border-pink-500/30"
                }`}>
                  {selectedCoach.gender === "male" ? "👨‍💼 Male Voice" : "👩‍💼 Female Voice"}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 hidden sm:inline-block">
                  {selectedCoach.voice}
                </span>
              </div>

              {/* Status Indicator */}
              <div className="mt-6 text-center">
                <p className={`text-sm font-semibold tracking-wide ${
                  isBotSpeaking
                    ? "text-indigo-400"
                    : isProcessing
                    ? "text-amber-400"
                    : isUserSpeaking
                    ? "text-emerald-400"
                    : "text-slate-400"
                }`}>
                  {isBotSpeaking
                    ? "AI Coach Speaking..."
                    : isProcessing
                    ? "Analyzing & generating next question..."
                    : isUserSpeaking
                    ? "Listening to you... (කතා කරන්න)"
                    : "Waiting for your speech..."}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  The bot will automatically nudge you if you hesitate. Speak freely!
                </p>
              </div>
            </div>

            {/* BOTTOM CARDS: DRILL MODE, FEEDBACK, SUBTITLES */}
            <div className="space-y-3 mb-6">
              {/* 🔁 REPEAT & PERFECT DRILL MODE CARD */}
              {isDrillMode && targetPhraseToRepeat && (
                <div className="p-4 rounded-2xl bg-indigo-950/80 border-2 border-indigo-500/80 shadow-lg shadow-indigo-500/20 animate-fadeIn">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Repeat className="w-4 h-4 text-indigo-400 animate-spin" />
                      <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                        🔁 Repeat to Continue (නැවත පවසන්න)
                      </span>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                      Attempt {drillAttempts + 1} of 2
                    </span>
                  </div>
                  <div className="p-3 bg-slate-950/90 rounded-xl border border-indigo-500/30">
                    <p className="text-base font-bold text-emerald-400">
                      "{targetPhraseToRepeat}"
                    </p>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2">
                    කරුණාකර ඉහත නිවැරදි වාක්‍යය microphone එකට පවසන්න. ඔබ එය නිවැරදිව පැවසූ පසු ඊළඟ ප්‍රශ්නය unlock වේ.
                  </p>
                </div>
              )}

              {/* CORRECTION FEEDBACK CARD */}
              {activeCorrection && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 backdrop-blur">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    <span>Coach Feedback (වැරදි නිවැරදි කිරීම)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm mt-2">
                    <span className="line-through text-rose-400 font-semibold">{activeCorrection.original}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-emerald-400 font-bold">{activeCorrection.correction}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{activeCorrection.explanation}</p>
                </div>
              )}

              {/* SUBTITLES BOX */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  {isBotSpeaking ? "AI Coach Subtitles:" : "Your Speech (ඔබ කී දේ):"}
                </span>
                <p className="text-sm text-slate-200 min-h-[24px]">
                  {isBotSpeaking ? botCaption : userCaption || "(Listening to microphone...)"}
                </p>
              </div>
            </div>

            {/* CALL ACTION BAR */}
            <div className="flex items-center justify-center gap-4 pt-4 border-t border-slate-800/80">
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${
                  isMuted
                    ? "bg-rose-500/20 text-rose-400 border-rose-500/30"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                }`}
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!isUserSpeaking && !isBotSpeaking) startListening();
                }}
                className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
              >
                <Mic className="w-4 h-4" />
                <span>Tap to Speak Now</span>
              </button>

              <button
                type="button"
                onClick={handleEndCall}
                className="w-12 h-12 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-600/30 transition-all"
                title="End Call & See Scores"
              >
                <PhoneOff className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : activeTab === "topics" ? (
          /* TAB 1: TOPIC CATALOG */
          <div className="space-y-8">
            {/* HERO BANNER */}
            <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900/60 border border-slate-800/80 backdrop-blur relative overflow-hidden">
              <div className="max-w-2xl relative z-10">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 inline-flex items-center gap-1.5 mb-3">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  Real-Time Speaking Mastery
                </span>
                <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                  Talk with your AI Coach like a Real Phone Call.
                </h2>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  Choose a scenario, set your call duration, and talk freely. The AI coach prompts you continuously and tests your pronunciation with instant scores!
                </p>
              </div>
            </div>

            {/* AI COACH SELECTION BAR (MALE & FEMALE NEURAL VOICES) */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white tracking-tight">Select Your AI Voice Coach</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold">
                      MICROSOFT EDGE NEURAL STUDIO
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Choose between verified Male & Female coaches with ultra-realistic human speech.
                  </p>
                </div>
                <div className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-xl flex items-center gap-1.5 self-start sm:self-auto">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active: {selectedCoach.name} ({selectedCoach.gender === "male" ? "👨‍💼 Male" : "👩‍💼 Female"})
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {COACHES.map((coach) => {
                  const isSelected = selectedCoach.id === coach.id;
                  return (
                    <button
                      key={coach.id}
                      type="button"
                      onClick={() => setSelectedCoach(coach)}
                      className={`p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between relative group ${
                        isSelected
                          ? "bg-indigo-600/15 border-indigo-500 shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-500"
                          : "bg-slate-950/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 mb-2">
                        <img
                          src={coach.avatar}
                          alt={coach.name}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-bold text-xs text-white">{coach.name}</h4>
                            <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                              coach.gender === "male"
                                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                                : "bg-pink-500/20 text-pink-300 border border-pink-500/30"
                            }`}>
                              {coach.gender === "male" ? "MALE" : "FEMALE"}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 line-clamp-1">{coach.accent.split("/")[0]}</p>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                        {coach.tagline}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* FILTER & SEARCH */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900/80 border border-slate-800/80">
                {["All", "English", "Japanese", "Spanish", "Korean", "Arabic", "Tamil"].map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      selectedLanguage === lang
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search scenarios..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* TOPICS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/50 transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700/60 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                          {topic.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-base group-hover:text-indigo-300 transition-colors">
                            {topic.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                              {topic.language}
                            </span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                              {topic.level}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                      {topic.scenario}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Live Voice Call</span>
                    <button
                      type="button"
                      onClick={() => handleInitiateCallPrompt(topic)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Start Call (කතා කරන්න)</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === "history" ? (
          /* TAB 2: CALL HISTORY & SCORES */
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Call History & Speaking Scores</h2>
              <p className="text-xs text-slate-400 mt-1">
                Review your speaking performance, pronunciation accuracy, and coach feedback from past calls.
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-[11px] text-slate-500 block">Total Calls Taken</span>
                <span className="text-2xl font-bold text-white font-mono mt-1 block">{callHistory.length}</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-[11px] text-slate-500 block">Total Practice Time</span>
                <span className="text-2xl font-bold text-indigo-400 font-mono mt-1 block">
                  {Math.round(callHistory.reduce((acc, c) => acc + c.durationSeconds, 0) / 60)} mins
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-[11px] text-slate-500 block">Average Score</span>
                <span className="text-2xl font-bold text-emerald-400 font-mono mt-1 block">
                  {callHistory.length > 0
                    ? `${Math.round(callHistory.reduce((acc, c) => acc + c.score, 0) / callHistory.length)}/100`
                    : "--"}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-[11px] text-slate-500 block">Active Streak</span>
                <span className="text-2xl font-bold text-amber-400 font-mono mt-1 flex items-center gap-1">
                  <Flame className="w-5 h-5 fill-amber-400" />
                  1 Day
                </span>
              </div>
            </div>

            {/* Call History List */}
            {callHistory.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800 space-y-3">
                <History className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="text-base font-bold text-slate-300">No calls recorded yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Start your first voice call from the Practice Topics tab to see your scores and feedback recorded here.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab("topics")}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
                >
                  Start First Call
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {callHistory.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    onClick={() => setSelectedHistoryItem(item)}
                    className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 font-bold flex flex-col items-center justify-center">
                        <span className="text-base">{item.grade}</span>
                        <span className="text-[9px] font-mono">{item.score}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm group-hover:text-indigo-300 transition-colors">
                          {item.topicTitle}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                          <span>{item.language}</span>
                          <span>•</span>
                          <span>{formatDuration(item.durationSeconds)}</span>
                          <span>•</span>
                          <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {item.totalCorrections} Corrections
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* TAB 3: USER PROFILE & STATS */
          <div className="max-w-xl mx-auto space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 text-center space-y-4">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center mx-auto text-2xl font-bold text-white shadow-xl shadow-indigo-600/30">
                {user.displayName ? user.displayName[0].toUpperCase() : "S"}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{user.displayName || "Language Student"}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{user.email || "Guest Session"}</p>
              </div>

              <div className="pt-4 border-t border-slate-800 grid grid-cols-3 gap-2">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Calls</span>
                  <span className="text-lg font-bold text-white font-mono">{callHistory.length}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Total Time</span>
                  <span className="text-lg font-bold text-indigo-400 font-mono">
                    {Math.round(callHistory.reduce((acc, c) => acc + c.durationSeconds, 0) / 60)}m
                  </span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Avg Score</span>
                  <span className="text-lg font-bold text-emerald-400 font-mono">
                    {callHistory.length > 0
                      ? `${Math.round(callHistory.reduce((acc, c) => acc + c.score, 0) / callHistory.length)}`
                      : "0"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSignOut}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-rose-950/40 border border-slate-700 hover:border-rose-500/30 text-rose-300 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out of SpeakFlow AI</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* CALL DURATION SELECTION MODAL */}
      {showDurationModal && pendingTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <span className="text-3xl">{pendingTopic.icon}</span>
              <h3 className="text-lg font-bold text-white">{pendingTopic.title}</h3>
              <p className="text-xs text-slate-400">
                Select your practice duration before starting the call:
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { mins: 3, label: "3 Minutes", desc: "Quick speaking drill" },
                { mins: 5, label: "5 Minutes", desc: "Standard practice (Best)" },
                { mins: 10, label: "10 Minutes", desc: "Deep conversation" },
                { mins: null, label: "Unlimited", desc: "Until you end the call" }
              ].map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setSelectedDurationMinutes(opt.mins)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    selectedDurationMinutes === opt.mins
                      ? "bg-indigo-600/20 border-indigo-500 text-white"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800/40"
                  }`}
                >
                  <div className="font-bold text-xs text-white">{opt.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDurationModal(false)}
                className="w-1/2 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmStartCall}
                className="w-1/2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-600/20"
              >
                Start Call (කතා කරන්න)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POST-CALL SCORE & PERFORMANCE MODAL */}
      {showScoreModal && latestScoreResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl text-center space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/30">
              <Award className="w-10 h-10 text-white" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-white">Call Completed! 🎉</h3>
              <p className="text-xs text-slate-400 mt-1">Here is your official speaking score for this session:</p>
            </div>

            {/* Score Circle Card */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-center gap-3">
                <span className="text-5xl font-black text-emerald-400 font-mono">{latestScoreResult.score}</span>
                <span className="text-2xl font-bold text-slate-400">/ 100</span>
                <span className="px-3 py-1 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold text-sm">
                  Grade {latestScoreResult.grade}
                </span>
              </div>
              <p className="text-xs text-slate-300 italic">"{latestScoreResult.coachFeedback}"</p>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Fluency</span>
                <span className="text-base font-bold text-white font-mono">{latestScoreResult.fluencyScore}%</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Accuracy</span>
                <span className="text-base font-bold text-emerald-400 font-mono">{latestScoreResult.accuracyScore}%</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Corrections</span>
                <span className="text-base font-bold text-amber-400 font-mono">{latestScoreResult.totalCorrections}</span>
              </div>
            </div>

            {/* Mistakes Review (if any) */}
            {latestScoreResult.correctionsList.length > 0 && (
              <div className="text-left space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Errors Addressed in this Call:
                </span>
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {latestScoreResult.correctionsList.map((c, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="line-through text-rose-400">{c.original}</span>
                        <ArrowRight className="w-3 h-3 text-slate-500" />
                        <span className="text-emerald-400 font-bold">{c.correction}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">{c.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={handleCloseScoreModal}
              className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all"
            >
              Done & Save to History
            </button>
          </div>
        </div>
      )}

      {/* DETAIL MODAL FOR PAST HISTORY ITEM */}
      {selectedHistoryItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">{selectedHistoryItem.topicTitle}</h3>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">
                Score: {selectedHistoryItem.score}/100
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-500 block">Duration</span>
                <span className="font-mono text-white font-bold">{formatDuration(selectedHistoryItem.durationSeconds)}</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-500 block">Date</span>
                <span className="text-white font-bold">{new Date(selectedHistoryItem.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 italic">"{selectedHistoryItem.coachFeedback}"</p>
            <button
              type="button"
              onClick={() => setSelectedHistoryItem(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 text-white font-semibold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
