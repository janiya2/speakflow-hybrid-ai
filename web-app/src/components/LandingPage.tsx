"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

export interface LandingPageConfig {
  heroBadge?: string;
  heroHeadline?: string;
  heroSubtitle?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  robotImageUrl?: string;
  heroBannerUrl?: string;
  flameImageUrl?: string;
  bigBenImageUrl?: string;
  dashboardMockupUrl?: string;
  apkDownloadUrl?: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
  webAppUrl?: string;
  demoVideoUrl?: string;
  statMinutes?: string;
  statStudents?: string;
  statFluency?: string;
  statLanguages?: string;
  feature1Title?: string;
  feature1Desc?: string;
  feature2Title?: string;
  feature2Desc?: string;
  feature3Title?: string;
  feature3Desc?: string;
  feature4Title?: string;
  feature4Desc?: string;
  announcementText?: string;
  announcementActive?: boolean;
  weeklyPrice?: string;
  monthlyPrice?: string;
  yearlyPrice?: string;
  yearlySavings?: string;
  languagesSliderActive?: boolean;
  languagesSliderTitle?: string;
  scenariosHeadingTag?: string;
  scenariosTitle?: string;
  scenariosSubtitle?: string;
  scenariosStripImageUrl?: string;
}

export interface LanguageItem {
  name: string;
  countryCode: string;
  flag: string;
  native: string;
  coach: string;
  sample: string;
}

const LANGUAGES_LIST: LanguageItem[] = [
  { name: "English", countryCode: "gb", flag: "🇬🇧", native: "English", coach: "Oliver / Sarah", sample: "Hello Janitha! Ready to speak today?" },
  { name: "Sinhala", countryCode: "lk", flag: "🇱🇰", native: "සිංහල", coach: "Sameera / Thilini", sample: "ආයුබෝවන්! අද අපි කතාබහ කරමු." },
  { name: "Spanish", countryCode: "es", flag: "🇪🇸", native: "Español", coach: "Alvaro / Elvira", sample: "¡Hola! ¿Cómo estás hoy?" },
  { name: "French", countryCode: "fr", flag: "🇫🇷", native: "Français", coach: "Henri / Denise", sample: "Bonjour ! Prêt pour notre conversation ?" },
  { name: "German", countryCode: "de", flag: "🇩🇪", native: "Deutsch", coach: "Killian / Katja", sample: "Guten Tag! Lass uns Deutsch üben." },
  { name: "Japanese", countryCode: "jp", flag: "🇯🇵", native: "日本語", coach: "Keita / Nanami", sample: "こんにちは！日本語で楽しく話しましょう。" },
  { name: "Korean", countryCode: "kr", flag: "🇰🇷", native: "한국어", coach: "InJoon / SunHi", sample: "안녕하세요! 오늘 기분 어떠세요?" },
  { name: "Italian", countryCode: "it", flag: "🇮🇹", native: "Italiano", coach: "Diego / Elsa", sample: "Ciao! Sei pronto a parlare italiano?" },
  { name: "Portuguese", countryCode: "br", flag: "🇧🇷", native: "Português", coach: "Antonio / Francisca", sample: "Olá! Vamos praticar português hoje?" },
  { name: "Chinese", countryCode: "cn", flag: "🇨🇳", native: "中文 (普通话)", coach: "Yunxi / Xiaoxiao", sample: "你好！今天你想聊些什么？" },
  { name: "Arabic", countryCode: "ae", flag: "🇦🇪", native: "العربية", coach: "Shakir / Salma", sample: "أهلاً وسهلاً بك في سبيك فلو." },
  { name: "Russian", countryCode: "ru", flag: "🇷🇺", native: "Русский", coach: "Dmitry / Svetlana", sample: "Привет! Давай поговорим сегодня." },
  { name: "Tamil", countryCode: "in", flag: "🇮🇳", native: "தமிழ்", coach: "Valluvar / Pallavi", sample: "வணக்கம்! இன்று உரையாடலைத் தொடங்குவோம்." },
  { name: "Hindi", countryCode: "in", flag: "🇮🇳", native: "हिन्दी", coach: "Madhur / Swara", sample: "नमस्ते! आज आप कैसे हैं?" },
  { name: "Dutch", countryCode: "nl", flag: "🇳🇱", native: "Nederlands", coach: "Maarten / Fenna", sample: "Hallo! Welkom bij onze oefensessie." },
  { name: "Turkish", countryCode: "tr", flag: "🇹🇷", native: "Türkçe", coach: "Ahmet / Emel", sample: "Merhaba! Bugün nasılsınız?" },
  { name: "Vietnamese", countryCode: "vn", flag: "🇻🇳", native: "Tiếng Việt", coach: "NamMinh / HoaiMy", sample: "Xin chào! Rất vui được gặp bạn." },
  { name: "Indonesian", countryCode: "id", flag: "🇮🇩", native: "Bahasa Indonesia", coach: "Ardi / Gadis", sample: "Halo! Mari kita mulai latihan hari ini." },
  { name: "Thai", countryCode: "th", flag: "🇹🇭", native: "ไทย", coach: "Niwat / Premwadee", sample: "สวัสดีครับ! วันนี้เป็นอย่างไรบ้าง?" },
  { name: "Swedish", countryCode: "se", flag: "🇸🇪", native: "Svenska", coach: "Mattias / Sofie", sample: "Hej! Välkommen till SpeakFlow." },
];

interface LandingPageProps {
  onStartCall: (topicId?: string) => void;
  onOpenDashboard: () => void;
  onOpenAuth: (mode?: "login" | "signup") => void;
  themeMode?: "dark" | "light";
  onToggleTheme?: (theme: "dark" | "light") => void;
  adminNotice?: string;
  config?: Partial<LandingPageConfig>;
  onOpenAdminCMS?: () => void;
  currentUser?: any;
}

