"use client";

import React, { useState, useRef, useEffect } from "react";
import { BRAND } from "@/data/brand";
import {
  Moon,
  Clock,
  Film,
  Sparkles,
  Smartphone,
  Tractor,
  Store,
  Smile,
  Apple,
  Milk,
  ChevronRight,
  ChevronLeft,
  Play,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import { IllustratedDessertCup, IllustratedFruitBowl } from "@/components/ui/berry-illustrations";
import { registerGSAP, gsap, prefersReducedMotion } from "@/lib/gsap-init";

export function StoryFilm() {
  const [activeScene, setActiveScene] = useState<number>(1);
  const totalScenes = 5;

  const stageRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);

  const scenes = [
    {
      num: "01",
      tag: "Scene 01 • 11:48 PM",
      title: "The Late Night Scroll",
      subtitle: "Work is done. Chores finished. The world sleeps while the phone glows.",
      detail:
        "Imagine it's midnight. You've worked all day, finished your chores, taken the dog out and finally sat down to scroll through your feed in the dark room.",
      icon: Moon,
    },
    {
      num: "02",
      tag: "Scene 02 • 11:54 PM",
      title: "The Italian Gelato Reel",
      subtitle: "Molten chocolate ribbons cascading over chilled ruby strawberries.",
      detail:
        "Then you end up watching an Italian gelato reel with ribbons of chocolate drizzling over ruby strawberries. It looks so tactile, velvety, and joyful that it stops your scroll.",
      icon: Film,
    },
    {
      num: "03",
      tag: "Scene 03 • Midnight",
      title: "The Awakening Craving",
      subtitle: "“Why does accessible dessert in India have to be generic freezer cups?”",
      detail:
        "Suddenly, you need gelato. Not a generic preservative-laden tub from the freezer, but real, velvety, joyful dessert crafted with genuine fruit and fresh cream.",
      icon: Smartphone,
    },
    {
      num: "04",
      tag: "Scene 04 • The Path",
      title: "The Ingredient Journey",
      subtitle: "Farm Fresh Fruit ➔ Rich Whole Milk ➔ Indigenous Flavours ➔ Pure Joy",
      detail:
        "Berrylicious was born to connect authentic harvests: Alphonso mangoes, Mahabaleshwar berries, sitaphal, and rich whole dairy milk directly into artisan small batches.",
      icon: Apple,
    },
    {
      num: "05",
      tag: "Scene 05 • Closer & Fresher",
      title: "Direct Local Supply Chain",
      subtitle: "Shorter transit. Lower food miles. Zero artificial short-cuts.",
      detail:
        "By sourcing fruits, milk, and local flavours from nearby suppliers and regional dairy orchards, Berrylicious cuts out intermediaries to keep pricing accessible at ₹120–₹180.",
      icon: Tractor,
    },
  ];

  const current = scenes[activeScene - 1];

  const goToScene = (sceneNum: number) => {
    if (sceneNum === activeScene) return;
    if (prefersReducedMotion() || !stageRef.current) {
      setActiveScene(sceneNum);
      return;
    }

    registerGSAP();

    gsap.to(stageRef.current, {
      opacity: 0,
      y: 20,
      scale: 0.96,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setActiveScene(sceneNum);
        gsap.fromTo(
          stageRef.current,
          { opacity: 0, y: -25, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.4)" }
        );
      },
    });
  };

  return (
    <section className="relative min-h-[95vh] flex flex-col justify-between py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#090508] via-[#120810] to-[#1A0D15] text-white overflow-hidden">
      {/* Background Starlight & Ambient Cosmic Bloom */}
      <div className="absolute inset-0 pointer-events-none opacity-50" aria-hidden="true">
        {[...Array(35)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${(i % 3) + 1.5}px`,
              height: `${(i % 3) + 1.5}px`,
              top: `${((i * 19) % 95) + 3}%`,
              left: `${((i * 31) % 96) + 2}%`,
              opacity: (i % 5) * 0.15 + 0.3,
            }}
          />
        ))}
      </div>

      {/* Atmospheric Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-radial from-[#9E4663]/30 via-[#5A172D]/15 to-transparent blur-3xl pointer-events-none" />

      {/* Floating Glowing Moon Prop */}
      <div
        ref={moonRef}
        className="absolute top-16 right-8 sm:right-20 w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-[#FFF1E8] via-[#FFDDE6] to-[#E98FA8] shadow-[0_0_80px_rgba(233,143,168,0.35)] opacity-40 pointer-events-none flex items-center justify-center"
      >
        <Moon className="w-16 h-16 sm:w-20 sm:h-20 text-[#9E4663]/60" />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10 my-auto">
        {/* Film Scene Indicator Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#E98FA8] text-[#382D32] flex items-center justify-center font-mono font-black text-xs">
              {current.num}
            </span>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#E98FA8] block">
                Origin Film Sequence
              </span>
              <span className="text-sm font-bold text-white/90">{current.tag}</span>
            </div>
          </div>

          {/* Film Timeline Scrubber Navigation */}
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md p-1.5 rounded-full border border-white/15">
            {scenes.map((s, idx) => (
              <button
                key={s.num}
                onClick={() => goToScene(idx + 1)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeScene === idx + 1
                    ? "bg-[#E98FA8] text-[#382D32] shadow-sm scale-105"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <span>{s.num}</span>
              </button>
            ))}
          </div>
        </div>

        {/* MAIN CINEMATIC SCENE STAGE */}
        <div
          ref={stageRef}
          className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/15 p-8 sm:p-12 shadow-2xl min-h-[420px] flex flex-col justify-between relative overflow-hidden"
        >
          {/* Watermark Number */}
          <div
            className="absolute top-4 right-8 font-display text-[15vw] font-black text-white/[0.03] select-none pointer-events-none leading-none z-0"
            aria-hidden="true"
          >
            {current.num}
          </div>

          <div className="relative z-10">
            {/* Tagline */}
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#E98FA8] mb-2 block">
              {current.tag}
            </span>

            {/* Scene Headline */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#FFF9F0] font-display mb-4">
              {current.title}
            </h2>

            {/* Subtitle / Hook */}
            <p className="text-lg sm:text-2xl text-[#FFDDE6] font-medium max-w-3xl mb-6 leading-snug">
              {current.subtitle}
            </p>

            {/* SCENE SPECIFIC STAGE PROPS */}
            {/* Scene 01: Late night scroll */}
            {activeScene === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-6">
                <div className="md:col-span-8">
                  <p className="text-base text-white/80 leading-relaxed">{current.detail}</p>
                </div>
                <div className="md:col-span-4 flex justify-center">
                  <div className="w-36 h-36 rounded-3xl bg-black/40 border border-white/15 flex flex-col items-center justify-center p-4 text-center">
                    <Clock className="w-8 h-8 text-[#E98FA8] mb-2 animate-pulse" />
                    <span className="text-xl font-mono font-bold text-white">11:48 PM</span>
                    <span className="text-[10px] text-white/60 uppercase">Midnight Looming</span>
                  </div>
                </div>
              </div>
            )}

            {/* Scene 02: Italian Gelato Reel */}
            {activeScene === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-6">
                <div className="md:col-span-8">
                  <p className="text-base text-white/80 leading-relaxed">{current.detail}</p>
                </div>
                <div className="md:col-span-4 flex justify-center">
                  <div className="w-48 bg-[#2A1622] rounded-2xl p-3 border border-[#E98FA8]/40 shadow-xl text-center">
                    <Film className="w-6 h-6 text-[#E98FA8] mx-auto mb-1.5" />
                    <span className="text-xs font-bold text-white block mb-1">Gelato Reel Viral</span>
                    <span className="text-[10px] text-[#FFB6C6] font-mono block">
                      Ruby Strawberries & Molten Ganache
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Scene 03: The Awakening Craving */}
            {activeScene === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-6">
                <div className="md:col-span-8">
                  <p className="text-base text-white/80 leading-relaxed">{current.detail}</p>
                </div>
                <div className="md:col-span-4 flex justify-center">
                  <div className="w-32 h-32">
                    <IllustratedDessertCup className="w-full h-full drop-shadow-xl animate-berry-float" />
                  </div>
                </div>
              </div>
            )}

            {/* Scene 04: The Ingredient Journey */}
            {activeScene === 4 && (
              <div className="my-6">
                <p className="text-base text-white/80 leading-relaxed mb-6">{current.detail}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { step: "1", title: "Orchard Fruit", desc: "Alphonso & Berries", icon: Apple },
                    { step: "2", title: "Whole Dairy", desc: "Velvety Rich Cream", icon: Milk },
                    { step: "3", title: "Local Tastes", desc: "Sitaphal, Jamun, Falsa", icon: Sparkles },
                    { step: "4", title: "Berrylicious Cup", desc: "Pure Joy", icon: IllustratedDessertCup },
                  ].map((node) => {
                    const Icon = node.icon;
                    return (
                      <div
                        key={node.step}
                        className="bg-white/10 rounded-2xl p-4 border border-white/15 text-center"
                      >
                        <span className="text-[10px] font-mono font-bold text-[#E98FA8] block mb-1">
                          Step 0{node.step}
                        </span>
                        <h4 className="font-bold text-sm text-white">{node.title}</h4>
                        <p className="text-xs text-white/70">{node.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Scene 05: Direct Supply Chain */}
            {activeScene === 5 && (
              <div className="my-6">
                <p className="text-base text-white/80 leading-relaxed mb-6">{current.detail}</p>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  {[
                    { step: "01", title: "Nearby Growers", desc: "Direct farm orders", icon: Tractor },
                    { step: "02", title: "Berrylicious Hub", desc: "Small-batch prep", icon: Store },
                    { step: "03", title: "Shorter Transit", desc: "Lower food miles", icon: Sparkles },
                    { step: "04", title: "Happy Craver", desc: "Chilled fresh treats", icon: Smile },
                  ].map((s) => {
                    const Icon = s.icon;
                    return (
                      <div
                        key={s.step}
                        className="bg-white/10 rounded-2xl p-4 border border-white/15 text-center flex flex-col items-center"
                      >
                        <Icon className="w-5 h-5 text-[#E98FA8] mb-2" />
                        <span className="text-[10px] font-mono text-[#E98FA8] uppercase block">
                          Phase {s.step}
                        </span>
                        <h4 className="font-bold text-sm text-white">{s.title}</h4>
                        <p className="text-xs text-white/70">{s.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Director Scene Controls Footer */}
          <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between mt-6">
            <button
              onClick={() => goToScene(Math.max(1, activeScene - 1))}
              disabled={activeScene === 1}
              className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full border transition-all cursor-pointer ${
                activeScene === 1
                  ? "opacity-30 border-white/10 cursor-not-allowed"
                  : "bg-white/10 border-white/20 hover:bg-white/20 text-white"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Scene</span>
            </button>

            <span className="text-xs font-mono text-white/60">
              Scene {activeScene} of {totalScenes}
            </span>

            <button
              onClick={() => goToScene(Math.min(totalScenes, activeScene + 1))}
              disabled={activeScene === totalScenes}
              className={`inline-flex items-center gap-1.5 text-xs font-bold px-5 py-2 rounded-full transition-all cursor-pointer ${
                activeScene === totalScenes
                  ? "opacity-30 bg-white/10 text-white/40 cursor-not-allowed"
                  : "bg-[#E98FA8] hover:bg-[#e47e9a] text-[#382D32] shadow-md"
              }`}
            >
              <span>Next Scene</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
