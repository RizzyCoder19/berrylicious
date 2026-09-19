"use client";

import React, { useEffect, useRef, useState } from "react";
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
import { ArrowRight, Sparkles, Heart, Play, Film, Compass } from "lucide-react";
import { registerGSAP, gsap, prefersReducedMotion } from "@/lib/gsap-init";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const filmOverlayRef = useRef<HTMLDivElement>(null);
  const introSeedRef = useRef<HTMLDivElement>(null);
  const introWordmarkRef = useRef<HTMLDivElement>(null);
  const shockwaveRef = useRef<HTMLDivElement>(null);

  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const credRef = useRef<HTMLDivElement>(null);

  const cupRef = useRef<HTMLDivElement>(null);
  const sticker1Ref = useRef<HTMLDivElement>(null);
  const sticker2Ref = useRef<HTMLDivElement>(null);
  const sticker3Ref = useRef<HTMLDivElement>(null);
  const sticker4Ref = useRef<HTMLDivElement>(null);
  const sticker5Ref = useRef<HTMLDivElement>(null);

  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  const [hasPlayedFilm, setHasPlayedFilm] = useState(false);

  const playOpeningFilm = () => {
    if (prefersReducedMotion()) {
      if (filmOverlayRef.current) filmOverlayRef.current.style.display = "none";
      return;
    }
    registerGSAP();

    const masterTl = gsap.timeline({
      onComplete: () => {
        setHasPlayedFilm(true);
      },
    });

    // Reset initial states
    gsap.set(filmOverlayRef.current, { display: "flex", opacity: 1 });
    gsap.set(introSeedRef.current, { scale: 0, opacity: 0, rotate: -30 });
    gsap.set(introWordmarkRef.current, { opacity: 0, letterSpacing: "0.5em", y: 20 });
    gsap.set(shockwaveRef.current, { scale: 0.1, opacity: 0 });

    if (headlineRef.current) {
      const lines = headlineRef.current.querySelectorAll(".film-line");
      gsap.set(lines, { opacity: 0, y: 50 });
    }
    gsap.set(subRef.current, { opacity: 0, y: 20 });
    gsap.set(ctaRef.current, { opacity: 0, y: 20 });
    gsap.set(credRef.current, { opacity: 0 });
    gsap.set(cupRef.current, { opacity: 0, scale: 0.7, y: 70, rotate: -8 });

    const stickers = [
      sticker1Ref.current,
      sticker2Ref.current,
      sticker3Ref.current,
      sticker4Ref.current,
      sticker5Ref.current,
    ].filter(Boolean);
    gsap.set(stickers, { opacity: 0, scale: 0, rotate: -20 });

    // ACT 1: Tiny berry seed appears in black aperture
    masterTl
      .to(introSeedRef.current, {
        scale: 1.2,
        opacity: 1,
        rotate: 0,
        duration: 0.7,
        ease: "back.out(2)",
      })
      // ACT 2: Typography emerges
      .to(
        introWordmarkRef.current,
        {
          opacity: 1,
          letterSpacing: "0.2em",
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3"
      )
      // ACT 3: Shockwave blossoms and aperture dissolves
      .to(
        shockwaveRef.current,
        {
          scale: 14,
          opacity: 0.9,
          duration: 0.6,
          ease: "power2.inOut",
        },
        "+=0.2"
      )
      .to(
        filmOverlayRef.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            if (filmOverlayRef.current) filmOverlayRef.current.style.display = "none";
          },
        },
        "-=0.3"
      )
      // ACT 4: Centerpiece cup springs in
      .to(
        cupRef.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotate: 0,
          duration: 0.9,
          ease: "back.out(1.5)",
        },
        "-=0.2"
      )
      // ACT 5: Stickers explode outwards into midground
      .to(
        stickers,
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.55,
          stagger: 0.1,
          ease: "back.out(2.2)",
        },
        "-=0.5"
      );

    // ACT 6: Headline lines assemble
    if (headlineRef.current) {
      const lines = headlineRef.current.querySelectorAll(".film-line");
      masterTl.to(
        lines,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.14,
          ease: "power3.out",
        },
        "-=0.6"
      );
    }

    // ACT 7: Subtitle, CTAs, Credibility
    masterTl
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
      .to(credRef.current, { opacity: 1, duration: 0.4 }, "-=0.2");
  };

  useEffect(() => {
    playOpeningFilm();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[95vh] flex items-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-radial from-[#FFF1E8] via-[#FFF9F0] to-[#FFF9F0]"
    >
      {/* CINEMATIC PROLOGUE FILM LAYER */}
      <div
        ref={filmOverlayRef}
        className="fixed inset-0 z-[100] bg-[#160A11] flex flex-col items-center justify-center pointer-events-none"
      >
        <div
          ref={shockwaveRef}
          className="absolute w-36 h-36 rounded-full bg-radial from-[#E98FA8] via-[#9E4663] to-transparent pointer-events-none"
        />

        <div className="relative z-10 flex flex-col items-center gap-4">
          <div
            ref={introSeedRef}
            className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#9E4663] to-[#E98FA8] border-2 border-white/40 shadow-[0_0_50px_rgba(233,143,168,0.7)] flex items-center justify-center"
          >
            <span className="text-4xl select-none animate-bounce">🍓</span>
          </div>

          <div ref={introWordmarkRef} className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#FFF9F0] font-display tracking-wider">
              BERRYLICIOUS
            </h2>
            <p className="text-xs uppercase font-mono tracking-widest text-[#E98FA8] mt-1">
              Chapter 01 • The Opening Film
            </p>
          </div>
        </div>
      </div>

      {/* Decorative ambient backdrop blobs */}
      <div
        ref={blob1Ref}
        className="absolute -top-12 -left-12 w-96 h-96 rounded-full bg-[#E98FA8]/20 blur-3xl pointer-events-none"
      />
      <div
        ref={blob2Ref}
        className="absolute top-1/2 right-0 w-[30rem] h-[30rem] rounded-full bg-[#BFE9DE]/25 blur-3xl pointer-events-none"
      />
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
          {/* Left Column: Film Story Intro */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow badge & Film Mode Indicator */}
            <div className="inline-flex items-center gap-2 mb-5">
              <BadgePill text="Chapter 01 • Opening World" color="pink" />
              <button
                type="button"
                onClick={playOpeningFilm}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9E4663] bg-white/80 hover:bg-white px-3 py-1 rounded-full border border-[#E98FA8]/40 shadow-xs transition-transform active:scale-95 cursor-pointer"
                title="Replay Opening Sequence"
              >
                <Film className="w-3 h-3 text-[#9E4663]" />
                <span>Replay Intro Film</span>
              </button>
            </div>

            {/* Main Headline — Choregraphed lines */}
            <h1
              ref={headlineRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-bold tracking-tight text-[#9E4663] font-display leading-[1.08] mb-6"
            >
              <span className="film-line block">A little sweet.</span>
              <span className="film-line block relative text-[#382D32]">
                A little chaotic.
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#E98FA8]"
                  viewBox="0 0 240 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M3 9C60 3 160 3 237 9"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="film-line block text-[#9E4663] italic">
                Completely Berrylicious.
              </span>
            </h1>

            {/* Supporting line */}
            <p
              ref={subRef}
              className="text-lg sm:text-xl text-[#382D32]/85 max-w-xl font-medium leading-relaxed mb-8"
            >
              Desserts that turn ordinary moments into something sweeter. From farm-fresh real fruit
              sundaes to rich Italian-style gelato, London strawberry cups, and golden Belgian waffles.
            </p>

            {/* Call to Action Buttons */}
            <div ref={ctaRef} className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <TransitionLink
                href="/discover"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-[#E98FA8] hover:bg-[#e37e99] text-[#382D32] shadow-[0_8px_24px_rgba(233,143,168,0.5)] hover:shadow-[0_10px_28px_rgba(233,143,168,0.7)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 border border-[#9E4663]/30"
              >
                <Compass className="w-5 h-5 text-[#9E4663]" />
                <span>Begin the Journey</span>
                <ArrowRight className="w-5 h-5 text-[#9E4663]" />
              </TransitionLink>

              <TransitionLink
                href="/menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-[#FFF9F0] hover:bg-[#FFF1E8] text-[#9E4663] border-2 border-[#9E4663] shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>45+ Item Menu</span>
              </TransitionLink>
            </div>

            {/* Credibility bar */}
            <div
              ref={credRef}
              className="flex flex-wrap items-center gap-6 pt-4 border-t border-[#E98FA8]/30 text-xs sm:text-sm font-semibold text-[#382D32]/75"
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

          {/* Right Column: Hero Visual Centerpiece */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div ref={cupRef} className="relative w-72 sm:w-80 md:w-96 aspect-square">
              {/* Soft atmospheric radial glow */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#FFF1E8] via-[#E98FA8]/25 to-[#BFE9DE]/30 blur-2xl pointer-events-none" />

              {/* The Illustrated Cup — Float dynamics */}
              <div className="relative z-10 w-full h-full animate-berry-float">
                <IllustratedDessertCup className="w-full h-full drop-shadow-2xl" />
              </div>

              {/* Floating Sticker 1: Scoop Happiness */}
              <div
                ref={sticker1Ref}
                className="absolute -bottom-3 right-4 sm:-right-4 z-20 bg-[#FFF9F0] border-2 border-[#9E4663] rounded-3xl px-4 py-2 shadow-xl rotate-6 select-none flex items-center gap-2"
              >
                <span className="text-xl">🍓</span>
                <div>
                  <p className="font-display font-bold text-lg text-[#9E4663] leading-none">
                    Scoop Happiness
                  </p>
                  <p className="text-[9px] font-bold text-[#382D32]/70 uppercase tracking-wider">
                    Fresh Daily
                  </p>
                </div>
              </div>

              {/* Floating Sticker 2: Good Food */}
              <div
                ref={sticker2Ref}
                className="absolute -top-4 -left-4 sm:-left-8 z-20 bg-[#FFF1E8] border border-[#9E4663]/30 rounded-2xl p-3 shadow-lg -rotate-6 select-none max-w-[140px]"
              >
                <p className="font-display text-sm font-bold text-[#9E4663] leading-tight">
                  Good Food
                </p>
                <p className="font-display text-base font-bold text-[#382D32] leading-tight flex items-center gap-1">
                  Brighter Days{" "}
                  <Heart className="w-3.5 h-3.5 fill-[#E98FA8] text-[#E98FA8] inline" />
                </p>
              </div>

              {/* Floating Sticker 3: Strawberry */}
              <div
                ref={sticker3Ref}
                className="absolute top-1/2 -right-6 sm:-right-8 z-20 pointer-events-none"
              >
                <StrawberrySticker className="w-14 h-14 drop-shadow-md" />
              </div>

              {/* Floating Sticker 4: Blueberry */}
              <div
                ref={sticker4Ref}
                className="absolute bottom-12 -left-6 z-20 pointer-events-none"
              >
                <BlueberrySticker className="w-12 h-12 drop-shadow-md -rotate-12" />
              </div>

              {/* Floating Sticker 5: Ribbon */}
              <div
                ref={sticker5Ref}
                className="absolute -top-6 right-8 z-20 pointer-events-none rotate-12"
              >
                <BowRibbonSticker className="w-14 h-12 drop-shadow-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
