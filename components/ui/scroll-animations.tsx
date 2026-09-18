"use client";

import React, { useEffect, useRef, ReactNode } from "react";
import { registerGSAP, gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap-init";

// ─── FadeUp ────────────────────────────────────────────────────────────────
interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  y?: number;
}

export function FadeUp({ children, delay = 0, duration = 0.7, className = "", y = 40 }: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    registerGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [delay, duration, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// ─── StaggerChildren ────────────────────────────────────────────────────────
interface StaggerChildrenProps {
  children: ReactNode;
  stagger?: number;
  staggerDelay?: number;
  delay?: number;
  duration?: number;
  className?: string;
  y?: number;
}

export function StaggerChildren({
  children,
  stagger = 0.1,
  staggerDelay,
  delay = 0,
  duration = 0.6,
  className = "",
  y = 30,
}: StaggerChildrenProps) {
  const effectiveStagger = staggerDelay ?? stagger;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    registerGSAP();

    const ctx = gsap.context(() => {
      const items = ref.current!.children;
      gsap.fromTo(
        items,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger: effectiveStagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [effectiveStagger, delay, duration, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// ─── ScaleIn ────────────────────────────────────────────────────────────────
interface ScaleInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  from?: number;
}

export function ScaleIn({ children, delay = 0, duration = 0.6, className = "", from = 0.85 }: ScaleInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    registerGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, scale: from },
        {
          opacity: 1,
          scale: 1,
          duration,
          delay,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [delay, duration, from]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// ─── DrawLine ───────────────────────────────────────────────────────────────
interface DrawLineProps {
  className?: string;
  color?: string;
  vertical?: boolean;
}

export function DrawLine({ className = "", color = "#E98FA8", vertical = false }: DrawLineProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    registerGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { scaleX: vertical ? 1 : 0, scaleY: vertical ? 0 : 1, transformOrigin: vertical ? "top center" : "left center" },
        {
          scaleX: 1,
          scaleY: 1,
          duration: 1.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [vertical]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ backgroundColor: color }}
    />
  );
}

// ─── ParallaxLayer ───────────────────────────────────────────────────────────
interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number; // 0 = no parallax, positive = slower than scroll
  className?: string;
}

export function ParallaxLayer({ children, speed = 0.3, className = "" }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    registerGSAP();

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: () => -(ref.current!.offsetHeight * speed),
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
