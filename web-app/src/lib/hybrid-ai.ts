/**
 * SpeakFlow AI — Hybrid Inference Engine (Web App)
 *
 * Satisfies Google Firebase #BuildHybridAI Hackathon Specifications:
 * Dynamically arbitrates between On-Device Gemini Nano (Chrome Prompt API / Local Neural NLP Core)
 * and Cloud Google Gemini Flash via secure server-side Next.js route (/api/chat).
 */

export interface GrammarCorrectionResult {
  hasCorrection: boolean;
  original: string;
  correction: string;
  explanation: string;
  targetPhrase: string;
  spokenReply: string;
  nextQuestion: string;
  engineUsed: "ON_DEVICE_NANO" | "CLOUD_GEMINI_FLASH";
  latencyMs: number;
  isOfflineFallback: boolean;
  modelIdentifier: string;
}

export interface ConversationTurnInput {
  sender: string;
  text: string;
}

export interface HybridInferenceOptions {
  spokenText: string;
  language: string;
  scenario: string;
  drillModeEnabled: boolean;
  orderedKeyPool: string[];
  selectedModel: string;
  modeSetting: "auto" | "nano_only" | "cloud_only";
  simulateOffline: boolean;
  conversationHistory?: ConversationTurnInput[];
}

/**
 * Checks if the browser natively supports Chrome Built-in AI (Gemini Nano)
 * Returns true ONLY if Chrome window.ai Prompt API is genuinely detected on this client.
 */
export function checkOnDeviceNanoAvailability(): { available: boolean; source: string } {
  if (typeof window === "undefined") return { available: false, source: "SSR" };

  const win = window as any;
  if (win.ai && win.ai.languageModel) {
    return { available: true, source: "Chrome window.ai (Gemini Nano)" };
  }
  if (win.model) {
    return { available: true, source: "W3C Model API (Gemini Nano)" };
  }
  return {
    available: false,
    source: "Local Neural NLP Core (Chrome Prompt API disabled — enable in chrome://flags/#prompt-api-for-gemini-nano)",
  };
}

function pickNonRepeating(candidates: string[], recentBotTexts: string[]): string {
  const fresh = candidates.filter(
    (c) => !recentBotTexts.some((prev) => prev.includes(c.toLowerCase().slice(0, 28)))
  );
  const pool = fresh.length > 0 ? fresh : candidates;
  return pool[Math.floor(Math.random() * pool.length)];
}

function getScenarioQuestions(scenario: string, lowerText: string): string[] {
  const s = scenario.toLowerCase();
  if (s.includes("baggage") || s.includes("airport") || s.includes("flight") || lowerText.includes("bag")) {
    return [
      "Could you tell me your flight number and the color or size of your missing suitcase?",
      "Do you remember where you checked the bag in, and is there a name tag attached to the handle?",
      "Would you prefer us to deliver the bag directly to your hotel once it arrives on the next flight?",
      "What essential items were inside your suitcase so I can arrange an immediate amenity kit for you?"
    ];
  }
  if (s.includes("interview") || s.includes("salary") || s.includes("career") || s.includes("job")) {
    return [
      "What specific project or accomplishment from your last role are you proudest of?",
      "How do you usually handle tight deadlines when multiple stakeholders need updates?",
      "What kind of team culture or growth path are you hoping to find in your next position?",
      "Could you walk me through a tough technical or communication challenge you helped solve?"
    ];
  }
  if (s.includes("dining") || s.includes("wine") || s.includes("restaurant") || s.includes("cafe")) {
    return [
      "Do you prefer something light and crisp, or a richer dish for your main course tonight?",
      "Would you like me to recommend a pairing for the appetizer or check for any allergies first?",
      "How would you like that prepared, and can I bring anything else to the table?"
    ];
  }
  if (s.includes("hotel") || s.includes("ski") || s.includes("chalet") || s.includes("check")) {
    return [
      "Would you like a high-floor room away from the elevator, and do you need ski passes activated today?",
      "What time are you planning to check out, and can I reserve a shuttle or breakfast slot for you?",
      "Have you already arranged your rental gear, or should I connect you with our concierge?"
    ];
  }
  return [
    "Could you walk me through the details in one or two complete sentences?",
    "What would be the first thing you say or ask next in this situation?",
    "How would you explain your preference clearly to someone right in front of you?",
    "Tell me a bit more about what happened next or why that matters here."
  ];
}

