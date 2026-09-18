"use client";

import React, { useEffect, useRef, useState } from "react";
import { BUSINESS_DATA } from "@/data/business";
import {
  Sparkles, CheckCircle2, TrendingUp, Store, Snowflake,
  Megaphone, ArrowRight, Presentation, Star, Zap,
} from "lucide-react";
import { registerGSAP, gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap-init";
import { TransitionLink } from "@/components/navigation/transition-provider";

function FundIcon({ name }: { name: string }) {
  switch (name) {
    case "Store": return <Store className="w-6 h-6 text-[#FFE8EF]" />;
    case "Snowflake": return <Snowflake className="w-6 h-6 text-[#FFE8EF]" />;
    case "Megaphone": default: return <Megaphone className="w-6 h-6 text-[#FFE8EF]" />;
  }
}

export function InvestmentPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const askRef = useRef<HTMLDivElement>(null);
  const valuationRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const fundsRef = useRef<HTMLDivElement>(null);
  const investorRef = useRef<HTMLDivElement>(null);

  // Dramatic number reveal
  const [showAsk, setShowAsk] = useState(false);
  const [showEquity, setShowEquity] = useState(false);
  const [showValuation, setShowValuation] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setShowAsk(true);
      setShowEquity(true);
      setShowValuation(true);
      return;
    }

    registerGSAP();

    const ctx = gsap.context(() => {
      // Hero entrance
      if (heroRef.current) {
        const lines = heroRef.current.querySelectorAll(".reveal-line");
        gsap.fromTo(
          lines,
          { opacity: 0, y: 50, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.85, stagger: 0.2, ease: "power3.out", delay: 0.2 }
        );
      }

      // Spotlight glow pulse
      if (spotlightRef.current) {
        gsap.fromTo(
          spotlightRef.current,
          { scale: 0.7, opacity: 0 },
          {
            scale: 1.2, opacity: 0.8, duration: 1.5, ease: "power2.out", delay: 0.5,
            onComplete: () => {
              if (spotlightRef.current) {
                gsap.to(spotlightRef.current, {
                  scale: 1, opacity: 0.5, duration: 2, ease: "sine.inOut", yoyo: true, repeat: -1,
                });
              }
            },
          }
        );
      }

      // Dramatic sequential ask reveal
      if (askRef.current) {
        gsap.fromTo(
          askRef.current,
          { opacity: 0, scale: 0.7, y: 60 },
          {
            opacity: 1, scale: 1, y: 0, duration: 0.9, ease: "back.out(1.5)",
            scrollTrigger: { trigger: askRef.current, start: "top 80%", once: true },
            onStart: () => {
              setTimeout(() => setShowAsk(true), 200);
              setTimeout(() => setShowEquity(true), 800);
            },
          }
        );
      }

      if (valuationRef.current) {
        gsap.fromTo(
          valuationRef.current,
          { opacity: 0, scale: 0.7, y: 50 },
          {
            opacity: 1, scale: 1, y: 0, duration: 0.9, ease: "back.out(1.5)",
            scrollTrigger: { trigger: valuationRef.current, start: "top 80%", once: true },
            onStart: () => setTimeout(() => setShowValuation(true), 400),
          }
        );
      }

      // Fund cards stagger
      if (fundsRef.current) {
        const cards = fundsRef.current.querySelectorAll(".fund-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.92 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: "power2.out",
            scrollTrigger: { trigger: fundsRef.current, start: "top 80%", once: true },
          }
        );
      }

      // Investor value
      if (investorRef.current) {
        gsap.fromTo(
          investorRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
            scrollTrigger: { trigger: investorRef.current, start: "top 85%", once: true },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
    >
      {/* === SCENE 1: Hero Entrance === */}
      <div
        className="relative min-h-[95vh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #0F050A 0%, #1A0A12 30%, #2A0E1A 60%, #3A1225 100%)",
        }}
      >
        {/* Radial spotlight */}
        <div
          ref={spotlightRef}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-radial from-[#FFB6C6]/25 via-[#E98FA8]/10 to-transparent blur-3xl pointer-events-none opacity-0"
          aria-hidden="true"
        />

        {/* Stars field */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                top: `${Math.random() * 60}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.1,
              }}
            />
          ))}
        </div>

        {/* Giant watermark */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-black text-white/[0.025] select-none pointer-events-none font-sans whitespace-nowrap z-0"
          aria-hidden="true"
        >
          ₹2 CRORE
        </div>

        <div ref={heroRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Chapter badge */}
          <div className="reveal-line inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold uppercase tracking-widest text-[#FFB6C6] mb-6 shadow-lg">
            <TrendingUp className="w-3.5 h-3.5 text-[#E98FA8]" />
            Chapter 08 — Shark Tank Presentation Climax
          </div>

          <h1 className="reveal-line text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight font-display leading-[1.0] mb-5">
            <span className="text-white">Ready to grow</span>
            <br />
            <span className="text-[#E98FA8] italic">beyond one outlet.</span>
          </h1>

          <p className="reveal-line text-base sm:text-lg text-white/70 max-w-2xl mx-auto font-medium leading-relaxed mb-10">
            Partner with Berrylicious to scale proven unit economics into student hubs and high-street café kiosks across the country.
          </p>

          {/* Scroll indicator */}
          <div className="reveal-line flex flex-col items-center gap-2 text-white/30 mt-8">
            <span className="text-xs font-medium uppercase tracking-widest">The Numbers</span>
            <div className="w-5 h-8 rounded-full border border-white/25 flex justify-center pt-2">
              <div className="w-1.5 h-2 rounded-full bg-[#E98FA8] animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* === SCENE 2: The Climax Formula === */}
      <div
        className="relative py-24 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #3A1225 0%, #2A0E1A 50%, #1F0A14 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* THE ASK BOX */}
          <div
            ref={askRef}
            className="max-w-4xl mx-auto bg-black/40 backdrop-blur-xl rounded-[2rem] p-8 sm:p-14 border-2 border-[#E98FA8]/40 shadow-[0_30px_80px_rgba(0,0,0,0.6)] mb-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center divide-y md:divide-y-0 md:divide-x divide-white/15">
              {/* The Ask */}
              <div className="text-center md:text-left pr-0 md:pr-10">
                <span className="text-xs uppercase font-extrabold tracking-[0.25em] text-[#FFB6C6] block mb-3">
                  Primary Presentation Ask
                </span>
                <div className="text-6xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight mb-3 font-sans drop-shadow-lg transition-all duration-500"
                  style={{ opacity: showAsk ? 1 : 0, transform: showAsk ? "scale(1)" : "scale(0.8)" }}
                >
                  {BUSINESS_DATA.investment.askAmountFormatted}
                </div>
                <div className="text-xl font-bold text-[#FFDDE6] flex items-center justify-center md:justify-start gap-3 transition-all duration-500"
                  style={{ opacity: showEquity ? 1 : 0, transform: showEquity ? "translateY(0)" : "translateY(20px)" }}
                >
                  <span>for</span>
                  <span className="bg-[#E98FA8] text-[#382D32] px-4 py-1 rounded-full text-lg font-extrabold shadow-md">
                    {BUSINESS_DATA.investment.equityFormatted}
                  </span>
                </div>
              </div>

              {/* Implied Valuation */}
              <div
                ref={valuationRef}
                className="text-center md:text-left pt-8 md:pt-0 pl-0 md:pl-10"
              >
                <span className="text-xs uppercase font-extrabold tracking-[0.25em] text-[#FFB6C6] block mb-3">
                  Implied Business Valuation
                </span>
                <div className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#BFE9DE] tracking-tight mb-3 font-sans drop-shadow-lg transition-all duration-700"
                  style={{ opacity: showValuation ? 1 : 0, transform: showValuation ? "scale(1)" : "scale(0.7)" }}
                >
                  {BUSINESS_DATA.investment.impliedValuationFormatted}
                </div>
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-white/10 text-xs text-white/80 font-mono border border-white/15 backdrop-blur-sm">
                  <span>Formula:</span>
                  <span>{BUSINESS_DATA.investment.valuationFormula}</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-white/50 text-center mt-10 pt-6 border-t border-white/10">
              * {BUSINESS_DATA.investment.footnote} Presentation pitch terms are subject to standard due diligence. No guaranteed returns are implied.
            </p>
          </div>
        </div>
      </div>

      {/* === SCENE 3: Use of Funds === */}
      <div
        className="relative py-24 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #1F0A14 0%, #180812 50%, #120610 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-widest text-[#FFB6C6] mb-4 shadow-sm">
              <Zap className="w-3.5 h-3.5" />
              Strategic Capital Deployment
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white font-display">
              Use of Funds
            </h2>
          </div>

          <div ref={fundsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {BUSINESS_DATA.useOfFunds.map((fund) => (
              <div
                key={fund.id}
                className="fund-card bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/15 shadow-2xl hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-4xl font-black text-[#E98FA8] font-sans">{fund.number}</span>
                  <div className="w-12 h-12 rounded-2xl bg-[#9E4663]/30 flex items-center justify-center border border-[#E98FA8]/30">
                    <FundIcon name={fund.iconName} />
                  </div>
                </div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#FFB6C6] block mb-1">{fund.subtitle}</span>
                <h3 className="text-xl font-bold text-white mb-3 font-display">{fund.title}</h3>
                <p className="text-xs text-white/65 leading-relaxed font-medium mb-5">{fund.description}</p>
                {fund.bulletPoints && (
                  <ul className="space-y-2 pt-4 border-t border-white/10">
                    {fund.bulletPoints.map((bp) => (
                      <li key={bp} className="flex items-center gap-2 text-xs font-semibold text-white/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#E98FA8] shrink-0" />
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Investor Value */}
          <div
            ref={investorRef}
            className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/15 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2 font-display">
              <Sparkles className="w-5 h-5 text-[#E98FA8]" />
              <span>What an investor gets</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {BUSINESS_DATA.investorValue.map((v) => (
                <div key={v.title} className="text-left">
                  <h4 className="text-sm font-bold text-[#FFB6C6] mb-2 font-display">{v.title}</h4>
                  <p className="text-xs text-white/75 leading-relaxed font-medium">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
