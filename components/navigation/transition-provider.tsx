"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { registerGSAP, gsap, prefersReducedMotion } from "@/lib/gsap-init";
import { CHAPTERS } from "@/components/navigation/chapter-footer";
import { Sparkles } from "lucide-react";

interface TransitionContextType {
  navigateWithTransition: (href: string) => void;
  isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextType>({
  navigateWithTransition: () => {},
  isTransitioning: false,
});

export const usePageTransition = () => useContext(TransitionContext);

// World palette map for high-fidelity transitions
const WORLD_PALETTES: Record<
  string,
  { bg: string; accent: string; text: string; sub: string; label: string; number: string }
> = {
  "/": {
    bg: "linear-gradient(135deg, #2D141E 0%, #9E4663 50%, #E98FA8 100%)",
    accent: "#FFF9F0",
    text: "#FFF9F0",
    sub: "Cream + Berry Opening",
    label: "Chapter 01",
    number: "01",
  },
  "/discover": {
    bg: "linear-gradient(135deg, #0E3D34 0%, #1D7462 50%, #BFE9DE 100%)",
    accent: "#E6F8F3",
    text: "#E6F8F3",
    sub: "Mint Flavour Playground",
    label: "Chapter 02",
    number: "02",
  },
  "/menu": {
    bg: "linear-gradient(135deg, #12070D 0%, #26111C 50%, #872A47 100%)",
    accent: "#FFB6C6",
    text: "#FFF9F0",
    sub: "Dark Cocoa Dessert Market",
    label: "Chapter 03",
    number: "03",
  },
  "/builder": {
    bg: "linear-gradient(135deg, #701633 0%, #B02E53 50%, #FFE2EA 100%)",
    accent: "#FFF0F5",
    text: "#FFF0F5",
    sub: "Dessert Laboratory",
    label: "Chapter 04",
    number: "04",
  },
  "/story": {
    bg: "linear-gradient(135deg, #090508 0%, #1A0B14 50%, #4D1829 100%)",
    accent: "#FFB8CC",
    text: "#FFF9F0",
    sub: "Midnight Origin Film",
    label: "Chapter 05",
    number: "05",
  },
  "/founder": {
    bg: "linear-gradient(135deg, #3A2315 0%, #6E482B 50%, #F2E7D5 100%)",
    accent: "#FAF6EE",
    text: "#FAF6EE",
    sub: "Human Editorial Portrait",
    label: "Chapter 06",
    number: "06",
  },
  "/business": {
    bg: "linear-gradient(135deg, #152433 0%, #2A4861 50%, #C4D8E8 100%)",
    accent: "#F2F6FA",
    text: "#F2F6FA",
    sub: "Pitch Mode & Unit Metrics",
    label: "Chapter 07",
    number: "07",
  },
  "/investment": {
    bg: "linear-gradient(135deg, #14050D 0%, #5A172D 50%, #9E4663 100%)",
    accent: "#FFDDE6",
    text: "#FFE8EF",
    sub: "Shark Tank Climax Stage",
    label: "Chapter 08",
    number: "08",
  },
  "/delivery": {
    bg: "linear-gradient(135deg, #0E2A3F 0%, #1E567D 50%, #B8DDF2 100%)",
    accent: "#EFF7FF",
    text: "#EFF7FF",
    sub: "Distribution & Closing",
    label: "Chapter 09",
    number: "09",
  },
};

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetPalette, setTargetPalette] = useState(WORLD_PALETTES["/"]);
  const [targetTitle, setTargetTitle] = useState("Berrylicious");

  const curtainRef = useRef<HTMLDivElement>(null);
  const backdropLayerRef = useRef<HTMLDivElement>(null);
  const irisRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const targetHrefRef = useRef<string | null>(null);

  // Initialize GSAP
  useEffect(() => {
    registerGSAP();
  }, []);

  // When pathname changes (including browser back/forward or programmatic finish)
  useEffect(() => {
    if (!curtainRef.current) return;

    if (prefersReducedMotion()) {
      gsap.set(curtainRef.current, { display: "none", opacity: 0 });
      setIsTransitioning(false);
      return;
    }

    // Exit Animation: Iris expands out to reveal new world
    const tl = gsap.timeline({
      onComplete: () => {
        if (curtainRef.current) {
          gsap.set(curtainRef.current, { display: "none" });
        }
        setIsTransitioning(false);
        targetHrefRef.current = null;
      },
    });

    tl.to(titleContainerRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.25,
      ease: "power2.in",
    })
      .to(
        irisRef.current,
        {
          scale: 3.5,
          opacity: 0,
          duration: 0.45,
          ease: "power3.inOut",
        },
        "-=0.1"
      )
      .to(
        backdropLayerRef.current,
        {
          opacity: 0,
          duration: 0.35,
          ease: "power2.out",
        },
        "-=0.25"
      );
  }, [pathname]);

  const navigateWithTransition = (href: string) => {
    if (href === pathname) return;
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (prefersReducedMotion()) {
      router.push(href);
      return;
    }

    // Determine target world metadata
    const palette = WORLD_PALETTES[href] || WORLD_PALETTES["/"];
    const chap = CHAPTERS.find((c) => c.path === href);
    setTargetPalette(palette);
    setTargetTitle(chap ? chap.name : "Berrylicious");

    setIsTransitioning(true);
    targetHrefRef.current = href;

    if (curtainRef.current) {
      gsap.set(curtainRef.current, { display: "flex" });
      gsap.set(backdropLayerRef.current, { opacity: 0, background: palette.bg });
      gsap.set(irisRef.current, { scale: 0.1, opacity: 0 });
      gsap.set(titleContainerRef.current, { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        onComplete: () => {
          router.push(href);
        },
      });

      // Entrance: Iris circle grows and backdrop fades in
      tl.to(backdropLayerRef.current, {
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
      })
        .to(
          irisRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(1.4)",
          },
          "-=0.25"
        )
        .to(
          titleContainerRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power3.out",
          },
          "-=0.2"
        );

      // Failsafe timeout in case route transition stalls
      setTimeout(() => {
        if (targetHrefRef.current === href) {
          router.push(href);
        }
      }, 650);
    } else {
      router.push(href);
    }
  };

  return (
    <TransitionContext.Provider value={{ navigateWithTransition, isTransitioning }}>
      {children}

      {/* Cinematic Full-screen Route Transition Layer */}
      <div
        ref={curtainRef}
        className="fixed inset-0 z-[9999] pointer-events-none hidden items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        {/* Dynamic World Background Layer */}
        <div ref={backdropLayerRef} className="absolute inset-0 w-full h-full" />

        {/* Ambient Film Grain & Radial Light Mask */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_60%)] pointer-events-none" />

        {/* The Iris Expanding Portal */}
        <div
          ref={irisRef}
          className="relative z-10 w-44 h-44 sm:w-56 sm:h-56 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_0_80px_rgba(0,0,0,0.4)] flex items-center justify-center"
        >
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-white/30 bg-black/20 flex items-center justify-center shadow-inner">
            <span className="text-5xl sm:text-6xl select-none animate-pulse">🍓</span>
          </div>
        </div>

        {/* Cinematic Typographic Scene Card */}
        <div
          ref={titleContainerRef}
          className="absolute z-20 bottom-12 sm:bottom-16 text-center px-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs font-black uppercase tracking-widest text-white mb-2 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-white animate-spin" style={{ animationDuration: "4s" }} />
            <span>{targetPalette.label} • {targetPalette.sub}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white font-display drop-shadow-md">
            {targetTitle}
          </h2>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}

// Convenient Drop-in Link Component that hooks into page transitions
export function TransitionLink({
  href,
  children,
  className = "",
  onClick,
  activeClassName = "",
  ...props
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  [key: string]: unknown;
}) {
  const pathname = usePathname();
  const { navigateWithTransition } = usePageTransition();
  const isActive = pathname === href;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onClick) onClick(e);
    navigateWithTransition(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`${className} ${isActive ? activeClassName : ""}`}
      {...props}
    >
      {children}
    </a>
  );
}
