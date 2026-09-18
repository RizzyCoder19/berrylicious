"use client";

import React, { useEffect, useRef } from "react";
import { TransitionLink } from "@/components/navigation/transition-provider";
import {
  IllustratedDessertCup,
  StrawberrySticker,
  BlueberrySticker,
  BowRibbonSticker,
  BadgePill,
  DoodleSparkle,
  DoodleHeart,
} from "@/components/ui/berry-illustrations";
import { ArrowRight, Sparkles, Heart } from "lucide-react";
import { registerGSAP, gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap-init";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cupRef = useRef<HTMLDivElement>(null);
  const sticker1Ref = useRef<HTMLDivElement>(null);
  const sticker2Ref = useRef<HTMLDivElement>(null);
  const sticker3Ref = useRef<HTMLDivElement>(null);
  const sticker4Ref = useRef<HTMLDivElement>(null);
  const sticker5Ref = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const credRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    registerGSAP();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Headline words cascade
      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll(".hero-line");
        tl.fromTo(
          lines,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 },
          0
        );
      }

      // Sub-copy
      if (subRef.current) {
        tl.fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.5);
      }

      // CTAs
      if (ctaRef.current) {
        tl.fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.7);
      }

      // Credibility bar
      if (credRef.current) {
        tl.fromTo(credRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.9);
      }

      // Cup entrance
      if (cupRef.current) {
        tl.fromTo(
          cupRef.current,
          { opacity: 0, scale: 0.8, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: "back.out(1.4)" },
          0.2
        );
      }

      // Stickers pop in staggered
      const stickers = [sticker1Ref.current, sticker2Ref.current, sticker3Ref.current, sticker4Ref.current, sticker5Ref.current].filter(Boolean);
      tl.fromTo(
        stickers,
        { opacity: 0, scale: 0, rotate: -20 },
        { opacity: 1, scale: 1, rotate: 0, duration: 0.5, stagger: 0.12, ease: "back.out(2)" },
        0.6
      );

      // Scrubbed ScrollTrigger Choreography on Scroll
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Headline recedes and floats upward
      if (headlineRef.current) {
        scrollTl.to(
          headlineRef.current,
          { y: -70, opacity: 0.25, scale: 0.96, ease: "none" },
          0
        );
      }

      // Cup scales slightly and translates forward
      if (cupRef.current) {
        scrollTl.to(
          cupRef.current,
          { y: 70, scale: 1.1, rotate: 5, ease: "none" },
          0
        );
      }

      // Stickers separate outwards dramatically
      if (sticker1Ref.current) {
        scrollTl.to(sticker1Ref.current, { x: 50, y: 80, rotate: 18, ease: "none" }, 0);
      }
      if (sticker2Ref.current) {
        scrollTl.to(sticker2Ref.current, { x: -60, y: -40, rotate: -16, ease: "none" }, 0);
      }
      if (sticker3Ref.current) {
        scrollTl.to(sticker3Ref.current, { x: 70, y: -20, rotate: 30, scale: 1.2, ease: "none" }, 0);
      }
      if (sticker4Ref.current) {
        scrollTl.to(sticker4Ref.current, { x: -50, y: 60, rotate: -25, scale: 1.15, ease: "none" }, 0);
      }
      if (sticker5Ref.current) {
        scrollTl.to(sticker5Ref.current, { y: -80, scale: 0.8, rotate: -10, ease: "none" }, 0);
      }

      // Background parallax blobs at different depths
      if (blob1Ref.current) {
        scrollTl.to(blob1Ref.current, { y: -120, x: -30, scale: 1.2, ease: "none" }, 0);
      }
      if (blob2Ref.current) {
        scrollTl.to(blob2Ref.current, { y: 90, x: 40, scale: 0.9, ease: "none" }, 0);
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[92vh] flex items-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-radial from-[#FFF1E8] via-[#FFF9F0] to-[#FFF9F0]"
    >
      {/* Decorative ambient backdrop blobs */}
      <div ref={blob1Ref} className="absolute -top-12 -left-12 w-80 h-80 rounded-full bg-[#E98FA8]/18 blur-3xl pointer-events-none" />
      <div ref={blob2Ref} className="absolute top-1/2 right-0 w-[28rem] h-[28rem] rounded-full bg-[#BFE9DE]/22 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 left-1/3 w-80 h-80 rounded-full bg-[#B8DDF2]/15 blur-3xl pointer-events-none" />

      {/* Floating doodles */}
      <div className="absolute top-28 left-8 hidden lg:block opacity-60 pointer-events-none">
        <DoodleSparkle className="w-8 h-8 text-[#9E4663]" />
      </div>
      <div className="absolute bottom-20 left-16 hidden lg:block opacity-50 pointer-events-none rotate-12">
        <DoodleHeart className="w-6 h-6 fill-[#E98FA8] stroke-[#9E4663]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 mb-5">
              <BadgePill text="Desserts • Coffee • Good Vibes" color="pink" />
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-[#9E4663]/80 bg-[#FFF1E8] px-2.5 py-1 rounded-full border border-[#E98FA8]/40">
                <Sparkles className="w-3 h-3 text-[#9E4663]" />
                Shark Tank Concept
              </span>
            </div>

            {/* Main Headline — split into lines for sequential animation */}
            <h1
              ref={headlineRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-bold tracking-tight text-[#9E4663] font-display leading-[1.08] mb-6"
            >
              <span className="hero-line block opacity-0">A little sweet.</span>
              <span className="hero-line block opacity-0 relative text-[#382D32]">
                A little chaotic.
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#E98FA8]"
                  viewBox="0 0 240 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M3 9C60 3 160 3 237 9" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
              <span className="hero-line block opacity-0 text-[#9E4663] italic">Completely Berrylicious.</span>
            </h1>

            {/* Supporting line */}
            <p
              ref={subRef}
              className="text-lg sm:text-xl text-[#382D32]/85 max-w-xl font-medium leading-relaxed mb-8 opacity-0"
            >
              Desserts that turn ordinary moments into something sweeter. From farm-fresh real fruit
              sundaes to rich Italian-style gelato and golden Belgian waffles.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10 opacity-0">
              <TransitionLink
                href="/menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-[#E98FA8] hover:bg-[#e37e99] text-[#382D32] shadow-[0_8px_24px_rgba(233,143,168,0.5)] hover:shadow-[0_10px_28px_rgba(233,143,168,0.7)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 border border-[#9E4663]/30"
              >
                <span>Explore the Menu</span>
                <ArrowRight className="w-5 h-5 text-[#9E4663]" />
              </TransitionLink>

              <TransitionLink
                href="/builder"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-[#FFF9F0] hover:bg-[#FFF1E8] text-[#9E4663] border-2 border-[#9E4663] shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sparkles className="w-4 h-4 text-[#9E4663]" />
                <span>Build Your Dessert</span>
              </TransitionLink>
            </div>

            {/* Credibility bar */}
            <div
              ref={credRef}
              className="flex flex-wrap items-center gap-6 pt-4 border-t border-[#E98FA8]/30 text-xs sm:text-sm font-semibold text-[#382D32]/75 opacity-0"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E98FA8]" />
                <span>Local Fruit Sourcing</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#BFE9DE]" />
                <span>₹120–₹180 Sweet Spot</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B8DDF2]" />
                <span>24/7 Delivery Vision</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div ref={cupRef} className="relative w-72 sm:w-80 md:w-96 aspect-square opacity-0">
              {/* Soft glow */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#FFF1E8] via-[#E98FA8]/20 to-[#BFE9DE]/30 blur-xl" />

              {/* The Illustrated Cup — CSS float animation */}
              <div className="relative z-10 w-full h-full animate-berry-float">
                <IllustratedDessertCup className="w-full h-full drop-shadow-xl" />
              </div>

              {/* Floating Sticker 1 */}
              <div
                ref={sticker1Ref}
                className="absolute -bottom-3 right-4 sm:-right-4 z-20 bg-[#FFF9F0] border-2 border-[#9E4663] rounded-3xl px-4 py-2 shadow-lg rotate-6 select-none flex items-center gap-2 opacity-0"
              >
                <span className="text-xl">🍓</span>
                <div>
                  <p className="font-display font-bold text-lg text-[#9E4663] leading-none">Scoop Happiness</p>
                  <p className="text-[9px] font-bold text-[#382D32]/70 uppercase tracking-wider">Fresh Daily</p>
                </div>
              </div>

              {/* Floating Sticker 2 */}
              <div
                ref={sticker2Ref}
                className="absolute -top-4 -left-4 sm:-left-8 z-20 bg-[#FFF1E8] border border-[#9E4663]/30 rounded-2xl p-3 shadow-md -rotate-6 select-none max-w-[140px] opacity-0"
              >
                <p className="font-display text-sm font-bold text-[#9E4663] leading-tight">Good Food</p>
                <p className="font-display text-base font-bold text-[#382D32] leading-tight flex items-center gap-1">
                  Brighter Days <Heart className="w-3.5 h-3.5 fill-[#E98FA8] text-[#E98FA8] inline" />
                </p>
              </div>

              {/* Floating Sticker 3: Strawberry */}
              <div ref={sticker3Ref} className="absolute top-1/2 -right-6 sm:-right-8 z-20 pointer-events-none opacity-0">
                <StrawberrySticker className="w-14 h-14 drop-shadow-md" />
              </div>

              {/* Floating Sticker 4: Blueberry */}
              <div ref={sticker4Ref} className="absolute bottom-12 -left-6 z-20 pointer-events-none opacity-0">
                <BlueberrySticker className="w-12 h-12 drop-shadow-md -rotate-12" />
              </div>

              {/* Floating Sticker 5: Ribbon */}
              <div ref={sticker5Ref} className="absolute -top-6 right-8 z-20 pointer-events-none rotate-12 opacity-0">
                <BowRibbonSticker className="w-14 h-12 drop-shadow-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
