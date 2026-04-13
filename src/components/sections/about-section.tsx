"use client";

import { motion } from "framer-motion";
import { PixelImage } from "@/components/ui/pixel-image";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const stats = [
  { label: "Years Experience", value: "3+" },
  { label: "Projects Delivered", value: "20+" },
  { label: "Technologies", value: "15+" },
  { label: "Client Satisfaction", value: "100%" },
];

export function AboutSection() {
  const { ref, isInView } = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="about" className="relative py-24 md:py-32">
      {/* Subtle bg accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-[var(--glow-cyan)]/[0.02] blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-[var(--glow-violet)]/[0.02] blur-[100px]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          title="About Me"
          subtitle="Passionate about building scalable systems and crafting premium digital experiences."
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative grid grid-cols-1 gap-12 md:grid-cols-2 md:items-start pt-8"
        >
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative mx-auto w-full max-w-sm md:max-w-none"
          >
            {/* Glow behind image */}
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-[var(--glow-cyan)]/[0.15] via-[var(--glow-violet)]/[0.1] to-[var(--glow-emerald)]/[0.08] blur-3xl opacity-60" />

            {/* Simple image container */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              {/* Replace this image with your own photo */}
              <PixelImage
                src="/ravi-photo.png"
                grid="6x4"
              />

              {/* Gradient overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating decorative badge */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="rounded-xl border border-white/10 bg-black/60 px-4 py-3 backdrop-blur-md">
                  <p className="text-xs font-medium text-[var(--glow-cyan)]">
                    Full-Stack Developer & System Architect
                  </p>
                  <p className="mt-0.5 text-[11px] text-white/50">
                    Building under Krmsolutions
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <p className="text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
                I&apos;m{" "}
                <span className="font-semibold text-white">Ravi Karmakar</span>, a
                full-stack developer with a deep focus on building{" "}
                <span className="text-[var(--glow-cyan)]">high-concurrency systems</span>{" "}
                and{" "}
                <span className="text-[var(--glow-violet)]">premium web experiences</span>.
              </p>
              <p className="text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
                From real-time communication engines to enterprise platforms, I architect
                solutions that combine performance, scalability, and design excellence. My
                work under{" "}
                <span className="font-medium text-white">Krmsolutions</span>{" "}
                pushes the boundaries of modern web development.
              </p>
              <p className="text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
                When I&apos;m not coding, I&apos;m exploring cutting-edge technologies, open-source
                contributions, and the ever-evolving landscape of system architecture.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 backdrop-blur-sm"
                >
                  <p className="text-2xl font-bold bg-gradient-to-r from-[var(--glow-cyan)] to-[var(--glow-violet)] bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
