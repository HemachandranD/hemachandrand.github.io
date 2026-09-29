import Link from "next/link";
import type { CSSProperties } from "react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  Cloud,
  Database,
  GraduationCap,
  Mail,
  Workflow,
} from "lucide-react";

import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { Marquee } from "@/components/magicui/marquee";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { WordRotate } from "@/components/magicui/word-rotate";
import { ExpertiseGrid } from "@/components/expertise-grid";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { ContactButton, CopyEmailButton } from "@/components/site/actions";
import { StatusPill } from "@/components/site/status-pill";
import { GitHubIcon, LinkedInIcon, MediumIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  education,
  experience,
  industries,
  links,
  profile,
  projects,
  skills,
  toolbox,
  yearsOfExperience,
} from "@/data/portfolio";

export const metadata = { alternates: { canonical: "/" } };

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const socials = [
  { href: links.github, label: "GitHub", icon: GitHubIcon },
  { href: links.linkedin, label: "LinkedIn", icon: LinkedInIcon },
  { href: links.medium, label: "Medium", icon: MediumIcon },
];

const orbitInner = [Bot, Activity, Workflow];
const orbitOuter = [Database, BrainCircuit, Cloud, Bot];

function OrbitChip({ icon: Icon }: { icon: typeof Bot }) {
  return (
    <span className="flex size-full items-center justify-center rounded-full border bg-background shadow-sm">
      <Icon className="size-1/2 text-foreground/80" aria-hidden="true" />
    </span>
  );
}

