"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { registerGSAP, gsap, prefersReducedMotion } from "@/lib/gsap-init";
import { BerryLogo } from "@/components/ui/berry-illustrations";
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

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const curtainRef = useRef<HTMLDivElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);
  const targetHrefRef = useRef<string | null>(null);

  // Initialize GSAP
  useEffect(() => {
    registerGSAP();
  }, []);

  // When pathname changes (including browser back/forward or direct route finish)
  useEffect(() => {
    if (curtainRef.current) {
      if (prefersReducedMotion()) {
        gsap.set(curtainRef.current, { display: "none", opacity: 0 });
        setIsTransitioning(false);
        return;
      }

      // Incoming reveal: curtain sweeps out
      const tl = gsap.timeline({
        onComplete: () => {
          if (curtainRef.current) {
            gsap.set(curtainRef.current, { display: "none" });
          }
          setIsTransitioning(false);
          targetHrefRef.current = null;
        },
      });

      tl.to(emblemRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
      }).to(
        curtainRef.current,
        {
          clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
          duration: 0.45,
          ease: "power3.inOut",
        },
        "-=0.1"
      );
    }
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

    setIsTransitioning(true);
    targetHrefRef.current = href;

    if (curtainRef.current) {
      gsap.set(curtainRef.current, {
        display: "flex",
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      });

      const tl = gsap.timeline({
        onComplete: () => {
          router.push(href);
        },
      });

      // Outgoing sweep: curtain rises smoothly
      tl.to(curtainRef.current, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 0.4,
        ease: "power3.inOut",
      }).fromTo(
        emblemRef.current,
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(1.7)" },
        "-=0.15"
      );

      // Fallback timeout in case routing takes longer
      setTimeout(() => {
        if (targetHrefRef.current === href) {
          router.push(href);
        }
      }, 700);
    } else {
      router.push(href);
    }
  };

  return (
    <TransitionContext.Provider value={{ navigateWithTransition, isTransitioning }}>
      {children}

      {/* Full-screen Berry Wipe Curtain */}
      <div
        ref={curtainRef}
        className="fixed inset-0 z-[9999] pointer-events-none hidden items-center justify-center bg-gradient-to-br from-[#9E4663] via-[#7F2D48] to-[#382D32] text-white overflow-hidden"
        style={{
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
        }}
        aria-hidden="true"
      >
        {/* Ambient background particles & glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(233,143,168,0.25)_0%,transparent_70%)] pointer-events-none" />

        <div
          ref={emblemRef}
          className="relative z-10 flex flex-col items-center gap-3 scale-90 opacity-0"
        >
          <div className="w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
            <span className="text-3xl select-none">🍓</span>
          </div>
          <div className="text-center">
            <span className="text-2xl font-black tracking-tight text-[#FFF9F0] font-display">
              BERRYLICIOUS
            </span>
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#E98FA8] font-semibold mt-1">
              <Sparkles className="w-3 h-3 animate-spin" style={{ animationDuration: "3s" }} />
              <span>Preparing chapter...</span>
            </div>
          </div>
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
