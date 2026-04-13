"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

export function Preloader() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Non-linear, slightly accelerating for premium feel
        const step = prev < 30 ? 0.5 : prev < 70 ? 1 : 2;
        return Math.min(prev + step, 100);
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  // Neural Orbs initialization
  const orbs = useMemo(() => [
    { color: "var(--glow-cyan)", size: "40vw", delay: 0, duration: 15 },
    { color: "var(--glow-violet)", size: "35vw", delay: -5, duration: 20 },
    { color: "var(--glow-emerald)", size: "30vw", delay: -10, duration: 25 },
    { color: "var(--glow-cyan)", size: "25vw", delay: -15, duration: 18 },
  ], []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
    >
      {/* Neural Fluid Background */}
      <div className="absolute inset-0 z-0">
        {orbs.map((orb, i) => (
          <motion.div
            key={i}
            animate={{
              x: ["-10%", "20%", "-20%", "10%"],
              y: ["-20%", "10%", "20%", "-10%"],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              ease: "linear",
              delay: orb.delay,
            }}
            className="absolute rounded-full opacity-[0.08] blur-[100px]"
            style={{
              backgroundColor: orb.color,
              width: orb.size,
              height: orb.size,
              left: `${25 + i * 15}%`,
              top: `${25 + (i % 2) * 20}%`,
            }}
          />
        ))}
        {/* Grain Texture */}
        <div className="absolute inset-0 opacity-[0.03] grayscale contrast-150 pointer-events-none"
             style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-16">
        {/* Morphing Core SVG */}
        <div className="relative h-40 w-40">
           <motion.svg 
            viewBox="0 0 100 100" 
            className="h-full w-full"
          >
            <defs>
              <filter id="core-glow">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <motion.path
              d={percent < 100 
                ? "M 50, 50 m -40, 0 a 40,40 0 1,0 80,0 a 40,40 0 1,0 -80,0" // Circle
                : "M30 20 V80 M30 50 L50 20 M30 50 L50 80 M60 20 V80 M60 50 L80 20 M60 50 L80 80" // RK Logo
              }
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#core-glow)"
              animate={{ 
                pathLength: [0, 1],
                opacity: [0.3, 1],
                rotate: percent * 3.6 
              }}
              transition={{ 
                d: { duration: 0.8, ease: "easeInOut" },
                pathLength: { duration: 2, ease: "easeInOut" },
                rotate: { duration: 0.1 }
              }}
            />
          </motion.svg>
          
          {/* Inner pulse */}
          <motion.div 
            animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-4 rounded-full bg-white blur-3xl opacity-10"
          />
        </div>

        {/* Velocity-based Variable Status */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center">
             <motion.p 
              animate={{ letterSpacing: ["0.4em", "0.6em", "0.4em"] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-[10px] font-medium tracking-[0.5em] text-white/30 uppercase"
            >
              System Connectivity
            </motion.p>
            <div className="h-4 overflow-hidden mt-1">
               <motion.span 
                 animate={{ opacity: [1, 0.5, 1] }}
                 className="text-[8px] font-mono text-[var(--glow-cyan)]"
               >
                 {percent < 100 ? "INITIALIZING_SYSTEM_CORE" : "SYNCHRONIZATION_COMPLETE"}
               </motion.span>
            </div>
          </div>

          <motion.div 
            style={{ fontWeight: 100 + (percent * 8) }} // Variable font weight simulation
            className="text-6xl font-black tracking-tighter text-white transition-all duration-300 pointer-events-none select-none"
          >
            {Math.round(percent)}
            <span className="text-xl ml-1 text-white/20 font-light">%</span>
          </motion.div>
        </div>
      </div>

      {/* Ultra-advanced status indicators */}
      <div className="absolute bottom-12 left-12 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-[var(--glow-cyan)] animate-pulse" />
          <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase">Aesthetic_Engine_Active</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-white/10" />
          <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase">OLED_OPTIMIZED_2026</span>
        </div>
      </div>
    </motion.div>
  );
}
