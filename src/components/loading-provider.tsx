"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Preloader } from "@/components/ui/preloader";

const LoadingContext = createContext({ isLoading: true });

export const useLoading = () => useContext(LoadingContext);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);

    const handleLoad = () => {};

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(timer);
      };
    }

    return () => clearTimeout(timer);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading }}>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, filter: "blur(20px)" }}
        animate={isLoading ? {} : { opacity: 1, filter: "blur(0px)" }}
        transition={{
          duration: 1.2,
          ease: [0.85, 0, 0.15, 1],
          delay: 0.2,
        }}
        style={isLoading ? { height: "100vh", overflow: "hidden" } : { minHeight: "100vh" }}
      >
        {children}
      </motion.div>
    </LoadingContext.Provider>
  );
}

