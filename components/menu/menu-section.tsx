"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { MENU_ITEMS, CATEGORIES, MenuItem } from "@/data/menu";
import { formatCurrency } from "@/lib/utils";
import {
  IllustratedDessertCup,
  IllustratedPancakes,
  IllustratedWaffle,
  IllustratedGelatoCone,
  IllustratedFruitBowl,
} from "@/components/ui/berry-illustrations";
import { Search, Sparkles, Check, Plus, Store, Sparkle } from "lucide-react";
import { WaveDivider } from "@/components/ui/section-dividers";
import { registerGSAP, gsap, prefersReducedMotion } from "@/lib/gsap-init";

function ProductVisual({ type }: { type?: MenuItem["illustrationType"] }) {
  switch (type) {
    case "pancake": return <IllustratedPancakes className="w-20 h-20 sm:w-24 sm:h-24" />;
    case "waffle":  return <IllustratedWaffle className="w-20 h-20 sm:w-24 sm:h-24" />;
    case "gelato":  return <IllustratedGelatoCone className="w-20 h-20 sm:w-24 sm:h-24" />;
    case "bowl":
    case "fruit":   return <IllustratedFruitBowl className="w-20 h-20 sm:w-24 sm:h-24" />;
    default:        return <IllustratedDessertCup className="w-20 h-20 sm:w-24 sm:h-24" />;
  }
}

