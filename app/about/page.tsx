import type { Metadata } from "next";
import { Zap, Target, Heart, Sparkles, Github } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — QuoteSpark",
  description:
    "Learn about QuoteSpark — your daily source of motivational quotes and interesting facts to spark creativity, curiosity, and growth.",
};

const features = [
  {
    icon: <Zap size={20} className="text-violet-600 dark:text-violet-400" />,
    title: "Daily Inspiration",
    desc: "Start every day with a fresh motivational quote or fascinating fact carefully curated from the world's greatest minds.",
  },
  {
    icon: <Target size={20} className="text-emerald-600 dark:text-emerald-400" />,
    title: "Focused Categories",
    desc: "Browse by Success, Motivation, Business, Study, Fitness, and Life to find content most relevant to your goals.",
  },
  {
    icon: <Heart size={20} className="text-rose-600 dark:text-rose-400" />,
    title: "Designed to Delight",
    desc: "A clean, modern interface with dark mode, smooth animations, and a one-click copy feature to share wisdom easily.",
  },
  {
    icon: <Sparkles size={20} className="text-amber-500 dark:text-amber-400" />,
    title: "Curated & Accurate",
    desc: "Every quote and fact is carefully selected and verified — no filler, just genuine sparks of knowledge and motivation.",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <div className="text-center py-14 sm:py-16 animate-fade-up">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-xl mb-6">
          <Zap size={28} className="text-white" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          About{" "}
          <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            QuoteSpark
          </span>
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          QuoteSpark is your daily companion for motivation and curiosity. We believe that the right words — or the right fact — can change the trajectory of your day, your week, or your life.
        </p>
      </div>

      {/* Mission */}
      <section className="mb-14 bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/30 rounded-2xl p-8 border border-violet-100 dark:border-violet-900/40 animate-fade-up" style={{ animationDelay: "0.1s" }}>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Our Mission</h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          In a world full of distractions, QuoteSpark offers a moment of clarity. Our mission is to surface timeless wisdom from history&apos;s greatest thinkers — alongside mind-blowing facts — and present them in a beautiful, distraction-free space. Whether you&apos;re seeking a spark of creativity, a push to keep going, or just something fascinating to share, QuoteSpark has you covered.
        </p>
      </section>

      {/* Features */}
      <section className="mb-14 animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8">What We Offer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center">
                {f.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-1">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mb-14 animate-fade-up" style={{ animationDelay: "0.3s" }}>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Built With</h2>
        <div className="flex flex-wrap gap-3">
          {["Next.js 15", "TypeScript", "Tailwind CSS", "Lucide React", "App Router"].map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl p-10 text-white animate-fade-up" style={{ animationDelay: "0.4s" }}>
        <h2 className="text-2xl font-bold mb-3">Ready to get inspired?</h2>
        <p className="mb-6 text-violet-100">
          Browse quotes and facts, discover categories, and spark your day!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-white text-violet-700 font-bold rounded-xl hover:bg-violet-50 transition-colors duration-200 shadow-md"
          >
            Explore Now
          </Link>
          <Link
            href="/categories"
            className="px-6 py-3 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-colors duration-200 border border-white/30"
          >
            View Categories
          </Link>
        </div>
      </section>
    </div>
  );
}