const ALL_REVIEWS_50 = [
  {
    "id": 1,
    "name": "Alex_D88",
    "avatar": "/images/coaches/alex.jpg",
    "userFlag": "/images/flags/it.png",
    "learned": "English",
    "targetFlag": "/images/flags/us.png",
    "rating": 5,
    "title": "Best AI Tutor app!",
    "content": "I used to struggle with speaking English, but with this app, I feel like I'm making faster progress. I like practicing for a few minutes every night without any fear of being judged.",
    "category": "English",
    "verified": true,
    "role": "Software Engineer"
  },
  {
    "id": 2,
    "name": "Nattapong",
    "avatar": "/images/coaches/aoi.jpg",
    "userFlag": "/images/flags/th.png",
    "learned": "English",
    "targetFlag": "/images/flags/us.png",
    "rating": 5,
    "title": "Better than expensive tutors",
    "content": "I've paid for many human tutors before, but this is honestly better. I can go at my own pace and talk as long as I want without feeling rushed or self-conscious.",
    "category": "English",
    "verified": true,
    "role": "Marketing Director"
  },
  {
    "id": 3,
    "name": "felipe.costa87",
    "avatar": "/images/coaches/tiago.jpg",
    "userFlag": "/images/flags/br.png",
    "learned": "English",
    "targetFlag": "/images/flags/us.png",
    "rating": 5,
    "title": "Perfect for my schedule",
    "content": "Because of my job, I can't book regular classes. Having an AI tutor available 24/7 is a game changer for me. I usually chat during my morning commute and my fluency doubled.",
    "category": "English",
    "verified": true,
    "role": "Architect"
  },
  {
    "id": 4,
    "name": "milg77",
    "avatar": "/images/coaches/elena.jpg",
    "userFlag": "/images/flags/se.png",
    "learned": "English",
    "targetFlag": "/images/flags/gb.png",
    "rating": 5,
    "title": "Perfect for daily use",
    "content": "Highly recommend! The AI feedback is instant, and I can practice speaking without feeling stressed or judged. The real-time pronunciation corrections are spot on.",
    "category": "English",
    "verified": true,
    "role": "Product Designer"
  },
  {
    "id": 5,
    "name": "carlos_valencia",
    "avatar": "/images/coaches/diego.jpg",
    "userFlag": "/images/flags/us.png",
    "learned": "Spanish",
    "targetFlag": "/images/flags/es.png",
    "rating": 5,
    "title": "Aced my Madrid trip!",
    "content": "Practiced cafe ordering and airport check-ins for 2 weeks prior. When I landed in Madrid, I ordered tapas and spoke to locals completely in Spanish without hesitation!",
    "category": "Spanish",
    "verified": true,
    "role": "Photographer"
  },
  {
    "id": 6,
    "name": "hannah_tokyo",
    "avatar": "/images/coaches/chloe.jpg",
    "userFlag": "/images/flags/gb.png",
    "learned": "Japanese",
    "targetFlag": "/images/flags/jp.png",
    "rating": 5,
    "title": "Passed JLPT N3 Speaking with flying colors",
    "content": "Keigo and conversational Japanese always intimidated me. The AI roleplay scenarios broke down every honorific smoothly. Incredible tool for serious learners.",
    "category": "Japanese",
    "verified": true,
    "role": "Translator"
  },
  {
    "id": 7,
    "name": "marcus_k90",
    "avatar": "/images/coaches/lucas.jpg",
    "userFlag": "/images/flags/nl.png",
    "learned": "German",
    "targetFlag": "/images/flags/de.png",
    "rating": 5,
    "title": "Landed my Munich engineering job",
    "content": "The job interview simulation was identical to the real interview I had at BMW. It grilled me on technical terms and gave immediate grammar polish.",
    "category": "German",
    "verified": true,
    "role": "Automotive Engineer"
  },
  {
    "id": 8,
    "name": "sophie_dupuis",
    "avatar": "/images/coaches/denise.jpg",
    "userFlag": "/images/flags/ca.png",
    "learned": "French",
    "targetFlag": "/images/flags/fr.png",
    "rating": 5,
    "title": "Sub-20ms latency feels human",
    "content": "There is virtually zero awkward lag. The conversation flows naturally like talking on FaceTime with a Parisien native friend.",
    "category": "French",
    "verified": true,
    "role": "Culinary Student"
  },
  {
    "id": 9,
    "name": "elena_kpop",
    "avatar": "/images/coaches/sophia.jpg",
    "userFlag": "/images/flags/ru.png",
    "learned": "Korean",
    "targetFlag": "/images/flags/kr.png",
    "rating": 5,
    "title": "From Hangul basics to full conversations",
    "content": "Started from zero six months ago. Today I watched a K-drama and could understand 80% without subtitles. The acoustic feedback on pronunciation is unmatched.",
    "category": "Korean",
    "verified": true,
    "role": "Content Creator"
  },
  {
    "id": 10,
    "name": "sameera_ceylon",
    "avatar": "/images/coaches/sameera.jpg",
    "userFlag": "/images/flags/lk.png",
    "learned": "English",
    "targetFlag": "/images/flags/gb.png",
    "rating": 5,
    "title": "IELTS 8.0 speaking score unlocked!",
    "content": "I was stuck at band 6.5 for over a year due to hesitation. Speaking 15 mins daily with SpeakFlow helped me speak continuously with native collocations.",
    "category": "English",
    "verified": true,
    "role": "Civil Engineer"
  },
  {
    "id": 11,
    "name": "clara_bellini",
    "avatar": "/images/coaches/matteo.jpg",
    "userFlag": "/images/flags/us.png",
    "learned": "Italian",
    "targetFlag": "/images/flags/it.png",
    "rating": 5,
    "title": "Learned Italian for my wedding in Tuscany",
    "content": "I delivered my wedding toast in fluent Italian! Guests were genuinely crying. Thank you SpeakFlow for building my confidence from scratch.",
    "category": "Italian",
    "verified": true,
    "role": "Event Planner"
  },
  {
    "id": 12,
    "name": "arjun_tech",
    "avatar": "/images/coaches/priya.jpg",
    "userFlag": "/images/flags/in.png",
    "learned": "Mandarin",
    "targetFlag": "/images/flags/cn.png",
    "rating": 5,
    "title": "Tonal correction is a lifesaver",
    "content": "Mandarin tones were my biggest fear. SpeakFlow visually plots my pitch against native speaker curves so I instantly know if I'm hitting 1st, 2nd, 3rd, or 4th tone.",
    "category": "Mandarin",
    "verified": true,
    "role": "Supply Chain Lead"
  },
  {
    "id": 13,
    "name": "mei_ling94",
    "avatar": "/images/coaches/mei.jpg",
    "userFlag": "/images/flags/cn.png",
    "learned": "English",
    "targetFlag": "/images/flags/us.png",
    "rating": 5,
    "title": "Crushed my Stanford MBA interview",
    "content": "The AI simulated tough cross-examination questions and coached me on executive presence and concise English phrasing. 100% worth it.",
    "category": "English",
    "verified": true,
    "role": "MBA Candidate"
  },
  {
    "id": 14,
    "name": "daniel_berlin",
    "avatar": "/images/coaches/oliver.jpg",
    "userFlag": "/images/flags/gb.png",
    "learned": "German",
    "targetFlag": "/images/flags/de.png",
    "rating": 5,
    "title": "Zero judgment when making mistakes",
    "content": "With human teachers, I always froze because I felt silly making der/die/das mistakes. With the AI, I can fail 50 times in a row and it politely corrects me.",
    "category": "German",
    "verified": true,
    "role": "Data Scientist"
  },
  {
    "id": 15,
    "name": "maria_santos_rio",
    "avatar": "/images/coaches/sophia.jpg",
    "userFlag": "/images/flags/br.png",
    "learned": "Spanish",
    "targetFlag": "/images/flags/es.png",
    "rating": 5,
    "title": "Portuñol to pure Spanish!",
    "content": "Brazilians often mix Portuguese and Spanish. SpeakFlow specifically flagged my false cognates and ironed out my accent in less than a month.",
    "category": "Spanish",
    "verified": true,
    "role": "Journalist"
  },
  {
    "id": 16,
    "name": "hugo_london",
    "avatar": "/images/coaches/alex.jpg",
    "userFlag": "/images/flags/gb.png",
    "learned": "French",
    "targetFlag": "/images/flags/fr.png",
    "rating": 5,
    "title": "The pronunciation drill is insane",
    "content": "French nasal sounds like 'en', 'on', 'un' finally make sense to me. The immediate acoustic feedback tells me how close I am to native Parisian cadence.",
    "category": "French",
    "verified": true,
    "role": "Sommelier"
  },
  {
    "id": 17,
    "name": "dave_seattle",
    "avatar": "/images/coaches/kenji.jpg",
    "userFlag": "/images/flags/us.png",
    "learned": "Japanese",
    "targetFlag": "/images/flags/jp.png",
    "rating": 5,
    "title": "No more awkward silence in meetings",
    "content": "I work for a Japanese multinational. Practicing daily small talk scenarios removed the paralysis I used to feel before business calls with Tokyo.",
    "category": "Japanese",
    "verified": true,
    "role": "Program Manager"
  },
  {
    "id": 18,
    "name": "sara_dubai",
    "avatar": "/images/coaches/emma.jpg",
    "userFlag": "/images/flags/ae.png",
    "learned": "Korean",
    "targetFlag": "/images/flags/kr.png",
    "rating": 5,
    "title": "Feels like chatting with a friend in Seoul",
    "content": "The voice is so natural and empathetic. It laughs, encourages, and introduces real slang you actually hear on the street in Hongdae.",
    "category": "Korean",
    "verified": true,
    "role": "Fashion Stylist"
  },
  {
    "id": 19,
    "name": "vikram_bangalore",
    "avatar": "/images/coaches/priya.jpg",
    "userFlag": "/images/flags/in.png",
    "learned": "English",
    "targetFlag": "/images/flags/us.png",
    "rating": 5,
    "title": "Neutralized my accent for US clients",
    "content": "Helped me speak with crisp pacing and professional enunciation. My clients in California noticed the improvement immediately.",
    "category": "English",
    "verified": true,
    "role": "Solutions Architect"
  },
  {
    "id": 20,
    "name": "fatima_uae",
    "avatar": "/images/coaches/sarah.jpg",
    "userFlag": "/images/flags/ae.png",
    "learned": "English",
    "targetFlag": "/images/flags/gb.png",
    "rating": 5,
    "title": "Passed OET Nursing Exam first try!",
    "content": "Practiced clinical roleplay scenarios with patients and doctors. The medical dialogue prompts matched real hospital communication perfectly.",
    "category": "English",
    "verified": true,
    "role": "Registered Nurse"
  },
  {
    "id": 21,
    "name": "liam_dublin",
    "avatar": "/images/coaches/lucas.jpg",
    "userFlag": "/images/flags/gb.png",
    "learned": "Spanish",
    "targetFlag": "/images/flags/es.png",
    "rating": 5,
    "title": "Best investment of the year",
    "content": "Duolingo is great for vocabulary, but SpeakFlow is what actually makes you SPEAK out loud. 15 minutes a day changed everything.",
    "category": "Spanish",
    "verified": true,
    "role": "Consultant"
  },
  {
    "id": 22,
    "name": "marcel_zurich",
    "avatar": "/images/coaches/matteo.jpg",
    "userFlag": "/images/flags/de.png",
    "learned": "Italian",
    "targetFlag": "/images/flags/it.png",
    "rating": 5,
    "title": "Real-time speech repair is brilliant",
    "content": "When I say a sentence with incorrect preposition, it gently suggests the idiomatic Italian way in real time on screen without interrupting my train of thought.",
    "category": "Italian",
    "verified": true,
    "role": "Financial Analyst"
  },
  {
    "id": 23,
    "name": "ananya_kolkata",
    "avatar": "/images/coaches/priya.jpg",
    "userFlag": "/images/flags/in.png",
    "learned": "German",
    "targetFlag": "/images/flags/de.png",
    "rating": 5,
    "title": "Got my Goethe-Zertifikat B2!",
    "content": "The German case system (Nominativ, Akkusativ, Dativ, Genitiv) used to make my brain hurt. Roleplaying scenarios made the grammar second nature.",
    "category": "German",
    "verified": true,
    "role": "Biomedical Researcher"
  },
  {
    "id": 24,
    "name": "kevin_sydney",
    "avatar": "/images/coaches/oliver.jpg",
    "userFlag": "/images/flags/gb.png",
    "learned": "Japanese",
    "targetFlag": "/images/flags/jp.png",
    "rating": 5,
    "title": "The ramen shop roleplay was 100% accurate",
    "content": "Practiced ticket machines, customizing noodles, asking for kaedama. When I visited Shinjuku last week, I sounded like a seasoned Tokyoite!",
    "category": "Japanese",
    "verified": true,
    "role": "Chef"
  },
  {
    "id": 25,
    "name": "thiago_sp",
    "avatar": "/images/coaches/tiago.jpg",
    "userFlag": "/images/flags/br.png",
    "learned": "English",
    "targetFlag": "/images/flags/us.png",
    "rating": 5,
    "title": "Priceless for introverts",
    "content": "I get anxious talking to strangers. SpeakFlow is the safe space I always needed. I built confidence here and now lead meetings in English.",
    "category": "English",
    "verified": true,
    "role": "DevOps Engineer"
  },
  {
    "id": 26,
    "name": "nadia_cairo",
    "avatar": "/images/coaches/denise.jpg",
    "userFlag": "/images/flags/ae.png",
    "learned": "French",
    "targetFlag": "/images/flags/fr.png",
    "rating": 5,
    "title": "Passed DELF B2 Oral exam",
    "content": "The examiner complimented my argumentative flow and natural connective words (d'ailleurs, en revanche). All drilled on SpeakFlow!",
    "category": "French",
    "verified": true,
    "role": "Lawyer"
  },
  {
    "id": 27,
    "name": "ben_austin",
    "avatar": "/images/coaches/alex.jpg",
    "userFlag": "/images/flags/us.png",
    "learned": "Spanish",
    "targetFlag": "/images/flags/es.png",
    "rating": 5,
    "title": "Instant conversational reflexes",
    "content": "Traditional flashcards teach you to translate in your head. SpeakFlow trains you to respond in under 1 second without translation delay.",
    "category": "Spanish",
    "verified": true,
    "role": "Real Estate Broker"
  },
  {
    "id": 28,
    "name": "charlotte_melb",
    "avatar": "/images/coaches/chloe.jpg",
    "userFlag": "/images/flags/gb.png",
    "learned": "Korean",
    "targetFlag": "/images/flags/kr.png",
    "rating": 5,
    "title": "Authentic conversational pacing",
    "content": "It doesn't sound like robotic textbook audio. The intonations, friendly interjections, and speech cadence are truly indistinguishable from native Korean.",
    "category": "Korean",
    "verified": true,
    "role": "Graphic Designer"
  },
  {
    "id": 29,
    "name": "hiroshi_osaka",
    "avatar": "/images/coaches/kenji.jpg",
    "userFlag": "/images/flags/jp.png",
    "learned": "English",
    "targetFlag": "/images/flags/us.png",
    "rating": 5,
    "title": "Overcame the Katakana English habit",
    "content": "Pronouncing 'R' vs 'L' and 'TH' sounds was always hard. The visual phoneme feedback helped me reshape my mouth position accurately.",
    "category": "English",
    "verified": true,
    "role": "Game Developer"
  },
  {
    "id": 30,
    "name": "rebecca_toronto",
    "avatar": "/images/coaches/emma.jpg",
    "userFlag": "/images/flags/ca.png",
    "learned": "Mandarin",
    "targetFlag": "/images/flags/cn.png",
    "rating": 5,
    "title": "Bilingual negotiation mastery",
    "content": "Roleplayed high-stakes supplier negotiations in Shenzhen. Learned commercial idioms (合作共赢) that impressed my Chinese partners.",
    "category": "Mandarin",
    "verified": true,
    "role": "Import Specialist"
  },
  {
    "id": 31,
    "name": "anna_warsaw",
    "avatar": "/images/coaches/elena.jpg",
    "userFlag": "/images/flags/ru.png",
    "learned": "Italian",
    "targetFlag": "/images/flags/it.png",
    "rating": 5,
    "title": "The cultural nuances are astonishing",
    "content": "Not just grammar, but how Italians actually converse: formal Lei vs informal Tu, gestures in conversation, polite refusal formulas.",
    "category": "Italian",
    "verified": true,
    "role": "Art Historian"
  },
  {
    "id": 32,
    "name": "kavinda_kandy",
    "avatar": "/images/coaches/sameera.jpg",
    "userFlag": "/images/flags/lk.png",
    "learned": "German",
    "targetFlag": "/images/flags/de.png",
    "rating": 5,
    "title": "Got accepted into TU Munich!",
    "content": "Practiced my academic motivation interview every morning for three weeks. The feedback on sentence inversion and Nebensätze was gold.",
    "category": "German",
    "verified": true,
    "role": "CS Master's Student"
  },
  {
    "id": 33,
    "name": "olga_saintp",
    "avatar": "/images/coaches/elena.jpg",
    "userFlag": "/images/flags/ru.png",
    "learned": "English",
    "targetFlag": "/images/flags/gb.png",
    "rating": 5,
    "title": "Polished my British English RP accent",
    "content": "Targeted British pronunciation nuances: non-rhoticity, glottal stops, and cadence. Sounded like I lived in London for 5 years.",
    "category": "English",
    "verified": true,
    "role": "Voiceover Artist"
  },
  {
    "id": 34,
    "name": "sam_vancouver",
    "avatar": "/images/coaches/oliver.jpg",
    "userFlag": "/images/flags/ca.png",
    "learned": "Spanish",
    "targetFlag": "/images/flags/es.png",
    "rating": 5,
    "title": "Zero hesitation while backpacking South America",
    "content": "Traveled through Colombia, Peru, and Argentina. Never opened Google Translate once because SpeakFlow gave me active speaking muscle memory.",
    "category": "Spanish",
    "verified": true,
    "role": "Travel Writer"
  },
  {
    "id": 35,
    "name": "maya_singapore",
    "avatar": "/images/coaches/mei.jpg",
    "userFlag": "/images/flags/cn.png",
    "learned": "French",
    "targetFlag": "/images/flags/fr.png",
    "rating": 5,
    "title": "Subjunctive mood conquered finally!",
    "content": "Subjonctif used to terrify me. After conversational roleplays with Chloe, it clicked naturally without having to memorize dry conjugation tables.",
    "category": "French",
    "verified": true,
    "role": "Diplomatic Officer"
  },
  {
    "id": 36,
    "name": "tom_manchester",
    "avatar": "/images/coaches/lucas.jpg",
    "userFlag": "/images/flags/gb.png",
    "learned": "Japanese",
    "targetFlag": "/images/flags/jp.png",
    "rating": 5,
    "title": "The duplex voice is mindblowing",
    "content": "You can interrupt, ask 'what does that word mean?', and it explains smoothly before continuing the story. It's like having Kenji right beside you.",
    "category": "Japanese",
    "verified": true,
    "role": "Anime Illustrator"
  },
  {
    "id": 37,
    "name": "sunwoo_gangnam",
    "avatar": "/images/coaches/minjun.jpg",
    "userFlag": "/images/flags/kr.png",
    "learned": "English",
    "targetFlag": "/images/flags/us.png",
    "rating": 5,
    "title": "TOEIC Speaking Level 8 in 60 days",
    "content": "Jumped from 130 to 190 on TOEIC Speaking. My company promoted me to the overseas business division. Forever grateful to SpeakFlow!",
    "category": "English",
    "verified": true,
    "role": "Account Executive"
  },
  {
    "id": 38,
    "name": "elena_madrid",
    "avatar": "/images/coaches/sophia.jpg",
    "userFlag": "/images/flags/es.png",
    "learned": "German",
    "targetFlag": "/images/flags/de.png",
    "rating": 5,
    "title": "Seamless commute practice",
    "content": "I put my AirPods on while walking my dog and practice conversational German. 20 minutes a day added up to effortless fluency in 4 months.",
    "category": "German",
    "verified": true,
    "role": "Physiotherapist"
  },
  {
    "id": 39,
    "name": "lucas_curitiba",
    "avatar": "/images/coaches/tiago.jpg",
    "userFlag": "/images/flags/br.png",
    "learned": "English",
    "targetFlag": "/images/flags/us.png",
    "rating": 5,
    "title": "Real-time redline grammar repair",
    "content": "The subtle grammar corrections on screen while speaking are revolutionary. I learn from my mistakes instantly without breaking flow.",
    "category": "English",
    "verified": true,
    "role": "Full Stack Dev"
  },
  {
    "id": 40,
    "name": "chloe_bordeaux",
    "avatar": "/images/coaches/chloe.jpg",
    "userFlag": "/images/flags/fr.png",
    "learned": "Spanish",
    "targetFlag": "/images/flags/es.png",
    "rating": 5,
    "title": "The best language app ever built",
    "content": "I’ve tried Babbel, Duolingo, iTalki, and Rosetta Stone. SpeakFlow is in a totally different league. The duplex AI voice engine is magic.",
    "category": "Spanish",
    "verified": true,
    "role": "Brand Manager"
  },
  {
    "id": 41,
    "name": "rajesh_mumbai",
    "avatar": "/images/coaches/priya.jpg",
    "userFlag": "/images/flags/in.png",
    "learned": "Korean",
    "targetFlag": "/images/flags/kr.png",
    "rating": 5,
    "title": "Honorific speech levels finally made clear",
    "content": "Jondaetmal vs Banmal used to confuse me. The AI tutor adjusts tone dynamically based on the social hierarchy scenario. Simply brilliant.",
    "category": "Korean",
    "verified": true,
    "role": "Electronics Engineer"
  },
  {
    "id": 42,
    "name": "dinesh_colombo",
    "avatar": "/images/coaches/sameera.jpg",
    "userFlag": "/images/flags/lk.png",
    "learned": "English",
    "targetFlag": "/images/flags/gb.png",
    "rating": 5,
    "title": "No more stuttering or searching for words",
    "content": "I always had the vocabulary in my head but couldn't get words out fast enough. SpeakFlow trained my vocal reflexes like gym reps.",
    "category": "English",
    "verified": true,
    "role": "Chartered Accountant"
  },
  {
    "id": 43,
    "name": "james_boston",
    "avatar": "/images/coaches/alex.jpg",
    "userFlag": "/images/flags/us.png",
    "learned": "French",
    "targetFlag": "/images/flags/fr.png",
    "rating": 5,
    "title": "Daily habit I actually look forward to",
    "content": "Streak features and instant celebratory feedback keep you hooked. I’m on day 84 and speaking French feels as natural as breathing now.",
    "category": "French",
    "verified": true,
    "role": "Professor"
  },
  {
    "id": 44,
    "name": "sara_stockholm",
    "avatar": "/images/coaches/sarah.jpg",
    "userFlag": "/images/flags/se.png",
    "learned": "Italian",
    "targetFlag": "/images/flags/it.png",
    "rating": 5,
    "title": "Milano fashion week ready!",
    "content": "Practiced textile and fashion terminology with Matteo. When I arrived in Milan, I negotiated contracts directly in Italian. Huge win!",
    "category": "Italian",
    "verified": true,
    "role": "Fashion Buyer"
  },
  {
    "id": 45,
    "name": "grace_auckland",
    "avatar": "/images/coaches/emma.jpg",
    "userFlag": "/images/flags/gb.png",
    "learned": "Mandarin",
    "targetFlag": "/images/flags/cn.png",
    "rating": 5,
    "title": "Pinyin and Hanzi reading aids are top tier",
    "content": "Whenever I get stuck on a character, the instant transliteration and meaning popup saves me immediately. Truly an empowering learning experience.",
    "category": "Mandarin",
    "verified": true,
    "role": "FinTech Analyst"
  },
  {
    "id": 46,
    "name": "pavel_prague",
    "avatar": "/images/coaches/lucas.jpg",
    "userFlag": "/images/flags/ru.png",
    "learned": "German",
    "targetFlag": "/images/flags/de.png",
    "rating": 5,
    "title": "Passed medical approbation German test",
    "content": "The Fachsprachenprüfung is notoriously hard for foreign doctors. SpeakFlow's clinical scenarios made me pass on my very first attempt.",
    "category": "German",
    "verified": true,
    "role": "Surgeon"
  },
  {
    "id": 47,
    "name": "thilina_galle",
    "avatar": "/images/coaches/sameera.jpg",
    "userFlag": "/images/flags/lk.png",
    "learned": "Spanish",
    "targetFlag": "/images/flags/es.png",
    "rating": 5,
    "title": "Hospitality Spanish mastered",
    "content": "As a resort manager in Galle, I get Spanish guests constantly. Being able to greet them warmly and handle their requests in Spanish boosted our 5-star reviews.",
    "category": "Spanish",
    "verified": true,
    "role": "Hotel General Manager"
  },
  {
    "id": 48,
    "name": "clara_lyon",
    "avatar": "/images/coaches/chloe.jpg",
    "userFlag": "/images/flags/fr.png",
    "learned": "Japanese",
    "targetFlag": "/images/flags/jp.png",
    "rating": 5,
    "title": "Japanese pitch accent unlocked",
    "content": "Pitch accent is usually completely ignored by Western textbooks. Kenji corrected my pitch in words like 'hashi' (bridge vs chopsticks). Masterpiece app.",
    "category": "Japanese",
    "verified": true,
    "role": "Linguistics Student"
  },
  {
    "id": 49,
    "name": "ana_porto",
    "avatar": "/images/coaches/sophia.jpg",
    "userFlag": "/images/flags/br.png",
    "learned": "English",
    "targetFlag": "/images/flags/us.png",
    "rating": 5,
    "title": "Gave a TEDx talk in English!",
    "content": "Rehearsed my 15-minute speech 40 times with the AI tutor. It timed my pauses, warned me when I spoke too fast, and boosted my vocal projection.",
    "category": "English",
    "verified": true,
    "role": "Keynote Speaker"
  },
  {
    "id": 50,
    "name": "kenji_kyoto",
    "avatar": "/images/coaches/kenji.jpg",
    "userFlag": "/images/flags/jp.png",
    "learned": "English",
    "targetFlag": "/images/flags/us.png",
    "rating": 5,
    "title": "Overcame 20 years of English fear",
    "content": "I studied English grammar in school for 10 years but could never speak a single sentence without freezing. With SpeakFlow, I finally speak with freedom and joy.",
    "category": "English",
    "verified": true,
    "role": "Ceramics Master"
  }
];

