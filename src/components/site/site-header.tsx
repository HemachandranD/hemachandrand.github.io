"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

import { Kbd } from "@/components/ui/kbd";
import { TraceBar } from "@/components/inference/trace-bar";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { useUI } from "@/components/site/ui-context";
import { NAV, isActive } from "@/components/site/nav";
import { useModKey } from "@/lib/use-platform";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { openCommand } = useUI();
  const pathname = usePathname();
  const mod = useModKey();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-1 px-4 sm:gap-2 sm:px-6">
        <Link
          href="/"
          className="mr-auto rounded-md font-serif text-2xl leading-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
          aria-label="Hemz — home"
        >
          Hemz<span className="text-gradient">.</span>
        </Link>

        <nav aria-label="Primary" className="flex items-center font-mono text-xs">
          {NAV.map(({ href, label }, i) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  href === "/" && "max-sm:hidden",
                  "relative rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none sm:px-3",
                  active && "text-foreground",
                )}
              >
                <span className="max-sm:hidden">0{i + 1} </span>
                {label.toLowerCase()}
                {active && <span aria-hidden="true" className="bg-brand-gradient absolute inset-x-2 -bottom-[9px] h-0.5 rounded-full sm:inset-x-3" />}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={openCommand}
          aria-keyshortcuts="Control+K Meta+K"
          className="ml-1 flex h-8 items-center gap-2 rounded-full border bg-background/60 px-2.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none sm:ml-2 sm:px-3"
        >
          <Search className="size-3.5" aria-hidden="true" />
          <span className="sr-only sm:hidden">Search</span>
          <span className="hidden sm:inline">ask</span>
          <span className="sr-only max-sm:hidden"> (search)</span>
          <Kbd aria-hidden="true" className="hidden font-mono sm:inline-flex">
            {mod}K
          </Kbd>
        </button>
        <ThemeToggle />
      </div>
      <TraceBar />
    </header>
  );
}
