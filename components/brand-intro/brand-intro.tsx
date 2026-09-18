"use client";

import React, { useEffect, useRef } from "react";
import { BRAND } from "@/data/brand";
import { Apple, Heart, Sparkles, CheckCircle2 } from "lucide-react";
import { WaveDivider } from "@/components/ui/section-dividers";
import { registerGSAP, gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap-init";

export function BrandIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const icons = [
    <Apple key="1" className="w-8 h-8 text-[#E98FA8]" />,
    <Sparkles key="2" className="w-8 h-8 text-[#2D9A80]" />,
    <Heart key="3" className="w-8 h-8 text-[#E98FA8]" />,
  ];

  const themeStyles = [
    {
      card: "bg-white border-2 border-[#E98FA8]/50 shadow-[0_12px_36px_rgba(233,143,168,0.18)] hover:border-[#E98FA8]",
      badge: "bg-[#FFF1E8] text-[#9E4663] border-[#E98FA8]",
      iconBg: "bg-[#FFF1E8] border-[#E98FA8]/40",
      accent: "#E98FA8",
    },
    {
      card: "bg-white border-2 border-[#BFE9DE]/80 shadow-[0_12px_36px_rgba(191,233,222,0.22)] hover:border-[#2D9A80]",
      badge: "bg-[#EBF7F4] text-[#2D9A80] border-[#BFE9DE]",
      iconBg: "bg-[#EBF7F4] border-[#BFE9DE]/60",
      accent: "#2D9A80",
    },
    {
      card: "bg-white border-2 border-[#B8DDF2]/80 shadow-[0_12px_36px_rgba(184,221,242,0.22)] hover:border-[#3888B8]",
      badge: "bg-[#EEF6FB] text-[#236E9E] border-[#B8DDF2]",
      iconBg: "bg-[#EEF6FB] border-[#B8DDF2]/60",
      accent: "#3888B8",
    },
  ];

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;
    registerGSAP();

    const ctx = gsap.context(() => {
      // Header entrance
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Choreographed sequence of the 3 cards with SVG line progress
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 85%",
          scrub: 0.8,
        },
      });

      // SVG path drawing
      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });
        tl.to(pathRef.current, { strokeDashoffset: 0, ease: "none" }, 0);
      }

      // Card 1 zooms in first
      if (card1Ref.current) {
        tl.fromTo(
          card1Ref.current,
          { opacity: 0, y: 50, scale: 0.92, rotate: -2 },
          { opacity: 1, y: 0, scale: 1, rotate: 0, ease: "power2.out" },
          0.1
        );
      }

      // Card 2 follows
      if (card2Ref.current) {
        tl.fromTo(
          card2Ref.current,
          { opacity: 0, y: 50, scale: 0.92 },
          { opacity: 1, y: -8, scale: 1.04, ease: "power2.out" },
          0.4
        );
      }

      // Card 3 locks into position
      if (card3Ref.current) {
        tl.fromTo(
          card3Ref.current,
          { opacity: 0, y: 50, scale: 0.92, rotate: 2 },
          { opacity: 1, y: 0, scale: 1, rotate: 0, ease: "power2.out" },
          0.7
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Wave divider from hero vanilla → mint */}
      <WaveDivider fromColor="#FFF9F0" toColor="#EBF7F4" />

      {/* Mint identity section */}
      <section
        ref={sectionRef}
        className="py-24 bg-[#EBF7F4] relative overflow-hidden mint-ambient"
      >
        {/* Giant Watermark Typography */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] font-black text-[#2D9A80]/[0.04] select-none pointer-events-none font-display whitespace-nowrap z-0"
          aria-hidden="true"
        >
          BERRYLICIOUS
        </div>

        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#BFE9DE]/40 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#B8DDF2]/30 blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-16 opacity-0">
            <span className="font-display text-2xl sm:text-3xl text-[#2D9A80] font-bold block mb-2">
              Home-Grown Goodness
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#382D32] mb-6 font-display">
              {BRAND.intro.heading}
            </h2>
            <p className="text-base sm:text-lg text-[#382D32]/80 leading-relaxed font-medium">
              {BRAND.intro.paragraph}
            </p>
          </div>

          {/* Desktop Connecting SVG Ribbon */}
          <div className="relative">
            <svg
              className="hidden lg:block absolute top-1/2 left-0 w-full h-24 -translate-y-1/2 pointer-events-none z-0"
              viewBox="0 0 1200 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                ref={pathRef}
                d="M 150 40 C 350 10, 450 70, 600 40 C 750 10, 850 70, 1050 40"
                stroke="#2D9A80"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="8 8"
                opacity="0.35"
              />
            </svg>

            {/* 3 Choreographed Value Proposition Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {BRAND.intro.cards.map((card, idx) => {
                const cardRefs = [card1Ref, card2Ref, card3Ref];
                const theme = themeStyles[idx];
                return (
                  <div
                    key={card.title}
                    ref={cardRefs[idx]}
                    className={`rounded-3xl p-8 transition-shadow duration-300 card-shadow flex flex-col justify-between relative group opacity-0 ${theme.card}`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div
                          className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm border transition-transform duration-300 group-hover:scale-110 ${theme.iconBg}`}
                        >
                          {icons[idx]}
                        </div>
                        <span
                          className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border shadow-2xs ${theme.badge}`}
                        >
                          Pillar 0{idx + 1}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-[#382D32] mb-3 font-display">
                        {card.title}
                      </h3>
                      <p className="text-[#382D32]/80 leading-relaxed font-medium text-sm sm:text-base">
                        {card.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-[#382D32]/8 flex items-center gap-2 text-xs font-bold text-[#382D32]/60">
                      <CheckCircle2 className="w-4 h-4 text-[#2D9A80]" />
                      <span>{idx === 0 ? "100% Real Fresh Fruits" : idx === 1 ? "Chef-Formulated Textures" : "Student-Friendly Pricing"}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Wave divider from mint → berry pink */}
      <WaveDivider fromColor="#EBF7F4" toColor="#FFF1E8" />
    </>
  );
}
