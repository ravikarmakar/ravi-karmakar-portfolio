"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

interface CertificationCardProps {
  name: string;
  issuer: string;
  date: string;
  id: string;
  image?: string;
  className?: string;
}

export function CertificationCard({
  name,
  issuer,
  date,
  id,
  image,
  className,
}: CertificationCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative w-72 h-44 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-5 transition-all duration-300 hover:border-white/20",
        className
      )}
    >
      <BorderBeam size={100} duration={10} delay={0} colorFrom="var(--glow-cyan)" colorTo="var(--glow-violet)" borderWidth={1.5} />
      
      <div style={{ transform: "translateZ(50px)" }} className="flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10">
            {image ? (
              <img src={image} alt={issuer} className="h-6 w-6 object-contain" />
            ) : (
              <div className="h-6 w-6 rounded bg-gradient-to-br from-[var(--glow-cyan)] to-[var(--glow-violet)] opacity-50" />
            )}
          </div>
          <ExternalLink className="h-4 w-4 text-[var(--text-muted)] opacity-0 transition-opacity group-hover:opacity-100" />
        </div>

        <div>
          <h4 className="text-sm font-bold text-white leading-tight">{name}</h4>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-[10px] font-medium text-[var(--glow-cyan)] uppercase tracking-wider">{issuer}</p>
            <p className="text-[10px] text-[var(--text-muted)]">{date}</p>
          </div>
        </div>
      </div>

      {/* Holographic light effect */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
    </motion.div>
  );
}
