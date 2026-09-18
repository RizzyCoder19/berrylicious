import React from "react";
import { BRAND } from "@/data/brand";
import { Tractor, Store, Sparkles, Smile, ArrowRight } from "lucide-react";

export function SupplyChain() {
  const icons = [
    <Tractor key="1" className="w-6 h-6 text-[#9E4663]" />,
    <Store key="2" className="w-6 h-6 text-[#9E4663]" />,
    <Sparkles key="3" className="w-6 h-6 text-[#9E4663]" />,
    <Smile key="4" className="w-6 h-6 text-[#9E4663]" />,
  ];

  return (
    <section className="py-24 bg-[#FFF9F0] relative overflow-hidden border-t border-[#E98FA8]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-display text-2xl sm:text-3xl text-[#9E4663] font-bold block mb-2">
            Local Logistics
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#382D32] mb-4">
            {BRAND.supplyChain.heading}
          </h2>
          <p className="text-base sm:text-lg text-[#382D32]/80 leading-relaxed font-medium">
            {BRAND.supplyChain.copy}
          </p>
        </div>

        {/* Horizontal Node Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {BRAND.supplyChain.nodes.map((node, idx) => (
            <div
              key={node.step}
              className="bg-white rounded-3xl p-6 border-2 border-[#E98FA8]/30 card-shadow hover:-translate-y-1 transition-all duration-300 relative"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-2xl font-bold text-[#9E4663]">
                  {node.step}
                </span>
                <div className="w-10 h-10 rounded-xl bg-[#FFF1E8] flex items-center justify-center">
                  {icons[idx]}
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#382D32] mb-1.5">{node.title}</h3>
              <p className="text-xs sm:text-sm text-[#382D32]/75 font-medium leading-relaxed">
                {node.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Transparent note */}
        <div className="mt-10 text-center">
          <p className="text-xs text-[#382D32]/60 italic">
            * Operational plan formulated to eliminate unnecessary middle-tier distributors and
            minimize spoilage.
          </p>
        </div>
      </div>
    </section>
  );
}
