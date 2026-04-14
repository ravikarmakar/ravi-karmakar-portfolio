"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Preloader } from "@/components/ui/preloader";
import { Navbar } from "@/components/navbar";
import { SOCIAL_LINKS } from "@/lib/constants";

const LoadingContext = createContext({ isLoading: true });

export const useLoading = () => useContext(LoadingContext);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  // Avoid using window/document/portals before mount
  const showNavbar = isMounted && !isLoading;

  return (
    <LoadingContext.Provider value={{ isLoading }}>
      {/* 
        Resource Warm-up (Headless):
        Satisfying browser preload checks for resources that are used immediately after loading.
        This prevents 'preloaded but not used' warnings during the 2.2s animation.
      */}
      <div className="sr-only opacity-0 pointer-events-none absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <img src={SOCIAL_LINKS.avatar} alt="" />
        <span className="font-sans">Warmup Sans</span>
        <span className="font-mono">Warmup Mono</span>
      </div>

      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>
      
      {/* Navbar reveals only after mount and loading to ensure zero hydration mismatch */}
      {showNavbar && <Navbar />}

      <motion.div
        id="main-content-wrapper"
        initial={false}
        animate={!isMounted || isLoading ? { opacity: 0, filter: "blur(20px)" } : { opacity: 1, filter: "blur(0px)" }}
        transition={{
          duration: 1.2,
          ease: [0.85, 0, 0.15, 1],
          delay: 0.2,
        }}
        onAnimationComplete={() => {
          if (typeof document !== "undefined") {
            const el = document.getElementById("main-content-wrapper");
            if (el) el.style.filter = "none";
          }
        }}
        style={(!isMounted || isLoading) ? { height: "100vh", overflow: "hidden" } : { minHeight: "100vh" }}
      >
        {children}
      </motion.div>
    </LoadingContext.Provider>
  );
}

