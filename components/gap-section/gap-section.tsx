"use client";

import React from "react";
import { BRAND } from "@/data/brand";
import { Check, Sparkles } from "lucide-react";
import { FadeUp, StaggerChildren } from "@/components/ui/scroll-animations";

export function GapSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-[#E98FA8]/20">
      {/* Editorial Decorative Watermark Typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] font-display text-[18vw] font-black text-[#382D32] whitespace-nowrap z-0">
        POSITIONING
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeUp>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-display text-2xl sm:text-3xl text-[#9E4663] font-bold block mb-2">
              Market Positioning
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#382D32] mb-4 font-display">
              {BRAND.theGap.heading}
            </h2>
            <p className="text-base sm:text-lg text-[#382D32]/75 font-medium max-w-2xl mx-auto">
              {BRAND.theGap.subheading}
            </p>
          </div>
        </FadeUp>

        {/* 3-Pillar Positioning Spectrum with Stagger */}
        <StaggerChildren
          staggerDelay={0.15}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
        >
          {BRAND.theGap.pillars.map((pillar) => (
            <div
              key={pillar.label}
              className={`rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between ${
                pillar.active
                  ? "bg-[#FFF1E8] border-2 border-[#9E4663] shadow-xl relative lg:-translate-y-2 ring-4 ring-[#E98FA8]/20"
                  : "bg-[#FFF9F0]/60 border border-[#382D32]/10 card-shadow hover:bg-white"
              }`}
            >
              {pillar.active && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#9E4663] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5 whitespace-nowrap">
                  <Sparkles className="w-3.5 h-3.5 text-[#E98FA8]" />
                  <span>The Berrylicious Sweet Spot</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold text-[#382D32] font-display">{pillar.label}</h3>
                  <span
                    className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${
                      pillar.active
                        ? "bg-[#E98FA8] text-[#382D32]"
                        : "bg-[#382D32]/5 text-[#382D32]/60"
                    }`}
                  >
                    {pillar.tag}
                  </span>
                </div>

                <div className="w-12 h-1 bg-[#E98FA8] rounded-full my-4" />

                <ul className="space-y-3.5 my-6">
                  {pillar.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm font-medium">
                      {pillar.active ? (
                        <Check className="w-4 h-4 text-[#9E4663] shrink-0 mt-0.5" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#382D32]/40 shrink-0 mt-2" />
                      )}
                      <span className={pillar.active ? "text-[#382D32] font-semibold" : "text-[#382D32]/70"}>
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#382D32]/10 mt-auto">
                <p className="text-xs text-[#382D32]/60 font-medium">
                  {pillar.active
                    ? "Carefully priced for college students and families seeking genuine indulgence."
                    : pillar.label.includes("Basic")
                    ? "Traditional low-cost mass ice creams with generic flavouring."
                    : "Luxury French patisseries with ₹400+ per portion price barrier."}
                </p>
              </div>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
