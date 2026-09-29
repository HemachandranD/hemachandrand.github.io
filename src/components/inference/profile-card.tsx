import { ArrowUpRight } from "lucide-react";

import { education, experience, industries, links, profile, skills, yearsOfExperience } from "@/data/portfolio";

// About: the facts at a glance, next to the prose.
export function ProfileCard() {
  const [current, ...previous] = experience;
  const since = experience[experience.length - 1].start.slice(0, 4);
  const lines = (items: string[]) => (
    <ul className="space-y-0.5">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
  const rows: [string, React.ReactNode][] = [
    ["Current role", `${current.title}, ${current.company}`],
    ["Experience", `${yearsOfExperience}+ years, since ${since}`],
    ["Focus", skills.map((s) => s.category).join(" · ")],
    ["Industries", industries.join(" · ")],
    ["Previously", lines(previous.map((e) => `${e.title}, ${e.company}`))],
    ["Education", lines(education.map((e) => `${e.degree.replace(" · ", " in ")}, ${e.institution}`))],
  ];

  return (
    <div className="overflow-hidden rounded-2xl border bg-card">
      <div className="flex items-center gap-4 border-b px-5 py-5">
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-optimized webp */}
        <img
          src={profile.avatarUrl}
          alt={profile.name}
          width={56}
          height={56}
          loading="lazy"
          decoding="async"
          className="size-14 shrink-0 rounded-full border bg-muted object-cover"
        />
        <div className="min-w-0">
          <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">Profile card</p>
          <p className="mt-1 font-serif text-3xl leading-none">{profile.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{profile.title}</p>
        </div>
      </div>

      <dl className="divide-y text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="grid gap-1 px-5 py-3 sm:grid-cols-[8rem_1fr] sm:gap-4">
            <dt className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase sm:pt-0.5">{k}</dt>
            <dd className="min-w-0 leading-relaxed text-pretty">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-wrap gap-x-5 gap-y-2 border-t px-5 py-3.5 text-sm">
        {[
          ["LinkedIn", links.linkedin],
          ["GitHub", links.github],
          ["Medium", links.medium],
          ...(links.resume ? [["Resume", links.resume]] : []),
        ].map(([label, href]) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 rounded-sm font-medium underline-offset-4 hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            {label}
            <ArrowUpRight className="size-3.5 opacity-50" aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  );
}
