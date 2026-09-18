import React from "react";
import { BRAND } from "@/data/brand";
import { Sparkles, Apple, Heart } from "lucide-react";

export function BrandIntro() {
  const icons = [
    <Apple key="1" className="w-7 h-7 text-[#E98FA8]" />,
    <Sparkles key="2" className="w-7 h-7 text-[#9E4663]" />,
    <Heart key="3" className="w-7 h-7 text-[#E98FA8]" />,
  ];

  const colors = [
    "bg-[#FFF1E8] border-[#E98FA8]/40 hover:border-[#E98FA8]",
    "bg-[#EBF7F4] border-[#BFE9DE]/60 hover:border-[#BFE9DE]",
    "bg-[#F0F7FC] border-[#B8DDF2]/60 hover:border-[#B8DDF2]",
  ];

  return (
    <section className="py-20 bg-[#FFF9F0] relative overflow-hidden border-t border-[#E98FA8]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-display text-2xl sm:text-3xl text-[#9E4663] font-bold block mb-2">
            Home-Grown Goodness
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#382D32] mb-6">
            {BRAND.intro.heading}
          </h2>
          <p className="text-base sm:text-lg text-[#382D32]/80 leading-relaxed">
            {BRAND.intro.paragraph}
          </p>
        </div>

        {/* 3 Value Proposition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BRAND.intro.cards.map((card, idx) => (
            <div
              key={card.title}
              className={`rounded-3xl p-8 border-2 transition-all duration-300 card-shadow hover:-translate-y-1.5 ${colors[idx]}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-[#FFF9F0] flex items-center justify-center mb-6 shadow-sm border border-[#9E4663]/10">
                {icons[idx]}
              </div>
              <h3 className="text-2xl font-bold text-[#382D32] mb-3 flex items-center gap-2">
                <span>{card.title}</span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#9E4663] bg-[#FFF9F0] px-2.5 py-0.5 rounded-full border border-[#9E4663]/20">
                  0{idx + 1}
                </span>
              </h3>
              <p className="text-[#382D32]/80 leading-relaxed font-medium">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
