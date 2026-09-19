"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import { registerGSAP, prefersReducedMotion, gsap } from "@/lib/gsap-init";
import {
  BUILDER_BASES,
  BUILDER_FLAVOURS,
  BUILDER_TOPPINGS,
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
  Zap,
  Flame,
  CheckCircle2,
} from "lucide-react";

export function DessertBuilder() {
  const [selectedBaseId, setSelectedBaseId] = useState<string>("gelato");
  const [selectedFlavourId, setSelectedFlavourId] = useState<string>("flavour-gelato-classic");
  const [selectedToppingId, setSelectedToppingId] = useState<string>("top-ferrero");
  const [step, setStep] = useState<number>(1);
  const [hasCelebrated, setHasCelebrated] = useState<boolean>(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const dessertVisualRef = useRef<HTMLDivElement>(null);
  const glazeDripRef = useRef<HTMLDivElement>(null);
  const toppingGarnishRef = useRef<HTMLDivElement>(null);
  const reactionParticleRef = useRef<HTMLDivElement>(null);

  // Derived selections
  const currentBase = useMemo(
    () => BUILDER_BASES.find((b) => b.id === selectedBaseId) || BUILDER_BASES[0],
    [selectedBaseId]
  );

  const availableFlavours = useMemo(
    () => BUILDER_FLAVOURS.filter((f) => f.compatibleBases.includes(selectedBaseId)),
    [selectedBaseId]
  );

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

  // Price Calculation according to official model
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

  // Handle Base selection with reaction animation
  const handleSelectBase = (baseId: string) => {
    setSelectedBaseId(baseId);
    const flavours = BUILDER_FLAVOURS.filter((f) => f.compatibleBases.includes(baseId));
    if (flavours.length > 0) setSelectedFlavourId(flavours[0].id);
    const toppings = BUILDER_TOPPINGS.filter((t) => t.compatibleBases.includes(baseId));
    if (toppings.length > 0) setSelectedToppingId(toppings[0].id);

    triggerReaction("base");
  };

  const handleSelectFlavour = (flavourId: string) => {
    setSelectedFlavourId(flavourId);
    triggerReaction("flavour");
  };

  const handleSelectTopping = (toppingId: string) => {
    setSelectedToppingId(toppingId);
    triggerReaction("topping");
  };

  // Lab Reaction Animation: Ingredient flies & Dessert reacts
  const triggerReaction = (type: "base" | "flavour" | "topping") => {
    if (prefersReducedMotion()) return;
    registerGSAP();

    // Squish & bounce center stage
    if (dessertVisualRef.current) {
      gsap.fromTo(
        dessertVisualRef.current,
        { scaleY: 0.88, scaleX: 1.12, rotate: type === "flavour" ? -3 : 3 },
        { scaleY: 1, scaleX: 1, rotate: 0, duration: 0.5, ease: "elastic.out(1.2, 0.4)" }
      );
    }

    // Reaction particle burst
    if (reactionParticleRef.current) {
      gsap.fromTo(
        reactionParticleRef.current,
        { scale: 0.3, opacity: 1, y: 15 },
        { scale: 1.5, opacity: 0, y: -45, duration: 0.5, ease: "power2.out" }
      );
    }

    // Glaze or garnish entrance
    if (type === "flavour" && glazeDripRef.current) {
      gsap.fromTo(
        glazeDripRef.current,
        { y: -30, opacity: 0, scaleY: 0.4 },
        { y: 0, opacity: 1, scaleY: 1, duration: 0.45, ease: "bounce.out" }
      );
    }

    if (type === "topping" && toppingGarnishRef.current) {
      gsap.fromTo(
        toppingGarnishRef.current,
        { y: -30, scale: 0.5, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" }
      );
    }
  };

  const handleFinishCreation = () => {
    setStep(4);
    if (prefersReducedMotion()) return;
    registerGSAP();

    // Camera Zoom Push into center stage
    if (stageRef.current) {
      gsap.fromTo(
        stageRef.current,
        { scale: 0.95 },
        { scale: 1.05, duration: 0.6, ease: "power3.out", yoyo: true, repeat: 1 }
      );
    }

    // Confetti celebration
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.55 },
      colors: ["#E98FA8", "#9E4663", "#BFE9DE", "#B8DDF2", "#FFF1E8"],
    });
    setHasCelebrated(true);
  };

  const handleReset = () => {
    setSelectedBaseId("gelato");
    setSelectedFlavourId("flavour-gelato-classic");
    setSelectedToppingId("top-ferrero");
    setStep(1);
    setHasCelebrated(false);
  };

  return (
    <section
      id="build"
      className="py-20 relative overflow-hidden bg-gradient-to-b from-[#FFF0F5] via-[#FFE8F0] to-[#FFF9F0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Lab Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <BadgePill text="Dessert Laboratory • Configurator Studio" color="pink" />
            <span className="text-xs font-mono font-bold text-[#9E4663] bg-white/80 px-2.5 py-0.5 rounded-full border border-[#E98FA8]/40">
              Formula #{selectedBaseId.slice(0, 3)}-{selectedFlavourId.slice(-3)}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#9E4663] font-display mb-3">
            You bring the craving. <br />
            <span className="text-[#382D32]">We assemble the lab.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#382D32]/80 max-w-xl mx-auto font-medium">
            Step into the live configurator. Watch each layer physically travel into the centerpiece
            cup with live recipe calculation.
          </p>
        </div>

        {/* Step Indicator Bar */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10 max-w-xl mx-auto">
          {[
            { num: 1, label: "01 Base" },
            { num: 2, label: "02 Flavour" },
            { num: 3, label: "03 Topping" },
            { num: 4, label: "04 Ready" },
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setStep(s.num)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                step === s.num
                  ? "bg-[#9E4663] text-white shadow-md scale-105"
                  : "bg-white/80 text-[#382D32]/70 hover:bg-white border border-[#382D32]/10"
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono ${
                  step === s.num ? "bg-white text-[#9E4663]" : "bg-[#FFF1E8] text-[#382D32]"
                }`}
              >
                {s.num}
              </span>
              <span>{s.label}</span>
            </button>
          ))}

          <button
            onClick={handleReset}
            title="Reset Laboratory"
            className="p-2 rounded-full text-[#382D32]/60 hover:text-[#9E4663] hover:bg-white/80 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* CENTER STAGE CONFIGURATOR WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Column (Left, 5 cols) */}
          <div className="lg:col-span-5 bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-[#9E4663]/15 shadow-xl">
            {/* STEP 1: PICK BASE */}
            {step === 1 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#9E4663] block">
                      Phase 1 • Structure
                    </span>
                    <h3 className="text-xl font-bold text-[#382D32]">Select Your Canvas Base</h3>
                  </div>
                  <span className="text-xs font-bold text-[#9E4663] bg-[#FFF1E8] px-2.5 py-0.5 rounded-full">
                    {BUILDER_BASES.length} Bases
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {BUILDER_BASES.map((b) => {
                    const isSelected = selectedBaseId === b.id;
                    return (
                      <button
                        key={b.id}
                        onClick={() => handleSelectBase(b.id)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? "border-[#9E4663] bg-[#FFF1E8] shadow-md ring-2 ring-[#E98FA8]/30"
                            : "border-[#382D32]/10 bg-white hover:border-[#E98FA8] hover:bg-[#FFF9F0]"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-2xl">
                            {b.id === "gelato" && "🍦"}
                            {b.id === "real-fruit" && "🍓"}
                            {b.id === "mini-pancakes" && "🥞"}
                            {b.id === "waffle" && "🧇"}
                          </span>
                          {isSelected && (
                            <span className="w-4 h-4 rounded-full bg-[#9E4663] text-white flex items-center justify-center text-[10px]">
                              <Check className="w-2.5 h-2.5" />
                            </span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-[#382D32]">{b.name}</h4>
                          <span className="text-[11px] font-extrabold text-[#9E4663]">
                            {b.basePrice
                              ? `From ${formatCurrency(b.basePrice)}`
                              : b.isPricePending
                              ? "Being finalized"
                              : "Per variant"}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold bg-[#E98FA8] text-[#382D32] hover:bg-[#e37e99] transition-all shadow-md active:scale-95 cursor-pointer text-sm"
                  >
                    <span>Proceed to Flavours</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: CHOOSE FLAVOUR */}
            {step === 2 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#9E4663] block">
                      Phase 2 • Flavour Fusion
                    </span>
                    <h3 className="text-xl font-bold text-[#382D32]">Choose Your Flavour Glaze</h3>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs font-bold text-[#9E4663] hover:underline cursor-pointer"
                  >
                    ← Base
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 max-h-72 overflow-y-auto pr-1">
                  {availableFlavours.map((flavour) => {
                    const isSelected = selectedFlavourId === flavour.id;
                    return (
                      <button
                        key={flavour.id}
                        onClick={() => handleSelectFlavour(flavour.id)}
                        className={`p-3 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "border-[#9E4663] bg-[#FFF1E8] shadow-md"
                            : "border-[#382D32]/10 bg-white hover:border-[#E98FA8]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-3.5 h-3.5 rounded-full shrink-0 border border-[#382D32]/20"
                            style={{ backgroundColor: flavour.color }}
                          />
                          <div>
                            <p className="font-bold text-xs text-[#382D32]">{flavour.name}</p>
                            {flavour.exactPrice && (
                              <p className="text-[10px] font-semibold text-[#9E4663]">
                                {formatCurrency(flavour.exactPrice)}
                              </p>
                            )}
                          </div>
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
                    onClick={() => setStep(1)}
                    className="text-xs font-bold text-[#382D32]/70 hover:text-[#382D32] cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold bg-[#E98FA8] text-[#382D32] hover:bg-[#e37e99] transition-all shadow-md active:scale-95 cursor-pointer text-sm"
                  >
                    <span>Proceed to Toppings</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: ADD TOPPING */}
            {step === 3 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#9E4663] block">
                      Phase 3 • Crunch & Garnish
                    </span>
                    <h3 className="text-xl font-bold text-[#382D32]">Add Crunch Garnish</h3>
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="text-xs font-bold text-[#9E4663] hover:underline cursor-pointer"
                  >
                    ← Flavour
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 max-h-72 overflow-y-auto pr-1">
                  {availableToppings.map((topping) => {
                    const isSelected = selectedToppingId === topping.id;
                    return (
                      <button
                        key={topping.id}
                        onClick={() => handleSelectTopping(topping.id)}
                        className={`p-3 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "border-[#9E4663] bg-[#FFF1E8] shadow-sm"
                            : "border-[#382D32]/10 bg-white hover:border-[#E98FA8]"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full shrink-0 border border-[#382D32]/20"
                            style={{ backgroundColor: topping.color }}
                          />
                          <span className="font-bold text-xs text-[#382D32]">
                            {topping.name}
                          </span>
                        </div>
                        {isSelected && (
                          <span className="w-3.5 h-3.5 rounded-full bg-[#9E4663] text-white flex items-center justify-center text-[9px]">
                            <Check className="w-2 h-2" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setStep(2)}
                    className="text-xs font-bold text-[#382D32]/70 hover:text-[#382D32] cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleFinishCreation}
                    className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full font-bold bg-[#9E4663] text-white hover:bg-[#853650] transition-all shadow-md active:scale-95 cursor-pointer text-sm"
                  >
                    <span>Finalize Assembly</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: SUMMARY & CELEBRATION */}
            {step === 4 && (
              <div className="text-center py-2">
                <span className="text-3xl mb-2 block">✨</span>
                <h3 className="text-2xl font-bold text-[#9E4663] font-display mb-1">
                  Laboratory Recipe Ready!
                </h3>
                <p className="text-xs text-[#382D32]/70 mb-5">
                  Live recipe formula ready for preparation at the kiosk.
                </p>

                <div className="bg-[#FFF1E8] rounded-2xl p-4 border border-[#E98FA8]/50 mb-5 text-left text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-[#E98FA8]/40 mb-2">
                    <span className="font-mono text-[#9E4663] uppercase">Base</span>
                    <span className="font-bold text-[#382D32]">{currentBase.name}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-[#E98FA8]/40 mb-2">
                    <span className="font-mono text-[#9E4663] uppercase">Flavour</span>
                    <span className="font-bold text-[#382D32]">{currentFlavour?.name}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-[#E98FA8]/40 mb-2">
                    <span className="font-mono text-[#9E4663] uppercase">Topping</span>
                    <span className="font-bold text-[#382D32]">{currentTopping?.name}</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-1">
                    <span className="font-bold uppercase text-[#9E4663]">Total</span>
                    <div className="text-right">
                      <span className="text-xl font-black text-[#9E4663]">
                        {calculatedPriceInfo.display}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={handleFinishCreation}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full font-bold bg-[#E98FA8] text-[#382D32] hover:bg-[#e37e99] shadow-md transition-all active:scale-95 cursor-pointer text-xs"
                  >
                    <span>Celebrate</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#9E4663]" />
                  </button>

                  <button
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full font-bold bg-white text-[#382D32] border border-[#382D32]/20 hover:bg-[#FFF1E8] transition-all cursor-pointer text-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Rebuild</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* CENTER STAGE: THE PHYSICAL DESSERT LAB (Right, 7 cols) */}
          <div
            ref={stageRef}
            className="lg:col-span-7 relative bg-gradient-to-tr from-[#FFF5F8] via-[#FFF9F0] to-white rounded-3xl p-8 border-2 border-[#9E4663]/20 shadow-2xl flex flex-col items-center justify-between min-h-[460px] overflow-hidden"
          >
            {/* Lab Grid Watermark */}
            <div
              className="absolute inset-0 bg-[linear-gradient(to_right,#E98FA815_1px,transparent_1px),linear-gradient(to_bottom,#E98FA815_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] pointer-events-none"
              aria-hidden="true"
            />

            {/* Reaction particle */}
            <div
              ref={reactionParticleRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-radial from-[#FFB6C6]/40 to-transparent pointer-events-none opacity-0 z-0"
            />

            {/* Stage Header */}
            <div className="w-full flex items-center justify-between z-10">
              <span className="text-[11px] font-mono font-black uppercase tracking-widest text-[#9E4663] bg-white px-3 py-1 rounded-full border border-[#9E4663]/20 shadow-xs flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-[#E98FA8]" />
                Live Assembly Stage
              </span>
              <span className="text-xs font-bold text-[#382D32]/70 bg-white/80 px-3 py-1 rounded-full border border-[#382D32]/10">
                Stage Scale 1:1
              </span>
            </div>

            {/* The Central Dessert Visual Container with Animated Layers */}
            <div
              ref={dessertVisualRef}
              className="relative w-64 sm:w-72 md:w-80 aspect-square my-6 flex items-center justify-center transition-transform duration-300 z-10"
            >
              {/* Dynamic Base Visual */}
              {selectedBaseId === "gelato" && (
                <IllustratedGelatoCone className="w-full h-full drop-shadow-xl" />
              )}
              {selectedBaseId === "real-fruit" && (
                <IllustratedFruitBowl className="w-full h-full drop-shadow-xl" />
              )}
              {selectedBaseId === "mini-pancakes" && (
                <IllustratedPancakes className="w-full h-full drop-shadow-xl" />
              )}
              {selectedBaseId === "waffle" && (
                <IllustratedWaffle className="w-full h-full drop-shadow-xl" />
              )}

              {/* Layer 2: Animated Flavour Glaze Drip */}
              {currentFlavour && (
                <div
                  ref={glazeDripRef}
                  className="absolute top-4 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md border border-white/70 pointer-events-none flex items-center gap-1.5"
                  style={{
                    backgroundColor: currentFlavour.color || "#E98FA8",
                    color: "#382D32",
                  }}
                >
                  <span>✦ Layer:</span>
                  <span>{currentFlavour.name.split("(")[0]}</span>
                </div>
              )}

              {/* Layer 3: Animated Garnish Sprinkle */}
              {currentTopping && (
                <div
                  ref={toppingGarnishRef}
                  className="absolute bottom-6 right-4 sm:right-6 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md border border-white/70 pointer-events-none flex items-center gap-1.5"
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

            {/* Stage Bottom Total Bar */}
            <div className="w-full bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-[#9E4663]/20 flex items-center justify-between z-10">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#382D32]/60 block">
                  Calculated Recipe Cost
                </span>
                <span className="text-3xl font-black text-[#9E4663] font-sans">
                  {calculatedPriceInfo.display}
                </span>
                {calculatedPriceInfo.breakdown && (
                  <p className="text-[10px] text-[#382D32]/60 font-semibold mt-0.5">
                    ({calculatedPriceInfo.breakdown})
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleFinishCreation()}
                  className="px-6 py-3 rounded-full bg-[#9E4663] text-white font-bold text-xs shadow-md transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <span>Test Formula</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#E98FA8]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
