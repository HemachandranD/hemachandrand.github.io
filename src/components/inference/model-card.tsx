import { experience, industries, profile, projects, skills, yearsOfExperience } from "@/data/portfolio";

// About, formatted as a model card.
export function ModelCard() {
  const checkpoints = [...experience].reverse().map((e) => e.short);
  const rows: [string, string][] = [
    ["architecture", skills.map((s) => s.category.split(" ")[0].toLowerCase()).join(" ∘ ")],
    ["training run", `jun 2018 → present · ${yearsOfExperience}+ yrs`],
    ["checkpoints", checkpoints.join(" → ")],
    ["domains", industries.map((d) => d.toLowerCase()).join(" · ")],
    ["evals", `${projects.length} shipped projects · 25+ builds`],
    ["intended use", "taking AI from demo to production"],
    ["limitations", "needs coffee to reach full context length"],
    ["license", "open to hard problems"],
  ];
  return (
    <div className="overflow-hidden rounded-2xl border bg-card">
      <div className="flex items-center gap-3 border-b px-5 py-4">
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-optimized webp */}
        <img src={profile.avatarUrl} alt="" width={48} height={48} loading="lazy" decoding="async" className="size-12 rounded-full border bg-muted object-cover" />
        <div>
          <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">Model card</p>
          <p className="font-serif text-2xl leading-none">
            hemz-v{yearsOfExperience} <span className="text-muted-foreground italic">({profile.shortName})</span>
          </p>
        </div>
      </div>
      <dl className="divide-y font-mono text-xs">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-3 px-5 py-2.5">
            <dt className="text-muted-foreground">{k}</dt>
            <dd className="min-w-0">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
