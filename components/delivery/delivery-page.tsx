"use client";

import React, { useEffect, useRef } from "react";
import { BRAND } from "@/data/brand";
import { Globe, Smartphone, PhoneCall, Clock, CheckCircle2, Zap, Truck, ArrowRight } from "lucide-react";
import { registerGSAP, gsap, prefersReducedMotion } from "@/lib/gsap-init";
import { TransitionLink } from "@/components/navigation/transition-provider";
import { ChapterFooter } from "@/components/navigation/chapter-footer";

const CHANNEL_ICONS = [
  <Globe key="1" className="w-8 h-8 text-[#1E567D]" />,
  <Smartphone key="2" className="w-8 h-8 text-[#1E567D]" />,
  <PhoneCall key="3" className="w-8 h-8 text-[#1E567D]" />,
];

export function DeliveryPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;
    registerGSAP();

    const ctx = gsap.context(() => {
      // Hero entrance
      if (heroRef.current) {
        const lines = heroRef.current.querySelectorAll(".reveal-line");
        gsap.fromTo(lines, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out", delay: 0.2 });
      }

      // Hub scale-in
      if (hubRef.current) {
        gsap.fromTo(
          hubRef.current,
          { scale: 0.85, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.5)",
            scrollTrigger: { trigger: hubRef.current, start: "top 85%", once: true },
          }
        );
      }

      // Channel cards
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 35, scale: 0.94 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.55, delay: index * 0.15,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 85%", once: true },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={{ background: "linear-gradient(160deg, #E0F0FC 0%, #EFF7FF 40%, #DBEEFD 70%, #EFF7FF 100%)" }}
    >
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-[#B8DDF2]/40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-[#BFE9DE]/30 blur-[100px] pointer-events-none" />

      {/* Decorative delivery SVG */}
      <svg
        className="absolute right-10 top-1/4 w-24 h-24 opacity-15 pointer-events-none"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        {/* Package/delivery truck silhouette */}
        <rect x="15" y="40" width="50" height="35" rx="5" fill="#B8DDF2" />
        <rect x="65" y="50" width="25" height="25" rx="4" fill="#7BC0E8" />
        <circle cx="30" cy="80" r="8" fill="#1E567D" />
        <circle cx="80" cy="80" r="8" fill="#1E567D" />
        <circle cx="30" cy="80" r="4" fill="#EFF7FF" />
        <circle cx="80" cy="80" r="4" fill="#EFF7FF" />
        <rect x="20" y="30" width="20" height="12" rx="3" fill="#E98FA8" opacity="0.6" />
        <circle cx="50" cy="25" r="6" fill="#E98FA8" opacity="0.4" />
      </svg>

      {/* Giant watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16vw] font-black text-[#1E567D]/[0.04] select-none pointer-events-none font-display whitespace-nowrap z-0"
        aria-hidden="true"
      >
        DELIVERY
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative z-10">
        {/* Hero */}
        <div ref={heroRef} className="text-center max-w-3xl mx-auto mb-20">
          <div className="reveal-line inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#B8DDF2] text-xs font-bold uppercase tracking-widest text-[#1E567D] mb-5 shadow-xs">
            <Truck className="w-3.5 h-3.5" />
            Chapter 09 — Delivery & Distribution
          </div>

          <h1 className="reveal-line text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#1E567D] font-display mb-4 leading-[1.08]">
            {BRAND.delivery.heading}
          </h1>

          <p className="reveal-line text-base sm:text-lg text-[#1C3048]/75 max-w-xl mx-auto font-medium leading-relaxed">
            {BRAND.delivery.subheading}
          </p>
        </div>

        {/* Central Dispatch Node */}
        <div
          ref={hubRef}
          className="max-w-md mx-auto mb-14 bg-white rounded-3xl p-6 border-2 border-[#B8DDF2] shadow-md flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#E0F0FC] flex items-center justify-center border border-[#B8DDF2] shrink-0">
            <Clock className="w-6 h-6 text-[#1E567D]" />
          </div>
          <div>
            <p className="text-xs font-extrabold text-[#1E567D] uppercase tracking-wider">Berrylicious Hub</p>
            <p className="text-sm text-[#1C3048]/80 font-medium">Central dispatch & quality assurance</p>
          </div>
        </div>

        {/* 3 Distribution Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {BRAND.delivery.channels.map((channel, idx) => (
            <div
              key={channel.name}
              ref={(el) => { cardRefs.current[idx] = el; }}
              className="bg-white rounded-3xl p-8 border-2 border-[#B8DDF2]/60 hover:border-[#1E567D] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#E0F0FC] flex items-center justify-center mb-5 border border-[#B8DDF2]">
                {CHANNEL_ICONS[idx]}
              </div>
              <h3 className="text-xl font-bold text-[#1E567D] mb-2 font-display">{channel.name}</h3>
              <p className="text-sm text-[#1C3048]/75 leading-relaxed font-medium mb-4">{channel.perk}</p>
              <div className="flex items-center gap-2 text-xs font-bold text-[#1E567D]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Available 24/7</span>
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA Links */}
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-[#1E567D] to-[#14405E] rounded-3xl p-10 text-center text-white shadow-2xl">
          <Zap className="w-10 h-10 text-[#B8DDF2] mx-auto mb-4" />
          <h3 className="text-3xl font-bold font-display mb-3">You&apos;ve seen the full Berrylicious experience.</h3>
          <p className="text-white/75 text-sm font-medium mb-6 max-w-lg mx-auto">
            From discovery to dessert building to the Shark Tank investment — Berrylicious is ready to bring joyful desserts to every corner.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <TransitionLink
              href="/builder"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm bg-[#E98FA8] text-[#382D32] shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              Build a Dessert
            </TransitionLink>
            <TransitionLink
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm bg-white/15 text-white border border-white/25 shadow-sm hover:bg-white/25 transition-all active:scale-95"
            >
              Back to Home
              <ArrowRight className="w-4 h-4" />
            </TransitionLink>
          </div>
        </div>
      </div>

      {/* Chapter footer linking back to home */}
      <ChapterFooter
        currentPath="/delivery"
        nextPath="/"
        nextLabel="Return to the Opening"
        customTagline="The Berrylicious experience starts and ends with a craving."
      />
    </section>
  );
}
