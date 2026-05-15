"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ChevronRight } from "lucide-react";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";

const ROLES = [
  "Full-Stack Developer",
  "System Architect",
  "Performance Engineer",
  "UI/UX Craftsman",
];

/* ─── Floating SVG Decorations ─── */
function FloatingSVGs() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[3] overflow-hidden">
      {/* Top-left: Code Brackets */}
      <motion.svg
        viewBox="0 0 80 80"
        className="absolute left-[8%] top-[15%] h-16 w-16 md:h-20 md:w-20"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.8, duration: 1.2 }}
      >
        <defs>
          <filter id="glow-cyan-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.g
          animate={{ y: [0, -8, 0], rotate: [0, 3, -3, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          filter="url(#glow-cyan-soft)"
        >
          <path
            d="M28 20L12 40L28 60"
            stroke="var(--glow-cyan)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.25"
          />
          <path
            d="M52 20L68 40L52 60"
            stroke="var(--glow-cyan)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.25"
          />
          <line
            x1="36"
            y1="58"
            x2="44"
            y2="22"
            stroke="var(--glow-cyan)"
            strokeWidth="1.5"
            opacity="0.18"
          />
        </motion.g>
      </motion.svg>

      {/* Top-right: Hexagon Grid */}
      <motion.svg
        viewBox="0 0 120 120"
        className="absolute right-[6%] top-[12%] h-20 w-20 md:h-28 md:w-28"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.2, duration: 1.2 }}
      >
        <defs>
          <filter id="glow-violet-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.g
          animate={{ y: [0, 10, 0], rotate: [0, -5, 5, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          filter="url(#glow-violet-soft)"
        >
          <polygon
            points="60,10 95,30 95,65 60,85 25,65 25,30"
            stroke="var(--glow-violet)"
            strokeWidth="1.2"
            fill="none"
            opacity="0.2"
          />
          <polygon
            points="60,25 80,37 80,58 60,70 40,58 40,37"
            stroke="var(--glow-violet)"
            strokeWidth="0.8"
            fill="none"
            opacity="0.12"
          />
          <circle cx="60" cy="48" r="3" fill="var(--glow-violet)" opacity="0.15" />
        </motion.g>
      </motion.svg>

      {/* Left-center: Circuit Node */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute left-[4%] top-[50%] h-16 w-16 md:h-24 md:w-24"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.0, duration: 1 }}
      >
        <defs>
          <filter id="glow-emerald-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.g
          animate={{ y: [0, -6, 0], x: [0, 3, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          filter="url(#glow-emerald-soft)"
        >
          {/* Circuit lines */}
          <line x1="50" y1="10" x2="50" y2="35" stroke="var(--glow-emerald)" strokeWidth="1" opacity="0.2" />
          <line x1="50" y1="65" x2="50" y2="90" stroke="var(--glow-emerald)" strokeWidth="1" opacity="0.2" />
          <line x1="10" y1="50" x2="35" y2="50" stroke="var(--glow-emerald)" strokeWidth="1" opacity="0.2" />
          <line x1="65" y1="50" x2="90" y2="50" stroke="var(--glow-emerald)" strokeWidth="1" opacity="0.2" />
          {/* Center node */}
          <circle cx="50" cy="50" r="12" stroke="var(--glow-emerald)" strokeWidth="1.2" fill="none" opacity="0.2" />
          <circle cx="50" cy="50" r="4" fill="var(--glow-emerald)" opacity="0.15" />
          {/* Endpoint dots */}
          <circle cx="50" cy="10" r="2" fill="var(--glow-emerald)" opacity="0.18" />
          <circle cx="50" cy="90" r="2" fill="var(--glow-emerald)" opacity="0.18" />
          <circle cx="10" cy="50" r="2" fill="var(--glow-emerald)" opacity="0.18" />
          <circle cx="90" cy="50" r="2" fill="var(--glow-emerald)" opacity="0.18" />
        </motion.g>
      </motion.svg>

      {/* Right-center: Abstract Diamond */}
      <motion.svg
        viewBox="0 0 80 80"
        className="absolute right-[5%] top-[55%] h-14 w-14 md:h-20 md:w-20"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.4, duration: 1 }}
      >
        <motion.g
          animate={{ y: [0, 7, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          filter="url(#glow-cyan-soft)"
        >
          <rect
            x="20"
            y="20"
            width="40"
            height="40"
            rx="4"
            transform="rotate(45 40 40)"
            stroke="var(--glow-cyan)"
            strokeWidth="1"
            fill="none"
            opacity="0.18"
          />
          <rect
            x="28"
            y="28"
            width="24"
            height="24"
            rx="2"
            transform="rotate(45 40 40)"
            stroke="var(--glow-violet)"
            strokeWidth="0.8"
            fill="none"
            opacity="0.12"
          />
          <circle cx="40" cy="40" r="2.5" fill="var(--glow-cyan)" opacity="0.15" />
        </motion.g>
      </motion.svg>

      {/* Bottom-left: Terminal Cursor Block */}
      <motion.svg
        viewBox="0 0 90 60"
        className="absolute bottom-[18%] left-[10%] h-12 w-18 md:h-16 md:w-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.6, duration: 1 }}
      >
        <motion.g
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          filter="url(#glow-violet-soft)"
        >
          <text
            x="10"
            y="22"
            fontFamily="monospace"
            fontSize="14"
            fill="var(--glow-violet)"
            opacity="0.2"
          >
            {"> _"}
          </text>
          <line x1="10" y1="35" x2="55" y2="35" stroke="var(--glow-violet)" strokeWidth="1" opacity="0.12" />
          <line x1="10" y1="45" x2="40" y2="45" stroke="var(--glow-violet)" strokeWidth="1" opacity="0.08" />
        </motion.g>
      </motion.svg>

      {/* Bottom-right: Atom / Orbital */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute bottom-[15%] right-[8%] h-16 w-16 md:h-24 md:w-24"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.8, duration: 1.2 }}
      >
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <ellipse
            cx="50"
            cy="50"
            rx="35"
            ry="14"
            stroke="var(--glow-cyan)"
            strokeWidth="0.8"
            fill="none"
            opacity="0.15"
          />
          <ellipse
            cx="50"
            cy="50"
            rx="35"
            ry="14"
            stroke="var(--glow-violet)"
            strokeWidth="0.8"
            fill="none"
            opacity="0.12"
            transform="rotate(60 50 50)"
          />
          <ellipse
            cx="50"
            cy="50"
            rx="35"
            ry="14"
            stroke="var(--glow-emerald)"
            strokeWidth="0.8"
            fill="none"
            opacity="0.12"
            transform="rotate(120 50 50)"
          />
        </motion.g>
        <circle cx="50" cy="50" r="3" fill="var(--glow-cyan)" opacity="0.2" />
      </motion.svg>

      {/* Top-center: Dotted Arc */}
      <motion.svg
        viewBox="0 0 120 40"
        className="absolute left-[35%] top-[6%] h-8 w-24 md:h-10 md:w-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <motion.g
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M10 30 Q60 -5 110 30"
            stroke="var(--glow-cyan)"
            strokeWidth="1"
            strokeDasharray="4 6"
            fill="none"
            opacity="0.15"
          />
          <circle cx="10" cy="30" r="2" fill="var(--glow-cyan)" opacity="0.2" />
          <circle cx="110" cy="30" r="2" fill="var(--glow-violet)" opacity="0.2" />
        </motion.g>
      </motion.svg>
    </div>
  );
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  // Role carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToContent = useCallback(() => {
    const el = document.getElementById("projects");
    el?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Aurora Background */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ scale: bgScale }}
      >
        <AuroraBackground />
      </motion.div>

      {/* Grid Overlay */}
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Radial Fade */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_0%,black_70%)]" />

      {/* Floating SVG Decorations */}
      <FloatingSVGs />

      {/* Main Content */}
      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-10 flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-2 backdrop-blur-xl"
        >
          <div className="relative h-2 w-2">
            <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
            <div className="relative h-full w-full rounded-full bg-emerald-400" />
          </div>
          <span className="text-[11px] font-medium tracking-wide text-white/60">
            Available for opportunities
          </span>
        </motion.div>

        {/* Name — Cinematic Typography */}
        <h1 className="flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-[clamp(3.5rem,12vw,10rem)] font-black leading-[0.85] tracking-[-0.04em] text-white"
          >
            {SITE_CONFIG.name}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-[clamp(3.5rem,12vw,10rem)] font-black leading-[0.85] tracking-[-0.04em]"
          >
            <span className="bg-gradient-to-r from-[var(--glow-cyan)] via-[#7dd3fc] to-[var(--glow-violet)] bg-clip-text text-transparent">
              {SITE_CONFIG.lastName}
            </span>
          </motion.span>
        </h1>

        {/* Role Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-8 flex items-center gap-3"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/20" />
          <div className="relative h-7 w-56 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ y: 24, opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -24, opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0 flex items-center justify-center text-sm font-medium tracking-wide text-white/50"
              >
                {ROLES[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/20" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-8 max-w-lg text-base leading-relaxed text-white/40 sm:text-lg"
        >
          Building{" "}
          <span className="text-white/70">high-performance systems</span> and{" "}
          <span className="text-white/70">premium digital experiences</span> that
          scale.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
        >
          <button
            onClick={scrollToContent}
            className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] active:scale-95"
          >
            <span>Explore My Work</span>
            <ChevronRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--glow-cyan)]/20 to-[var(--glow-violet)]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>

          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-8 py-3.5 text-sm font-medium text-white/70 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white active:scale-95"
          >
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4 fill-current"
              aria-hidden="true"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            GitHub
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-3"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5"
        >
          <motion.div className="h-1.5 w-1.5 rounded-full bg-white/60" />
        </motion.div>
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/30">
          Scroll
        </span>
      </motion.div>

      {/* Subtle Corner Accents */}
      <div className="pointer-events-none absolute left-8 top-8 z-10 hidden h-16 w-16 border-l border-t border-white/[0.06] md:block" />
      <div className="pointer-events-none absolute bottom-8 right-8 z-10 hidden h-16 w-16 border-b border-r border-white/[0.06] md:block" />
    </section>
  );
}

/* ─── Aurora Background ─── */
function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Primary aurora blobs */}
      <motion.div
        animate={{
          x: [0, 100, -50, 80, 0],
          y: [0, -80, 60, -40, 0],
          scale: [1, 1.2, 0.9, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute left-[10%] top-[20%] h-[60vh] w-[60vh] rounded-full opacity-[0.07]"
        style={{
          background:
            "radial-gradient(circle, var(--glow-cyan) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <motion.div
        animate={{
          x: [0, -120, 80, -60, 0],
          y: [0, 60, -100, 40, 0],
          scale: [1, 0.8, 1.3, 0.9, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute right-[10%] top-[30%] h-[50vh] w-[50vh] rounded-full opacity-[0.06]"
        style={{
          background:
            "radial-gradient(circle, var(--glow-violet) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <motion.div
        animate={{
          x: [0, 60, -80, 40, 0],
          y: [0, -40, 80, -60, 0],
          scale: [1, 1.1, 0.85, 1.15, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[15%] left-[30%] h-[45vh] w-[45vh] rounded-full opacity-[0.04]"
        style={{
          background:
            "radial-gradient(circle, var(--glow-emerald) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
    </div>
  );
}
