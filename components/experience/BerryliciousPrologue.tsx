"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { registerGSAP, gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap-init";
import { PrologueDeskScene, PrologueDeskSceneRefs } from "./PrologueDeskScene";
import { PrologueCravingScene, PrologueCravingSceneRefs } from "./PrologueCravingScene";
import { PrologueFantasyScene, PrologueFantasySceneRefs } from "./PrologueFantasyScene";
import { PrologueCursor } from "./PrologueCursor";
import { usePrologueAudio } from "./usePrologueAudio";
import { Volume2, VolumeX, FastForward, Sparkles } from "lucide-react";
import Image from "next/image";

interface BerrellePrologueProps {
  onPrologueComplete?: () => void;
}

export function BerrellePrologue({ onPrologueComplete }: BerrellePrologueProps) {
  const [isClient, setIsClient] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [hasVisited, setHasVisited] = useState<boolean | null>(null);
  const [isPrologueActive, setIsPrologueActive] = useState(true);
  const [currentChapter, setCurrentChapter] = useState("11:47 PM");

  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const deskSceneRef = useRef<PrologueDeskSceneRefs>(null);
  const cravingSceneRef = useRef<PrologueCravingSceneRefs>(null);
  const fantasySceneRef = useRef<PrologueFantasySceneRefs>(null);

  const masterTlRef = useRef<gsap.core.Timeline | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const progressBarRef = useRef<HTMLDivElement>(null);

  const { isAudioEnabled, toggleAudio, playCue } = usePrologueAudio();

  // Check client and localStorage state safely
  useEffect(() => {
    setIsClient(true);
    const reduced = prefersReducedMotion();
    setIsReducedMotion(reduced);

    try {
      const visited = localStorage.getItem("hasVisitedBerrelle");
      if (visited === "true") {
        setHasVisited(true);
        setIsPrologueActive(false);
      } else {
        setHasVisited(false);
        setIsPrologueActive(true);
      }
    } catch {
      setHasVisited(false);
      setIsPrologueActive(true);
    }
  }, []);

  // Complete prologue and smoothly scroll to homepage
  const completePrologue = useCallback(() => {
    try {
      localStorage.setItem("hasVisitedBerrelle", "true");
    } catch {
      // safe fallback
    }

    const heroEl = document.getElementById("hero");
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: "smooth" });
    }

    setTimeout(() => {
      setIsPrologueActive(false);
      if (onPrologueComplete) onPrologueComplete();
    }, 700);
  }, [onPrologueComplete]);

  // Skip Intro button action
  const handleSkipIntro = useCallback(() => {
    try {
      localStorage.setItem("hasVisitedBerrelle", "true");
    } catch {
      // safe
    }

    if (masterTlRef.current) {
      gsap.to(masterTlRef.current, {
        progress: 1,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          completePrologue();
        },
      });
    } else {
      completePrologue();
    }
  }, [completePrologue]);

  // Replay Intro event handler
  const handleReplayIntro = useCallback(() => {
    setIsPrologueActive(true);
    window.scrollTo({ top: 0, behavior: "instant" });

    if (masterTlRef.current) {
      masterTlRef.current.progress(0);
    }
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.scroll(0);
    }
    setTimeout(() => {
      const st = scrollTriggerRef.current;
      if (st) st.refresh();
    }, 100);
  }, []);

  // Listen for global custom event 'replay-Berrelle-prologue'
  useEffect(() => {
    const onReplayEvent = () => handleReplayIntro();
    window.addEventListener("replay-Berrelle-prologue", onReplayEvent);
    return () => {
      window.removeEventListener("replay-Berrelle-prologue", onReplayEvent);
    };
  }, [handleReplayIntro]);

  // GSAP Master Scrubbed Timeline Setup
  useEffect(() => {
    if (!isClient || isReducedMotion || !isPrologueActive) return;

    registerGSAP();

    const desk = deskSceneRef.current;
    const craving = cravingSceneRef.current;
    const fantasy = fantasySceneRef.current;
    const wrapper = scrollWrapperRef.current;
    const pin = pinContainerRef.current;

    if (!desk || !craving || !fantasy || !wrapper || !pin) return;

    const ctx = gsap.context(() => {
      // Master timeline (100 units normalized duration)
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "none" },
        onUpdate: () => {
          const progress = tl.progress();
          // Update cinematic progress bar (direct DOM for perf, no React rerender)
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${progress * 100}%`;
          }
          if (progress < 0.14) {
            setCurrentChapter("Scene 01 • 11:47 PM");
            playCue("desk");
          } else if (progress < 0.28) {
            setCurrentChapter("Scene 02 • The Scroll");
            playCue("phone");
          } else if (progress < 0.40) {
            setCurrentChapter("Scene 03 • The Craving");
            playCue("craving");
          } else if (progress < 0.52) {
            setCurrentChapter("Scene 04 • The Signal");
            playCue("signal");
          } else if (progress < 0.64) {
            setCurrentChapter("Scene 05 • Reality Breaks");
            playCue("portal");
          } else if (progress < 0.74) {
            setCurrentChapter("Scene 06 • The World Opens");
            playCue("fantasy");
          } else if (progress < 0.84) {
            setCurrentChapter("Scene 07 • Dessert Montage");
            playCue("montage");
          } else if (progress < 0.92) {
            setCurrentChapter("Scene 08 • The Brand");
            playCue("logo");
          } else if (progress < 0.96) {
            setCurrentChapter("Scene 09 • The Idea");
            playCue("idea");
          } else {
            setCurrentChapter("Scene 10 • Handoff");
            playCue("handoff");
          }
        },
      });

      masterTlRef.current = tl;

      // INITIAL SCENE SETTINGS
      gsap.set(desk.overlayDark, { opacity: 0.95 });
      gsap.set(desk.clockBlock, { opacity: 1, y: 0 });
      gsap.set(desk.timeDigits, { opacity: 1, y: 0 });
      gsap.set(desk.lineOneMoreScroll, { opacity: 0, y: 15 });
      gsap.set(desk.deskImageWrapper, { scale: 1.02, y: 0, x: 0 });
      gsap.set(desk.phoneGlow, { opacity: 0.15, scale: 0.9 });
      gsap.set(desk.kineticBlock, { opacity: 0 });
      gsap.set(desk.lineHungry, { opacity: 0, y: 25, letterSpacing: "0.02em" });
      gsap.set(desk.lineCraving, { opacity: 0, y: 30, scale: 0.92 });

      gsap.set(craving.root, { opacity: 0 });
      gsap.set(craving.cravingImageWrapper, { scale: 1.02, filter: "blur(0px)", opacity: 1 });
      gsap.set(craving.textAndThen, { opacity: 0, y: 18 });
      gsap.set(craving.textSawIt, { opacity: 0, y: 22 });
      gsap.set(craving.signalLayer, { opacity: 0 });
      gsap.set(craving.signalParticles, { opacity: 0 });
      gsap.set(craving.strawberryHero, { scale: 0.92, rotation: -4 });
      gsap.set(craving.portalBurst, { opacity: 0, scale: 0.5 });
      gsap.set(craving.portalStreakParticles, { opacity: 0, scale: 0.8 });
      gsap.set(craving.portalVeil, { opacity: 0 });

      gsap.set(fantasy.root, { opacity: 0 });
      gsap.set(fantasy.fantasyImageWrapper, { scale: 1.18, y: -20 });
      gsap.set(fantasy.silhouetteVeil, { opacity: 0.95 });
      gsap.set(fantasy.lightRays, { opacity: 0 });
      gsap.set(fantasy.particlesGroup, { y: 30, opacity: 0 });
      gsap.set(fantasy.montageContainer, { opacity: 0 });
      gsap.set(fantasy.montageItem1, { opacity: 0, y: 40, scale: 0.85 });
      gsap.set(fantasy.montageItem2, { opacity: 0, y: -30, scale: 0.85 });
      gsap.set(fantasy.montageItem3, { opacity: 0, scale: 0.85 });
      gsap.set(fantasy.montageItem4, { opacity: 0, y: 35, scale: 0.85 });
      gsap.set(fantasy.montageItem5, { opacity: 0, y: 25, scale: 0.85 });
      gsap.set(fantasy.logoCluster, { opacity: 0 });
      gsap.set(fantasy.logoBerry, { scale: 0.2, rotation: -20, opacity: 0 });
      gsap.set(fantasy.logoWordmark, { opacity: 0, y: 20, letterSpacing: "0.2em" });
      gsap.set(fantasy.manifestoLine1, { opacity: 0, y: 15 });
      gsap.set(fantasy.manifestoLine2, { opacity: 0, y: 15 });
      gsap.set(fantasy.manifestoLine3, { opacity: 0, y: 15 });
      gsap.set(fantasy.sceneIdeaBlock, { opacity: 0, scale: 0.95 });
      gsap.set(fantasy.handoffCta, { opacity: 0, y: 25 });

      /* ─────────────────────────────────────────────────────────────
         SCENE 01 — 11:47 PM (t: 0 -> 14)
         Dark room. Desk/night keyframe. Extremely slow camera push.
         "11:47 PM" -> Entrance -> HOLD -> Exit
         "One more scroll." -> Entrance -> HOLD -> Exit
      ───────────────────────────────────────────────────────────── */
      tl.addLabel("scene-01", 0)
        .to(desk.overlayDark, { opacity: 0, duration: 6 }, 0)
        .to(desk.deskImageWrapper, { scale: 1.08, duration: 14 }, 0)
        // 11:47 PM: Entrance (0 -> 2), HOLD (2 -> 8), Exit (8 -> 11)
        .to(desk.timeDigits, { opacity: 1, duration: 2 }, 0)
        .to(desk.timeDigits, { opacity: 0.25, y: -8, duration: 3 }, 8)
        // "One more scroll.": Entrance (5 -> 7), HOLD (7 -> 11), Exit (11 -> 13.5)
        .to(desk.lineOneMoreScroll, { opacity: 1, y: 0, duration: 2 }, 5)
        .to(desk.lineOneMoreScroll, { opacity: 1, duration: 4 }, 7) // HOLD
        .to(desk.lineOneMoreScroll, { opacity: 0, y: -10, duration: 2.5 }, 11)
        .to(desk.clockBlock, { opacity: 0, y: -20, duration: 2.5 }, 11.5);

      /* ─────────────────────────────────────────────────────────────
         SCENE 02 — THE SCROLL (t: 14 -> 28)
         Camera approaches phone. Background softens. Phone visual focus.
         "you weren't hungry." -> ENTRANCE -> HOLD -> EXIT
         THEN: "you were craving." -> ENTRANCE -> HOLD -> EXIT
         Zero collision or fighting for space.
      ───────────────────────────────────────────────────────────── */
      tl.addLabel("scene-02", 14)
        .to(desk.deskImageWrapper, { scale: 1.28, x: -10, y: -20, duration: 14 }, 14)
        .to(desk.phoneGlow, { opacity: 0.9, scale: 1.4, duration: 12 }, 14)
        .to(desk.kineticBlock, { opacity: 1, duration: 1 }, 14)
        // Sentence 1: "you weren't hungry."
        .to(desk.lineHungry, { opacity: 1, y: 0, duration: 2 }, 14.5) // ENTRANCE
        .to(desk.lineHungry, { opacity: 1, duration: 4 }, 16.5) // HOLD
        .to(desk.lineHungry, { opacity: 0, y: -20, duration: 1.8 }, 20.5) // EXIT
        // Sentence 2: "you were craving."
        .to(desk.lineCraving, { opacity: 1, y: 0, scale: 1, duration: 2.2 }, 22.5) // ENTRANCE
        .to(desk.lineCraving, { opacity: 1, duration: 3.5 }, 24.7) // HOLD
        .to(desk.lineCraving, { opacity: 0, scale: 1.08, filter: "blur(4px)", duration: 2 }, 28.2); // EXIT

      /* ─────────────────────────────────────────────────────────────
         SCENE 03 — THE MOMENT / THE CRAVING (t: 28 -> 40)
         Screen darkens. Glowing strawberry appears. Let it breathe.
         Subtle floating particle movement.
         "And then..." -> ENTRANCE -> HOLD -> EXIT
         "...you saw it." -> ENTRANCE -> HOLD -> EXIT
      ───────────────────────────────────────────────────────────── */
      tl.addLabel("scene-03", 28)
        .to(desk.root, { opacity: 0, duration: 2.5 }, 28)
        .to(craving.root, { opacity: 1, duration: 2.5 }, 28)
        .to(craving.cravingImageWrapper, { scale: 1.08, duration: 12 }, 28)
        .to(craving.strawberryHero, { scale: 1.06, rotation: 1.5, duration: 12 }, 28)
        // "And then..."
        .to(craving.textAndThen, { opacity: 1, y: 0, duration: 2 }, 29.5) // ENTRANCE
        .to(craving.textAndThen, { opacity: 1, duration: 3 }, 31.5) // HOLD
        .to(craving.textAndThen, { opacity: 0, y: -15, duration: 1.5 }, 34.5) // EXIT
        // "...you saw it."
        .to(craving.textSawIt, { opacity: 1, y: 0, duration: 2 }, 35.5) // ENTRANCE
        .to(craving.textSawIt, { opacity: 1, duration: 3 }, 37.5) // HOLD
        .to(craving.textSawIt, { opacity: 0, y: -15, duration: 1.8 }, 40.5); // EXIT

      /* ─────────────────────────────────────────────────────────────
         SCENE 04 — THE SIGNAL (t: 40 -> 52)
         Strawberry slowly glows. Berry-colored light spreads across room.
         Particles respond. Scroll controls the intensity.
         At 43: subtle glow. At 47: stronger glow. At 51: reality breaking.
      ───────────────────────────────────────────────────────────── */
      tl.addLabel("scene-04", 40)
        .to(craving.signalLayer, { opacity: 0.45, duration: 4 }, 40)
        .to(craving.signalParticles, { opacity: 0.6, scale: 1.1, duration: 4 }, 41)
        .to(craving.signalLayer, { opacity: 1, duration: 5 }, 44)
        .to(craving.signalParticles, { opacity: 1, scale: 1.35, duration: 6 }, 45)
        .to(craving.cravingImageWrapper, { filter: "blur(10px)", opacity: 0.3, duration: 10 }, 42)
        .to(craving.strawberryHero, { scale: 1.35, rotation: 6, duration: 10 }, 42);

      /* ─────────────────────────────────────────────────────────────
         SCENE 05 — REALITY BREAKS (t: 52 -> 64)
         Physical cinematic transition sequence:
         strawberry -> radial distortion -> lens bloom -> camera passes through -> darkness.
      ───────────────────────────────────────────────────────────── */
      tl.addLabel("scene-05", 52)
        .to(craving.strawberryHero, { scale: 22, rotation: 0, duration: 9 }, 52.5)
        .to(craving.portalBurst, { opacity: 1, scale: 2.8, duration: 8 }, 53)
        .to(craving.portalStreakParticles, { opacity: 1, scale: 2.2, duration: 7 }, 53.5)
        .to(craving.portalVeil, { opacity: 1, duration: 5 }, 58)
        .to([craving.signalLayer, craving.signalParticles], { opacity: 0, duration: 2 }, 60);

      /* ─────────────────────────────────────────────────────────────
         SCENE 06 — THE WORLD OPENS (t: 64 -> 74)
         Progressive layered reveal:
         1. Dark silhouette -> 2. Berry lights -> 3. Dessert shapes -> 4. Full world
      ───────────────────────────────────────────────────────────── */
      tl.addLabel("scene-06", 64)
        .to(fantasy.root, { opacity: 1, duration: 2 }, 63)
        .to(craving.portalVeil, { opacity: 0, duration: 3 }, 64)
        .to(craving.root, { opacity: 0, duration: 1.5 }, 64.5)
        // Progressive silhouette veil unmasking
        .to(fantasy.silhouetteVeil, { opacity: 0.4, duration: 4 }, 64)
        .to(fantasy.silhouetteVeil, { opacity: 0, duration: 5 }, 68)
        .to(fantasy.fantasyImageWrapper, { scale: 1.03, y: 0, duration: 10 }, 64)
        .to(fantasy.lightRays, { opacity: 0.9, duration: 6 }, 65.5)
        .to(fantasy.particlesGroup, { opacity: 1, y: 0, duration: 6 }, 66.5);

      /* ─────────────────────────────────────────────────────────────
         SCENE 07 — DESSERT DREAM (t: 74 -> 84)
         Floating luxury food commercial montage.
         Multiple depths, parallax, slow forward push.
      ───────────────────────────────────────────────────────────── */
      tl.addLabel("scene-07", 74)
        .to(fantasy.montageContainer, { opacity: 1, duration: 1.5 }, 74)
        .to(fantasy.montageItem1, { opacity: 1, y: 0, scale: 1, duration: 3.5 }, 74.5)
        .to(fantasy.montageItem2, { opacity: 1, y: 0, scale: 1, duration: 3.5 }, 75.2)
        .to(fantasy.montageItem3, { opacity: 1, scale: 1.05, duration: 4 }, 75.8)
        .to(fantasy.montageItem4, { opacity: 1, y: 0, scale: 1, duration: 3.5 }, 76.6)
        .to(fantasy.montageItem5, { opacity: 1, y: 0, scale: 1, duration: 3.5 }, 77.2)
        // HOLD the luxury food commercial moment
        .to(fantasy.montageItem3, { scale: 1.08, duration: 3.5 }, 78)
        // Dissolve montage into floating particles
        .to(
          [
            fantasy.montageItem1,
            fantasy.montageItem2,
            fantasy.montageItem3,
            fantasy.montageItem4,
            fantasy.montageItem5,
          ],
          { opacity: 0, scale: 1.12, filter: "blur(6px)", duration: 2.8 },
          81.5
        )
        .to(fantasy.montageContainer, { opacity: 0, duration: 1 }, 84);

      /* ─────────────────────────────────────────────────────────────
         SCENE 08 — BRAND ASSEMBLY (t: 84 -> 92)
         Particles assemble into Berrelle logo.
         Each line of the 3-line manifesto has its own distinct moment!
      ───────────────────────────────────────────────────────────── */
      tl.addLabel("scene-08", 84)
        .to(fantasy.logoCluster, { opacity: 1, duration: 1.5 }, 84)
        .to(fantasy.logoBerry, { scale: 1, rotation: 0, opacity: 1, duration: 3 }, 84)
        .to(fantasy.logoWordmark, { opacity: 1, y: 0, letterSpacing: "0.05em", duration: 3 }, 85)
        // Line 1: "A little sweet."
        .to(fantasy.manifestoLine1, { opacity: 1, y: 0, duration: 1.8 }, 86.5)
        // Line 2: "A little chaotic."
        .to(fantasy.manifestoLine2, { opacity: 1, y: 0, duration: 1.8 }, 88.5)
        // Line 3: "Completely Berrelle."
        .to(fantasy.manifestoLine3, { opacity: 1, y: 0, duration: 2 }, 90.2);

      /* ─────────────────────────────────────────────────────────────
         SCENE 09 — THE IDEA (t: 92 -> 96)
         Dark/berry minimal scene. "Dessert, with a little more imagination."
         Slow reveal, breathes comfortably.
      ───────────────────────────────────────────────────────────── */
      tl.addLabel("scene-09", 92)
        .to(fantasy.logoCluster, { opacity: 0.15, scale: 0.94, duration: 1.8 }, 92)
        .to(fantasy.sceneIdeaBlock, { opacity: 1, scale: 1, duration: 2.5 }, 92.5)
        .to(fantasy.sceneIdeaBlock, { opacity: 1, duration: 1.5 }, 94.5) // HOLD
        .to(fantasy.sceneIdeaBlock, { opacity: 0.2, y: -12, duration: 1.5 }, 95.8);

      /* ─────────────────────────────────────────────────────────────
         SCENE 10 — ENTER / HANDOFF (t: 96 -> 100)
         Fantasy world becomes the website entry portal.
         "Ready to follow the craving?" -> ENTER Berrelle →
      ───────────────────────────────────────────────────────────── */
      tl.addLabel("scene-10", 96)
        .to(fantasy.handoffCta, { opacity: 1, y: 0, duration: 2.5 }, 96.5);

      // Explicit end label for deterministic scrub
      tl.addLabel("complete", 100);

      // Pin the `.prologue-pin` container inside `.prologue-scroll`
      // Generous responsive scroll distances as instructed:
      // Desktop: 750vh, Tablet: 580vh, Mobile: 480vh with scrub: 1.2
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const st = ScrollTrigger.create({
          trigger: wrapper,
          start: "top top",
          end: "+=750%",
          pin: pin,
          scrub: 1.2,
          anticipatePin: 1,
          animation: tl,
          onLeave: () => {
            try {
              localStorage.setItem("hasVisitedBerrelle", "true");
            } catch {}
          },
        });
        scrollTriggerRef.current = st;
      });

      mm.add("(min-width: 640px) and (max-width: 1023px)", () => {
        const st = ScrollTrigger.create({
          trigger: wrapper,
          start: "top top",
          end: "+=580%",
          pin: pin,
          scrub: 1.2,
          anticipatePin: 1,
          animation: tl,
          onLeave: () => {
            try {
              localStorage.setItem("hasVisitedBerrelle", "true");
            } catch {}
          },
        });
        scrollTriggerRef.current = st;
      });

      mm.add("(max-width: 639px)", () => {
        const st = ScrollTrigger.create({
          trigger: wrapper,
          start: "top top",
          end: "+=480%",
          pin: pin,
          scrub: 1.1,
          anticipatePin: 1,
          animation: tl,
          onLeave: () => {
            try {
              localStorage.setItem("hasVisitedBerrelle", "true");
            } catch {}
          },
        });
        scrollTriggerRef.current = st;
      });
    }, scrollWrapperRef);

    return () => {
      ctx.revert();
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, [isClient, isReducedMotion, isPrologueActive, playCue]);

  // If user has visited and prologue is inactive, do not render pinned spacer
  if (hasVisited === true && !isPrologueActive) {
    return null;
  }

  // REDUCED MOTION ALTERNATIVE
  if (isReducedMotion) {
    return (
      <section className="relative w-full min-h-[90vh] bg-[#160A11] text-[#FFF9F0] flex items-center justify-center p-6 sm:p-12 overflow-hidden select-none">
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center text-center">
          <span className="font-mono text-xs uppercase tracking-[0.35em] text-[#E98FA8] mb-3">
            Quiet Hours • 11:47 PM
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-bold text-[#FFF9F0] mb-4">
            THE CRAVING
          </h1>
          <p className="text-base sm:text-lg text-[#FFF1E8]/85 mb-8 max-w-lg leading-relaxed">
            A quiet desk. A tired night. A phone. A tiny strawberry. Then came the spark that transforms
            the entire world into Berrelle.
          </p>

          <div className="relative w-72 h-44 sm:w-96 sm:h-60 rounded-3xl overflow-hidden border-2 border-[#E98FA8]/40 shadow-2xl mb-8">
            <Image
              src="/prologue/desk-keyframe.png"
              alt="Late night quiet study desk"
              fill
              className="object-cover"
            />
          </div>

          <button
            type="button"
            onClick={completePrologue}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-base font-bold bg-[#E98FA8] hover:bg-[#e37e99] text-[#382D32] shadow-lg transition-transform active:scale-95"
          >
            <span>ENTER Berrelle →</span>
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Living Desktop Cursor Reaction */}
      <PrologueCursor active={isPrologueActive} />

      <section
        ref={scrollWrapperRef}
        className="prologue-scroll relative w-full bg-[#160A11]"
      >
        {/* PINNED VIEWPORT CONTAINER */}
        <div
          ref={pinContainerRef}
          className="prologue-pin prologue-grain relative w-full h-screen overflow-hidden z-[70]"
        >
          {/* STAGE CONTAINER (All animated elements live inside) */}
          <div ref={stageRef} className="prologue-stage relative w-full h-full">
            {/* SCENE 01 & 02: DESK & PHONE */}
            <PrologueDeskScene ref={deskSceneRef} />

            {/* SCENE 03, 04 & 05: CRAVING, SIGNAL & REALITY BREAKS PORTAL */}
            <PrologueCravingScene ref={cravingSceneRef} />

            {/* SCENE 06, 07, 08, 09 & 10: FANTASY WORLD, DESSERT MONTAGE, LOGO ASSEMBLY & HANDOFF */}
            <PrologueFantasyScene
              ref={fantasySceneRef}
              onEnterHomepage={completePrologue}
            />

            {/* TOP BAR OVERLAYS (Skip Intro & Audio Controls) */}
            <div className="absolute top-6 inset-x-6 sm:inset-x-10 z-[60] flex items-center justify-between pointer-events-none">
              {/* Left: Cinematic Sound Control */}
              <button
                type="button"
                onClick={toggleAudio}
                className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-[#FFF9F0] transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
                title={isAudioEnabled ? "Mute Cinematic Sound" : "Turn On Cinematic Sound"}
              >
                {isAudioEnabled ? (
                  <>
                    <Volume2 className="w-4 h-4 text-[#E98FA8] animate-pulse" />
                    <span className="text-[#E98FA8] font-bold">SOUND ON</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-4 h-4 text-white/60" />
                    <span className="text-white/80">SOUND OFF</span>
                  </>
                )}
              </button>

              {/* Right: Persistent SKIP INTRO Button */}
              <button
                type="button"
                id="skip-intro"
                data-cursor-bounce="true"
                onClick={handleSkipIntro}
                className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-bold text-[#FFF9F0] hover:text-[#E98FA8] shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>SKIP INTRO</span>
                <FastForward className="w-3.5 h-3.5 text-[#E98FA8]" />
              </button>
            </div>

            {/* BOTTOM BAR: CHAPTER STATUS + CINEMATIC PROGRESS BAR */}
            <div className="absolute bottom-0 inset-x-0 z-[60] pb-5 px-6 sm:px-10 flex flex-col gap-2.5 pointer-events-none">
              {/* Scrub progress bar */}
              <div className="w-full h-[1.5px] bg-white/10 rounded-full overflow-hidden">
                <div
                  ref={progressBarRef}
                  className="h-full rounded-full"
                  style={{
                    width: "0%",
                    background: "linear-gradient(to right, rgba(233,143,168,0.5), #E98FA8, rgba(255,241,232,0.9))",
                  }}
                />
              </div>
              {/* Chapter label + scroll hint */}
              <div className="flex items-center justify-between text-xs text-[#FFF9F0]/70 font-mono">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E98FA8] dot-blink" />
                  <span className="text-[#E98FA8] uppercase tracking-widest font-semibold">
                    {currentChapter}
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-white/40 text-[11px] tracking-wider">
                  <span>SCROLL CONTROLS THE STORY</span>
                  <span>↓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

