"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
  onClick,
  href,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = href ? "a" : "button";
  const linkProps = href ? { href, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <Tag
        onClick={onClick}
        {...linkProps}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold",
          "rounded-full border border-white/10 bg-white/5 text-white",
          "backdrop-blur-md transition-all duration-300",
          "hover:bg-white/10 hover:border-[var(--glow-cyan)]/40",
          "hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]",
          "active:scale-95 cursor-pointer",
          className
        )}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
