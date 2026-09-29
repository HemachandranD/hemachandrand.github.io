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
    <div className="mx-auto flex min-h-[70dvh] max-w-xl flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-gradient font-mono text-7xl font-semibold tracking-tighter sm:text-8xl">404</p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">This page drifted out of the latent space.</h1>
      <p className="mt-3 text-muted-foreground">
        The link may be old or mistyped. Everything that exists is one click away.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/">
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
  );
}
