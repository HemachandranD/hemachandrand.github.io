"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Search, X } from "lucide-react";

import { BlurFade } from "@/components/magicui/blur-fade";
import { EmbeddingMap } from "@/components/inference/embedding-map";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { jumpToHash } from "@/lib/jump-to-hash";
import { cn } from "@/lib/utils";
import { projectCategories, projects, type ProjectCategory } from "@/data/portfolio";

type Filter = "All" | ProjectCategory;

const subscribeHash = (cb: () => void) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};
const readHash = () => decodeURIComponent(location.hash.slice(1));

const matches = (q: string) => (p: (typeof projects)[number]) =>
  !q ||
  [p.title, p.subtitle, p.description, p.category, ...p.tags].join(" ").toLowerCase().includes(q);

export function ProjectsExplorer() {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");
  // Cards are server-rendered visible; only later filter changes animate.
  const [touched, setTouched] = useState(false);
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const q = query.trim().toLowerCase();
  const target = useSyncExternalStore(subscribeHash, readHash, () => "");

  // A link to a specific project (#id) clears any filter hiding it.
  useEffect(() => {
    const onHash = () => {
      const id = readHash();
      if (!projects.some((p) => p.id === id)) return;
      // only clear filters that are hiding the target
      if (!document.getElementById(id)) {
        setFilter("All");
        setQuery("");
      }
      requestAnimationFrame(() =>
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" }),
      );
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const counts = Object.fromEntries(
    projectCategories.map((c) => [c, projects.filter((p) => p.category === c).length]),
  ) as Record<ProjectCategory, number>;

  const visible = projects.filter((p) => (filter === "All" || p.category === filter) && matches(q)(p));

  const pickFilter = (c: Filter) => {
    setFilter(c);
    setTouched(true);
  };

  return (
    <>
      <section id="map" data-span="embeddings" aria-label="Project map" className="mb-10">
        <EmbeddingMap
          mode="select"
          filter={filter}
          onFilter={pickFilter}
          highlighted={highlighted}
          onHighlight={setHighlighted}
          onSelect={(p) => {
            if (!visible.some((v) => v.id === p.id)) {
              setFilter("All");
              setQuery("");
            }
            requestAnimationFrame(() => jumpToHash(p.id));
          }}
        />
      </section>

      <section id="results" data-span="results" aria-label="Projects">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div
            role="group"
            aria-label="Filter by category"
            className="-mx-4 -my-1 flex gap-2 overflow-x-auto px-4 py-1 [scrollbar-width:none] sm:mx-0 sm:my-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:py-0 [&::-webkit-scrollbar]:hidden"
          >
            {(["All", ...projectCategories] as Filter[]).map((c) => {
              const active = filter === c;
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={active}
                  onClick={() => pickFilter(c)}
                  className={cn(
                    "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border px-3.5 font-mono text-xs whitespace-nowrap transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
                    active
                      ? "border-transparent bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  {c}
                  <span className={cn("font-mono text-[11px]", active ? "opacity-70" : "opacity-60")}>
                    {c === "All" ? projects.length : counts[c]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full shrink-0 lg:w-64">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setTouched(true);
              }}
              placeholder="Filter by name or tech…"
              aria-label="Filter projects by name or technology"
              className="h-9 rounded-full pr-9 pl-9 [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear filter"
                className="absolute top-1/2 right-2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        <p aria-live="polite" className="sr-only">
          {visible.length} {visible.length === 1 ? "project" : "projects"} shown
        </p>

        {visible.length > 0 ? (
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((p, i) => (
              <li key={`${filter}-${q}-${p.id}`} className="h-full">
                {touched ? (
                  <BlurFade delay={Math.min(i, 6) * 0.04} className="h-full">
                    <ProjectCard
                    project={p}
                    headingLevel="h2"
                    highlighted={highlighted === p.id}
                    onHighlight={setHighlighted}
                    className={cn(target === p.id && "flash")}
                  />
                  </BlurFade>
                ) : (
                  <ProjectCard
                    project={p}
                    headingLevel="h2"
                    highlighted={highlighted === p.id}
                    onHighlight={setHighlighted}
                    className={cn(target === p.id && "flash")}
                  />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed px-6 py-16 text-center">
            <p className="font-medium">
              {query ? <>No projects match “{query.trim()}”{filter !== "All" && ` in ${filter}`}.</> : "No projects here yet."}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setQuery("");
                setFilter("All");
              }}
            >
              Reset filters
            </Button>
          </div>
        )}
      </section>
    </>
  );
}
