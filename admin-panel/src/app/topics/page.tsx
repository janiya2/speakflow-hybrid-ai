"use client";

import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  addDoc
} from "firebase/firestore";
import { db, COLLECTIONS } from "@/lib/firebase";
import {
  Plus,
  Trash2,
  Edit2,
  MessageSquare,
  Globe,
  Sparkles,
  Check,
  X,
  Search,
  BookOpen,
  HelpCircle,
  Lightbulb
} from "lucide-react";

export interface TopicItem {
  id?: string;
  title: string;
  language: "English" | "Japanese" | "Korean";
  level: "Beginner" | "Intermediate" | "Advanced";
  icon: string;
  scenario: string;
  starterPrompt: string;
  starterQuestions: string[];
  isActive: boolean;
  createdAt?: string;
}

const DEFAULT_SEEDED_TOPICS: Omit<TopicItem, "id">[] = [
  {
    title: "Job Interview: Tell Me About Yourself",
    language: "English",
    level: "Intermediate",
    icon: "💼",
    scenario: "You are an interviewer at a global tech company conducting a friendly interview.",
    starterPrompt: "Hello! Welcome to our interview today. To start off, could you please tell me a little bit about yourself and your background?",
    starterQuestions: [
      "Tell me about your previous work experience.",
      "What are your greatest strengths?",
      "Why are you interested in this position?"
    ],
    isActive: true
  },
  {
    title: "Ordering Coffee at a Shibuya Cafe",
    language: "Japanese",
    level: "Beginner",
    icon: "☕",
    scenario: "You are a friendly barista at a popular Tokyo coffee shop helping a customer place an order.",
    starterPrompt: "いらっしゃいませ！何にしますか？ (Irasshaimase! Nani ni shimasu ka? - Welcome! What would you like to order?)",
    starterQuestions: [
      "Hot or iced coffee?",
      "Would you like anything to eat with that?",
      "Are you having it here or for takeout?"
    ],
    isActive: true
  },
  {
    title: "Ordering Food at a Seoul K-BBQ Restaurant",
    language: "Korean",
    level: "Beginner",
    icon: "🥩",
    scenario: "You are a warm Korean restaurant owner welcoming a guest who wants to try Korean BBQ.",
    starterPrompt: "어서오세요! 몇 분이세요? (Eoseo oseyo! Myeot bun-iseyo? - Welcome! How many people are in your party?)",
    starterQuestions: [
      "What type of meat would you like to start with?",
      "Is this your first time trying Korean BBQ?",
      "Would you like some rice or soup as well?"
    ],
    isActive: true
  },
  {
    title: "Casual Chat: Weekend Hobbies & Movies",
    language: "English",
    level: "Beginner",
    icon: "🎬",
    scenario: "You are meeting a new friend at a cafe talking casually about what you like to do on weekends.",
    starterPrompt: "Hey there! It's so nice to meet you. What kind of things do you usually enjoy doing in your free time?",
    starterQuestions: [
      "Do you like watching movies or series?",
      "What music do you listen to?",
      "Have you planned anything fun for this upcoming weekend?"
    ],
    isActive: true
  }
];

