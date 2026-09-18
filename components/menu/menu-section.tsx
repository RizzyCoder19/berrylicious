"use client";

import React, { useState, useMemo } from "react";
import { MENU_ITEMS, CATEGORIES, MenuCategory, MenuItem } from "@/data/menu";
import { formatCurrency } from "@/lib/utils";
import {
  IllustratedDessertCup,
  IllustratedPancakes,
  IllustratedWaffle,
  IllustratedGelatoCone,
  IllustratedFruitBowl,
  DoodleHeart,
  BadgePill,
} from "@/components/ui/berry-illustrations";
import { Search, Sparkles, Check, Heart, Plus, Info } from "lucide-react";

function ProductVisual({ type }: { type?: MenuItem["illustrationType"] }) {
  switch (type) {
    case "pancake":
      return <IllustratedPancakes className="w-20 h-20 sm:w-24 sm:h-24" />;
    case "waffle":
      return <IllustratedWaffle className="w-20 h-20 sm:w-24 sm:h-24" />;
    case "gelato":
      return <IllustratedGelatoCone className="w-20 h-20 sm:w-24 sm:h-24" />;
    case "bowl":
    case "fruit":
      return <IllustratedFruitBowl className="w-20 h-20 sm:w-24 sm:h-24" />;
    case "cake":
      return <IllustratedDessertCup className="w-20 h-20 sm:w-24 sm:h-24" />;
    case "strawberry":
    default:
      return <IllustratedDessertCup className="w-20 h-20 sm:w-24 sm:h-24" />;
  }
}

export function MenuSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [tastingTray, setTastingTray] = useState<Record<string, number>>({});
  const [showTrayToast, setShowTrayToast] = useState<string | null>(null);

  const filterTabs = [
    { id: "all", label: "All Treats" },
    { id: "london-strawberry", label: "London Strawberry" },
    { id: "real-fruit", label: "Real Fruit" },
    { id: "gelato", label: "Gelato" },
    { id: "mini-pancakes", label: "Mini Pancakes" },
    { id: "waffles", label: "Waffles" },
    { id: "churros", label: "Churros" },
    { id: "acai-bowl", label: "Acai Bowls" },
    { id: "bakery", label: "Bakery & Cakes" },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" ? true : item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.subcategory && item.subcategory.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleAddToTray = (item: MenuItem) => {
    setTastingTray((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));
    setShowTrayToast(`Added ${item.name} to Presentation Tray!`);
    setTimeout(() => {
      setShowTrayToast(null);
    }, 2400);
  };

  const trayItemCount = Object.values(tastingTray).reduce((a, b) => a + b, 0);

  return (
    <section id="menu" className="py-24 bg-[#FFF1E8]/50 relative overflow-hidden">
      {/* Toast Notification */}
      {showTrayToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#382D32] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-[#E98FA8] animate-bounce">
          <span className="text-xl">🍓</span>
          <span className="text-sm font-bold">{showTrayToast}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <BadgePill text="Handcrafted Daily" color="cream" />
              <span className="text-xs font-semibold text-[#9E4663]">35+ Confirmed Flavours</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#9E4663] font-display">
              Meet the delicious chaos.
            </h2>
            <p className="text-[#382D32]/75 text-base sm:text-lg max-w-xl mt-2 font-medium">
              Every recipe is designed for pure joy — authentic natural fruit, rich dairy, and
              crispy warm indulgence without fine-dining markup.
            </p>
          </div>

          {/* Search Bar & Demo Tray Badge */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#382D32]/40" />
              <input
                type="text"
                placeholder="Search flavours, fruits, cocoa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#9E4663]/20 focus:border-[#9E4663] focus:outline-none focus:ring-2 focus:ring-[#E98FA8]/30 text-sm font-medium text-[#382D32]"
              />
            </div>

            {trayItemCount > 0 && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E98FA8] text-[#382D32] text-xs font-bold shadow-sm">
                <span>Tray Demo ({trayItemCount})</span>
                <button
                  onClick={() => setTastingTray({})}
                  className="text-[10px] uppercase font-extrabold hover:underline pl-1"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {filterTabs.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#9E4663] text-white shadow-md scale-105"
                    : "bg-white text-[#382D32]/75 hover:text-[#9E4663] hover:bg-[#FFF1E8] border border-[#382D32]/10"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const inTray = tastingTray[item.id] || 0;
            return (
              <div
                key={item.id}
                className="group relative bg-[#FFFFFF] rounded-3xl p-5 border border-[#382D32]/10 card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Category & Tag */}
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

                  {/* Product Visual Container */}
                  <div className="w-full aspect-square max-h-40 rounded-2xl bg-[#FFF9F0] border border-[#382D32]/5 flex items-center justify-center p-2 mb-4 group-hover:bg-[#FFF1E8] transition-colors">
                    <ProductVisual type={item.illustrationType} />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-[#382D32] group-hover:text-[#9E4663] transition-colors line-clamp-1 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#382D32]/70 line-clamp-2 leading-relaxed mb-3">
                    {item.description}
                  </p>

                  {/* Sizes (if available, e.g. Waffles or Bakery) */}
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

                {/* Card Footer: Price & Action */}
                <div className="pt-3 border-t border-[#382D32]/10 flex items-center justify-between">
                  <div>
                    {item.price ? (
                      <span className="text-xl font-extrabold text-[#9E4663]">
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

        {/* Empty state when search produces no results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#382D32]/10 p-8">
            <p className="text-4xl mb-3">🍓</p>
            <h3 className="text-xl font-bold text-[#382D32] mb-2">No flavour matched your search</h3>
            <p className="text-sm text-[#382D32]/70 mb-4">
              Try searching for &apos;strawberry&apos;, &apos;mango&apos;, &apos;kunafa&apos;, or reset the filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="px-6 py-2.5 rounded-full bg-[#E98FA8] text-[#382D32] font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
