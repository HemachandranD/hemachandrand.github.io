"use client";

import Link from "next/link";
import type { CSSProperties } from "react";

import { cn, r3 } from "@/lib/utils";
import { projectCategories, projects, type Project, type ProjectCategory } from "@/data/portfolio";

// Where each domain's cluster sits in the (made-up, but stable) 2D space.
const CLUSTERS: Record<ProjectCategory, { x: number; y: number; color: string }> = {
  "Agents & Tools": { x: 27, y: 32, color: "var(--brand-amber)" },
  Observability: { x: 62, y: 22, color: "var(--brand-rose)" },
  "MLOps & LLMOps": { x: 78, y: 62, color: "var(--brand-violet)" },
  "RAG & LLMs": { x: 46, y: 70, color: "var(--brand-ember)" },
  "Vision & Audio": { x: 16, y: 74, color: "var(--ok)" },
};

// Related domains get a faint bridge between their clusters.
const BRIDGES: [ProjectCategory, ProjectCategory][] = [
  ["Agents & Tools", "Observability"],
  ["Observability", "MLOps & LLMOps"],
  ["MLOps & LLMOps", "RAG & LLMs"],
  ["RAG & LLMs", "Agents & Tools"],
  ["RAG & LLMs", "Vision & Audio"],
];

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

// Each project lands near its cluster, at a position fixed by its id.
const POINTS = (() => {
  const byCat = new Map<ProjectCategory, number>();
  return projects.map((p) => {
    const c = CLUSTERS[p.category];
    const k = byCat.get(p.category) ?? 0;
    byCat.set(p.category, k + 1);
    const h = hash(p.id);
    const angle = (k * 137.5 + (h % 60)) * (Math.PI / 180);
    const r = k === 0 ? 4 : 7 + (h % 5);
    return {
      project: p,
      x: r3(Math.min(92, Math.max(8, c.x + Math.cos(angle) * r * 1.25))),
      y: r3(Math.min(90, Math.max(10, c.y + Math.sin(angle) * r))),
      size: 8 + Math.max(0, p.year - 2022) * 2,
      color: c.color,
    };
  });
})();

// The rest of the latent space: faint, fixed points that make the
// projects read as samples from a much bigger distribution.
const DUST = (() => {
  let seed = 2018;
  const rand = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const centers = Object.values(CLUSTERS);
  return Array.from({ length: 140 }, (_, i) => {
    const c = centers[i % centers.length];
    const spread = i % 3 === 0 ? 40 : 14;
    // Box–Muller for a soft gaussian cloud around each cluster
    const r = Math.sqrt(-2 * Math.log(rand() + 1e-9));
    const a = rand() * Math.PI * 2;
    return {
      x: r3(Math.min(98, Math.max(2, c.x + Math.cos(a) * r * spread * 0.5))),
      y: r3(Math.min(97, Math.max(3, c.y + Math.sin(a) * r * spread * 0.4))),
      o: r3(0.08 + rand() * 0.22),
      c: c.color,
    };
  });
})();

// Put each cluster's label on the side of the cluster its points avoid.
const LABELS = Object.fromEntries(
  (Object.keys(CLUSTERS) as ProjectCategory[]).map((cat) => {
    const c = CLUSTERS[cat];
    const pts = POINTS.filter((p) => p.project.category === cat);
    const dy = pts.reduce((sum, p) => sum + (p.y - c.y), 0) / Math.max(1, pts.length);
    const y = c.y + (dy > 0 ? -15 : 15);
    return [cat, { x: c.x, y: r3(Math.min(92, Math.max(8, y))) }];
  }),
) as Record<ProjectCategory, { x: number; y: number }>;

type Props = {
  className?: string;
  /** "link": points navigate to the projects page. "select": points call onSelect. */
  mode?: "link" | "select";
  highlighted?: string | null;
  onHighlight?: (id: string | null) => void;
  onSelect?: (p: Project) => void;
  filter?: ProjectCategory | "All";
  onFilter?: (c: ProjectCategory | "All") => void;
};

