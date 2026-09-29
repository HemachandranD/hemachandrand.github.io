import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, FolderGit2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section id="top" data-span="error" className="bg-grid">
      <div className="mx-auto flex min-h-[72dvh] max-w-2xl flex-col items-center justify-center px-4 py-24 text-center">
        <p className="font-mono text-xs text-muted-foreground">
          <span className="text-destructive">KeyError</span>: token not in vocabulary
        </p>
        <p className="mt-6 font-mono text-6xl tracking-tight sm:text-8xl">
          <span className="rounded-lg border-2 border-dashed border-brand-rose/60 px-3 text-brand-rose">&lt;unk&gt;</span>
        </p>
        <h1 className="mt-8 font-serif text-5xl leading-none text-balance sm:text-6xl">
          This page drifted out of the <em>latent space.</em>
        </h1>
        <p className="mt-4 text-muted-foreground">The link may be old or mistyped. Everything that exists is one click away.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/" prefetch={false}>
              <ArrowLeft /> Back home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/projects/">
              <FolderGit2 /> See projects
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
