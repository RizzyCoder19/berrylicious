import React from "react";
import { Hero } from "@/components/hero/hero";
import { BrandIntro } from "@/components/brand-intro/brand-intro";
import { ChapterPortal } from "@/components/home/chapter-portal";
import { ChapterFooter } from "@/components/navigation/chapter-footer";
import { FinalCta } from "@/components/final-cta/final-cta";
import { Footer } from "@/components/footer/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFF9F0] text-[#382D32] relative selection:bg-[#E98FA8] selection:text-[#382D32]">
      {/* 1. Focused Hero Opening */}
      <Hero />

      {/* 2. Brand Introduction (Home-grown goodness & 3 core pillars) */}
      <BrandIntro />

      {/* 3. The Visual Chapter Portal (Interactive entrypoints to each chapter) */}
      <ChapterPortal />

      {/* 4. Next Chapter Linkage to /discover */}
      <ChapterFooter
        currentPath="/"
        nextPath="/discover"
        nextLabel="Chapter 02: Discover the Sweet Spot"
        customTagline="Explore positioning, test the Craving Selector, and discover flavor moods."
      />

      {/* 5. Brand Invitation CTA */}
      <FinalCta />

      {/* 6. Footer */}
      <Footer />
    </main>
  );
}
