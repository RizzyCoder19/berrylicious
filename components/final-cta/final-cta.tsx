import React from "react";
import Link from "next/link";
import { BRAND } from "@/data/brand";
import {
  IllustratedDessertCup,
  StrawberrySticker,
  DoodleSparkle,
  DoodleHeart,
  BadgePill,
} from "@/components/ui/berry-illustrations";
import { Sparkles, ArrowRight } from "lucide-react";

export function FinalCta() {
  return (
    <section className="py-24 bg-[#FFF1E8] relative overflow-hidden border-t border-[#E98FA8]/30">
      {/* Background soft glow blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#E98FA8]/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 mb-4">
          <BadgePill text="Ready to Taste?" color="pink" />
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#9E4663] font-display mb-6 leading-tight max-w-3xl mx-auto">
          Life gives you lemons. <br />
          <span className="text-[#382D32]">We’ll turn them into something sweeter.</span>
        </h2>

        <p className="text-base sm:text-lg text-[#382D32]/80 max-w-xl mx-auto mb-10 font-medium">
          {BRAND.finalCta.subheading}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <Link
            href="#menu"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-[#E98FA8] hover:bg-[#e37e99] text-[#382D32] shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 border border-[#9E4663]/30"
          >
            <span>Explore the Menu</span>
            <ArrowRight className="w-5 h-5 text-[#9E4663]" />
          </Link>

          <Link
            href="#build"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-white hover:bg-[#FFF9F0] text-[#9E4663] border-2 border-[#9E4663] shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-4 h-4 text-[#9E4663]" />
            <span>Build My Dessert</span>
          </Link>
        </div>

        {/* Small center dessert illustration */}
        <div className="w-36 h-36 mx-auto relative hover:scale-105 transition-transform duration-300">
          <IllustratedDessertCup className="w-full h-full drop-shadow-md" />
          <div className="absolute -top-3 -right-3 animate-pulse">
            <DoodleSparkle className="w-6 h-6 text-[#9E4663]" />
          </div>
        </div>
      </div>
    </section>
  );
}
