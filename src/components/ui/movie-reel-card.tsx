import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getGoogleDriveDirectLink } from "@/lib/constants";

interface MovieReelCardProps {
  cert: {
    id: string;
    name: string;
    issuer: string;
    date: string;
    short: string;
    image?: string;
  };
  onClick?: () => void;
  className?: string;
  isExpanded?: boolean;
  layoutIdPrefix?: string;
}

export const MovieReelCard = memo(function MovieReelCard({ cert, onClick, className, isExpanded = false, layoutIdPrefix }: MovieReelCardProps) {
  const prefix = layoutIdPrefix || cert.id;

  // Memoize perforations so they don't re-calculate every render
  const holes = useMemo(() => [...Array(isExpanded ? 40 : 16)], [isExpanded]);

  // Helper to resolve the correct image (Dynamic Drive link)
  const getCertificateImage = () => {
    return cert.image ? getGoogleDriveDirectLink(cert.image) : "";
  };

  const reelTransition = { type: "spring", stiffness: 300, damping: 30 } as const;

  return (
    <motion.div
      layoutId={`cert-${prefix}`}
      onClick={onClick}
      transition={reelTransition}
      className={cn(
        "relative flex-shrink-0 cursor-pointer overflow-hidden",
        "bg-black border border-white/10",
        isExpanded
          ? "w-[95vw] max-w-6xl h-[85vh] md:h-[600px] rounded-sm"
          : "w-[300px] h-[300px] md:w-[600px] md:h-[380px] hover:border-white/30",
        className
      )}
    >
      {/* Film Strip Perforations - Top */}
      <div className="absolute top-0 left-0 right-0 h-8 flex items-center justify-between px-2 bg-[#0a0a0a] border-b border-white/5 z-20">
        {holes.map((_, i) => (
          <div
            key={`top-${i}`}
            className={cn(
              "w-3 h-4 bg-black rounded-sm border border-white/10 shadow-[inset_0_0_5px_rgba(0,0,0,1)]",
              !isExpanded && i >= 10 && "hidden md:block" // Hide extra holes on mobile
            )}
          />
        ))}
      </div>

      {/* Film Strip Perforations - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-8 flex items-center justify-between px-2 bg-[#0a0a0a] border-t border-white/5 z-20">
        {holes.map((_, i) => (
          <div
            key={`bot-${i}`}
            className={cn(
              "w-3 h-4 bg-black rounded-sm border border-white/10 shadow-[inset_0_0_5px_rgba(0,0,0,1)]",
              !isExpanded && i >= 10 && "hidden md:block" // Hide extra holes on mobile
            )}
          />
        ))}
      </div>

      {/* Main Content Area (The "Frame") */}
      <div className="absolute inset-0 pt-10 pb-10 flex flex-col z-10">

        {/* Image Content */}
        <div className="relative w-full h-full overflow-hidden flex items-center justify-center p-2">
          <motion.img
            layoutId={`cert-img-${prefix}`}
            src={getCertificateImage()}
            alt={cert.name}
            transition={reelTransition}
            className={cn(
              "w-full h-full transition-all duration-500",
              isExpanded ? "object-contain opacity-100" : "object-cover opacity-80"
            )}
          />
          <div className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent",
            isExpanded && "opacity-40" // Fade out gradient more when expanded
          )} />

          {/* Overlay Content Inside the Image */}
          <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col gap-0.5">
            {!isExpanded && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                layoutId={`cert-tag-${prefix}`}
                className="text-[10px] font-bold tracking-[0.3em] text-[var(--glow-cyan)] uppercase"
              >
                {cert.short}
              </motion.span>
            )}
            <motion.h3
              layoutId={`cert-title-${prefix}`}
              transition={reelTransition}
              className={cn(
                "font-bold uppercase tracking-tight leading-none bg-gradient-to-r from-[var(--glow-cyan)] via-white to-[var(--glow-violet)] bg-clip-text text-transparent",
                isExpanded ? "text-sm md:text-lg" : "text-xl md:text-2xl"
              )}
            >
              {cert.name}
            </motion.h3>
            {!isExpanded && (
              <motion.div
                layoutId={`cert-meta-${prefix}`}
                className="flex items-center gap-2 text-[10px] font-mono text-white/40 uppercase tracking-widest mt-1"
              >
                <span>{cert.issuer}</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>{cert.date}</span>
              </motion.div>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
})
