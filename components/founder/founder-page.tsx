"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { BRAND } from "@/data/brand";
import { Quote, Sparkles, Heart, Star, Leaf } from "lucide-react";
import { registerGSAP, gsap, prefersReducedMotion } from "@/lib/gsap-init";
import { BadgePill, StrawberrySticker } from "@/components/ui/berry-illustrations";

const FOUNDER_TRAITS = [
  { icon: Sparkles, label: "Visionary", desc: "Saw the market gap before the market did", color: "#9E4663" },
  { icon: Heart, label: "Passionate", desc: "Every dessert is crafted with genuine care", color: "#E98FA8" },
  { icon: Leaf, label: "Sustainable", desc: "Farm-sourced, local-first ingredient philosophy", color: "#1D7462" },
  { icon: Star, label: "Student Founder", desc: "Building while still pursuing higher education", color: "#7A5230" },
];

export function FounderPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const traitRefs = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;
    registerGSAP();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (portraitRef.current) {
        tl.fromTo(
          portraitRef.current,
          { opacity: 0, scale: 0.9, x: -40 },
          { opacity: 1, scale: 1, x: 0, duration: 0.9 },
          0.1
        );
      }

      if (contentRef.current) {
        const items = contentRef.current.querySelectorAll(".content-item");
        tl.fromTo(
          items,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.15 },
          0.3
        );
      }

      if (quoteRef.current) {
        tl.fromTo(
          quoteRef.current,
          { opacity: 0, scaleX: 0.85, transformOrigin: "left" },
          { opacity: 1, scaleX: 1, duration: 0.7, ease: "power2.out" },
          0.8
        );
      }

      if (traitRefs.current) {
        const items = traitRefs.current.querySelectorAll(".trait-item");
        tl.fromTo(
          items,
          { opacity: 0, y: 25, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.4)" },
          0.6
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden pt-32 pb-20"
      style={{ background: "linear-gradient(160deg, #FAF6EE 0%, #F5ECDA 50%, #FAF6EE 100%)" }}
    >
      {/* Ambient warm parchment glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-[#E8D5B5]/40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-[#E98FA8]/20 blur-[100px] pointer-events-none" />

      {/* Decorative pen stroke SVG */}
      <svg
        className="absolute top-20 right-10 w-40 h-40 opacity-10 pointer-events-none"
        viewBox="0 0 160 160"
        fill="none"
        aria-hidden="true"
      >
        <path d="M20 140 Q80 20 140 80" stroke="#7A5230" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 8" fill="none" />
        <path d="M10 100 Q60 40 130 90" stroke="#E98FA8" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
        <circle cx="140" cy="80" r="6" fill="#9E4663" opacity="0.5" />
      </svg>

      {/* Giant watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-black text-[#7A5230]/[0.04] select-none pointer-events-none font-display whitespace-nowrap z-0"
        aria-hidden="true"
      >
        TANVI
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Chapter Badge */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#D9C6B0] text-xs font-bold uppercase tracking-widest text-[#7A5230] mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            Chapter 06 — The Founder
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight font-display text-[#382D32] leading-[1.1]">
            Meet the person <br />
            <span className="text-[#9E4663] italic">behind Berrylicious.</span>
          </h1>
        </div>

        {/* Main founder card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-[2.5rem] border-2 border-[#E8D5B5] shadow-xl overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left: Portrait Column */}
            <div
              ref={portraitRef}
              className="relative bg-gradient-to-br from-[#FFF1E8] to-[#F5E8D5] flex flex-col items-center justify-center p-12 text-center min-h-[500px]"
            >
              {/* Decorative ring */}
              <div className="absolute top-8 right-8">
                <StrawberrySticker className="w-10 h-10 opacity-70" />
              </div>

              {/* Portrait image */}
              <div className="relative mb-6">
                <div
                  className="w-52 h-52 rounded-full p-1 shadow-2xl"
                  style={{ background: "linear-gradient(135deg, #E98FA8, #9E4663, #BFE9DE)" }}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#FFF1E8] relative">
                    <Image
                      src="/tanvi.png"
                      alt="Tanvi Ojha, Founder of Berrylicious"
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 200px, 208px"
                      priority
                    />
                  </div>
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-3 -right-3 bg-[#9E4663] text-white px-3 py-1.5 rounded-full text-xs font-extrabold shadow-lg border-2 border-white">
                  Founder
                </div>
              </div>

              <h2 className="text-3xl font-bold text-[#382D32] font-display mb-1">{BRAND.founder.name}</h2>
              <p className="text-sm font-bold uppercase tracking-wider text-[#9E4663] mb-1">{BRAND.founder.title}</p>
              <p className="text-xs text-[#382D32]/60 font-semibold mb-6">Student Entrepreneur</p>

              <BadgePill text="Berrylicious — Shark Tank" color="pink" />
            </div>

            {/* Right: Content column */}
            <div ref={contentRef} className="p-10 sm:p-14 flex flex-col justify-center">
              <div className="content-item mb-6">
                <BadgePill text="Founder's Profile" color="pink" />
              </div>

              <h3 className="content-item text-4xl sm:text-5xl font-bold text-[#382D32] font-display mb-4 leading-tight">
                Tanvi Ojha.
              </h3>

              <div className="content-item w-20 h-1.5 bg-gradient-to-r from-[#E98FA8] to-[#9E4663] rounded-full mb-6" />

              <p className="content-item text-base sm:text-lg text-[#382D32]/80 leading-relaxed font-medium mb-8">
                {BRAND.founder.bio}
              </p>

              {/* Quote block */}
              <div
                ref={quoteRef}
                className="relative bg-gradient-to-br from-[#FFF1E8] to-[#FFF9F0] rounded-2xl p-6 border-l-4 border-[#9E4663] shadow-sm"
              >
                <Quote className="w-8 h-8 text-[#9E4663]/25 absolute top-4 right-4" />
                <p className="text-sm sm:text-base text-[#9E4663] font-semibold italic leading-relaxed">
                  &ldquo;{BRAND.founder.quote}&rdquo;
                </p>
                <p className="text-xs text-[#382D32]/60 font-bold mt-3">— {BRAND.founder.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Founder Traits */}
        <div ref={traitRefs} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {FOUNDER_TRAITS.map(({ icon: Icon, label, desc, color }) => (
            <div
              key={label}
              className="trait-item bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-[#E8D5B5] shadow-xs hover:shadow-md transition-all hover:-translate-y-1 text-center"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xs"
                style={{ backgroundColor: `${color}15`, color }}
              >
                <Icon className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-[#382D32] mb-1 font-display">{label}</h4>
              <p className="text-[11px] text-[#382D32]/65 leading-relaxed font-medium">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
