"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";

import { cn } from "@/lib/utils";

interface WordRotateProps {
  words: string[];
  /** ms each word stays up. */
  duration?: number;
  className?: string;
}

// Magic UI WordRotate. Screen readers get the first phrase once instead
// of an announcement every few seconds; reduced motion holds still.
export function WordRotate({ words, duration = 2800, className }: WordRotateProps) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || words.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), duration);
    return () => clearInterval(id);
  }, [words.length, duration, reduce]);

  return (
    <span className={cn("relative inline-grid overflow-hidden align-bottom", className)}>
      <span className="sr-only">{words[0]}</span>
      {/* every phrase, invisible, in the same cell: the box is always as
          tall as the longest one, so rotating never shifts the layout */}
      {words.map((w) => (
        <span key={w} aria-hidden="true" className="invisible col-start-1 row-start-1">
          {w}
        </span>
      ))}
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={index}
          aria-hidden="true"
          className="col-start-1 row-start-1"
          initial={{ opacity: 0, y: "60%", filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: "-60%", filter: "blur(4px)" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {words[index]}
        </m.span>
      </AnimatePresence>
    </span>
  );
}
