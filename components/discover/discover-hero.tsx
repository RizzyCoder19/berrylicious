"use client";

import React, { useEffect, useRef } from "react";
import { Compass, Sparkles, ArrowRight, TrendingUp, Coffee, Zap } from "lucide-react";
import { registerGSAP, gsap, prefersReducedMotion } from "@/lib/gsap-init";
import { TransitionLink } from "@/components/navigation/transition-provider";

export function DiscoverHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    registerGSAP();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll(".reveal-line");
        tl.fromTo(lines, { opacity: 0, y: 45 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 }, 0.1);
      }
      if (subRef.current) {
        tl.fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.5);
      }
      if (ctaRef.current) {
        tl.fromTo(ctaRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, 0.75);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex flex-col items-center justify-center pt-28 pb-16 overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #D4F5EC 0%, #E6FAF4 35%, #F2FFF9 60%, #E8F8F5 100%)",
      }}
    >
      {/* Ambient bokeh glows */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[#BFE9DE]/50 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-[#B8DDF2]/40 blur-[80px] pointer-events-none" />

      {/* Decorative floating fruit SVGs */}
      <svg
        className="absolute top-24 right-16 w-20 h-20 opacity-30 animate-berry-float pointer-events-none"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="40" cy="42" r="26" fill="#BFE9DE" />
        <circle cx="40" cy="22" r="12" fill="#2D9A80" opacity="0.6" />
        <ellipse cx="40" cy="22" rx="6" ry="14" fill="#2D9A80" opacity="0.4" />
        <circle cx="30" cy="48" r="8" fill="#E98FA8" opacity="0.7" />
        <circle cx="50" cy="50" r="7" fill="#E98FA8" opacity="0.5" />
        <circle cx="40" cy="55" r="6" fill="#9E4663" opacity="0.4" />
      </svg>

      <svg
        className="absolute bottom-20 left-16 w-16 h-16 opacity-25 pointer-events-none"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ transform: "rotate(-20deg)" }}
      >
        <path d="M30 5 L35 22 L52 22 L38 32 L43 49 L30 39 L17 49 L22 32 L8 22 L25 22 Z" fill="#BFE9DE" stroke="#2D9A80" strokeWidth="1.5" />
      </svg>

      {/* Giant watermark typography */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16vw] font-black text-[#1D7462]/[0.04] select-none pointer-events-none font-display whitespace-nowrap z-0"
        aria-hidden="true"
      >
        DISCOVER
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Chapter eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#BFE9DE] text-xs font-bold uppercase tracking-widest text-[#1D7462] mb-6 shadow-xs">
          <Compass className="w-3.5 h-3.5" />
          Chapter 02 — Discover
        </div>

        {/* Main Headline */}
        <div ref={headlineRef}>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight font-display leading-[1.1] mb-6">
            <span className="reveal-line block text-[#1D7462] opacity-0">You know that</span>
            <span className="reveal-line block text-[#382D32] opacity-0">inexplicable feeling</span>
            <span className="reveal-line block text-[#9E4663] italic opacity-0">...you need a dessert?</span>
          </h1>
        </div>

        <p ref={subRef} className="text-lg sm:text-xl text-[#382D32]/80 max-w-2xl mx-auto font-medium leading-relaxed mb-8 opacity-0">
          Berrylicious fills a very specific gap. Not a ₹10 corner ice cream, not a ₹400 patisserie.
          A joyful, premium-feeling, accessible dessert for real cravings — starting at ₹140.
        </p>

        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4 opacity-0">
          <a href="#craving" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm bg-[#1D7462] text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all active:scale-95">
            <Sparkles className="w-4 h-4" />
            Take the Craving Selector
          </a>
          <TransitionLink
            href="/menu"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm bg-white text-[#1D7462] border-2 border-[#BFE9DE] hover:border-[#1D7462] shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            See the Full Menu
            <ArrowRight className="w-4 h-4" />
          </TransitionLink>
        </div>

        {/* 3 Stat Pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-12 pt-8 border-t border-[#BFE9DE]/60">
          {[
            { icon: TrendingUp, label: "₹140 starting price", sub: "Accessible luxury" },
            { icon: Coffee, label: "9 dessert categories", sub: "Menu breadth" },
            { icon: Zap, label: "60% gross margin", sub: "Unit economics" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#BFE9DE] shadow-xs">
              <Icon className="w-4 h-4 text-[#1D7462]" />
              <div className="text-left">
                <p className="text-sm font-bold text-[#382D32]">{label}</p>
                <p className="text-[11px] text-[#382D32]/60 font-medium">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
