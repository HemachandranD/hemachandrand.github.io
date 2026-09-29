import { Activity, Bot, BrainCircuit, Cloud, Database, Layers, ScanEye, Sparkles, Workflow } from "lucide-react";

import type { SkillIcon as SkillIconName } from "@/data/portfolio";

const ICONS = {
  agents: Bot,
  observability: Activity,
  mlops: Workflow,
  rag: Database,
  llm: Sparkles,
  ml: BrainCircuit,
  perception: ScanEye,
  data: Layers,
  cloud: Cloud,
} satisfies Record<SkillIconName, typeof Bot>;

export function SkillIcon({ name, className }: { name: SkillIconName; className?: string }) {
  const Icon = ICONS[name];
  return <Icon className={className} aria-hidden="true" />;
}
