import type { Metadata } from "next";
import { DeliveryPage } from "@/components/delivery/delivery-page";
import { ChapterFooter } from "@/components/navigation/chapter-footer";
import { FinalCta } from "@/components/final-cta/final-cta";
import { Footer } from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "Berrylicious Delivery — Website, Delivery Apps & Direct Orders",
  description:
    "Berrylicious is always on. Order via website, delivery apps, or call directly. Available 24/7 across all channels.",
};

export default function DeliveryRoutePage() {
  return (
    <main
      className="min-h-screen relative overflow-x-hidden"
      style={{ background: "#EFF7FF" }}
    >
      {/* World: Soft Blue */}
      <DeliveryPage />
      <ChapterFooter
        currentPath="/delivery"
        nextPath="/"
        nextLabel="Chapter 01: Back to the Beginning"
        customTagline="Revisit the opening hero, brand pillars, and interactive chapter index."
      />
      <FinalCta />
      <Footer />
    </main>
  );
}

