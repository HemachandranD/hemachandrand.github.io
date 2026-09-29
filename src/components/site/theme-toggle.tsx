"use client";

import { useRef } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useMounted } from "@/lib/use-mounted";

// Magic UI AnimatedThemeToggler, driven by next-themes: the new theme
// is revealed in a circle growing out of the button (View Transitions).
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const ref = useRef<HTMLButtonElement>(null);
  const dark = !mounted || resolvedTheme !== "light";
  const label = dark ? "Switch to light mode" : "Switch to dark mode";

  const toggle = () => {
    const next = dark ? "light" : "dark";
    const apply = () => {
      // set the class synchronously so the transition snapshots the new theme
      document.documentElement.classList.toggle("dark", next === "dark");
      document.documentElement.style.colorScheme = next;
      setTheme(next);
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce || !ref.current) {
      apply();
      return;
    }

    const { top, left, width, height } = ref.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    const transition = document.startViewTransition(() => flushSync(apply));
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: 500, easing: "cubic-bezier(0.4, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {});
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button ref={ref} variant="ghost" size="icon" onClick={toggle} aria-label={label}>
          {dark ? <Sun /> : <Moon />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
