import type { Metadata } from "next";
import { MenuSection } from "@/components/menu/menu-section";
import { ChapterFooter } from "@/components/navigation/chapter-footer";
import { Footer } from "@/components/footer/footer";
import { MenuPageHero } from "@/components/menu/menu-hero";

export const metadata: Metadata = {
  title: "Berrylicious Menu — Gelato, Waffles, London Cups & More",
  description:
    "Explore the full Berrylicious menu with 45+ artisanal desserts across 9 categories. From Italian-style gelato to Belgian waffles — find your perfect treat.",
};

export default function MenuPage() {
  return (
    <main className="min-h-screen text-white relative overflow-x-hidden" style={{ background: "#1A0D14" }}>
      {/* World: Dark Cocoa */}
      <MenuPageHero />
      <MenuSection />

      <div style={{ background: "#1A0D14" }}>
        <ChapterFooter
          currentPath="/menu"
          nextPath="/builder"
          nextLabel="Chapter 04: Build Your Custom Dessert"
          customTagline="Step into the interactive builder studio and assemble your dream creation."
          invertColors
        />
        <Footer />
      </div>
    </main>
  );
}
