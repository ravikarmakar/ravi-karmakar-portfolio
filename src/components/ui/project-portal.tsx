"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { getGoogleDriveDirectLink } from "@/lib/constants";
import { motion } from "framer-motion";

interface ProjectPortalProps {
  name: string;
  description: string;
  image: string;
  tags: readonly string[];
  href: string;
  cta: string;
  className?: string;
  featured?: boolean;
}

export function ProjectPortal({
  name,
  description,
  image,
  tags,
  href,
  cta,
  className,
}: ProjectPortalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] transition-all duration-500 hover:border-[var(--glow-cyan)]/30 hover:shadow-[0_0_50px_rgba(0,240,255,0.1)]",
        className
      )}
    >
      {/* Project Image */}
      <motion.div
        className="absolute inset-0 z-0 h-full w-full"
      >
        <Image
          src={getGoogleDriveDirectLink(image)}
          alt={name}
          fill
          className="object-cover opacity-60 transition-all duration-700 group-hover:scale-110 group-hover:opacity-80 group-hover:blur-[2px]"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </motion.div>

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, y: 10 }}
              animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-[var(--glow-cyan)] backdrop-blur-md"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Title & Description */}
        <div className="space-y-3">
          <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            {name}
          </h3>

          <p className={cn(
            "max-w-md text-sm text-[var(--text-muted)] transition-all duration-500 leading-relaxed",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            {description}
          </p>
        </div>

        {/* CTA Button */}
        <motion.div
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="mt-6"
        >
          <a
            href={href}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95"
          >
            {cta}
            <ArrowUpRight size={18} />
          </a>
        </motion.div>
      </div>

      {/* Corner Icon */}
      <div className="absolute right-6 top-6 text-white/20 transition-all duration-500 group-hover:rotate-12 group-hover:text-[var(--glow-cyan)]">
        <ExternalLink size={24} />
      </div>

      {/* Glossy Reflection Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
    </motion.div>
  );
}
