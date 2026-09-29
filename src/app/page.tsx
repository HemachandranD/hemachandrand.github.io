import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

import { BlurFade } from "@/components/magicui/blur-fade";
import { AttentionHeads } from "@/components/inference/attention-heads";
import { CareerTrace } from "@/components/inference/career-trace";
import { EmbeddingMap } from "@/components/inference/embedding-map";
import { InferenceHero } from "@/components/inference/inference-hero";
import { ProfileCard } from "@/components/inference/profile-card";
import { ToolCall } from "@/components/inference/tool-call";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { ContactButton } from "@/components/site/actions";
import { DynamicIsland } from "@/components/site/dynamic-island";
import { GitHubIcon, LinkedInIcon, MediumIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { links, profile, projects, yearsOfExperience } from "@/data/portfolio";

import { FrauncesName } from "./name-font";

export const metadata = { alternates: { canonical: "/" } };

const socials = [
  { href: links.github, label: "GitHub", icon: GitHubIcon },
  { href: links.linkedin, label: "LinkedIn", icon: LinkedInIcon },
  { href: links.medium, label: "Medium", icon: MediumIcon },
];

export default function HomePage() {
  return (
    <>
      {/* ============ Prompt / output ============ */}
      <section id="top" data-span="prompt" aria-label="Introduction" className={`relative overflow-hidden ${FrauncesName.variable}`}>
        <div aria-hidden="true" className="bg-grid mask-fade-b absolute inset-0 -z-10" />
        <div
          aria-hidden="true"
          className="bg-brand-gradient absolute -top-40 right-[-10%] -z-10 h-96 w-[40rem] max-w-full rounded-full opacity-[0.10] blur-3xl dark:opacity-[0.14]"
        />
        <div className="mx-auto max-w-6xl px-4 pt-10 pb-20 sm:px-6 sm:pt-14 lg:pb-28">
          <InferenceHero
            status={<DynamicIsland />}
            actions={
              <div className="flex flex-wrap items-center gap-3">
                <ContactButton variant="brand" size="lg">
                  <Mail /> Get in touch
                </ContactButton>
                <Button asChild variant="outline" size="lg" className="bg-background/60 backdrop-blur">
                  <Link href="/projects/">
                    See the work <ArrowRight />
                  </Link>
                </Button>
                <div className="flex items-center gap-0.5 sm:ml-1">
                  {socials.map(({ href, label, icon: Icon }) => (
                    <Button key={label} asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                        <Icon />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            }
          />
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-28 px-4 pb-28 sm:space-y-36 sm:px-6">
        {/* ============ About ============ */}
        <section id="about" data-span="profile" aria-labelledby="about-title">
          <BlurFade inView>
            <SectionHeading
              index="01"
              eyebrow="About"
              id="about-title"
              title={
                <>
                  Demos are easy. <em className="text-muted-foreground">Production is the point.</em>
                </>
              }
            />
          </BlurFade>
          <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
            <BlurFade inView delay={0.05}>
              <div className="space-y-5 text-lg leading-relaxed text-pretty text-muted-foreground">
                {profile.about.map((p, i) => (
                  <p key={p.slice(0, 24)} className={i === 0 ? "font-serif text-3xl leading-snug text-foreground sm:text-[2.1rem]" : undefined}>
                    {p}
                  </p>
                ))}
              </div>
            </BlurFade>
            <BlurFade inView delay={0.1}>
              <ProfileCard />
            </BlurFade>
          </div>
        </section>

        {/* ============ Expertise ============ */}
        <section id="expertise" data-span="heads" aria-labelledby="expertise-title">
          <BlurFade inView>
            <SectionHeading
              index="02"
              eyebrow="What I build"
              id="expertise-title"
              title={
                <>
                  Three heads, <em>one model.</em>
                </>
              }
              description="The three disciplines that decide whether an AI system survives contact with real users, each drawn as the attention pattern it most resembles."
              action={
                <Button asChild variant="ghost" className="font-mono text-xs text-muted-foreground">
                  <Link href="/skills/">
                    full architecture <ArrowRight />
                  </Link>
                </Button>
              }
            />
          </BlurFade>
          <AttentionHeads />
        </section>

        {/* ============ Experience ============ */}
        <section id="experience" data-span="career" aria-labelledby="experience-title">
          <BlurFade inView>
            <SectionHeading
              index="03"
              eyebrow="Experience"
              id="experience-title"
              title={
                <>
                  The career, <em>as a trace.</em>
                </>
              }
              description={`${yearsOfExperience}+ years, one long-running span. Open a span to read its attributes.`}
            />
          </BlurFade>
          <BlurFade inView delay={0.05}>
            <CareerTrace />
          </BlurFade>
        </section>

        {/* ============ Work ============ */}
        <section id="work" data-span="embeddings" aria-labelledby="work-title">
          <BlurFade inView>
            <SectionHeading
              index="04"
              eyebrow="Selected work"
              id="work-title"
              title={
                <>
                  Projects, <em>embedded.</em>
                </>
              }
              description="Every project plotted in a latent space, clustered by domain. Newer work glows brighter. Pick a point to open it."
              action={
                <Button asChild variant="ghost" className="font-mono text-xs text-muted-foreground">
                  <Link href="/projects/">
                    all {projects.length} projects <ArrowRight />
                  </Link>
                </Button>
              }
            />
          </BlurFade>
          <BlurFade inView delay={0.05}>
            <EmbeddingMap />
          </BlurFade>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p, i) => (
              <BlurFade key={p.id} inView delay={i * 0.06} className="h-full">
                <ProjectCard project={p} />
              </BlurFade>
            ))}
          </div>
        </section>

        {/* ============ Contact ============ */}
        <section id="contact" data-span="send()" aria-labelledby="contact-title">
          <BlurFade inView>
            <ToolCall />
          </BlurFade>
        </section>
      </div>
    </>
  );
}
