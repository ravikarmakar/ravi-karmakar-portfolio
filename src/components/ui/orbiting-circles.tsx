import { cn } from "@/lib/utils";

export interface OrbitingCirclesProps {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  pauseOnHover?: boolean;
}

export default function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  delay = 10,
  radius = 50,
  path = true,
  pauseOnHover = false,
}: OrbitingCirclesProps) {
  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-white/10 stroke-1"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}

      <div
        style={
          {
            "--duration": `${duration}s`,
            "--radius": `${radius}px`,
            "--delay": `${-delay}s`,
          } as React.CSSProperties
        }
        className={cn(
          "absolute top-1/2 left-1/2 flex size-full -translate-x-1/2 -translate-y-1/2 transform-gpu animate-orbit items-center justify-center [animation-delay:var(--delay)] rounded-full pointer-events-none",
          { 
            "[animation-direction:reverse]": reverse,
            "group-hover:[animation-play-state:paused]": pauseOnHover 
          },
          className,
        )}
      >
        <div className="pointer-events-auto">
          {children}
        </div>
      </div>
    </>
  );
}
