import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  action,
  as: Tag = "h2",
  id,
  className,
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  as?: "h1" | "h2";
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 flex flex-wrap items-end justify-between gap-4", className)}>
      <div className="max-w-2xl">
        <p className="mb-3 flex items-center gap-2 font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
          {index && <span className="text-brand-rose">{index}</span>}
          {eyebrow}
        </p>
        <Tag
          id={id}
          className={cn(
            "font-serif leading-[0.95] text-balance",
            Tag === "h1" ? "text-6xl sm:text-7xl" : "text-5xl sm:text-6xl",
          )}
        >
          {title}
        </Tag>
        {description && (
          <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