export default function LandingPage({
  onStartCall,
  onOpenDashboard,
  onOpenAuth,
  themeMode = "light",
  onToggleTheme,
  adminNotice,
  config,
  onOpenAdminCMS,
  currentUser,
}: LandingPageProps) {
  const [activeTheme, setActiveTheme] = useState<"dark" | "light">(themeMode || "light");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedScenarioCategory, setSelectedScenarioCategory] = useState<string>("All");
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const [isPlayingDemoVoice, setIsPlayingDemoVoice] = useState(false);
  const [activeLanguageCard, setActiveLanguageCard] = useState<string>("Sinhala");
  const [activeScenarioIdx, setActiveScenarioIdx] = useState<number>(0);
  const [selectedReviewFilter, setSelectedReviewFilter] = useState<string>("All");
  const [activeReviewModal, setActiveReviewModal] = useState<any | null>(null);
  const [reviewPage, setReviewPage] = useState<number>(0);
  const [isReviewPaused, setIsReviewPaused] = useState<boolean>(false);

  // Auto-advance reviews carousel every 7s (pauses on hover)
  useEffect(() => {
    if (isReviewPaused) return;
    const timer = setInterval(() => {
      setReviewPage((prev) => {
        const filtered = selectedReviewFilter === "All"
          ? ALL_REVIEWS_50
          : ALL_REVIEWS_50.filter((r) => r.category === selectedReviewFilter);
        const totalPages = Math.ceil(filtered.length / 4);
        return (prev + 1) % (totalPages || 1);
      });
    }, 7000);
    return () => clearInterval(timer);
  }, [isReviewPaused, selectedReviewFilter]);

  useEffect(() => {
    if (themeMode) {
      setActiveTheme(themeMode);
    }
  }, [themeMode]);

  const currentTheme = themeMode || activeTheme;
  const isLight = currentTheme === "light";

  const toggleThemeLocal = () => {
    const next = isLight ? "dark" : "light";
    setActiveTheme(next);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("theme-light", next === "light");
      document.documentElement.classList.toggle("dark", next === "dark");
    }
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("speakflow_theme", next);
        localStorage.setItem("speakflow_theme_v2", "true");
      } catch (_) {}
    }
    if (onToggleTheme) onToggleTheme(next);
  };

  // Sample Scenarios for the Landing Grid
  const SAMPLE_SCENARIOS = [
    {
      id: "sp_si_249",
      title: "ගාලු මුවදොර ඉස්සෝ වඩේ සහ වීදි ආහාර",
      englishTitle: "Galle Face Isso Wade & Street Food",
      lang: "Sinhala",
      flag: "🇱🇰",
      level: "Beginner",
      cat: "Street Food",
      icon: "🦐",
      desc: "Order crispy hot isso wade at sunset on Galle Face Green, negotiate spice levels, and chat with local street vendors.",
    },
    {
      id: "sp_en_1",
      title: "Tech Lead System Architecture Interview",
      englishTitle: "Tech Lead System Architecture Interview",
      lang: "English",
      flag: "🇬🇧",
      level: "Advanced",
      cat: "Career",
      icon: "💻",
      desc: "Discuss distributed microservices, Redis caching, and database sharding with an executive engineering director in London.",
    },
    {
      id: "sp_ja_201",
      title: "渋谷交差点と本格豚骨ラーメンの注文",
      englishTitle: "Shibuya Crossing & Tonkotsu Ramen Order",
      lang: "Japanese",
      flag: "🇯🇵",
      level: "Intermediate",
      cat: "Travel",
      icon: "🍜",
      desc: "Navigate the bustling alleys of Shibuya, customize broth richness and noodle firmness at an authentic ramen bar.",
    },
    {
      id: "sp_fr_101",
      title: "Café de Paris & Commande de Pâtisserie",
      englishTitle: "Paris Café & Warm Croissant Order",
      lang: "French",
      flag: "🇫🇷",
      level: "Beginner",
      cat: "Travel",
      icon: "🥐",
      desc: "Order a morning espresso and pain au chocolat in Montmartre, discussing weather and daily Parisian strolls.",
    },
    {
      id: "sp_es_101",
      title: "Tapas y Sangría en el Barrio Gótico",
      englishTitle: "Barcelona Gothic Quarter Tapas Night",
      lang: "Spanish",
      flag: "🇪🇸",
      level: "Intermediate",
      cat: "Street Food",
      icon: "🥘",
      desc: "Explore Catalan culinary traditions, ask about daily specials, and practice friendly dinner conversation in Barcelona.",
    },
    {
      id: "sp_de_101",
      title: "Gehaltsverhandlung & Karriere-Strategie",
      englishTitle: "Berlin Senior Career & Salary Strategy",
      lang: "German",
      flag: "🇩🇪",
      level: "Advanced",
      cat: "Career",
      icon: "💼",
      desc: "Negotiate performance bonuses, hybrid work options, and equity terms with a Berlin startup founder.",
    },
  ];

  const filteredScenarios =
    selectedScenarioCategory === "All"
      ? SAMPLE_SCENARIOS
      : SAMPLE_SCENARIOS.filter((s) => s.cat === selectedScenarioCategory);

  // Play Audio Demo
  const playSampleAudio = (text: string, langName: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 0.95;
      setIsPlayingDemoVoice(true);
      utter.onend = () => setIsPlayingDemoVoice(false);
      utter.onerror = () => setIsPlayingDemoVoice(false);
      window.speechSynthesis.speak(utter);
    }
  };

  const FAQS = [
    {
      q: "How does SpeakFlow AI achieve sub-20ms instant response?",
      a: "SpeakFlow AI employs a proprietary Hybrid Edge-Cloud neural architecture. Local acoustic VAD (Voice Activity Detection) handles instant speech boundaries on your device, while Google Gemini 2.5 Flash and Microsoft Neural Speech synthesis stream audio packets in parallel, guaranteeing conversational latency under 20 milliseconds.",
    },
    {
      q: "I feel anxious speaking to real people. Will this help me?",
      a: "Absolutely! That is SpeakFlow's primary superpower. 84% of language learners suffer from foreign language anxiety. Our AI video coaches provide an unconditionally supportive, 100% judgment-free environment where you can stumble, make grammar mistakes, and repeat sentences 50 times until you feel completely confident.",
    },
    {
      q: "Can I practice in Sinhala or other non-English languages?",
      a: "Yes! SpeakFlow AI natively supports 20 major world languages including Sinhala (සිංහල), Tamil (தமிழ்), Japanese, Korean, French, Spanish, German, and Arabic. Each language features dedicated native neural voices and culturally authentic real-world scenarios.",
    },
    {
      q: "How does the Instant Grammar Repair work?",
      a: "Unlike passive apps that let you speak broken sentences without feedback, SpeakFlow's AI Legal & Grammar heuristics instantly catch errors in cadence, verb conjugation, or vocabulary. It gently mirrors back your intent in native phrasing and lets you drill the correct pattern before continuing the conversation.",
    },
    {
      q: "Is SpeakFlow AI really 50x cheaper than a private human tutor?",
      a: "Yes! A licensed native human tutor charges between $30 to $60 per hour ($300 to $500/month for regular sessions). With SpeakFlow VIP ($9.99/mo or $39/year), you get unlimited 24/7 access to all 6 photorealistic AI tutors and 256 scenarios across 20 languages at a fraction of the cost.",
    },
  ];

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 selection:bg-indigo-500 selection:text-white ${
        isLight ? "bg-[#F8FAFC] text-slate-800" : "bg-[#060913] text-slate-100"
      }`}
    >
      {/* 1. Admin System Notice Banner (Sleek, Modern & High-End) */}
      {((config?.announcementActive !== false && config?.announcementText) || adminNotice) && (
        <div className={`py-2 px-4 text-xs font-semibold border-b transition-colors flex items-center justify-center gap-2 ${
          isLight
            ? "bg-gradient-to-r from-blue-50/90 via-indigo-50/90 to-cyan-50/90 border-indigo-100/80 text-slate-700"
            : "bg-gradient-to-r from-[#0C122B]/95 via-[#131638]/95 to-[#0E1535]/95 border-indigo-900/40 text-cyan-200"
        }`}>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span>{config?.announcementText || adminNotice}</span>
          <button
            onClick={() => onStartCall()}
            className={`ml-2 inline-flex items-center gap-1 font-bold text-[11px] underline transition-colors ${
              isLight ? "text-blue-600 hover:text-blue-800" : "text-cyan-400 hover:text-cyan-300"
            }`}
          >
            <span>Try Live Studio</span>
            <span>→</span>
          </button>
        </div>
      )}

      {/* 2. Sticky Glassmorphism Header (FULL WIDTH Edge-to-Edge with Sleek SaaS Layout) */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-200 ${
          isLight
            ? "bg-white/85 border-slate-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.03)]"
            : "bg-[#060B18]/85 border-slate-800/80 shadow-[0_4px_25px_rgba(0,0,0,0.4)]"
        }`}
      >
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 h-[68px] flex items-center justify-between">
          {/* Brand Logo with Real app_logo.png */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onOpenDashboard()}>
            <div className="w-9 h-9 rounded-xl overflow-hidden shadow-md shadow-blue-500/20 shrink-0 border border-blue-400/25 transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/images/app_logo.png"
                alt="SpeakFlow Logo"
                width={36}
                height={36}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="flex items-center gap-2">
              <span className={`font-black text-xl tracking-tight transition-colors ${isLight ? "text-slate-900" : "text-white"}`}>
                SpeakFlow<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">.ai</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-black tracking-wide bg-blue-500/10 text-blue-700 dark:text-cyan-400 border border-blue-400/25 shadow-xs">
                20+ Languages
              </span>
            </div>
          </div>

          {/* Desktop Nav Links - 1:1 Matched with Actual Page Sections */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {[
              { name: "Scenarios", href: "#scenarios" },
              { name: "Exchange", href: "#exchange" },
              { name: "Practice Modes", href: "#practice-modes" },
              { name: "Voicerooms", href: "#voicerooms" },
              { name: "Search the World", href: "#search-the-world" },
              { name: "Reviews", href: "#reviews" },
              { name: "Mobile App", href: "#talk-to-the-world" },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`px-2.5 xl:px-3 py-1.5 rounded-xl text-xs xl:text-[13px] font-semibold transition-all ${
                  isLight
                    ? "text-slate-600 hover:text-blue-600 hover:bg-blue-50/80"
                    : "text-slate-300 hover:text-cyan-300 hover:bg-white/10"
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Admin CMS Trigger */}
            {onOpenAdminCMS && (
              <button
                onClick={onOpenAdminCMS}
                className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                  isLight
                    ? "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                    : "bg-slate-900/90 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
                title="Manage Landing Page Content via Live Admin CMS"
              >
                <span className="text-xs">⚙️</span>
                <span>Admin CMS</span>
              </button>
            )}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleThemeLocal}
              className={`p-2 rounded-xl border transition-all text-sm flex items-center justify-center ${
                isLight
                  ? "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                  : "bg-slate-900/90 border-slate-700 text-amber-300 hover:bg-slate-800 hover:border-amber-400/40"
              }`}
              title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {isLight ? "🌙" : "☀️"}
            </button>

            {/* Log In OR Dashboard Button */}
            {currentUser ? (
              <button
                onClick={() => onOpenDashboard()}
                className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 shadow-md shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5"
              >
                <span>Dashboard</span>
                <span>→</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => onOpenAuth("login")}
                  className={`hidden sm:block px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isLight
                      ? "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Log In
                </button>

                <button
                  onClick={() => onOpenDashboard()}
                  className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5"
                >
                  <span>Launch App</span>
                  <span className="text-cyan-200 text-xs">→</span>
                </button>
              </>
            )}

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl border transition-all ${
                isLight
                  ? "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  : "bg-slate-900/90 border-slate-700 text-slate-300 hover:bg-slate-800"
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden border-b px-4 py-4 space-y-3 backdrop-blur-xl animate-in slide-in-from-top-2 duration-200 ${
            isLight
              ? "bg-white/95 border-slate-200 shadow-xl text-slate-800"
              : "bg-[#060B18]/95 border-slate-800 shadow-2xl text-white"
          }`}>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: "Scenarios", href: "#scenarios" },
                { name: "Exchange", href: "#exchange" },
                { name: "Practice Modes", href: "#practice-modes" },
                { name: "Voicerooms", href: "#voicerooms" },
                { name: "Search the World", href: "#search-the-world" },
                { name: "Reviews", href: "#reviews" },
                { name: "Mobile App", href: "#talk-to-the-world" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-center ${
                    isLight
                      ? "hover:bg-blue-50 hover:text-blue-600 bg-slate-100/70"
                      : "hover:bg-blue-950/50 hover:text-blue-400 bg-slate-900/80"
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAuth("login");
                }}
                className={`flex-1 py-2 rounded-xl font-bold text-xs border text-center ${
                  isLight ? "bg-slate-50 border-slate-200 text-slate-700" : "bg-slate-900 border-slate-800 text-slate-300"
                }`}
              >
                Log In
              </button>
              {onOpenAdminCMS && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAdminCMS();
                  }}
                  className={`py-2 px-3 rounded-xl font-bold text-xs border flex items-center justify-center gap-1 ${
                    isLight ? "bg-slate-50 border-slate-200 text-slate-700" : "bg-slate-900 border-slate-800 text-slate-300"
                  }`}
                >
                  <span>⚙️</span>
                  <span>CMS</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* 3. Hero Section (Modeled after YayTalk Image 1 & Image 2 with Dual Radial Aura & Ambient Visual Engine) */}
      <section id="hero" className={`relative pt-12 sm:pt-16 pb-14 sm:pb-20 overflow-hidden scroll-mt-24 ${
        isLight ? "hero-bg-yaytalk-light text-slate-900" : "hero-bg-yaytalk-dark text-white"
      }`}>
        {/* Ambient Dark Mode Animation System: Cosmic Glowing Orbs & Cyber Grid */}
        {!isLight && (
          <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
            {/* Glowing Orb 1: Cyan-Blue pulsing */}
            <div className="dark-glow-orb-1 absolute -top-20 left-1/4 w-[680px] h-[680px] rounded-full bg-gradient-to-tr from-cyan-500/25 via-blue-600/20 to-indigo-600/15 blur-[150px]" />
            {/* Glowing Orb 2: Purple-Pink pulsing */}
            <div className="dark-glow-orb-2 absolute top-32 right-1/4 w-[620px] h-[620px] rounded-full bg-gradient-to-bl from-purple-600/25 via-pink-600/15 to-blue-600/15 blur-[160px]" />
            {/* Center soft backplate glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[480px] bg-indigo-500/15 rounded-full blur-[170px]" />
            {/* Subtle cyber grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf812_1px,transparent_1px),linear-gradient(to_bottom,#38bdf812_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />
          </div>
        )}

        {/* Ambient Light Mode Animation System: Ethereal Floating Mesh Orbs & Tech Matrix */}
        {isLight && (
          <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
            {/* Floating Soft Sky-Cyan Orb 1 */}
            <div className="light-glow-orb-1 absolute -top-24 left-1/4 w-[680px] h-[680px] rounded-full bg-gradient-to-tr from-sky-300/35 via-blue-400/25 to-indigo-300/20 blur-[130px]" />
            {/* Floating Soft Rose-Lavender Orb 2 */}
            <div className="light-glow-orb-2 absolute top-24 right-1/4 w-[620px] h-[620px] rounded-full bg-gradient-to-bl from-purple-300/25 via-pink-300/20 to-sky-200/20 blur-[140px]" />
            {/* Center Warm Ambient Glow behind characters */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-gradient-to-t from-cyan-200/30 via-blue-100/25 to-transparent rounded-full blur-[110px]" />
            {/* High-tech subtle dot matrix overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#0284c718_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,#000_65%,transparent_100%)] opacity-80" />
          </div>
        )}

        {/* Ambient Sound Wave Horizon Curves in Background */}
        <div className="absolute inset-x-0 bottom-0 top-1/4 pointer-events-none -z-10 overflow-hidden opacity-35 dark:opacity-25">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 600" fill="none">
            <path
              d="M0,320 C320,220 420,420 720,320 C1020,220 1120,420 1440,320 L1440,600 L0,600 Z"
              fill="url(#soundwave-gradient)"
            />
            <defs>
              <linearGradient id="soundwave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={isLight ? "#38bdf8" : "#06b6d4"} stopOpacity="0.25" />
                <stop offset="50%" stopColor={isLight ? "#818cf8" : "#6366f1"} stopOpacity="0.2" />
                <stop offset="100%" stopColor={isLight ? "#c084fc" : "#a855f7"} stopOpacity="0.15" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Subtle Moving Color Highlight Sweep Ribbon (Lawata Podiyata Highlight Eka) */}
        <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[960px] h-[340px] rounded-full pointer-events-none -z-10 animate-highlight-sweep blur-[110px] sm:blur-[140px] opacity-45 dark:opacity-25 ${
          isLight
            ? "bg-gradient-to-r from-sky-300 via-indigo-300 to-rose-300"
            : "bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600"
        }`} />

        {/* Subtle Horizontal Gleam Streamer */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1.5px] pointer-events-none -z-10 overflow-hidden">
          <div className={`w-1/2 h-full animate-light-gleam ${
            isLight
              ? "bg-gradient-to-r from-transparent via-blue-500/35 to-transparent"
              : "bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
          }`} />
        </div>

        {/* Ambient Floating World Language Chips across Canvas (High Contrast & Pure International) */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Chip 1: German (Top-Left) */}
          <div className={`hidden sm:flex absolute left-4 sm:left-10 lg:left-14 top-20 items-center gap-2 px-3.5 py-1.5 rounded-full border-2 shadow-sm backdrop-blur-md opacity-90 animate-float-drift ${
            isLight ? "bg-white/95 border-slate-200 text-slate-900" : "bg-[#091228]/95 border-slate-700 text-slate-100"
          }`}>
            <div className="w-5 h-3.5 relative overflow-hidden rounded-[2px] shadow-xs border border-black/10 shrink-0">
              <Image src="/images/flags/de.png" alt="German" fill className="object-cover" />
            </div>
            <span className="text-[11px] font-black">Deutsch</span>
            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">&ldquo;Guten Tag&rdquo;</span>
          </div>

          {/* Chip 2: Japanese (Mid-Left) */}
          <div className={`hidden md:flex absolute left-6 sm:left-12 lg:left-16 top-72 items-center gap-2 px-3.5 py-1.5 rounded-full border-2 shadow-sm backdrop-blur-md opacity-85 animate-float-drift-slow ${
            isLight ? "bg-white/95 border-slate-200 text-slate-900" : "bg-[#091228]/95 border-slate-700 text-slate-100"
          }`}>
            <div className="w-5 h-3.5 relative overflow-hidden rounded-[2px] shadow-xs border border-black/10 shrink-0">
              <Image src="/images/flags/jp.png" alt="Japanese" fill className="object-cover" />
            </div>
            <span className="text-[11px] font-black">日本語</span>
            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">&ldquo;こんにちは&rdquo;</span>
          </div>

          {/* Chip 3: Spanish (Top-Right) */}
          <div className={`hidden sm:flex absolute right-4 sm:right-10 lg:right-14 top-20 items-center gap-2 px-3.5 py-1.5 rounded-full border-2 shadow-sm backdrop-blur-md opacity-90 animate-float-drift-slow ${
            isLight ? "bg-white/95 border-slate-200 text-slate-900" : "bg-[#091228]/95 border-slate-700 text-slate-100"
          }`}>
            <div className="w-5 h-3.5 relative overflow-hidden rounded-[2px] shadow-xs border border-black/10 shrink-0">
              <Image src="/images/flags/es.png" alt="Spanish" fill className="object-cover" />
            </div>
            <span className="text-[11px] font-black">Español</span>
            <span className="text-[10px] text-rose-600 dark:text-rose-400 font-bold">&ldquo;¡Hola!&rdquo;</span>
          </div>

          {/* Chip 4: French (Mid-Right) */}
          <div className={`hidden md:flex absolute right-6 sm:right-12 lg:right-16 top-72 items-center gap-2 px-3.5 py-1.5 rounded-full border-2 shadow-sm backdrop-blur-md opacity-85 animate-float-drift ${
            isLight ? "bg-white/95 border-slate-200 text-slate-900" : "bg-[#091228]/95 border-slate-700 text-slate-100"
          }`}>
            <div className="w-5 h-3.5 relative overflow-hidden rounded-[2px] shadow-xs border border-black/10 shrink-0">
              <Image src="/images/flags/fr.png" alt="French" fill className="object-cover" />
            </div>
            <span className="text-[11px] font-black">Français</span>
            <span className="text-[10px] text-purple-600 dark:text-purple-400 font-bold">&ldquo;Bonjour&rdquo;</span>
          </div>
        </div>

        {/* Left Side Floating Conversational Dialogue Card (Spanish Coffee Scenario - High Contrast & Vivid) */}
        <div className="hidden xl:block absolute left-2 xl:left-4 2xl:left-8 top-32 z-20 w-68 2xl:w-76 pointer-events-none animate-float-left">
          <div className={`p-4 rounded-3xl border-2 shadow-2xl backdrop-blur-xl space-y-3 ${
            isLight
              ? "bg-white border-slate-200 shadow-[0_20px_50px_rgba(15,23,42,0.12)] text-slate-900"
              : "bg-[#091228]/95 border-cyan-500/40 shadow-[0_20px_60px_rgba(0,0,0,0.7)] text-slate-100"
          }`}>
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-6 h-4 relative overflow-hidden rounded-[3px] shadow-sm border border-black/10 shrink-0">
                  <Image src="/images/flags/es.png" alt="Spain" fill className="object-cover" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900 dark:text-white">Coach Sofia</p>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live Spanish Call
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border border-cyan-400/30 font-black">
                02:45
              </span>
            </div>

            {/* Speech dialogue bubbles */}
            <div className="space-y-2 text-left">
              <div className={`p-3 rounded-2xl text-xs font-semibold leading-relaxed border ${
                isLight ? "bg-slate-100 border-slate-200 text-slate-900" : "bg-slate-800/90 border-slate-700 text-slate-100"
              }`}>
                &ldquo;¡Hola! ¿Un café con leche para empezar el día?&rdquo; ☕
              </div>
              <div className="p-3 rounded-2xl text-xs font-bold leading-relaxed bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25">
                &ldquo;¡Sí, por favor! Y un croissant caliente.&rdquo; 🥐✨
              </div>
            </div>

            {/* Waveform footer */}
            <div className="flex items-center justify-between text-[10.5px] pt-1">
              <span className="text-slate-600 dark:text-slate-400 font-medium">⚡ Rate: 0.95x</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-black">99.2% Fluency</span>
            </div>
          </div>
        </div>

        {/* Left Side Lower Floating Metric Pill */}
        <div className="hidden lg:block absolute left-8 2xl:left-20 bottom-24 z-20 pointer-events-none animate-float-subtle">
          <div className={`px-4 py-2.5 rounded-2xl border-2 text-xs font-black shadow-lg backdrop-blur-md flex items-center gap-2.5 ${
            isLight
              ? "bg-white border-slate-200 text-slate-900 shadow-slate-300/50"
              : "bg-slate-900/90 border-indigo-500/30 text-cyan-300 shadow-indigo-950/40"
          }`}>
            <span className="text-base">⚡</span>
            <span>Edge VAD Active • Sub-20ms Engine</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
        </div>

        {/* Right Side Floating Grammar Repair Card (Ultra High-Contrast) */}
        <div className="hidden xl:block absolute right-2 xl:right-4 2xl:right-8 top-32 z-20 w-76 2xl:w-84 pointer-events-none animate-float-right">
          <div className={`p-4 rounded-3xl border-2 shadow-2xl backdrop-blur-xl space-y-3 ${
            isLight
              ? "bg-white border-slate-200 shadow-[0_20px_50px_rgba(15,23,42,0.12)] text-slate-900"
              : "bg-[#091228]/90 border-indigo-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.6)] text-slate-100"
          }`}>
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-6 h-4 relative overflow-hidden rounded-[3px] shadow-sm border border-black/10 shrink-0">
                  <Image src="/images/flags/gb.png" alt="English" fill className="object-cover" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900 dark:text-white">AI Redline Studio</p>
                  <p className="text-[10px] text-purple-700 dark:text-purple-400 font-bold">Real-Time Grammar Repair</p>
                </div>
              </div>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-400/30">
                98.4% CEFR B2
              </span>
            </div>

            {/* Mistake vs Target */}
            <div className="space-y-2 text-left">
              <div className="p-3 rounded-2xl text-xs bg-rose-50 dark:bg-rose-950/60 border-2 border-rose-300 dark:border-rose-800/80 text-rose-800 dark:text-rose-200 font-bold shadow-xs">
                ✕ &ldquo;I didn&apos;t went there yesterday&rdquo;
              </div>
              <div className="p-3 rounded-2xl text-xs bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-300 dark:border-emerald-700/80 text-emerald-900 dark:text-emerald-100 font-black shadow-xs flex items-center justify-between">
                <span>✓ &ldquo;I didn&apos;t go there yesterday&rdquo;</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900 dark:bg-emerald-800 dark:text-emerald-100 font-black">
                  Auto-Fix ✓
                </span>
              </div>
            </div>

            {/* Rule hint */}
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 text-[11px] text-amber-900 dark:text-amber-200 font-semibold leading-tight text-left">
              💡 Base verb &lsquo;go&rsquo; always follows auxiliary &lsquo;didn&apos;t&rsquo;.
            </div>
          </div>
        </div>

        {/* Right Side Lower Floating Metric Pill */}
        <div className="hidden lg:block absolute right-8 2xl:right-20 bottom-24 z-20 pointer-events-none animate-float-subtle">
          <div className={`px-4 py-2.5 rounded-2xl border text-xs font-bold shadow-lg backdrop-blur-md flex items-center gap-2.5 ${
            isLight
              ? "bg-white/95 border-slate-200/90 text-slate-800 shadow-slate-200/50"
              : "bg-slate-900/90 border-indigo-500/30 text-amber-300 shadow-indigo-950/40"
          }`}>
            <span className="text-base">🎯</span>
            <span>256 Real Voice Scenarios</span>
            <span className="text-amber-500">★★★★★</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8 relative z-10">
          {/* Social Proof Pill with Live Status */}
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-bold shadow-sm transition-all hover:scale-105 ${
            isLight
              ? "border-blue-300/80 bg-white/95 text-blue-800 shadow-blue-500/10 backdrop-blur-md"
              : "border-indigo-400/25 bg-indigo-500/10 text-cyan-400 backdrop-blur-md"
          }`}>
            <span className="flex text-amber-500 text-xs">★★★★★</span>
            <span className={`${isLight ? "text-slate-700 font-semibold" : "text-slate-300"} font-medium`}>4.8/5 Rating</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className={`font-bold ${isLight ? "text-slate-900" : "text-white"}`}>
              {config?.heroBadge || "Next-Gen AI Voice Tutor • #BuildHybridAI 2026"}
            </span>
          </div>

          {/* Master Headline with Sleek 3D Studio Mic Token & Guaranteed High-Contrast Typography */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.2] sm:leading-[1.24] overflow-visible pb-1 ${
              isLight ? "text-[#0F172A]" : "text-white"
            }`}>
              {(!config?.heroHeadline || config.heroHeadline.includes("20 Languages") || config.heroHeadline.includes("confidently")) ? (
                <>
                  <span className="inline-block whitespace-nowrap">
                    Learn to speak{" "}
                    {/* Sleek 3D Studio Microphone Token */}
                    <span className="inline-flex items-center justify-center align-middle mx-1.5 sm:mx-2.5 relative group cursor-pointer" title="SpeakFlow Real-Time Voice Studio">
                      {/* Concentric sound wave ripples */}
                      <span className="absolute -inset-1 sm:-inset-1.5 rounded-full bg-cyan-400/35 animate-sound-ripple pointer-events-none" />
                      <span className="absolute -inset-2.5 sm:-inset-3.5 rounded-full bg-blue-500/20 animate-sound-ripple-delayed pointer-events-none" />

                      <span className={`relative w-11 h-11 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-lg border transition-all duration-300 group-hover:scale-110 ${
                        isLight
                          ? "bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 border-white text-white shadow-cyan-500/30"
                          : "bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 border-cyan-400/40 text-white shadow-cyan-500/40"
                      }`}>
                        <span className="text-xl sm:text-3xl drop-shadow-md">🎙️</span>
                        {/* Live beacon indicator */}
                        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900"></span>
                        </span>
                      </span>
                    </span>
                  </span>
                  <br className="hidden md:inline" />
                  {" "}
                  {/* Guaranteed High-Contrast 20+ Languages Text with full descender clearance */}
                  <span className={`font-black tracking-tight inline-block pb-3 pt-1 px-1 overflow-visible ${
                    isLight
                      ? "hero-gradient-text-light text-blue-700"
                      : "hero-gradient-text-dark text-cyan-400"
                  }`}>
                    20+ Languages
                  </span>{" "}
                  <span className="inline-block">confidently with AI Tutors.</span>
                </>
              ) : (
                config?.heroHeadline
              )}
            </h1>
            <p
              className={`text-base sm:text-xl font-medium leading-relaxed max-w-2xl mx-auto ${
                isLight ? "text-slate-700" : "text-slate-300/90"
              }`}
            >
              {config?.heroSubtitle ||
                "The fastest way to speak any language with confidence: real conversations with AI, instant feedback, and a safe space to practice."}
            </p>
          </div>

          {/* Interactive Live Audio Visualizer Bar */}
          <div className="flex items-center justify-center pt-1">
            <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-2xl border text-xs font-bold shadow-md transition-all ${
              isLight
                ? "bg-white/95 border-slate-200/90 text-slate-800 shadow-slate-200/50"
                : "bg-slate-900/90 border-indigo-500/30 text-slate-200 shadow-indigo-950/40"
            }`}>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className={`text-[11px] font-black uppercase tracking-wider ${
                  isLight ? "text-emerald-700" : "text-emerald-400"
                }`}>
                  Live Voice Studio
                </span>
              </div>
              <span className="w-1 h-3.5 bg-slate-300 dark:bg-slate-700 rounded-full" />
              {/* Dancing live equalizer wave bars */}
              <div className="flex items-end gap-1 h-4">
                <span className="w-1 bg-gradient-to-t from-cyan-500 to-blue-500 rounded-full animate-eq-1" />
                <span className="w-1 bg-gradient-to-t from-blue-500 to-indigo-500 rounded-full animate-eq-2" />
                <span className="w-1 bg-gradient-to-t from-indigo-500 to-purple-500 rounded-full animate-eq-3" />
                <span className="w-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full animate-eq-4" />
                <span className="w-1 bg-gradient-to-t from-cyan-500 to-emerald-500 rounded-full animate-eq-2" />
              </div>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                &lt; 20ms Latency
              </span>
            </div>
          </div>

          {/* App Store & Google Play Badges + Quick Practice Action (Side by side like Image 1) */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
            <a
              href={config?.apkDownloadUrl || "https://github.com/janithad2/speakflow-ai/releases/download/v1.0.0/speakflow-ai.apk"}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-105 active:scale-95 transition-transform"
            >
              <Image
                src="/images/landing/app_store.webp"
                alt="Download on the App Store / Android APK"
                width={160}
                height={48}
                className="h-12 w-auto rounded-xl shadow-md"
              />
            </a>

            <a
              href={config?.playStoreUrl || "https://play.google.com/store/apps/details?id=com.innoxpert.speakflow"}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-105 active:scale-95 transition-transform"
            >
              <Image
                src="/images/landing/google_play.webp"
                alt="Get it on Google Play"
                width={160}
                height={48}
                className="h-12 w-auto rounded-xl shadow-md"
              />
            </a>

            <button
              onClick={() => onOpenDashboard()}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-black text-xs shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <span>Try Live Studio</span>
              <span>→</span>
            </button>
          </div>

          {/* Center Cutout Hero Character Banner Image (User's Image 2) */}
          <div className="relative max-w-4xl mx-auto mt-6 sm:mt-10 px-2 sm:px-4">
            <Image
              src={config?.heroBannerUrl || "/images/landing/hero_tutors_banner.png"}
              alt="SpeakFlow AI Tutors and Learners"
              width={1024}
              height={475}
              className="w-full h-auto object-contain hero-banner-pulse drop-shadow-[0_25px_45px_rgba(0,0,0,0.3)]"
              priority
            />
            {!isLight && (
              <div className="absolute inset-x-8 bottom-0 h-36 bg-blue-600/25 blur-3xl -z-10 rounded-full" />
            )}
            {isLight && (
              <div className="absolute inset-x-8 bottom-0 h-28 bg-blue-400/15 blur-2xl -z-10 rounded-full" />
            )}
          </div>
        </div>
      </section>



      {/* 4. Panoramic Scenarios Section (FULL SCREEN FIT - 4K Cave Style Panorama with Dual Radial Aura) */}
      <section id="scenarios" className={`py-12 sm:py-18 relative overflow-hidden text-center scroll-mt-20 ${
        isLight ? "hero-bg-yaytalk-light text-slate-900" : "hero-bg-yaytalk-dark text-white"
      }`}>
        <ScrollReveal className="w-full px-2 sm:px-4 lg:px-8 space-y-4 sm:space-y-6" distance={32}>
          <div className="space-y-3 max-w-4xl mx-auto text-center px-4">
            <div className={`text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-1.5 ${
              isLight ? "text-indigo-600" : "text-cyan-400"
            }`}>
              <span>{config?.scenariosHeadingTag || "Everything you need to speak English 🔮 fluently"}</span>
            </div>

            <h2 className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight ${
              isLight ? "text-[#0F172A]" : "text-white"
            }`}>
              {config?.scenariosTitle || "Practice the conversations you'll actually have"}
            </h2>

            <p className={`text-sm sm:text-base leading-relaxed max-w-xl mx-auto ${
              isLight ? "text-slate-600" : "text-slate-400"
            }`}>
              {config?.scenariosSubtitle || "Practice English in scenarios that matter — job interviews, travel, daily life, dining, and more."}
            </p>
          </div>

          {/* Full-Width 4K Panoramic "Cave Style" Curved Strip */}
          <div className="relative w-full max-w-[1920px] mx-auto mt-4 sm:mt-6 px-0 sm:px-2 md:px-4">
            {!isLight && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[350px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
            )}

            <Image
              src={config?.scenariosStripImageUrl || "/images/landing/scenario_section_hd.webp"}
              alt="Real-world conversations in multiple scenarios"
              width={3840}
              height={1389}
              className="w-full h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.18)] transition-transform duration-500 hover:scale-[1.005]"
              priority
            />
          </div>

          {/* Interactive Roleplay Console Dock (Dynamic Island Style - Perfectly Fitted, No Scrollbars!) */}
          <div className="relative z-20 -mt-8 sm:-mt-14 md:-mt-20 lg:-mt-24 max-w-5xl mx-auto px-3 sm:px-6">
            {/* Row 1: Floating Capsule Selector Tabs - 6-column Grid (Zero Scrollbar) */}
            <div className={`p-1.5 sm:p-2 rounded-2xl sm:rounded-full border shadow-xl backdrop-blur-2xl grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-2 transition-all ${
              isLight
                ? "bg-white/95 border-slate-200/90 shadow-[0_15px_35px_rgba(0,0,0,0.08)]"
                : "bg-slate-900/95 border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
            }`}>
              {[
                { id: "dining", icon: "🍽️", label: "Dining & Cafe", activeBg: "bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-pink-500/30" },
                { id: "travel", icon: "✈️", label: "Travel & Flight", activeBg: "bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-blue-500/30" },
                { id: "shopping", icon: "🛍️", label: "Shopping Deals", activeBg: "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-emerald-500/30" },
                { id: "clinic", icon: "🩺", label: "Clinic & Health", activeBg: "bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-cyan-500/30" },
                { id: "career", icon: "💼", label: "Tech & Career", activeBg: "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-500/30" },
                { id: "sports", icon: "🚴", label: "Sports & Fitness", activeBg: "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-amber-500/30" },
              ].map((role, idx) => {
                const isSelected = activeScenarioIdx === idx;
                return (
                  <button
                    key={role.id}
                    onClick={() => setActiveScenarioIdx(idx)}
                    className={`flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl sm:rounded-full text-xs font-bold transition-all w-full cursor-pointer text-center ${
                      isSelected
                        ? `${role.activeBg} shadow-md scale-[1.02]`
                        : isLight
                          ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="text-sm sm:text-base shrink-0">{role.icon}</span>
                    <span className="truncate">{role.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Row 2: Active Scenario Live Audio Stage Card */}
            {[
              {
                icon: "🍽️",
                title: "Dining & Cafe",
                role: "Restaurant & Table Service",
                character: "Chef & Waiter Marco",
                level: "A2 Elementary",
                topicId: "sp_si_249",
                badgeBg: "bg-pink-100 text-pink-700 dark:bg-pink-950/80 dark:text-pink-300 border-pink-200 dark:border-pink-800",
                gradient: "from-pink-500/15 via-rose-500/10 to-transparent",
                sampleLine: "Welcome to Bistro Parisien! A table for two by the window tonight?",
                objective: "Practice ordering gourmet dishes, asking for the bill, and polite requests.",
              },
              {
                icon: "✈️",
                title: "Travel & Flight",
                role: "Airport, Hotel & Transit",
                character: "Agent Sarah & Guide",
                level: "B1 Intermediate",
                topicId: "sp_en_1",
                badgeBg: "bg-blue-100 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 border-blue-200 dark:border-blue-800",
                gradient: "from-blue-500/15 via-sky-500/10 to-transparent",
                sampleLine: "Good afternoon! May I see your passport and boarding pass for Gate 24B?",
                objective: "Navigate international terminals, baggage claims, and hotel bookings.",
              },
              {
                icon: "🛍️",
                title: "Shopping Deals",
                role: "Fashion Boutique & Mall",
                character: "Store Stylist Emma",
                level: "A1 Beginner",
                topicId: "sp_si_249",
                badgeBg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
                gradient: "from-emerald-500/15 via-green-500/10 to-transparent",
                sampleLine: "Hello! We have a 30% off special on cashmere jackets today. What size do you wear?",
                objective: "Inquire about prices, fitting room assistance, and return policies.",
              },
              {
                icon: "🩺",
                title: "Clinic & Health",
                role: "Medical Consultation",
                character: "Dr. InJoon & Pharmacy",
                level: "B2 Upper-Intermediate",
                topicId: "sp_en_1",
                badgeBg: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/80 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800",
                gradient: "from-cyan-500/15 via-teal-500/10 to-transparent",
                sampleLine: "I see your symptoms started two days ago. Are you experiencing any dizziness or fever?",
                objective: "Accurately explain aches, understand dosage instructions, and describe allergies.",
              },
              {
                icon: "💼",
                title: "Tech & Career",
                role: "Job Interview & Pitch",
                character: "Executive Recruiter Alex",
                level: "C1 Advanced",
                topicId: "sp_en_1",
                badgeBg: "bg-purple-100 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300 border-purple-200 dark:border-purple-800",
                gradient: "from-purple-500/15 via-indigo-500/10 to-transparent",
                sampleLine: "Tell me about a complex distributed system you scaled under strict latency constraints.",
                objective: "Present architectural decisions, handle behavioral questions, and negotiate offers.",
              },
              {
                icon: "🚴",
                title: "Sports & Fitness",
                role: "Athletics & Marathon",
                character: "Coach Oliver & Trainer",
                level: "B1 Intermediate",
                topicId: "sp_1",
                badgeBg: "bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200 dark:border-amber-800",
                gradient: "from-amber-500/15 via-orange-500/10 to-transparent",
                sampleLine: "Let's review your split times. What pace do you plan to sustain for the first 10 kilometers?",
                objective: "Discuss workout splits, recovery regimens, nutrition, and race strategy.",
              },
            ].filter((_, idx) => idx === activeScenarioIdx).map((active) => (
              <div
                key={active.title}
                className={`mt-4 sm:mt-5 p-5 sm:p-7 rounded-3xl border shadow-2xl backdrop-blur-2xl transition-all duration-300 relative overflow-hidden text-left ${
                  isLight
                    ? "bg-white/95 border-slate-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
                    : "bg-slate-900/95 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                }`}
              >
                {/* Ambient Active Aura Glow */}
                <div className={`absolute inset-0 bg-gradient-to-r ${active.gradient} pointer-events-none -z-10`} />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                  {/* Left: Persona Details & Sample Dialogue */}
                  <div className="space-y-3 max-w-xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Live AI Roleplay
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${active.badgeBg}`}>
                        {active.level}
                      </span>
                      <span className={`text-xs font-semibold ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                        • {active.character}
                      </span>
                    </div>

                    <div>
                      <h3 className={`text-lg sm:text-xl font-black tracking-tight ${isLight ? "text-[#0F172A]" : "text-white"}`}>
                        {active.icon} {active.title} <span className="text-sm font-medium text-slate-500">({active.role})</span>
                      </h3>
                      <p className={`text-xs mt-0.5 ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                        {active.objective}
                      </p>
                    </div>

                    {/* Real Sample Line with Audio Visualizer */}
                    <div className={`p-3.5 sm:p-4 rounded-2xl border text-xs sm:text-sm font-medium leading-relaxed relative ${
                      isLight
                        ? "bg-slate-50/90 border-slate-200/90 text-slate-800"
                        : "bg-slate-800/70 border-white/10 text-slate-200"
                    }`}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-base">🎙️</span>
                        <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-cyan-400">
                          Sample Dialogue Prompt • 20ms AI Voice
                        </span>
                        {/* Animated mini sound bars */}
                        <div className="flex items-center gap-0.5 ml-auto">
                          <span className="w-1 h-3 bg-blue-500 rounded-full animate-pulse" />
                          <span className="w-1 h-5 bg-indigo-500 rounded-full animate-pulse delay-75" />
                          <span className="w-1 h-2 bg-cyan-400 rounded-full animate-pulse delay-150" />
                          <span className="w-1 h-4 bg-purple-500 rounded-full animate-pulse delay-100" />
                        </div>
                      </div>
                      &ldquo;{active.sampleLine}&rdquo;
                    </div>
                  </div>

                  {/* Right: Action Launch Button */}
                  <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
                    <button
                      onClick={() => onStartCall(active.topicId)}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                      <span>Practice This Scenario</span>
                      <span>🎙️ →</span>
                    </button>
                    <p className={`text-[11px] text-center font-medium ${isLight ? "text-slate-400" : "text-slate-500"}`}>
                      ⚡ 20ms duplex voice • Zero stage fright
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 5. The Global AI Language & Cultural Exchange Section (Text Left, Image Right) */}
      <section id="exchange" className={`scroll-mt-20 py-16 sm:py-24 relative overflow-hidden ${
        isLight ? "hero-bg-yaytalk-light text-slate-900" : "hero-bg-yaytalk-dark text-white"
      }`}>


        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14" distance={32}>
          {/* Top Banner Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className={`text-3xl sm:text-5xl font-black tracking-tight leading-tight ${
              isLight ? "text-[#0F172A]" : "text-white"
            }`}>
              The <span className={isLight ? "text-blue-600 font-extrabold" : "text-cyan-400 font-extrabold"}>Global</span> Language and Cultural Exchange
            </h2>
            <p className={`text-sm sm:text-base font-medium ${isLight ? "text-slate-600" : "text-slate-300"}`}>
              Learn a language, explore new cultures, and master authentic fluency through 24/7 AI conversation.
            </p>
          </div>

          {/* 2-Column Split: Content Left / Image Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase border ${
                isLight
                  ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                  : "bg-indigo-950/60 border-indigo-800 text-cyan-400"
              }`}>
                <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-cyan-400 animate-pulse" />
                Language Exchange
              </div>

              <h3 className={`text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight ${
                isLight ? "text-[#0F172A]" : "text-white"
              }`}>
                Learn Through <span className={isLight ? "text-blue-600 font-extrabold" : "text-blue-400 font-extrabold"}>Language Exchange</span>
              </h3>

              <p className={`text-sm sm:text-base leading-relaxed font-medium ${
                isLight ? "text-slate-600" : "text-slate-300"
              }`}>
                Connect with native-level AI speaker personas and practice authentic conversations. Use built-in smart tools for real-time speech-to-text, acoustic pronunciation analysis, transliteration, and CEFR grammar corrections.
              </p>

              {/* In-chat Tools Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { icon: "🎙️", title: "Voice to Text", desc: "Ultra-low 20ms transcription with accent support" },
                  { icon: "文A", title: "Smart Translation", desc: "Instant contextual translation into your native tongue" },
                  { icon: "✓", title: "Grammar Correction", desc: "Redline repairs with clear mistake explanations" },
                  { icon: "🔤", title: "Transliteration", desc: "Phonetic reading guides (Pinyin, Romaji, Romanized)" },
                ].map((tool, i) => (
                  <div
                    key={i}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isLight
                        ? "bg-slate-50 border-slate-200 hover:bg-white hover:shadow-md hover:border-indigo-300"
                        : "bg-slate-900/60 border-indigo-500/20 hover:bg-slate-900 hover:border-cyan-400/40"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{tool.icon}</span>
                      <span className={`text-sm font-bold ${isLight ? "text-slate-900" : "text-white"}`}>{tool.title}</span>
                    </div>
                    <p className={`text-xs ${isLight ? "text-slate-600" : "text-slate-400"}`}>{tool.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onStartCall()}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>Try Language Exchange</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* Right Column: Image (Floating freely with 3D drop shadow - NO OUTER BOX!) */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-[500px]">
                {/* Ambient Glow */}
                <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-3xl -z-10" />
                <Image
                  src="/images/landing/hellotalk/feature_1_exchange.png"
                  alt="SpeakFlow AI Language Exchange with built-in voice-to-text, translation, and grammar corrections"
                  width={1218}
                  height={1500}
                  className="w-full h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.16)] dark:drop-shadow-[0_25px_60px_rgba(56,189,248,0.15)] transition-transform duration-500 hover:scale-[1.02]"
                  priority
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 6. Practice in the Way That Works for You (Image Left, Text Right with Dual Radial Aura) */}
      <section id="practice-modes" className={`scroll-mt-20 py-16 sm:py-24 relative overflow-hidden ${
        isLight ? "hero-bg-yaytalk-light text-slate-900" : "hero-bg-yaytalk-dark text-white"
      }`}>
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" distance={32}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Image (Phone Mockup with Floating Modes - Floating 3D) */}
            <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
              <div className="relative w-full max-w-[460px]">
                <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-3xl -z-10" />
                <Image
                  src="/images/landing/hellotalk/feature_2_modes.png"
                  alt="Multi-Modal Practice: Text, Voice, Video and Livestreams"
                  width={1665}
                  height={1808}
                  className="w-full h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.16)] transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border ${
                isLight
                  ? "bg-blue-50 border-blue-200 text-blue-700"
                  : "bg-blue-950/40 border-blue-800/40 text-blue-300"
              }`}>
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                Text, Voice, Video, & More
              </div>

              <h2 className={`text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight ${
                isLight ? "text-[#0F172A]" : "text-white"
              }`}>
                Practice in the Way That <span className={isLight ? "text-blue-600 font-extrabold" : "text-blue-400 font-extrabold"}>Works for You</span>
              </h2>

              <p className={`text-sm sm:text-base leading-relaxed font-medium ${
                isLight ? "text-slate-600" : "text-slate-300"
              }`}>
                Chat with language partners and AI tutors through text, voice, or video. Join Voicerooms and interactive audio lounges to practice speaking and listening with people and AI personas around the world.
              </p>

              {/* Mode Highlights */}
              <div className="space-y-3 pt-2">
                {[
                  {
                    icon: "💬",
                    badge: "Interactive Text & Audio Drills",
                    desc: "Type or speak naturally. Get phonetic spellings, word definitions, and instant grammar polish in real time."
                  },
                  {
                    icon: "📞",
                    badge: "20ms Low-Latency Voice Calls",
                    desc: "No lag, no robotic pauses. Experience realistic, natural conversational back-and-forth like a real phone call."
                  },
                  {
                    icon: "📹",
                    badge: "Visual Roleplay & Scenarios",
                    desc: "Simulate job interviews, airport customs, cafe ordering, and university presentations with contextual visual feedback."
                  }
                ].map((mode, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-2xl border transition-all ${
                      isLight
                        ? "bg-white/90 border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300"
                        : "bg-slate-900/60 border-indigo-500/20 hover:border-cyan-400/40"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-100 dark:border-indigo-900 shrink-0">
                        {mode.icon}
                      </span>
                      <div>
                        <h4 className={`text-sm font-bold ${isLight ? "text-slate-900" : "text-white"}`}>{mode.badge}</h4>
                        <p className={`text-xs mt-1 leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>{mode.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onStartCall()}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-sm shadow-lg shadow-purple-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>Start Multi-Modal Practice</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 7. Learn and Share with the Community (Text Left, Image Right) */}
      <section id="moments" className={`scroll-mt-20 py-16 sm:py-24 relative overflow-hidden ${
        isLight ? "hero-bg-yaytalk-light text-slate-900" : "hero-bg-yaytalk-dark text-white"
      }`}>


        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" distance={32}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border ${
                isLight
                  ? "bg-blue-50 border-blue-200 text-blue-700"
                  : "bg-blue-950/40 border-blue-800/40 text-blue-300"
              }`}>
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                Moments
              </div>

              <h2 className={`text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight ${
                isLight ? "text-[#0F172A]" : "text-white"
              }`}>
                Learn and Share with the <span className={isLight ? "text-blue-600 font-extrabold" : "text-blue-400 font-extrabold"}>Community</span>
              </h2>

              <p className={`text-sm sm:text-base leading-relaxed font-medium ${
                isLight ? "text-slate-600" : "text-slate-300"
              }`}>
                Share posts, ask pronunciation questions, and get instant responses from native speakers and fellow learners. Learn about language, culture, and everyday life through the SpeakFlow global community.
              </p>

              {/* Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  {
                    icon: "🌍",
                    title: "Cultural Exchange",
                    desc: "Discover local slang, food recommendations, and traditions directly from native residents."
                  },
                  {
                    icon: "🎙️",
                    title: "Audio Clip Critiques",
                    desc: "Post 10-second pronunciation clips and receive native accent and intonation tips."
                  },
                  {
                    icon: "🤝",
                    title: "Global Study Buddies",
                    desc: "Find partner learners at your exact CEFR level to practice daily conversation streaks."
                  },
                  {
                    icon: "🔥",
                    title: "Daily Motivation",
                    desc: "Earn community badges, celebrate streak milestones, and keep your practice consistent."
                  }
                ].map((card, i) => (
                  <div
                    key={i}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isLight
                        ? "bg-slate-50 border-slate-200 hover:bg-white hover:shadow-md hover:border-emerald-300"
                        : "bg-slate-900/60 border-indigo-500/20 hover:bg-slate-900 hover:border-emerald-400/40"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{card.icon}</span>
                      <span className={`text-sm font-bold ${isLight ? "text-slate-900" : "text-white"}`}>{card.title}</span>
                    </div>
                    <p className={`text-xs ${isLight ? "text-slate-600" : "text-slate-400"}`}>{card.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onStartCall()}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>Explore Community Moments</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* Right Column: Image (Floating freely with 3D drop shadow - NO OUTER BOX!) */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-[460px]">
                <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-3xl -z-10" />
                <Image
                  src="/images/landing/hellotalk/feature_3_moments.webp"
                  alt="SpeakFlow Moments: Learn and share with the community through posts and audio clips"
                  width={1020}
                  height={1500}
                  className="w-full h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.16)] dark:drop-shadow-[0_25px_60px_rgba(16,185,129,0.15)] transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 8. Practice Speaking in Live AI Voicerooms (Image Left, Text Right with Dual Radial Aura) */}
      <section id="voicerooms" className={`scroll-mt-20 py-16 sm:py-24 relative overflow-hidden ${
        isLight ? "hero-bg-yaytalk-light text-slate-900" : "hero-bg-yaytalk-dark text-white"
      }`}>
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" distance={32}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Image (Voicerooms Stage - Floating 3D Phone) */}
            <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
              <div className="relative w-full max-w-[440px]">
                <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-3xl -z-10" />
                <Image
                  src="/images/landing/hellotalk/feature_4_voicerooms.png"
                  alt="Practice Speaking in Voicerooms: Live audio stages and group conversation lounges"
                  width={1659}
                  height={2848}
                  className="w-full h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.18)] transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border ${
                isLight
                  ? "bg-blue-50 border-blue-200 text-blue-700"
                  : "bg-blue-950/40 border-blue-800/40 text-blue-300"
              }`}>
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                Voicerooms & Audio Lounges
              </div>

              <h2 className={`text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight ${
                isLight ? "text-[#0F172A]" : "text-white"
              }`}>
                Practice Speaking in <span className={isLight ? "text-blue-600 font-extrabold" : "text-cyan-400 font-extrabold"}>Voicerooms</span>
              </h2>

              <p className={`text-sm sm:text-base leading-relaxed font-medium ${
                isLight ? "text-slate-600" : "text-slate-300"
              }`}>
                Join Voicerooms and interactive audio lounges to practice speaking and listening with people and AI co-hosts around the world. Overcome speaking anxiety in a welcoming, multi-speaker stage.
              </p>

              {/* Highlights */}
              <div className="space-y-3 pt-2">
                {[
                  {
                    icon: "🎙️",
                    title: "24/7 AI-Moderated Stage",
                    desc: "An intelligent AI co-host prompts fun topics, keeps the conversation flowing, and ensures everyone gets a turn to speak."
                  },
                  {
                    icon: "🛡️",
                    title: "Judgement-Free Listening & Speaking",
                    desc: "Join initially as a silent listener in the audience. Raise your hand to take the mic only when you feel confident."
                  },
                  {
                    icon: "🌐",
                    title: "Multi-Accent Real-World Immersion",
                    desc: "Sharpen your listening comprehension across diverse authentic global accents and conversational speeds."
                  }
                ].map((room, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-2xl border transition-all ${
                      isLight
                        ? "bg-white/90 border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300"
                        : "bg-slate-900/60 border-indigo-500/20 hover:border-cyan-400/40"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl p-2 rounded-xl bg-blue-50 dark:bg-blue-950/80 border border-blue-100 dark:border-blue-900 shrink-0">
                        {room.icon}
                      </span>
                      <div>
                        <h4 className={`text-sm font-bold ${isLight ? "text-slate-900" : "text-white"}`}>{room.title}</h4>
                        <p className={`text-xs mt-1 leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>{room.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onStartCall()}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>Join Live Voicerooms</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>


      {/* 3.5. Search the World - Dotted World Map & Bidirectional Coaches Scroller */}
      <section id="search-the-world" className={`scroll-mt-20 py-16 sm:py-24 relative overflow-hidden text-center ${
        isLight ? "hero-bg-yaytalk-light text-slate-900" : "hero-bg-yaytalk-dark text-white"
      }`}>
        <ScrollReveal className="w-full space-y-10 sm:space-y-14" distance={32}>
          {/* 1. Header (Heading + Subtitle) */}
          <div className="space-y-3 max-w-4xl mx-auto text-center px-4">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase border shadow-xs ${
              isLight
                ? "bg-blue-50 border-blue-200 text-blue-700"
                : "bg-blue-950/40 border-blue-800/40 text-blue-300"
            }`}>
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Global Speaking Network
            </div>

            <h2 className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight ${
              isLight ? "text-[#0F172A]" : "text-white"
            }`}>
              <span className={isLight ? "text-blue-600 font-extrabold" : "text-blue-400 font-extrabold"}>Search</span> the World
            </h2>

            <p className={`text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-medium ${
              isLight ? "text-slate-600" : "text-slate-300"
            }`}>
              Search for language partners and native AI tutors by native language, city, and real-world fluency goals.
            </p>
          </div>

          {/* 2. Middle: Pristine World Map Infographic Graphic (Normal image in flow, NOT background!) */}
          <div className="relative w-full max-w-[1240px] mx-auto px-4 sm:px-6 flex justify-center">
            <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl">
              <Image
                src="/images/landing/world_map_dotted.webp"
                alt="Global AI Language Exchange Map with AI Tutor and Student Dialogue"
                width={2358}
                height={1263}
                className="w-full h-auto object-contain transition-transform duration-500 hover:scale-[1.01]"
                priority
              />
            </div>
          </div>

          {/* 3. Bottom: Bidirectional Scrolling Coaches Rows with Edge Fades */}
          <div className="relative w-full overflow-hidden pt-2 sm:pt-4">
            {/* Edge Gradient Fade Masks */}
            <div className={`pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-48 z-20 ${
              isLight ? "bg-gradient-to-r from-white via-white/80 to-transparent" : "bg-gradient-to-r from-[#070A14] via-[#070A14]/80 to-transparent"
            }`} />
            <div className={`pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-48 z-20 ${
              isLight ? "bg-gradient-to-l from-white via-white/80 to-transparent" : "bg-gradient-to-l from-[#070A14] via-[#070A14]/80 to-transparent"
            }`} />

            <div className="space-y-4 sm:space-y-6 overflow-hidden">
              {/* ROW 1: Scrolling Left (animate-marquee) */}
            <div className="overflow-hidden whitespace-nowrap">
              <div className="animate-marquee flex items-center gap-4 sm:gap-6 py-1">
                {[
                  { name: "Denise", country: "France", code: "FR", greeting: "Bonjour", img: "/images/coaches/denise.jpg", flag: "/images/flags/fr.png", topicId: "sp_en_1" },
                  { name: "Diego", country: "Spain", code: "ES", greeting: "Hola", img: "/images/coaches/diego.jpg", flag: "/images/flags/es.png", topicId: "sp_si_249" },
                  { name: "Elena", country: "Russia", code: "RU", greeting: "Привет", img: "/images/coaches/elena.jpg", flag: "/images/flags/ru.png", topicId: "sp_en_1" },
                  { name: "Lucas", country: "Germany", code: "DE", greeting: "Hallo", img: "/images/coaches/lucas.jpg", flag: "/images/flags/de.png", topicId: "sp_en_1" },
                  { name: "Oliver", country: "United States", code: "US", greeting: "Hello", img: "/images/coaches/oliver.jpg", flag: "/images/flags/us.png", topicId: "sp_en_1" },
                  { name: "Mei", country: "China", code: "CN", greeting: "你好!", img: "/images/coaches/mei.jpg", flag: "/images/flags/cn.png", topicId: "sp_en_1" },
                  { name: "Aoi", country: "Japan", code: "JP", greeting: "こんにちは", img: "/images/coaches/aoi.jpg", flag: "/images/flags/jp.png", topicId: "sp_en_1" },
                  { name: "Minjun", country: "South Korea", code: "KR", greeting: "안녕하세요", img: "/images/coaches/minjun.jpg", flag: "/images/flags/kr.png", topicId: "sp_en_1" },
                  { name: "Sameera", country: "Sri Lanka", code: "LK", greeting: "ආයුබෝවන්", img: "/images/coaches/sameera.jpg", flag: "/images/flags/lk.png", topicId: "sp_si_249" },
                  { name: "Denise", country: "France", code: "FR", greeting: "Bonjour", img: "/images/coaches/denise.jpg", flag: "/images/flags/fr.png", topicId: "sp_en_1" },
                  { name: "Diego", country: "Spain", code: "ES", greeting: "Hola", img: "/images/coaches/diego.jpg", flag: "/images/flags/es.png", topicId: "sp_si_249" },
                  { name: "Elena", country: "Russia", code: "RU", greeting: "Привет", img: "/images/coaches/elena.jpg", flag: "/images/flags/ru.png", topicId: "sp_en_1" },
                  { name: "Lucas", country: "Germany", code: "DE", greeting: "Hallo", img: "/images/coaches/lucas.jpg", flag: "/images/flags/de.png", topicId: "sp_en_1" },
                  { name: "Oliver", country: "United States", code: "US", greeting: "Hello", img: "/images/coaches/oliver.jpg", flag: "/images/flags/us.png", topicId: "sp_en_1" },
                  { name: "Mei", country: "China", code: "CN", greeting: "你好!", img: "/images/coaches/mei.jpg", flag: "/images/flags/cn.png", topicId: "sp_en_1" },
                  { name: "Aoi", country: "Japan", code: "JP", greeting: "こんにちは", img: "/images/coaches/aoi.jpg", flag: "/images/flags/jp.png", topicId: "sp_en_1" },
                  { name: "Minjun", country: "South Korea", code: "KR", greeting: "안녕하세요", img: "/images/coaches/minjun.jpg", flag: "/images/flags/kr.png", topicId: "sp_en_1" },
                  { name: "Sameera", country: "Sri Lanka", code: "LK", greeting: "ආයුබෝවන්", img: "/images/coaches/sameera.jpg", flag: "/images/flags/lk.png", topicId: "sp_si_249" },
                ].map((coach, idx) => (
                  <button
                    key={`r1-${coach.name}-${idx}`}
                    onClick={() => onStartCall(coach.topicId)}
                    className={`group inline-flex items-center gap-3 px-3.5 py-2 rounded-full border transition-all duration-300 hover:scale-105 cursor-pointer backdrop-blur-md shrink-0 shadow-sm hover:shadow-lg ${
                      isLight
                        ? "bg-white/90 border-slate-200/90 hover:border-blue-400 hover:bg-white text-slate-800"
                        : "bg-slate-900/90 border-white/10 hover:border-blue-400/50 hover:bg-slate-900 text-white"
                    }`}
                  >
                    {/* Circular Avatar with Flag Badge */}
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 rounded-full overflow-hidden relative shadow-md border-2 border-white dark:border-slate-800">
                        <Image
                          src={coach.img}
                          alt={coach.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-1 -left-1 px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-0.5 text-slate-700 dark:text-slate-300">
                        <div className="w-3 h-2 relative overflow-hidden rounded-xs shrink-0">
                          <Image src={coach.flag} alt={coach.code} fill className="object-cover" />
                        </div>
                        <span>{coach.code}</span>
                      </div>
                    </div>

                    {/* Greeting & Details */}
                    <div className="text-left pr-2">
                      <div className={`text-sm sm:text-base font-black tracking-tight ${isLight ? "text-slate-800" : "text-white"}`}>
                        {coach.greeting}
                      </div>
                      <div className={`text-[10px] font-medium ${isLight ? "text-slate-400" : "text-slate-400"}`}>
                        {coach.name} • {coach.country}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* ROW 2: Scrolling Right (animate-marquee-reverse) */}
            <div className="overflow-hidden whitespace-nowrap">
              <div className="animate-marquee-reverse flex items-center gap-4 sm:gap-6 py-1">
                {[
                  { name: "Chloe", country: "France", code: "FR", greeting: "Ça va ?", img: "/images/coaches/chloe.jpg", flag: "/images/flags/fr.png", topicId: "sp_en_1" },
                  { name: "Sophia", country: "Spain", code: "ES", greeting: "¿Qué tal?", img: "/images/coaches/sophia.jpg", flag: "/images/flags/es.png", topicId: "sp_si_249" },
                  { name: "Kenji", country: "Japan", code: "JP", greeting: "もしもし", img: "/images/coaches/kenji.jpg", flag: "/images/flags/jp.png", topicId: "sp_en_1" },
                  { name: "Emma", country: "Germany", code: "DE", greeting: "Guten Tag", img: "/images/coaches/emma.jpg", flag: "/images/flags/de.png", topicId: "sp_en_1" },
                  { name: "Sarah", country: "United Kingdom", code: "GB", greeting: "Cheerio!", img: "/images/coaches/sarah.jpg", flag: "/images/flags/gb.png", topicId: "sp_en_1" },
                  { name: "Tiago", country: "Brazil", code: "BR", greeting: "Olá!", img: "/images/coaches/tiago.jpg", flag: "/images/flags/br.png", topicId: "sp_en_1" },
                  { name: "Matteo", country: "Italy", code: "IT", greeting: "Ciao!", img: "/images/coaches/matteo.jpg", flag: "/images/flags/it.png", topicId: "sp_en_1" },
                  { name: "Priya", country: "India", code: "IN", greeting: "வணக்கம்", img: "/images/coaches/priya.jpg", flag: "/images/flags/in.png", topicId: "sp_en_1" },
                  { name: "Alex", country: "United States", code: "US", greeting: "Hey there!", img: "/images/coaches/alex.jpg", flag: "/images/flags/us.png", topicId: "sp_en_1" },
                  { name: "Chloe", country: "France", code: "FR", greeting: "Ça va ?", img: "/images/coaches/chloe.jpg", flag: "/images/flags/fr.png", topicId: "sp_en_1" },
                  { name: "Sophia", country: "Spain", code: "ES", greeting: "¿Qué tal?", img: "/images/coaches/sophia.jpg", flag: "/images/flags/es.png", topicId: "sp_si_249" },
                  { name: "Kenji", country: "Japan", code: "JP", greeting: "もしもし", img: "/images/coaches/kenji.jpg", flag: "/images/flags/jp.png", topicId: "sp_en_1" },
                  { name: "Emma", country: "Germany", code: "DE", greeting: "Guten Tag", img: "/images/coaches/emma.jpg", flag: "/images/flags/de.png", topicId: "sp_en_1" },
                  { name: "Sarah", country: "United Kingdom", code: "GB", greeting: "Cheerio!", img: "/images/coaches/sarah.jpg", flag: "/images/flags/gb.png", topicId: "sp_en_1" },
                  { name: "Tiago", country: "Brazil", code: "BR", greeting: "Olá!", img: "/images/coaches/tiago.jpg", flag: "/images/flags/br.png", topicId: "sp_en_1" },
                  { name: "Matteo", country: "Italy", code: "IT", greeting: "Ciao!", img: "/images/coaches/matteo.jpg", flag: "/images/flags/it.png", topicId: "sp_en_1" },
                  { name: "Priya", country: "India", code: "IN", greeting: "வணக்கம்", img: "/images/coaches/priya.jpg", flag: "/images/flags/in.png", topicId: "sp_en_1" },
                  { name: "Alex", country: "United States", code: "US", greeting: "Hey there!", img: "/images/coaches/alex.jpg", flag: "/images/flags/us.png", topicId: "sp_en_1" },
                ].map((coach, idx) => (
                  <button
                    key={`r2-${coach.name}-${idx}`}
                    onClick={() => onStartCall(coach.topicId)}
                    className={`group inline-flex items-center gap-3 px-3.5 py-2 rounded-full border transition-all duration-300 hover:scale-105 cursor-pointer backdrop-blur-md shrink-0 shadow-sm hover:shadow-lg ${
                      isLight
                        ? "bg-white/90 border-slate-200/90 hover:border-blue-400 hover:bg-white text-slate-800"
                        : "bg-slate-900/90 border-white/10 hover:border-blue-400/50 hover:bg-slate-900 text-white"
                    }`}
                  >
                    {/* Circular Avatar with Flag Badge */}
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 rounded-full overflow-hidden relative shadow-md border-2 border-white dark:border-slate-800">
                        <Image
                          src={coach.img}
                          alt={coach.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-1 -left-1 px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-0.5 text-slate-700 dark:text-slate-300">
                        <div className="w-3 h-2 relative overflow-hidden rounded-xs shrink-0">
                          <Image src={coach.flag} alt={coach.code} fill className="object-cover" />
                        </div>
                        <span>{coach.code}</span>
                      </div>
                    </div>

                    {/* Greeting & Details */}
                    <div className="text-left pr-2">
                      <div className={`text-sm sm:text-base font-black tracking-tight ${isLight ? "text-slate-800" : "text-white"}`}>
                        {coach.greeting}
                      </div>
                      <div className={`text-[10px] font-medium ${isLight ? "text-slate-400" : "text-slate-400"}`}>
                        {coach.name} • {coach.country}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>

{/* 11. Loved by Learners Around the World - Testimonials Showcase (Image 5 Wreaths & 4-Card Carousel) */}
      <section id="reviews" className={`scroll-mt-20 py-16 sm:py-24 relative overflow-hidden text-center ${
        isLight ? "hero-bg-yaytalk-light text-slate-900" : "hero-bg-yaytalk-dark text-white"
      }`}>
        <ScrollReveal className="w-full space-y-10 sm:space-y-12" distance={32}>
          {/* Section Header */}
          <div className="space-y-4 max-w-4xl mx-auto text-center px-4">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase border shadow-xs ${
              isLight
                ? "bg-blue-50 border-blue-200 text-blue-700"
                : "bg-blue-950/40 border-blue-800/40 text-blue-300"
            }`}>
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Wall of Love • 140+ Countries
            </div>

            <h2 className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight ${
              isLight ? "text-[#0F172A]" : "text-white"
            }`}>
              Loved by learners <span className={isLight ? "text-blue-600 font-extrabold" : "text-blue-400 font-extrabold"}>around the world</span>
            </h2>

            <p className={`text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium ${
              isLight ? "text-slate-600" : "text-slate-300"
            }`}>
              Over 100,000 real people practice daily with SpeakFlow AI to conquer speaking anxiety, ace overseas interviews, and master authentic fluency.
            </p>

            {/* Social Proof Badges with Real Laurel Leaf Branches (Exact to Image 5 Reference) */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-10 sm:gap-20">
              {/* Laurel Wreath 1: Ratings */}
              <div className="flex items-center gap-2 sm:gap-3 group select-none">
                {/* Left Branch */}
                <div className="relative w-8 sm:w-11 h-16 sm:h-22 shrink-0">
                  <Image
                    src="/images/landing/laurel_branch.png"
                    alt="Laurel branch left"
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="text-center px-2">
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="text-amber-500 text-2xl sm:text-3xl">★</span>
                    <span className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${
                      isLight ? "text-slate-900" : "text-white"
                    }`}>
                      4.8
                    </span>
                  </div>
                  <div className={`text-xs sm:text-sm font-semibold tracking-wide mt-1 ${
                    isLight ? "text-slate-500" : "text-slate-400"
                  }`}>
                    2k+ ratings
                  </div>
                </div>

                {/* Right Branch (Flipped horizontally) */}
                <div className="relative w-8 sm:w-11 h-16 sm:h-22 shrink-0 -scale-x-100">
                  <Image
                    src="/images/landing/laurel_branch.png"
                    alt="Laurel branch right"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Laurel Wreath 2: Active Learners */}
              <div className="flex items-center gap-2 sm:gap-3 group select-none">
                {/* Left Branch */}
                <div className="relative w-8 sm:w-11 h-16 sm:h-22 shrink-0">
                  <Image
                    src="/images/landing/laurel_branch.png"
                    alt="Laurel branch left"
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="text-center px-2">
                  <div className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${
                    isLight ? "text-slate-900" : "text-white"
                  }`}>
                    100K
                  </div>
                  <div className={`text-xs sm:text-sm font-semibold tracking-wide mt-1 ${
                    isLight ? "text-slate-500" : "text-slate-400"
                  }`}>
                    learners
                  </div>
                </div>

                {/* Right Branch (Flipped horizontally) */}
                <div className="relative w-8 sm:w-11 h-16 sm:h-22 shrink-0 -scale-x-100">
                  <Image
                    src="/images/landing/laurel_branch.png"
                    alt="Laurel branch right"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-4 max-w-4xl mx-auto">
            {[
              { label: "All 50 Reviews", value: "All" },
              { label: "English 🇺🇸", value: "English" },
              { label: "Spanish 🇪🇸", value: "Spanish" },
              { label: "Japanese 🇯🇵", value: "Japanese" },
              { label: "French 🇫🇷", value: "French" },
              { label: "German 🇩🇪", value: "German" },
              { label: "Korean 🇰🇷", value: "Korean" },
              { label: "Italian 🇮🇹", value: "Italian" },
              { label: "Mandarin 🇨🇳", value: "Mandarin" },
            ].map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  setSelectedReviewFilter(cat.value);
                  setReviewPage(0);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                  selectedReviewFilter === cat.value
                    ? isLight
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/25"
                    : isLight
                    ? "bg-white/80 text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-white"
                    : "bg-slate-900/60 text-slate-300 border-white/10 hover:border-white/20 hover:bg-slate-900"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* 4-CARD STABLE SHOWCASE (Non-Marquee, Pausable Carousel - Zero Conflict with Search the World) */}
          <div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            onMouseEnter={() => setIsReviewPaused(true)}
            onMouseLeave={() => setIsReviewPaused(false)}
          >
            {(() => {
              const filtered = selectedReviewFilter === "All"
                ? ALL_REVIEWS_50
                : ALL_REVIEWS_50.filter((r) => r.category === selectedReviewFilter);
              const itemsPerPage = 4;
              const totalPages = Math.ceil(filtered.length / itemsPerPage);
              const safePage = Math.min(reviewPage, Math.max(0, totalPages - 1));
              const currentReviews = filtered.slice(safePage * itemsPerPage, (safePage + 1) * itemsPerPage);

              return (
                <div className="space-y-6">
                  {/* The 4 Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    {currentReviews.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setActiveReviewModal(item)}
                        className={`group relative p-5 rounded-2xl border transition-all duration-300 text-left cursor-pointer flex flex-col justify-between hover:-translate-y-1 ${
                          isLight
                            ? "bg-white/95 border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-400"
                            : "bg-slate-900/90 border-white/10 shadow-lg hover:shadow-blue-500/10 hover:border-blue-400/50"
                        }`}
                      >
                        <div>
                          {/* Top Bar: Avatar, User Details, Learned Badge, Quote Symbol */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-slate-800 shadow-sm shrink-0">
                                <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                              </div>
                              <div className="min-w-0">
                                <div className={`text-sm font-bold truncate ${isLight ? "text-slate-900" : "text-white"}`}>
                                  {item.name}
                                </div>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                    <span>Learned</span>
                                    <span className="w-3.5 h-2.5 relative overflow-hidden rounded-xs shrink-0 inline-block align-middle">
                                      <Image src={item.targetFlag} alt={item.learned} fill className="object-cover" />
                                    </span>
                                    <span className={`font-bold ${isLight ? "text-slate-800" : "text-slate-200"}`}>
                                      {item.learned}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>

                            <span className={`text-2xl font-serif select-none transition-colors ${
                              isLight ? "text-slate-300 group-hover:text-blue-500" : "text-slate-700 group-hover:text-blue-400"
                            }`}>
                              &rdquo;
                            </span>
                          </div>

                          {/* 5 Stars */}
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="text-amber-400 text-xs">★</span>
                            ))}
                            <span className="text-[10px] font-bold text-slate-400 ml-1">5.0</span>
                          </div>

                          {/* Review Title */}
                          <h4 className={`text-sm font-bold tracking-tight mb-1.5 ${
                            isLight ? "text-slate-900" : "text-white"
                          }`}>
                            {item.title}
                          </h4>

                          {/* Review Quote Text */}
                          <p className={`text-xs leading-relaxed line-clamp-4 font-normal ${
                            isLight ? "text-slate-600" : "text-slate-300"
                          }`}>
                            {item.content}
                          </p>
                        </div>

                        {/* Footer Stamp */}
                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px]">
                          <span className="text-emerald-500 font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Verified Learner
                          </span>
                          <span className={`font-medium ${isLight ? "text-slate-400" : "text-slate-400"}`}>
                            {item.role}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Carousel Pagination & Page Controls */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Left: Indicator Info */}
                    <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      Showing <strong className={isLight ? "text-slate-800" : "text-white"}>{safePage * itemsPerPage + 1}–{Math.min((safePage + 1) * itemsPerPage, filtered.length)}</strong> of <strong className={isLight ? "text-slate-800" : "text-white"}>{filtered.length}</strong> verified reviews
                    </div>

                    {/* Middle: Dot Indicators */}
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: totalPages }).map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setReviewPage(idx)}
                          className={`h-2 rounded-full transition-all cursor-pointer ${
                            safePage === idx
                              ? "w-6 bg-blue-600 shadow-xs"
                              : isLight
                              ? "w-2 bg-slate-300 hover:bg-slate-400"
                              : "w-2 bg-slate-700 hover:bg-slate-500"
                          }`}
                          aria-label={`Go to page ${idx + 1}`}
                        />
                      ))}
                    </div>

                    {/* Right: Prev & Next Arrow Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setReviewPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1))}
                        className={`p-2 sm:px-3 sm:py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-xs ${
                          isLight
                            ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                            : "bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700"
                        }`}
                        aria-label="Previous reviews"
                      >
                        <span>←</span>
                        <span className="hidden sm:inline">Prev</span>
                      </button>

                      <button
                        onClick={() => setReviewPage((prev) => (prev + 1) % totalPages)}
                        className={`p-2 sm:px-3 sm:py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-xs ${
                          isLight
                            ? "bg-blue-600 border-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20"
                            : "bg-blue-600 border-blue-500 text-white hover:bg-blue-500 shadow-blue-500/20"
                        }`}
                        aria-label="Next reviews"
                      >
                        <span className="hidden sm:inline">Next</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Bottom Live Community Counter Bar */}
          <div className="pt-2 max-w-xl mx-auto px-4">
            <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-xs font-semibold ${
              isLight
                ? "bg-slate-100/90 border-slate-200 text-slate-700"
                : "bg-slate-900/80 border-slate-800 text-slate-300"
            }`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>
                <strong className="text-emerald-500">1,420+ learners</strong> speaking right now across Tokyo, Paris, Colombo & New York
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Selected Review Full Story Modal */}
        {activeReviewModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
            onClick={() => setActiveReviewModal(null)}
          >
            <div
              className={`relative w-full max-w-lg p-6 sm:p-8 rounded-3xl border shadow-2xl text-left transition-all ${
                isLight ? "bg-white border-slate-200 text-slate-900" : "bg-[#0B1120] border-slate-800 text-white"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveReviewModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg cursor-pointer"
              >
                ✕
              </button>

              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-blue-500 shadow-md shrink-0">
                  <Image src={activeReviewModal.avatar} alt={activeReviewModal.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{activeReviewModal.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    <span>{activeReviewModal.role}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400">
                      Learned {activeReviewModal.learned}
                      <span className="w-3.5 h-2.5 relative inline-block overflow-hidden rounded-xs ml-0.5">
                        <Image src={activeReviewModal.targetFlag} alt={activeReviewModal.learned} fill className="object-cover" />
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-base">★</span>
                ))}
                <span className="text-xs font-bold text-slate-400 ml-1">5.0 Verified Review</span>
              </div>

              <h4 className="text-base sm:text-lg font-bold tracking-tight mb-2">
                "{activeReviewModal.title}"
              </h4>

              <p className={`text-sm leading-relaxed mb-6 ${
                isLight ? "text-slate-600" : "text-slate-300"
              }`}>
                {activeReviewModal.content}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs text-emerald-500 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Verified Active Learner
                </span>
                <button
                  onClick={() => {
                    setActiveReviewModal(null);
                    onStartCall();
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Start Speaking Now →
                </button>
              </div>
            </div>
          </div>
        )}
      </section>



            {/* 11.5. Talk to the World (Mobile App Showcase with Dual Ambient Pink & Blue Aura) */}
      <section id="talk-to-the-world" className={`scroll-mt-20 py-20 sm:py-28 relative overflow-hidden ${
        isLight ? "bg-white text-slate-900" : "bg-[#070A14] text-white"
      }`}>
        {/* Soft Ambient Radial Glows (Left Rose/Pink, Right Soft Sky-Blue) */}
        <div className={`pointer-events-none absolute -left-24 top-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full blur-[110px] -z-0 ${
          isLight ? "bg-rose-200/50" : "bg-rose-950/25"
        }`} />
        <div className={`pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full blur-[110px] -z-0 ${
          isLight ? "bg-blue-200/50" : "bg-blue-950/30"
        }`} />

        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" distance={32}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Heading, Subtitle & Interactive Dynamic QR Code Download Card */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase border shadow-xs ${
                isLight
                  ? "bg-blue-50 border-blue-200 text-blue-700"
                  : "bg-blue-950/40 border-blue-800/40 text-blue-300"
              }`}>
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                Mobile Experience
              </div>

              <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] ${
                isLight ? "text-[#0F172A]" : "text-white"
              }`}>
                Talk to the <span className={isLight ? "text-blue-600 font-extrabold" : "text-blue-400 font-extrabold"}>World</span>
              </h2>

              <p className={`text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium ${
                isLight ? "text-slate-600" : "text-slate-300"
              }`}>
                Find language exchange partners and practice for free by chatting with native speakers around the world.
              </p>

              {/* Dynamic QR Code Download Card */}
              <div className="pt-2 flex justify-center lg:justify-start">
                <div className={`p-4 sm:p-5 rounded-2xl border shadow-xl flex items-center gap-5 transition-all duration-300 hover:scale-[1.02] backdrop-blur-md ${
                  isLight
                    ? "bg-white/95 border-slate-200 shadow-slate-200/60"
                    : "bg-slate-900/90 border-slate-800 shadow-black/40"
                }`}>
                  {/* Real Live Dynamic QR Code generated from App Target URL */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white p-1 rounded-xl border border-slate-200 shadow-xs shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
                        config?.playStoreUrl || config?.apkDownloadUrl || "https://play.google.com/store/apps/details?id=com.innoxpert.speakflow"
                      )}&color=0-0-0&bgcolor=255-255-255`}
                      alt="Scan to Download SpeakFlow App"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Details & App Store Icons */}
                  <div className="text-left space-y-1.5">
                    <p className={`text-xs sm:text-sm font-black leading-tight ${isLight ? "text-slate-900" : "text-white"}`}>
                      Chat with <span className={isLight ? "text-blue-600 font-black" : "text-blue-400 font-black"}>millions</span> of native speakers
                    </p>
                    <p className={`text-[11px] sm:text-xs font-medium ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                      Scan to download free app
                    </p>

                    {/* App Store & Android Real Official Badges */}
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <a
                        href={config?.appStoreUrl || "https://apple.com/app-store"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-transform duration-200 hover:scale-105 drop-shadow-xs shrink-0"
                      >
                        <Image
                          src="/images/landing/app_store.webp"
                          alt="Download on the App Store"
                          width={120}
                          height={36}
                          className="h-8 sm:h-9 w-auto object-contain"
                        />
                      </a>

                      <a
                        href={config?.playStoreUrl || "https://play.google.com/store/apps/details?id=com.innoxpert.speakflow"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-transform duration-200 hover:scale-105 drop-shadow-xs shrink-0"
                      >
                        <Image
                          src="/images/landing/google_play.webp"
                          alt="Get it on Google Play"
                          width={120}
                          height={36}
                          className="h-8 sm:h-9 w-auto object-contain"
                        />
                      </a>

                      <a
                        href={config?.apkDownloadUrl || "https://github.com/janithad2/speakflow-ai/releases/download/v1.0.0/speakflow-ai.apk"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-transform duration-200 hover:scale-105 drop-shadow-xs shrink-0"
                      >
                        <Image
                          src="/images/landing/android_apk.webp"
                          alt="Direct Android APK Download"
                          width={120}
                          height={36}
                          className="h-8 sm:h-9 w-auto object-contain"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hand with Phone & Floating Audio Chat Avatars */}
            <div className="lg:col-span-6 flex justify-center items-center">
              <div className="relative w-full max-w-[500px] sm:max-w-[560px] lg:max-w-[620px] transition-transform duration-700 hover:scale-[1.02]">
                <Image
                  src="/images/landing/talk_to_the_world_phone.png"
                  alt="Talk to the World - SpeakFlow on Mobile"
                  width={1800}
                  height={2010}
                  className="w-full h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.14)] dark:drop-shadow-[0_25px_60px_rgba(59,130,246,0.18)]"
                  priority
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 11.8. Your Language Learning Journey Starts Here (Pre-Footer CTA Banner) */}
      <section id="cta-journey-start" className={`scroll-mt-20 py-16 sm:py-24 relative overflow-hidden border-t ${
        isLight
          ? "bg-white border-slate-100 text-slate-900"
          : "bg-[#050811] border-slate-800/80 text-white"
      }`}>
        <ScrollReveal className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6" distance={24}>
          <h3 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight ${
            isLight ? "text-[#0F172A]" : "text-white"
          }`}>
            Your Language Learning Journey <span className={isLight ? "text-blue-600 font-extrabold" : "text-blue-400 font-extrabold"}>Starts Here</span>
          </h3>

          <p className={`text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-medium ${
            isLight ? "text-slate-600" : "text-slate-300"
          }`}>
            Practice languages and make friends with native speakers from around the world for free.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <button
              onClick={() => onStartCall()}
              className="px-8 py-3.5 rounded-full font-black text-sm tracking-wide bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Start Learning
            </button>

            <a
              href="#search-the-world"
              className={`px-8 py-3.5 rounded-full font-bold text-sm tracking-wide border transition-all duration-300 hover:scale-105 cursor-pointer shadow-xs ${
                isLight
                  ? "bg-white border-slate-300 hover:bg-slate-50 text-slate-800 hover:border-slate-400"
                  : "bg-slate-900/90 border-slate-700 hover:bg-slate-800 text-white hover:border-slate-600"
              }`}
            >
              Find Your First Partner
            </a>
          </div>
        </ScrollReveal>
      </section>

