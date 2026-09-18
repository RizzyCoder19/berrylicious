import React from "react";
import { BRAND } from "@/data/brand";
import { Apple, Milk, Sparkles, Heart, ArrowRight } from "lucide-react";

export function IngredientStory() {
  const stepIcons = [
    <Apple key="1" className="w-8 h-8 text-[#E98FA8]" />,
    <Milk key="2" className="w-8 h-8 text-[#B8DDF2]" />,
    <Sparkles key="3" className="w-8 h-8 text-[#BFE9DE]" />,
    <Heart key="4" className="w-8 h-8 text-[#9E4663]" />,
  ];

  return (
    <section className="py-24 bg-[#FFF1E8]/40 relative overflow-hidden border-t border-[#E98FA8]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-display text-2xl sm:text-3xl text-[#9E4663] font-bold block mb-2">
            Quality Philosophy
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#382D32] mb-4">
            {BRAND.ingredients.heading}
          </h2>
          <p className="text-base sm:text-lg text-[#382D32]/80 leading-relaxed font-medium">
            {BRAND.ingredients.copy}
          </p>
        </div>

        {/* 4-Step Ingredient Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {BRAND.ingredients.steps.map((item, idx) => (
            <div
              key={item.title}
              className="bg-white rounded-3xl p-6 border border-[#382D32]/10 card-shadow transition-all duration-300 hover:-translate-y-1 relative flex flex-col justify-between"
            >
              <div>
                <div className="w-16 h-16 rounded-2xl bg-[#FFF9F0] border border-[#9E4663]/15 flex items-center justify-center mb-6 shadow-sm">
                  {stepIcons[idx]}
                </div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-[#9E4663] mb-1">
                  Step 0{idx + 1}
                </div>
                <h3 className="text-xl font-bold text-[#382D32] mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#382D32]/75 leading-relaxed font-medium">
                  {item.detail}
                </p>
              </div>

              {idx < BRAND.ingredients.steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-1 border border-[#E98FA8] shadow-xs">
                  <ArrowRight className="w-3.5 h-3.5 text-[#9E4663]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
