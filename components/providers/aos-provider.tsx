"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { prefersReducedMotion } from "@/lib/gsap-init";

export function AosInitializer() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    AOS.init({
      once: true,
      duration: 700,
      offset: 40,
      easing: "ease-out-cubic",
      delay: 50,
    });

    // Refresh on route changes or dynamic layout shifts
    const handleRefresh = () => AOS.refresh();
    window.addEventListener("resize", handleRefresh);
    return () => {
      window.removeEventListener("resize", handleRefresh);
    };
  }, []);

  return null;
}
