"use client";

import React, { useEffect, useRef } from "react";
import { BRAND } from "@/data/brand";
import { Apple, Milk, Sparkles, Heart } from "lucide-react";
import { WaveDivider } from "@/components/ui/section-dividers";
import { registerGSAP, gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap-init";

export function IngredientStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const stepIcons = [
    <Apple key="1" className="w-8 h-8 text-[#9E4663]" />,
    <Milk key="2" className="w-8 h-8 text-[#9E4663]" />,
    <Sparkles key="3" className="w-8 h-8 text-[#9E4663]" />,
    <Heart key="4" className="w-8 h-8 text-[#9E4663]" />,
  ];

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;
    registerGSAP();

    const ctx = gsap.context(() => {
      // Scrubbed timeline that draws connector path as user scrolls
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: 1,
          },
        });
      }

      // Step cards progressive activation
      stepRefs.current.forEach((el, index) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#FFF1E8]/70 pt-20 pb-28"
    >
      {/* Wave Divider Transition from previous section */}
      <WaveDivider position="top" fill="#FFFFFF" height={45} />

      {/* Floating ambient ingredient particles */}
      <div className="absolute top-1/4 -left-12 w-64 h-64 rounded-full bg-[#E98FA8]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-12 w-72 h-72 rounded-full bg-[#BFE9DE]/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-display text-2xl sm:text-3xl text-[#9E4663] font-bold block mb-2">
            Quality Philosophy
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#382D32] mb-4 font-display">
            {BRAND.ingredients.heading}
          </h2>
          <p className="text-base sm:text-lg text-[#382D32]/80 leading-relaxed font-medium">
            {BRAND.ingredients.copy}
          </p>
        </div>

        {/* Desktop Animated Connector Path */}
        <div className="relative">
          <svg
            className="hidden lg:block absolute top-28 left-8 w-[95%] h-20 pointer-events-none z-0"
            viewBox="0 0 1100 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              ref={pathRef}
              d="M 60 30 C 220 5, 340 55, 480 30 C 620 5, 740 55, 880 30 C 950 20, 1020 30, 1080 30"
              stroke="#E98FA8"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="10 10"
            />
          </svg>

          {/* 4-Step Ingredient Journey Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {BRAND.ingredients.steps.map((item, idx) => (
              <div
                key={item.title}
                ref={(el) => {
                  stepRefs.current[idx] = el;
                }}
                className="bg-white rounded-3xl p-7 border-2 border-[#E98FA8]/30 card-shadow transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_36px_rgba(233,143,168,0.25)] relative flex flex-col justify-between group"
              >
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-[#FFF1E8] border border-[#E98FA8]/40 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    {stepIcons[idx]}
                  </div>
                  <div className="text-xs font-extrabold uppercase tracking-wider text-[#9E4663] mb-1">
                    Stage 0{idx + 1}
                  </div>
                  <h3 className="text-xl font-bold text-[#382D32] mb-2.5 font-display">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-[#382D32]/75 leading-relaxed font-medium">
                    {item.detail}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[#382D32]/8 flex items-center justify-between text-[11px] font-bold text-[#9E4663] uppercase">
                  <span>Farm Sourced</span>
                  <span className="w-2 h-2 rounded-full bg-[#E98FA8]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave transition out */}
      <WaveDivider position="bottom" fill="#0D3B30" height={45} />
    </section>
  );
}
