"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { useMounted } from "@/lib/use-mounted";
import { cn } from "@/lib/utils";

type Span = { id: string; name: string; start: number; width: number };

const traceIdFor = (path: string) =>
  ([...path].reduce((h, c) => Math.imul(h ^ c.charCodeAt(0), 16777619), 2166136261) >>> 0)
    .toString(16)
    .padStart(8, "0");

// The page drawn as a trace: every <section data-span="name"> becomes a
// span on the timeline, the playhead follows the middle of the viewport,
// and clicking a span jumps to it.
export function TraceBar() {
  const pathname = usePathname();
  // The id comes from the live URL, which only exists in the browser (the
  // 404 page is prerendered once but served for every unknown path).
  const mounted = useMounted();
  const [spans, setSpans] = useState<Span[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const headRef = useRef<HTMLSpanElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    let list: Span[] = [];

    const measure = () => {
      const doc = document.documentElement.scrollHeight;
      const els = [...document.querySelectorAll<HTMLElement>("main [data-span]")];
      list = els.map((el) => {
        const top = el.getBoundingClientRect().top + window.scrollY;
        return {
          id: el.id,
          name: el.dataset.span ?? el.id,
          start: top / doc,
          width: el.offsetHeight / doc,
        };
      });
      setSpans(list);
      update();
    };

    const update = () => {
      raf = 0;
      const doc = document.documentElement.scrollHeight;
      const max = Math.max(1, doc - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / max));
      const probe = (window.scrollY + window.innerHeight * 0.4) / doc;
      if (headRef.current) headRef.current.style.left = `${progress * 100}%`;
      if (pctRef.current) pctRef.current.textContent = `${Math.round(progress * 100)}%`;
      const hit = list.findLast((s) => probe >= s.start);
      setActive(hit ? hit.id : null);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const first = requestAnimationFrame(measure);
    const ro = new ResizeObserver(() => requestAnimationFrame(measure));
    ro.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return (
    <div className="border-t border-border/60">
      <div className="mx-auto flex h-9 max-w-6xl items-center gap-3 px-4 font-mono text-[10px] text-muted-foreground sm:h-7 sm:px-6">
        <span className="hidden shrink-0 sm:inline">trace {mounted ? traceIdFor(pathname) : "········"}</span>
        <nav aria-label="Page sections" className="relative h-6 min-w-0 flex-1 sm:h-4">
          <span aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border" />
          {spans.length > 1 &&
            spans.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-current={active === s.id ? "location" : undefined}
                title={`${s.name} · ${Math.round(s.width * 100)}% of the page`}
                className={cn(
                  "group absolute top-0 flex h-6 min-w-6 items-center overflow-hidden rounded-[3px] border px-1 transition-colors sm:h-4 sm:min-w-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                  active === s.id
                    ? "border-transparent bg-foreground text-background"
                    : "border-border bg-background hover:bg-accent hover:text-foreground",
                )}
                style={{ left: `${s.start * 100}%`, width: `calc(${s.width * 100}% - 2px)` }}
              >
                <span className="truncate max-sm:sr-only">{s.name}</span>
              </a>
            ))}
          <span
            ref={headRef}
            aria-hidden="true"
            className="pointer-events-none absolute top-[-3px] bottom-[-3px] w-px bg-brand-rose shadow-[0_0_6px_var(--brand-rose)]"
            style={{ left: "0%" }}
          />
        </nav>
        <span ref={pctRef} className="w-8 shrink-0 text-right tabular-nums">
          0%
        </span>
      </div>
    </div>
  );
}