export function EmbeddingMap({
  className,
  mode = "link",
  highlighted = null,
  onHighlight,
  onSelect,
  filter = "All",
  onFilter,
}: Props) {
  const dim = (c: ProjectCategory) => filter !== "All" && filter !== c;

  return (
    <figure
      className={cn(
        "bg-grid relative aspect-[4/5] overflow-hidden rounded-2xl border bg-card sm:aspect-[16/9] lg:aspect-[21/9]",
        className,
      )}
      aria-label="Projects plotted in a two-dimensional embedding space, clustered by domain"
    >
      {/* axes */}
      <span aria-hidden="true" className="absolute bottom-2 left-3 font-mono text-[10px] text-muted-foreground">
        dim₀ →
      </span>
      <span aria-hidden="true" className="absolute top-3 left-3 font-mono text-[10px] text-muted-foreground">
        ↑ dim₁
      </span>
      <figcaption className="absolute right-3 bottom-2 font-mono text-[10px] text-muted-foreground">
        t-SNE · {projects.length} projects · seed 2018
      </figcaption>

      <div aria-hidden="true" className="absolute inset-0">
        {DUST.map((d, i) => (
          <span
            key={i}
            className="absolute size-[3px] -translate-1/2 rounded-full"
            style={{ left: `${d.x}%`, top: `${d.y}%`, background: d.c, opacity: d.o }}
          />
        ))}
      </div>

      <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
        {BRIDGES.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={CLUSTERS[a].x}
            y1={CLUSTERS[a].y}
            x2={CLUSTERS[b].x}
            y2={CLUSTERS[b].y}
            stroke="currentColor"
            strokeOpacity={dim(a) || dim(b) ? 0.05 : 0.14}
            strokeDasharray="1 1.5"
            vectorEffect="non-scaling-stroke"
            className="text-foreground"
          />
        ))}
        {projectCategories.map((cat) => (
          <line
            key={cat}
            x1={CLUSTERS[cat].x}
            y1={CLUSTERS[cat].y}
            x2={LABELS[cat].x}
            y2={LABELS[cat].y}
            stroke={CLUSTERS[cat].color}
            strokeOpacity={dim(cat) ? 0.06 : 0.3}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {POINTS.map((pt) => {
          const c = CLUSTERS[pt.project.category];
          return (
            <line
              key={pt.project.id}
              x1={c.x}
              y1={c.y}
              x2={pt.x}
              y2={pt.y}
              stroke={pt.color}
              strokeOpacity={dim(pt.project.category) ? 0.08 : highlighted === pt.project.id ? 0.9 : 0.35}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>

      {/* cluster labels */}
      {projectCategories.map((cat) => {
        const c = CLUSTERS[cat];
        const label = (
          <>
            <span className="size-1.5 rounded-full" style={{ background: c.color }} aria-hidden="true" />
            {cat}
          </>
        );
        const cls = cn(
          "absolute z-10 flex -translate-1/2 items-center gap-1.5 rounded-full border bg-background/85 px-2 py-0.5 font-mono text-[10px] whitespace-nowrap backdrop-blur transition-opacity",
          dim(cat) ? "opacity-40" : "opacity-100",
        );
        const style = { left: `${LABELS[cat].x}%`, top: `${LABELS[cat].y}%` } as CSSProperties;
        return onFilter ? (
          <button
            key={cat}
            type="button"
            aria-pressed={filter === cat}
            onClick={() => onFilter(filter === cat ? "All" : cat)}
            className={cn(cls, "hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none")}
            style={style}
          >
            {label}
          </button>
        ) : (
          <span key={cat} className={cls} style={style}>
            {label}
          </span>
        );
      })}

      {/* points */}
      {POINTS.map((pt) => {
        const p = pt.project;
        const on = highlighted === p.id;
        const cls = cn(
          "group absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full p-2 focus-visible:outline-none",
          dim(p.category) && "opacity-25",
        );
        const style = { left: `${pt.x}%`, top: `${pt.y}%` } as CSSProperties;
        const inner = (
          <>
            <span
              className={cn(
                "block rounded-full ring-2 ring-background transition-transform duration-200 group-hover:scale-150 group-focus-visible:scale-150 group-focus-visible:ring-ring",
                on && "scale-150",
              )}
              style={{ width: pt.size, height: pt.size, background: pt.color, boxShadow: `0 0 ${on ? 18 : 10}px ${pt.color}` }}
            />
            <span
              className={cn(
                "pointer-events-none absolute top-1/2 left-full ml-1 -translate-y-1/2 rounded bg-foreground px-1.5 py-0.5 font-mono text-[10px] whitespace-nowrap text-background opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100",
                on && "opacity-100",
                pt.x > 70 && "right-full left-auto mr-1 ml-0",
              )}
            >
              {p.title} · {p.year}
            </span>
          </>
        );
        const handlers = {
          onPointerEnter: () => onHighlight?.(p.id),
          onPointerLeave: () => onHighlight?.(null),
          onFocus: () => onHighlight?.(p.id),
          onBlur: () => onHighlight?.(null),
        };
        return mode === "link" ? (
          <Link key={p.id} href={`/projects/#${p.id}`} aria-label={`${p.title} (${p.category}, ${p.year})`} className={cls} style={style} {...handlers}>
            {inner}
          </Link>
        ) : (
          <button
            key={p.id}
            type="button"
            aria-label={`${p.title} (${p.category}, ${p.year})`}
            onClick={() => onSelect?.(p)}
            className={cls}
            style={style}
            {...handlers}
          >
            {inner}
          </button>
        );
      })}
    </figure>
  );
}
