import Link from "next/link";
import {
  Trophy,
  Flame,
  Briefcase,
  BookOpen,
  Dumbbell,
  Heart,
} from "lucide-react";

interface CategoryCardProps {
  name: string;
  count: number;
  factsCount: number;
}

const categoryConfig: Record<string, { icon: React.ReactNode; gradient: string; ring: string }> = {
  Success: {
    icon: <Trophy size={22} />,
    gradient: "from-emerald-400 to-green-600",
    ring: "ring-emerald-200 dark:ring-emerald-800",
  },
  Motivation: {
    icon: <Flame size={22} />,
    gradient: "from-violet-500 to-indigo-600",
    ring: "ring-violet-200 dark:ring-violet-800",
  },
  Business: {
    icon: <Briefcase size={22} />,
    gradient: "from-blue-400 to-cyan-600",
    ring: "ring-blue-200 dark:ring-blue-800",
  },
  Study: {
    icon: <BookOpen size={22} />,
    gradient: "from-amber-400 to-orange-500",
    ring: "ring-amber-200 dark:ring-amber-800",
  },
  Fitness: {
    icon: <Dumbbell size={22} />,
    gradient: "from-rose-400 to-pink-600",
    ring: "ring-rose-200 dark:ring-rose-800",
  },
  Life: {
    icon: <Heart size={22} />,
    gradient: "from-teal-400 to-cyan-600",
    ring: "ring-teal-200 dark:ring-teal-800",
  },
};

export default function CategoryCard({ name, count, factsCount }: CategoryCardProps) {
  const config = categoryConfig[name] ?? {
    icon: <Trophy size={22} />,
    gradient: "from-gray-400 to-gray-600",
    ring: "ring-gray-200 dark:ring-gray-700",
  };

  return (
    <Link href={`/categories?cat=${encodeURIComponent(name)}`}>
      <div
        className={`group cursor-pointer bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden ring-2 ring-transparent hover:${config.ring} p-6 flex flex-col items-center text-center gap-4`}
      >
        {/* Icon */}
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300`}
        >
          {config.icon}
        </div>

        {/* Name */}
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{name}</h3>

        {/* Stats */}
        <div className="flex gap-3 text-xs text-gray-500 dark:text-gray-400">
          <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 rounded-full font-medium">
            {count} quotes
          </span>
          <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 rounded-full font-medium">
            {factsCount} facts
          </span>
        </div>
      </div>
    </Link>
  );
}
