import { ArrowUpRight, FileText, Play } from "lucide-react";

import { ContactButton, CopyEmailButton } from "@/components/site/actions";
import { GitHubIcon, LinkedInIcon, MediumIcon } from "@/components/icons";
import { links } from "@/data/portfolio";

const socials = [
  { href: links.github, label: "GitHub", icon: GitHubIcon },
  { href: links.linkedin, label: "LinkedIn", icon: LinkedInIcon },
  { href: links.medium, label: "Medium", icon: MediumIcon },
  // shown only once links.resume is set
  ...(links.resume ? [{ href: links.resume, label: "Resume", icon: FileText }] : []),
];

// The contact section as a pending tool call you can run.
export function ToolCall() {
  return (
    <div className="grid overflow-hidden rounded-2xl border bg-card lg:grid-cols-[1.1fr_1fr]">
      <div className="p-6 sm:p-10">
        <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">Contact</p>
        <h2 id="contact-title" className="mt-3 font-serif text-5xl leading-[0.95] text-balance sm:text-6xl">
          Let&apos;s build something <em className="text-gradient -mr-[0.1em] pr-[0.1em]">real</em>.
        </h2>
        <p className="mt-4 max-w-md text-pretty text-muted-foreground">
          Open to hard problems in agents, LLM systems, and everything it takes to run them in production.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {socials.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center gap-2 rounded-full border bg-background px-3.5 text-sm transition-colors hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <Icon className="size-4" />
              {label}
              <ArrowUpRight className="size-3.5 opacity-50" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      <div className="flex flex-col border-t bg-[oklch(0.16_0.01_270)] p-6 font-mono text-[13px] leading-relaxed text-[oklch(0.9_0.01_85)] sm:p-8 lg:border-t-0 lg:border-l">
        <p className="text-[11px] text-[oklch(0.65_0.01_270)]">{"// pending tool call"}</p>
        <pre className="mt-3 overflow-x-auto whitespace-pre" aria-label="Tool call preview">
          <span className="text-[oklch(0.72_0.18_5)]">await</span> hemz.<span className="text-[oklch(0.83_0.15_75)]">send_message</span>({"{\n"}
          {"  "}from: <span className="text-[oklch(0.78_0.16_155)]">&quot;you&quot;</span>,{"\n"}
          {"  "}about: <span className="text-[oklch(0.78_0.16_155)]">&quot;agents · observability · mlops&quot;</span>,{"\n"}
          {"  "}reply_within: <span className="text-[oklch(0.78_0.16_155)]">&quot;a day or two&quot;</span>,{"\n"}
          {"})"}
        </pre>
        <div className="mt-auto flex flex-wrap gap-2 pt-8">
          <ContactButton variant="brand" size="lg">
            <Play className="fill-current" /> Run tool call
          </ContactButton>
          <CopyEmailButton
            variant="outline"
            size="lg"
            className="border-white/15 bg-white/5 text-[oklch(0.9_0.01_85)] hover:bg-white/10 hover:text-white"
          />
        </div>
      </div>
    </div>
  );
}
