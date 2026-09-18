import type { Metadata } from "next";
import { FounderPage } from "@/components/founder/founder-page";
import { ChapterFooter } from "@/components/navigation/chapter-footer";
import { Footer } from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "Meet Tanvi Ojha — Founder of Berrylicious",
  description:
    "Meet Tanvi Ojha, the 19-year-old student entrepreneur behind Berrylicious. Her vision for accessible premium desserts is redefining the sweet spot in Indian food culture.",
};

export default function FounderRoutePage() {
  return (
    <main
      className="min-h-screen relative overflow-x-hidden"
      style={{ background: "#FAF6EE" }}
    >
      {/* World: Warm Parchment */}
      <FounderPage />

      <ChapterFooter
        currentPath="/founder"
        nextPath="/business"
        nextLabel="Chapter 07: The Business & Pitch Mode"
        customTagline="Enter pitch mode — inspect unit economics, margins, and the pilot model."
      />
      <Footer />
    </main>
  );
}
