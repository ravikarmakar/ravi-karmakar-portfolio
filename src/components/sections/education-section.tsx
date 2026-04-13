"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { GraduationCapIcon, CodeIcon } from "lucide-react";

const education = [
  {
    degree: "Bachelor of Science in Physics",
    institution: "University Program",
    period: "2020 — 2023",
    description:
      "Built a strong analytical foundation in mathematical modeling, computational physics, and scientific problem-solving that translates directly into software architecture and system design thinking.",
    icon: GraduationCapIcon,
  },
  {
    degree: "Advanced Full-Stack Specialization & System Design",
    institution: "Brindavan Group of Institutes",
    period: "2024 — Present",
    description:
      "Deep-diving into distributed systems, microservices architecture, real-time data pipelines, and advanced frontend engineering with Next.js, TypeScript, and cloud-native tooling.",
    icon: CodeIcon,
  },
];

export function EducationSection() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="education" className="relative py-24 md:py-32">
      {/* Subtle bg gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[var(--glow-violet)]/[0.03] blur-[120px]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          title="Education"
          subtitle="The academic foundation powering my engineering mindset."
        />

        <motion.div
          ref={ref}
          className="relative grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {education.map((item, i) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={item.degree}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: 40, filter: "blur(8px)" }
                }
                transition={{
                  duration: 0.7,
                  delay: i * 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <Card className="group h-full border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-none backdrop-blur-xl transition-all duration-500 hover:border-[var(--glow-cyan)]/20 hover:shadow-[0_0_40px_rgba(0,240,255,0.06)]">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--glow-violet)]/20 to-[var(--glow-cyan)]/10 text-[var(--glow-violet)] border border-white/10 mb-2">
                      <IconComp className="h-6 w-6" />
                    </div>
                    <div className="text-xs text-[var(--glow-cyan)]/70 font-medium">
                      {item.period}
                    </div>
                    <CardTitle className="text-lg text-white leading-snug">
                      {item.degree}
                    </CardTitle>
                    <CardDescription className="text-[var(--text-muted)]">
                      {item.institution}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
