"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import { registerGSAP, prefersReducedMotion, gsap } from "@/lib/gsap-init";
import { FadeUp } from "@/components/ui/scroll-animations";
import {
  BUILDER_BASES,
  BUILDER_FLAVOURS,
  BUILDER_TOPPINGS,
  BuilderBase,
  BuilderFlavour,
  BuilderTopping,
} from "@/data/flavours";
import { formatCurrency } from "@/lib/utils";
import {
  IllustratedDessertCup,
  IllustratedGelatoCone,
  IllustratedPancakes,
  IllustratedWaffle,
  IllustratedFruitBowl,
  DoodleSparkle,
  BadgePill,
} from "@/components/ui/berry-illustrations";
import {
  Sparkles,
  RotateCcw,
  ArrowRight,
  Check,
  CheckCircle2,
  Heart,
  HelpCircle,
  Plus,
} from "lucide-react";

export function DessertBuilder() {
  const [selectedBaseId, setSelectedBaseId] = useState<string>("gelato");
  const [selectedFlavourId, setSelectedFlavourId] = useState<string>("flavour-gelato-classic");
  const [selectedToppingId, setSelectedToppingId] = useState<string>("top-ferrero");
  const [step, setStep] = useState<number>(1);
  const [hasCelebrated, setHasCelebrated] = useState<boolean>(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const drizzleRef = useRef<HTMLDivElement>(null);
  const toppingRef = useRef<HTMLDivElement>(null);

  // GSAP Theatrical Pulse & Layer Assembly on Selection Change
  useEffect(() => {
    if (prefersReducedMotion() || !previewRef.current) return;
    registerGSAP();

    const tl = gsap.timeline();
    tl.fromTo(
      previewRef.current,
      { scale: 0.94, filter: "brightness(1.08)" },
      { scale: 1, filter: "brightness(1)", duration: 0.4, ease: "back.out(1.8)" }
    );

    if (drizzleRef.current) {
      tl.fromTo(
        drizzleRef.current,
        { y: -30, opacity: 0, scaleY: 0.5 },
        { y: 0, opacity: 1, scaleY: 1, duration: 0.35, ease: "bounce.out" },
        "-=0.2"
      );
    }

    if (toppingRef.current) {
      tl.fromTo(
        toppingRef.current,
        { y: -25, opacity: 0, scale: 0.6 },
        { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" },
        "-=0.15"
      );
    }
  }, [selectedBaseId, selectedFlavourId, selectedToppingId]);

  // Derived selections
  const currentBase = useMemo(
    () => BUILDER_BASES.find((b) => b.id === selectedBaseId) || BUILDER_BASES[0],
    [selectedBaseId]
  );

  // Compatible flavours
  const availableFlavours = useMemo(
    () => BUILDER_FLAVOURS.filter((f) => f.compatibleBases.includes(selectedBaseId)),
    [selectedBaseId]
  );

  // Compatible toppings
  const availableToppings = useMemo(
    () => BUILDER_TOPPINGS.filter((t) => t.compatibleBases.includes(selectedBaseId)),
    [selectedBaseId]
  );

  const currentFlavour = useMemo(() => {
    return (
      availableFlavours.find((f) => f.id === selectedFlavourId) || availableFlavours[0] || null
    );
  }, [availableFlavours, selectedFlavourId]);

  const currentTopping = useMemo(() => {
    return (
      availableToppings.find((t) => t.id === selectedToppingId) || availableToppings[0] || null
    );
  }, [availableToppings, selectedToppingId]);

  // When base changes, auto-select first valid flavour and topping
  const handleSelectBase = (baseId: string) => {
    setSelectedBaseId(baseId);
    const flavours = BUILDER_FLAVOURS.filter((f) => f.compatibleBases.includes(baseId));
    if (flavours.length > 0) {
      setSelectedFlavourId(flavours[0].id);
    }
    const toppings = BUILDER_TOPPINGS.filter((t) => t.compatibleBases.includes(baseId));
    if (toppings.length > 0) {
      setSelectedToppingId(toppings[0].id);
    }
  };

  // Price Calculation according to PRD Section 13
  const calculatedPriceInfo = useMemo(() => {
    if (currentBase.isPricePending) {
      return {
        isAvailable: false,
        display: "Price being finalized",
        total: 0,
      };
    }

    if (currentBase.id === "gelato") {
      const baseCost = currentBase.basePrice || 190;
      const toppingCost = currentTopping?.price || 0;
      return {
        isAvailable: true,
        display: formatCurrency(baseCost + toppingCost),
        total: baseCost + toppingCost,
        breakdown: `${formatCurrency(baseCost)} base + ${formatCurrency(toppingCost)} topping`,
      };
    }

    if (currentBase.id === "real-fruit" || currentBase.id === "mini-pancakes") {
      const flavourCost = currentFlavour?.exactPrice || 140;
      const toppingCost = currentTopping?.price || 0;
      const total = flavourCost + toppingCost;
      return {
        isAvailable: true,
        display: formatCurrency(total),
        total: total,
        breakdown: `${formatCurrency(flavourCost)} flavour + ${formatCurrency(toppingCost)} topping`,
      };
    }

    return {
      isAvailable: false,
      display: "Custom estimate on kiosk",
      total: 0,
    };
  }, [currentBase, currentFlavour, currentTopping]);

  const handleCelebrate = () => {
    setHasCelebrated(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#E98FA8", "#9E4663", "#BFE9DE", "#B8DDF2", "#FFF1E8"],
    });
    setTimeout(() => setHasCelebrated(false), 3000);
  };

  const handleReset = () => {
    setSelectedBaseId("gelato");
    setSelectedFlavourId("flavour-gelato-classic");
    setSelectedToppingId("top-ferrero");
    setStep(1);
    setHasCelebrated(false);
  };

  return (
    <section id="build" className="py-24 bg-[#FFF9F0] relative overflow-hidden border-t border-[#E98FA8]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <FadeUp>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <BadgePill text="Live Presentation Centerpiece" color="pink" />
              <span className="text-xs font-semibold text-[#9E4663]">Signature Interaction #2</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#9E4663] font-display mb-4">
              You bring the craving. <br />
              <span className="text-[#382D32]">We bring the chaos.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#382D32]/80 max-w-xl mx-auto font-medium">
              Customize your dessert step-by-step. Real prices calculate directly from our recipe
              database without fabricated checkout fees.
            </p>
          </div>
        </FadeUp>

        {/* Step Navigation Bar */}
        <div className="flex items-center justify-center gap-2 sm:gap-6 mb-12 max-w-2xl mx-auto">
          {[
            { num: 1, label: "01 Base" },
            { num: 2, label: "02 Flavour" },
            { num: 3, label: "03 Topping" },
            { num: 4, label: "04 Your Creation" },
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setStep(s.num)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                step === s.num
                  ? "bg-[#9E4663] text-white shadow-md scale-105"
                  : "bg-white text-[#382D32]/70 hover:bg-[#FFF1E8] border border-[#382D32]/10"
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  step === s.num ? "bg-white text-[#9E4663]" : "bg-[#FFF1E8] text-[#382D32]"
                }`}
              >
                {s.num}
              </span>
              <span className="hidden sm:inline">{s.label}</span>
            </button>
          ))}

          <button
            onClick={handleReset}
            title="Reset Builder"
            className="p-2 rounded-full text-[#382D32]/60 hover:text-[#9E4663] hover:bg-[#FFF1E8] transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Main Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#9E4663]/15 card-shadow">
            {/* STEP 1: PICK BASE */}
            {step === 1 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-[#382D32]">Step 1: Pick your base</h3>
                    <p className="text-xs sm:text-sm text-[#382D32]/70">
                      Choose the canvas for your dessert masterpiece.
                    </p>
                  </div>
                  <span className="text-xs font-bold uppercase text-[#9E4663] bg-[#FFF1E8] px-3 py-1 rounded-full">
                    {BUILDER_BASES.length} Options
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {BUILDER_BASES.map((b) => {
                    const isSelected = selectedBaseId === b.id;
                    return (
                      <button
                        key={b.id}
                        onClick={() => handleSelectBase(b.id)}
                        className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? "border-[#9E4663] bg-[#FFF1E8] shadow-md ring-2 ring-[#E98FA8]/30"
                            : "border-[#382D32]/10 bg-white hover:border-[#E98FA8] hover:bg-[#FFF9F0]"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <span className="text-2xl">
                            {b.id === "gelato" && "🍦"}
                            {b.id === "real-fruit" && "🍓"}
                            {b.id === "mini-pancakes" && "🥞"}
                            {b.id === "waffle" && "🧇"}
                          </span>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-[#9E4663] text-white flex items-center justify-center text-xs">
                              <Check className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-[#382D32]">{b.name}</h4>
                          <p className="text-xs text-[#382D32]/70 mb-2">{b.tagline}</p>
                          <span className="text-xs font-extrabold text-[#9E4663]">
                            {b.basePrice
                              ? `Base from ${formatCurrency(b.basePrice)}`
                              : b.isPricePending
                              ? "Price being finalized"
                              : "Variant priced"}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold bg-[#E98FA8] text-[#382D32] hover:bg-[#e37e99] transition-all shadow-md active:scale-95"
                  >
                    <span>Next: Choose Flavour</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: CHOOSE FLAVOUR */}
            {step === 2 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-[#382D32]">Step 2: Choose your flavour</h3>
                    <p className="text-xs sm:text-sm text-[#382D32]/70">
                      Options available for <span className="font-bold text-[#9E4663]">{currentBase.name}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs font-bold text-[#9E4663] hover:underline"
                  >
                    ← Change Base
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {availableFlavours.map((flavour) => {
                    const isSelected = selectedFlavourId === flavour.id;
                    return (
                      <button
                        key={flavour.id}
                        onClick={() => setSelectedFlavourId(flavour.id)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "border-[#9E4663] bg-[#FFF1E8] shadow-md"
                            : "border-[#382D32]/10 bg-white hover:border-[#E98FA8]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="w-4 h-4 rounded-full shrink-0 border border-[#382D32]/20"
                            style={{ backgroundColor: flavour.color }}
                          />
                          <div>
                            <p className="font-bold text-sm text-[#382D32]">{flavour.name}</p>
                            {flavour.exactPrice && (
                              <p className="text-xs font-semibold text-[#9E4663]">
                                {formatCurrency(flavour.exactPrice)}
                              </p>
                            )}
                          </div>
                        </div>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-[#9E4663] text-white flex items-center justify-center text-xs">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setStep(1)}
                    className="text-sm font-bold text-[#382D32]/70 hover:text-[#382D32]"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold bg-[#E98FA8] text-[#382D32] hover:bg-[#e37e99] transition-all shadow-md active:scale-95"
                  >
                    <span>Next: Add Topping</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: ADD TOPPING */}
            {step === 3 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-[#382D32]">Step 3: Add a topping</h3>
                    <p className="text-xs sm:text-sm text-[#382D32]/70">
                      Garnish your creation with crunch, compote or purist simplicity.
                    </p>
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="text-xs font-bold text-[#9E4663] hover:underline"
                  >
                    ← Change Flavour
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-h-80 overflow-y-auto pr-1">
                  {availableToppings.map((topping) => {
                    const isSelected = selectedToppingId === topping.id;
                    return (
                      <button
                        key={topping.id}
                        onClick={() => setSelectedToppingId(topping.id)}
                        className={`p-3.5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "border-[#9E4663] bg-[#FFF1E8] shadow-sm"
                            : "border-[#382D32]/10 bg-white hover:border-[#E98FA8]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-3.5 h-3.5 rounded-full shrink-0 border border-[#382D32]/20"
                            style={{ backgroundColor: topping.color }}
                          />
                          <span className="font-bold text-xs sm:text-sm text-[#382D32]">
                            {topping.name}
                          </span>
                        </div>
                        {isSelected && (
                          <span className="w-4 h-4 rounded-full bg-[#9E4663] text-white flex items-center justify-center text-[10px]">
                            <Check className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setStep(2)}
                    className="text-sm font-bold text-[#382D32]/70 hover:text-[#382D32]"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold bg-[#9E4663] text-white hover:bg-[#853650] transition-all shadow-md active:scale-95"
                  >
                    <span>Finish Creation</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: CREATION SUMMARY */}
            {step === 4 && (
              <div className="text-center py-4">
                <span className="text-4xl mb-3 block">🎉</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#9E4663] font-display mb-2">
                  Your Custom Creation is Ready!
                </h3>
                <p className="text-sm text-[#382D32]/70 mb-8">
                  Presenting this combination live at the Shark Tank kiosk.
                </p>

                <div className="bg-[#FFF1E8] rounded-2xl p-6 border border-[#E98FA8]/50 max-w-md mx-auto mb-8 text-left">
                  <div className="flex justify-between items-center pb-3 border-b border-[#E98FA8]/40 mb-3">
                    <span className="text-xs font-bold uppercase text-[#9E4663]">Base</span>
                    <span className="font-bold text-sm text-[#382D32]">{currentBase.name}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[#E98FA8]/40 mb-3">
                    <span className="text-xs font-bold uppercase text-[#9E4663]">Flavour</span>
                    <span className="font-bold text-sm text-[#382D32]">{currentFlavour?.name}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[#E98FA8]/40 mb-3">
                    <span className="text-xs font-bold uppercase text-[#9E4663]">Topping</span>
                    <span className="font-bold text-sm text-[#382D32]">{currentTopping?.name}</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="text-xs font-bold uppercase text-[#9E4663]">Total Price</span>
                    <div className="text-right">
                      <span className="text-2xl font-extrabold text-[#9E4663]">
                        {calculatedPriceInfo.display}
                      </span>
                      {calculatedPriceInfo.breakdown && (
                        <p className="text-[10px] text-[#382D32]/60 font-semibold">
                          ({calculatedPriceInfo.breakdown})
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={handleCelebrate}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold bg-[#E98FA8] text-[#382D32] hover:bg-[#e37e99] shadow-lg transition-all active:scale-95 border border-[#9E4663]/30"
                  >
                    <span>Looks Berrylicious!</span>
                    <Sparkles className="w-4 h-4 text-[#9E4663]" />
                  </button>

                  <button
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold bg-white text-[#382D32] border border-[#382D32]/20 hover:bg-[#FFF1E8] transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Build Another</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Creation Card Live Preview (5 cols) */}
          <div
            ref={previewRef}
            className="lg:col-span-5 bg-gradient-to-b from-[#FFF1E8] to-[#FFF9F0] rounded-3xl p-6 sm:p-8 border-2 border-[#9E4663]/25 card-shadow flex flex-col justify-between relative overflow-hidden transition-shadow duration-300"
          >
            <div className="absolute top-4 right-4 opacity-40 pointer-events-none">
              <DoodleSparkle className="w-8 h-8 text-[#9E4663]" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#9E4663]">
                  ✦ Live Custom Preview
                </span>
                <span className="text-xs font-bold text-[#382D32]/60 bg-white px-2.5 py-0.5 rounded-full border border-[#9E4663]/15">
                  Recipe #{selectedBaseId.slice(0, 3)}-{selectedFlavourId.slice(-3)}
                </span>
              </div>

              {/* Dynamic Illustrated Visual with Assembly Layers */}
              <div className="w-full aspect-square max-h-56 mx-auto flex items-center justify-center my-4 transition-transform duration-500 relative">
                {selectedBaseId === "gelato" && (
                  <IllustratedGelatoCone className="w-full h-full drop-shadow-md" />
                )}
                {selectedBaseId === "real-fruit" && (
                  <IllustratedFruitBowl className="w-full h-full drop-shadow-md" />
                )}
                {selectedBaseId === "mini-pancakes" && (
                  <IllustratedPancakes className="w-full h-full drop-shadow-md" />
                )}
                {selectedBaseId === "waffle" && (
                  <IllustratedWaffle className="w-full h-full drop-shadow-md" />
                )}

                {/* Layer 2: Animated Flavour Glaze Drizzle Indicator */}
                {currentFlavour && (
                  <div
                    ref={drizzleRef}
                    className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase shadow-sm border border-white/60 pointer-events-none flex items-center gap-1.5"
                    style={{
                      backgroundColor: currentFlavour.color || "#E98FA8",
                      color: "#382D32",
                    }}
                  >
                    <span>✦ Glaze:</span>
                    <span>{currentFlavour.name.split("(")[0]}</span>
                  </div>
                )}

                {/* Layer 3: Animated Topping Crunch Garnish */}
                {currentTopping && (
                  <div
                    ref={toppingRef}
                    className="absolute bottom-6 right-6 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase shadow-sm border border-white/60 pointer-events-none flex items-center gap-1.5"
                    style={{
                      backgroundColor: currentTopping.color || "#FFF1E8",
                      color: "#382D32",
                    }}
                  >
                    <span>★ Garnish:</span>
                    <span>{currentTopping.name.split("(")[0]}</span>
                  </div>
                )}
              </div>

              {/* Creation Stack Details */}
              <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-4 border border-[#9E4663]/15 mb-4">
                <p className="text-[11px] font-bold text-[#9E4663] uppercase tracking-wider mb-1">
                  Combination Formula
                </p>
                <p className="text-base font-extrabold text-[#382D32] leading-tight">
                  {currentFlavour?.name.split("(")[0] || "Signature"}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-[#382D32]/70 font-semibold mt-1">
                  <span>+ {currentBase.name}</span>
                  <span>+ {currentTopping?.name.split("(")[0] || "Topping"}</span>
                </div>
              </div>
            </div>

            {/* Bottom Total Bar */}
            <div className="pt-4 border-t border-[#9E4663]/20 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#382D32]/60 uppercase block">
                  Calculated Price
                </span>
                <span className="text-3xl font-extrabold text-[#9E4663]">
                  {calculatedPriceInfo.display}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCelebrate}
                className="px-5 py-2.5 rounded-full bg-[#E98FA8] hover:bg-[#e37e99] text-[#382D32] font-bold text-xs shadow-sm transition-transform active:scale-95 cursor-pointer border border-[#9E4663]/20 flex items-center gap-1.5"
              >
                <span>Celebrate</span>
                <Sparkles className="w-3.5 h-3.5 text-[#9E4663]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
