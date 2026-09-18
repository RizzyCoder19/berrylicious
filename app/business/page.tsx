import type { Metadata } from "next";
import { BusinessPage } from "@/components/business/business-page";
import { ChapterFooter } from "@/components/navigation/chapter-footer";
import { Footer } from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "Berrylicious Business — Pitch Economics & Unit Model",
  description:
    "Explore Berrylicious pitch economics: ₹3L initial capital, ₹4L monthly income, ₹48L annual revenue and 60% gross margin from our pilot outlet.",
};

export default function BusinessRoutePage() {
  return (
    <main
      className="min-h-screen relative overflow-x-hidden"
      style={{ background: "#F2F6FA" }}
    >
      {/* World: Cool Professional */}
      <BusinessPage />

      <ChapterFooter
        currentPath="/business"
        nextPath="/investment"
        nextLabel="Chapter 08: The Shark Tank Investment Ask"
        customTagline="₹20 Lakh for 10% equity — the climax of the Berrylicious Shark Tank pitch."
      />
      <Footer />
    </main>
  );
}
