"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ChevronDown, Download } from "lucide-react";

const titleLine1 = ["Ravi", "Karmakar"];
const titleLine2 = ["Full-Stack", "Developer", "&"];
const titleLine3 = ["System", "Architect."];

export function HeroSection() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    // Simulate slight delay for luxury UX
    await new Promise((resolve) => setTimeout(resolve, 1200));
    
    // Trigger download in current tab (Google drive provides attachment headers)
    const link = document.createElement("a");
    link.href = "https://drive.google.com/uc?export=download&id=1s6AnGptI9whtdbbo-EA6yjAw80JaC3fy";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsDownloading(false);
  };

  let wordIndex = 0;

  const renderWord = (word: string, isName: boolean) => {
    const i = wordIndex++;
    return (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          duration: 0.6,
          delay: 0.4 + i * 0.08,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className={
          isName
            ? "bg-gradient-to-r from-[var(--glow-cyan)] to-[var(--glow-violet)] bg-clip-text text-transparent"
            : "text-white"
        }
      >
        {word}{" "}
      </motion.span>
    );
  };

  return (
    <section
      id="hero"
      className="mesh-gradient relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Floating Orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float absolute left-[10%] top-[20%] h-72 w-72 rounded-full bg-[var(--glow-cyan)]/[0.04] blur-[100px]" />
        <div className="animate-float-delayed absolute right-[15%] top-[30%] h-96 w-96 rounded-full bg-[var(--glow-violet)]/[0.05] blur-[120px]" />
        <div className="animate-float-slow absolute bottom-[20%] left-[30%] h-64 w-64 rounded-full bg-[var(--glow-emerald)]/[0.03] blur-[80px]" />
      </div>

      {/* Grid Lines Decoration */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-[var(--text-muted)] backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--glow-emerald)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--glow-emerald)]" />
          </span>
          Available for opportunities
        </motion.div>

        {/* Title — Staggered word reveal with proper spacing */}
        <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block">
            {titleLine1.map((w) => renderWord(w, true))}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-white"
            >
              {" "}—{" "}
            </motion.span>
          </span>
          <span className="block">
            {titleLine2.map((w) => renderWord(w, false))}
          </span>
          <span className="block">
            {titleLine3.map((w) => renderWord(w, false))}
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mx-auto mb-10 max-w-2xl text-base text-[var(--text-muted)] sm:text-lg md:text-xl"
        >
          Building high-concurrency digital infrastructure and{" "}
          <span className="font-medium text-white">premium web experiences</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton
            onClick={() =>
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
            }
            aria-label="View Projects"
            className="!bg-gradient-to-r !from-[var(--glow-cyan)]/20 !to-[var(--glow-violet)]/20 !border-[var(--glow-cyan)]/30"
          >
            <ChevronDown className="h-4 w-4" />
            View Projects
          </MagneticButton>

          <MagneticButton 
            onClick={handleDownload} 
            aria-label="Download CV"
            className={isDownloading ? "!border-[var(--glow-cyan)]/50 !bg-white/10 !shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all duration-300" : ""}
          >
            {isDownloading ? (
              <svg className="h-4 w-4 animate-spin text-[var(--glow-cyan)]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <Download className="h-4 w-4" />
            )}
            Download CV
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5"
        >
          <div className="h-1.5 w-1 rounded-full bg-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
