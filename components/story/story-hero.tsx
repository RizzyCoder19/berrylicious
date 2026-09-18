"use client";

import React, { useEffect, useRef } from "react";
import { BookOpen, Moon, Film, Smartphone, Sparkles } from "lucide-react";
import { registerGSAP, gsap, prefersReducedMotion } from "@/lib/gsap-init";

const BEATS = [
  { time: "11:48 PM", icon: Moon, label: "Late Night", color: "#A0C4FF" },
  { time: "11:54 PM", icon: Film, label: "Gelato Reel", color: "#E98FA8" },
  { time: "Midnight", icon: Smartphone, label: "The Craving", color: "#FFB6C6" },
  { time: "Always", icon: Sparkles, label: "Berrylicious", color: "#BFE9DE" },
];

export function StoryHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const beatsRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    registerGSAP();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (moonRef.current) {
        tl.fromTo(moonRef.current, { scale: 0.6, opacity: 0, y: 30 }, { scale: 1, opacity: 1, y: 0, duration: 1, ease: "back.out(1.4)" }, 0);
      }
      if (titleRef.current) {
        const lines = titleRef.current.querySelectorAll(".reveal-line");
        tl.fromTo(lines, { opacity: 0, y: 45 }, { opacity: 1, y: 0, duration: 0.75, stagger: 0.18 }, 0.3);
      }
      if (beatsRef.current) {
        const items = beatsRef.current.querySelectorAll(".beat-item");
        tl.fromTo(
          items,
          { opacity: 0, y: 20, scale: 0.85 },
          { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.15, ease: "back.out(1.5)" },
          0.9
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0A0612 0%, #12080F 50%, #1A0D14 100%)" }}
    >
      {/* Stars field */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 70}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.1,
            }}
          />
        ))}
      </div>

      {/* Moon orb */}
      <div
        ref={moonRef}
        className="absolute top-20 right-20 w-28 h-28 rounded-full bg-gradient-to-br from-[#FFE8B0] via-[#FFD080] to-[#E8B860] shadow-[0_0_60px_rgba(255,210,100,0.4)] opacity-0"
        aria-hidden="true"
      >
        {/* Moon craters */}
        <div className="absolute top-5 right-6 w-6 h-6 rounded-full bg-black/10" />
        <div className="absolute bottom-7 left-5 w-4 h-4 rounded-full bg-black/10" />
        <div className="absolute top-8 left-8 w-3 h-3 rounded-full bg-black/08" />
      </div>

      {/* Berry pink glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-[#9E4663]/25 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-64 h-64 rounded-full bg-[#4A1A35]/50 blur-[80px] pointer-events-none" />

      {/* Giant watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/[0.025] select-none pointer-events-none font-display whitespace-nowrap z-0"
        aria-hidden="true"
      >
        MIDNIGHT
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Chapter badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold uppercase tracking-widest text-[#FFB6C6] mb-6 shadow-lg">
          <BookOpen className="w-3.5 h-3.5" />
          Chapter 05 — The Midnight Story
        </div>

        {/* Headline */}
        <div ref={titleRef}>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight font-display leading-[1.05] mb-6">
            <span className="reveal-line block text-white opacity-0">It started</span>
            <span className="reveal-line block text-[#E98FA8] opacity-0">at midnight.</span>
            <span className="reveal-line block text-[#FFB6C6] italic opacity-0 text-5xl sm:text-6xl">
              With a gelato reel.
            </span>
          </h1>
        </div>

        {/* Timeline Beats */}
        <div ref={beatsRef} className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mt-10">
          {BEATS.map(({ time, icon: Icon, label, color }, i) => (
            <React.Fragment key={time}>
              <div
                className="beat-item flex flex-col items-center px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 opacity-0"
              >
                <Icon className="w-5 h-5 mb-1.5" style={{ color }} />
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-white/50">{time}</span>
                <span className="text-sm font-bold text-white">{label}</span>
              </div>
              {i < BEATS.length - 1 && (
                <span className="beat-item text-white/30 font-black text-lg opacity-0">↓</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="text-xs font-medium uppercase tracking-widest">Scroll for the story</span>
        <div className="w-5 h-8 rounded-full border border-white/25 flex justify-center pt-2">
          <div className="w-1.5 h-2 rounded-full bg-white/40 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
