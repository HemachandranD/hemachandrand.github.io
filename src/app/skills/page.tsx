import type { Metadata } from "next";

import { BlurFade } from "@/components/magicui/blur-fade";
import { Marquee } from "@/components/magicui/marquee";
import { ExpertiseGrid } from "@/components/expertise-grid";
import { SectionHeading } from "@/components/section-heading";
import { SkillIcon } from "@/components/skill-icon";
import { Badge } from "@/components/ui/badge";
import { industries, stackSkills, toolbox, yearsOfExperience } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "AI engineering end to end: agentic systems, LLM observability, MLOps & LLMOps, plus retrieval, fine-tuning, data engineering and cloud.",
  alternates: { canonical: "/skills/" },
  openGraph: { url: "/skills/" },
};

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-20 px-4 pt-14 pb-24 sm:px-6 sm:pt-20">
      <div className="enter">
        <SectionHeading
          as="h1"
          eyebrow="Skills"
          title="AI engineering, end to end."
          description={`${yearsOfExperience}+ years building the parts of AI that have to work every day: agents, the observability to trust them, and the MLOps to ship them, plus everything underneath.`}
          className="mb-10"
        />
        <ExpertiseGrid detailed headingLevel="h2" />
      </div>

      <BlurFade inView>
        <div className="flex flex-wrap items-center justify-center gap-3 rounded-2xl border bg-card px-6 py-5 text-center">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Built for</span>
          {industries.map((name) => (
            <Badge key={name} variant="outline" className="px-3 py-1 text-sm">
              {name}
            </Badge>
          ))}
        </div>
      </BlurFade>

      <section aria-labelledby="stack-title">
        <BlurFade inView>
          <SectionHeading
            eyebrow="Across the stack"
            title={<span id="stack-title">Everything underneath</span>}
            description="The rest of the AI engineering stack that the agents, observability and platforms stand on."
          />
        </BlurFade>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stackSkills.map((area, i) => (
            <BlurFade key={area.category} inView delay={(i % 3) * 0.06} className="h-full">
              <article className="flex h-full flex-col rounded-2xl border bg-card p-6 transition-colors hover:bg-accent/30">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg border bg-muted/50">
                    <SkillIcon name={area.icon} className="size-4" />
                  </span>
                  <h3 className="font-semibold tracking-tight">{area.category}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{area.summary}</p>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-4" aria-label={`${area.category} tools`}>
                  {area.items.map((tool) => (
                    <li key={tool}>
                      <Badge variant="secondary" className="font-normal">
                        {tool}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </article>
            </BlurFade>
          ))}
        </div>
      </section>

      <section aria-label="Toolbox" className="relative">
        <p className="sr-only">Tools I work with: {toolbox.join(", ")}.</p>
        <div aria-hidden="true" className="mask-fade-x">
          <Marquee pauseOnHover className="[--duration:60s]">
            {toolbox.map((t) => (
              <span key={t} className="rounded-full border bg-card px-4 py-1.5 text-sm whitespace-nowrap text-muted-foreground">
                {t}
              </span>
            ))}
          </Marquee>
        </div>
      </section>
    </div>
  );
}
