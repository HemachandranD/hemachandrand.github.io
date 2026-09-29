import type { Metadata } from "next";

import { ProjectsExplorer } from "@/components/projects-explorer";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work by Hemachandran Dhinakaran: agent tooling, AI observability, LLMOps and MLOps platforms, RAG, and applied ML.",
  alternates: { canonical: "/projects/" },
  openGraph: { url: "/projects/" },
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-14 pb-24 sm:px-6 sm:pt-20">
      <div className="enter">
        <SectionHeading
          as="h1"
          eyebrow={`Work · ${String(projects.length).padStart(2, "0")} entries`}
          title="Selected work"
          description="Things I've shipped, chasing one question: how do you make AI hold up outside the demo? Each card links to code or a write-up on how it was built."
          className="mb-10"
        />
      </div>
      <ProjectsExplorer />
    </div>
  );
}
