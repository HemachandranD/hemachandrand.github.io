"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Mail } from "lucide-react";

import { useUI } from "@/components/site/ui-context";
import { cn } from "@/lib/utils";
import { profile } from "@/data/portfolio";

type Status = { short: string; long: string; tone: string };

// What I'm probably up to right now, by my local hour.
function statusFor(hour: number, weekend: boolean): Status {
  if (weekend && (hour >= 21 || hour < 3))
    return { short: "Weekend mode", long: "Weekend: definitely not gaming… okay, maybe a little.", tone: "bg-violet-400" };
  if (hour >= 6 && hour < 9) return { short: "Booting up", long: "Brewing coffee and booting up.", tone: "bg-amber-400" };
  if (hour >= 9 && hour < 12) return { short: "In flow", long: "Deep in code, morning flow state.", tone: "bg-emerald-400" };
  if (hour >= 12 && hour < 14) return { short: "Refueling", long: "Refueling for the afternoon sprint.", tone: "bg-amber-400" };
  if (hour >= 14 && hour < 18) return { short: "Shipping", long: "Shipping features, breaking builds.", tone: "bg-emerald-400" };
  if (hour >= 18 && hour < 21) return { short: "Side quests", long: "Evening experiments and side quests.", tone: "bg-violet-400" };
  if (hour >= 21 && hour < 23) return { short: "Winding down", long: "Winding down: reading and reflecting.", tone: "bg-sky-400" };
  return { short: "Recharging", long: "Recharging for tomorrow's builds.", tone: "bg-zinc-400" };
}

const fmt = new Intl.DateTimeFormat("en-US", {
  timeZone: profile.timeZone,
  hour: "numeric",
  minute: "2-digit",
  weekday: "short",
  hourCycle: "h12",
});

// A string snapshot keeps useSyncExternalStore stable between ticks.
function readClock() {
  const parts = Object.fromEntries(fmt.formatToParts(new Date()).map((p) => [p.type, p.value]));
  const h12 = Number(parts.hour) % 12;
  const hour = parts.dayPeriod === "PM" ? h12 + 12 : h12;
  return `${parts.hour}:${parts.minute} ${parts.dayPeriod}|${hour}|${parts.weekday}`;
}

function subscribe(cb: () => void) {
  const id = setInterval(cb, 15_000);
  return () => clearInterval(id);
}

// Dynamic Island: a black capsule with my avatar, what I'm up to and my
// local time. Click (or tap) and it morphs open; it lives in the page flow,
// so the content below glides down to make room instead of being covered.
// It opens on click rather than hover so the page only moves when asked to.
export function DynamicIsland({ className }: { className?: string }) {
  const snap = useSyncExternalStore(subscribe, readClock, () => null);
  const { openContact } = useUI();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Close on outside press or Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const [time, hourStr, weekday] = snap ? snap.split("|") : [];
  const status = snap ? statusFor(Number(hourStr), weekday === "Sat" || weekday === "Sun") : null;

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <div
        data-open={open || undefined}
        className={cn(
          "island overflow-hidden bg-[oklch(0.12_0.005_270)] text-white shadow-[0_10px_30px_-10px_rgb(0_0_0/0.6)] ring-1 ring-white/10",
          open ? "w-[min(21rem,calc(100vw-2rem))] rounded-[26px]" : "w-fit rounded-[20px]",
        )}
      >
        <button
          type="button"
          aria-expanded={open}
          aria-controls="island-detail"
          onClick={() => setOpen((o) => !o)}
          className="group flex h-10 w-full items-center gap-2.5 rounded-[inherit] pr-4 pl-1 text-left whitespace-nowrap focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none focus-visible:ring-inset"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-optimized webp */}
          <img
            src={profile.avatarUrl}
            alt=""
            width={32}
            height={32}
            className={cn(
              "island-avatar size-8 shrink-0 rounded-full bg-white/10 object-cover group-hover:scale-110",
              open && "scale-110",
            )}
          />
          {status ? (
            <>
              <span className="relative flex size-2 shrink-0" aria-hidden="true">
                <span className={cn("absolute inline-flex size-full animate-ping rounded-full opacity-60", status.tone)} />
                <span className={cn("relative inline-flex size-2 rounded-full", status.tone)} />
              </span>
              <span className="text-[13px] font-medium">{status.short}</span>
              <span className="font-mono text-[11px] text-white/55 tabular-nums">{time}</span>
            </>
          ) : (
            <span data-island-pending className="h-3 w-32 rounded-full bg-white/10" aria-hidden="true" />
          )}
          <span className="sr-only">{open ? " (collapse)" : " (expand)"}</span>
        </button>

        <div
          id="island-detail"
          inert={!open}
          className={cn("grid w-0 min-w-full transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
        >
          <div className="min-h-0 overflow-hidden">
            <div
              className={cn(
                "px-4 pt-1 pb-4 transition-[opacity,filter,transform] duration-300",
                open ? "translate-y-0 opacity-100 blur-0 delay-100" : "-translate-y-1 opacity-0 blur-[3px]",
              )}
            >
              <p className="text-[15px] leading-snug text-white/90">{status?.long ?? " "}</p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="font-mono text-[10.5px] text-white/45">
                  {profile.shortName} · my local time{weekday ? ` · ${weekday}` : ""}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openContact();
                  }}
                  className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full bg-white px-3 text-xs font-medium text-black transition-transform hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
                >
                  <Mail className="size-3.5" aria-hidden="true" /> Say hi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
