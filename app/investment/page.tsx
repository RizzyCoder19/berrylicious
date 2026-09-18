import type { Metadata } from "next";
import { InvestmentPage } from "@/components/investment/investment-page";
import { ChapterFooter } from "@/components/navigation/chapter-footer";
import { Footer } from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "Berrylicious Investment — ₹20 Lakh for 10% Equity | Shark Tank",
  description:
    "The Berrylicious Shark Tank climax: ₹20 Lakh investment ask for 10% equity, implying a ₹2 Crore valuation. See the strategic use of funds.",
};

export default function InvestmentRoutePage() {
  return (
    <main
      className="min-h-screen relative overflow-x-hidden"
      style={{ background: "#1A0A12" }}
    >
      {/* World: Deep Berry Climax */}
      <InvestmentPage />

      <div style={{ background: "#1A0A12" }}>
        <ChapterFooter
          currentPath="/investment"
          nextPath="/delivery"
          nextLabel="Chapter 09: Delivery & Distribution"
          customTagline="Website, Delivery Apps & Direct Orders — always-on dessert convenience."
          invertColors
        />
        <Footer />
      </div>
    </main>
  );
}
