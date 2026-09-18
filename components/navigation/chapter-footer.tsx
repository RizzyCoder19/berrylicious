"use client";

import React from "react";
import { TransitionLink } from "@/components/navigation/transition-provider";
import { ArrowRight, Sparkles, Compass, Utensils, Wand2, BookOpen, User, BarChart2, TrendingUp, Truck } from "lucide-react";

export interface ChapterInfo {
  id: string;
  path: string;
  number: string;
  name: string;
  tagline: string;
  worldName: string;
  badgeColor: string;
  bgGradient: string;
  accentColor: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const CHAPTERS: ChapterInfo[] = [
  {
    id: "home",
    path: "/",
    number: "01",
    name: "Opening",
    tagline: "Desserts, Coffee & Good Vibes",
    worldName: "Cream + Berry",
    badgeColor: "bg-[#FFF1E8] text-[#9E4663] border-[#E98FA8]/30",
    bgGradient: "from-[#FFF9F0] to-[#FFF1E8]",
    accentColor: "#9E4663",
    icon: Sparkles,
  },
  {
    id: "discover",
    path: "/discover",
    number: "02",
    name: "Discover",
    tagline: "Craving Selector & Flavour Spectrum",
    worldName: "Mint / Playful",
    badgeColor: "bg-[#E6F8F3] text-[#1D7462] border-[#BFE9DE]",
    bgGradient: "from-[#E6F8F3] to-[#D4F2E9]",
    accentColor: "#1D7462",
    icon: Compass,
  },
  {
    id: "menu",
    path: "/menu",
    number: "03",
    name: "Menu",
    tagline: "Italian Gelato, Waffles & London Cups",
    worldName: "Dark Cocoa",
    badgeColor: "bg-[#382D32] text-[#FFF9F0] border-[#9E4663]/40",
    bgGradient: "from-[#2A1D24] to-[#1F151B]",
    accentColor: "#E98FA8",
    icon: Utensils,
  },
  {
    id: "builder",
    path: "/builder",
    number: "04",
    name: "Dessert Builder",
    tagline: "Base → Flavour → Topping Live Studio",
    worldName: "Strawberry Cream",
    badgeColor: "bg-[#FFE8EF] text-[#B02E53] border-[#E98FA8]",
    bgGradient: "from-[#FFF2F5] to-[#FFE2EA]",
    accentColor: "#B02E53",
    icon: Wand2,
  },
  {
    id: "story",
    path: "/story",
    number: "05",
    name: "The Story",
    tagline: "Midnight Craving to Direct Fruit Supply",
    worldName: "Organic Midnight",
    badgeColor: "bg-[#251821] text-[#FFB8CC] border-[#9E4663]/40",
    bgGradient: "from-[#1A1017] to-[#120B10]",
    accentColor: "#FFB8CC",
    icon: BookOpen,
  },
  {
    id: "founder",
    path: "/founder",
    number: "06",
    name: "Meet Tanvi",
    tagline: "19-Year-Old Student Founder Vision",
    worldName: "Warm Parchment",
    badgeColor: "bg-[#F7EFE4] text-[#6E482B] border-[#DECBB5]",
    bgGradient: "from-[#FAF6EE] to-[#F2E7D5]",
    accentColor: "#6E482B",
    icon: User,
  },
  {
    id: "business",
    path: "/business",
    number: "07",
    name: "The Business",
    tagline: "Pitch Economics, Unit Margins & Pilot",
    worldName: "Cool Professional",
    badgeColor: "bg-[#EBF1F6] text-[#2A4861] border-[#C4D8E8]",
    bgGradient: "from-[#F4F7FA] to-[#E5ECF3]",
    accentColor: "#2A4861",
    icon: BarChart2,
  },
  {
    id: "investment",
    path: "/investment",
    number: "08",
    name: "Investment",
    tagline: "Shark Tank Ask: ₹20L for 10% Equity",
    worldName: "Deep Berry Climax",
    badgeColor: "bg-[#872A47] text-[#FFE8EF] border-[#FFB6C6]/30",
    bgGradient: "from-[#9E4663] to-[#5A172D]",
    accentColor: "#FFE8EF",
    icon: TrendingUp,
  },
  {
    id: "delivery",
    path: "/delivery",
    number: "09",
    name: "Delivery",
    tagline: "Website, Delivery Apps & Direct Orders",
    worldName: "Soft Blue",
    badgeColor: "bg-[#E8F4FC] text-[#1E567D] border-[#B8DDF2]",
    bgGradient: "from-[#EFF7FF] to-[#DBEEFD]",
    accentColor: "#1E567D",
    icon: Truck,
  },
];

export function ChapterFooter({
  currentPath,
  nextPath,
  nextLabel,
  customTagline,
  invertColors = false,
}: {
  currentPath: string;
  nextPath: string;
  nextLabel?: string;
  customTagline?: string;
  invertColors?: boolean;
}) {
  const nextChapter = CHAPTERS.find((c) => c.path === nextPath) || CHAPTERS[1];
  const NextIcon = nextChapter.icon;

  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 transition-colors ${
      invertColors ? "bg-black/30 border-t border-white/10" : "bg-white/60 border-t border-[#382D32]/10"
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs uppercase font-extrabold tracking-widest px-2.5 py-0.5 rounded-full border ${
                invertColors ? "bg-white/10 text-white/80 border-white/20" : "bg-[#FFF1E8] text-[#9E4663] border-[#E98FA8]/30"
              }`}>
                Next Chapter • {nextChapter.number}
              </span>
              <span className={`text-xs font-semibold ${invertColors ? "text-white/60" : "text-[#382D32]/60"}`}>
                {nextChapter.worldName}
              </span>
            </div>
            <h3 className={`text-2xl sm:text-3xl font-bold font-display ${invertColors ? "text-white" : "text-[#382D32]"}`}>
              {nextLabel || `Continue to ${nextChapter.name}`}
            </h3>
            <p className={`text-sm mt-1 max-w-lg ${invertColors ? "text-white/70" : "text-[#382D32]/70"}`}>
              {customTagline || nextChapter.tagline}
            </p>
          </div>

          <TransitionLink
            href={nextChapter.path}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 bg-gradient-to-r from-[#E98FA8] to-[#9E4663] text-white"
          >
            <NextIcon className="w-5 h-5 text-white/90" />
            <span>Enter {nextChapter.name}</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </TransitionLink>
        </div>

        {/* Mini Chapter Navigation Carousel / Quick Jump Bar */}
        <div className="mt-12 pt-8 border-t border-current/10">
          <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${invertColors ? "text-white/50" : "text-[#382D32]/50"}`}>
            Jump directly to any chapter:
          </p>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {CHAPTERS.map((chap) => {
              const isCurrent = chap.path === currentPath;
              const ChapIcon = chap.icon;
              return (
                <TransitionLink
                  key={chap.id}
                  href={chap.path}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all ${
                    isCurrent
                      ? "bg-[#9E4663] text-white shadow-sm ring-2 ring-[#E98FA8]"
                      : invertColors
                      ? "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
                      : "bg-[#FFF1E8]/80 text-[#382D32]/80 hover:bg-[#FFF1E8] hover:text-[#9E4663]"
                  }`}
                >
                  <ChapIcon className="w-3.5 h-3.5" />
                  <span>{chap.name}</span>
                </TransitionLink>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
