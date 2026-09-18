import type { Metadata } from "next";
import { BrandStory } from "@/components/brand-story/brand-story";
import { IngredientStory } from "@/components/ingredient-story/ingredient-story";
import { SupplyChain } from "@/components/supply-chain/supply-chain";
import { ChapterFooter } from "@/components/navigation/chapter-footer";
import { Footer } from "@/components/footer/footer";
import { StoryHero } from "@/components/story/story-hero";

export const metadata: Metadata = {
  title: "Berrylicious Story — From Midnight Craving to Real Fruit Supply Chain",
  description:
    "The Berrylicious origin story. A midnight gelato reel, a craving, and a 19-year-old's mission to bring farm-sourced premium desserts to every Indian city.",
};

export default function StoryPage() {
  return (
    <main
      className="min-h-screen relative overflow-x-hidden"
      style={{ background: "#0F0A0D" }}
    >
      {/* World: Organic Midnight */}
      <StoryHero />
      <BrandStory />
      <IngredientStory />
      <SupplyChain />

      <div style={{ background: "#1a1017" }}>
        <ChapterFooter
          currentPath="/story"
          nextPath="/founder"
          nextLabel="Chapter 06: Meet Founder Tanvi"
          customTagline="The student behind the brand — her vision, her drive, her dessert dream."
          invertColors
        />
        <Footer />
      </div>
    </main>
  );
}
