import type { Metadata } from "next";
import { DessertBuilder } from "@/components/dessert-builder/dessert-builder";
import { ChapterFooter } from "@/components/navigation/chapter-footer";
import { Footer } from "@/components/footer/footer";
import { BuilderHero } from "@/components/dessert-builder/builder-hero";

export const metadata: Metadata = {
  title: "Berrylicious Dessert Builder — Create Your Perfect Treat",
  description:
    "Build your dream dessert step by step. Choose your base, flavour, and toppings for a live price preview. Berrylicious interactive creator studio.",
};

export default function BuilderPage() {
  return (
    <main
      className="min-h-screen relative overflow-x-hidden"
      style={{ background: "linear-gradient(160deg, #FFF0F5 0%, #FFE8F0 50%, #FFF2F7 100%)" }}
    >
      {/* World: Strawberry Cream */}
      <BuilderHero />
      <DessertBuilder />

      <ChapterFooter
        currentPath="/builder"
        nextPath="/story"
        nextLabel="Chapter 05: The Midnight Story"
        customTagline="How a late-night gelato reel became the Berrylicious origin story."
      />
      <Footer />
    </main>
  );
}
