"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { CoolMode } from "@/components/ui/cool-mode";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
];

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const currentScroll = window.scrollY;

    // Show navbar when scrolling UP (toward top) or near the top
    // Hide navbar when scrolling DOWN (deeper into page)
    setIsVisible(currentScroll < lastScrollY.current || currentScroll < 100);
    setIsScrolled(currentScroll > 50);
    lastScrollY.current = currentScroll;
  }, []);

  useEffect(() => {
    setMounted(true);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Mobile hamburger — always rendered, never removed by AnimatePresence */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 right-4 z-[10001] flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 md:hidden"
        aria-label="Toggle menu"
      >
        <div className={cn("h-px w-5 bg-white transition-all duration-300", mobileOpen && "rotate-45 translate-y-[5px]")} />
        <div className={cn("h-px w-5 bg-white transition-all duration-300", mobileOpen && "opacity-0")} />
        <div className={cn("h-px w-5 bg-white transition-all duration-300", mobileOpen && "-rotate-45 -translate-y-[5px]")} />
      </button>

      {/* Header bar */}
      <AnimatePresence>
        {isVisible && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn(
              "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
              isScrolled
                ? "bg-black/60 backdrop-blur-xl border-b border-white/5"
                : "bg-transparent"
            )}
          >
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
              {/* Branding / Avatar */}
              <CoolMode options={{ particle: "/ravi-photo.webp" }}>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="group relative flex items-center justify-center cursor-pointer"
                >
                  <div className="absolute inset-0 rounded-full bg-[var(--glow-cyan)] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-40" />
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/10 transition-transform duration-300 group-hover:scale-105 group-hover:border-[var(--glow-cyan)]/50">
                    <img
                      src="/ravi-photo.webp"
                      onError={(e) => {
                        e.currentTarget.src = "https://github.com/ravikarmakar.png";
                        e.currentTarget.onerror = null;
                      }}
                      alt="Ravi Karmakar"
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  </div>
                </button>
              </CoolMode>

              {/* Desktop Links */}
              <div
                className="hidden md:flex items-center gap-1 rounded-full border border-white/5 bg-white/[0.02] p-1.5 backdrop-blur-lg"
                onMouseLeave={() => setHoveredLink(null)}
              >
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    onMouseEnter={() => setHoveredLink(link.href)}
                    className="relative px-5 py-2.5 text-sm font-medium text-white/70 transition-colors hover:text-white"
                  >
                    {hoveredLink === link.href && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </button>
                ))}
              </div>

              {/* Desktop CTA */}
              <div className="hidden md:block">
                <MagneticButton
                  onClick={() => scrollTo("#contact")}
                  className="!px-6 !py-2.5 !text-xs !bg-white/5 hover:!bg-white/10 !border-white/10"
                >
                  Let&apos;s Talk
                </MagneticButton>
              </div>

              {/* Spacer for mobile (hamburger is positioned fixed outside) */}
              <div className="w-10 md:hidden" />
            </nav>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile Menu Portal */}
      {mounted && createPortal(
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, clipPath: "circle(0% at 94% 4%)" }}
              animate={{ opacity: 1, clipPath: "circle(150% at 94% 4%)" }}
              exit={{ opacity: 0, clipPath: "circle(0% at 94% 4%)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 bg-black/95 backdrop-blur-3xl md:hidden"
            >
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="h-[400px] w-[400px] rounded-full bg-[var(--glow-cyan)]/20 blur-[120px]"
                />
              </div>

              <div className="relative z-10 flex flex-col items-center gap-6">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: "easeOut" }}
                    onClick={() => scrollTo(link.href)}
                    className="text-4xl font-light tracking-tight text-white/80 transition-all hover:text-white hover:scale-105 active:scale-95"
                  >
                    {link.label}
                  </motion.button>
                ))}

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8"
                >
                  <MagneticButton onClick={() => scrollTo("#contact")} className="!px-12 !py-4 !text-base">
                    Get in Touch
                  </MagneticButton>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
