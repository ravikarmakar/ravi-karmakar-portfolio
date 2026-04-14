"use client";

import { motion } from "framer-motion";
import { PixelImage } from "@/components/ui/pixel-image";
import { NexusIcon } from "@/components/ui/nexus-icon";
import { Highlighter } from "@/components/ui/highlighter";
import { Marquee } from "@/components/ui/marquee";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { BorderBeam } from "@/components/ui/border-beam";
import { MagneticSocials } from "@/components/ui/magnetic-socials";
import { SOCIAL_LINKS, SITE_CONFIG, PREMIUM_TRANSITION } from "@/lib/constants";

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
          subtitle={SITE_CONFIG.description}
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={PREMIUM_TRANSITION}
          className="relative grid grid-cols-1 gap-12 md:grid-cols-12 md:items-center pt-8"
        >
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ ...PREMIUM_TRANSITION, delay: 0.2 }}
            className="relative mx-auto w-full max-w-sm md:col-span-5 md:max-w-md lg:max-w-sm"
          >
            {/* Glow behind image */}
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-[var(--glow-cyan)]/[0.15] via-[var(--glow-violet)]/[0.1] to-[var(--glow-emerald)]/[0.08] blur-3xl opacity-60" />

            {/* Simple image container */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <PixelImage
                src={SOCIAL_LINKS.avatar}
                alt={`${SITE_CONFIG.name} ${SITE_CONFIG.lastName} — ${SITE_CONFIG.role}`}
                grid="6x4"
              />

              {/* Gradient overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating decorative badge */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="relative group overflow-hidden rounded-xl border border-white/10 bg-black/60 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:bg-black/80">
                  <BorderBeam
                    size={60}
                    duration={8}
                    borderWidth={1.5}
                    colorFrom="var(--glow-cyan)"
                    colorTo="var(--glow-violet)"
                  />
                  <p className="text-xs font-semibold tracking-tight text-[var(--glow-cyan)]">
                    {SITE_CONFIG.role}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ ...PREMIUM_TRANSITION, delay: 0.3 }}
            className="space-y-6 md:col-span-7"
          >
            <div className="space-y-4">
              <p className="text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
                I&apos;m{" "}
                <span className="font-semibold text-white">{SITE_CONFIG.name} {SITE_CONFIG.lastName}</span>, a
                full-stack developer with a deep focus on building{" "}
                <Highlighter action="highlight" color="#00f0ff" isView={true}>
                  <span className="font-semibold text-white">high-concurrency systems</span>
                </Highlighter>{" "}
                and{" "}
                <Highlighter action="underline" color="#9c40ff" isView={true}>
                  <span className="font-semibold text-white">premium web experiences</span>
                </Highlighter>.
              </p>
              <p className="text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
                From real-time communication engines to enterprise platforms, I architect
                solutions that combine performance, scalability, and design excellence. My
                projects push the boundaries of modern web development.
              </p>
              <p className="text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
                When I&apos;m not coding, I&apos;m exploring cutting-edge technologies, open-source
                contributions, and the ever-evolving landscape of system architecture.
              </p>
            </div>

            {/* Top Skills Marquee */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ ...PREMIUM_TRANSITION, delay: 0.5 }}
              className="pt-4"
            >
              <div className="flex items-center gap-2 mb-3">
                 <div className="h-px w-8 bg-white/10" />
                 <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Core Tech Stack</p>
              </div>
              <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-xl py-4">
                <Marquee pauseOnHover className="[--duration:25s]">
                  {["Next.js", "TypeScript", "Node.js", "WebSockets", "PostgreSQL", "React", "Docker"].map((skill) => (
                    <div
                      key={skill}
                      className="mx-3 flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-white/80 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white"
                    >
                      {skill}
                    </div>
                  ))}
                </Marquee>
                {/* Edge Fades for Marquee */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black to-transparent"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black to-transparent"></div>
              </div>
            </motion.div>

            {/* Social Nexus - Replaces Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col gap-3 pt-4"
            >
              <div className="flex items-center gap-2">
                <div className="h-px w-8 bg-white/10" />
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">Social Appearances</p>
              </div>
              <div className="flex justify-start">
                <MagneticSocials
                  items={[
                    {
                      label: "Github",
                      icon: "github",
                      href: SOCIAL_LINKS.github,
                      color: "var(--glow-cyan)",
                    },
                    {
                      label: "LinkedIn",
                      icon: "linkedin",
                      href: SOCIAL_LINKS.linkedin,
                      color: "var(--glow-violet)",
                    },
                    {
                      label: "X (Twitter)",
                      icon: "x",
                      href: SOCIAL_LINKS.twitter,
                      color: "var(--glow-emerald)",
                    },
                  ]}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
