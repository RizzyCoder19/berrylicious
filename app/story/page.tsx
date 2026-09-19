import type { Metadata } from "next";
import { StoryFilm } from "@/components/story/story-film";
import { ChapterFooter } from "@/components/navigation/chapter-footer";
import { Footer } from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "Berrylicious Story — The Midnight Origin Film & Farm Supply Chain",
  description:
    "The Berrylicious origin film. A midnight gelato reel, a craving, and a 19-year-old's mission to bring farm-sourced premium desserts to every Indian city.",
};

export default function StoryPage() {
  return (
    <main
      className="min-h-screen relative overflow-x-hidden"
      style={{ background: "#0F0A0D" }}
    >
      {/* World: Organic Midnight — 5-Scene Film Experience */}
      <StoryFilm />

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
