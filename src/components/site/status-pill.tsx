"use client";

import { useSyncExternalStore } from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useUI } from "@/components/site/ui-context";
import { cn } from "@/lib/utils";
import { profile } from "@/data/portfolio";

type Status = { short: string; long: string; tone: string };

// What I'm probably up to right now, by my local (Eastern) hour.
function statusFor(hour: number, weekend: boolean): Status {
  if (weekend && (hour >= 21 || hour < 3))
    return { short: "Weekend mode", long: "Weekend: definitely not gaming… okay, maybe a little.", tone: "bg-violet-500" };
  if (hour >= 6 && hour < 9) return { short: "Booting up", long: "Brewing coffee and booting up.", tone: "bg-amber-500" };
  if (hour >= 9 && hour < 12) return { short: "In flow", long: "Deep in code, morning flow state.", tone: "bg-emerald-500" };
  if (hour >= 12 && hour < 14) return { short: "Refueling", long: "Refueling for the afternoon sprint.", tone: "bg-amber-500" };
  if (hour >= 14 && hour < 18) return { short: "Shipping", long: "Shipping features, breaking builds.", tone: "bg-emerald-500" };
  if (hour >= 18 && hour < 21) return { short: "Side quests", long: "Evening experiments and side quests.", tone: "bg-violet-500" };
  if (hour >= 21 && hour < 23) return { short: "Winding down", long: "Winding down: reading and reflecting.", tone: "bg-sky-500" };
  return { short: "Recharging", long: "Recharging for tomorrow's builds.", tone: "bg-zinc-400" };
}

const fmt = new Intl.DateTimeFormat("en-US", {
  timeZone: profile.timeZone,
  hour: "numeric",
  minute: "2-digit",
  weekday: "short",
  hourCycle: "h12",
  timeZoneName: "short",
});

function readClock() {
  const parts = Object.fromEntries(fmt.formatToParts(new Date()).map((p) => [p.type, p.value]));
  const h12 = Number(parts.hour) % 12;
  const hour = parts.dayPeriod === "PM" ? h12 + 12 : h12;
  return `${parts.hour}:${parts.minute} ${parts.dayPeriod} ${parts.timeZoneName}|${hour}|${parts.weekday}`;
}

// A string snapshot keeps useSyncExternalStore stable between ticks.
function subscribe(cb: () => void) {
  const id = setInterval(cb, 15_000);
  return () => clearInterval(id);
}

// Live "what I'm up to" pill with my local time. Rendered only on the
// client (the time at build would be wrong), with a same-size skeleton
// in the prerendered HTML so nothing shifts.
export function StatusPill({ className }: { className?: string }) {
  const snap = useSyncExternalStore(subscribe, readClock, () => null);
  const { openContact } = useUI();

  if (!snap) {
    return (
      <span
        aria-hidden="true"
        className={cn("inline-flex h-8 w-56 animate-pulse rounded-full border bg-muted/50", className)}
      />
    );
  }

  const [time, hourStr, weekday] = snap.split("|");
  const status = statusFor(Number(hourStr), weekday === "Sat" || weekday === "Sun");

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={openContact}
          className={cn(
            "inline-flex h-8 items-center gap-2 rounded-full border bg-background/60 px-3 font-mono text-[11px] backdrop-blur transition-colors hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
            className,
          )}
        >
          <span className="relative flex size-2">
            <span className={cn("absolute inline-flex size-full animate-ping rounded-full opacity-60", status.tone)} />
            <span className={cn("relative inline-flex size-2 rounded-full", status.tone)} />
          </span>
          <span>{status.short}</span>
          <span className="text-muted-foreground">·</span>
          <span className="font-mono text-muted-foreground tabular-nums">{time}</span>
        </button>
      </TooltipTrigger>
      <TooltipContent>{status.long} Click to say hi.</TooltipContent>
    </Tooltip>
  );
}
