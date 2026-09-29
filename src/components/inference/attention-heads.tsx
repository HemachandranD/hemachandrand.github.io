import type { CSSProperties } from "react";

import { BlurFade } from "@/components/magicui/blur-fade";
import { SkillIcon } from "@/components/skill-icon";
import { r3 } from "@/lib/utils";
import { skills } from "@/data/portfolio";

const N = 12;

// Three textbook attention patterns, one per discipline. Causal (lower
// triangle), row-normalised, drawn as a heatmap.
const PATTERNS: { name: string; weight: (i: number, j: number) => number }[] = [
  // agents plan step by step: each position leans on the one before
  { name: "previous-token", weight: (i, j) => (j === i - 1 ? 6 : j === i ? 2 : 0.25) },
  // observability looks back at matching earlier events: induction stripes
  { name: "induction", weight: (i, j) => (i - j === 4 || i - j === 8 ? 5 : j === i ? 1 : 0.2) },
  // mlops keeps everything anchored to the baseline: an attention sink
  { name: "attention-sink", weight: (i, j) => (j === 0 ? 6 : j === i ? 1.5 : 0.3) },
];

function matrix(w: (i: number, j: number) => number) {
  return Array.from({ length: N }, (_, i) => {
    const row = Array.from({ length: N }, (_, j) => (j <= i ? w(i, j) : 0));
    const sum = row.reduce((a, b) => a + b, 0);
    return row.map((v) => v / sum);
  });
}

function Heatmap({ pattern }: { pattern: (typeof PATTERNS)[number] }) {
  const m = matrix(pattern.weight);
  const cell = 100 / N;
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className="aspect-square w-full rounded-md border bg-background">
      {m.flatMap((row, i) =>
        row.map((v, j) =>
          j <= i ? (
            <rect
              key={`${i}-${j}`}
              className="prob"
              x={r3(j * cell + 0.6)}
              y={r3(i * cell + 0.6)}
              width={r3(cell - 1.2)}
              height={r3(cell - 1.2)}
              rx={1.2}
              style={{ "--p": r3(Math.min(1, v * 1.4)), fill: "var(--prob-color)", opacity: r3(0.12 + Math.min(1, v * 2.2) * 0.88) } as CSSProperties}
            />
          ) : null,
        ),
      )}
    </svg>
  );
}

// "What I build" as three attention heads.
export function AttentionHeads({ detailed = false, headingLevel = "h3" }: { detailed?: boolean; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {skills.map((area, i) => {
        const tools = detailed ? area.items : area.items.slice(0, 4);
        return (
          <BlurFade key={area.category} inView delay={i * 0.07} className="h-full">
            <article className="group flex h-full flex-col rounded-2xl border bg-card p-5 transition-colors hover:border-foreground/20">
              <div className="grid grid-cols-[1fr_5.5rem] gap-4">
                <div>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    head {i}.{[0, 3, 7][i]} · {PATTERNS[i].name}
                  </p>
                  <span className="mt-3 flex size-9 items-center justify-center rounded-lg border bg-muted/50">
                    <SkillIcon name={area.icon} className="size-4" />
                  </span>
                </div>
                <Heatmap pattern={PATTERNS[i]} />
              </div>
              <Heading className="mt-4 font-serif text-3xl leading-none">{area.category}</Heading>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{area.summary}</p>
              <ul className="mt-auto flex flex-wrap gap-1.5 pt-5 font-mono text-[11px]" aria-label={`${area.category} tools`}>
                {tools.map((tool) => (
                  <li key={tool} className="rounded border bg-background px-1.5 py-0.5">
                    {tool}
                  </li>
                ))}
                {!detailed && area.items.length > tools.length && (
                  <li className="px-1.5 py-0.5 text-muted-foreground">+{area.items.length - tools.length}</li>
                )}
              </ul>
            </article>
          </BlurFade>
        );
      })}
    </div>
  );
}
