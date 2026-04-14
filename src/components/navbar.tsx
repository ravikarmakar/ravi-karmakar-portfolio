"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { CoolMode } from "@/components/ui/cool-mode";
import { SOCIAL_LINKS } from "@/lib/constants";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
];

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("#about");
  const [mounted, setMounted] = useState(false);

  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;

    // 1. Handle Overscroll (Safari/iOS rubber-banding)
    // If we're scrolling into negative territory, ensure navbar is shown and skip delta logic
    if (latest < 0) {
      if (hidden) setHidden(false);
      lastScrollY.current = 0;
      return;
    }

    // 2. Delta-based Hysteresis Logic
    // We only change visibility if the scroll distance exceeds a threshold (10px)
    // to prevent "flickering" from micro-movements on touchpads/mobile.
    const delta = latest - previous;
    const threshold = 10;

    if (latest <= 50) {
      // Force visible at the very top
      if (hidden) setHidden(false);
    } else if (Math.abs(delta) > threshold) {
      if (delta > 0 && latest > 150) {
        // Scrolling Down - Hide
        if (!hidden) setHidden(true);
      } else if (delta < 0) {
        // Scrolling Up - Show
        if (hidden) setHidden(false);
      }
    }

    // 3. Background Appearance Transition
    if (latest > 20) {
      if (!isScrolled) setIsScrolled(true);
    } else {
      if (isScrolled) setIsScrolled(false);
    }

    lastScrollY.current = latest;
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Intersection Observer to track active section
  useEffect(() => {
    if (!mounted) return;

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // Focus on the middle of the screen
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Target all sections that have nav links
    const sectionIds = ["about", "experience", "education", "projects", "skills", "contact", "certifications"];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [mounted]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 },
        }}
        animate={hidden && !mobileOpen ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[10000] transition-colors duration-300",
          (isScrolled || mobileOpen)
            ? "bg-black/60 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Branding / Avatar */}
          <CoolMode options={{ particle: "/ravi-photo.png" }}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group relative flex items-center justify-center cursor-pointer"
            >
              <div className="absolute inset-0 rounded-full bg-[var(--glow-cyan)] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-40" />
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/10 transition-transform duration-300 group-hover:scale-105 group-hover:border-[var(--glow-cyan)]/50">
                <img
                  src="/ravi-photo.png"
                  onError={(e) => {
                    e.currentTarget.src = SOCIAL_LINKS.avatar;
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
                className={cn(
                  "relative px-5 py-2.5 text-sm font-medium transition-colors cursor-pointer",
                  (hoveredLink === link.href || activeSection === link.href)
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                )}
              >
                {(hoveredLink === link.href || activeSection === link.href) && (
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

          {/* Mobile hamburger — now inside header to slide with it */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-[10001] flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 md:hidden cursor-pointer"
            aria-label="Toggle menu"
          >
            <div className={cn("h-px w-5 bg-white transition-all duration-300", mobileOpen && "rotate-45 translate-y-[5px]")} />
            <div className={cn("h-px w-5 bg-white transition-all duration-300", mobileOpen && "-rotate-45 -translate-y-[5px]")} />
          </button>
        </nav>
      </motion.header>

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
                    className={cn(
                      "text-4xl font-light tracking-tight transition-all active:scale-95 cursor-pointer",
                      activeSection === link.href ? "text-[var(--glow-cyan)] scale-110" : "text-white/80 hover:text-white hover:scale-105"
                    )}
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