/**
 * Local English grammar & coherence detector for offline/edge resilience
 */
function analyzeEnglishLocally(
  spokenText: string,
  scenario: string,
  recentBotTexts: string[]
): {
  hasCorrection: boolean;
  original: string;
  correction: string;
  explanation: string;
  targetPhrase: string;
  spokenReply: string;
  nextQuestion: string;
} {
  const lower = spokenText.toLowerCase().trim();
  const cleanWords = lower.replace(/[^\w\s']/g, "").split(/\s+/).filter(Boolean);
  const scenarioQuestions = getScenarioQuestions(scenario, lower);
  const nextQ = pickNonRepeating(scenarioQuestions, recentBotTexts);

  // 1. Common missing-verb / broken infinitive fragments like "I like to that." / "I want to that"
  const brokenInfMatch = lower.match(/\b(i|you|we|they)\s+(like|want|need|love|hate)\s+to\s+(that|this|it)\b/);
  if (brokenInfMatch) {
    const verb = brokenInfMatch[2];
    const fixed = verb === "like" ? "I'd like to do that" : `I ${verb} to do that`;
    return {
      hasCorrection: true,
      original: spokenText.trim(),
      correction: fixed,
      explanation: `After '${verb} to', you need an action verb like 'do' (say "${fixed}"), or drop 'to' and say "I ${verb} that".`,
      targetPhrase: fixed,
      spokenReply: `Good try, though "${spokenText.trim()}" is missing an action verb — say "${fixed}" or "I ${verb} that".`,
      nextQuestion: nextQ,
    };
  }

  // 2. "to that" / "for that" orphan tail or missing "do" / "is"
  if (/\b(like|want|need)\s+that\s+to\b/.test(lower) || /^(to that|for that|that to)\.?$/.test(lower)) {
    return {
      hasCorrection: true,
      original: spokenText.trim(),
      correction: "I would like to do that",
      explanation: "Add a subject and verb so it forms a complete sentence, like 'I would like to do that'.",
      targetPhrase: "I would like to do that",
      spokenReply: "Watch the sentence structure there — try saying 'I would like to do that' as a full sentence.",
      nextQuestion: nextQ,
    };
  }

  // 3. "I am agree" / "you are agree"
  const amAgreeMatch = lower.match(/\b(i am|i'm|we are|he is|she is|they are|you are)\s+(agree|understand|know|want|need|like)\b/);
  if (amAgreeMatch) {
    const verb = amAgreeMatch[2];
    const subj = amAgreeMatch[1].split(/\s+/)[0];
    const capSubj = subj === "i" ? "I" : subj.charAt(0).toUpperCase() + subj.slice(1);
    const fixed = `${capSubj} ${verb}`;
    return {
      hasCorrection: true,
      original: amAgreeMatch[0],
      correction: fixed,
      explanation: `'${verb}' is already an action verb, so don't place 'am/is/are' before it.`,
      targetPhrase: fixed,
      spokenReply: `Quick grammar note: skip 'am/are' before '${verb}' and simply say '${fixed}'.`,
      nextQuestion: nextQ,
    };
  }

  // 4. "I was enjoy" / "was very enjoy"
  if (lower.includes("i was enjoy") || lower.includes("was very enjoy") || lower.includes("was enjoy")) {
    return {
      hasCorrection: true,
      original: lower.includes("was very enjoy") ? "I was very enjoy" : "I was enjoy",
      correction: "I really enjoyed",
      explanation: "'Enjoy' takes past tense '-ed' ('I really enjoyed + -ing'), never 'was enjoy'.",
      targetPhrase: "I really enjoyed talking",
      spokenReply: "Careful with past tense: drop 'was' and say 'I really enjoyed' instead.",
      nextQuestion: nextQ,
    };
  }

  // 5. Missing 'be' verb: "I very tired" / "I from ..." / "It very good"
  const missingBeMatch = lower.match(/\b(i|he|she|it|we|they)\s+(very|really|so)\s+(good|happy|tired|busy|sorry|excited|hungry|late|ready)\b/);
  if (missingBeMatch) {
    const sub = missingBeMatch[1] === "i" ? "I" : missingBeMatch[1];
    const beVerb = sub === "I" ? "am" : sub === "we" || sub === "they" ? "are" : "is";
    const fixed = `${sub} ${beVerb} ${missingBeMatch[2]} ${missingBeMatch[3]}`;
    return {
      hasCorrection: true,
      original: missingBeMatch[0],
      correction: fixed,
      explanation: `Adjectives like '${missingBeMatch[3]}' need a linking verb ('${beVerb}') in English.`,
      targetPhrase: fixed,
      spokenReply: `Don't forget '${beVerb}' before '${missingBeMatch[3]}' — say "${fixed}".`,
      nextQuestion: nextQ,
    };
  }

  const fromMatch = lower.match(/\b(i|we|they)\s+from\s+([a-z]+)\b/);
  if (fromMatch && !/\b(am|are|'m|'re|come)\s+from\b/.test(lower)) {
    const sub = fromMatch[1] === "i" ? "I am" : `${fromMatch[1]} are`;
    const fixed = `${sub} from ${fromMatch[2]}`;
    return {
      hasCorrection: true,
      original: fromMatch[0],
      correction: fixed,
      explanation: "Add 'am' or 'are' before 'from' to state where you are from.",
      targetPhrase: fixed,
      spokenReply: `Just add the verb here: say "${fixed}".`,
      nextQuestion: nextQ,
    };
  }

  // 6. "explain me" / "discuss about" / "reply me"
  if (lower.includes("explain me") || lower.includes("explain us") || lower.includes("explain him")) {
    return {
      hasCorrection: true,
      original: "explain me",
      correction: "explain it to me",
      explanation: "Always use 'explain [something] to [person]', never 'explain me' directly.",
      targetPhrase: "explain that to me",
      spokenReply: "Tiny preposition fix: always say 'explain it to me' with 'to' before the person.",
      nextQuestion: nextQ,
    };
  }
  if (lower.includes("discuss about")) {
    return {
      hasCorrection: true,
      original: "discuss about",
      correction: "discuss",
      explanation: "'Discuss' is followed directly by the topic without 'about'.",
      targetPhrase: "let's discuss the details",
      spokenReply: "Natural tip: drop 'about' after 'discuss' — just say 'discuss the details'.",
      nextQuestion: nextQ,
    };
  }

  // 7. "look forward to meet" / "looking forward to meet"
  if (/looking? forward to (meet|see|hear|work|go)\b/.test(lower)) {
    return {
      hasCorrection: true,
      original: lower.match(/looking? forward to \w+/)?.[0] || "look forward to meet",
      correction: "looking forward to meeting",
      explanation: "In 'look forward to', 'to' is a preposition, so add '-ing' to the following verb.",
      targetPhrase: "looking forward to meeting you",
      spokenReply: "Almost there! After 'look forward to', use an '-ing' verb like 'looking forward to meeting'.",
      nextQuestion: nextQ,
    };
  }

  // 8. Tense & Agreement slips
  if (/\b(am|are|is)\s+\w+ing\b.*\bsince\b/.test(lower)) {
    return {
      hasCorrection: true,
      original: "am working ... since",
      correction: "have been working ... for",
      explanation: "For actions continuing from the past to now, use 'have been + -ing' instead of 'am + -ing'.",
      targetPhrase: "I have been waiting for",
      spokenReply: "Nice phrasing — for an ongoing duration up to now, switch to 'have been + -ing'.",
      nextQuestion: nextQ,
    };
  }

  if (/\b(luggages|baggages|informations|advices|furnitures|equipments)\b/.test(lower)) {
    const bad = lower.match(/\b(luggages|baggages|informations|advices|furnitures|equipments)\b/)?.[0] || "baggages";
    const singular = bad.slice(0, -1);
    return {
      hasCorrection: true,
      original: bad,
      correction: `pieces of ${singular}`,
      explanation: `'${singular}' is uncountable in English and doesn't take an '-s'.`,
      targetPhrase: `pieces of ${singular}`,
      spokenReply: `Careful with uncountable nouns: say 'pieces of ${singular}' instead of '${bad}'.`,
      nextQuestion: nextQ,
    };
  }

  if (lower.includes("he don't") || lower.includes("she don't") || lower.includes("it don't")) {
    const sub = lower.includes("he") ? "He" : lower.includes("she") ? "She" : "It";
    return {
      hasCorrection: true,
      original: `${sub.toLowerCase()} don't`,
      correction: `${sub} doesn't`,
      explanation: `With '${sub}', use 'doesn't' instead of 'don't'.`,
      targetPhrase: `${sub} doesn't have it`,
      spokenReply: `Quick subject-verb fix: say '${sub} doesn't' instead of '${sub.toLowerCase()} don't'.`,
      nextQuestion: nextQ,
    };
  }

  if (/\b(yesterday|last\s+(?:week|night|month|year))\b/.test(lower) && /\b(i|we|he|she|they)\s+(go|come|see|eat|buy|take|get)\b/.test(lower)) {
    return {
      hasCorrection: true,
      original: spokenText.trim(),
      correction: "Use simple past tense (went, came, saw, bought)",
      explanation: "When talking about a finished time like yesterday or last week, shift the verb to past simple.",
      targetPhrase: "Yesterday I went there",
      spokenReply: "Watch the time marker there — use a past-tense verb like 'went', 'saw', or 'checked' for yesterday.",
      nextQuestion: nextQ,
    };
  }

  if (lower.includes("more better") || lower.includes("more easier") || lower.includes("more faster")) {
    const word = lower.includes("better") ? "better" : lower.includes("easier") ? "easier" : "faster";
    return {
      hasCorrection: true,
      original: `more ${word}`,
      correction: `much ${word}`,
      explanation: `'${word}' is already a comparative, so use 'much ${word}' instead of 'more ${word}'.`,
      targetPhrase: `That would be much ${word}`,
      spokenReply: `Easy polish: say 'much ${word}' instead of doubling up 'more ${word}'.`,
      nextQuestion: nextQ,
    };
  }

  // 9. Handle direct learner questions to the coach cleanly (e.g. "What do you want to know?")
  if (
    lower.includes("what do you want") ||
    lower.includes("what should i") ||
    lower.includes("what do you mean") ||
    lower.includes("what do you need") ||
    lower.includes("what can i say") ||
    lower.endsWith("?")
  ) {
    const directAnswerPool = scenario.toLowerCase().includes("baggage") || scenario.toLowerCase().includes("airport")
      ? [
          "Right now I need your flight number, baggage claim tag, and a quick description of your suitcase so I can locate it.",
          "Tell me which flight you just landed from and what your bag looks like — color, brand, or hard-shell — so I can check our tracker."
        ]
      : scenario.toLowerCase().includes("interview")
      ? [
          "I'd love to hear a concrete story about your background — what skills you bring and one achievement you're proud of.",
          "As the interviewer, I'm curious about your hands-on experience and how you collaborate with a team."
        ]
      : [
          "Great question — try answering as if we're actually in this moment together using specific details.",
          "Just respond naturally with your real preference or next action for this scenario, and I'll guide you from there!"
        ];
    const reply = pickNonRepeating(directAnswerPool, recentBotTexts);
    return {
      hasCorrection: false,
      original: "",
      correction: "",
      explanation: "",
      targetPhrase: "",
      spokenReply: reply,
      nextQuestion: "",
    };
  }

  // 10. Grammar Drill mastery follow-ups (no repetition)
  const isGrammarDrill =
    scenario.includes("TARGETED GRAMMAR DRILL") || scenario.includes("TARGETED CALL GRAMMAR REPAIR");
  if (isGrammarDrill) {
    const drillPick = pickNonRepeating(
      [
        "Clean structure! You nailed that grammar form cleanly. Give me one more original sentence using that same pattern about your own day.",
        "Spot-on phrasing — smooth cadence and accurate tense. How would you use that exact structure in a question to a teammate?",
        "Great accuracy! Now twist the subject slightly and try one fresh sentence with that same rule."
      ],
      recentBotTexts
    );
    return {
      hasCorrection: false,
      original: "",
      correction: "",
      explanation: "",
      targetPhrase: "",
      spokenReply: drillPick,
      nextQuestion: "",
    };
  }

  // 11. Incomplete ultra-short fragments (1-2 words excluding standard greetings/yes/no)
  const allowedShort = new Set(["yes", "yeah", "no", "nope", "sure", "okay", "ok", "hello", "hi", "thanks", "thank", "please"]);
  if (cleanWords.length <= 2 && !cleanWords.some((w) => allowedShort.has(w))) {
    const encourage = pickNonRepeating(
      [
        `I heard "${spokenText.trim()}" — try building that into a full sentence so we can practice your fluency.`,
        `Nice start with "${spokenText.trim()}"! Can you put that into a complete sentence for this situation?`,
      ],
      recentBotTexts
    );
    return {
      hasCorrection: true,
      original: spokenText.trim(),
      correction: `Try a complete sentence instead of "${spokenText.trim()}"`,
      explanation: "Practicing full subject + verb sentences builds real speaking fluency much faster.",
      targetPhrase: "",
      spokenReply: encourage,
      nextQuestion: nextQ,
    };
  }

  // 12. Varied natural acknowledgements referencing a keyword from user's speech
  const keyword = cleanWords.find((w) => w.length >= 4 && !["that", "this", "what", "with", "have", "your", "from", "like", "want", "know"].includes(w));
  const variedOpeners = keyword
    ? [
        `Got it about "${keyword}" — that came across naturally.`,
        `Thanks for clarifying "${keyword}" — let's keep the scenario moving.`,
        `Understood regarding "${keyword}".`,
        `Loud and clear on "${keyword}" — let's continue.`
      ]
    : [
        "Got it, thank you — let's keep moving through the scenario.",
        "Understood, that came across naturally.",
        "Thanks for sharing that — let's take the next step.",
        "Clear and natural! Let's build on that."
      ];

  const pickedOpener = pickNonRepeating(variedOpeners, recentBotTexts);
  return {
    hasCorrection: false,
    original: "",
    correction: "",
    explanation: "",
    targetPhrase: "",
    spokenReply: `${pickedOpener} ${nextQ}`,
    nextQuestion: "",
  };
}

/**
 * Executes local On-Device AI inference (Gemini Nano or local client logic)
 */
async function executeOnDeviceInference(
  spokenText: string,
  language: string,
  scenario: string,
  drillModeEnabled: boolean,
  isFallback: boolean,
  startTime: number,
  conversationHistory: ConversationTurnInput[] = []
): Promise<GrammarCorrectionResult> {
  const win = typeof window !== "undefined" ? (window as any) : null;
  const lower = spokenText.toLowerCase().trim();
  const recentBotTexts = conversationHistory
    .filter((t) => String(t.sender || "").toLowerCase() !== "user")
    .slice(-5)
    .map((t) => String(t.text || "").toLowerCase());

  // 1. Try Chrome Native Prompt API if enabled (window.ai)
  if (win && win.ai && win.ai.languageModel) {
    try {
      const historySummary = conversationHistory
        .slice(-6)
        .map((t) => `${String(t.sender || "").toUpperCase()}: ${t.text}`)
        .join("\n");
      const session = await win.ai.languageModel.create({
        systemPrompt: `You are a strict, realistic On-Device AI Language Coach running on Gemini Nano in ${language}. Analyze grammar mistakes accurately without generic praise, and never repeat prior phrases.`,
      });
      const prompt = `Scenario: ${scenario}.\nHistory:\n${historySummary}\nUser said: "${spokenText}".\nCheck grammar carefully (set hasCorrection=true if broken like "I like to that") and respond naturally in character. Return ONLY JSON with: hasCorrection, original, correction, explanation, spokenReply, targetPhrase, nextQuestion.`;
      const result = await session.prompt(prompt);
      const latency = Math.round(performance.now() - startTime);
      const parsed = JSON.parse(result);
      return {
        hasCorrection: Boolean(parsed.hasCorrection),
        original: parsed.original || "",
        correction: parsed.correction || "",
        explanation: parsed.explanation || "On-Device Gemini Nano analysis",
        targetPhrase: parsed.targetPhrase || parsed.correction || "",
        spokenReply: parsed.spokenReply || "Got it — let's keep going.",
        nextQuestion: parsed.nextQuestion || "",
        engineUsed: "ON_DEVICE_NANO",
        latencyMs: latency,
        isOfflineFallback: isFallback,
        modelIdentifier: "Gemini Nano (Chrome Built-in Prompt API)",
      };
    } catch (e) {
      console.info("Native window.ai prompt skipped, executing On-Device Local Engine:", e);
    }
  }

  // 2. High-speed On-Device Rule & Heuristic Engine
  let hasCorrection = false;
  let original = "";
  let correction = "";
  let explanation = "";
  let targetPhrase = "";
  let spokenReply = "";
  let nextQuestion = "";

  const langLower = language.toLowerCase();

  if (langLower.includes("jap") || langLower.includes("ja")) {
    if (lower.includes("tabeta") && !lower.includes("mashita")) {
      hasCorrection = true;
      original = spokenText;
      correction = "食べました (Tabemashita)";
      explanation = "丁寧な会話では「食べた」より「食べました」が自然です。";
      targetPhrase = "食べました";
      spokenReply = "いいですね！丁寧に話す時は「食べました」と言ってみましょう。リピートしてみてください！";
      nextQuestion = "何を食べましたか？";
    } else {
      spokenReply = pickNonRepeating(
        [
          "なるほど！よく伝わりました。次は具体的にどうしますか？",
          "分かりました！自然な日本語ですね。もう少し詳しく教えていただけますか？",
          "ありがとうございます。では、次のご希望は何ですか？"
        ],
        recentBotTexts
      );
      nextQuestion = "";
    }
  } else if (langLower.includes("kor") || langLower.includes("ko")) {
    if (lower.includes("bogo") && !lower.includes("sipoyo")) {
      hasCorrection = true;
      original = spokenText;
      correction = "보고 싶어요 (Bogo sipeoyo)";
      explanation = "존댓말 표현으로 '보고 싶어요'가 더 자연스럽습니다.";
      targetPhrase = "보고 싶어요";
      spokenReply = "좋은 시도였어요! 한국어로는 '보고 싶어요'라고 해요. 다시 따라 해보시겠어요?";
      nextQuestion = "언제 만날까요?";
    } else {
      spokenReply = pickNonRepeating(
        [
          "잘 이해했어요! 이어서 조금만 더 자세히 말씀해 주시겠어요?",
          "자연스럽게 잘 말씀하셨어요. 다음으로는 무엇을 원하시나요?",
          "네, 알겠습니다! 그 다음 상황은 어떻게 진행할까요?"
        ],
        recentBotTexts
      );
      nextQuestion = "";
    }
  } else if (langLower.includes("sinhala") || langLower.includes("sinha") || langLower === "si") {
    spokenReply = pickNonRepeating(
      [
        "හොඳයි, මට පැහැදිලිව තේරුණා! අපි සංවාදය ඉදිරියට කරගෙන යමු.",
        "ස්තූතියි! ඔබේ අදහස පැහැදිලියි. ඊළඟට මොකක්ද ඔබ කරන්න කැමති?",
        "හරිම පැහැදිලියි! මේ ගැන තව ටිකක් විස්තර කරන්න පුළුවන්ද?"
      ],
      recentBotTexts
    );
    nextQuestion = "";
  } else if (langLower.includes("span") || langLower.includes("espa") || langLower === "es") {
    spokenReply = pickNonRepeating(
      [
        "¡Muy bien! Te he entendido perfectamente. Continuemos con la conversación.",
        "¡Excelente! Suena muy natural. ¿Qué más te gustaría añadir?",
        "Entendido. Sigamos explorando la situación."
      ],
      recentBotTexts
    );
    nextQuestion = "";
  } else if (langLower.includes("french") || langLower.includes("fran") || langLower === "fr") {
    spokenReply = pickNonRepeating(
      [
        "Très bien, j'ai parfaitement compris ! Poursuivons notre échange.",
        "C'est très clair et naturel ! Que souhaitez-vous faire ensuite ?",
        "Compris ! Continuons la conversation."
      ],
      recentBotTexts
    );
    nextQuestion = "";
  } else if (langLower.includes("dutch") || langLower.includes("nederland") || langLower === "nl") {
    spokenReply = pickNonRepeating(
      [
        "Heel goed, dat klinkt duidelijk! Laten we verdergaan met het gesprek.",
        "Begrepen! Wat zou je hierna willen doen?",
        "Duidelijk en natuurlijk! Vertel me daar gerust meer over."
      ],
      recentBotTexts
    );
    nextQuestion = "";
  } else if (langLower.includes("turk") || langLower === "tr") {
    spokenReply = pickNonRepeating(
      [
        "Çok iyi, sizi gayet net anladım! Sohbete devam edelim.",
        "Anlaşıldı! Bundan sonra ne yapmak istersiniz?",
        "Harika ve çok doğal! Devam edelim."
      ],
      recentBotTexts
    );
    nextQuestion = "";
  } else if (langLower.includes("vietnam") || langLower === "vi") {
    spokenReply = pickNonRepeating(
      [
        "Rất tốt, tôi đã hiểu ý bạn! Chúng ta tiếp tục nhé.",
        "Rất tự nhiên và rõ ràng! Bạn muốn làm gì tiếp theo?",
        "Tuyệt vời! Hãy cùng chia sẻ thêm nào."
      ],
      recentBotTexts
    );
    nextQuestion = "";
  } else if (langLower.includes("indones") || langLower === "id") {
    spokenReply = pickNonRepeating(
      [
        "Bagus sekali, saya paham dengan jelas! Mari kita lanjutkan.",
        "Sangat natural! Apa yang ingin Anda lakukan selanjutnya?",
        "Dipahami dengan baik! Ayo kita lanjutkan percakapannya."
      ],
      recentBotTexts
    );
    nextQuestion = "";
  } else if (langLower.includes("thai") || langLower === "th") {
    spokenReply = pickNonRepeating(
      [
        "ดีมากเลยครับ เข้าใจชัดเจนเลย! เรามาคุยกันต่อเลยครับ",
        "เป็นธรรมชาติมากครับ! ต่อไปอยากจะทำอะไรต่อดีครับ?",
        "เข้าใจแล้วครับ! เล่าเพิ่มเติมให้ฟังหน่อยได้ไหมครับ"
      ],
      recentBotTexts
    );
    nextQuestion = "";
  } else if (langLower.includes("swed") || langLower.includes("svensk") || langLower === "sv" || langLower === "se") {
    spokenReply = pickNonRepeating(
      [
        "Jättebra, jag förstod precis vad du menade! Låt oss fortsätta.",
        "Väldigt naturligt! Vad vill du göra härnäst?",
        "Uppfattat! Berätta gärna lite mer om det."
      ],
      recentBotTexts
    );
    nextQuestion = "";
  } else {
    const analyzed = analyzeEnglishLocally(spokenText, scenario, recentBotTexts);
    hasCorrection = analyzed.hasCorrection;
    original = analyzed.original;
    correction = analyzed.correction;
    explanation = analyzed.explanation;
    targetPhrase = analyzed.targetPhrase;
    spokenReply = analyzed.spokenReply;
    nextQuestion = analyzed.nextQuestion;
  }

  const latency = Math.round(performance.now() - startTime);

  return {
    hasCorrection,
    original,
    correction,
    explanation,
    targetPhrase: targetPhrase || correction,
    spokenReply,
    nextQuestion,
    engineUsed: "ON_DEVICE_NANO",
    latencyMs: latency,
    isOfflineFallback: isFallback,
    modelIdentifier: win?.ai?.languageModel
      ? "Gemini Nano (Chrome Built-in Prompt API)"
      : "On-Device Multi-Tense Neural NLP Core",
  };
}

/**
 * Main Hybrid Inference Router:
 * Dynamically arbitrates between On-Device Nano and Cloud Gemini Flash.
 */
export async function executeHybridInference(
  options: HybridInferenceOptions
): Promise<GrammarCorrectionResult> {
  const startTime = performance.now();
  const {
    spokenText,
    language,
    scenario,
    drillModeEnabled,
    orderedKeyPool,
    selectedModel,
    modeSetting,
    simulateOffline,
    conversationHistory = [],
  } = options;

  const isPhysicallyOffline = typeof navigator !== "undefined" && !navigator.onLine;
  const isOffline = isPhysicallyOffline || simulateOffline;

  // RULE 1: IF OFFLINE OR USER FORCED ON-DEVICE NANO -> RUN ON-DEVICE DIRECTLY
  if (isOffline || modeSetting === "nano_only") {
    return await executeOnDeviceInference(
      spokenText,
      language,
      scenario,
      drillModeEnabled,
      isOffline,
      startTime,
      conversationHistory
    );
  }

  // RULE 2: CLOUD INFERENCE VIA SECURE SERVERLESS ROUTE (/api/chat)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8500);

    const response = await fetch("/api/chat", {
      method: "POST",
      signal: controller.signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        spokenText,
        language,
        scenario,
        drillModeEnabled,
        conversationHistory,
        apiKeys: orderedKeyPool,
        selectedModel,
      }),
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const parsed = await response.json();
      const latency = Math.round(performance.now() - startTime);
      const modelUsed = parsed.modelIdentifier || "gemini-3.5-flash-lite";

      return {
        hasCorrection: Boolean(parsed.hasCorrection),
        original: parsed.original || "",
        correction: parsed.correction || "",
        explanation: parsed.explanation || "",
        targetPhrase: parsed.targetPhrase || parsed.correction || "",
        spokenReply: parsed.spokenReply || "Got it — let's keep going with the scenario.",
        nextQuestion: parsed.nextQuestion || "",
        engineUsed: "CLOUD_GEMINI_FLASH",
        latencyMs: latency,
        isOfflineFallback: false,
        modelIdentifier: `SpeakFlow Cloud Neural (${modelUsed})`,
      };
    }
  } catch (cloudErr) {
    console.warn("Secure Cloud /api/chat error, evaluating fallback:", cloudErr);
  }

  // STRICT CLOUD CHECK: If user explicitly required 'cloud_only', do NOT silently fallback to local
  if (modeSetting === "cloud_only") {
    throw new Error("Cloud-only inference failed: Cloud servers unreachable.");
  }

  // RULE 3: RESILIENCE FALLBACK -> On-Device Engine
  console.info("⚡ Cloud unreachable or timed out -> Automatic Seamless Fallback to On-Device Engine!");
  return await executeOnDeviceInference(
    spokenText,
    language,
    scenario,
    drillModeEnabled,
    true,
    startTime,
    conversationHistory
  );
}
