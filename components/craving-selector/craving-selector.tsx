"use client";

import React, { useState, useRef, useEffect } from "react";
import { MENU_ITEMS, MoodTag, MenuItem } from "@/data/menu";
import { formatCurrency } from "@/lib/utils";
import {
  IllustratedDessertCup,
  IllustratedPancakes,
  IllustratedWaffle,
  IllustratedGelatoCone,
  IllustratedFruitBowl,
  StrawberrySticker,
  DoodleSparkle,
} from "@/components/ui/berry-illustrations";
import { Heart, Sparkles, ArrowRight } from "lucide-react";
import { registerGSAP, gsap, prefersReducedMotion } from "@/lib/gsap-init";

interface MoodOption {
  id: MoodTag;
  label: string;
  sublabel: string;
  emoji: string;
  bgActive: string;
  pill: string;
  accentColor: string;
  bgAtmosphere: string;
}

const MOODS: MoodOption[] = [
  {
    id: "fruity",
    label: "Fruity",
    sublabel: "Tangy & Refreshing",
    emoji: "🍓",
    bgActive: "bg-[#FFE4EC] border-[#E98FA8] shadow-[0_8px_25px_rgba(233,143,168,0.35)]",
    pill: "bg-[#E98FA8] text-[#382D32]",
    accentColor: "#E98FA8",
    bgAtmosphere: "from-[#FFE8F0] via-[#FFF1E8] to-[#FFF9F0]",
  },
  {
    id: "creamy",
    label: "Creamy",
    sublabel: "Velvety & Dense",
    emoji: "🍦",
    bgActive: "bg-[#D5F0EB] border-[#7DBDAE] shadow-[0_8px_25px_rgba(125,189,174,0.35)]",
    pill: "bg-[#BFE9DE] text-[#1D6B5A]",
    accentColor: "#7DBDAE",
    bgAtmosphere: "from-[#E6F8F4] via-[#EEF9F6] to-[#FFF9F0]",
  },
  {
    id: "indulgent",
    label: "Indulgent",
    sublabel: "Warm & Chocolatey",
    emoji: "🍫",
    bgActive: "bg-[#F3D9E4] border-[#9E4663] shadow-[0_8px_25px_rgba(158,70,99,0.3)]",
    pill: "bg-[#9E4663] text-white",
    accentColor: "#9E4663",
    bgAtmosphere: "from-[#FBEBF2] via-[#FFF1E8] to-[#FFF9F0]",
  },
  {
    id: "fluffy",
    label: "Fluffy",
    sublabel: "Pillow-soft Bites",
    emoji: "🥞",
    bgActive: "bg-[#FFF3E0] border-[#E5A65A] shadow-[0_8px_25px_rgba(229,166,90,0.3)]",
    pill: "bg-[#F4C287] text-[#5C3A0A]",
    accentColor: "#E5A65A",
    bgAtmosphere: "from-[#FFF6E9] via-[#FFF3EB] to-[#FFF9F0]",
  },
];

function ProductIllustration({ type }: { type?: MenuItem["illustrationType"] }) {
  switch (type) {
    case "pancake": return <IllustratedPancakes className="w-24 h-24 sm:w-28 sm:h-28" />;
    case "waffle":  return <IllustratedWaffle className="w-24 h-24 sm:w-28 sm:h-28" />;
    case "gelato":  return <IllustratedGelatoCone className="w-24 h-24 sm:w-28 sm:h-28" />;
    case "bowl":
    case "fruit":   return <IllustratedFruitBowl className="w-24 h-24 sm:w-28 sm:h-28" />;
    default:        return <IllustratedDessertCup className="w-24 h-24 sm:w-28 sm:h-28" />;
  }
}

