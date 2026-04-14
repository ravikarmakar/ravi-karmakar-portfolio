"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { PROJECTS, PREMIUM_TRANSITION } from "@/lib/constants";
import {
  Gamepad2Icon,
  SmileIcon,
  ShoppingCartIcon,
  BuildingIcon,
  MessageCircleIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
  gamepad: Gamepad2Icon,
  smile: SmileIcon,
  cart: ShoppingCartIcon,
  building: BuildingIcon,
  message: MessageCircleIcon,
};

export function ProjectsSection() {
  const { ref, isInView } = useScrollReveal({ threshold: 0.05 });

  const backgrounds = useMemo(() => [
    "from-[var(--glow-cyan)]/[0.07] via-transparent to-[var(--glow-violet)]/[0.05]",
    "from-[var(--glow-violet)]/[0.07] via-transparent to-[var(--glow-emerald)]/[0.05]",
    "from-[var(--glow-emerald)]/[0.07] via-transparent to-[var(--glow-cyan)]/[0.05]",
    "from-amber-500/[0.05] via-transparent to-[var(--glow-violet)]/[0.05]",
    "from-[var(--glow-cyan)]/[0.05] via-transparent to-[var(--glow-emerald)]/[0.07]"
  ], []);

  const projectCards = useMemo(() => PROJECTS.map((project, i) => {
    const IconComp = iconMap[project.icon as keyof typeof iconMap];
    
    return (
      <BentoCard 
        key={project.name} 
        {...project} 
        Icon={IconComp}
        background={(
          <div className={cn("absolute inset-0 bg-gradient-to-br", backgrounds[i % backgrounds.length])} />
        )}
      />
    );
  }), [backgrounds]);

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
          transition={{ ...PREMIUM_TRANSITION, delay: 0.2 }}
          className="relative"
        >
          <BentoGrid className="lg:auto-rows-[16rem] md:auto-rows-[14rem] auto-rows-[20rem] grid-cols-1 md:grid-cols-3 max-w-full">
            {projectCards}
          </BentoGrid>
        </motion.div>
      </div>
    </section>
  );
}
