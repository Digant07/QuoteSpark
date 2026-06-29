"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import QuoteCard from "@/components/QuoteCard";
import FactCard from "@/components/FactCard";
import {
  Trophy,
  Flame,
  Briefcase,
  BookOpen,
  Dumbbell,
  Heart,
} from "lucide-react";
import quotesData from "@/data/quotes.json";
import factsData from "@/data/facts.json";

const CATEGORIES = ["Success", "Motivation", "Business", "Study", "Fitness", "Life"];

const categoryConfig: Record<string, { icon: React.ReactNode; gradient: string; activeClass: string }> = {
  Success: {
    icon: <Trophy size={16} />,
    gradient: "from-emerald-400 to-green-600",
    activeClass: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
  Motivation: {
    icon: <Flame size={16} />,
    gradient: "from-violet-500 to-indigo-600",
    activeClass: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  },
  Business: {
    icon: <Briefcase size={16} />,
    gradient: "from-blue-400 to-cyan-600",
    activeClass: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  },
  Study: {
    icon: <BookOpen size={16} />,
    gradient: "from-amber-400 to-orange-500",
    activeClass: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  },
  Fitness: {
    icon: <Dumbbell size={16} />,
    gradient: "from-rose-400 to-pink-600",
    activeClass: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  },
  Life: {
    icon: <Heart size={16} />,
    gradient: "from-teal-400 to-cyan-600",
    activeClass: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
  },
};

function CategoriesContent() {
  const searchParams = useSearchParams();
  const [active, setActive] = useState<string>(CATEGORIES[0]);
  const [tab, setTab] = useState<"quotes" | "facts">("quotes");

  useEffect(() => {
    const cat = searchParams.get("cat");
    if (cat && CATEGORIES.includes(cat)) {
      setActive(cat);
    }
  }, [searchParams]);

  const filteredQuotes = quotesData.filter((q) => q.category === active);
  const filteredFacts = factsData.filter((f) => f.category === active);
  const config = categoryConfig[active];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8 animate-fade-up">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-2">
          🗂️ Categories
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Filter quotes and facts by category to find exactly what inspires you.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-3 mb-10 animate-fade-up" style={{ animationDelay: "0.1s" }}>
        {CATEGORIES.map((cat) => {
          const cfg = categoryConfig[cat];
          const isActive = cat === active;
          return (
            <button
              key={cat}
              onClick={() => { setActive(cat); setTab("quotes"); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                isActive
                  ? `bg-gradient-to-r ${cfg.gradient} text-white border-transparent shadow-md`
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              {cfg.icon}
              {cat}
            </button>
          );
        })}
      </div>

      {/* Active category header */}
      <div
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl mb-6 text-sm font-bold ${config.activeClass} animate-fade-in`}
      >
        {config.icon}
        {active}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 w-fit animate-fade-in">
        {(["quotes", "facts"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all duration-200 ${
              tab === t
                ? "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
          >
            {t === "quotes" ? `Quotes (${filteredQuotes.length})` : `Facts (${filteredFacts.length})`}
          </button>
        ))}
      </div>

      {/* Grid */}
      {tab === "quotes" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-in">
          {filteredQuotes.map((q) => (
            <QuoteCard key={q.id} {...q} />
          ))}
          {filteredQuotes.length === 0 && (
            <p className="col-span-full text-center text-gray-400 dark:text-gray-500 py-16">
              No quotes in this category yet.
            </p>
          )}
        </div>
      )}

      {tab === "facts" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-in">
          {filteredFacts.map((f) => (
            <FactCard key={f.id} {...f} />
          ))}
          {filteredFacts.length === 0 && (
            <p className="col-span-full text-center text-gray-400 dark:text-gray-500 py-16">
              No facts in this category yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default function CategoriesPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-24 text-gray-400">Loading categories…</div>}>
      <CategoriesContent />
    </Suspense>
  );
}
