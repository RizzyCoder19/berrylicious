"use client";

import React, { useState, useEffect, useRef } from "react";
import { BUSINESS_DATA, BusinessMetric } from "@/data/business";
import {
  Wallet,
  TrendingUp,
  BarChart3,
  PieChart,
  Store,
  Snowflake,
  Megaphone,
  Sparkles,
  CheckCircle2,
  Info,
  ArrowRight,
} from "lucide-react";
import { registerGSAP, gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap-init";

function MetricIcon({ name }: { name: string }) {
  switch (name) {
    case "Wallet":
      return <Wallet className="w-6 h-6 text-[#9E4663]" />;
    case "TrendingUp":
      return <TrendingUp className="w-6 h-6 text-[#9E4663]" />;
    case "BarChart3":
      return <BarChart3 className="w-6 h-6 text-[#9E4663]" />;
    case "PieChart":
      return <PieChart className="w-6 h-6 text-[#9E4663]" />;
    case "Store":
    default:
      return <Store className="w-6 h-6 text-[#9E4663]" />;
  }
}

function FundIcon({ name }: { name: string }) {
  switch (name) {
    case "Store":
      return <Store className="w-6 h-6 text-[#9E4663]" />;
    case "Snowflake":
      return <Snowflake className="w-6 h-6 text-[#9E4663]" />;
    case "Megaphone":
    default:
      return <Megaphone className="w-6 h-6 text-[#9E4663]" />;
  }
}

// Viewport-triggered count-up
function AnimatedNumber({
  target,
  prefix = "",
  suffix = "",
}: {
  target: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1200;
          const steps = 30;
          const stepTime = duration / steps;
          let current = 0;
          const increment = target / steps;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, stepTime);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export function BusinessDashboard() {
  const pitchRef = useRef<HTMLDivElement>(null);
  const askRef = useRef<HTMLDivElement>(null);
  const valuationRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !pitchRef.current) return;
    registerGSAP();

    const ctx = gsap.context(() => {
      // Shark Tank Climax Scroll Reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pitchRef.current,
          start: "top 75%",
          end: "bottom 80%",
          scrub: 1,
        },
      });

      if (spotlightRef.current) {
        tl.fromTo(
          spotlightRef.current,
          { opacity: 0.2, scale: 0.8 },
          { opacity: 0.8, scale: 1.2, ease: "none" },
          0
        );
      }

      if (askRef.current) {
        tl.fromTo(
          askRef.current,
          { opacity: 0, scale: 0.85, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.5)" },
          0.1
        );
      }

      if (valuationRef.current) {
        tl.fromTo(
          valuationRef.current,
          { opacity: 0, scale: 0.85, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.5)" },
          0.4
        );
      }
    }, pitchRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="business">
      {/* PART 1: BUSINESS DASHBOARD METRICS (Cool-grey financial pitch grid) */}
      <section className="py-24 bg-[#F5F4F2] relative overflow-hidden border-t border-[#382D32]/10">
        {/* Subtle architectural grid pattern */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#9E4663]/25 text-xs font-bold uppercase tracking-wider text-[#9E4663] mb-3 shadow-xs">
              <BarChart3 className="w-3.5 h-3.5" />
              Shark Tank Pitch Economics
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#382D32] font-display mb-2">
              Behind the Berrylicious
            </h2>
            <p className="text-lg text-[#9E4663] font-bold">The numbers behind the idea.</p>
            <p className="text-xs sm:text-sm text-[#382D32]/70 max-w-xl mx-auto mt-3 font-medium">
              Real operational unit economics from our pilot kiosk operation presented directly to the
              Shark Tank panel.
            </p>
          </div>

          {/* 5 Structured Business Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-10">
            {BUSINESS_DATA.metrics.map((m) => (
              <div
                key={m.id}
                className="bg-white rounded-3xl p-6 border-2 border-[#E98FA8]/25 card-shadow transition-all duration-300 hover:-translate-y-2 hover:border-[#9E4663] flex flex-col justify-between group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FFF1E8] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MetricIcon name={m.iconName} />
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#9E4663] mb-1 font-sans">
                    <AnimatedNumber
                      target={m.numericValue}
                      prefix={m.prefix}
                      suffix={m.suffix}
                    />
                  </div>
                  <h3 className="font-bold text-sm text-[#382D32] mb-1 font-display">{m.label}</h3>
                  <p className="text-[11px] text-[#382D32]/65 leading-tight font-medium">
                    {m.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Presentation Note */}
          <div className="bg-white rounded-2xl p-4 border border-[#382D32]/10 max-w-3xl mx-auto flex items-start gap-3 shadow-xs">
            <Info className="w-5 h-5 text-[#9E4663] shrink-0 mt-0.5" />
            <p className="text-xs text-[#382D32]/80 font-medium leading-relaxed">
              <strong>Presentation Note:</strong> {BUSINESS_DATA.footnote} Figures reflect stated
              pilot results and are not independently audited.
            </p>
          </div>
        </div>
      </section>

      {/* PART 2: THE INVESTMENT ASK — SHARK TANK CLIMAX */}
      <section
        ref={pitchRef}
        id="investment"
        className="py-28 bg-gradient-to-b from-[#9E4663] via-[#853650] to-[#382D32] text-white relative overflow-hidden"
      >
        {/* Dramatic Radial Spotlight */}
        <div
          ref={spotlightRef}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-radial from-[#FFB6C6]/30 via-[#E98FA8]/10 to-transparent blur-3xl pointer-events-none"
        />

        {/* Giant Watermark Numbers in Background */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-black text-white/[0.04] select-none pointer-events-none font-sans whitespace-nowrap z-0"
          aria-hidden="true"
        >
          ₹2 CRORE
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/15 text-xs font-bold uppercase tracking-wider text-[#FFDDE6] border border-white/20 mb-4 shadow-lg backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#E98FA8]" />
              Shark Tank Presentation Climax
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FFF9F0] font-display mb-4">
              Ready to grow beyond one outlet.
            </h2>
            <p className="text-base sm:text-lg text-[#FFF9F0]/85 font-medium max-w-xl mx-auto">
              Partner with Berrylicious to scale proven unit economics into student hubs and high-street
              café kiosks across the country.
            </p>
          </div>

          {/* THE CLIMAX FORMULA BANNER */}
          <div className="max-w-4xl mx-auto bg-black/35 backdrop-blur-lg rounded-3xl p-8 sm:p-12 border-2 border-[#E98FA8]/50 shadow-[0_25px_60px_rgba(0,0,0,0.5)] mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center divide-y md:divide-y-0 md:divide-x divide-white/20">
              {/* The Ask */}
              <div ref={askRef} className="text-center md:text-left pr-0 md:pr-8">
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#FFB6C6] block mb-2">
                  Primary Presentation Ask
                </span>
                <div className="text-5xl sm:text-6xl font-black text-white tracking-tight mb-2 font-sans drop-shadow-md">
                  {BUSINESS_DATA.investment.askAmountFormatted}
                </div>
                <div className="text-xl font-bold text-[#FFDDE6] flex items-center justify-center md:justify-start gap-2">
                  <span>for</span>
                  <span className="bg-[#E98FA8] text-[#382D32] px-3.5 py-0.5 rounded-full text-base font-extrabold shadow-sm">
                    {BUSINESS_DATA.investment.equityFormatted}
                  </span>
                </div>
              </div>

              {/* Implied Valuation */}
              <div ref={valuationRef} className="text-center md:text-left pt-6 md:pt-0 pl-0 md:pl-8">
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#FFB6C6] block mb-2">
                  Implied Business Valuation
                </span>
                <div className="text-4xl sm:text-5xl font-black text-[#BFE9DE] tracking-tight mb-2 font-sans drop-shadow-md">
                  {BUSINESS_DATA.investment.impliedValuationFormatted}
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 text-xs text-[#FFF9F0]/85 font-mono border border-white/15">
                  <span>Formula:</span>
                  <span>{BUSINESS_DATA.investment.valuationFormula}</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#FFF9F0]/60 text-center mt-8 pt-6 border-t border-white/15">
              * {BUSINESS_DATA.investment.footnote} Presentation pitch terms are subject to standard
              due diligence. No guaranteed returns are implied.
            </p>
          </div>

          {/* PART 3: USE OF FUNDS */}
          <div className="mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-center text-white mb-10 font-display">
              Strategic Use of Funds
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {BUSINESS_DATA.useOfFunds.map((fund) => (
                <div
                  key={fund.id}
                  className="bg-white text-[#382D32] rounded-3xl p-7 shadow-2xl flex flex-col justify-between hover:-translate-y-2 transition-transform duration-300 border border-white/40"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-black text-[#9E4663] font-sans">
                        {fund.number}
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-[#FFF1E8] flex items-center justify-center shadow-xs">
                        <FundIcon name={fund.iconName} />
                      </div>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#9E4663] block mb-1">
                      {fund.subtitle}
                    </span>
                    <h4 className="text-xl font-bold text-[#382D32] mb-3 font-display">{fund.title}</h4>
                    <p className="text-xs sm:text-sm text-[#382D32]/75 leading-relaxed font-medium mb-4">
                      {fund.description}
                    </p>

                    {fund.bulletPoints && (
                      <ul className="space-y-2 pt-3 border-t border-[#382D32]/10 mb-4">
                        {fund.bulletPoints.map((bp) => (
                          <li key={bp} className="flex items-center gap-2 text-xs font-semibold text-[#382D32]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#9E4663] shrink-0" />
                            <span>{bp}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PART 4: INVESTOR VALUE */}
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 font-display">
              <Sparkles className="w-5 h-5 text-[#E98FA8]" />
              <span>What an investor gets</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {BUSINESS_DATA.investorValue.map((v) => (
                <div key={v.title} className="text-left">
                  <h4 className="text-sm font-bold text-[#FFDDE6] mb-1.5 font-display">{v.title}</h4>
                  <p className="text-xs text-white/80 leading-relaxed font-medium">
                    {v.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
