import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuoteSpark — Daily Motivation & Interesting Facts",
  description:
    "Discover daily motivational quotes and interesting facts across Success, Motivation, Business, Study, Fitness, and Life categories. Spark your day with QuoteSpark.",
  keywords: "motivational quotes, interesting facts, daily inspiration, success quotes",
  openGraph: {
    title: "QuoteSpark — Daily Motivation & Interesting Facts",
    description: "Spark your day with daily motivational quotes and fascinating facts.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen antialiased`}>
        <Navbar />
        <main>{children}</main>
        <footer className="mt-16 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
            <p>
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                QuoteSpark
              </span>
              . All rights reserved.
            </p>
            <p>Built with ❤️ to spark your day.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
