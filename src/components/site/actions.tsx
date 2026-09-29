"use client";

import type { ComponentProps } from "react";
import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { useUI } from "@/components/site/ui-context";
import { copyEmail } from "@/lib/copy-email";
import { useModKey } from "@/lib/use-platform";

// Small client islands so the pages themselves can stay server-rendered.

export function ContactButton(props: Omit<ComponentProps<typeof Button>, "onClick">) {
  const { openContact } = useUI();
  return <Button type="button" onClick={openContact} {...props} />;
}

export function CopyEmailButton(props: Omit<ComponentProps<typeof Button>, "onClick" | "children">) {
  return (
    <Button type="button" onClick={copyEmail} {...props}>
      <Copy /> Copy email
    </Button>
  );
}

export function SearchHint() {
  const { openCommand } = useUI();
  const mod = useModKey();
  return (
    <button
      type="button"
      onClick={openCommand}
      className="inline-flex items-center gap-1.5 rounded-md underline-offset-4 hover:text-foreground hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
    >
      <span className="sm:hidden">Search the site</span>
      <span className="inline-flex items-center gap-1.5 max-sm:hidden">
        Press <Kbd>{mod}K</Kbd> to search
      </span>
    </button>
  );
}
