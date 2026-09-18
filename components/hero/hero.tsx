"use client";

import React from "react";
import Link from "next/link";
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

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-radial from-[#FFF1E8] via-[#FFF9F0] to-[#FFF9F0]"
    >
      {/* Decorative ambient backdrop blobs */}
      <div className="absolute -top-12 -left-12 w-72 h-72 rounded-full bg-[#E98FA8]/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-[#BFE9DE]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 left-1/3 w-80 h-80 rounded-full bg-[#B8DDF2]/15 blur-3xl pointer-events-none" />

      {/* Floating doodles in corners */}
      <div className="absolute top-28 left-8 hidden lg:block animate-pulse opacity-70 pointer-events-none">
        <DoodleSparkle className="w-8 h-8 text-[#9E4663]" />
      </div>
      <div className="absolute bottom-20 left-16 hidden lg:block opacity-60 pointer-events-none rotate-12">
        <DoodleHeart className="w-6 h-6 fill-[#E98FA8] stroke-[#9E4663]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Story & Hero Copy */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 mb-4">
              <BadgePill text="Desserts • Coffee • Good Vibes" color="pink" />
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-[#9E4663]/80 bg-[#FFF1E8] px-2.5 py-1 rounded-full border border-[#E98FA8]/40">
                <Sparkles className="w-3 h-3 text-[#9E4663]" />
                Shark Tank Concept
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-bold tracking-tight text-[#9E4663] font-display leading-[1.08] mb-6">
              A little sweet. <br />
              <span className="relative inline-block text-[#382D32]">
                A little chaotic.
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#E98FA8]"
                  viewBox="0 0 240 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 9C60 3 160 3 237 9"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <br />
              <span className="text-[#9E4663] italic">Completely Berrylicious.</span>
            </h1>

            {/* Supporting line */}
            <p className="text-lg sm:text-xl text-[#382D32]/85 max-w-xl font-medium leading-relaxed mb-8">
              Desserts that turn ordinary moments into something sweeter. From farm-fresh real fruit
              sundaes to rich Italian-style gelato and golden Belgian waffles.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <Link
                href="#menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-[#E98FA8] hover:bg-[#e37e99] text-[#382D32] shadow-[0_8px_24px_rgba(233,143,168,0.5)] hover:shadow-[0_10px_28px_rgba(233,143,168,0.7)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 border border-[#9E4663]/30"
              >
                <span>Explore the Menu</span>
                <ArrowRight className="w-5 h-5 text-[#9E4663]" />
              </Link>

              <Link
                href="#build"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-[#FFF9F0] hover:bg-[#FFF1E8] text-[#9E4663] border-2 border-[#9E4663] shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sparkles className="w-4 h-4 text-[#9E4663]" />
                <span>Build Your Dessert</span>
              </Link>
            </div>

            {/* Quick credibility pill bar */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-[#E98FA8]/30 text-xs sm:text-sm font-semibold text-[#382D32]/75">
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

          {/* Right Column: Hero Visual Composition matching reference image */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Main dessert art centerpiece */}
            <div className="relative w-72 sm:w-88 md:w-96 aspect-square transition-transform duration-500 hover:scale-[1.02]">
              {/* Soft background glow */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#FFF1E8] via-[#E98FA8]/20 to-[#BFE9DE]/30 blur-xl" />

              {/* The Illustrated Cup */}
              <IllustratedDessertCup className="relative z-10 w-full h-full drop-shadow-xl" />

              {/* Floating Sticker 1: SCOOP HAPPINESS badge */}
              <div className="absolute -bottom-3 right-4 sm:-right-4 z-20 bg-[#FFF9F0] border-2 border-[#9E4663] rounded-3xl px-4 py-2 shadow-lg rotate-6 select-none flex items-center gap-2">
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

              {/* Floating Sticker 2: Hand-drawn note */}
              <div className="absolute -top-4 -left-4 sm:-left-8 z-20 bg-[#FFF1E8] border border-[#9E4663]/30 rounded-2xl p-3 shadow-md -rotate-6 select-none max-w-[140px]">
                <p className="font-display text-sm font-bold text-[#9E4663] leading-tight">
                  Good Food
                </p>
                <p className="font-display text-base font-bold text-[#382D32] leading-tight flex items-center gap-1">
                  Brighter Days <Heart className="w-3.5 h-3.5 fill-[#E98FA8] text-[#E98FA8] inline" />
                </p>
              </div>

              {/* Floating Sticker 3: Cute Strawberry */}
              <div className="absolute top-1/2 -right-6 sm:-right-8 z-20 pointer-events-none animate-bounce duration-1000">
                <StrawberrySticker className="w-14 h-14 drop-shadow-md" />
              </div>

              {/* Floating Sticker 4: Cute Blueberry */}
              <div className="absolute bottom-12 -left-6 z-20 pointer-events-none">
                <BlueberrySticker className="w-12 h-12 drop-shadow-md -rotate-12" />
              </div>

              {/* Floating Sticker 5: Cute Ribbon Bow */}
              <div className="absolute -top-6 right-8 z-20 pointer-events-none rotate-12">
                <BowRibbonSticker className="w-14 h-12 drop-shadow-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
