"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";

const skillGroups = [
  {
    category: "Frontend",
    color: "var(--glow-cyan)",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion"],
  },
  {
    category: "Backend",
    color: "var(--glow-violet)",
    skills: ["Node.js", "PostgreSQL", "Redis", "Socket.io", "Prisma", "REST APIs"],
  },
  {
    category: "DevOps & Tools",
    color: "var(--glow-emerald)",
    skills: ["Docker", "Git", "Vercel", "Linux", "CI/CD", "Nginx"],
  },
  {
    category: "Architecture",
    color: "#f59e0b",
    skills: [
      "System Design",
      "Microservices",
      "Database Design",
      "API Design",
      "Caching Strategies",
      "Real-Time Systems",
    ],
  },
];

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
          {skillGroups.map((group, groupIdx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                delay: groupIdx * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
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
