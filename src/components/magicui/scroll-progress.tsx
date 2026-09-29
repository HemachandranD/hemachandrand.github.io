"use client";

import { useScroll, useSpring, useTransform } from "motion/react";
import * as m from "motion/react-m";

// Magic UI ScrollProgress — a hairline at the top of the viewport.
export function ScrollProgress() {
  const { scrollY, scrollYProgress } = useScroll();
  // hidden at the very top (and on pages too short to scroll)
  const opacity = useTransform(scrollY, [0, 24], [0, 1]);
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  return (
    <m.div
      aria-hidden="true"
      className="bg-brand-gradient fixed inset-x-0 top-0 z-[60] h-0.5 origin-left"
      style={{ scaleX, opacity }}
    />
  );
}
