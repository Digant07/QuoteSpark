"use client";

import { useState, useEffect, useCallback } from "react";
import { Shuffle, Lightbulb, Search, X, Sparkles } from "lucide-react";
import QuoteCard from "@/components/QuoteCard";
import FactCard from "@/components/FactCard";
import CategoryCard from "@/components/CategoryCard";
import quotesData from "@/data/quotes.json";
import factsData from "@/data/facts.json";

const CATEGORIES = ["Success", "Motivation", "Business", "Study", "Fitness", "Life"];

export default function Home() {
  const [randomQuote, setRandomQuote] = useState(quotesData[0]);
  const [randomFact, setRandomFact] = useState(factsData[0]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<{ quotes: typeof quotesData; facts: typeof factsData } | null>(null);

  // Set random quote and fact on mount
  useEffect(() => {
    pickRandomQuote();
    pickRandomFact();
  }, []);

  const pickRandomQuote = useCallback(() => {
    const idx = Math.floor(Math.random() * quotesData.length);
    setRandomQuote(quotesData[idx]);
  }, []);

  const pickRandomFact = useCallback(() => {
    const idx = Math.floor(Math.random() * factsData.length);
    setRandomFact(factsData[idx]);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) {
      setSearchResults(null);
      return;
    }
    const q = search.toLowerCase();
    const quotes = quotesData.filter(
      (item) =>
        item.text.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
    const facts = factsData.filter(
      (item) =>
        item.text.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
    setSearchResults({ quotes, facts });
  };

  const clearSearch = () => {
    setSearch("");
    setSearchResults(null);
  };

  const categoryCounts = CATEGORIES.map((cat) => ({
    name: cat,
    count: quotesData.filter((q) => q.category === cat).length,
    factsCount: factsData.filter((f) => f.category === cat).length,
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* ── Hero ── */}
      <section className="relative text-center py-16 sm:py-20 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-violet-200 dark:bg-violet-900/30 rounded-full blur-3xl opacity-50 animate-pulse-slow" />
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-200 dark:bg-indigo-900/30 rounded-full blur-3xl opacity-50 animate-pulse-slow" />

        <div className="relative z-10 space-y-5 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-sm font-semibold mb-2">
            <Sparkles size={14} />
            Spark your day, every day
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Daily{" "}
            <span className="bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
              Motivation
            </span>{" "}
            &amp; Interesting Facts
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            Explore hundreds of curated quotes from the world&apos;s greatest minds and fascinating facts to fuel your curiosity — one spark at a time.
          </p>
        </div>
      </section>

      {/* ── Search Bar ── */}
      <section className="mb-12 animate-fade-up" style={{ animationDelay: "0.1s" }}>
        <form onSubmit={handleSearch} className="flex gap-3 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="search-input"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search quotes, facts, authors, categories…"
              className="w-full pl-11 pr-10 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-shadow text-sm shadow-sm"
            />
            {search && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold text-sm shadow-md hover:shadow-violet-300 dark:hover:shadow-violet-900 transition-all duration-200"
          >
            Search
          </button>
        </form>
      </section>

      {/* ── Search Results ── */}
      {searchResults && (
        <section className="mb-14 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Results for &quot;<span className="text-violet-600 dark:text-violet-400">{search}</span>&quot;
            </h2>
            <button onClick={clearSearch} className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1">
              <X size={14} /> Clear
            </button>
          </div>

          {searchResults.quotes.length === 0 && searchResults.facts.length === 0 && (
            <p className="text-center text-gray-400 dark:text-gray-500 py-10">No results found. Try a different keyword.</p>
          )}

          {searchResults.quotes.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
                Quotes ({searchResults.quotes.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {searchResults.quotes.map((q) => (
                  <QuoteCard key={q.id} {...q} />
                ))}
              </div>
            </div>
          )}

          {searchResults.facts.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
                Facts ({searchResults.facts.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {searchResults.facts.map((f) => (
                  <FactCard key={f.id} {...f} />
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ── Random Picks ── */}
      {!searchResults && (
        <>
          <section className="mb-14 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">✨ Today&apos;s Spark</h2>
              <div className="flex gap-3">
                <button
                  id="random-quote-btn"
                  onClick={pickRandomQuote}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white text-sm font-semibold shadow-md hover:shadow-violet-300 dark:hover:shadow-violet-900 transition-all duration-200"
                >
                  <Shuffle size={15} /> Random Quote
                </button>
                <button
                  id="random-fact-btn"
                  onClick={pickRandomFact}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white text-sm font-semibold shadow-md hover:shadow-amber-300 dark:hover:shadow-amber-900 transition-all duration-200"
                >
                  <Lightbulb size={15} /> Random Fact
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <QuoteCard key={`q-${randomQuote.id}`} {...randomQuote} />
              <FactCard key={`f-${randomFact.id}`} {...randomFact} />
            </div>
          </section>

          {/* ── Categories ── */}
          <section className="mb-14 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">🗂️ Browse by Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {categoryCounts.map((cat) => (
                <CategoryCard key={cat.name} {...cat} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
