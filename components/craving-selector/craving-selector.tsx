"use client";

import React, { useState } from "react";
import { MENU_ITEMS, MoodTag, MenuItem } from "@/data/menu";
import { formatCurrency } from "@/lib/utils";
import {
  IllustratedDessertCup,
  IllustratedPancakes,
  IllustratedWaffle,
  IllustratedGelatoCone,
  IllustratedFruitBowl,
  StrawberrySticker,
  DoodleHeart,
} from "@/components/ui/berry-illustrations";
import { Heart, Sparkles, Check, ArrowRight } from "lucide-react";

interface MoodOption {
  id: MoodTag;
  label: string;
  sublabel: string;
  emoji: string;
  accent: string;
  bgActive: string;
}

const MOODS: MoodOption[] = [
  {
    id: "fruity",
    label: "Fruity",
    sublabel: "Tangy & Refreshing",
    emoji: "🍓",
    accent: "#E98FA8",
    bgActive: "bg-[#FFF1E8] border-[#E98FA8]",
  },
  {
    id: "creamy",
    label: "Creamy",
    sublabel: "Velvety & Dense",
    emoji: "🍦",
    accent: "#BFE9DE",
    bgActive: "bg-[#EBF7F4] border-[#7DBDAE]",
  },
  {
    id: "indulgent",
    label: "Indulgent",
    sublabel: "Warm & Chocolatey",
    emoji: "🍫",
    accent: "#9E4663",
    bgActive: "bg-[#F9E8EE] border-[#9E4663]",
  },
  {
    id: "fluffy",
    label: "Fluffy",
    sublabel: "Pillow-soft Bites",
    emoji: "🥞",
    accent: "#F4C287",
    bgActive: "bg-[#FFF6EB] border-[#E5A65A]",
  },
];

function ProductIllustration({ type }: { type?: MenuItem["illustrationType"] }) {
  switch (type) {
    case "pancake":
      return <IllustratedPancakes className="w-24 h-24 sm:w-28 sm:h-28" />;
    case "waffle":
      return <IllustratedWaffle className="w-24 h-24 sm:w-28 sm:h-28" />;
    case "gelato":
      return <IllustratedGelatoCone className="w-24 h-24 sm:w-28 sm:h-28" />;
    case "bowl":
    case "fruit":
      return <IllustratedFruitBowl className="w-24 h-24 sm:w-28 sm:h-28" />;
    case "strawberry":
    default:
      return <IllustratedDessertCup className="w-24 h-24 sm:w-28 sm:h-28" />;
  }
}

export function CravingSelector() {
  const [selectedMood, setSelectedMood] = useState<MoodTag>("fruity");
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter items matching the selected mood tag
  const filteredItems = MENU_ITEMS.filter((item) => item.tags.includes(selectedMood)).slice(0, 6);

  return (
    <section id="craving" className="py-20 bg-[#FFF9F0] relative overflow-hidden">
      {/* Background cute doodle */}
      <div className="absolute top-12 right-12 opacity-30 pointer-events-none hidden lg:block">
        <StrawberrySticker className="w-24 h-24 -rotate-12" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF1E8] border border-[#E98FA8]/50 text-xs font-bold uppercase tracking-wider text-[#9E4663] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Signature Craving Finder
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#382D32] mb-4">
            What’s your mood?
          </h2>
          <p className="text-[#382D32]/75 text-base sm:text-lg">
            Tap a craving to instantly reveal the treats handcrafted to satisfy that exact vibe.
          </p>
        </div>

        {/* Mood Selector Pills (Styleboard Category Icons) */}
        <div
          role="tablist"
          aria-label="Craving mood selector"
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-14"
        >
          {MOODS.map((mood) => {
            const isSelected = selectedMood === mood.id;
            return (
              <button
                key={mood.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedMood(mood.id)}
                className={`p-4 sm:p-5 rounded-3xl border-2 text-center transition-all duration-300 flex flex-col items-center justify-center gap-2 group cursor-pointer ${
                  isSelected
                    ? `${mood.bgActive} shadow-lg scale-105 ring-2 ring-[#9E4663]/20`
                    : "bg-[#FFFFFF] border-[#382D32]/10 hover:border-[#E98FA8] hover:bg-[#FFF9F0]"
                }`}
              >
                <span className="text-3xl sm:text-4xl transition-transform duration-300 group-hover:scale-110">
                  {mood.emoji}
                </span>
                <span className="font-bold text-lg text-[#382D32]">{mood.label}</span>
                <span className="text-xs text-[#382D32]/60 font-medium">{mood.sublabel}</span>
                {isSelected && (
                  <span className="mt-1 w-2 h-2 rounded-full bg-[#9E4663] animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Filtered Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => {
            const isFav = !!favorites[item.id];
            return (
              <div
                key={item.id}
                className="group relative bg-[#FFFFFF] rounded-3xl p-6 border border-[#382D32]/10 card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Top Badge & Favorite button */}
                <div className="flex items-center justify-between mb-4">
                  {item.bestseller ? (
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E98FA8] text-[#382D32] border border-[#9E4663]/30">
                      ★ Bestseller
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold text-[#382D32]/60 bg-[#FFF1E8]">
                      {item.subcategory || "Signature"}
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={(e) => toggleFavorite(item.id, e)}
                    aria-label={`Save ${item.name} to favorites`}
                    className="p-2 rounded-full hover:bg-[#FFF1E8] transition-colors text-[#9E4663]"
                  >
                    <Heart
                      className={`w-5 h-5 transition-transform duration-200 active:scale-125 ${
                        isFav ? "fill-[#E98FA8] text-[#9E4663]" : "text-[#382D32]/40"
                      }`}
                    />
                  </button>
                </div>

                {/* Product Illustration */}
                <div className="flex items-center justify-center my-4 py-2 transition-transform duration-300 group-hover:scale-105">
                  <ProductIllustration type={item.illustrationType} />
                </div>

                {/* Item Details */}
                <div>
                  <h3 className="text-xl font-bold text-[#382D32] mb-1.5 group-hover:text-[#9E4663] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#382D32]/70 line-clamp-2 mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-[#382D32]/10 flex items-center justify-between">
                    <div>
                      {item.price ? (
                        <div className="flex items-baseline gap-1">
                          <span className="text-xs text-[#382D32]/60 font-semibold">From</span>
                          <span className="text-2xl font-extrabold text-[#9E4663]">
                            {formatCurrency(item.price)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-[#382D32]/60 italic bg-[#FFF1E8] px-2.5 py-1 rounded-full">
                          {item.priceDisplay || "Price on request"}
                        </span>
                      )}
                    </div>

                    <a
                      href="#build"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#9E4663] group-hover:translate-x-1 transition-transform bg-[#FFF1E8] hover:bg-[#E98FA8] hover:text-[#382D32] px-3.5 py-2 rounded-full border border-[#E98FA8]/40"
                    >
                      <span>Customise</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom prompt to full menu */}
        <div className="mt-12 text-center">
          <a
            href="#menu"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#9E4663] hover:text-[#382D32] transition-colors group"
          >
            <span>Browse complete 30+ item menu with all flavour blends</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