export default function HomePage() {
  const stats = [
    { value: yearsOfExperience, suffix: "+", label: "years shipping AI" },
    { value: projects.length, suffix: "", label: "projects & write-ups" },
    { value: industries.length, suffix: "", label: `industries: ${industries.join(", ")}` },
    { value: 25, suffix: "+", label: "builds & experiments" },
  ];

  return (
    <>
      {/* ============ Hero ============ */}
      <section className="relative overflow-hidden" aria-labelledby="hero-title">
        <div className="absolute inset-0 -z-10 text-foreground mask-radial">
          <FlickeringGrid squareSize={3} gridGap={7} maxOpacity={0.18} flickerChance={0.2} />
        </div>
        <div
          aria-hidden="true"
          className="bg-brand-gradient absolute top-[-10%] left-1/2 -z-10 h-72 w-[42rem] max-w-full -translate-x-1/2 rounded-full opacity-[0.14] blur-3xl dark:opacity-20"
        />

        <div className="mx-auto grid max-w-5xl items-center gap-12 px-4 pt-14 pb-20 sm:px-6 sm:pt-20 lg:grid-cols-[1.35fr_1fr] lg:pb-28">
          <div className="min-w-0">
            <div className="enter" style={d(0)}>
              <StatusPill />
            </div>

            <h1 id="hero-title" className="mt-6 text-[clamp(2.25rem,12vw,3rem)] leading-[1.02] font-semibold tracking-tighter sm:text-6xl lg:text-7xl">
              <span className="enter-text block" style={d(0)}>
                {profile.firstName}
              </span>
              <span className="enter-text text-gradient block pb-1" style={d(80)}>
                {profile.lastName}
              </span>
            </h1>

            <p className="enter-text mt-5 text-lg text-muted-foreground sm:text-xl" style={d(160)}>
              <span className="block font-medium text-foreground">{profile.title}</span>
              <WordRotate words={profile.taglines} className="grid" />
            </p>

            <p className="enter-text mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground" style={d(220)}>
              {profile.summary}
            </p>

            <div className="enter mt-8 flex flex-wrap items-center gap-3" style={d(300)}>
              <ContactButton variant="brand" size="lg">
                <Mail /> Get in touch
              </ContactButton>
              <Button asChild variant="outline" size="lg" className="bg-background/60 backdrop-blur">
                <Link href="/projects/">
                  See the work <ArrowRight />
                </Link>
              </Button>
              <div className="flex items-center gap-1 sm:ml-2">
                {socials.map(({ href, label, icon: Icon }) => (
                  <Button key={label} asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                      <Icon />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* avatar with orbiting expertise */}
          <div className="enter relative mx-auto flex size-[300px] items-center justify-center sm:size-[340px]" style={d(300)} aria-hidden="true">
            <OrbitingCircles radius={100} duration={24} iconSize={36}>
              {orbitInner.map((Icon, i) => (
                <OrbitChip key={i} icon={Icon} />
              ))}
            </OrbitingCircles>
            <OrbitingCircles radius={146} duration={36} iconSize={32} reverse>
              {orbitOuter.map((Icon, i) => (
                <OrbitChip key={i} icon={Icon} />
              ))}
            </OrbitingCircles>
            <div className="relative size-32 overflow-hidden rounded-full border bg-card shadow-xl sm:size-36">
              {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-optimized webp */}
              <img
                src={profile.avatarUrl}
                alt=""
                width={144}
                height={144}
                className="size-full object-cover"
              />
              <BorderBeam size={60} duration={6} borderWidth={2} />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-24 px-4 pb-24 sm:space-y-32 sm:px-6">
        {/* ============ Stats ============ */}
        <section aria-label="At a glance" className="-mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s, i) => (
            <BlurFade key={s.label} inView delay={i * 0.06}>
              <div className="h-full rounded-2xl border bg-card p-5">
                <p className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  <NumberTicker value={s.value} />
                  {s.suffix}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            </BlurFade>
          ))}
        </section>

        {/* ============ About ============ */}
        <section id="about" aria-labelledby="about-title">
          <BlurFade inView>
            <SectionHeading
              eyebrow="About"
              title={
                <span id="about-title">
                  Demos are easy. <span className="text-muted-foreground">Production is the point.</span>
                </span>
              }
            />
          </BlurFade>
          <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
            <BlurFade inView delay={0.05}>
              <div className="h-full space-y-4 rounded-2xl border bg-card p-6 text-base leading-relaxed text-pretty text-muted-foreground sm:p-8 sm:text-lg">
                {profile.about.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </BlurFade>
            <BlurFade inView delay={0.1}>
              <div className="flex h-full flex-col gap-6 rounded-2xl border bg-card p-6 text-sm sm:p-8">
                <dl className="grid content-start gap-5">
                  {[
                    ["Now", `${profile.title} at ${experience[0].company}`],
                    ["Focus", skills.map((s) => s.category).join(" · ")],
                    ["Industries", industries.join(" · ")],
                    ["Writing", "Long-form build notes on Medium"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="font-mono text-xs tracking-widest text-muted-foreground uppercase">{k}</dt>
                      <dd className="mt-1 font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
                <Button asChild variant="outline" size="sm" className="mt-auto w-fit">
                  <a href={links.medium} target="_blank" rel="noopener noreferrer">
                    <MediumIcon /> Read on Medium <ArrowUpRight className="opacity-60" />
                  </a>
                </Button>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ============ What I build ============ */}
        <section id="expertise" aria-labelledby="expertise-title">
          <BlurFade inView>
            <SectionHeading
              eyebrow="Expertise"
              title={<span id="expertise-title">What I build</span>}
              description="Three disciplines that decide whether an AI system survives contact with real users."
              action={
                <Button asChild variant="ghost" className="text-muted-foreground">
                  <Link href="/skills/">
                    All skills <ArrowRight />
                  </Link>
                </Button>
              }
            />
          </BlurFade>
          <ExpertiseGrid />
        </section>

        {/* ============ Experience ============ */}
        <section id="experience" aria-labelledby="experience-title">
          <BlurFade inView>
            <SectionHeading
              eyebrow="Experience"
              title={<span id="experience-title">The career trace</span>}
              description={`${yearsOfExperience}+ years across consulting and product teams, from classical ML to agentic systems.`}
            />
          </BlurFade>
          <ExperienceTimeline />
        </section>

        {/* ============ Selected work ============ */}
        <section id="work" aria-labelledby="work-title">
          <BlurFade inView>
            <SectionHeading
              eyebrow="Selected work"
              title={<span id="work-title">Recent builds</span>}
              description="Open-source tools and platforms, each with code or a write-up on how it was built."
              action={
                <Button asChild variant="ghost" className="text-muted-foreground">
                  <Link href="/projects/">
                    All {projects.length} projects <ArrowRight />
                  </Link>
                </Button>
              }
            />
          </BlurFade>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p, i) => (
              <BlurFade key={p.id} inView delay={i * 0.06} className="h-full">
                <ProjectCard project={p} />
              </BlurFade>
            ))}
          </div>
        </section>
      </div>

      {/* ============ Toolbox ============ */}
      <section aria-label="Toolbox" className="relative border-y bg-muted/20 py-6">
        <p className="sr-only">Tools I work with: {toolbox.join(", ")}.</p>
        <div aria-hidden="true" className="mask-fade-x space-y-2">
          <Marquee pauseOnHover className="[--duration:55s]">
            {toolbox.slice(0, Math.ceil(toolbox.length / 2)).map((t) => (
              <span key={t} className="rounded-full border bg-background px-4 py-1.5 text-sm whitespace-nowrap text-muted-foreground">
                {t}
              </span>
            ))}
          </Marquee>
          <Marquee pauseOnHover reverse className="[--duration:55s]">
            {toolbox.slice(Math.ceil(toolbox.length / 2)).map((t) => (
              <span key={t} className="rounded-full border bg-background px-4 py-1.5 text-sm whitespace-nowrap text-muted-foreground">
                {t}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-24 px-4 py-24 sm:space-y-32 sm:px-6">
        {/* ============ Education ============ */}
        <section id="education" aria-labelledby="education-title">
          <BlurFade inView>
            <SectionHeading eyebrow="Education" title={<span id="education-title">Foundations</span>} />
          </BlurFade>
          <div className="grid gap-4 sm:grid-cols-2">
            {education.map((edu, i) => (
              <BlurFade key={edu.institution} inView delay={i * 0.06} className="h-full">
                <div className="flex h-full gap-4 rounded-2xl border bg-card p-6">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border bg-muted/50">
                    <GraduationCap className="size-5 text-muted-foreground" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">{edu.period}</p>
                    <h3 className="mt-1 font-semibold tracking-tight">
                      {edu.institutionUrl ? (
                        <a href={edu.institutionUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-0.5 underline-offset-4 hover:underline">
                          {edu.institution}
                          <ArrowUpRight className="size-3.5 opacity-50" aria-hidden="true" />
                        </a>
                      ) : (
                        edu.institution
                      )}
                    </h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{edu.degree}</p>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </section>

        {/* ============ Contact ============ */}
        <section id="contact" aria-labelledby="contact-title">
          <BlurFade inView>
            <div className="relative overflow-hidden rounded-3xl border bg-card px-6 py-14 text-center sm:px-12 sm:py-20">
              <div
                aria-hidden="true"
                className="bg-brand-gradient absolute -top-24 left-1/2 h-48 w-2/3 -translate-x-1/2 rounded-full opacity-20 blur-3xl"
              />
              <p className="font-mono text-xs font-medium tracking-widest text-muted-foreground uppercase">
                <span className="text-gradient">{"//"}</span> Contact
              </p>
              <h2 id="contact-title" className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
                Let&apos;s build something <span className="text-gradient">real</span>.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-pretty text-muted-foreground sm:text-lg">
                Open to hard problems in agents, LLM systems, and everything it takes to run them in production.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <ContactButton variant="brand" size="lg">
                  <Mail /> Send a message
                </ContactButton>
                <CopyEmailButton variant="outline" size="lg" className="bg-background/60" />
                {links.resume && (
                  <Button asChild variant="outline" size="lg">
                    <a href={links.resume} target="_blank" rel="noopener noreferrer">
                      Resume <ArrowUpRight />
                    </a>
                  </Button>
                )}
              </div>
              <BorderBeam duration={10} size={120} />
            </div>
          </BlurFade>
        </section>
      </div>
    </>
  );
}
