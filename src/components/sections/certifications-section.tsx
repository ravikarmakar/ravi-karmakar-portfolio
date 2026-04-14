"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Marquee } from "@/components/ui/marquee";
import { MovieReelCard } from "@/components/ui/movie-reel-card";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CERTIFICATIONS } from "@/lib/constants";

export function CertificationsSection() {
  const { ref, isInView } = useScrollReveal({ threshold: 0.05 });
  const [selectedCert, setSelectedCert] = useState<{ cert: typeof CERTIFICATIONS[number], instanceId: string } | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedCert]);

  const navigateGallery = useCallback((direction: number) => {
    if (!selectedCert) return;
    const currentIndex = CERTIFICATIONS.findIndex(c => c.id === selectedCert.cert.id);
    const nextIndex = (currentIndex + direction + CERTIFICATIONS.length) % CERTIFICATIONS.length;
    
    setSelectedCert({ 
      cert: CERTIFICATIONS[nextIndex], 
      instanceId: `nav-${CERTIFICATIONS[nextIndex].id}` 
    });
  }, [selectedCert]);

  // Close modal when clicking escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCert(null);
      if (e.key === "ArrowRight") navigateGallery(1);
      if (e.key === "ArrowLeft") navigateGallery(-1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCert, navigateGallery]);

  return (
    <LayoutGroup id="cert-reel">
      <section
        id="certifications"
        ref={ref}
        className="relative py-10 md:py-20 overflow-hidden"
      >
        {/* Subtle theme-consistent background accents */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-full max-w-4xl rounded-full bg-[var(--glow-cyan)]/[0.03] blur-[130px]" />
          <div className="absolute right-0 bottom-0 h-[300px] w-[300px] rounded-full bg-[var(--glow-violet)]/[0.02] blur-[100px]" />
        </div>

        <div className="mx-auto w-full max-w-7xl px-6 relative z-10 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <SectionHeading
              title="The Reel of Expertise"
              subtitle="A cinematic look at validated credentials and architectural mastery."
            />
          </motion.div>
        </div>

        {/* The Movie Reel Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 1 }}
          className="w-full py-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative z-10"
        >
          < Marquee 
            pauseOnHover 
            pause={!!selectedCert} 
            className="[--duration:50s]" 
            repeat={4}
          >
            {useCallback((repeatIndex: number) => (
              <>
                {CERTIFICATIONS.map((cert) => {
                  const instanceId = `${cert.id}-${repeatIndex}`;
                  return (
                    <div key={instanceId} className="px-4">
                      <MovieReelCard
                        cert={cert}
                        layoutIdPrefix={instanceId}
                        onClick={() => setSelectedCert({ cert, instanceId })}
                      />
                    </div>
                  );
                })}
              </>
            ), [])}
          </Marquee>
          
          {/* Edge Fades for Cinematic Look */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/12 md:w-1/6 bg-gradient-to-r from-black via-black/50 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/12 md:w-1/6 bg-gradient-to-l from-black via-black/50 to-transparent z-20" />
        </motion.div>

        {/* Cinematic Full Screen Modal safely Portaled to body */}
        {isMounted && createPortal(
          <AnimatePresence>
            {selectedCert && (
              <div className="fixed inset-0 z-[11000] flex items-center justify-center pointer-events-auto">
                {/* Dark Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedCert(null)}
                  className="absolute inset-0 bg-black/90 backdrop-blur-md"
                />

                {/* The Expanded Frame */}
              <div className="relative z-10 flex items-center justify-center w-full px-4 md:px-20">
                
                {/* Close Button - Outside Top Right */}
                <motion.button 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setSelectedCert(null)}
                  className="fixed top-8 right-8 z-[11002] flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <X size={24} />
                </motion.button>

                {/* Desktop Navigation - Side Arrows */}
                <div className="hidden md:block">
                  <motion.button 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={(e) => { e.stopPropagation(); navigateGallery(-1); }}
                    className="absolute left-8 top-1/2 -translate-y-1/2 z-[11001] flex items-center justify-center w-16 h-16 rounded-full bg-white/5 text-white backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all hover:scale-110 active:scale-95 cursor-pointer"
                  >
                    <ChevronLeft size={32} />
                  </motion.button>

                  <motion.button 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={(e) => { e.stopPropagation(); navigateGallery(1); }}
                    className="absolute right-8 top-1/2 -translate-y-1/2 z-[11001] flex items-center justify-center w-16 h-16 rounded-full bg-white/5 text-white backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all hover:scale-110 active:scale-95 cursor-pointer"
                  >
                    <ChevronRight size={32} />
                  </motion.button>
                </div>

                {/* Mobile Navigation - Bottom Tray */}
                <div className="md:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-[11001] flex items-center gap-6">
                  <motion.button 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={(e) => { e.stopPropagation(); navigateGallery(-1); }}
                    className="flex items-center justify-center w-14 h-14 rounded-full bg-white/10 text-white backdrop-blur-md border border-white/10 active:scale-90"
                  >
                    <ChevronLeft size={28} />
                  </motion.button>

                  <motion.button 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={(e) => { e.stopPropagation(); navigateGallery(1); }}
                    className="flex items-center justify-center w-14 h-14 rounded-full bg-white/10 text-white backdrop-blur-md border border-white/10 active:scale-90"
                  >
                    <ChevronRight size={28} />
                  </motion.button>
                </div>

                {/* The layoutId connected Card with Smooth Gallery Switching */}
                <div className="relative flex-1 flex items-center justify-center h-full">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={selectedCert.cert.id}
                      initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full flex items-center justify-center"
                    >
                      <MovieReelCard
                        cert={selectedCert.cert}
                        layoutIdPrefix={selectedCert.instanceId}
                        isExpanded
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
      </section>
    </LayoutGroup>
  );
}
