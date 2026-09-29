"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Footer telemetry for the page you're reading: how long it took to render
// and roughly how many tokens it is.
export function InferenceStats() {
  const pathname = usePathname();
  const [stats, setStats] = useState<{ ms: number; tokens: number } | null>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      const ms = nav && nav.domContentLoadedEventEnd > 0 ? nav.domContentLoadedEventEnd : performance.now();
      const text = document.querySelector("main")?.textContent ?? "";
      setStats({ ms: Math.round(ms), tokens: Math.round(text.replace(/\s+/g, " ").length / 4) });
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <p className="font-mono text-[11px] text-muted-foreground" aria-live="off">
      {stats ? (
        <>
          page rendered in <span className="text-foreground tabular-nums">{stats.ms} ms</span> ·{" "}
          <span className="text-foreground tabular-nums">~{stats.tokens.toLocaleString("en-US")}</span> tokens · 0
          hallucinations
        </>
      ) : (
        <span className="invisible">page rendered in 000 ms · ~0,000 tokens · 0 hallucinations</span>
      )}
    </p>
  );
}
