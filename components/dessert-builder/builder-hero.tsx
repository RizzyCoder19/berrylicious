"use client";

import React, { useEffect, useRef } from "react";
import { Wand2, Sparkles, ArrowRight, Layers, Palette } from "lucide-react";
import { registerGSAP, gsap, prefersReducedMotion } from "@/lib/gsap-init";

const STAGES = [
  { step: "01", name: "BASE", desc: "Gelato · Real Fruit · Pancake · Waffle", color: "#E98FA8" },
  { step: "02", name: "FLAVOUR", desc: "Strawberry · Chocolate · Mango · More", color: "#9E4663" },
  { step: "03", name: "TOPPING", desc: "Ferrero · Oreo · Sprinkles · Caramel", color: "#B02E53" },
  { step: "04", name: "CREATION", desc: "Your live-priced masterpiece awaits", color: "#7A1535" },
];

export function BuilderHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const stagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    registerGSAP();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (titleRef.current) {
        const lines = titleRef.current.querySelectorAll(".reveal-line");
        tl.fromTo(lines, { opacity: 0, y: 45 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 }, 0.2);
      }
      if (stagesRef.current) {
        const stages = stagesRef.current.querySelectorAll(".stage-item");
        tl.fromTo(
          stages,
          { opacity: 0, x: -30, scale: 0.9 },
          { opacity: 1, x: 0, scale: 1, duration: 0.5, stagger: 0.12, ease: "back.out(1.4)" },
          0.65
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[88vh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #FFE0EA 0%, #FFD0E0 40%, #FFE8F0 70%, #FFF8FA 100%)",
      }}
    >
      {/* Ambient glows */}
      <div className="absolute top-20 right-10 w-80 h-80 rounded-full bg-[#E98FA8]/40 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-[#FFB6C6]/50 blur-[80px] pointer-events-none" />

      {/* Decorative dessert SVG stage elements */}
      <svg
        className="absolute left-8 top-1/4 w-28 h-28 opacity-20 animate-berry-float pointer-events-none"
        viewBox="0 0 100 120"
        fill="none"
        aria-hidden="true"
        style={{ animationDelay: "1s" }}
      >
        {/* Dessert cup with layers */}
        <rect x="20" y="60" width="60" height="50" rx="10" fill="#E98FA8" />
        <ellipse cx="50" cy="60" rx="30" ry="12" fill="#FFB6C6" />
        <ellipse cx="50" cy="48" rx="22" ry="10" fill="#FFF1E8" />
        <ellipse cx="50" cy="38" rx="16" ry="8" fill="#E98FA8" />
        <circle cx="50" cy="30" r="8" fill="#9E4663" />
        {/* Drizzle */}
        <path d="M35 65 Q40 55 45 65 Q50 75 55 65" stroke="#9E4663" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Topping dots */}
        <circle cx="38" cy="58" r="4" fill="#382D32" opacity="0.7" />
        <circle cx="58" cy="56" r="4" fill="#382D32" opacity="0.7" />
        <circle cx="48" cy="54" r="3" fill="#382D32" opacity="0.5" />
      </svg>

      <svg
        className="absolute right-12 bottom-1/3 w-24 h-24 opacity-15 pointer-events-none"
        viewBox="0 0 80 80"
        fill="none"
        aria-hidden="true"
        style={{ transform: "rotate(30deg)" }}
      >
        {/* Sparkle star */}
        <path d="M40 5 L44 34 L73 40 L44 46 L40 75 L36 46 L7 40 L36 34 Z" fill="#E98FA8" />
        <path d="M40 15 L43 30 L58 32 L45 40 L48 55 L40 45 L32 55 L35 40 L22 32 L37 30 Z" fill="#FFB6C6" opacity="0.5" />
      </svg>

      {/* Giant watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16vw] font-black text-[#9E4663]/[0.05] select-none pointer-events-none font-display whitespace-nowrap z-0"
        aria-hidden="true"
      >
        BUILD
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Chapter badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#9E4663]/10 border border-[#E98FA8] text-xs font-bold uppercase tracking-widest text-[#9E4663] mb-6 shadow-xs">
          <Wand2 className="w-3.5 h-3.5" />
          Chapter 04 — Dessert Builder Studio
        </div>

        {/* Headline */}
        <div ref={titleRef}>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight font-display leading-[1.05] mb-6">
            <span className="reveal-line block text-[#9E4663] opacity-0">Build Your</span>
            <span className="reveal-line block text-[#382D32] opacity-0">Dream</span>
            <span className="reveal-line block text-[#E98FA8] italic opacity-0">Dessert.</span>
          </h1>
        </div>

        {/* Build Stage Flow */}
        <div ref={stagesRef} className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-10">
          {STAGES.map((stage, i) => (
            <React.Fragment key={stage.step}>
              <div
                className="stage-item flex flex-col items-center px-4 py-3 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-white/60 shadow-sm opacity-0"
                style={{ borderColor: `${stage.color}30` }}
              >
                <span className="text-[10px] font-extrabold uppercase tracking-widest mb-1" style={{ color: stage.color }}>
                  Step {stage.step}
                </span>
                <span className="text-base font-black text-[#382D32] font-display">{stage.name}</span>
                <span className="text-[10px] text-[#382D32]/60 font-medium mt-0.5">{stage.desc}</span>
              </div>
              {i < STAGES.length - 1 && (
                <span className="stage-item text-[#9E4663] font-black text-xl opacity-0">→</span>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-[#382D32]/70">
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#9E4663]" />
            <span className="font-semibold">Live price preview</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-[#9E4663]" />
            <span className="font-semibold">Compatible combinations only</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#9E4663]" />
            <span className="font-semibold">GSAP-animated assembly</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#9E4663]/60">
        <span className="text-xs font-medium uppercase tracking-widest">Scroll to Build</span>
        <div className="w-5 h-8 rounded-full border border-[#E98FA8] flex justify-center pt-2">
          <div className="w-1.5 h-2 rounded-full bg-[#E98FA8] animate-bounce" />
        </div>
      </div>
    </section>
  );
}
