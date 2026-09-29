import { ArrowUpRight, BookOpen, Globe } from "lucide-react";

import { MagicCard } from "@/components/magicui/magic-card";
import { ProjectCover } from "@/components/project-cover";
import { GitHubIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/portfolio";

export function ProjectCard({
  project,
  className,
  headingLevel = "h3",
}: {
  project: Project;
  className?: string;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const actions = [
    project.liveUrl && { href: project.liveUrl, label: "Live demo", icon: Globe },
    project.githubUrl && { href: project.githubUrl, label: "Code", icon: GitHubIcon },
    project.articleUrl && { href: project.articleUrl, label: "Write-up", icon: BookOpen },
  ].filter(Boolean) as { href: string; label: string; icon: typeof Globe }[];

  return (
    <MagicCard
      id={project.id}
      className={cn(
        "flex h-full flex-col transition-shadow duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/30",
        className,
      )}
    >
      <article className="group/card flex h-full flex-col">
        <div className="relative aspect-[16/8] overflow-hidden border-b bg-muted/30 text-foreground">
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
          <Badge variant="outline" className="absolute top-3 left-3 border-border/60 bg-background/70 backdrop-blur">
            {project.category}
          </Badge>
          <span className="absolute top-3 right-3 rounded-full bg-background/70 px-2 py-0.5 font-mono text-[11px] text-muted-foreground backdrop-blur">
            {project.year}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div>
            <Heading className="text-lg font-semibold tracking-tight">{project.title}</Heading>
            <p className="text-sm text-muted-foreground">{project.subtitle}</p>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground/90">{project.description}</p>
          <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
            {project.tags.map((tag) => (
              <li key={tag}>
                <Badge variant="secondary" className="font-normal">
                  {tag}
                </Badge>
              </li>
            ))}
          </ul>
          {actions.length > 0 && (
            <div className="mt-auto flex flex-wrap gap-2 pt-2">
              {actions.map(({ href, label, icon: Icon }) => (
                <Button key={label} asChild variant="outline" size="sm" className="bg-background/60">
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    <Icon />
                    {label}
                    <ArrowUpRight className="-ml-0.5 size-3.5 opacity-60" />
                    <span className="sr-only">(opens {project.title} in a new tab)</span>
                  </a>
                </Button>
              ))}
            </div>
          )}
        </div>
      </article>
    </MagicCard>
  );
}
