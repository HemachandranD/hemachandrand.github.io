import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

interface BorderBeamProps {
  size?: number;
  /** Seconds per lap. */
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  className?: string;
  reverse?: boolean;
  borderWidth?: number;
}

// Magic UI BorderBeam — a light that travels the border of its parent.
// Driven by a CSS offset-path animation instead of JS.
export function BorderBeam({
  className,
  size = 80,
  delay = 0,
  duration = 8,
  colorFrom = "var(--brand-amber)",
  colorTo = "var(--brand-violet)",
  reverse = false,
  borderWidth = 1.5,
}: BorderBeamProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-[inherit] border-(length:--border-beam-width) border-transparent mask-[linear-gradient(transparent,transparent),linear-gradient(#000,#000)] mask-intersect [mask-clip:padding-box,border-box] motion-reduce:hidden"
      style={{ "--border-beam-width": `${borderWidth}px` } as CSSProperties}
    >
      <div
        className={cn(
          "border-beam absolute aspect-square bg-linear-to-l from-(--color-from) via-(--color-to) to-transparent",
          className,
        )}
        style={
          {
            width: size,
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
            "--color-from": colorFrom,
            "--color-to": colorTo,
            animationDuration: `${duration}s`,
            animationDelay: `${-delay}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as CSSProperties
        }
      />
    </div>
  );
}
