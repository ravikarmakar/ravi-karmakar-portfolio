"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import {
  Gamepad2Icon,
  SmileIcon,
  ShoppingCartIcon,
  BuildingIcon,
  MessageCircleIcon,
} from "lucide-react";

const projects = [
  {
    Icon: Gamepad2Icon,
    name: "Real-Time Esports Management System",
    description:
      "High-concurrency tournament engine handling 50k+ concurrent users with real-time bracket updates, live scoring, and automated matchmaking.",
    href: "#",
    cta: "View Project",
    className: "col-span-3 md:col-span-2",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--glow-cyan)]/[0.07] via-transparent to-[var(--glow-violet)]/[0.05]" />
    ),
  },
  {
    Icon: SmileIcon,
    name: "AI-Powered Face Communication Tool",
    description:
      "Real-time emotion detection and interactive UI using face-api.js with dynamic emotional feedback loops.",
    href: "#",
    cta: "View Project",
    className: "col-span-3 md:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--glow-violet)]/[0.07] via-transparent to-[var(--glow-emerald)]/[0.05]" />
    ),
  },
  {
    Icon: ShoppingCartIcon,
    name: "Modern E-Commerce Platform",
    description:
      "Full-scale marketplace with optimized database indexing, Stripe payment flows, and a Shadcn UI admin dashboard.",
    href: "#",
    cta: "View Project",
    className: "col-span-3 md:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--glow-emerald)]/[0.07] via-transparent to-[var(--glow-cyan)]/[0.05]" />
    ),
  },
  {
    Icon: BuildingIcon,
    name: "BYG Architects Digital HQ",
    description:
      "Professional architectural portfolio with high-end GSAP-powered motion design and immersive 3D scroll sequences.",
    href: "#",
    cta: "View Project",
    className: "col-span-3 md:col-span-2",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.05] via-transparent to-[var(--glow-violet)]/[0.05]" />
    ),
  },
  {
    Icon: MessageCircleIcon,
    name: "Global Real-Time Chat App",
    description:
      "Low-latency communication system built with Socket.io and Redis pub/sub, supporting 100k+ concurrent connections with message persistence.",
    href: "#",
    cta: "View Project",
    className: "col-span-3",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--glow-cyan)]/[0.05] via-transparent to-[var(--glow-emerald)]/[0.07]" />
    ),
  },
];

export function ProjectsSection() {
  const { ref, isInView } = useScrollReveal({ threshold: 0.05 });

  return (
    <section id="projects" className="relative py-24 md:py-32">
      {/* Subtle bg accent */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-[var(--glow-cyan)]/[0.02] blur-[100px]" />
        <div className="absolute left-0 bottom-1/4 h-[300px] w-[300px] rounded-full bg-[var(--glow-violet)]/[0.02] blur-[80px]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          title="Projects"
          subtitle="Production-grade systems built for scale, speed, and elegance."
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative"
        >
          <BentoGrid className="auto-rows-[18rem] grid-cols-3">
            {projects.map((project) => (
              <BentoCard key={project.name} {...project} />
            ))}
          </BentoGrid>
        </motion.div>
      </div>
    </section>
  );
}
