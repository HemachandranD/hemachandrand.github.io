"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import * as m from "motion/react-m";

import { cn } from "@/lib/utils";

const DockContext = createContext<{
  mouseX: MotionValue<number>;
  size: number;
  magnification: number;
  distance: number;
} | null>(null);

interface DockProps {
  className?: string;
  iconSize?: number;
  iconMagnification?: number;
  iconDistance?: number;
  children: ReactNode;
}

// Magic UI Dock — macOS-style magnification. Tracks mouse pointers only,
// so a tap on a phone never leaves an icon stuck in its magnified state.
export function Dock({
  className,
  children,
  iconSize = 40,
  iconMagnification = 56,
  iconDistance = 120,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  return (
    <DockContext.Provider
      value={{ mouseX, size: iconSize, magnification: iconMagnification, distance: iconDistance }}
    >
      <div
        onPointerMove={(e) => e.pointerType === "mouse" && mouseX.set(e.clientX)}
        onPointerLeave={() => mouseX.set(Infinity)}
        className={cn(
          "flex h-(--dock-h) w-max items-end gap-1.5 rounded-2xl border bg-background/70 px-2 pb-(--dock-pad) shadow-lg shadow-black/5 backdrop-blur-xl backdrop-saturate-150 [--dock-h:58px] [--dock-pad:8px] dark:bg-background/60 dark:shadow-black/40",
          className,
        )}
      >
        {children}
      </div>
    </DockContext.Provider>
  );
}

export function DockIcon({ className, children }: { className?: string; children?: ReactNode }) {
  const ctx = useContext(DockContext);
  if (!ctx) throw new Error("DockIcon must be used inside <Dock>");
  const { mouseX, size, magnification, distance } = ctx;
  const ref = useRef<HTMLDivElement>(null);

  const offset = useTransform(mouseX, (x) => {
    const b = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return x - b.x - b.width / 2;
  });
  const target = useTransform(offset, [-distance, 0, distance], [size, magnification, size]);
  const width = useSpring(target, { mass: 0.1, stiffness: 160, damping: 13 });

  return (
    <m.div
      ref={ref}
      style={{ width, height: width }}
      className={cn("relative flex aspect-square shrink-0 items-center justify-center", className)}
    >
      {children}
    </m.div>
  );
}

export function DockSeparator() {
  return <div aria-hidden="true" className="mx-0.5 mb-1.5 h-2/3 w-px self-end bg-border" />;
}
