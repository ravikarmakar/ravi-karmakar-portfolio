"use client";

import { useState, useEffect, useRef, memo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUp,
  FileText,
  Download
} from "lucide-react";
import { NexusIcon } from "@/components/ui/nexus-icon";
import { SOCIAL_LINKS, SITE_CONFIG } from "@/lib/constants";

// --- Sub-components ---

const SystemMonitor = memo(function SystemMonitor() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit"
      }));
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full border-t border-white/5 bg-black/50 py-4 px-6">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-[9px] uppercase tracking-[0.3em] font-mono text-[var(--text-muted)]">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-[var(--glow-cyan)]" />
            <span className="text-white">Status: Online</span>
          </div>
          <span className="hidden sm:block">Nexus Engine v15</span>
        </div>
        <div className="flex items-center gap-6">
          <span>{time} IST</span>
          <span className="text-white">India</span>
        </div>
      </div>
    </div>
  );
});

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <footer
      ref={footerRef}
      className="relative mt-20 overflow-hidden bg-black border-t border-white/5"
    >
      {/* Subtle Background Text */}
      <motion.div
        style={{ y: textY }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03]"
      >
        <span className="text-[25vw] font-black uppercase tracking-tighter select-none">
          RAVI
        </span>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="mb-4 text-xl font-bold tracking-tighter text-white uppercase">Nexus Core</h3>
            <p className="max-w-xs text-sm leading-relaxed text-[var(--text-muted)]">
              Surgical precision in digital infrastructure.
              Building the next generation of web experience.
            </p>

            <div className="mt-8 flex items-center gap-4">
              {[
                { name: "github" as const, href: SOCIAL_LINKS.github },
                { name: "linkedin" as const, href: SOCIAL_LINKS.linkedin },
                { name: "mail" as const, href: `mailto:${SOCIAL_LINKS.email}` },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-muted)] transition-colors hover:text-white"
                >
                  <NexusIcon name={item.name} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4 text-sm text-[var(--text-muted)]">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white">Direct</h4>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            <div className="mt-2 flex flex-col gap-2">
              <a
                href={`https://drive.google.com/file/d/${SITE_CONFIG.cvDriveId}/view`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[var(--glow-cyan)]/80 hover:text-[var(--glow-cyan)] transition-colors"
              >
                <FileText size={14} />
                <span>View Resume</span>
              </a>
              <a
                href={`https://drive.google.com/uc?export=download&id=${SITE_CONFIG.cvDriveId}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Download size={14} />
                <span>Download PDF</span>
              </a>
            </div>
          </div>

          {/* Action */}
          <div className="flex flex-col items-start lg:items-end">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-70"
            >
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>
            <span className="mt-6 text-[9px] uppercase tracking-[0.4em] text-white/20">
              Nominal // 2026
            </span>
          </div>
        </div>
      </div>

      <SystemMonitor />
    </footer>
  );
}