{/* 12. Enterprise Multi-Column SaaS Footer */}
      <footer className={`border-t transition-colors ${
        isLight
          ? "bg-slate-50 border-slate-200 text-slate-600"
          : "bg-[#03060E] border-indigo-950/70 text-slate-400"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          {/* Top Brand & Mission Bar */}
          <div className="pb-12 border-b border-slate-200/80 dark:border-slate-800/80 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25">
                  <span className="text-xl">🎙️</span>
                </div>
                <div className="text-left">
                  <span className={`text-2xl font-black tracking-tight ${isLight ? "text-slate-900" : "text-white"}`}>
                    SpeakFlow <span className="text-blue-600 dark:text-blue-400">AI</span>
                  </span>
                  <p className="text-[11px] font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400">
                    Engineered by InnoXpert Technologies
                  </p>
                </div>
              </div>
              <p className={`text-sm leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                Next-generation real-time voice & language exchange platform. Practice 20+ languages with native AI tutors, join live audio Voicerooms, and conquer speaking anxiety.
              </p>
              {/* System Status Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                All Systems Operational • Sub-20ms Engine
              </div>
            </div>

            {/* Quick Mobile App Download Badges (Official Store Badges) */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={config?.appStoreUrl || "https://apple.com/app-store"}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-200 hover:scale-105 drop-shadow-md shrink-0"
              >
                <Image
                  src="/images/landing/app_store.webp"
                  alt="Download on the App Store"
                  width={140}
                  height={42}
                  className="h-10 sm:h-11 w-auto object-contain"
                />
              </a>

              <a
                href={config?.playStoreUrl || "https://play.google.com/store/apps/details?id=com.innoxpert.speakflow"}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-200 hover:scale-105 drop-shadow-md shrink-0"
              >
                <Image
                  src="/images/landing/google_play.webp"
                  alt="Get it on Google Play"
                  width={140}
                  height={42}
                  className="h-10 sm:h-11 w-auto object-contain"
                />
              </a>

              <a
                href={config?.apkDownloadUrl || "https://github.com/janithad2/speakflow-ai/releases/download/v1.0.0/speakflow-ai.apk"}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-200 hover:scale-105 drop-shadow-md shrink-0"
              >
                <Image
                  src="/images/landing/android_apk.webp"
                  alt="Direct Android APK Download"
                  width={140}
                  height={42}
                  className="h-10 sm:h-11 w-auto object-contain"
                />
              </a>
            </div>
          </div>

          {/* Main 4-Column Navigation Grid */}
          <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {/* Column 1: Core Product */}
            <div className="space-y-4">
              <h4 className={`text-xs font-black uppercase tracking-wider ${isLight ? "text-slate-900" : "text-white"}`}>
                Product
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <a href="#scenarios" className="hover:text-blue-500 transition-colors">
                    Real-World Scenarios
                  </a>
                </li>
                <li>
                  <a href="#languages" className="hover:text-blue-500 transition-colors">
                    20+ Global Languages
                  </a>
                </li>
                <li>
                  <a href="#voicerooms" className="hover:text-blue-500 transition-colors">
                    Live AI Voicerooms
                  </a>
                </li>
                <li>
                  <a href="#search-the-world" className="hover:text-blue-500 transition-colors">
                    Search the World Network
                  </a>
                </li>
                <li>
                  <a href="#instant-feedback" className="hover:text-blue-500 transition-colors">
                    Instant Speech Feedback
                  </a>
                </li>
                <li>
                  <a href="#exchange" className="hover:text-blue-500 transition-colors">
                    Grammar & Transliteration
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Platform & Features */}
            <div className="space-y-4">
              <h4 className={`text-xs font-black uppercase tracking-wider ${isLight ? "text-slate-900" : "text-white"}`}>
                Platform
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <button onClick={() => onStartCall()} className="hover:text-blue-500 transition-colors text-left cursor-pointer">
                    Web App Live Audio
                  </button>
                </li>
                <li>
                  <a href={config?.playStoreUrl || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                    Android Application
                  </a>
                </li>
                <li>
                  <a href={config?.appStoreUrl || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                    iOS Experience
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-blue-500 transition-colors">
                    Subscription Plans
                  </a>
                </li>
                <li>
                  <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                    Hybrid On-Device Engine <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-blue-500/10 text-blue-500 font-bold">New</span>
                  </span>
                </li>
                <li>
                  <span className="text-slate-400 dark:text-slate-500">
                    Sub-20ms Voice VAD
                  </span>
                </li>
              </ul>
            </div>

            {/* Column 3: Community & Trust */}
            <div className="space-y-4">
              <h4 className={`text-xs font-black uppercase tracking-wider ${isLight ? "text-slate-900" : "text-white"}`}>
                Community
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <a href="#reviews" className="hover:text-blue-500 transition-colors">
                    Learner Reviews (★ 4.8)
                  </a>
                </li>
                <li>
                  <a href="#moments" className="hover:text-blue-500 transition-colors">
                    Community Moments
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-blue-500 transition-colors">
                    Frequently Asked Questions
                  </a>
                </li>
                <li>
                  <span className="text-slate-400 dark:text-slate-500">
                    Speaking Clubs & Lounges
                  </span>
                </li>
                <li>
                  <span className="text-slate-400 dark:text-slate-500">
                    Fluency Leaderboard
                  </span>
                </li>
                <li>
                  <span className="text-slate-400 dark:text-slate-500">
                    Community Guidelines
                  </span>
                </li>
              </ul>
            </div>

            {/* Column 4: Admin & Legal */}
            <div className="space-y-4">
              <h4 className={`text-xs font-black uppercase tracking-wider ${isLight ? "text-slate-900" : "text-white"}`}>
                Access & Company
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <button onClick={() => onOpenAuth("login")} className="hover:text-blue-500 transition-colors text-left cursor-pointer">
                    Learner Log In
                  </button>
                </li>
                <li>
                  <button onClick={() => onOpenAuth("signup")} className="hover:text-blue-500 transition-colors text-left cursor-pointer">
                    Create Free Account
                  </button>
                </li>
                {onOpenAdminCMS && (
                  <li>
                    <button
                      onClick={onOpenAdminCMS}
                      className="text-blue-600 dark:text-blue-400 hover:underline font-black flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>⚙️</span>
                      <span>Admin CMS Portal</span>
                    </button>
                  </li>
                )}
                <li>
                  <span className="text-slate-400 dark:text-slate-500">
                    Privacy Policy
                  </span>
                </li>
                <li>
                  <span className="text-slate-400 dark:text-slate-500">
                    Terms of Service
                  </span>
                </li>
                <li>
                  <span className="text-slate-400 dark:text-slate-500">
                    Google Cloud & Firebase
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Back to Top */}
          <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-slate-500">
              <p>© 2026 SpeakFlow AI. Engineered by InnoXpert Technologies.</p>
              <span>•</span>
              <p>#BuildHybridAI Hackathon 2026</p>
              <span>•</span>
              <p>All rights reserved.</p>
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all duration-200 hover:scale-105 cursor-pointer ${
                isLight
                  ? "bg-white border-slate-200 hover:bg-slate-100 text-slate-700"
                  : "bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300"
              }`}
            >
              <span>Back to Top</span>
              <span>↑</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
