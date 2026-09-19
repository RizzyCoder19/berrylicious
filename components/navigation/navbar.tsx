"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { TransitionLink } from "@/components/navigation/transition-provider";
import { BerryLogo } from "@/components/ui/berry-illustrations";
import {
  Menu,
  X,
  Sparkles,
  ChevronRight,
  Presentation,
  Compass,
  Utensils,
  Wand2,
  BookOpen,
  User,
  BarChart2,
  TrendingUp,
  Truck,
} from "lucide-react";

export const NAV_ROUTES = [
  { num: "01", name: "Opening", href: "/", icon: Sparkles, world: "Cream" },
  { num: "02", name: "Discover", href: "/discover", icon: Compass, world: "Mint" },
  { num: "03", name: "Menu", href: "/menu", icon: Utensils, world: "Cocoa" },
  { num: "04", name: "Builder", href: "/builder", icon: Wand2, world: "Lab" },
  { num: "05", name: "Story", href: "/story", icon: BookOpen, world: "Midnight" },
  { num: "06", name: "Tanvi", href: "/founder", icon: User, world: "Portrait" },
  { num: "07", name: "Business", href: "/business", icon: BarChart2, world: "Pitch" },
  { num: "08", name: "Investment", href: "/investment", icon: TrendingUp, world: "Shark Tank" },
  { num: "09", name: "Delivery", href: "/delivery", icon: Truck, world: "Delivery" },
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

  const currentRouteIndex = NAV_ROUTES.findIndex((r) => r.href === pathname);
  const progressPercent =
    currentRouteIndex >= 0 ? Math.round(((currentRouteIndex + 1) / NAV_ROUTES.length) * 100) : 11;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDarkWorld
            ? "bg-[#140a10]/90 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.6)] py-2 border-b border-white/10"
            : "bg-[#FFF9F0]/95 backdrop-blur-md shadow-[0_4px_25px_-2px_rgba(158,70,99,0.12)] py-2 border-b border-[#E98FA8]/20"
          : isDarkWorld
          ? "bg-[#140a10]/70 backdrop-blur-sm py-3.5 border-b border-white/5"
          : "bg-[#FFF9F0]/85 backdrop-blur-sm py-3.5 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Film Logo */}
        <TransitionLink
          href="/"
          className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9E4663] rounded-xl p-1 shrink-0 flex items-center gap-2.5"
          aria-label="Berrylicious Homepage"
        >
          <BerryLogo />
          <span className="hidden lg:inline-flex items-center gap-1.5 text-[10px] uppercase font-black tracking-widest px-2 py-0.5 rounded-full border border-[#9E4663]/30 bg-black/5 text-[#9E4663]">
            Film Mode
          </span>
        </TransitionLink>

        {/* Desktop Chapter Navigator */}
        <nav
          className={`hidden xl:flex items-center gap-1 px-3 py-1.5 rounded-full border transition-colors shadow-sm ${
            isDarkWorld
              ? "bg-black/40 border-white/15 text-white/90"
              : "bg-white/85 border-[#E98FA8]/35 text-[#382D32]"
          }`}
          aria-label="Cinematic Chapter Navigation"
        >
          {NAV_ROUTES.map((route) => {
            const isActive = pathname === route.href;
            const Icon = route.icon;
            return (
              <TransitionLink
                key={route.num}
                href={route.href}
                className={`relative px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 group ${
                  isActive
                    ? "bg-[#E98FA8] text-[#382D32] shadow-sm scale-105"
                    : isDarkWorld
                    ? "text-white/75 hover:text-[#FFB6C6] hover:bg-white/10"
                    : "text-[#382D32]/75 hover:text-[#9E4663] hover:bg-[#FFF1E8]"
                }`}
              >
                <span
                  className={`text-[9px] font-mono tracking-tighter opacity-70 ${
                    isActive ? "text-[#382D32]" : ""
                  }`}
                >
                  {route.num}
                </span>
                <Icon className="w-3.5 h-3.5" />
                <span>{route.name}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9E4663] animate-ping ml-0.5" />
                )}
              </TransitionLink>
            );
          })}
        </nav>

        {/* Mid-screen Chapter Navigator */}
        <nav
          className={`hidden md:flex xl:hidden items-center gap-1 px-2.5 py-1 rounded-full border ${
            isDarkWorld ? "bg-black/40 border-white/15 text-white" : "bg-white/85 border-[#E98FA8]/35"
          }`}
        >
          {NAV_ROUTES.slice(0, 5).map((route) => {
            const isActive = pathname === route.href;
            return (
              <TransitionLink
                key={route.num}
                href={route.href}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                  isActive
                    ? "bg-[#E98FA8] text-[#382D32]"
                    : isDarkWorld
                    ? "text-white/80 hover:text-white"
                    : "text-[#382D32]/80 hover:text-[#9E4663]"
                }`}
              >
                <span className="text-[9px] font-mono opacity-60">{route.num}</span>
                <span>{route.name}</span>
              </TransitionLink>
            );
          })}
          <TransitionLink
            href="/investment"
            className="px-2.5 py-1 rounded-full text-xs font-bold text-[#9E4663] bg-[#FFF1E8]"
          >
            08 Climax
          </TransitionLink>
        </nav>

        {/* Action Controls & Story Progress */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Subtle Chapter Progress Indicator */}
          <div
            className={`hidden 2xl:flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold border ${
              isDarkWorld ? "bg-white/10 border-white/15 text-white/80" : "bg-[#FFF1E8] border-[#E98FA8]/30 text-[#9E4663]"
            }`}
          >
            <span className="text-[10px] uppercase font-mono tracking-wider">Chapter Progress</span>
            <div className="w-12 h-1.5 rounded-full bg-black/15 overflow-hidden">
              <div
                className="h-full bg-[#E98FA8] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[10px] font-mono">{progressPercent}%</span>
          </div>

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
            <span>Lab Studio</span>
            <Sparkles className="w-3.5 h-3.5 text-[#9E4663]" />
          </TransitionLink>
        </div>

        {/* Mobile Burger & Quick Link */}
        <div className="flex md:hidden items-center gap-2">
          <TransitionLink
            href="/builder"
            className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#E98FA8] text-[#382D32] border border-[#9E4663]/20 shadow-xs"
          >
            Lab
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
              <div className="flex items-center justify-between text-xs font-bold text-[#9E4663] bg-[#FFF1E8] px-3 py-1.5 rounded-xl">
                <span>Story Progress</span>
                <span className="font-mono">{progressPercent}%</span>
              </div>
            </div>

            <nav className="flex flex-col gap-1.5" aria-label="Mobile Route Links">
              {NAV_ROUTES.map((route) => {
                const isActive = pathname === route.href;
                const Icon = route.icon;
                return (
                  <TransitionLink
                    key={route.num}
                    href={route.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2 rounded-2xl text-sm font-bold transition-all ${
                      isActive
                        ? "bg-[#E98FA8] text-[#382D32] shadow-xs"
                        : "text-[#382D32] hover:bg-[#FFF1E8] hover:text-[#9E4663]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono opacity-60">{route.num}</span>
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
          </div>
        </div>
      </div>
    </header>
  );
}
