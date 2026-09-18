import React from "react";
import { BRAND } from "@/data/brand";
import { Globe, Smartphone, Store, Clock, Sparkles } from "lucide-react";

export function DeliverySection() {
  const channelIcons = [
    <Globe key="1" className="w-8 h-8 text-[#9E4663]" />,
    <Smartphone key="2" className="w-8 h-8 text-[#9E4663]" />,
    <Store key="3" className="w-8 h-8 text-[#9E4663]" />,
  ];

  return (
    <section className="py-24 bg-[#FFF9F0] relative overflow-hidden border-t border-[#E98FA8]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF1E8] border border-[#E98FA8]/40 text-xs font-bold uppercase tracking-wider text-[#9E4663] mb-3">
            <Clock className="w-3.5 h-3.5" />
            Always-On Service Concept
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#382D32] mb-3">
            {BRAND.delivery.heading}
          </h2>
          <p className="text-base sm:text-lg text-[#382D32]/80 leading-relaxed font-medium">
            {BRAND.delivery.subheading}
          </p>
        </div>

        {/* 3 Channel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BRAND.delivery.channels.map((channel, idx) => (
            <div
              key={channel.name}
              className="bg-white rounded-3xl p-8 border-2 border-[#E98FA8]/30 card-shadow transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="w-16 h-16 rounded-2xl bg-[#FFF1E8] flex items-center justify-center mb-6">
                  {channelIcons[idx]}
                </div>
                <h3 className="text-2xl font-bold text-[#382D32] mb-3">{channel.name}</h3>
                <p className="text-sm text-[#382D32]/80 leading-relaxed font-medium">
                  {channel.perk}
                </p>
              </div>

              <div className="pt-6 border-t border-[#382D32]/10 mt-6 flex items-center justify-between">
                <span className="text-xs font-bold text-[#9E4663] uppercase tracking-wider">
                  Channel 0{idx + 1}
                </span>
                <span className="text-xs font-semibold text-[#382D32]/60">24/7 Stated Vision</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
