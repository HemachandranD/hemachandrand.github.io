import Link from "next/link";

import { SearchHint } from "@/components/site/actions";
import { NAV } from "@/components/site/nav";
import { profile } from "@/data/portfolio";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 pt-8 pb-28 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {profile.name}.
        </p>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {NAV.map(({ href, label }) => (
            <Link key={href} href={href} className="underline-offset-4 hover:text-foreground hover:underline">
              {label}
            </Link>
          ))}
          <SearchHint />
        </nav>
      </div>
    </footer>
  );
}
