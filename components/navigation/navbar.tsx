"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BerryLogo, BadgePill } from "@/components/ui/berry-illustrations";
import { Menu, X, Sparkles, ChevronRight, Presentation } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "#hero" },
  { name: "Craving", href: "#craving" },
  { name: "Menu", href: "#menu" },
  { name: "Build Yours", href: "#build" },
  { name: "Our Story", href: "#story" },
  { name: "The Business", href: "#business" },
  { name: "Investment", href: "#investment" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section spy
      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      const current = sections.find((sec) => {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 140 && rect.bottom >= 140;
        }
        return false;
      });
      if (current) setActiveSection(current);
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FFF9F0]/95 backdrop-blur-md shadow-[0_4px_20px_-2px_rgba(158,70,99,0.08)] py-2.5 border-b border-[#E98FA8]/20"
          : "bg-[#FFF9F0]/80 backdrop-blur-sm py-4 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="#hero"
          className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9E4663] rounded-xl p-1"
          aria-label="Berrylicious Homepage"
        >
          <BerryLogo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[#E98FA8] text-[#382D32] shadow-sm font-bold scale-105"
                    : "text-[#382D32]/80 hover:text-[#9E4663] hover:bg-[#FFF1E8]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="#business"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FFF1E8] text-[#9E4663] border border-[#E98FA8]/50 hover:border-[#9E4663] hover:bg-[#FFE8DE] transition-all shadow-sm active:scale-95"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>Shark Tank Pitch</span>
          </Link>

          <Link
            href="#build"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-bold bg-[#E98FA8] hover:bg-[#e47e9a] text-[#382D32] transition-all duration-200 shadow-[0_4px_14px_rgba(233,143,168,0.45)] hover:shadow-[0_6px_20px_rgba(233,143,168,0.6)] active:scale-95 border border-[#9E4663]/30"
          >
            <span>Build Yours</span>
            <Sparkles className="w-3.5 h-3.5 text-[#9E4663]" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="#build"
            className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#E98FA8] text-[#382D32] border border-[#9E4663]/20"
          >
            Build
          </Link>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu-drawer"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="p-2 rounded-xl text-[#382D32] hover:text-[#9E4663] hover:bg-[#FFF1E8] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9E4663]"
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
          className="absolute inset-0 bg-[#382D32]/40 backdrop-blur-xs transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={`absolute top-0 right-0 w-[82%] max-w-sm h-full bg-[#FFF9F0] shadow-2xl flex flex-col justify-between p-6 transition-transform duration-300 ease-out border-l border-[#E98FA8]/30 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E98FA8]/30 mb-6">
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
              <BadgePill text="Shark Tank Companion" color="pink" />
            </div>

            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl text-base font-bold transition-all ${
                      isActive
                        ? "bg-[#E98FA8] text-[#382D32]"
                        : "text-[#382D32] hover:bg-[#FFF1E8] hover:text-[#9E4663]"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="pt-6 border-t border-[#E98FA8]/30 flex flex-col gap-3">
            <Link
              href="#build"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold bg-[#E98FA8] text-[#382D32] shadow-md border border-[#9E4663]/30 active:scale-95"
            >
              <span>Build Your Dessert</span>
              <Sparkles className="w-4 h-4 text-[#9E4663]" />
            </Link>

            <Link
              href="#investment"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold bg-[#9E4663] text-white shadow-sm active:scale-95"
            >
              <Presentation className="w-4 h-4" />
              <span>₹20L Investment Ask</span>
            </Link>

            <p className="text-center text-xs text-[#382D32]/60 font-medium">
              Desserts • Coffee • Good Vibes
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
