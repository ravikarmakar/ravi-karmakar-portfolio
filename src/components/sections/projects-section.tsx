"use client";

import { useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { PROJECTS, type Project } from "@/lib/constants";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  return (
    <section
      id="projects"
      className="relative py-24 md:py-32 overflow-hidden"
      ref={sectionRef}
    >
      {/* Ambient Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-20%] top-[10%] h-[800px] w-[800px] rounded-full bg-[var(--glow-violet)]/[0.03] blur-[200px]" />
        <div className="absolute left-[-15%] bottom-[10%] h-[600px] w-[600px] rounded-full bg-[var(--glow-cyan)]/[0.04] blur-[180px]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          title="Selected Projects"
          subtitle="Building scalable systems with clean architecture."
        />

        {/* Project Cards */}
        <div className="mt-8 flex flex-col gap-8 md:gap-10">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 80, scale: 0.95 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 80, scale: 0.95 }
              }
              transition={{
                duration: 0.9,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <HolographicCard project={project} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 *  THE HOLOGRAPHIC CARD
 *  - 3D perspective tilt following mouse
 *  - Spotlight radial gradient tracking cursor
 *  - Inner image parallax (moves opposite to tilt)
 *  - Animated glowing border
 *  - Cinematic reveal
 * ───────────────────────────────────────────────────────────────────────── */

function HolographicCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Raw mouse position relative to card center
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring-smoothed rotation
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 30,
  });

  // Image parallax (opposite direction, subtle)
  const imgX = useSpring(useTransform(mouseX, [-0.5, 0.5], [15, -15]), {
    stiffness: 150,
    damping: 25,
  });
  const imgY = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 150,
    damping: 25,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();

      // Normalized -0.5 to 0.5
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  // Determine layout direction
  const isReversed = index % 2 === 1;

  return (
    <div style={{ perspective: "1200px" }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {/* ── Main Card Body ── */}
        <div
          className={cn(
            "relative z-10 flex flex-col overflow-hidden rounded-[1.2rem] border border-white/[0.1] bg-white/[0.02] backdrop-blur-xl shadow-2xl",
            "md:flex-row md:min-h-[420px]",
            isReversed && "md:flex-row-reverse"
          )}
        >
          {/* ── Image Side ── */}
          <div className="relative h-[280px] w-full overflow-hidden md:h-auto md:min-h-[380px] md:w-[55%] md:self-stretch">
            <motion.div
              style={{
                x: imgX,
                y: imgY,
                scale: isHovered ? 1.08 : 1,
              }}
              transition={{ scale: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
              className="absolute inset-0"
            >
              <Image
                src={project.image}
                alt={project.name}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className={cn(
                  "object-cover transition-all duration-700",
                  isHovered ? "grayscale-0" : "grayscale-[60%]"
                )}
              />
            </motion.div>

            {/* Image Overlay */}
            <div
              className={cn(
                "absolute inset-0 transition-opacity duration-700",
                isHovered ? "opacity-30" : "opacity-60"
              )}
              style={{
                background: isReversed
                  ? "linear-gradient(to left, rgba(6,6,6,0.8), transparent 50%)"
                  : "linear-gradient(to right, rgba(6,6,6,0.8), transparent 50%)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,6,6,0.8)] via-transparent to-transparent md:bg-none" />

            {/* Project Number Watermark */}
            <div
              className={cn(
                "absolute bottom-4 font-black text-[9rem] leading-none tracking-tighter transition-all duration-700 select-none pointer-events-none",
                isReversed ? "right-4 md:left-6" : "left-4 md:left-6",
                isHovered 
                  ? "text-white/[0.15] translate-y-[-10px] blur-[1px] opacity-100" 
                  : "text-white/[0.05] blur-[2px] opacity-60"
              )}
              style={{ 
                transform: "translateZ(50px)",
                textShadow: isHovered ? "0 0 40px rgba(255,255,255,0.1)" : "none"
              }}
            >
              0{index + 1}
            </div>
          </div>

          {/* ── Content Side ── */}
          <div className="relative flex flex-1 flex-col justify-center p-8 md:p-12">
            {/* Featured Badge */}
            {project.featured && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-5"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--glow-cyan)]/20 bg-[var(--glow-cyan)]/[0.05] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--glow-cyan)]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--glow-cyan)] opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--glow-cyan)]" />
                  </span>
                  Featured
                </span>
              </motion.div>
            )}

            {/* Title */}
            <h3
              className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl"
              style={{ transform: "translateZ(30px)" }}
            >
              {project.name}
            </h3>

            {/* Description */}
            <p
              className="mt-4 max-w-md text-sm leading-relaxed text-white/40 md:text-base"
              style={{ transform: "translateZ(20px)" }}
            >
              {project.description}
            </p>

            {/* Tags */}
            <div
              className="mt-6 flex flex-wrap gap-2"
              style={{ transform: "translateZ(25px)" }}
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    "rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider transition-all duration-500",
                    isHovered
                      ? "border-white/15 bg-white/[0.06] text-white/70"
                      : "border-white/[0.06] bg-white/[0.02] text-white/30"
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div
              className="mt-8 flex items-center gap-4"
              style={{ transform: "translateZ(35px)" }}
            >
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center justify-center rounded-full border px-6 py-2.5 text-xs font-semibold transition-all duration-300",
                  isHovered
                    ? "border-white/20 bg-white/5 text-white hover:bg-white/10"
                    : "border-white/[0.06] bg-transparent text-white/40"
                )}
              >
                Code
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center justify-center rounded-full px-6 py-2.5 text-xs font-semibold transition-all duration-300",
                  isHovered
                    ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-105"
                    : "bg-white/5 text-white/40"
                )}
              >
                Launch
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


