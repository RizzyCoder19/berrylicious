import type { Metadata } from "next";
import { CravingSelector } from "@/components/craving-selector/craving-selector";
import { GapSection } from "@/components/gap-section/gap-section";
import { ChapterFooter } from "@/components/navigation/chapter-footer";
import { Footer } from "@/components/footer/footer";
import { DiscoverHero } from "@/components/discover/discover-hero";

export const metadata: Metadata = {
  title: "Discover Berrylicious — Find Your Sweet Mood",
  description:
    "Explore Berrylicious flavour profiles, take the Craving Selector quiz, and discover where we fit in the dessert landscape.",
};

export default function DiscoverPage() {
  return (
    <main className="min-h-screen text-[#382D32] relative overflow-x-hidden">
      {/* World: Mint / Playful */}
      <DiscoverHero />
      <CravingSelector />
      <GapSection />

      <ChapterFooter
        currentPath="/discover"
        nextPath="/menu"
        nextLabel="Chapter 03: Enter the Dessert Menu"
        customTagline="Step into our dark cocoa world of 45+ artisanal desserts."
      />
      <Footer />
    </main>
  );
}