export function MenuSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [tastingTray, setTastingTray] = useState<Record<string, number>>({});
  const [showTrayToast, setShowTrayToast] = useState<string | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  const filterTabs = [
    { id: "all", label: "All Treats", watermark: "DESSERT MARKET" },
    { id: "london-strawberry", label: "London Strawberry", watermark: "STRAWBERRY CUPS" },
    { id: "real-fruit", label: "Real Fruit", watermark: "NATURAL FRUITS" },
    { id: "gelato", label: "Gelato", watermark: "ITALIAN GELATO" },
    { id: "mini-pancakes", label: "Mini Pancakes", watermark: "DUTCH PANCAKES" },
    { id: "waffles", label: "Waffles", watermark: "BELGIAN WAFFLES" },
    { id: "churros", label: "Churros", watermark: "SPANISH CHURROS" },
    { id: "acai-bowl", label: "Acai Bowls", watermark: "SUPERFOOD BOWLS" },
    { id: "bakery", label: "Bakery & Cakes", watermark: "ARTISAN BAKERY" },
  ];

  const currentTab = filterTabs.find((t) => t.id === selectedCategory) || filterTabs[0];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === "all" ? true : item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.subcategory && item.subcategory.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // GSAP Category Transition: OLD CATEGORY -> TRANSITION -> NEW CATEGORY
  const handleCategoryChange = (tabId: string) => {
    if (tabId === selectedCategory) return;

    if (prefersReducedMotion() || !gridRef.current) {
      setSelectedCategory(tabId);
      return;
    }

    registerGSAP();
    const cards = gridRef.current.children;

    gsap.to(cards, {
      opacity: 0,
      scale: 0.95,
      y: -15,
      duration: 0.2,
      stagger: 0.02,
      ease: "power2.in",
      onComplete: () => {
        setSelectedCategory(tabId);
        // Watermark transition
        if (watermarkRef.current) {
          gsap.fromTo(
            watermarkRef.current,
            { x: 60, opacity: 0 },
            { x: 0, opacity: 0.04, duration: 0.6, ease: "power3.out" }
          );
        }
      },
    });
  };

  // Entrance animation for cards upon state update
  useEffect(() => {
    if (prefersReducedMotion() || !gridRef.current) return;
    registerGSAP();

    const cards = gridRef.current.children;
    gsap.fromTo(
      cards,
      { opacity: 0, scale: 0.93, y: 25 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.04, ease: "back.out(1.4)" }
    );
  }, [selectedCategory, searchQuery]);

  const handleAddToTray = (item: MenuItem) => {
    setTastingTray((prev) => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }));
    setShowTrayToast(`Added ${item.name} to Presentation Tray!`);
    setTimeout(() => setShowTrayToast(null), 2400);
  };

  const trayItemCount = Object.values(tastingTray).reduce((a, b) => a + b, 0);

  return (
    <>
      {/* DARK DESSERT MARKET CHAPTER */}
      <section id="menu" className="py-24 bg-[#211019] text-white relative overflow-hidden menu-ambient">
        {/* Toast Notification */}
        {showTrayToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#9E4663] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border-2 border-[#E98FA8]/60 animate-bounce">
            <span className="text-xl">🍓</span>
            <span className="text-sm font-bold">{showTrayToast}</span>
          </div>
        )}

        {/* Dynamic Watermark Typography */}
        <div
          ref={watermarkRef}
          className="absolute top-12 right-6 text-[10vw] font-black text-white/[0.04] select-none pointer-events-none font-sans leading-none tracking-widest whitespace-nowrap z-0"
          aria-hidden="true"
        >
          {currentTab.watermark}
        </div>

        {/* Ambient Market Spotlights */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#9E4663]/25 blur-[120px] pointer-events-none" aria-hidden="true" />
        <div className="absolute top-1/2 -right-32 w-[450px] h-[450px] rounded-full bg-[#E98FA8]/15 blur-[100px] pointer-events-none" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="px-3.5 py-1 rounded-full bg-[#E98FA8]/20 text-[#E98FA8] text-xs font-bold uppercase tracking-wider border border-[#E98FA8]/30 flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5" />
                  Dark Dessert Market
                </span>
                <span className="text-xs font-semibold text-white/60">35+ Confirmed Flavours</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#E98FA8] font-display">
                Meet the delicious chaos.
              </h2>
              <p className="text-white/70 text-base sm:text-lg max-w-xl mt-2 font-medium">
                Step inside our late-night dessert parlour — natural fruit sundaes, Italian gelato, and
                Belgian waffles handcrafted without fine-dining markup.
              </p>
            </div>

            {/* Search & Tray Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                <input
                  type="text"
                  placeholder="Search flavours, fruits, cocoa..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/10 border border-white/20 focus:border-[#E98FA8] focus:outline-none focus:ring-2 focus:ring-[#E98FA8]/30 text-sm font-medium text-white placeholder:text-white/40 backdrop-blur-md"
                />
              </div>
              {trayItemCount > 0 && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E98FA8] text-[#382D32] text-xs font-bold shadow-lg border border-white/30">
                  <span>Tray Demo ({trayItemCount})</span>
                  <button
                    onClick={() => setTastingTray({})}
                    className="text-[10px] uppercase font-extrabold hover:underline pl-1 cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Category Navigation Rails */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
            {filterTabs.map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleCategoryChange(tab.id)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#E98FA8] text-[#382D32] shadow-[0_0_20px_rgba(233,143,168,0.5)] scale-105"
                      : "bg-white/10 text-white/80 hover:text-white hover:bg-white/15 border border-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Product Cards Grid with animated GSAP Transitions */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 min-h-[460px]"
          >
            {filteredItems.map((item) => {
              const inTray = tastingTray[item.id] || 0;
              return (
                <div
                  key={item.id}
                  className="group relative bg-[#FFF9F0] text-[#382D32] rounded-3xl p-5 border border-[#E98FA8]/25 card-shadow-dark hover:card-shadow-dark-hover transition-all duration-300 hover:-translate-y-2 hover:border-[#E98FA8] flex flex-col justify-between"
                >
                  <div>
                    {/* Top Bar */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#9E4663] bg-[#FFF1E8] px-2.5 py-0.5 rounded-full border border-[#E98FA8]/30">
                        {item.subcategory || item.category.replace("-", " ")}
                      </span>
                      {item.bestseller && (
                        <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#E98FA8] text-[#382D32] px-2 py-0.5 rounded-full">
                          ★ Bestseller
                        </span>
                      )}
                    </div>

                    {/* Visual Frame */}
                    <div className="w-full aspect-square max-h-40 rounded-2xl bg-[#FFF1E8] border border-[#382D32]/5 flex items-center justify-center p-2 mb-4 group-hover:bg-[#FFE8DE] transition-colors">
                      <div className="group-hover:scale-110 transition-transform duration-300">
                        <ProductVisual type={item.illustrationType} />
                      </div>
                    </div>

                    {/* Details */}
                    <h3 className="text-lg font-bold text-[#382D32] group-hover:text-[#9E4663] transition-colors line-clamp-1 mb-1 font-display">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#382D32]/70 line-clamp-2 leading-relaxed mb-3 font-medium">
                      {item.description}
                    </p>

                    {item.sizes && item.sizes.length > 0 && (
                      <div className="flex items-center gap-1.5 mb-3">
                        <span className="text-[10px] font-bold uppercase text-[#382D32]/60">Sizes:</span>
                        {item.sizes.map((s) => (
                          <span
                            key={s.name}
                            className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FFF1E8] text-[#9E4663] border border-[#E98FA8]/30"
                          >
                            {s.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="pt-3 border-t border-[#382D32]/10 flex items-center justify-between">
                    <div>
                      {item.price ? (
                        <span className="text-xl font-extrabold text-[#9E4663] font-sans">
                          {formatCurrency(item.price)}
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-[#382D32]/60 italic bg-[#FFF1E8] px-2.5 py-1 rounded-full border border-[#E98FA8]/30">
                          {item.priceDisplay || "Price pending"}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAddToTray(item)}
                      aria-label={`Add ${item.name} to presentation tray`}
                      className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 active:scale-95 cursor-pointer ${
                        inTray > 0
                          ? "bg-[#9E4663] text-white"
                          : "bg-[#FFF1E8] text-[#9E4663] hover:bg-[#E98FA8] hover:text-[#382D32] border border-[#E98FA8]/40"
                      }`}
                    >
                      {inTray > 0 ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Tray ({inTray})</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Taste</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty state */}
          {filteredItems.length === 0 && (
            <div className="text-center py-16 bg-white/10 rounded-3xl border border-white/10 p-8">
              <p className="text-4xl mb-3">🍓</p>
              <h3 className="text-xl font-bold text-white mb-2">No flavour matched your search</h3>
              <p className="text-sm text-white/60 mb-4">
                Try searching for &apos;strawberry&apos;, &apos;mango&apos;, &apos;kunafa&apos;, or reset the filter.
              </p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                className="px-6 py-2.5 rounded-full bg-[#E98FA8] text-[#382D32] font-bold text-xs cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Wave from dark cocoa → vanilla builder */}
      <WaveDivider fromColor="#382D32" toColor="#FFF9F0" />
    </>
  );
}
