"use client";

import React, { useState, useEffect, useRef } from "react";
import { BUSINESS_DATA, BusinessMetric } from "@/data/business";
import {
  Wallet, TrendingUp, BarChart3, PieChart, Store, Snowflake,
  Megaphone, Sparkles, CheckCircle2, Info, ArrowRight, BarChart2, Presentation,
} from "lucide-react";
import { registerGSAP, gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap-init";
import { TransitionLink } from "@/components/navigation/transition-provider";

function MetricIcon({ name }: { name: string }) {
  switch (name) {
    case "Wallet": return <Wallet className="w-6 h-6 text-[#2A4861]" />;
    case "TrendingUp": return <TrendingUp className="w-6 h-6 text-[#2A4861]" />;
    case "BarChart3": return <BarChart3 className="w-6 h-6 text-[#2A4861]" />;
    case "PieChart": return <PieChart className="w-6 h-6 text-[#2A4861]" />;
    case "Store": default: return <Store className="w-6 h-6 text-[#2A4861]" />;
  }
}

function AnimatedNumber({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1400;
          const steps = 40;
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
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

export function BusinessPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const fundsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;
    registerGSAP();

    const ctx = gsap.context(() => {
      if (heroRef.current) {
        const lines = heroRef.current.querySelectorAll(".reveal-line");
        gsap.fromTo(lines, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out" });
      }

      if (metricsRef.current) {
        const cards = metricsRef.current.querySelectorAll(".metric-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35, scale: 0.94 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.1, ease: "power2.out",
            scrollTrigger: { trigger: metricsRef.current, start: "top 80%", once: true },
          }
        );
      }

      if (fundsRef.current) {
        const cards = fundsRef.current.querySelectorAll(".fund-card");
        gsap.fromTo(
          cards,
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0, duration: 0.55, stagger: 0.15, ease: "power2.out",
            scrollTrigger: { trigger: fundsRef.current, start: "top 80%", once: true },
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
      style={{ background: "linear-gradient(160deg, #EEF3F8 0%, #F4F7FA 50%, #EEF3F8 100%)" }}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#2A486108_1px,transparent_1px),linear-gradient(to_bottom,#2A486108_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none"
        aria-hidden="true"
      />
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-[#B8DDF2]/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-[#BFE9DE]/20 blur-[100px] pointer-events-none" />

      {/* Watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] font-black text-[#2A4861]/[0.03] select-none pointer-events-none font-display whitespace-nowrap z-0"
        aria-hidden="true"
      >
        PITCH
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative z-10">
        {/* Chapter Header */}
        <div ref={heroRef} className="text-center max-w-3xl mx-auto mb-20">
          <div className="reveal-line inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2A4861]/10 border border-[#C5D7E8] text-xs font-bold uppercase tracking-widest text-[#2A4861] mb-5 shadow-xs">
            <BarChart2 className="w-3.5 h-3.5" />
            Chapter 07 — The Business
          </div>

          <h1 className="reveal-line text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#1C3048] font-display mb-4 leading-[1.05]">
            Behind the<br />
            <span className="text-[#2A4861] italic">Berrylicious Numbers.</span>
          </h1>

          <p className="reveal-line text-base sm:text-lg text-[#1C3048]/75 max-w-xl mx-auto font-medium leading-relaxed">
            Real operational unit economics from our pilot outlet — presented directly to the Shark Tank panel.
          </p>

          <div className="reveal-line mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 border border-[#C5D7E8] text-xs font-bold text-[#2A4861] shadow-xs">
            <Info className="w-3.5 h-3.5 text-[#5B8AC0]" />
            {BUSINESS_DATA.footnote}
          </div>
        </div>

        {/* 5 Metric Cards */}
        <div ref={metricsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 mb-16">
          {BUSINESS_DATA.metrics.map((m) => (
            <div
              key={m.id}
              className="metric-card bg-white rounded-3xl p-6 border-2 border-[#C5D7E8]/60 hover:border-[#2A4861] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#EEF3F8] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-[#C5D7E8]">
                <MetricIcon name={m.iconName} />
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#2A4861] mb-1 font-sans">
                  <AnimatedNumber target={m.numericValue} prefix={m.prefix} suffix={m.suffix} />
                </div>
                <h3 className="font-bold text-sm text-[#1C3048] mb-1 font-display">{m.label}</h3>
                <p className="text-[11px] text-[#1C3048]/60 leading-tight font-medium">{m.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Use of Funds */}
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1C3048] font-display mb-10 text-center">
            What the investment gets deployed into
          </h2>
          <div ref={fundsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BUSINESS_DATA.useOfFunds.map((fund) => (
              <div
                key={fund.id}
                className="fund-card bg-white rounded-3xl p-8 border-2 border-[#C5D7E8]/50 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-4xl font-black text-[#2A4861] font-sans">{fund.number}</span>
                  <div className="w-12 h-12 rounded-2xl bg-[#EEF3F8] flex items-center justify-center border border-[#C5D7E8]">
                    {fund.iconName === "Store" && <Store className="w-6 h-6 text-[#2A4861]" />}
                    {fund.iconName === "Snowflake" && <Snowflake className="w-6 h-6 text-[#2A4861]" />}
                    {fund.iconName === "Megaphone" && <Megaphone className="w-6 h-6 text-[#2A4861]" />}
                  </div>
                </div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#2A4861] block mb-1">{fund.subtitle}</span>
                <h3 className="text-xl font-bold text-[#1C3048] mb-3 font-display">{fund.title}</h3>
                <p className="text-xs text-[#1C3048]/70 leading-relaxed font-medium mb-4">{fund.description}</p>
                {fund.bulletPoints && (
                  <ul className="space-y-1.5 pt-3 border-t border-[#C5D7E8]/50">
                    {fund.bulletPoints.map((bp) => (
                      <li key={bp} className="flex items-center gap-2 text-xs font-semibold text-[#1C3048]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2A4861] shrink-0" />
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA to Investment */}
        <div className="max-w-2xl mx-auto text-center bg-gradient-to-r from-[#2A4861] to-[#1C3048] rounded-3xl p-10 text-white shadow-2xl">
          <Presentation className="w-10 h-10 text-[#B8DDF2] mx-auto mb-4" />
          <h3 className="text-3xl font-bold font-display mb-3">Ready for the Shark Tank ask?</h3>
          <p className="text-white/75 text-sm font-medium mb-6 max-w-md mx-auto">
            The numbers check out. See how Berrylicious proposes to deploy capital for hyper-local scaling.
          </p>
          <TransitionLink
            href="/investment"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm bg-[#E98FA8] text-[#382D32] shadow-lg hover:shadow-xl hover:scale-105 transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            See the ₹20L Investment Ask
            <ArrowRight className="w-4 h-4" />
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
