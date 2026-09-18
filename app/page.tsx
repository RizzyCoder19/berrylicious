import React from "react";
import { Navbar } from "@/components/navigation/navbar";
import { Hero } from "@/components/hero/hero";
import { BrandIntro } from "@/components/brand-intro/brand-intro";
import { CravingSelector } from "@/components/craving-selector/craving-selector";
import { MenuSection } from "@/components/menu/menu-section";
import { DessertBuilder } from "@/components/dessert-builder/dessert-builder";
import { GapSection } from "@/components/gap-section/gap-section";
import { IngredientStory } from "@/components/ingredient-story/ingredient-story";
import { SupplyChain } from "@/components/supply-chain/supply-chain";
import { BrandStory } from "@/components/brand-story/brand-story";
import { Founder } from "@/components/founder/founder";
import { BusinessDashboard } from "@/components/business-dashboard/business-dashboard";
import { DeliverySection } from "@/components/delivery/delivery-section";
import { FinalCta } from "@/components/final-cta/final-cta";
import { Footer } from "@/components/footer/footer";
import { CustomerHelp } from "@/components/customer-support/customer-help";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFF9F0] text-[#382D32] relative selection:bg-[#E98FA8] selection:text-[#382D32]">
      {/* Fixed Navigation */}
      <Navbar />

      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Brand Introduction */}
      <BrandIntro />

      {/* 3. Craving Selector (Signature Interaction #1) */}
      <CravingSelector />

      {/* 4. Full Menu & Product Exploration */}
      <MenuSection />

      {/* 5. Dessert Builder (Signature Interaction #2) */}
      <DessertBuilder />

      {/* 6. The Gap (Positioning Spectrum) */}
      <GapSection />

      {/* 7. Natural Ingredient Story */}
      <IngredientStory />

      {/* 8. Supply Chain & Local Sourcing */}
      <SupplyChain />

      {/* 9. Brand Story (Midnight Craving Origin Beats) */}
      <BrandStory />

      {/* 10. Meet Founder Tanvi */}
      <Founder />

      {/* 11 & 12. Business Dashboard, Investment Ask & Use of Funds */}
      <BusinessDashboard />

      {/* 13. Delivery & Convenience */}
      <DeliverySection />

      {/* 14. Final Call to Action */}
      <FinalCta />

      {/* 15. Footer & Bottom Banner */}
      <Footer />

      {/* Floating Customer Support Widget */}
      <CustomerHelp />
    </main>
  );
}
