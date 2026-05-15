"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  "INITIALIZING_CORE_SYSTEMS...",
  "VERIFYING_ARCHITECTURAL_INTEGRITY...",
  "ESTABLISHING_NEURAL_LINK...",
  "LOADING_ASSETS_FROM_CLOUD_DRIVE...",
  "OPTIMIZING_RENDER_PIPELINE...",
  "CONNECTING_TO_GLOBAL_NETWORK...",
  "BYPASSING_RESTRICTIONS...",
  "READY_TO_DEPLOY.",
];

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (currentLine < BOOT_LINES.length) {
      const timeout = setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
      }, 150 + Math.random() * 200);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setIsDone(true);
        setTimeout(onComplete, 500);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100000] flex flex-col items-start justify-center bg-black p-8 md:p-24 font-mono text-sm md:text-base text-[var(--glow-cyan)]"
        >
          <div className="max-w-2xl w-full space-y-2">
            {BOOT_LINES.slice(0, currentLine + 1).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
              >
                <span className="opacity-40">[{i.toString().padStart(2, "0")}]</span>
                <span>{line}</span>
                {i === currentLine && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                    className="h-4 w-2 bg-[var(--glow-cyan)]"
                  />
                )}
              </motion.div>
            ))}
          </div>
          
          <div className="absolute bottom-12 left-12 right-12 flex justify-between opacity-20 text-[10px] uppercase tracking-[0.3em]">
            <span>System Revision: 4.0.1</span>
            <span>Auth: RK_ENCRYPTED_OK</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
