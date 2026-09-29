import type { Metadata } from "next";

import { BlurFade } from "@/components/magicui/blur-fade";
import { AttentionHeads } from "@/components/inference/attention-heads";
import { StackArchitecture } from "@/components/inference/stack-architecture";
import { SectionHeading } from "@/components/section-heading";
import { industries, yearsOfExperience } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "AI engineering end to end: agentic systems, LLM observability, MLOps & LLMOps, plus retrieval, fine-tuning, data engineering and cloud.",
  alternates: { canonical: "/skills/" },
  openGraph: { url: "/skills/" },
};

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-28 px-4 pt-14 pb-28 sm:px-6 sm:pt-20">
      <section id="heads" data-span="heads" aria-labelledby="skills-title">
        <div className="enter">
          <SectionHeading
            as="h1"
            id="skills-title"
            eyebrow="Skills"
            title={
              <>
                AI engineering, <em>end to end.</em>
              </>
            }
            description={`${yearsOfExperience}+ years building the parts of AI that have to work every day: agents, the observability to trust them, and the MLOps to ship them, plus everything underneath.`}
          />
        </div>
        <AttentionHeads detailed headingLevel="h2" />
        <BlurFade inView>
          <p className="mt-6 flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
            deployed in
            {industries.map((name) => (
              <span key={name} className="rounded-full border bg-card px-2.5 py-1 text-foreground">
                {name.toLowerCase()}
              </span>
            ))}
          </p>
        </BlurFade>
      </section>

      <section id="architecture" data-span="architecture" aria-labelledby="architecture-title">
        <BlurFade inView>
          <SectionHeading
            index="→"
            eyebrow="The full stack"
            id="architecture-title"
            title={
              <>
                Drawn like a <em>model.</em>
              </>
            }
            description="Layers from infrastructure up to agents, read bottom to top like a forward pass. Observability and MLOps aren't layers: they're the side streams that run through all of them."
          />
        </BlurFade>
        <BlurFade inView delay={0.05}>
          <StackArchitecture />
        </BlurFade>
      </section>
    </div>
  );
}
