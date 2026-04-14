"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";

import { SKILL_GROUPS, PREMIUM_TRANSITION } from "@/lib/constants";

export function SkillsSection() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-[var(--glow-emerald)]/[0.02] blur-[120px]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          title="Skills & Stack"
          subtitle="The 2026 toolkit I use to ship fast and build for scale."
        />

        <div ref={ref} className="relative space-y-10">
          {SKILL_GROUPS.map((group, groupIdx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                ...PREMIUM_TRANSITION,
                delay: groupIdx * 0.15,
              }}
            >
              <div className="mb-4 flex items-center gap-3">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: group.color }}
                />
                <h3 className="text-sm font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                  {group.category}
                </h3>
                <div className="h-px flex-1 bg-white/5" />
              </div>

              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                    animate={
                      isInView
                        ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                        : { opacity: 0, scale: 0.8, filter: "blur(4px)" }
                    }
                    transition={{
                      duration: 0.4,
                      delay: groupIdx * 0.15 + skillIdx * 0.05,
                      ease: "easeOut",
                    }}
                  >
                    <Badge
                      variant="outline"
                      className="cursor-default border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-2 text-sm text-white/80 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:text-white hover:shadow-[0_0_20px_rgba(0,240,255,0.08)]"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
