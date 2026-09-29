"use client";

import type { ReactNode } from "react";
import type { UseInViewOptions } from "motion/react";
import * as m from "motion/react-m";

type BlurFadeProps = {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  offset?: number;
  direction?: "up" | "down" | "left" | "right";
  /** Animate when scrolled into view instead of on mount. */
  inView?: boolean;
  inViewMargin?: UseInViewOptions["margin"];
  blur?: string;
};

// Magic UI BlurFade — fades, un-blurs and slides content in.
export function BlurFade({
  children,
  className,
  duration = 0.5,
  delay = 0,
  offset = 10,
  direction = "down",
  inView = false,
  inViewMargin = "-60px",
  blur = "6px",
}: BlurFadeProps) {
  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const start = direction === "right" || direction === "down" ? -offset : offset;
  const hidden = { [axis]: start, opacity: 0, filter: `blur(${blur})` };
  const visible = { [axis]: 0, opacity: 1, filter: "blur(0px)" };
  const transition = { delay: 0.04 + delay, duration, ease: [0.21, 0.47, 0.32, 0.98] as const };

  return inView ? (
    <m.div
      className={className}
      initial={hidden}
      whileInView={visible}
      viewport={{ once: true, margin: inViewMargin }}
      transition={transition}
    >
      {children}
    </m.div>
  ) : (
    <m.div className={className} initial={hidden} animate={visible} transition={transition}>
      {children}
    </m.div>
  );
}
