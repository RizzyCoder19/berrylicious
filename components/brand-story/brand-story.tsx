"use client";

import React, { useEffect, useRef } from "react";
import { BRAND } from "@/data/brand";
import { Clock, Moon, Film, Heart, Sparkles, Smartphone, Star } from "lucide-react";
import { WaveDivider } from "@/components/ui/section-dividers";
import { IllustratedDessertCup } from "@/components/ui/berry-illustrations";
import { registerGSAP, gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap-init";

export function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const cupSilhouetteRef = useRef<HTMLDivElement>(null);
  const beatRefs = useRef<(HTMLDivElement | null)[]>([]);

  const beatIcons = [
    <Moon key="1" className="w-5 h-5 text-[#E98FA8]" />,
    <Clock key="2" className="w-5 h-5 text-[#E98FA8]" />,
    <Film key="3" className="w-5 h-5 text-[#E98FA8]" />,
    <Heart key="4" className="w-5 h-5 text-[#E98FA8]" />,
  ];

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;
    registerGSAP();

    const ctx = gsap.context(() => {
      // Scrubbed cinematic transformations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 85%",
          scrub: 1,
        },
      });

      // Moon glows and rises
      if (moonRef.current) {
        tl.fromTo(
          moonRef.current,
          { y: 60, opacity: 0.3, scale: 0.8 },
          { y: -30, opacity: 1, scale: 1.1, ease: "none" },
          0
        );
      }

      // Phone screen emerges and rotates into view
      if (phoneRef.current) {
        tl.fromTo(
          phoneRef.current,
          { y: 80, opacity: 0.2, rotate: -8 },
          { y: 0, opacity: 1, rotate: 2, ease: "none" },
          0.3
        );
      }

      // Final Berrylicious epiphany cup blossoms with light
      if (cupSilhouetteRef.current) {
        tl.fromTo(
          cupSilhouetteRef.current,
          { scale: 0.5, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" },
          0.7
        );
      }

      // Story beat cards stagger in as user descends through the night
      beatRefs.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0.3, x: 40, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 50%",
              scrub: 0.6,
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
      id="story"
      className="relative overflow-hidden bg-[#1A0F15] text-white pt-20 pb-32 midnight-ambient"
    >
      {/* Ambient background glows & stars */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-[#9E4663]/25 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-[#E98FA8]/15 blur-[120px] pointer-events-none" />

      {/* Subtle Night Stars */}
      <div className="absolute inset-0 pointer-events-none opacity-40 select-none overflow-hidden" aria-hidden="true">
        <Star className="w-3 h-3 text-[#E98FA8] absolute top-12 left-[15%] animate-pulse" />
        <Star className="w-2 h-2 text-[#FFF9F0] absolute top-32 left-[45%] opacity-60" />
        <Star className="w-4 h-4 text-[#FFDDE6] absolute top-20 right-[20%] animate-pulse" />
        <Star className="w-2.5 h-2.5 text-[#E98FA8] absolute bottom-36 left-[30%]" />
        <Star className="w-3 h-3 text-[#FFF9F0] absolute bottom-24 right-[35%] opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-display text-2xl sm:text-3xl text-[#E98FA8] font-bold block mb-2">
            The Origin Scene
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#FFF9F0] mb-4 font-display">
            {BRAND.brandStory.heading}
          </h2>
          <p className="text-base sm:text-lg text-[#FFF9F0]/80 leading-relaxed font-medium">
            How a late-night dessert craving sparked the recipe for a vibrant startup.
          </p>
        </div>

        {/* 2-Column Cinematic Layout: Stage Prop on Left + Narrative Journey on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Storytelling Stage (Moon + Phone Mockup + Epiphany Cup) */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            {/* The Glowing Moon */}
            <div
              ref={moonRef}
              className="w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-[#FFF1E8] via-[#FFDDE6] to-[#E98FA8] shadow-[0_0_60px_rgba(233,143,168,0.4)] flex items-center justify-center relative mb-8"
            >
              <div className="absolute inset-2 rounded-full border border-white/40" />
              <Moon className="w-20 h-20 text-[#9E4663]/70 drop-shadow-md" />
              <div className="absolute -bottom-3 px-4 py-1 rounded-full bg-[#1A0F15] border border-[#E98FA8]/60 text-xs font-bold text-[#E98FA8] shadow-md flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-[#E98FA8]" />
                <span>12:47 AM Epiphany</span>
              </div>
            </div>

            {/* Late Night Phone Frame Showing Gelato Reel */}
            <div
              ref={phoneRef}
              className="w-64 sm:w-72 bg-[#2A1622] rounded-3xl p-4 border-2 border-[#E98FA8]/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden backdrop-blur-md"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                <div className="flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-[#E98FA8]" />
                  <span className="text-[11px] font-bold text-white/80">Instagram Reel</span>
                </div>
                <span className="text-[10px] text-[#E98FA8] font-bold">Midnight Craving</span>
              </div>

              {/* Reel Content Inside Phone */}
              <div className="bg-[#1A0F15] rounded-2xl p-4 border border-[#E98FA8]/20 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#E98FA8]/20 flex items-center justify-center mb-2">
                  <Film className="w-8 h-8 text-[#E98FA8]" />
                </div>
                <p className="text-xs font-extrabold text-[#FFF9F0] mb-1">
                  Italian Stracciatella & Wild Berry Swirl
                </p>
                <p className="text-[10px] text-[#E98FA8] font-mono mb-2">
                  &ldquo;Why can&apos;t I get this right now in my city?&rdquo;
                </p>

                {/* The Born Cup */}
                <div ref={cupSilhouetteRef} className="w-24 h-24 mt-2">
                  <IllustratedDessertCup className="w-full h-full drop-shadow-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Timeline Narrative Beats */}
          <div className="lg:col-span-7 space-y-6">
            {BRAND.brandStory.beats.map((beat, idx) => (
              <div
                key={beat.badge}
                ref={(el) => {
                  beatRefs.current[idx] = el;
                }}
                className={`rounded-3xl p-6 sm:p-8 border transition-all duration-300 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center gap-6 group hover:-translate-y-1 ${
                  idx === BRAND.brandStory.beats.length - 1
                    ? "bg-gradient-to-r from-[#382D32]/95 to-[#2A1622]/95 border-2 border-[#E98FA8] shadow-[0_0_35px_rgba(233,143,168,0.3)]"
                    : "bg-white/[0.06] border-white/10 hover:border-white/20 hover:bg-white/[0.09]"
                }`}
              >
                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-[#9E4663]/40 border border-[#E98FA8]/50 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                    {beatIcons[idx]}
                  </div>
                  <div className="sm:hidden">
                    <span className="text-xs font-bold uppercase text-[#E98FA8] block">
                      {beat.badge}
                    </span>
                    <span className="text-sm font-extrabold text-[#FFF9F0]">{beat.time}</span>
                  </div>
                </div>

                <div className="hidden sm:block shrink-0 w-32">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E98FA8] block">
                    {beat.badge}
                  </span>
                  <span className="text-base font-extrabold text-[#FFF9F0]">{beat.time}</span>
                </div>

                <div className="border-l-0 sm:border-l sm:border-white/15 sm:pl-6">
                  <p className="text-base sm:text-lg text-[#FFF9F0]/90 leading-relaxed font-medium">
                    {beat.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave transition out to warm parchment */}
      <WaveDivider position="bottom" fill="#FDF7F0" height={45} />
    </section>
  );
}
