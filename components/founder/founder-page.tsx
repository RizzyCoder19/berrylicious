"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { BRAND } from "@/data/brand";
import { Quote, Sparkles, Heart, Star, Leaf, PenTool } from "lucide-react";
import { registerGSAP, gsap, prefersReducedMotion } from "@/lib/gsap-init";
import { BadgePill, StrawberrySticker } from "@/components/ui/berry-illustrations";

const FOUNDER_TRAITS = [
  { icon: Sparkles, label: "Visionary", desc: "Saw the accessible dessert gap in Indian food culture", color: "#9E4663" },
  { icon: Heart, label: "Heart-led", desc: "Desserts that spark a smile the moment you see them", color: "#E98FA8" },
  { icon: Leaf, label: "Local-first", desc: "Shorter regional supply chain with direct farm sourcing", color: "#1D7462" },
  { icon: Star, label: "Student Drive", desc: "19-year-old student entrepreneur redefining the sweet spot", color: "#7A5230" },
];

export function FounderPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const traitRefs = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;
    registerGSAP();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (portraitRef.current) {
        tl.fromTo(
          portraitRef.current,
          { opacity: 0, scale: 0.92, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: "power2.out" },
          0.1
        );
      }

      if (contentRef.current) {
        const items = contentRef.current.querySelectorAll(".content-item");
        tl.fromTo(
          items,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.12 },
          0.3
        );
      }

      if (quoteRef.current) {
        tl.fromTo(
          quoteRef.current,
          { opacity: 0, scaleX: 0.9, transformOrigin: "left" },
          { opacity: 1, scaleX: 1, duration: 0.7, ease: "power2.out" },
          0.7
        );
      }

      if (traitRefs.current) {
        const items = traitRefs.current.querySelectorAll(".trait-item");
        tl.fromTo(
          items,
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: "back.out(1.4)" },
          0.6
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden pt-32 pb-24"
      style={{ background: "linear-gradient(160deg, #FAF6EE 0%, #F5ECDA 50%, #FAF6EE 100%)" }}
    >
      {/* Ambient warm parchment glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-[#E8D5B5]/40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-[#E98FA8]/20 blur-[100px] pointer-events-none" />

      {/* Giant watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-black text-[#7A5230]/[0.035] select-none pointer-events-none font-display whitespace-nowrap z-0"
        aria-hidden="true"
      >
        TANVI OJHA
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#D9C6B0] text-xs font-bold uppercase tracking-widest text-[#7A5230] mb-4 shadow-xs">
            <PenTool className="w-3.5 h-3.5" />
            Chapter 06 • Editorial Portrait
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight font-display text-[#382D32] leading-[1.08]">
            The human heart <br />
            <span className="text-[#9E4663] italic">of Berrylicious.</span>
          </h1>
          <p className="text-sm sm:text-base text-[#7A5230]/80 font-serif italic mt-3 max-w-lg mx-auto">
            A student with a late-night craving, turning everyday fruit into an experiential dessert movement.
          </p>
        </div>

        {/* Main Editorial Card */}
        <div className="bg-white/85 backdrop-blur-md rounded-[2.5rem] border-2 border-[#E8D5B5] shadow-2xl overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left: Large Portrait Column (5 cols) */}
            <div
              ref={portraitRef}
              className="lg:col-span-5 relative bg-gradient-to-br from-[#FFF5EE] via-[#F9EFE2] to-[#F2E4CF] flex flex-col items-center justify-center p-8 sm:p-12 text-center border-b lg:border-b-0 lg:border-r border-[#E8D5B5]"
            >
              {/* Handwritten Note Annotation 1 */}
              <div className="absolute top-6 left-6 -rotate-6 bg-[#FFF9F0] border border-[#7A5230]/30 shadow-xs px-3 py-1 rounded-xl text-[11px] font-serif text-[#7A5230] font-bold">
                ✍️ 19 years old
              </div>

              {/* Handwritten Note Annotation 2 */}
              <div className="absolute bottom-6 right-6 rotate-6 bg-[#FFF1E8] border border-[#9E4663]/30 shadow-xs px-3 py-1 rounded-xl text-[11px] font-serif text-[#9E4663] font-bold">
                🍓 Real Cravings
              </div>

              {/* Portrait Container */}
              <div className="relative my-4">
                <div
                  className="w-56 h-56 sm:w-64 sm:h-64 rounded-[2rem] p-1.5 shadow-2xl rotate-1"
                  style={{ background: "linear-gradient(135deg, #E98FA8, #9E4663, #BFE9DE)" }}
                >
                  <div className="w-full h-full rounded-[1.8rem] overflow-hidden bg-[#FFF1E8] relative">
                    <Image
                      src="/tanvi.png"
                      alt="Tanvi Ojha, Founder of Berrylicious"
                      fill
                      className="object-cover object-top filter contrast-[1.02]"
                      sizes="(max-width: 768px) 240px, 260px"
                      priority
                    />
                  </div>
                </div>

                {/* Founder Badge Pill */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#9E4663] text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-lg border-2 border-white">
                  Founder & Creator
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#382D32] font-display mt-4 mb-1">
                {BRAND.founder.name}
              </h2>
              <p className="text-xs font-bold uppercase tracking-wider text-[#9E4663] mb-1">
                {BRAND.founder.title}
              </p>
              <p className="text-xs text-[#382D32]/60 font-semibold mb-4">
                Undergraduate Student Entrepreneur
              </p>

              <BadgePill text="Pitching at Shark Tank" color="pink" />
            </div>

            {/* Right: Editorial Story Column (7 cols) */}
            <div ref={contentRef} className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
              <div className="content-item mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#7A5230]">
                  The Founder&apos;s Notebook
                </span>
              </div>

              <h3 className="content-item text-3xl sm:text-4xl font-bold text-[#382D32] font-display mb-4 leading-tight">
                &ldquo;Dessert should feel exciting, beautiful and accessible enough to enjoy regularly.&rdquo;
              </h3>

              <div className="content-item w-20 h-1 bg-gradient-to-r from-[#E98FA8] to-[#9E4663] rounded-full mb-6" />

              <p className="content-item text-base sm:text-lg text-[#382D32]/80 leading-relaxed font-medium mb-8">
                {BRAND.founder.bio}
              </p>

              {/* Quote block */}
              <div
                ref={quoteRef}
                className="relative bg-gradient-to-br from-[#FFF1E8] to-[#FFF9F0] rounded-2xl p-6 border-l-4 border-[#9E4663] shadow-sm mb-6"
              >
                <Quote className="w-8 h-8 text-[#9E4663]/20 absolute top-4 right-4" />
                <p className="text-sm sm:text-base text-[#9E4663] font-semibold italic leading-relaxed">
                  &ldquo;{BRAND.founder.quote}&rdquo;
                </p>
                <p className="text-xs text-[#382D32]/60 font-bold mt-3">— {BRAND.founder.name}</p>
              </div>

              <div className="content-item flex items-center gap-4 text-xs font-semibold text-[#7A5230]">
                <span>✓ Verified Pitch Facts</span>
                <span>•</span>
                <span>✓ ₹3L Initial Investment</span>
                <span>•</span>
                <span>✓ 100% Student-Driven</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Founder Traits Grid */}
        <div ref={traitRefs} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {FOUNDER_TRAITS.map(({ icon: Icon, label, desc, color }) => (
            <div
              key={label}
              className="trait-item bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-[#E8D5B5] shadow-sm hover:shadow-md transition-all hover:-translate-y-1 text-center"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-2xs"
                style={{ backgroundColor: `${color}15`, color }}
              >
                <Icon className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-[#382D32] mb-1 font-display">{label}</h4>
              <p className="text-[11px] text-[#382D32]/70 leading-relaxed font-medium">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
