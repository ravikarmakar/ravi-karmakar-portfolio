"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Preloader } from "@/components/ui/preloader";
import { Navbar } from "@/components/navbar";
import { SOCIAL_LINKS, CERTIFICATIONS, getGoogleDriveDirectLink } from "@/lib/constants";

const LoadingContext = createContext({ isLoading: true });

export const useLoading = () => useContext(LoadingContext);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  // Avoid using window/document/portals before mount
  const showNavbar = !isLoading;

  return (
    <LoadingContext.Provider value={{ isLoading }}>
      {/* 
        Resource Warm-up (Headless):
        Satisfying browser preload checks for resources that are used immediately after loading.
        This prevents 'preloaded but not used' warnings during the 2.2s animation.
      */}
      <div className="sr-only opacity-0 pointer-events-none absolute h-0 w-0 overflow-hidden" aria-hidden="true" suppressHydrationWarning>
        {/* Warmup primary images to satisfy preloads */}
        <Image src={getGoogleDriveDirectLink(SOCIAL_LINKS.avatar)} alt="" fill unoptimized priority />
        {CERTIFICATIONS.map(cert => (
          <Image key={cert.id} src={getGoogleDriveDirectLink(cert.image || "")} alt="" fill unoptimized priority />
        ))}
        
        {/* Warmup fonts to satisfy font-preloads */}
        <span className="font-sans" style={{ fontWeight: 400 }}>Warmup Sans 400</span>
        <span className="font-sans" style={{ fontWeight: 700 }}>Warmup Sans 700</span>
        <span className="font-mono">Warmup Mono</span>
      </div>

      <div style={{ position: "relative" }}>
        <AnimatePresence mode="wait">
          {isLoading && <Preloader key="preloader" />}
        </AnimatePresence>
      </div>
      
      {/* Navbar reveals only after mount and loading to ensure zero hydration mismatch */}
      {showNavbar && <Navbar />}

      <motion.div
        id="main-content-wrapper"
        suppressHydrationWarning
        initial={false}
        animate={isLoading ? { opacity: 0, filter: "blur(20px)" } : { opacity: 1, filter: "blur(0px)" }}
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
        style={isLoading ? { position: "relative", height: "100vh", overflow: "hidden" } : { position: "relative", minHeight: "100vh" }}
      >
        {children}
      </motion.div>
    </LoadingContext.Provider>
  );
}

