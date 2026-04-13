"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    role: "Full-Stack Developer Intern",
    company: "TechFlow Systems",
    duration: "6 Months",
    period: "2025 — 2026",
    description:
      "Optimized Next.js performance pipelines and integrated real-time Socket.io features for collaboration tools serving 10k+ daily active users. Reduced SSR load times by 40% through strategic code-splitting and edge caching.",
    tags: ["Next.js", "Socket.io", "TypeScript", "Redis", "Performance"],
    side: "left" as const,
  },
  {
    role: "Freelance Lead",
    company: "Krmsolutions",
    duration: "Ongoing",
    period: "2024 — Present",
    description:
      "Delivering end-to-end web builds for architectural firms and e-commerce clients. Architected scalable solutions with optimized database indexing, custom CMS integrations, and high-end motion design that elevated client conversion rates by 60%.",
    tags: ["React", "Node.js", "PostgreSQL", "GSAP", "System Design"],
    side: "right" as const,
  },
];

function TimelineItem({
  experience,
  index,
}: {
  experience: (typeof experiences)[0];
  index: number;
}) {
  const { ref, isInView } = useScrollReveal({ threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x: experience.side === "left" ? -60 : 60,
        filter: "blur(8px)",
      }}
      animate={
        isInView
          ? { opacity: 1, x: 0, filter: "blur(0px)" }
          : {
              opacity: 0,
              x: experience.side === "left" ? -60 : 60,
              filter: "blur(8px)",
            }
      }
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`relative flex w-full ${
        experience.side === "right" ? "md:justify-end" : "md:justify-start"
      }`}
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-6 z-10 hidden md:left-1/2 md:-translate-x-1/2 md:block">
        <div className="relative h-3 w-3">
          <div className="absolute inset-0 animate-ping rounded-full bg-[var(--glow-cyan)]/50" />
          <div className="relative h-3 w-3 rounded-full border-2 border-[var(--glow-cyan)] bg-black" />
        </div>
      </div>

      <div className="w-full rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6 backdrop-blur-md transition-all duration-500 hover:border-[var(--glow-cyan)]/20 hover:shadow-[0_0_40px_rgba(0,240,255,0.06)] md:w-[45%]">
        <div className="mb-1 flex items-center gap-3 text-xs text-[var(--text-muted)]">
          <span>{experience.period}</span>
          <span className="h-px flex-1 bg-white/10" />
          <Badge
            variant="outline"
            className="border-[var(--glow-cyan)]/20 bg-[var(--glow-cyan)]/5 text-[var(--glow-cyan)] text-[10px]"
          >
            {experience.duration}
          </Badge>
        </div>
        <h3 className="mt-3 text-lg font-semibold text-white">
          {experience.role}
        </h3>
        <p className="text-sm font-medium text-[var(--glow-cyan)]/80">
          @ {experience.company}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
          {experience.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {experience.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-white/5 text-[var(--text-muted)] border-white/5 text-[11px]"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          title="Experience"
          subtitle="Where I've honed my craft and shipped real products."
        />

        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-0 top-0 hidden h-full w-px md:left-1/2 md:-translate-x-1/2 md:block">
            <div className="timeline-line h-full w-px opacity-30" />
          </div>

          <div className="flex flex-col gap-12">
            {experiences.map((exp, i) => (
              <TimelineItem key={exp.company} experience={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
