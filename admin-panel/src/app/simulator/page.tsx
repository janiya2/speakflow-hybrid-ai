"use client";

import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs, doc, getDoc, addDoc } from "firebase/firestore";
import { db, COLLECTIONS } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import {
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  AlertCircle,
  CheckCircle2,
  Languages,
  Sparkles,
  Bot,
  User,
  ArrowRight,
  Settings,
  HelpCircle,
  Repeat
} from "lucide-react";

interface TopicOption {
  id: string;
  title: string;
  language: "English" | "Japanese" | "Korean";
  level: string;
  icon: string;
  scenario: string;
  starterPrompt: string;
}

export default function SimulatorPage() {
  const { userProfile } = useAuth();
  const [topics, setTopics] = useState<TopicOption[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<TopicOption | null>(null);
  const [geminiApiKey, setGeminiApiKey] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState("gemini-2.0-flash");
  const [loading, setLoading] = useState(true);

  // Call States
  const [inCall, setInCall] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isBotSpeaking, setIsBotSpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);

  // Captions & Feedback
  const [currentBotCaption, setCurrentBotCaption] = useState<string>("");
  const [currentUserCaption, setCurrentUserCaption] = useState<string>("");
  const [activeCorrection, setActiveCorrection] = useState<{
    original: string;
    correction: string;
    explanation: string;
  } | null>(null);
  const [totalCorrectionsCount, setTotalCorrectionsCount] = useState(0);

  // Active Pronunciation Drill Loop State
  const [isDrillMode, setIsDrillMode] = useState(false);
  const [targetPhraseToRepeat, setTargetPhraseToRepeat] = useState("");
  const [nextScenarioQuestion, setNextScenarioQuestion] = useState("");
  const [drillAttempts, setDrillAttempts] = useState(0);
  const [drillModeEnabled, setDrillModeEnabled] = useState(true);

  // Audio & Speech recognition refs
  const recognitionRef = useRef<any>(null);
  const timerIntervalRef = useRef<any>(null);
  const silenceTimerRef = useRef<any>(null);

  useEffect(() => {
    const init = async () => {
      try {
        // Load topics
        const topicsSnap = await getDocs(collection(db, COLLECTIONS.TOPICS));
        const loaded: TopicOption[] = topicsSnap.docs.map((d) => ({
          id: d.id,
          ...d.data()
        })) as TopicOption[];
        setTopics(loaded);
        if (loaded.length > 0) setSelectedTopic(loaded[0]);

        // Load Gemini config
        const aiDoc = await getDoc(doc(db, COLLECTIONS.SETTINGS, "ai_config"));
        if (aiDoc.exists()) {
          const data = aiDoc.data();
          if (data.geminiApiKey) setGeminiApiKey(data.geminiApiKey);
          if (data.selectedModel) setSelectedModel(data.selectedModel);
          if (data.drillModeEnabled !== undefined) setDrillModeEnabled(data.drillModeEnabled);
        }
      } catch (err) {
        console.error("Init error:", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // Timer
  useEffect(() => {
    if (inCall) {
      timerIntervalRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      setCallDuration(0);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [inCall]);

  const speakText = (text: string, lang: string = "English") => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    if (lang === "Japanese") utterance.lang = "ja-JP";
    else if (lang === "Korean") utterance.lang = "ko-KR";
    else utterance.lang = "en-US";

    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsBotSpeaking(true);
      setCurrentBotCaption(text);
    };

    utterance.onend = () => {
      setIsBotSpeaking(false);
      // Restart listening after bot finishes speaking
      startListening();
    };

    utterance.onerror = () => {
      setIsBotSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;

    if (selectedTopic?.language === "Japanese") recognition.lang = "ja-JP";
    else if (selectedTopic?.language === "Korean") recognition.lang = "ko-KR";
    else recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsUserSpeaking(true);
    };

    recognition.onresult = (event: any) => {
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
      setCurrentUserCaption(spoken);

      // Smart silence auto-detection (1.4 seconds)
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      if (spoken.trim().length > 0) {
        silenceTimerRef.current = setTimeout(() => {
          handleUserSpokenMessage(spoken);
        }, 1400);
      }

      if (finalTranscript) {
        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
        handleUserSpokenMessage(finalTranscript);
      }
    };

    recognition.onerror = (e: any) => {
      setIsUserSpeaking(false);
    };

    recognition.onend = () => {
      setIsUserSpeaking(false);
    };

    try {
      recognition.start();
      recognitionRef.current = recognition;
    } catch (e) {
      console.warn("Recognition start error:", e);
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

  const handleStartCall = () => {
    if (!selectedTopic) return;
    setInCall(true);
    setActiveCorrection(null);
    setIsDrillMode(false);
    setTargetPhraseToRepeat("");
    setNextScenarioQuestion("");
    setDrillAttempts(0);
    setCurrentUserCaption("");
    setTotalCorrectionsCount(0);

    const greeting = selectedTopic.starterPrompt;
    speakText(greeting, selectedTopic.language);
  };

  const handleEndCall = async () => {
    stopListening();
    setIsDrillMode(false);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setInCall(false);
    setIsBotSpeaking(false);
    setIsUserSpeaking(false);

    // Save session in Firestore
    try {
      if (selectedTopic && callDuration > 5) {
        await addDoc(collection(db, COLLECTIONS.SESSIONS), {
          userId: userProfile?.uid || "admin-tester",
          userEmail: userProfile?.email || "admin@tester.com",
          topicTitle: selectedTopic.title,
          language: selectedTopic.language,
          durationSeconds: callDuration,
          totalCorrections: totalCorrectionsCount,
          createdAt: new Date().toISOString()
        });
      }
    } catch (e) {
      console.error("Failed saving session:", e);
    }
  };

  // Helper to match spoken repetition with target phrase
  const checkRepetitionMatch = (spoken: string, target: string) => {
    const cleanSpoken = spoken.toLowerCase().replace(/[^\w\s]/g, "").trim();
    const cleanTarget = target.toLowerCase().replace(/[^\w\s]/g, "").trim();

    if (!cleanSpoken || !cleanTarget) return false;
    if (cleanSpoken === cleanTarget || cleanSpoken.includes(cleanTarget) || cleanTarget.includes(cleanSpoken)) {
      return true;
    }

    const spokenTokens = new Set(cleanSpoken.split(/\s+/).filter(Boolean));
    const targetTokens = new Set(cleanTarget.split(/\s+/).filter(Boolean));
    const matches = Array.from(targetTokens).filter(t => spokenTokens.has(t));
    return (matches.length / targetTokens.size) >= 0.6;
  };

  // AI Brain & Real-time Grammar Checker
  const handleUserSpokenMessage = async (userText: string) => {
    stopListening();
    const lang = selectedTopic?.language || "English";

    // 1. ACTIVE PRONUNCIATION DRILL REPETITION EVALUATION
    if (isDrillMode && targetPhraseToRepeat) {
      const isMatch = checkRepetitionMatch(userText, targetPhraseToRepeat);

      if (isMatch) {
        setIsDrillMode(false);
        setActiveCorrection(null);
        setDrillAttempts(0);

        let praise = "Awesome! Perfect pronunciation! 🎉";
        if (lang === "Japanese") praise = "素晴らしい！完璧な発音です！🎉";
        else if (lang === "Korean") praise = "아주 좋아요! 완벽한 발음이에요! 🎉";

        const continuation = nextScenarioQuestion
          ? `${praise} ${nextScenarioQuestion}`
          : `${praise} Let's continue!`;

        speakText(continuation, lang);
        return;
      } else {
        const nextAttempt = drillAttempts + 1;
        setDrillAttempts(nextAttempt);

        if (nextAttempt >= 2) {
          setIsDrillMode(false);
          setActiveCorrection(null);
          setDrillAttempts(0);

          let grace = "Good effort! Don't worry, you'll master it next time. Let's keep going!";
          if (lang === "Japanese") grace = "よく頑張りました！大丈夫です、続けていきましょう！";
          else if (lang === "Korean") grace = "좋은 시도였어요! 괜찮아요, 계속해서 이야기해 봐요!";

          const continuation = nextScenarioQuestion
            ? `${grace} ${nextScenarioQuestion}`
            : `${grace} Let's continue!`;

          speakText(continuation, lang);
          return;
        } else {
          let retry = `Very close! Listen carefully: '${targetPhraseToRepeat}'. Try once more!`;
          if (lang === "Japanese") retry = `惜しいです！よく聞いてもう一度言ってみてください:「${targetPhraseToRepeat}」`;
          else if (lang === "Korean") retry = `아쉬워요! 잘 듣고 한 번 더 말해보세요: '${targetPhraseToRepeat}'`;

          speakText(retry, lang);
          return;
        }
      }
    }

    // 2. If Gemini API Key is available, call Gemini Flash API
    if (geminiApiKey && geminiApiKey.length > 20) {
      const modelsToTry = [
        selectedModel === "smart-routing" ? "gemini-3.5-flash" : selectedModel,
        "gemini-3.5-flash",
        "gemini-3.8-flash",
        "gemini-2.5-flash",
        "gemini-flash-latest"
      ];

      for (const m of modelsToTry) {
        try {
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${geminiApiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                contents: [
                  {
                    role: "user",
                    parts: [
                      {
                        text: `You are an AI Language Coach conducting a live spoken phone call in ${selectedTopic?.language}.
Scenario: ${selectedTopic?.scenario}
User said: "${userText}"
Drill Mode active: ${drillModeEnabled}

Format your response in JSON:
{
  "hasCorrection": boolean,
  "original": "incorrect word or phrase (if any)",
  "correction": "corrected natural word or phrase",
  "explanation": "brief 1-sentence explanation of why",
  "targetPhrase": "the exact phrase the user should repeat (if hasCorrection is true)",
  "spokenReply": "What you speak out loud. If hasCorrection is true and Drill Mode is active, explain the correction gently and explicitly ask the user to repeat the target phrase (e.g. 'Good try! But we say: [targetPhrase]. Can you repeat that for me?'). If no correction, give a friendly 1-2 sentence response and ask the next question.",
  "nextQuestion": "The next scenario question to ask once the user successfully repeats the target phrase"
}`
                      }
                    ]
                  }
                ],
                generationConfig: {
                  responseMimeType: "application/json"
                }
              })
            }
          );

          if (response.ok) {
            const data = await response.json();
            const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (content) {
              const parsed = JSON.parse(content);
              if (parsed.hasCorrection && drillModeEnabled && parsed.targetPhrase) {
                setActiveCorrection({
                  original: parsed.original || parsed.correction,
                  correction: parsed.correction,
                  explanation: parsed.explanation
                });
                setIsDrillMode(true);
                setTargetPhraseToRepeat(parsed.targetPhrase || parsed.correction);
                setNextScenarioQuestion(parsed.nextQuestion || "What do you think?");
                setDrillAttempts(0);
                setTotalCorrectionsCount((prev) => prev + 1);
              } else {
                setActiveCorrection(parsed.hasCorrection ? {
                  original: parsed.original,
                  correction: parsed.correction,
                  explanation: parsed.explanation
                } : null);
                setIsDrillMode(false);
              }
              speakText(parsed.spokenReply, selectedTopic?.language);
              return;
            }
          }
        } catch (err) {
          console.warn(`Model ${m} failed, trying next...`, err);
        }
      }
    }

    // Smart Fallback Grammar Demonstration (works even without API key configured)
    const lower = userText.toLowerCase();
    let spokenReply = "That sounds great! Tell me more about that.";
    let detectedError = null;

    if (lower.includes("i go yesterday") || lower.includes("i go to")) {
      detectedError = {
        original: "I go yesterday",
        correction: "I went yesterday",
        explanation: "For actions in the past, use past tense 'went' instead of 'go'."
      };
      spokenReply = "Awesome! Just a quick tip: since it was yesterday, say 'I went'. What did you do next?";
    } else if (lower.includes("he don't") || lower.includes("she don't")) {
      detectedError = {
        original: "don't",
        correction: "doesn't",
        explanation: "With third-person singular (he/she/it), use 'doesn't'."
      };
      spokenReply = "Got it! Remember to use 'doesn't' for he or she. Tell me more!";
    } else {
      if (selectedTopic?.language === "Japanese") {
        spokenReply = "なるほど、分かりました！他には何かありますか？";
      } else if (selectedTopic?.language === "Korean") {
        spokenReply = "아, 그렇군요! 혹시 더 필요한 것이 있으신가요?";
      } else {
        spokenReply = "That's very interesting! How did you feel about that experience?";
      }
    }

    if (detectedError) {
      setActiveCorrection(detectedError);
      setTotalCorrectionsCount((prev) => prev + 1);
    } else {
      setActiveCorrection(null);
    }

    speakText(spokenReply, selectedTopic?.language);
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remaining.toString().padStart(2, "0")}`;
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Live Call Simulator</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase font-mono font-bold">
              Real-time Voice
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Test the live microphone call experience, dynamic subtitles, and real-time grammar corrections.
          </p>
        </div>

        {/* Topic Picker */}
        {!inCall && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Scenario:</span>
            <select
              value={selectedTopic?.id || ""}
              onChange={(e) => {
                const found = topics.find((t) => t.id === e.target.value);
                if (found) setSelectedTopic(found);
              }}
              className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              {topics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.icon} {t.title} ({t.language})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* CALL SCREEN CONTAINER */}
      <div className="relative w-full rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-slate-800 shadow-2xl overflow-hidden min-h-[520px] flex flex-col justify-between p-6 sm:p-8">
        {/* Ambient Glows */}
        <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
          isBotSpeaking
            ? "bg-indigo-600/30 scale-125"
            : isUserSpeaking
            ? "bg-emerald-600/30 scale-125"
            : "bg-purple-600/10 scale-100"
        }`} />

        {/* Top Call Bar */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-xl">
              {selectedTopic?.icon || "🎙️"}
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>{selectedTopic?.title || "Language Practice"}</span>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full font-mono">
                  {selectedTopic?.language}
                </span>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <span className={`w-2 h-2 rounded-full ${inCall ? "bg-emerald-400 animate-pulse" : "bg-slate-500"}`} />
                <span>{inCall ? `Call in Progress • ${formatTimer(callDuration)}` : "Ready to Connect"}</span>
              </div>
            </div>
          </div>

          {inCall && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-300">
                {formatTimer(callDuration)}
              </span>
            </div>
          )}
        </div>

        {/* Center: Interactive AI Avatar & Pulsing Waveform */}
        <div className="relative z-10 flex flex-col items-center justify-center my-auto py-8">
          <div className="relative">
            {/* Outer Pulsing Rings */}
            {inCall && (isBotSpeaking || isUserSpeaking) && (
              <>
                <div className={`absolute -inset-4 rounded-full animate-ping opacity-25 ${
                  isBotSpeaking ? "bg-indigo-500" : "bg-emerald-500"
                }`} />
                <div className={`absolute -inset-8 rounded-full animate-pulse opacity-15 ${
                  isBotSpeaking ? "bg-purple-500" : "bg-emerald-400"
                }`} />
              </>
            )}

            {/* Avatar Circle */}
            <div className={`w-32 h-32 sm:w-36 sm:h-36 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 border-4 ${
              isBotSpeaking
                ? "bg-gradient-to-tr from-indigo-600 to-purple-600 border-indigo-400 shadow-indigo-500/50 scale-105"
                : isUserSpeaking
                ? "bg-gradient-to-tr from-emerald-600 to-teal-600 border-emerald-400 shadow-emerald-500/50 scale-105"
                : inCall
                ? "bg-slate-800 border-slate-700 shadow-slate-900"
                : "bg-slate-800/80 border-slate-700"
            }`}>
              <Bot className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* Status Label */}
          <div className="mt-5 text-center">
            {inCall ? (
              <div className="flex items-center gap-2 text-xs font-semibold">
                {isBotSpeaking ? (
                  <span className="text-indigo-400 flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4 animate-bounce" />
                    AI Coach Speaking...
                  </span>
                ) : isUserSpeaking ? (
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <Mic className="w-4 h-4 animate-pulse" />
                    Listening to you...
                  </span>
                ) : (
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <span>Speak into your microphone</span>
                  </span>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-400 max-w-sm text-center">
                Click below to start a live voice call with your AI language coach.
              </p>
            )}
          </div>
        </div>

        {/* BOTTOM: LIVE CAPTION & SMART ERROR HIGHLIGHT BADGE */}
        <div className="relative z-10 w-full max-w-2xl mx-auto space-y-3">
          {/* Correction Pill (Appears if user made a grammar error) */}
          {activeCorrection && inCall && (
            <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 backdrop-blur-md shadow-lg animate-fadeIn">
              <div className="flex items-center justify-between text-[11px] font-bold text-amber-300 mb-1">
                <span className="flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                  Live Grammar Coach Tip:
                </span>
                <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded-full font-mono">
                  Real-time Correction
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200 mt-1">
                <span className="line-through text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded font-mono">
                  {activeCorrection.original}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-mono">
                  {activeCorrection.correction}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1.5">
                {activeCorrection.explanation}
              </p>
            </div>
          )}

          {/* 🔁 Repeat & Perfect Active Drill Card */}
          {isDrillMode && targetPhraseToRepeat && inCall && (
            <div className="p-4 rounded-2xl bg-indigo-950/80 border-2 border-indigo-500/80 shadow-lg shadow-indigo-500/20 animate-fadeIn">
              <div className="flex items-center justify-between text-xs font-bold text-indigo-300 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Repeat className="w-4 h-4 text-indigo-400 animate-spin" />
                  🔁 Repeat to Continue (නැවත පවසන්න):
                </span>
                <span className="text-[10px] bg-indigo-500/20 px-2 py-0.5 rounded-full font-mono font-semibold text-indigo-300 border border-indigo-500/30">
                  Attempt {drillAttempts + 1} of 2
                </span>
              </div>
              <div className="p-2.5 bg-slate-950/90 rounded-xl border border-indigo-500/30 mt-1">
                <p className="text-base font-bold text-emerald-400">
                  "{targetPhraseToRepeat}"
                </p>
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5">
                කරුණාකර ඉහත වාක්‍යය microphone එකට පවසන්න. ඔබ එය නිවැරදිව පැවසූ පසු ඊළඟ ප්‍රශ්නය unlock වේ.
              </p>
            </div>
          )}

          {/* Real-time Subtitles Box */}
          {inCall && (
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl min-h-[64px] flex flex-col justify-center">
              <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>Live Subtitles (සජීවී උපසිරැසි)</span>
                {isBotSpeaking ? (
                  <span className="text-indigo-400">Bot Audio</span>
                ) : (
                  <span className="text-emerald-400">Your Voice</span>
                )}
              </div>
              <p className="text-sm font-medium text-slate-100">
                {isBotSpeaking
                  ? currentBotCaption || "..."
                  : currentUserCaption
                  ? `"${currentUserCaption}"`
                  : "Say something in your practice language..."}
              </p>
            </div>
          )}

          {/* Call Action Controls */}
          <div className="flex items-center justify-center gap-4 pt-2">
            {!inCall ? (
              <button
                onClick={handleStartCall}
                className="px-8 py-4 rounded-full font-bold text-sm text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 shadow-xl shadow-emerald-600/30 transition-all flex items-center gap-3 transform hover:scale-105 active:scale-95"
              >
                <PhoneCall className="w-5 h-5 text-white animate-bounce" />
                <span>Start Live Voice Call</span>
              </button>
            ) : (
              <div className="flex items-center gap-4">
                {/* Mute button */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3.5 rounded-full border transition-all ${
                    isMuted
                      ? "bg-rose-500/20 text-rose-400 border-rose-500/40"
                      : "bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700"
                  }`}
                  title={isMuted ? "Unmute Mic" : "Mute Mic"}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>

                {/* Speak manually / Trigger Voice */}
                <button
                  onClick={startListening}
                  className="px-4 py-2.5 rounded-full bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs font-semibold hover:bg-indigo-600/50 transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>Tap to Speak</span>
                </button>

                {/* End Call Button */}
                <button
                  onClick={handleEndCall}
                  className="px-6 py-3.5 rounded-full font-bold text-xs text-white bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-600/40 transition-all flex items-center gap-2"
                >
                  <PhoneOff className="w-4 h-4 text-white" />
                  <span>End Call</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