export default function TopicsPage() {
  const [topics, setTopics] = useState<TopicItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<TopicItem | null>(null);
  const [saving, setSaving] = useState(false);

  // Form Fields
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState<"English" | "Japanese" | "Korean">("English");
  const [level, setLevel] = useState<"Beginner" | "Intermediate" | "Advanced">("Beginner");
  const [icon, setIcon] = useState("💬");
  const [scenario, setScenario] = useState("");
  const [starterPrompt, setStarterPrompt] = useState("");
  const [questionsInput, setQuestionsInput] = useState("");

  const fetchTopics = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, COLLECTIONS.TOPICS));
      const loaded: TopicItem[] = snap.docs.map((d) => ({
        id: d.id,
        ...d.data()
      })) as TopicItem[];
      setTopics(loaded);
    } catch (err) {
      console.error("Error loading topics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleSeedDefaults = async () => {
    setSaving(true);
    try {
      for (const t of DEFAULT_SEEDED_TOPICS) {
        await addDoc(collection(db, COLLECTIONS.TOPICS), {
          ...t,
          createdAt: new Date().toISOString()
        });
      }
      await fetchTopics();
    } catch (err) {
      console.error("Failed seeding:", err);
    } finally {
      setSaving(false);
    }
  };

  const openCreateModal = () => {
    setEditingTopic(null);
    setTitle("");
    setLanguage("English");
    setLevel("Beginner");
    setIcon("💬");
    setScenario("");
    setStarterPrompt("");
    setQuestionsInput("");
    setIsModalOpen(true);
  };

  const openEditModal = (t: TopicItem) => {
    setEditingTopic(t);
    setTitle(t.title);
    setLanguage(t.language);
    setLevel(t.level);
    setIcon(t.icon || "💬");
    setScenario(t.scenario);
    setStarterPrompt(t.starterPrompt);
    setQuestionsInput(t.starterQuestions?.join("\n") || "");
    setIsModalOpen(true);
  };

  const handleSaveTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const questions = questionsInput
        .split("\n")
        .map((q) => q.trim())
        .filter(Boolean);

      const topicPayload: Omit<TopicItem, "id"> = {
        title,
        language,
        level,
        icon,
        scenario,
        starterPrompt,
        starterQuestions: questions,
        isActive: true,
        createdAt: editingTopic?.createdAt || new Date().toISOString()
      };

      if (editingTopic?.id) {
        await setDoc(doc(db, COLLECTIONS.TOPICS, editingTopic.id), topicPayload, { merge: true });
      } else {
        await addDoc(collection(db, COLLECTIONS.TOPICS), topicPayload);
      }

      setIsModalOpen(false);
      await fetchTopics();
    } catch (err) {
      console.error("Failed to save topic:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this topic?")) return;
    try {
      await deleteDoc(doc(db, COLLECTIONS.TOPICS, id));
      setTopics(topics.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const filteredTopics = topics.filter((t) => {
    const matchesLang = selectedLanguage === "All" || t.language === selectedLanguage;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.scenario.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLang && matchesSearch;
  });

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Conversation Topics & Scenarios</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              {topics.length} Scenarios
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Create and organize conversation topics for English, Japanese, and Korean live voice calls.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {topics.length === 0 && !loading && (
            <button
              onClick={handleSeedDefaults}
              disabled={saving}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Load Sample Topics</span>
            </button>
          )}

          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-600/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Scenario</span>
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search scenarios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Language Tabs */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          {["All", "English", "Japanese", "Korean"].map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedLanguage === lang
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Topics Grid */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="w-8 h-8 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredTopics.length === 0 ? (
        <div className="bg-slate-900/50 border border-dashed border-slate-800 rounded-2xl p-12 text-center">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-white">No Topics Found</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            {topics.length === 0
              ? "You haven't added any topics yet. Click 'Load Sample Topics' to automatically add pre-built English, Japanese, and Korean scenarios."
              : "No topics match your current search or language filter."}
          </p>
          {topics.length === 0 && (
            <button
              onClick={handleSeedDefaults}
              className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition-all inline-flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Load Sample Topics Now</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTopics.map((topic) => (
            <div
              key={topic.id}
              className="bg-slate-900/70 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 flex flex-col justify-between transition-all group hover:shadow-xl hover:shadow-indigo-500/5"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-2xl">
                    {topic.icon || "💬"}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {topic.language}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                      topic.level === "Beginner"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : topic.level === "Intermediate"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        : "bg-purple-500/10 text-purple-400 border-purple-500/20"
                    }`}>
                      {topic.level}
                    </span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white mb-1.5 group-hover:text-indigo-300 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                  {topic.scenario}
                </p>

                {/* Opening line */}
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 mb-3">
                  <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3 text-indigo-400" />
                    Bot Opening Line:
                  </div>
                  <p className="text-xs text-slate-300 italic line-clamp-2">
                    "{topic.starterPrompt}"
                  </p>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800/60">
                <span className="text-[11px] text-slate-500">
                  {topic.starterQuestions?.length || 0} Sample Prompts
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(topic)}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => topic.id && handleDelete(topic.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>{editingTopic ? "Edit Scenario" : "Create New Scenario"}</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTopic} className="space-y-4">
              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-3">
                  <label className="block text-xs font-medium text-slate-300 mb-1">Topic Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Checking in at an Airport"
                    className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Emoji</label>
                  <input
                    type="text"
                    required
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-center text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Target Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="English">English</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Korean">Korean</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Difficulty Level</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">AI Role & Scenario Context</label>
                <textarea
                  rows={2}
                  required
                  value={scenario}
                  onChange={(e) => setScenario(e.target.value)}
                  placeholder="You are an airport check-in agent assisting a passenger with luggage..."
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Bot Spoken Opening Line</label>
                <input
                  type="text"
                  required
                  value={starterPrompt}
                  onChange={(e) => setStarterPrompt(e.target.value)}
                  placeholder="Good morning! Where are you flying to today?"
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Sample Follow-Up Questions (One per line)
                </label>
                <textarea
                  rows={3}
                  value={questionsInput}
                  onChange={(e) => setQuestionsInput(e.target.value)}
                  placeholder="May I see your passport and ticket?&#10;How many bags do you want to check in?&#10;Do you prefer an aisle or window seat?"
                  className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30 disabled:opacity-50"
                >
                  {saving ? "Saving..." : editingTopic ? "Update Scenario" : "Create Scenario"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

