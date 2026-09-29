"use client";

import { Mail } from "lucide-react";

import { Dock, DockIcon, DockSeparator } from "@/components/magicui/dock";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { GitHubIcon, LinkedInIcon, MediumIcon } from "@/components/icons";
import { useUI } from "@/components/site/ui-context";
import { links } from "@/data/portfolio";

const item =
  "flex size-full items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none [&_svg]:size-[45%]";

const SOCIALS = [
  { href: links.github, label: "GitHub", icon: GitHubIcon },
  { href: links.linkedin, label: "LinkedIn", icon: LinkedInIcon },
  { href: links.medium, label: "Medium", icon: MediumIcon },
];

// Floating Magic UI dock: profiles and the contact sheet, one tap away
// on every page.
export function SiteDock() {
  const { openContact } = useUI();

  return (
    <div className="pb-safe pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center">
      <nav aria-label="Quick links" className="pointer-events-auto">
        <Dock iconSize={40} iconMagnification={54}>
          {SOCIALS.map(({ href, label, icon: Icon }) => (
            <DockIcon key={label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={item}>
                    <Icon />
                  </a>
                </TooltipTrigger>
                <TooltipContent>{label}</TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <DockSeparator />
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button" onClick={openContact} aria-label="Send a message" className={item}>
                  <Mail />
                </button>
              </TooltipTrigger>
              <TooltipContent>Send a message</TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>
      </nav>
    </div>
  );
}
