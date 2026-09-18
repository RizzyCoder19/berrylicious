"use client";

import React, { useEffect, useRef } from "react";
import { TransitionLink } from "@/components/navigation/transition-provider";
import {
  Compass,
  Utensils,
  Wand2,
  BookOpen,
  User,
  BarChart2,
  TrendingUp,
  Truck,
  ArrowRight,
  Sparkles,
  Layers,
} from "lucide-react";
import { registerGSAP, gsap, prefersReducedMotion } from "@/lib/gsap-init";
import {
  IllustratedDessertCup,
  IllustratedGelatoCone,
  IllustratedPancakes,
  IllustratedWaffle,
  StrawberrySticker,
  BadgePill,
} from "@/components/ui/berry-illustrations";

const CHAPTER_PORTALS = [
  {
    num: "01",
    title: "Discover the Sweet Spot",
    desc: "Explore our market gap, signature Craving Selector, and flavor moods.",
    path: "/discover",
    worldName: "Mint / Playful",
    tag: "Interactive Selector",
    icon: Compass,
    accent: "#1D7462",
    accentLight: "#E8F8F5",
    border: "border-[#BFE9DE]",
    gradient: "from-[#E8F8F5] to-white",
  },
  {
    num: "02",
    title: "The Menu & Catalogue",
    desc: "Step into our dark cocoa dessert lounge with gelato, waffles, and live tasting tray.",
    path: "/menu",
    worldName: "Dark Cocoa",
    tag: "45+ Artisanal Items",
    icon: Utensils,
    accent: "#9E4663",
    accentLight: "#FFF1E8",
    border: "border-[#382D32]/20",
    gradient: "from-[#FFF1E8] to-white",
  },
  {
    num: "03",
    title: "Live Dessert Builder",
    desc: "Build your dream treat: Base → Flavour → Toppings with real-time pricing.",
    path: "/builder",
    worldName: "Strawberry Cream",
    tag: "Signature Studio",
    icon: Wand2,
    accent: "#B02E53",
    accentLight: "#FFF0F4",
    border: "border-[#E98FA8]",
    gradient: "from-[#FFF0F4] to-white",
  },
  {
    num: "04",
    title: "The Midnight Story",
    desc: "The midnight craving reel epiphany to 100% farm-sourced cold storage logistics.",
    path: "/story",
    worldName: "Organic Midnight",
    tag: "Cinematic Journey",
    icon: BookOpen,
    accent: "#6E3B57",
    accentLight: "#F8EDF3",
    border: "border-[#9E4663]/30",
    gradient: "from-[#F8EDF3] to-white",
  },
  {
    num: "05",
    title: "Meet Founder Tanvi",
    desc: "The 19-year-old student entrepreneur who turned a dorm dream into a thriving brand.",
    path: "/founder",
    worldName: "Warm Parchment",
    tag: "Founder Profile",
    icon: User,
    accent: "#7A5230",
    accentLight: "#FAF6EE",
    border: "border-[#D9C6B0]",
    gradient: "from-[#FAF6EE] to-white",
  },
  {
    num: "06",
    title: "The Business & Pitch",
    desc: "Step into Pitch Mode: ₹3L initial capital, ₹4L monthly run-rate & 60% gross margin.",
    path: "/business",
    worldName: "Cool Professional",
    tag: "Unit Economics",
    icon: BarChart2,
    accent: "#2C4960",
    accentLight: "#F0F5FA",
    border: "border-[#C5D7E8]",
    gradient: "from-[#F0F5FA] to-white",
  },
  {
    num: "07",
    title: "Shark Tank Climax",
    desc: "₹20 Lakh ask for 10% equity at ₹2 Crore implied valuation & strategic use of funds.",
    path: "/investment",
    worldName: "Deep Berry Climax",
    tag: "The ₹20L Ask",
    icon: TrendingUp,
    accent: "#9E4663",
    accentLight: "#FFE8EF",
    border: "border-[#FFB6C6]",
    gradient: "from-[#FFE8EF] to-white",
  },
  {
    num: "08",
    title: "24/7 Delivery Hub",
    desc: "Website ordering, delivery apps & direct hotline. Never go dessert-deprived.",
    path: "/delivery",
    worldName: "Soft Blue",
    tag: "Connected Hub",
    icon: Truck,
    accent: "#1F5F8B",
    accentLight: "#EEF6FC",
    border: "border-[#B8DDF2]",
    gradient: "from-[#EEF6FC] to-white",
  },
];

export function ChapterPortal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;
    registerGSAP();

    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll(".portal-card");
      if (cards && cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 bg-[#FFF9F0] relative overflow-hidden border-t border-[#E98FA8]/20">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-0 w-80 h-80 rounded-full bg-[#E98FA8]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-[#BFE9DE]/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E98FA8]/40 text-xs font-bold uppercase tracking-wider text-[#9E4663] mb-3 shadow-xs">
            <Layers className="w-3.5 h-3.5 text-[#E98FA8]" />
            Multi-Chapter Interactive Experience
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#382D32] font-display mb-4">
            Step Into the Worlds of Berrylicious
          </h2>
          <p className="text-base sm:text-lg text-[#382D32]/80 leading-relaxed font-medium">
            Explore each chapter as a standalone, dedicated destination. Discover our flavors,
            build custom creations, inspect unit economics, and see our Shark Tank presentation.
          </p>
        </div>

        {/* 8 Distinct Chapter Portals Grid */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {CHAPTER_PORTALS.map((portal) => {
            const Icon = portal.icon;
            return (
              <TransitionLink
                key={portal.num}
                href={portal.path}
                className={`portal-card group relative bg-gradient-to-b ${portal.gradient} rounded-3xl p-6 border-2 ${portal.border} shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between`}
              >
                <div>
                  {/* Card Header: Number & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/80 border border-current/20 text-[#382D32]/70">
                      Chapter {portal.num}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/90 text-[#382D32] shadow-2xs">
                      {portal.worldName}
                    </span>
                  </div>

                  {/* Icon Emblem */}
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 shadow-xs border border-white/60"
                    style={{ backgroundColor: portal.accentLight, color: portal.accent }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-[#382D32] mb-2 font-display group-hover:text-[#9E4663] transition-colors">
                    {portal.title}
                  </h3>
                  <p className="text-xs text-[#382D32]/75 leading-relaxed font-medium mb-6">
                    {portal.desc}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-black/5 flex items-center justify-between text-xs font-bold" style={{ color: portal.accent }}>
                  <span>Enter chapter</span>
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-xs transition-transform group-hover:translate-x-1">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </TransitionLink>
            );
          })}
        </div>

        {/* Quick Taste Teaser Banner */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#FFF1E8] via-white to-[#FFF1E8] rounded-3xl p-8 border-2 border-[#E98FA8]/40 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#E98FA8] flex items-center justify-center text-white shadow-md shrink-0">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-[#382D32] font-display">Ready for a late-night craving?</h4>
              <p className="text-xs text-[#382D32]/70 font-medium">
                Jump straight into the live interactive builder or inspect our pitch deck economics.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <TransitionLink
              href="/builder"
              className="px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#E98FA8] text-[#382D32] shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              Build Yours
            </TransitionLink>
            <TransitionLink
              href="/investment"
              className="px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#9E4663] text-white shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              Shark Tank Ask
            </TransitionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
