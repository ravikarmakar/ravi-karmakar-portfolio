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
import { EDUCATION, PREMIUM_TRANSITION } from "@/lib/constants";
import { GraduationCapIcon, CodeIcon } from "lucide-react";

const iconMap = {
  graduation: GraduationCapIcon,
  code: CodeIcon,
};

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
          {EDUCATION.map((item, i) => {
            const IconComp = iconMap[item.icon as keyof typeof iconMap];
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
                  ...PREMIUM_TRANSITION,
                  delay: i * 0.2,
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