export function CravingSelector() {
  const [selectedMood, setSelectedMood] = useState<MoodTag>("fruity");
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const atmosphereRef = useRef<HTMLDivElement>(null);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredItems = MENU_ITEMS.filter((item) => item.tags.includes(selectedMood)).slice(0, 6);
  const activeMood = MOODS.find((m) => m.id === selectedMood)!;

  const handleMoodSelect = (moodId: MoodTag) => {
    if (moodId === selectedMood) return;

    if (prefersReducedMotion() || !cardsContainerRef.current) {
      setSelectedMood(moodId);
      return;
    }

    registerGSAP();

    // GSAP Animate Out -> Switch Mood -> Animate In
    const cards = cardsContainerRef.current.children;
    gsap.to(cards, {
      opacity: 0,
      y: -20,
      scale: 0.95,
      duration: 0.22,
      stagger: 0.03,
      ease: "power2.in",
      onComplete: () => {
        setSelectedMood(moodId);
        // Watermark bounce
        if (watermarkRef.current) {
          gsap.fromTo(
            watermarkRef.current,
            { scale: 0.9, opacity: 0 },
            { scale: 1, opacity: 0.05, duration: 0.5, ease: "back.out(1.5)" }
          );
        }
      },
    });
  };

  // GSAP Entrance after state change
  useEffect(() => {
    if (prefersReducedMotion() || !cardsContainerRef.current) return;
    registerGSAP();

    const cards = cardsContainerRef.current.children;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 35, scale: 0.92 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.06, ease: "back.out(1.4)" }
    );
  }, [selectedMood]);

  return (
    <section
      id="craving"
      className="py-24 relative overflow-hidden transition-colors duration-700 bg-[#FFF1E8]"
    >
      {/* Dynamic Atmosphere Background Gradient */}
      <div
        ref={atmosphereRef}
        className={`absolute inset-0 bg-gradient-to-b ${activeMood.bgAtmosphere} transition-all duration-700 pointer-events-none opacity-80`}
      />

      {/* Dynamic Watermark Typography */}
      <div
        ref={watermarkRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[16vw] font-black uppercase text-[#382D32] opacity-[0.05] pointer-events-none select-none tracking-widest whitespace-nowrap z-0"
        aria-hidden="true"
      >
        {activeMood.label}
      </div>

      {/* Bokeh decorative orbs */}
      <div
        className="absolute top-8 right-8 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-colors duration-700 opacity-30"
        style={{ backgroundColor: activeMood.accentColor }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-8 left-8 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-colors duration-700 opacity-25"
        style={{ backgroundColor: activeMood.accentColor }}
        aria-hidden="true"
      />
      <div className="absolute top-12 right-12 opacity-20 pointer-events-none hidden lg:block" aria-hidden="true">
        <StrawberrySticker className="w-24 h-24 -rotate-12" />
      </div>
      <div className="absolute bottom-16 left-16 opacity-15 pointer-events-none hidden lg:block" aria-hidden="true">
        <DoodleSparkle className="w-16 h-16 text-[#9E4663]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-[#E98FA8]/50 text-xs font-bold uppercase tracking-wider text-[#9E4663] mb-3 backdrop-blur-sm shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            Signature Craving Playground
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#382D32] mb-4 font-display">
            What&apos;s your mood?
          </h2>
          <p className="text-[#382D32]/75 text-base sm:text-lg font-medium">
            Tap a craving to instantly shift the vibe and reveal treats handcrafted to satisfy it.
          </p>
        </div>

        {/* Mood Selector Pills */}
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
                onClick={() => handleMoodSelect(mood.id)}
                className={`p-4 sm:p-5 rounded-3xl border-2 text-center transition-all duration-300 flex flex-col items-center justify-center gap-2 group cursor-pointer ${
                  isSelected
                    ? `${mood.bgActive} scale-105 ring-2 ring-[#9E4663]/20`
                    : "bg-white/80 border-[#382D32]/10 hover:border-[#E98FA8] hover:bg-white backdrop-blur-sm shadow-xs"
                }`}
              >
                <span className="text-3xl sm:text-4xl transition-transform duration-300 group-hover:scale-110 select-none">
                  {mood.emoji}
                </span>
                <span className="font-bold text-lg text-[#382D32] font-display">{mood.label}</span>
                <span className="text-xs text-[#382D32]/60 font-medium">{mood.sublabel}</span>
                {isSelected && (
                  <span className={`mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-2xs ${mood.pill}`}>
                    Active Vibe
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Filtered Product Cards Container with GSAP Animated Switch */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 min-h-[420px]"
        >
          {filteredItems.map((item) => {
            const isFav = !!favorites[item.id];
            return (
              <div
                key={item.id}
                className="group relative bg-white/95 backdrop-blur-xs rounded-3xl p-6 border-2 border-[#382D32]/6 card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
              >
                {/* Top Badge & Favorite */}
                <div className="flex items-center justify-between mb-4">
                  {item.bestseller ? (
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E98FA8] text-[#382D32] border border-[#9E4663]/30 shadow-2xs">
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

                {/* Details */}
                <div>
                  <h3 className="text-xl font-bold text-[#382D32] mb-1.5 group-hover:text-[#9E4663] transition-colors font-display">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#382D32]/70 line-clamp-2 mb-4 leading-relaxed font-medium">
                    {item.description}
                  </p>
                  <div className="pt-3 border-t border-[#382D32]/10 flex items-center justify-between">
                    <div>
                      {item.price ? (
                        <div className="flex items-baseline gap-1">
                          <span className="text-xs text-[#382D32]/60 font-semibold">From</span>
                          <span className="text-2xl font-extrabold text-[#9E4663] font-sans">
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

        {/* Bottom prompt */}
        <div className="mt-14 text-center">
          <a
            href="#menu"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#9E4663] hover:text-[#382D32] transition-colors group bg-white/80 px-6 py-3 rounded-full border border-[#E98FA8]/40 shadow-xs"
          >
            <span>Browse complete 35+ item menu with all flavour blends</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
