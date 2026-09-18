"use client";

import React from "react";
import { TransitionLink } from "@/components/navigation/transition-provider";
import { BerryLogo, DoodleHeart } from "@/components/ui/berry-illustrations";
import { BRAND } from "@/data/brand";

export function Footer() {
  return (
    <footer className="bg-[#FFF9F0] border-t border-[#E98FA8]/30 overflow-hidden">
      {/* Signature Reference Styleboard Marquee / Top Ribbon */}
      <div className="bg-[#FFF1E8] border-b border-[#E98FA8]/30 py-3.5 px-4 overflow-hidden">
        <div className="flex items-center justify-center gap-4 text-xs sm:text-sm font-bold tracking-wider text-[#9E4663] uppercase select-none flex-wrap text-center">
          <span>MADE WITH A LITTLE CHAOS & A LOT OF SWEETNESS.</span>
          <span className="text-base">♡</span>
          <span className="font-display text-lg font-extrabold text-[#382D32] lowercase">
            berrylicious
          </span>
          <span className="text-base">♡</span>
          <span>DESSERTS • COFFEE • GOOD VIBES</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Brand Col */}
          <div className="md:col-span-5">
            <BerryLogo className="mb-4" />
            <p className="text-sm text-[#382D32]/75 max-w-sm leading-relaxed mb-6 font-medium">
              A playful, home-grown dessert startup brand blending fresh local fruits, creamy gelato,
              and warm waffles into accessible everyday joy.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#9E4663] bg-[#FFF1E8] px-3.5 py-1.5 rounded-full border border-[#E98FA8]/40 w-fit">
              <span>Presented by Tanvi Ojha</span>
              <span>•</span>
              <span>School Shark Tank</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#9E4663] mb-4">
              Explore Berrylicious
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold text-[#382D32]/80">
              <li>
                <TransitionLink href="/" className="hover:text-[#9E4663] transition-colors">
                  Home
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="/discover" className="hover:text-[#9E4663] transition-colors">
                  Discover & Craving Moods
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="/menu" className="hover:text-[#9E4663] transition-colors">
                  Menu & Prices
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="/builder" className="hover:text-[#9E4663] transition-colors">
                  Dessert Builder
                </TransitionLink>
              </li>
            </ul>
          </div>

          {/* Pitch Deck Links */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#9E4663] mb-4">
              Shark Tank Presentation
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold text-[#382D32]/80">
              <li>
                <TransitionLink href="/story" className="hover:text-[#9E4663] transition-colors">
                  Brand Story & Origin
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="/business" className="hover:text-[#9E4663] transition-colors">
                  Business Dashboard & Unit Metrics
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="/investment" className="hover:text-[#9E4663] transition-colors">
                  ₹20 Lakh for 10% Equity Ask
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="/delivery" className="hover:text-[#9E4663] transition-colors">
                  Delivery & Distribution
                </TransitionLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t border-[#382D32]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#382D32]/60 font-medium">
          <p>{BRAND.footer.copyright}</p>
          <div className="flex items-center gap-2">
            <span>{BRAND.footer.note}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
