"use client";

import { useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { SKILLS, SKILL_CATEGORIES, SOCIAL_LINKS, getGoogleDriveDirectLink } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";

const AVATAR_URL = getGoogleDriveDirectLink(SOCIAL_LINKS.avatar);

/* ─────────────────────────────────────────────────────────────────────────────
 *  ORGANIC TREE GRAPH — Skills Section
 *
 *  Structure:
 *    RK (root) ──► Category Nodes ──► Individual Skill Leaf Nodes
 *
 *  All positions are hand-tuned for an organic, asymmetric mind-map feel.
 *  Lines are curved SVG bezier paths that look like neural dendrites.
 * ───────────────────────────────────────────────────────────────────────── */

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "#00f0ff",
  Backend: "#a855f7",
  DevOps: "#10b981",
  Architecture: "#f59e0b",
};

// Root node position (percentage-based for responsiveness)
const ROOT = { x: 50, y: 50 };

// Category branch nodes — placed asymmetrically around the root
const CATEGORY_POSITIONS: Record<string, { x: number; y: number }> = {
  Frontend: { x: 75, y: 22 },
  Backend: { x: 78, y: 72 },
  DevOps: { x: 22, y: 25 },
  Architecture: { x: 25, y: 78 },
};

// Leaf node positions — organic, scattered, NOT in any pattern
// Each array maps 1:1 with the skills in that category from constants
const LEAF_POSITIONS: Record<string, { x: number; y: number }[]> = {
  Frontend: [
    { x: 88, y: 6 },   // Next.js
    { x: 95, y: 22 },   // React
    { x: 72, y: 4 },   // TypeScript
    { x: 62, y: 16 },   // Tailwind
    { x: 92, y: 38 },   // GSAP
    { x: 68, y: 34 },   // Framer Motion
  ],
  Backend: [
    { x: 93, y: 60 },   // Node.js
    { x: 88, y: 82 },   // PostgreSQL
    { x: 96, y: 74 },   // Redis
    { x: 72, y: 88 },   // Socket.io
    { x: 64, y: 72 },   // Prisma
    { x: 80, y: 94 },   // Express
  ],
  DevOps: [
    { x: 8, y: 10 },   // Docker
    { x: 6, y: 30 },   // Git
    { x: 22, y: 6 },   // Vercel
    { x: 36, y: 14 },   // Linux
    { x: 8, y: 48 },   // GitHub
    { x: 32, y: 40 },   // Nginx
  ],
  Architecture: [
    { x: 10, y: 66 },   // System Design
    { x: 12, y: 86 },   // Microservices
    { x: 6, y: 76 },   // MongoDB
    { x: 32, y: 92 },   // GraphQL
  ],
};

/* ── Curved SVG path generator (organic bezier) ── */
function makeCurvedPath(
  x1: number, y1: number,
  x2: number, y2: number,
  curvature = 0.3
): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  // Perpendicular offset for curve
  const dx = x2 - x1;
  const dy = y2 - y1;
  const nx = -dy * curvature;
  const ny = dx * curvature;
  return `M ${x1} ${y1} Q ${mx + nx} ${my + ny} ${x2} ${y2}`;
}

/* ─────────────────────────────────────────────────────────────────────────────
 *  MAIN SECTION
 * ───────────────────────────────────────────────────────────────────────── */

