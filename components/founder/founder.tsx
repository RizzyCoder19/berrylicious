"use client";

import React, { useEffect, useRef } from "react";
import { BRAND } from "@/data/brand";
import { StrawberrySticker, BadgePill } from "@/components/ui/berry-illustrations";
import { Quote } from "lucide-react";
import { registerGSAP, gsap, prefersReducedMotion } from "@/lib/gsap-init";

export function Founder() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;
    registerGSAP();

    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.8,
            delay: 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            delay: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: quoteRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-28 bg-[#FDF7F0] relative overflow-hidden border-t border-[#E98FA8]/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={cardRef}
          className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border-2 border-[#E98FA8]/40 card-shadow relative overflow-hidden opacity-0"
        >
          {/* Subtle warm background glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#FFF1E8] rounded-full blur-3xl -z-10 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Column: Avatar Graphic */}
            <div className="md:col-span-4 flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-[#FFF1E8] via-[#E98FA8]/40 to-[#BFE9DE]/50 p-1.5 border-2 border-[#9E4663] shadow-lg flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-[#FFF9F0] flex flex-col items-center justify-center relative overflow-hidden">
                    <span className="text-5xl select-none">👩‍🍳</span>
                  </div>
                </div>

                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 border border-[#9E4663] shadow-md animate-bounce">
                  <StrawberrySticker className="w-7 h-7" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-[#382D32] font-display">{BRAND.founder.name}</h3>
              <p className="text-xs font-bold uppercase tracking-wider text-[#9E4663] mt-0.5 font-sans">
                {BRAND.founder.title}
              </p>
              <span className="text-xs text-[#382D32]/60 font-semibold mt-1">
                Student Entrepreneur
              </span>
            </div>

            {/* Right Column: Story & Vision */}
            <div className="md:col-span-8 border-t md:border-t-0 md:border-l border-[#382D32]/10 pt-6 md:pt-0 md:pl-8">
              <div className="flex items-center gap-2 mb-3">
                <BadgePill text="Founder's Note" color="pink" />
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-[#382D32] mb-3 font-display">
                Meet Tanvi.
              </h2>

              <div ref={lineRef} className="w-16 h-1 bg-[#E98FA8] rounded-full mb-5" />

              <p className="text-base sm:text-lg text-[#382D32]/85 leading-relaxed font-medium mb-6">
                {BRAND.founder.bio}
              </p>

              {/* Quote box */}
              <div
                ref={quoteRef}
                className="bg-[#FFF1E8] rounded-2xl p-5 border-l-4 border-[#9E4663] relative opacity-0"
              >
                <Quote className="w-6 h-6 text-[#9E4663]/30 absolute top-3 right-3" />
                <p className="text-sm sm:text-base text-[#9E4663] font-semibold italic leading-relaxed">
                  &ldquo;{BRAND.founder.quote}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
