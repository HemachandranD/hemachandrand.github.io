"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

interface NumberTickerProps {
  value: number;
  className?: string;
  delay?: number;
}

// Magic UI NumberTicker. The real value is in the prerendered HTML (for
// no-JS readers and crawlers); it only rolls up from zero once, the
// first time it scrolls into view.
export function NumberTicker({ value, className, delay = 0 }: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const reduce = useReducedMotion();
  const armed = useRef(false);

  // Before it's seen, park it at zero so there's something to roll up.
  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight || rect.bottom < 0) {
      el.textContent = "0";
      armed.current = true;
    }
  }, [reduce]);

  useEffect(() => {
    const el = ref.current;
    if (!inView || !el || !armed.current) return;
    const controls = animate(0, value, {
      duration: 1.4,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = Math.round(v).toLocaleString("en-US");
      },
      onComplete: () => {
        el.textContent = value.toLocaleString("en-US");
      },
    });
    return () => {
      controls.stop();
      el.textContent = value.toLocaleString("en-US");
    };
  }, [inView, value, delay]);

  return (
    <span ref={ref} className={cn("inline-block tabular-nums", className)}>
      {value.toLocaleString("en-US")}
    </span>
  );
}
