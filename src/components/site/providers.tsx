"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { ThemeProvider } from "next-themes";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { CommandMenu } from "@/components/site/command-menu";
import { UIContext } from "@/components/site/ui-context";
import { onIdle } from "@/lib/on-idle";

// The contact sheet is code-split: it loads when the browser is idle (or
// on first click) instead of weighing down every page's first paint. The
// command menu is not, so keys typed right after ⌘K are never lost.
const loadContactDialog = () => import("@/components/site/contact-dialog");
const ContactDialog = dynamic(() => loadContactDialog().then((m) => m.ContactDialog), { ssr: false });

export function Providers({ children }: { children: ReactNode }) {
  const [commandOpen, setCommandOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  // Mount each overlay the first time it's needed, then keep it mounted
  // so closing can animate out.
  const [commandUsed, setCommandUsed] = useState(false);
  const [contactUsed, setContactUsed] = useState(false);

  const ui = useMemo(
    () => ({
      openContact: () => {
        setCommandOpen(false);
        setContactUsed(true);
        setContactOpen(true);
      },
      openCommand: () => {
        setCommandUsed(true);
        setCommandOpen(true);
      },
    }),
    [],
  );

  // ⌘K / Ctrl+K toggles the command menu anywhere; "/" opens it when
  // the visitor isn't typing into a field.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const typing =
        !!t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setContactOpen(false);
        setCommandUsed(true);
        setCommandOpen((o) => !o);
      } else if (
        e.key === "/" &&
        !typing &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        !document.querySelector("[role=dialog]")
      ) {
        e.preventDefault();
        setCommandUsed(true);
        setCommandOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Warm the contact sheet's chunk once the page has settled.
  useEffect(() => onIdle(() => void loadContactDialog(), 4000), []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          <TooltipProvider delayDuration={150}>
            <UIContext.Provider value={ui}>
              {children}
              {commandUsed && <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />}
              {contactUsed && <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />}
              <Toaster position="top-center" />
            </UIContext.Provider>
          </TooltipProvider>
        </MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  );
}