export function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 50, y: 50 });
  };

  // Build the tree data
  const treeData = useMemo(() => {
    const categories = SKILL_CATEGORIES.map((cat) => {
      const catSkills = SKILLS.filter((s) => s.category === cat);
      const leafPos = LEAF_POSITIONS[cat] || [];
      return {
        name: cat,
        color: CATEGORY_COLORS[cat],
        pos: CATEGORY_POSITIONS[cat],
        skills: catSkills.map((s, i) => ({
          ...s,
          pos: leafPos[i] || { x: 50, y: 50 },
        })),
      };
    });
    return categories;
  }, []);

  // Check if a category branch is "active" (highlighted)
  const isBranchActive = (cat: string) => {
    if (hoveredCategory === cat) return true;
    if (activeCategory === cat) return true;
    if (hoveredSkill) {
      const skill = SKILLS.find((s) => s.name === hoveredSkill);
      if (skill?.category === cat) return true;
    }
    return !hoveredCategory && !hoveredSkill && !activeCategory;
  };

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden" ref={sectionRef}>
      {/* Ambient Glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-[var(--glow-cyan)]/[0.02] blur-[200px]" />
        <div className="absolute right-[5%] top-[15%] h-[400px] w-[400px] rounded-full bg-[var(--glow-violet)]/[0.03] blur-[150px]" />
        <div className="absolute left-[5%] bottom-[15%] h-[400px] w-[400px] rounded-full bg-[var(--glow-emerald)]/[0.02] blur-[150px]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          title="Tech Arsenal"
          subtitle="The neural network of technologies I wield to build at scale."
        />

        {/* ── Category Filter Pills ── */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <motion.button
            onClick={() => setActiveCategory(null)}
            className={cn(
              "rounded-full border px-5 py-2 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300",
              !activeCategory
                ? "border-white/20 bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.06)]"
                : "border-white/[0.06] bg-transparent text-white/30 hover:border-white/15 hover:text-white/50"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All
          </motion.button>
          {SKILL_CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={cn(
                "rounded-full border px-5 py-2 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300",
                activeCategory === cat
                  ? "text-white shadow-lg"
                  : "border-white/[0.06] bg-transparent text-white/30 hover:border-white/15 hover:text-white/50"
              )}
              style={
                activeCategory === cat
                  ? {
                    borderColor: `${CATEGORY_COLORS[cat]}40`,
                    backgroundColor: `${CATEGORY_COLORS[cat]}15`,
                    boxShadow: `0 0 25px ${CATEGORY_COLORS[cat]}20`,
                  }
                  : undefined
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span
                className="mr-2 inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: CATEGORY_COLORS[cat] }}
              />
              {cat}
            </motion.button>
          ))}
        </div>

        {/* ── The Tree Graph ── */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative mx-auto mt-12 w-full"
          style={{ aspectRatio: "4 / 3" }}
        >

          {/* SVG layer — all connection lines */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ overflow: "visible" }}
          >
            <defs>
              {/* Gradient for each category */}
              {SKILL_CATEGORIES.map((cat) => (
                <linearGradient key={cat} id={`grad-${cat}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
                  <stop offset="100%" stopColor={`${CATEGORY_COLORS[cat]}60`} />
                </linearGradient>
              ))}
              {/* Glow filter */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="0.3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {isInView && treeData.map((cat) => {
              const active = isBranchActive(cat.name);
              const dimmed = (activeCategory && activeCategory !== cat.name);

              return (
                <g key={cat.name}>
                  {/* Root → Category line - FIXED */}
                  <motion.path
                    d={makeCurvedPath(ROOT.x, ROOT.y, cat.pos.x, cat.pos.y, 0.15)}
                    fill="none"
                    stroke={active ? CATEGORY_COLORS[cat.name] : "rgba(255,255,255,0.06)"}
                    strokeWidth={active ? 0.25 : 0.12}
                    filter={active ? "url(#glow)" : undefined}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: 1,
                      opacity: dimmed ? 0.08 : active ? 0.7 : 0.2,
                    }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                  />
                  {/* Category → Leaf lines */}
                  {cat.skills.map((skill, si) => {
                    const isThisHovered = hoveredSkill === skill.name;

                    // Calculate leaf displacement (Aggressive Snap)
                    const ldx = mousePos.x - skill.pos.x;
                    const ldy = mousePos.y - skill.pos.y;
                    const lDist = Math.sqrt(ldx * ldx + ldy * ldy);
                    // Extremely high pull factor for "too much move" snap
                    const lPull = isThisHovered ? 0.92 : Math.max(0, 1 - lDist / 22) * 0.85;
                    const skillDisp = {
                      x: skill.pos.x + ldx * lPull,
                      y: skill.pos.y + ldy * lPull
                    };

                    return (
                      <motion.path
                        key={skill.name}
                        d={makeCurvedPath(
                          cat.pos.x, cat.pos.y, // Start from fixed category node
                          skillDisp.x, skillDisp.y, // End at displaced skill icon
                          (si % 2 === 0 ? 0.2 : -0.2)
                        )}
                        fill="none"
                        stroke={
                          isThisHovered
                            ? skill.color
                            : active
                              ? `${CATEGORY_COLORS[cat.name]}40`
                              : "rgba(255,255,255,0.03)"
                        }
                        strokeWidth={isThisHovered ? 0.2 : 0.08}
                        filter={isThisHovered ? "url(#glow)" : undefined}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                          pathLength: 1,
                          opacity: dimmed ? 0.05 : isThisHovered ? 0.9 : active ? 0.3 : 0.1,
                        }}
                        transition={{ duration: 0.8, delay: 0.5 + si * 0.08 }}
                      />
                    );
                  })}
                </g>
              );
            })}
          </svg>

          {/* ── Root Node (YOU) ── */}
          <motion.div
            className="absolute z-30"
            style={{ left: `${ROOT.x}%`, top: `${ROOT.y}%`, transform: "translate(-50%, -50%)" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 30px rgba(0,240,255,0.12), 0 0 60px rgba(168,85,247,0.06)",
                  "0 0 50px rgba(0,240,255,0.2), 0 0 100px rgba(168,85,247,0.12)",
                  "0 0 30px rgba(0,240,255,0.12), 0 0 60px rgba(168,85,247,0.06)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-16 w-16 md:h-20 md:w-20 overflow-hidden rounded-full border-2 border-white/20 bg-black/50 backdrop-blur-2xl"
            >
              <Image
                src={AVATAR_URL}
                alt="Ravi Karmakar"
                fill
                sizes="(max-width: 768px) 64px, 80px"
                className="object-cover"
                draggable={false}
                unoptimized
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent" />
            </motion.div>
            {/* Pulse rings from root */}
            {[1, 2].map((r) => (
              <motion.div
                key={r}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]"
                style={{ width: 50 + r * 30, height: 50 + r * 30 }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 3 + r, repeat: Infinity, delay: r * 0.7 }}
              />
            ))}
          </motion.div>

          {/* ── Category Nodes ── */}
          {treeData.map((cat, ci) => {
            const active = isBranchActive(cat.name);
            const dimmed = (activeCategory && activeCategory !== cat.name);

            return (
              <motion.div
                key={cat.name}
                className="absolute z-20"
                style={{
                  left: `${cat.pos.x}%`,
                  top: `${cat.pos.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: dimmed ? 0.2 : 1 } : {}}
                transition={{ type: "spring", stiffness: 180, damping: 18, delay: 0.3 + ci * 0.1 }}
                onMouseEnter={() => setHoveredCategory(cat.name)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <motion.div
                  className={cn(
                    "flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl border backdrop-blur-xl cursor-pointer transition-all duration-500",
                    active
                      ? "border-white/15 bg-white/[0.06]"
                      : "border-white/[0.04] bg-white/[0.02]"
                  )}
                  whileHover={{ scale: 1.15 }}
                  style={
                    active
                      ? { boxShadow: `0 0 25px ${cat.color}25` }
                      : undefined
                  }
                >
                  <span
                    className="text-[10px] md:text-xs font-black uppercase tracking-wider"
                    style={{ color: active ? cat.color : "rgba(255,255,255,0.25)" }}
                  >
                    {cat.name.slice(0, 2)}
                  </span>
                </motion.div>
                {/* Category label */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] transition-opacity duration-500"
                  style={{
                    top: "calc(100% + 6px)",
                    color: active ? cat.color : "rgba(255,255,255,0.15)",
                    opacity: dimmed ? 0.15 : 1,
                  }}
                >
                  {cat.name}
                </motion.div>
              </motion.div>
            );
          })}

          {/* ── Skill Leaf Nodes ── */}
          {treeData.map((cat, ci) => {
            const dimmed = (activeCategory && activeCategory !== cat.name);
            return cat.skills.map((skill, si) => {
              const isHovered = hoveredSkill === skill.name;
              const branchActive = isBranchActive(cat.name);

              // Calculate leaf displacement (Aggressive snap factors)
              const dx = mousePos.x - skill.pos.x;
              const dy = mousePos.y - skill.pos.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const pull = isHovered ? 0.92 : Math.max(0, 1 - dist / 22) * 0.85;
              const dispX = dx * pull;
              const dispY = dy * pull;

              return (
                <motion.div
                  key={skill.name}
                  className="absolute z-20"
                  style={{
                    left: `${skill.pos.x}%`,
                    top: `${skill.pos.y}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: isInView ? (isHovered ? 1.25 : dimmed ? 0.6 : 1) : 0,
                    opacity: isInView ? (dimmed ? 0.12 : 1) : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 160,
                    damping: 18,
                    delay: isInView ? 0.6 + ci * 0.12 + si * 0.06 : 0,
                  }}
                >
                  <motion.div
                    className="relative"
                    animate={{
                      x: `calc(-50% + ${dispX}%)`,
                      y: `calc(-50% + ${dispY}%)`,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div
                      className={cn(
                        "group relative flex h-11 w-11 md:h-13 md:w-13 cursor-pointer items-center justify-center rounded-xl border transition-all duration-500",
                        isHovered
                          ? "border-white/20 bg-white/[0.08] backdrop-blur-xl shadow-2xl"
                          : branchActive
                            ? "border-white/[0.06] bg-white/[0.03] backdrop-blur-md"
                            : "border-transparent bg-transparent"
                      )}
                      style={
                        isHovered
                          ? { boxShadow: `0 0 30px ${skill.color}30, 0 0 60px ${skill.color}10` }
                          : undefined
                      }
                    >
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={24}
                        height={24}
                        unoptimized
                        className={cn(
                          "h-5 w-5 md:h-6 md:w-6 transition-all duration-500 select-none",
                          isHovered
                            ? "brightness-125"
                            : branchActive
                              ? "brightness-90 grayscale-[20%]"
                              : "brightness-50 grayscale"
                        )}
                        style={
                          isHovered
                            ? { filter: `brightness(1.3) drop-shadow(0 0 6px ${skill.color}80)` }
                            : undefined
                        }
                        draggable={false}
                      />

                      {/* Tooltip */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 6, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 4, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute -bottom-9 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap rounded-lg border border-white/10 bg-black/90 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur-xl"
                            style={{ boxShadow: `0 4px 20px ${skill.color}20` }}
                          >
                            {skill.name}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </motion.div>
              );
            });
          })}
        </div>

        {/* ── Skill Count Bar ── */}
        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-6 md:gap-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          {SKILL_CATEGORIES.map((cat) => {
            const count = SKILLS.filter((s) => s.category === cat).length;
            return (
              <div key={cat} className="flex items-center gap-3">
                <div
                  className="h-8 w-[2px] rounded-full"
                  style={{
                    background: `linear-gradient(to bottom, ${CATEGORY_COLORS[cat]}, transparent)`,
                  }}
                />
                <div>
                  <div className="text-lg font-black tabular-nums" style={{ color: CATEGORY_COLORS[cat] }}>
                    {count}+
                  </div>
                  <div className="text-[10px] font-medium uppercase tracking-widest text-white/30">
                    {cat}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
