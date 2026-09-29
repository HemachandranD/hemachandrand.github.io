import { BlurFade } from "@/components/magicui/blur-fade";
import { MagicCard } from "@/components/magicui/magic-card";
import { SkillIcon } from "@/components/skill-icon";
import { Badge } from "@/components/ui/badge";
import { skills } from "@/data/portfolio";

// The three core areas. `detailed` lists every tool (skills page);
// the home page shows the first few.
export function ExpertiseGrid({
  detailed = false,
  headingLevel = "h3",
}: {
  detailed?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {skills.map((area, i) => {
        const tools = detailed ? area.items : area.items.slice(0, 4);
        return (
          <BlurFade key={area.category} inView delay={i * 0.07} className="h-full">
            <MagicCard className="h-full">
              <div className="flex h-full flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-xl border bg-muted/50">
                    <SkillIcon name={area.icon} className="size-5" />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                </div>
                <Heading className="mt-5 text-lg font-semibold tracking-tight">{area.category}</Heading>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{area.summary}</p>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-5" aria-label={`${area.category} tools`}>
                  {tools.map((tool) => (
                    <li key={tool}>
                      <Badge variant="secondary" className="font-normal">
                        {tool}
                      </Badge>
                    </li>
                  ))}
                  {!detailed && area.items.length > tools.length && (
                    <li>
                      <Badge variant="outline" className="font-normal text-muted-foreground">
                        +{area.items.length - tools.length} more
                      </Badge>
                    </li>
                  )}
                </ul>
              </div>
            </MagicCard>
          </BlurFade>
        );
      })}
    </div>
  );
}
