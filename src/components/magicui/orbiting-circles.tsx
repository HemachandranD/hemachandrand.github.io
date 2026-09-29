import { Children, type CSSProperties, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface OrbitingCirclesProps {
  className?: string;
  children?: ReactNode;
  reverse?: boolean;
  /** Seconds per revolution. */
  duration?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
}

// Magic UI OrbitingCircles — children spaced evenly on a CSS-animated orbit.
export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
}: OrbitingCirclesProps) {
  const count = Children.count(children);
  return (
    <>
      {path && (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-black/10 stroke-1 dark:stroke-white/10"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            strokeDasharray="4 6"
          />
        </svg>
      )}
      {Children.map(children, (child, index) => (
        <div
          style={
            {
              "--duration": duration,
              "--radius": radius,
              "--angle": (360 / count) * index,
              "--icon-size": `${iconSize}px`,
            } as CSSProperties
          }
          className={cn(
            "absolute flex size-(--icon-size) transform-gpu animate-orbit items-center justify-center rounded-full motion-reduce:animate-none motion-reduce:[transform:rotate(calc(var(--angle)*1deg))_translateY(calc(var(--radius)*1px))_rotate(calc(var(--angle)*-1deg))]",
            reverse && "[animation-direction:reverse]",
            className,
          )}
        >
          {child}
        </div>
      ))}
    </>
  );
}
