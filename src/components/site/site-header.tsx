"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
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
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-background/55">
      <div className="mx-auto flex h-16 max-w-5xl items-center gap-2 px-4 sm:px-6">
        <Link
          href="/"
          className="mr-auto rounded-md text-lg font-semibold tracking-tight focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
          aria-label="Hemz — home"
        >
          Hemz<span className="text-gradient">.</span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-0.5 sm:gap-1">
          {NAV.map(({ href, label }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  href === "/" && "max-sm:hidden",
                  "rounded-full px-2.5 py-1.5 sm:px-3.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
                  active && "bg-accent text-foreground",
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <Button
          variant="outline"
          onClick={openCommand}
          aria-label="Search"
          aria-keyshortcuts="Control+K Meta+K"
          className="ml-1 size-9 gap-2 rounded-full bg-background/50 p-0 text-muted-foreground shadow-none hover:text-foreground sm:ml-2 sm:w-40 sm:justify-start sm:px-3"
        >
          <Search />
          <span className="hidden text-sm font-normal sm:inline">Search…</span>
          <Kbd className="ml-auto hidden sm:inline-flex">{mod}K</Kbd>
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
}
