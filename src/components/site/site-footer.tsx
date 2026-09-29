import Link from "next/link";

import { InferenceStats } from "@/components/inference/inference-stats";
import { SearchHint } from "@/components/site/actions";
import { GitHubIcon, LinkedInIcon, MediumIcon } from "@/components/icons";
import { NAV, prefetchFor } from "@/components/site/nav";
import { links, profile } from "@/data/portfolio";

const socials = [
  { href: links.github, label: "GitHub", icon: GitHubIcon },
  { href: links.linkedin, label: "LinkedIn", icon: LinkedInIcon },
  { href: links.medium, label: "Medium", icon: MediumIcon },
];

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 text-sm text-muted-foreground sm:px-6 md:grid-cols-[1fr_auto] md:items-end">
        <div className="space-y-2">
          <p className="font-serif text-3xl leading-none text-foreground">
            {profile.shortName}
            <span className="text-gradient">.</span>
          </p>
          <InferenceStats />
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {NAV.map(({ href, label }) => (
              <Link key={href} href={href} prefetch={prefetchFor(href)} className="underline-offset-4 hover:text-foreground hover:underline">
                {label}
              </Link>
            ))}
            <SearchHint />
          </nav>
          <div className="flex items-center gap-1">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
