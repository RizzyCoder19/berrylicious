"use client";

import React, { useEffect, useRef } from "react";
import { BRAND } from "@/data/brand";
import { Globe, Smartphone, PhoneCall, Clock, CheckCircle2, Send, Zap } from "lucide-react";
import { registerGSAP, gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap-init";

export function DeliverySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const channelIcons = [
    <Globe key="1" className="w-8 h-8 text-[#9E4663]" />,
    <Smartphone key="2" className="w-8 h-8 text-[#9E4663]" />,
    <PhoneCall key="3" className="w-8 h-8 text-[#9E4663]" />,
  ];

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;
    registerGSAP();

    const ctx = gsap.context(() => {
      // Hub scale-in
      if (hubRef.current) {
        gsap.fromTo(
          hubRef.current,
          { scale: 0.85, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.7,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: hubRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Distribution channel cards reveal
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 35, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            delay: index * 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[#EEF6FB] relative overflow-hidden border-t border-[#B8DDF2]/50 delivery-ambient"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#B8DDF2]/30 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#B8DDF2] text-xs font-bold uppercase tracking-wider text-[#9E4663] mb-3 shadow-xs">
            <Zap className="w-3.5 h-3.5 text-[#E98FA8]" />
            Always-On Connected Distribution
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#382D32] mb-3 font-display">
            {BRAND.delivery.heading}
          </h2>
          <p className="text-base sm:text-lg text-[#382D32]/80 leading-relaxed font-medium">
            {BRAND.delivery.subheading}
          </p>
        </div>

        {/* Central Dispatch Node */}
        <div
          ref={hubRef}
          className="max-w-md mx-auto mb-12 bg-white rounded-3xl p-5 border-2 border-[#B8DDF2] shadow-md flex items-center justify-center gap-3 text-center"
        >
          <div className="w-10 h-10 rounded-xl bg-[#FFF1E8] flex items-center justify-center border border-[#E98FA8]/30">
            <Clock className="w-5 h-5 text-[#9E4663]" />
          </div>
          <div className="text-left">
            <p className="text-xs font-extrabold text-[#9E4663] uppercase tracking-wider">
              24/7 Cloud Kitchen & Kiosk Hub
            </p>
            <p className="text-sm font-bold text-[#382D32]">Synchronized Across 3 Direct Channels</p>
          </div>
        </div>

        {/* 3 Channel Cards (Strictly: Website, Delivery Apps, Direct Orders) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {BRAND.delivery.channels.map((channel, idx) => (
            <div
              key={channel.name}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="bg-white rounded-3xl p-8 border-2 border-[#B8DDF2]/70 card-shadow transition-all duration-300 hover:-translate-y-2 hover:border-[#9E4663] hover:shadow-[0_16px_36px_rgba(56,136,184,0.18)] flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#FFF1E8] border border-[#E98FA8]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {channelIcons[idx] || <Globe className="w-8 h-8 text-[#9E4663]" />}
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-[#EEF6FB] text-[#236E9E] border border-[#B8DDF2]">
                    Route 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-[#382D32] mb-3 font-display">{channel.name}</h3>
                <p className="text-sm text-[#382D32]/80 leading-relaxed font-medium">
                  {channel.perk}
                </p>
              </div>

              <div className="pt-6 border-t border-[#382D32]/10 mt-6 flex items-center justify-between">
                <span className="text-xs font-bold text-[#9E4663] uppercase tracking-wider">
                  Always Active
                </span>
                <div className="flex items-center gap-1 text-xs font-semibold text-[#382D32]/70">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2D9A80]" />
                  <span>24/7 Service</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
