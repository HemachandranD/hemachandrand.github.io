"use client";

import type { CSSProperties, PointerEvent, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface MagicCardProps {
  id?: string;
  children?: ReactNode;
  className?: string;
  gradientSize?: number;
  gradientFrom?: string;
  gradientTo?: string;
}

// Magic UI MagicCard — a spotlight that follows the pointer and lights
// up the border under it. Pointer position lives in CSS variables, so
// moving the mouse never re-renders React.
export function MagicCard({
  id,
  children,
  className,
  gradientSize = 260,
  gradientFrom = "var(--brand-violet)",
  gradientTo = "var(--brand-rose)",
}: MagicCardProps) {
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      id={id}
      onPointerMove={onPointerMove}
      style={
        {
          "--size": `${gradientSize}px`,
          "--from": gradientFrom,
          "--to": gradientTo,
        } as CSSProperties
      }
      className={cn(
        "group/magic relative isolate overflow-hidden rounded-2xl border bg-card text-card-foreground [--mx:-999px] [--my:-999px]",
        className,
      )}
    >
      {/* border glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/magic:opacity-100"
        style={{
          background:
            "radial-gradient(var(--size) circle at var(--mx) var(--my), var(--from), var(--to), transparent 100%)",
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-px -z-10 rounded-[inherit] bg-card" />
      {/* surface sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-px -z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/magic:opacity-100"
        style={{
          background:
            "radial-gradient(var(--size) circle at var(--mx) var(--my), color-mix(in oklab, var(--from) 12%, transparent), transparent 100%)",
        }}
      />
      {children}
    </div>
  );
}
