import type { CSSProperties } from "react";
import { ArrowUpRight, ChevronRight } from "lucide-react";

import { cn, r3 } from "@/lib/utils";
import { education, experience, type Experience } from "@/data/portfolio";

// Rendered at build time; the site rebuilds monthly so "now", open spans
// and durations stay current.
const NOW = new Date();
const toDate = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return new Date(y, m - 1);
};
const monthYear = (d: Date) => d.toLocaleString("en-US", { month: "short", year: "numeric" });
const months = (a: Date, b: Date) => (b.getFullYear() - a.getFullYear()) * 12 + b.getMonth() - a.getMonth();
const duration = (m: number) =>
  [Math.floor(m / 12) && `${Math.floor(m / 12)}y`, m % 12 && `${m % 12}m`].filter(Boolean).join(" ") || "0m";
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");

// Oldest first: a trace reads top to bottom in time.
const rows = [...experience].reverse().map((exp: Experience) => {
  const start = toDate(exp.start);
  const end = exp.end ? toDate(exp.end) : NOW;
  return { exp, start, end, length: months(start, end), live: !exp.end };
});
const T0 = rows[0].start;
const TOTAL = months(T0, NOW);
const pct = (d: Date) => r3((months(T0, d) / TOTAL) * 100);
const years = Array.from({ length: NOW.getFullYear() - T0.getFullYear() + 1 }, (_, i) => T0.getFullYear() + i).filter(
  (y) => y > T0.getFullYear(),
);

const COLORS = ["var(--brand-violet)", "var(--brand-rose)", "var(--brand-amber)"];

export function CareerTrace() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card">
      {/* trace header */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b px-4 py-3 font-mono text-[11px] text-muted-foreground sm:px-5">
        <span className="text-foreground">career.run()</span>
        <span>
          {rows.length} spans · {duration(TOTAL)} · {monthYear(T0)} → now
        </span>
        <span className="flex items-center gap-1.5 sm:ml-auto">
          <span className="size-1.5 animate-pulse rounded-full bg-ok" aria-hidden="true" /> status: in-flight
        </span>
      </div>

      {/* time axis */}
      <div className="grid grid-cols-1 border-b px-4 py-2 sm:grid-cols-[14rem_1fr] sm:px-5" aria-hidden="true">
        <span className="hidden font-mono text-[10px] text-muted-foreground sm:block">span</span>
        <div className="relative h-4 font-mono text-[10px] text-muted-foreground">
          {years.filter((y) => pct(new Date(y, 0)) < 93).map((y) => (
            <span key={y} className="absolute top-0 -translate-x-1/2" style={{ left: `${pct(new Date(y, 0))}%` }}>
              {String(y).slice(2).padStart(3, "’")}
            </span>
          ))}
          <span className="absolute top-0 right-0">now</span>
        </div>
      </div>

      <ol>
        {rows.map(({ exp, start, end, length, live }, i) => (
          <li key={exp.company} className="border-b last:border-b-0">
            <details open={live} className="group">
              <summary className="grid list-none grid-cols-1 gap-2 px-4 py-3 transition-colors hover:bg-accent/40 focus-visible:bg-accent/40 focus-visible:outline-none sm:grid-cols-[14rem_1fr] sm:items-center sm:px-5 [&::-webkit-details-marker]:hidden">
                <span className="flex min-w-0 items-center gap-1.5 font-mono text-xs">
                  <ChevronRight className="size-3.5 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" aria-hidden="true" />
                  <span className="truncate">
                    {slug(exp.company.split(" ")[0])}.<span className="text-muted-foreground">{slug(exp.title)}</span>
                  </span>
                </span>
                <span className="relative h-6">
                  {/* grid lines */}
                  {years.map((y) => (
                    <span key={y} aria-hidden="true" className="absolute inset-y-0 w-px bg-border/70" style={{ left: `${pct(new Date(y, 0))}%` }} />
                  ))}
                  <span
                    className={cn(
                      "absolute inset-y-1 flex items-center justify-end rounded-[4px] pr-1.5 font-mono text-[10px] font-medium text-black/70",
                      live && "in-flight",
                    )}
                    style={
                      {
                        left: `${pct(start)}%`,
                        width: `${r3(Math.max(pct(end) - pct(start), 4))}%`,
                        backgroundColor: COLORS[i % COLORS.length],
                      } as CSSProperties
                    }
                  >
                    <span className="max-sm:hidden">{duration(length)}</span>
                  </span>
                  <span className="sr-only">
                    {exp.title} at {exp.company}, {monthYear(start)} to {live ? "present" : monthYear(end)} ({duration(length)})
                  </span>
                </span>
              </summary>

              <div className="grid gap-4 px-4 pb-5 sm:grid-cols-[14rem_1fr] sm:px-5">
                <div className="font-serif text-2xl leading-tight sm:pl-5">
                  {exp.title}
                  <div className="mt-1 font-sans text-sm text-muted-foreground">
                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-0.5 font-medium text-foreground underline-offset-4 hover:underline"
                      >
                        {exp.company}
                        <ArrowUpRight className="size-3.5 opacity-60" aria-hidden="true" />
                      </a>
                    ) : (
                      exp.company
                    )}
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="text-sm leading-relaxed text-pretty text-muted-foreground">{exp.description}</p>
                  <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 font-mono text-[11px]">
                    <dt className="text-muted-foreground">span.start</dt>
                    <dd>{monthYear(start)}</dd>
                    <dt className="text-muted-foreground">span.end</dt>
                    <dd>{live ? <span className="text-ok">in-flight</span> : monthYear(end)}</dd>
                    <dt className="text-muted-foreground">span.kind</dt>
                    <dd>{exp.type.toLowerCase()}</dd>
                    <dt className="text-muted-foreground">attributes</dt>
                    <dd className="flex flex-wrap gap-1.5">
                      {exp.tags.map((t) => (
                        <span key={t} className="rounded border bg-background px-1.5 py-px">
                          {t}
                        </span>
                      ))}
                    </dd>
                  </dl>
                </div>
              </div>
            </details>
          </li>
        ))}
      </ol>

      {/* pre-training (education) as the root's earlier context */}
      <div id="education" className="border-t bg-muted/30 px-4 py-4 sm:px-5">
        <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">pre-training</p>
        <ul className="mt-2 grid gap-2 sm:grid-cols-2">
          {education.map((e) => (
            <li key={e.institution} className="text-sm">
              <span className="font-medium">
                {e.institutionUrl ? (
                  <a href={e.institutionUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                    {e.institution}
                  </a>
                ) : (
                  e.institution
                )}
              </span>
              <span className="text-muted-foreground"> · {e.degree}</span>
              <span className="block font-mono text-[11px] text-muted-foreground">{e.period}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
