"use client";

import React, { useEffect, useRef } from "react";
import { BRAND } from "@/data/brand";
import { Tractor, Store, Sparkles, Smile, ArrowRight } from "lucide-react";
import { WaveDivider } from "@/components/ui/section-dividers";
import { registerGSAP, gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap-init";

export function SupplyChain() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<SVGPathElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  const icons = [
    <Tractor key="1" className="w-6 h-6 text-[#0D3B30]" />,
    <Store key="2" className="w-6 h-6 text-[#0D3B30]" />,
    <Sparkles key="3" className="w-6 h-6 text-[#0D3B30]" />,
    <Smile key="4" className="w-6 h-6 text-[#0D3B30]" />,
  ];

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;
    registerGSAP();

    const ctx = gsap.context(() => {
      // Scrubbed supply chain connector drawing
      if (trackRef.current) {
        const length = trackRef.current.getTotalLength();
        gsap.set(trackRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(trackRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            end: "bottom 80%",
            scrub: 1,
          },
        });
      }

      // Nodes progressive activation
      nodeRefs.current.forEach((node, i) => {
        if (!node) return;
        gsap.fromTo(
          node,
          { opacity: 0, y: 40, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            delay: i * 0.1,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: node,
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
      className="relative overflow-hidden bg-[#0D3B30] text-white pt-16 pb-28"
    >
      {/* Ambient background mint spotlights */}
      <div className="absolute top-0 right-1/4 w-[450px] h-[450px] rounded-full bg-[#BFE9DE]/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[#1D6B5A]/30 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-display text-2xl sm:text-3xl text-[#BFE9DE] font-bold block mb-2">
            Local Logistics
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#FFF9F0] mb-4 font-display">
            {BRAND.supplyChain.heading}
          </h2>
          <p className="text-base sm:text-lg text-[#FFF9F0]/85 leading-relaxed font-medium">
            {BRAND.supplyChain.copy}
          </p>
        </div>

        {/* Desktop Connected Path */}
        <div className="relative">
          <svg
            className="hidden lg:block absolute top-1/2 left-8 w-[95%] h-16 -translate-y-1/2 pointer-events-none z-0"
            viewBox="0 0 1100 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              ref={trackRef}
              d="M 50 20 L 350 20 L 680 20 L 1050 20"
              stroke="#BFE9DE"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="8 8"
            />
          </svg>

          {/* Connected Logistics Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {BRAND.supplyChain.nodes.map((node, idx) => (
              <div
                key={node.step}
                ref={(el) => {
                  nodeRefs.current[idx] = el;
                }}
                className="bg-white/95 text-[#382D32] rounded-3xl p-7 shadow-xl hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-300 relative border-2 border-white/20 group"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="font-display text-2xl font-bold text-[#0D3B30]">
                    {node.step}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-[#BFE9DE]/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#BFE9DE] transition-all duration-300 shadow-xs">
                    {icons[idx]}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#382D32] mb-2 font-display">{node.title}</h3>
                <p className="text-xs sm:text-sm text-[#382D32]/80 font-medium leading-relaxed">
                  {node.desc}
                </p>

                <div className="mt-5 pt-3 border-t border-[#382D32]/10 flex items-center justify-between text-[11px] font-bold text-[#0D3B30]">
                  <span>Connected Node</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#0D3B30] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transparent footnote */}
        <div className="mt-14 text-center">
          <p className="text-xs text-[#BFE9DE]/80 italic">
            * Operational plan formulated to eliminate unnecessary middle-tier distributors and
            minimize spoilage.
          </p>
        </div>
      </div>

      {/* Wave transition out into Midnight Story */}
      <WaveDivider position="bottom" fill="#1A0F15" height={45} />
    </section>
  );
}
