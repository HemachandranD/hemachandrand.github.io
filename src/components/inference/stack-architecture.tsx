import { SkillIcon } from "@/components/skill-icon";
import { skills, stackSkills, type SkillArea } from "@/data/portfolio";

// The whole stack drawn like a model diagram: layers bottom-up (a forward
// pass), agents on top, observability and MLOps as side streams that run
// through every layer.
const LAYERS = ["cloud", "data", "ml", "perception", "llm", "rag"]
  .map((icon) => stackSkills.find((s) => s.icon === icon))
  .filter(Boolean) as SkillArea[];
const agents = skills.find((s) => s.icon === "agents")!;
const rails = skills.filter((s) => s.icon !== "agents");

function Layer({ area, index, top = false }: { area: SkillArea; index: number; top?: boolean }) {
  return (
    <li
      className={
        top
          ? "relative rounded-xl border-2 border-foreground/80 bg-card p-4"
          : "relative rounded-xl border bg-card p-4"
      }
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="font-mono text-[10px] text-muted-foreground">L{index}</span>
        <SkillIcon name={area.icon} className="size-4 text-muted-foreground" />
        <h3 className="font-serif text-2xl leading-none">{area.category}</h3>
        <p className="w-full text-sm text-muted-foreground sm:ml-auto sm:w-auto sm:max-w-[26rem] sm:text-right">{area.summary}</p>
      </div>
      <ul className="mt-3 flex flex-wrap gap-1.5 font-mono text-[11px]" aria-label={`${area.category} tools`}>
        {area.items.map((t) => (
          <li key={t} className="rounded border bg-background px-1.5 py-0.5">
            {t}
          </li>
        ))}
      </ul>
    </li>
  );
}

function Rail({ area }: { area: SkillArea }) {
  return (
    <div className="relative flex flex-col rounded-xl border border-dashed bg-card/60 p-4 lg:items-center lg:px-2 lg:py-6">
      <div className="flex items-center gap-2 lg:flex-col">
        <SkillIcon name={area.icon} className="size-4 text-muted-foreground" />
        <h3 className="font-serif text-2xl leading-none lg:py-1 lg:leading-[1.2] lg:[writing-mode:vertical-rl] lg:rotate-180">{area.category}</h3>
      </div>
      <p className="mt-2 text-sm text-muted-foreground lg:hidden">{area.summary}</p>
      <ul className="mt-3 flex flex-wrap gap-1.5 font-mono text-[11px] lg:mt-6 lg:flex-col lg:items-center" aria-label={`${area.category} tools`}>
        {area.items.map((t) => (
          <li key={t} className="rounded border bg-background px-1.5 py-0.5 lg:[writing-mode:vertical-rl] lg:rotate-180 lg:px-0.5 lg:py-1.5">
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StackArchitecture() {
  const all = [agents, ...[...LAYERS].reverse()];
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_4.5rem_4.5rem]">
      <div className="relative">
        <p aria-hidden="true" className="mb-2 font-mono text-[10px] text-muted-foreground">
          ↑ forward pass
        </p>
        <ol className="space-y-2" reversed>
          {all.map((area, k) => (
            <Layer key={area.category} area={area} index={all.length - 1 - k} top={k === 0} />
          ))}
        </ol>
        <p aria-hidden="true" className="mt-2 font-mono text-[10px] text-muted-foreground">
          input: a business problem
        </p>
      </div>
      {rails.map((r) => (
        <Rail key={r.category} area={r} />
      ))}
    </div>
  );
}
