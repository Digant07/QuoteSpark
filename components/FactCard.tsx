"use client";

import { useState } from "react";
import { Lightbulb, Copy, Check, Tag } from "lucide-react";

interface FactCardProps {
  id: number;
  text: string;
  category: string;
}

const categoryColors: Record<string, string> = {
  Success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  Motivation: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  Business: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Study: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  Fitness: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  Life: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
};

export default function FactCard({ text, category }: FactCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const colorClass = categoryColors[category] ?? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";

  return (
    <div className="group relative flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in">
      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl opacity-50 blur-2xl pointer-events-none" />

      {/* Icon */}
      <div className="mb-4">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-sm">
          <Lightbulb size={16} className="text-white" />
        </div>
      </div>

      {/* Fact text */}
      <p className="flex-1 text-gray-700 dark:text-gray-200 text-base leading-relaxed mb-5">
        {text}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 mt-auto">
        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${colorClass}`}>
          <Tag size={10} />
          {category}
        </span>

        <button
          onClick={handleCopy}
          aria-label="Copy fact"
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
            copied
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
              : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-amber-100 dark:hover:bg-amber-900/40 hover:text-amber-700 dark:hover:text-amber-300"
          }`}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
