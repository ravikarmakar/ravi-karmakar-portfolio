"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Global Hydration Guard
 * This prevents browser extensions from triggering hydration errors
 * by ensuring the UI only renders once the browser environment is stable.
 * 
 * Uses useSyncExternalStore to avoid 'cascading render' warnings from useEffect.
 */
export function HydrationGuard({ children }: { children: React.ReactNode }) {
  const isServer = useSyncExternalStore(
    subscribe,
    () => false,
    () => true
  );

  if (isServer) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center" suppressHydrationWarning>
        <div className="h-4 w-4 rounded-full bg-[var(--glow-cyan)] animate-ping" suppressHydrationWarning />
      </div>
    );
  }

  return <>{children}</>;
}
