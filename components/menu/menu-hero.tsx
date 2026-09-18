"use client";

import React, { useEffect, useRef } from "react";
import { Utensils, Sparkles, ArrowRight, Star } from "lucide-react";
import { registerGSAP, gsap, prefersReducedMotion } from "@/lib/gsap-init";

export function MenuPageHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    registerGSAP();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (titleRef.current) {
        const lines = titleRef.current.querySelectorAll(".reveal-line");
        tl.fromTo(lines, { opacity: 0, y: 50, skewY: 2 }, { opacity: 1, y: 0, skewY: 0, duration: 0.75, stagger: 0.18 }, 0.2);
      }
      if (subRef.current) {
        tl.fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.65);
      }
      if (pillsRef.current) {
        const pills = pillsRef.current.querySelectorAll(".pill-item");
        tl.fromTo(pills, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.07, ease: "back.out(1.5)" }, 0.85);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const categories = [
    "London Strawberry", "Real Fruit", "Italian Gelato", "Mini Pancakes",
    "Belgian Waffles", "Churros", "Açaí Bowls", "Bakery & Cakes"
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[85vh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0F0810 0%, #1A0D14 50%, #210E18 100%)",
      }}
    >
      {/* Radial berry glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#9E4663]/20 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E98FA8]/10 blur-[100px] pointer-events-none rounded-full" />

      {/* Decorative dessert SVG silhouettes */}
      <svg
        className="absolute right-8 top-1/4 w-24 h-24 opacity-15 pointer-events-none"
        viewBox="0 0 100 130"
        fill="none"
        aria-hidden="true"
      >
        {/* Gelato cone silhouette */}
        <ellipse cx="50" cy="35" rx="35" ry="30" fill="#E98FA8" />
        <ellipse cx="50" cy="22" rx="25" ry="20" fill="#FFB6C6" />
        <ellipse cx="50" cy="12" rx="15" ry="12" fill="#FFF1E8" />
        <circle cx="50" cy="5" r="5" fill="#E98FA8" />
        <path d="M25 65 L50 125 L75 65 Z" fill="#D4A373" />
        <path d="M25 65 L50 90 L75 65 Z" fill="#C28B58" opacity="0.5" />
      </svg>

      <svg
        className="absolute left-10 bottom-1/4 w-20 h-20 opacity-10 pointer-events-none"
        viewBox="0 0 80 80"
        fill="none"
        aria-hidden="true"
        style={{ transform: "rotate(15deg)" }}
      >
        {/* Waffle silhouette */}
        <rect x="10" y="10" width="60" height="50" rx="6" fill="#D4A373" />
        <line x1="10" y1="25" x2="70" y2="25" stroke="#C28B58" strokeWidth="3" />
        <line x1="10" y1="40" x2="70" y2="40" stroke="#C28B58" strokeWidth="3" />
        <line x1="25" y1="10" x2="25" y2="60" stroke="#C28B58" strokeWidth="3" />
        <line x1="40" y1="10" x2="40" y2="60" stroke="#C28B58" strokeWidth="3" />
        <line x1="55" y1="10" x2="55" y2="60" stroke="#C28B58" strokeWidth="3" />
        <circle cx="40" cy="55" r="10" fill="#E98FA8" opacity="0.8" />
        <circle cx="28" cy="55" r="7" fill="#9E4663" opacity="0.6" />
        <circle cx="52" cy="55" r="7" fill="#9E4663" opacity="0.6" />
      </svg>

      {/* Giant watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-black text-white/[0.03] select-none pointer-events-none font-display whitespace-nowrap z-0"
        aria-hidden="true"
      >
        MENU
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Chapter badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold uppercase tracking-widest text-[#FFB6C6] mb-6 shadow-lg">
          <Utensils className="w-3.5 h-3.5" />
          Chapter 03 — The Dessert Menu
        </div>

        {/* Headline */}
        <div ref={titleRef}>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight font-display leading-[1.0] mb-6">
            <span className="reveal-line block text-white opacity-0">Welcome to</span>
            <span className="reveal-line block text-[#E98FA8] opacity-0">The Dessert</span>
            <span className="reveal-line block text-[#FFB6C6] italic opacity-0">Lounge</span>
          </h1>
        </div>

        <p ref={subRef} className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto font-medium leading-relaxed mb-10 opacity-0">
          45+ artisanal desserts across 9 categories. Add to your tasting tray, explore by mood, and
          discover why gelato lovers keep coming back.
        </p>

        {/* Category Chips */}
        <div ref={pillsRef} className="flex flex-wrap justify-center gap-2.5 mb-8">
          {categories.map((cat) => (
            <span
              key={cat}
              className="pill-item px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/10 text-white/80 border border-white/15 backdrop-blur-sm opacity-0"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Stars Rating */}
        <div className="flex items-center justify-center gap-1.5 text-[#E98FA8]">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[#E98FA8]" />
          ))}
          <span className="text-xs text-white/60 ml-2 font-medium">Premium dessert experience</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs font-medium uppercase tracking-widest">Scroll to Explore</span>
        <div className="w-5 h-8 rounded-full border border-white/30 flex justify-center pt-2">
          <div className="w-1.5 h-2 rounded-full bg-white/60 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
