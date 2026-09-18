"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { TransitionLink } from "@/components/navigation/transition-provider";
import { BerryLogo, BadgePill } from "@/components/ui/berry-illustrations";
import { Menu, X, Sparkles, ChevronRight, Presentation, Compass, Utensils, Wand2, BookOpen, User, BarChart2, TrendingUp, Truck } from "lucide-react";

export const NAV_ROUTES = [
  { name: "Discover", href: "/discover", icon: Compass, world: "Mint" },
  { name: "Menu", href: "/menu", icon: Utensils, world: "Dark Cocoa" },
  { name: "Builder", href: "/builder", icon: Wand2, world: "Strawberry" },
  { name: "Story", href: "/story", icon: BookOpen, world: "Midnight" },
  { name: "Tanvi", href: "/founder", icon: User, world: "Parchment" },
  { name: "Business", href: "/business", icon: BarChart2, world: "Pitch" },
  { name: "Investment", href: "/investment", icon: TrendingUp, world: "Deep Berry" },
  { name: "Delivery", href: "/delivery", icon: Truck, world: "Soft Blue" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Check if we are on a dark world page (Menu / Story / Investment)
  const isDarkWorld = pathname === "/menu" || pathname === "/story" || pathname === "/investment";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDarkWorld
            ? "bg-[#181119]/90 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.5)] py-2 border-b border-white/10"
            : "bg-[#FFF9F0]/95 backdrop-blur-md shadow-[0_4px_25px_-2px_rgba(158,70,99,0.1)] py-2 border-b border-[#E98FA8]/20"
          : isDarkWorld
          ? "bg-[#181119]/70 backdrop-blur-sm py-3.5 border-b border-white/5"
          : "bg-[#FFF9F0]/85 backdrop-blur-sm py-3.5 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <TransitionLink
          href="/"
          className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9E4663] rounded-xl p-1 shrink-0"
          aria-label="Berrylicious Homepage"
        >
          <BerryLogo />
        </TransitionLink>

        {/* Desktop Floating Pill Navigation */}
        <nav
          className={`hidden xl:flex items-center gap-1 px-3 py-1.5 rounded-full border transition-colors shadow-xs ${
            isDarkWorld
              ? "bg-white/10 border-white/15 text-white/90"
              : "bg-white/80 border-[#E98FA8]/30 text-[#382D32]"
          }`}
          aria-label="Main Navigation"
        >
          {NAV_ROUTES.map((route) => {
            const isActive = pathname === route.href;
            const Icon = route.icon;
            return (
              <TransitionLink
                key={route.name}
                href={route.href}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#E98FA8] text-[#382D32] shadow-sm scale-105"
                    : isDarkWorld
                    ? "text-white/80 hover:text-[#FFB6C6] hover:bg-white/10"
                    : "text-[#382D32]/80 hover:text-[#9E4663] hover:bg-[#FFF1E8]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{route.name}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9E4663] animate-pulse" />
                )}
              </TransitionLink>
            );
          })}
        </nav>

        {/* Medium Screen Navigation (Simplified) */}
        <nav
          className={`hidden md:flex xl:hidden items-center gap-1 px-2.5 py-1 rounded-full border ${
            isDarkWorld ? "bg-white/10 border-white/15 text-white" : "bg-white/80 border-[#E98FA8]/30"
          }`}
        >
          {NAV_ROUTES.slice(0, 5).map((route) => {
            const isActive = pathname === route.href;
            return (
              <TransitionLink
                key={route.name}
                href={route.href}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#E98FA8] text-[#382D32]"
                    : isDarkWorld
                    ? "text-white/80 hover:text-white"
                    : "text-[#382D32]/80 hover:text-[#9E4663]"
                }`}
              >
                {route.name}
              </TransitionLink>
            );
          })}
          <TransitionLink
            href="/investment"
            className="px-2.5 py-1 rounded-full text-xs font-bold text-[#9E4663] bg-[#FFF1E8]"
          >
            Shark Tank
          </TransitionLink>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden lg:flex items-center gap-2.5">
          <TransitionLink
            href="/investment"
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all shadow-xs active:scale-95 border ${
              pathname === "/investment"
                ? "bg-[#9E4663] text-white border-[#FFB6C6]"
                : isDarkWorld
                ? "bg-white/10 text-[#FFB6C6] border-white/20 hover:bg-white/20"
                : "bg-[#FFF1E8] text-[#9E4663] border-[#E98FA8]/50 hover:border-[#9E4663] hover:bg-[#FFE8DE]"
            }`}
          >
            <Presentation className="w-3.5 h-3.5 text-[#E98FA8]" />
            <span>₹20L Ask</span>
          </TransitionLink>

          <TransitionLink
            href="/builder"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#E98FA8] hover:bg-[#e47e9a] text-[#382D32] transition-all duration-200 shadow-[0_4px_14px_rgba(233,143,168,0.4)] hover:shadow-[0_6px_20px_rgba(233,143,168,0.55)] active:scale-95 border border-[#9E4663]/30"
          >
            <span>Build Dessert</span>
            <Sparkles className="w-3.5 h-3.5 text-[#9E4663]" />
          </TransitionLink>
        </div>

        {/* Mobile Hamburger & Quick Link */}
        <div className="flex md:hidden items-center gap-2">
          <TransitionLink
            href="/builder"
            className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#E98FA8] text-[#382D32] border border-[#9E4663]/20 shadow-xs"
          >
            Build
          </TransitionLink>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu-drawer"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className={`p-2 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9E4663] ${
              isDarkWorld
                ? "text-white hover:bg-white/10"
                : "text-[#382D32] hover:text-[#9E4663] hover:bg-[#FFF1E8]"
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        id="mobile-menu-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#382D32]/60 backdrop-blur-xs transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={`absolute top-0 right-0 w-[84%] max-w-sm h-full bg-[#FFF9F0] shadow-2xl flex flex-col justify-between p-6 transition-transform duration-300 ease-out border-l border-[#E98FA8]/30 overflow-y-auto ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E98FA8]/30 mb-4">
              <BerryLogo />
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
                className="p-2 rounded-lg text-[#382D32] hover:bg-[#FFF1E8]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-4">
              <BadgePill text="Multi-Chapter Experience" color="pink" />
            </div>

            <nav className="flex flex-col gap-1.5" aria-label="Mobile Route Links">
              <TransitionLink
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                  pathname === "/"
                    ? "bg-[#E98FA8] text-[#382D32]"
                    : "text-[#382D32] hover:bg-[#FFF1E8] hover:text-[#9E4663]"
                }`}
              >
                <span>Home • Opening</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </TransitionLink>

              {NAV_ROUTES.map((route) => {
                const isActive = pathname === route.href;
                const Icon = route.icon;
                return (
                  <TransitionLink
                    key={route.name}
                    href={route.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                      isActive
                        ? "bg-[#E98FA8] text-[#382D32] shadow-xs"
                        : "text-[#382D32] hover:bg-[#FFF1E8] hover:text-[#9E4663]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-[#9E4663]" />
                      <span>{route.name}</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-black/5 text-[#382D32]/60">
                      {route.world}
                    </span>
                  </TransitionLink>
                );
              })}
            </nav>
          </div>

          <div className="pt-6 border-t border-[#E98FA8]/30 flex flex-col gap-2.5">
            <TransitionLink
              href="/builder"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold bg-[#E98FA8] text-[#382D32] shadow-sm border border-[#9E4663]/30 active:scale-95 text-sm"
            >
              <span>Build Your Dessert</span>
              <Sparkles className="w-4 h-4 text-[#9E4663]" />
            </TransitionLink>

            <TransitionLink
              href="/investment"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold bg-[#9E4663] text-white shadow-sm active:scale-95 text-sm"
            >
              <Presentation className="w-4 h-4" />
              <span>₹20L Shark Tank Climax</span>
            </TransitionLink>

            <p className="text-center text-[11px] text-[#382D32]/60 font-medium">
              Desserts • Coffee • Good Vibes
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
