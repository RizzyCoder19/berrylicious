"use client";

import React, { useEffect, useRef } from "react";
import { TransitionLink } from "@/components/navigation/transition-provider";
import { BRAND } from "@/data/brand";
import {
  IllustratedDessertCup,
  StrawberrySticker,
  BlueberrySticker,
  DoodleSparkle,
  BadgePill,
} from "@/components/ui/berry-illustrations";
import { Sparkles, ArrowRight, Heart } from "lucide-react";
import { registerGSAP, gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap-init";

export function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cupRef = useRef<HTMLDivElement>(null);
  const berry1Ref = useRef<HTMLDivElement>(null);
  const berry2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;
    registerGSAP();

    const ctx = gsap.context(() => {
      // Headline line-by-line reveal
      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll(".cta-line");
        gsap.fromTo(
          lines,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.18,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Floating dessert cup scale and bounce
      if (cupRef.current) {
        gsap.fromTo(
          cupRef.current,
          { scale: 0.8, opacity: 0, y: 30 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "back.out(1.6)",
            scrollTrigger: {
              trigger: cupRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Parallax floating berries on scroll
      if (berry1Ref.current) {
        gsap.to(berry1Ref.current, {
          y: -70,
          rotate: 25,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      if (berry2Ref.current) {
        gsap.to(berry2Ref.current, {
          y: -50,
          rotate: -20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 relative overflow-hidden bg-gradient-to-br from-[#E98FA8] via-[#9E4663] to-[#382D32] animate-gradient-shift text-white"
    >
      {/* Background soft glow blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#E98FA8]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Parallax Berries */}
      <div ref={berry1Ref} className="absolute top-16 left-8 sm:left-24 opacity-80 pointer-events-none hidden md:block">
        <StrawberrySticker className="w-20 h-20 drop-shadow-xl" />
      </div>
      <div ref={berry2Ref} className="absolute bottom-20 right-8 sm:right-24 opacity-80 pointer-events-none hidden md:block">
        <BlueberrySticker className="w-16 h-16 drop-shadow-xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 mb-6">
          <BadgePill text="The Grand Finale" color="cream" />
        </div>

        <h2
          ref={headlineRef}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FFF9F0] font-display mb-6 leading-tight max-w-3xl mx-auto"
        >
          <span className="cta-line block opacity-0">Life gives you lemons.</span>
          <span className="cta-line block opacity-0 text-[#FFDDE6]">
            We’ll turn them into something sweeter.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-[#FFF9F0]/85 max-w-xl mx-auto mb-10 font-medium">
          {BRAND.finalCta.subheading}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <TransitionLink
            href="/menu"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-[#FFF9F0] hover:bg-white text-[#9E4663] shadow-2xl transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0"
          >
            <span>Explore the Menu</span>
            <ArrowRight className="w-5 h-5 text-[#9E4663]" />
          </TransitionLink>

          <TransitionLink
            href="/builder"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-white/15 hover:bg-white/25 text-[#FFF9F0] border-2 border-white/40 shadow-lg transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0 backdrop-blur-xs"
          >
            <Sparkles className="w-4 h-4 text-[#FFDDE6]" />
            <span>Build My Dessert</span>
          </TransitionLink>
        </div>

        {/* Centerpiece Finale Illustration */}
        <div
          ref={cupRef}
          className="w-40 h-40 mx-auto relative hover:scale-105 transition-transform duration-300 opacity-0"
        >
          <IllustratedDessertCup className="w-full h-full drop-shadow-2xl animate-berry-float" />
          <div className="absolute -top-3 -right-3 animate-pulse">
            <DoodleSparkle className="w-8 h-8 text-[#FFF9F0]" />
          </div>
        </div>
      </div>
    </section>
  );
}
