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
    <div className="mx-auto max-w-6xl px-4 pt-14 pb-28 sm:px-6 sm:pt-20">
      <section id="top" aria-labelledby="projects-title" className="enter">
        <SectionHeading
          as="h1"
          id="projects-title"
          eyebrow={`Work · ${String(projects.length).padStart(2, "0")} entries`}
          title={
            <>
              Selected <em>work.</em>
            </>
          }
          description="Things I've shipped, chasing one question: how do you make AI hold up outside the demo? Each card links to code or a write-up on how it was built."
          className="mb-10"
        />
      </section>
      <ProjectsExplorer />
    </div>
  );
}
