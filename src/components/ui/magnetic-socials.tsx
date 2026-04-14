"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { NexusIcon, IconName } from "./nexus-icon";

interface SocialItem {
  icon: IconName;
  label: string;
  href: string;
  color: string;
}

interface MagneticSocialsProps {
  items: SocialItem[];
  className?: string;
}

export function MagneticSocials({ items, className }: MagneticSocialsProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-6", className)}>
      {items.map((item) => (
        <MagneticIcon key={item.label} {...item} />
      ))}
    </div>
  );
}

function MagneticIcon({ icon, label, href, color }: SocialItem) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for the magnetic pull
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for a "liquid" feel
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance from center and apply magnetic strength
    const strength = 0.4;
    mouseX.set((clientX - centerX) * strength);
    mouseY.set((clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{ x, y }}
      className="group relative flex items-center justify-center p-2 transition-colors"
    >
      {/* Liquid Glow Backdrop */}
      <motion.div
        initial={false}
        animate={isHovered ? { opacity: 0.15, scale: 1.5 } : { opacity: 0, scale: 0.8 }}
        className="absolute inset-0 rounded-full blur-xl pointer-events-none"
        style={{ backgroundColor: color }}
      />

      {/* The Icon */}
      <div 
        className={cn(
          "relative z-10 transition-all duration-300",
          isHovered ? "scale-125" : "opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0"
        )}
        style={{ color: isHovered ? color : "white" }}
      >
        <NexusIcon name={icon} size={24} />
      </div>

      {/* Clean Label Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={isHovered ? { opacity: 1, y: -30 } : { opacity: 0, y: 5 }}
        className="absolute bottom-full left-1/2 -translate-x-1/2 pointer-events-none"
      >
        <div className="whitespace-nowrap px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
          {label}
        </div>
      </motion.div>

      {/* Active Dot Indication */}
      {isHovered && (
        <motion.div
          layoutId="social-active-dot"
          className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full"
          style={{ backgroundColor: color }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </motion.a>
  );
}
