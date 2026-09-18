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
  Target,
  MapPin,
  CheckCircle2,
  Info,
} from "lucide-react";

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

// Simple viewport-triggered count-up
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
  return (
    <div id="business">
      {/* PART 1: BUSINESS DASHBOARD METRICS */}
      <section className="py-24 bg-[#FFF9F0] relative overflow-hidden border-t border-[#E98FA8]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF1E8] border border-[#E98FA8]/40 text-xs font-bold uppercase tracking-wider text-[#9E4663] mb-3">
              <BarChart3 className="w-3.5 h-3.5" />
              Shark Tank Pitch Figures
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#382D32] font-display mb-2">
              Behind the Berrylicious
            </h2>
            <p className="text-lg text-[#9E4663] font-bold">The numbers behind the idea.</p>
            <p className="text-xs sm:text-sm text-[#382D32]/70 max-w-xl mx-auto mt-3 font-medium">
              Real financial snapshot from our pilot kiosk operation presented directly to the Shark
              Tank panel.
            </p>
          </div>

          {/* 5 Business Metric Cards (matching reference styleboard) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-10">
            {BUSINESS_DATA.metrics.map((m) => (
              <div
                key={m.id}
                className="bg-white rounded-3xl p-6 border-2 border-[#E98FA8]/30 card-shadow transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FFF1E8] flex items-center justify-center mb-4">
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
                  <h3 className="font-bold text-sm text-[#382D32] mb-1">{m.label}</h3>
                  <p className="text-[11px] text-[#382D32]/65 leading-tight font-medium">
                    {m.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Required footnote as mandated by PRD Section 19 */}
          <div className="bg-[#FFF1E8] rounded-2xl p-4 border border-[#E98FA8]/50 max-w-3xl mx-auto flex items-start gap-3">
            <Info className="w-5 h-5 text-[#9E4663] shrink-0 mt-0.5" />
            <p className="text-xs text-[#382D32]/80 font-medium leading-relaxed">
              <strong>Presentation Note:</strong> {BUSINESS_DATA.footnote} Figures reflect stated
              pilot results and are not independently audited.
            </p>
          </div>
        </div>
      </section>

      {/* PART 2: THE INVESTMENT ASK (Distinct Dark Berry Section, PRD Section 20) */}
      <section
        id="investment"
        className="py-24 bg-[#9E4663] text-white relative overflow-hidden"
      >
        {/* Ambient background glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#E98FA8]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#382D32]/30 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider text-[#FFDDE6] border border-white/20 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#E98FA8]" />
              Investment Opportunity
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FFF9F0] font-display mb-4">
              Ready to grow beyond one outlet.
            </h2>
            <p className="text-base sm:text-lg text-[#FFF9F0]/85 font-medium max-w-xl mx-auto">
              Partner with Berrylicious to scale proven unit economics into student hubs and high-street
              café kiosks.
            </p>
          </div>

          {/* Investment Figures Highlight Banner */}
          <div className="max-w-4xl mx-auto bg-[#382D32]/40 backdrop-blur-md rounded-3xl p-8 sm:p-12 border-2 border-[#E98FA8]/40 shadow-2xl mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center divide-y md:divide-y-0 md:divide-x divide-white/20">
              {/* Ask */}
              <div className="text-center md:text-left pr-0 md:pr-8">
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#FFB6C6] block mb-1">
                  Primary Presentation Ask
                </span>
                <div className="text-5xl sm:text-6xl font-black text-white tracking-tight mb-2 font-sans">
                  {BUSINESS_DATA.investment.askAmountFormatted}
                </div>
                <div className="text-xl font-bold text-[#FFDDE6] flex items-center justify-center md:justify-start gap-2">
                  <span>for</span>
                  <span className="bg-[#E98FA8] text-[#382D32] px-3 py-0.5 rounded-full text-base font-extrabold">
                    {BUSINESS_DATA.investment.equityFormatted}
                  </span>
                </div>
              </div>

              {/* Derived Valuation */}
              <div className="text-center md:text-left pt-6 md:pt-0 pl-0 md:pl-8">
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#FFB6C6] block mb-1">
                  Implied Business Valuation
                </span>
                <div className="text-4xl sm:text-5xl font-black text-[#BFE9DE] tracking-tight mb-2 font-sans">
                  {BUSINESS_DATA.investment.impliedValuationFormatted}
                </div>
                <p className="text-xs text-[#FFF9F0]/70 font-mono">
                  Calculation: {BUSINESS_DATA.investment.valuationFormula}
                </p>
              </div>
            </div>

            <p className="text-[11px] text-[#FFF9F0]/60 text-center mt-8 pt-6 border-t border-white/15">
              * {BUSINESS_DATA.investment.footnote} Presentation pitch terms are subject to standard
              due diligence. No guaranteed returns are implied.
            </p>
          </div>

          {/* PART 3: USE OF FUNDS (3 Cards, PRD Section 21) */}
          <div className="mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-center text-white mb-10 font-display">
              Strategic Use of Funds
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {BUSINESS_DATA.useOfFunds.map((fund) => (
                <div
                  key={fund.id}
                  className="bg-white text-[#382D32] rounded-3xl p-7 shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black text-[#9E4663] font-sans">
                        {fund.number}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#FFF1E8] flex items-center justify-center">
                        <FundIcon name={fund.iconName} />
                      </div>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#9E4663] block mb-1">
                      {fund.subtitle}
                    </span>
                    <h4 className="text-xl font-bold text-[#382D32] mb-3">{fund.title}</h4>
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

          {/* PART 4: INVESTOR VALUE (PRD Section 22) */}
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xs rounded-3xl p-8 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#E98FA8]" />
              <span>What an investor gets</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {BUSINESS_DATA.investorValue.map((v) => (
                <div key={v.title} className="text-left">
                  <h4 className="text-sm font-bold text-[#FFDDE6] mb-1.5">{v.title}</h4>
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
