import { ArrowUpRight } from "lucide-react";

import { BlurFade } from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { experience, type Experience } from "@/data/portfolio";

// Rendered at build time; the site rebuilds monthly so "Present" and
// durations stay current.
const BUILT_AT = new Date();
const toDate = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return new Date(y, m - 1);
};
const monthYear = (d: Date) => d.toLocaleString("en-US", { month: "short", year: "numeric" });

function span(exp: Experience) {
  const start = toDate(exp.start);
  const end = exp.end ? toDate(exp.end) : BUILT_AT;
  const months = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
  const y = Math.floor(months / 12);
  const mo = months % 12;
  const duration = [y && `${y} yr${y > 1 ? "s" : ""}`, mo && `${mo} mo${mo > 1 ? "s" : ""}`]
    .filter(Boolean)
    .join(" ");
  return {
    start,
    end,
    label: `${monthYear(start)} — ${exp.end ? monthYear(end) : "Present"}`,
    duration,
  };
}

const spans = experience.map(span);
const first = Math.min(...spans.map((s) => s.start.getTime()));
const pct = (t: number) => ((t - first) / (BUILT_AT.getTime() - first)) * 100;

export function ExperienceTimeline() {

  return (
    <ol className="relative space-y-6 before:absolute before:top-2 before:bottom-2 before:left-[7px] before:w-px before:bg-border sm:space-y-8">
      {experience.map((exp, i) => {
        const s = spans[i];
        const current = !exp.end;
        return (
          <li key={exp.company} className="relative pl-8 sm:pl-10">
            <span
              aria-hidden="true"
              className="absolute top-1.5 left-0 flex size-[15px] items-center justify-center rounded-full border bg-background"
            >
              <span className={current ? "bg-brand-gradient size-[7px] rounded-full" : "size-[7px] rounded-full bg-muted-foreground/40"} />
              {current && <span className="bg-brand-gradient absolute inset-0 animate-ping rounded-full opacity-30" />}
            </span>

            <BlurFade inView delay={i * 0.06}>
              <div className="rounded-2xl border bg-card p-5 transition-colors hover:bg-accent/30 sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold tracking-tight">{exp.title}</h3>
                  <p className="font-mono text-xs text-muted-foreground">
                    <time dateTime={exp.start}>{s.label}</time>
                    {s.duration && <span className="text-muted-foreground/70"> · {s.duration}</span>}
                  </p>
                </div>
                <p className="mt-0.5 text-sm">
                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-0.5 font-medium text-foreground/90 underline-offset-4 hover:underline"
                    >
                      {exp.company}
                      <ArrowUpRight className="size-3.5 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  ) : (
                    <span className="font-medium">{exp.company}</span>
                  )}
                  <span className="text-muted-foreground"> · {exp.type}</span>
                  {current && (
                    <Badge variant="outline" className="ml-2 border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      Current
                    </Badge>
                  )}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{exp.description}</p>

                {/* where this role sits on the whole career, trace-style */}
                <div
                  className="relative mt-4 h-1 overflow-hidden rounded-full bg-muted"
                  role="img"
                  aria-label={`${s.label} on a career timeline starting ${monthYear(new Date(first))}`}
                >
                  <span
                    className="bg-brand-gradient absolute inset-y-0 rounded-full"
                    style={{ left: `${pct(s.start.getTime())}%`, width: `${Math.max(pct(s.end.getTime()) - pct(s.start.getTime()), 3)}%` }}
                  />
                </div>

                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Focus areas">
                  {exp.tags.map((tag) => (
                    <li key={tag}>
                      <Badge variant="secondary" className="font-normal">
                        {tag}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </BlurFade>
          </li>
        );
      })}
    </ol>
  );
}
