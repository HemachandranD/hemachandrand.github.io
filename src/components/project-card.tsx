"use client";

import { ArrowUpRight } from "lucide-react";

import { ProjectCover } from "@/components/project-cover";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/portfolio";

export function ProjectCard({
  project,
  className,
  headingLevel = "h3",
  highlighted = false,
  onHighlight,
}: {
  project: Project;
  className?: string;
  headingLevel?: "h2" | "h3";
  highlighted?: boolean;
  onHighlight?: (id: string | null) => void;
}) {
  const Heading = headingLevel;
  const actions = [
    project.liveUrl && { href: project.liveUrl, label: "live" },
    project.githubUrl && { href: project.githubUrl, label: "code" },
    project.articleUrl && { href: project.articleUrl, label: "write-up" },
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <div
      id={project.id}
      onPointerEnter={() => onHighlight?.(project.id)}
      onPointerLeave={() => onHighlight?.(null)}
      className={cn(
        "group/card flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-[border-color,box-shadow,transform] duration-300",
        "hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-[0_20px_50px_-30px_rgb(0_0_0/0.45)]",
        highlighted && "-translate-y-0.5 border-foreground/40",
        className,
      )}
    >
      <article className="flex h-full flex-col">
        <div className="relative aspect-[16/7] overflow-hidden border-b bg-muted/30 text-foreground">
          {project.image ? (
            // eslint-disable-next-line @next/next/no-img-element -- static export, no optimizer
            <img
              src={project.image}
              alt=""
              loading="lazy"
              decoding="async"
              className="size-full object-cover transition-transform duration-500 group-hover/card:scale-[1.03]"
            />
          ) : (
            <ProjectCover
              id={project.id}
              className="size-full transition-transform duration-700 ease-out group-hover/card:scale-[1.06]"
            />
          )}
          <span className="absolute top-3 left-3 rounded-full border bg-background/80 px-2 py-0.5 font-mono text-[10px] backdrop-blur">
            {project.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <p className="font-mono text-[11px] text-muted-foreground">
            {project.id} · {project.year}
          </p>
          <Heading className="mt-1 font-serif text-3xl leading-none">{project.title}</Heading>
          <p className="mt-1.5 text-sm text-muted-foreground italic">{project.subtitle}</p>
          <p className="mt-3 text-sm leading-relaxed text-pretty text-muted-foreground">{project.description}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5 font-mono text-[11px]" aria-label="Technologies">
            {project.tags.map((tag) => (
              <li key={tag} className="rounded border bg-background px-1.5 py-0.5">
                {tag}
              </li>
            ))}
          </ul>
          {actions.length > 0 && (
            <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 border-t pt-4 font-mono text-xs">
              {actions.map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-sm underline-offset-4 hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  → {label}
                  <ArrowUpRight className="size-3 opacity-50" aria-hidden="true" />
                  <span className="sr-only">(opens {project.title} in a new tab)</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
