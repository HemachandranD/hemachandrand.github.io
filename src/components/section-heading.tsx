import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  as: Tag = "h2",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={cn("mb-8 flex flex-wrap items-end justify-between gap-4", className)}>
      <div className="max-w-2xl">
        <p className="mb-2 font-mono text-xs font-medium tracking-widest text-muted-foreground uppercase">
          <span className="text-gradient">{"//"}</span> {eyebrow}
        </p>
        <Tag
          className={cn(
            "font-semibold tracking-tight text-balance",
            Tag === "h1" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl",
          )}
        >
          {title}
        </Tag>
        {description && (
          <p className="mt-3 text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
