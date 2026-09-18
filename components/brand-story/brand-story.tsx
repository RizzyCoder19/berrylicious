import React from "react";
import { BRAND } from "@/data/brand";
import { Clock, Moon, Film, Sparkles, Heart } from "lucide-react";

export function BrandStory() {
  const beatIcons = [
    <Moon key="1" className="w-5 h-5 text-[#9E4663]" />,
    <Film key="2" className="w-5 h-5 text-[#9E4663]" />,
    <Clock key="3" className="w-5 h-5 text-[#9E4663]" />,
    <Heart key="4" className="w-5 h-5 text-[#E98FA8]" />,
  ];

  return (
    <section id="story" className="py-24 bg-[#FFF1E8]/50 relative overflow-hidden border-t border-[#E98FA8]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-display text-2xl sm:text-3xl text-[#9E4663] font-bold block mb-2">
            The Origin
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#382D32] mb-4">
            {BRAND.brandStory.heading}
          </h2>
          <p className="text-base sm:text-lg text-[#382D32]/80 leading-relaxed font-medium">
            How a late-night dessert craving sparked the recipe for a vibrant startup.
          </p>
        </div>

        {/* Timeline Story Beats */}
        <div className="max-w-4xl mx-auto space-y-6">
          {BRAND.brandStory.beats.map((beat, idx) => (
            <div
              key={beat.badge}
              className={`rounded-3xl p-6 sm:p-8 border transition-all duration-300 card-shadow flex flex-col sm:flex-row items-start sm:items-center gap-6 ${
                idx === BRAND.brandStory.beats.length - 1
                  ? "bg-[#FFF9F0] border-2 border-[#9E4663]"
                  : "bg-white border-[#382D32]/10"
              }`}
            >
              <div className="flex items-center gap-3 shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF1E8] flex items-center justify-center border border-[#E98FA8]/40">
                  {beatIcons[idx]}
                </div>
                <div className="sm:hidden">
                  <span className="text-xs font-bold uppercase text-[#9E4663] block">
                    {beat.badge}
                  </span>
                  <span className="text-sm font-extrabold text-[#382D32]">{beat.time}</span>
                </div>
              </div>

              <div className="hidden sm:block shrink-0 w-32">
                <span className="text-xs font-bold uppercase tracking-wider text-[#9E4663] block">
                  {beat.badge}
                </span>
                <span className="text-base font-extrabold text-[#382D32]">{beat.time}</span>
              </div>

              <div className="border-l-0 sm:border-l sm:border-[#382D32]/10 sm:pl-6">
                <p className="text-base sm:text-lg text-[#382D32]/90 leading-relaxed font-medium">
                  {beat.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
