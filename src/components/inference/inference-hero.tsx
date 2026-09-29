"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Dices } from "lucide-react";

import { cn, r3 } from "@/lib/utils";
import { nameTokens, roleTokens, taglines, type Token } from "@/data/portfolio";

// Every token in reading order, so the inspector can step through them.
const ALL: Token[] = [...nameTokens.flat(), ...roleTokens];
const logprob = (p: number) => Math.log(p);
const SEQ_LOGPROB = ALL.reduce((s, t) => s + logprob(t.p), 0);
const PERPLEXITY = Math.exp(-SEQ_LOGPROB / ALL.length);

function softmax(logits: number[], t: number) {
  const scaled = logits.map((l) => l / t);
  const max = Math.max(...scaled);
  const exps = scaled.map((l) => Math.exp(l - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((e) => e / sum);
}

const fmt = (n: number, d = 2) => n.toFixed(d).replace(/^(-?)0\./, "$1.");

/** One token of the headline: confidence bar underneath, inspectable. */
function TokenSpan({
  token,
  index,
  active,
  onInspect,
  className,
}: {
  token: Token;
  index: number;
  active: boolean;
  onInspect: (i: number) => void;
  className?: string;
}) {
  return (
    <span
      data-token={index}
      onPointerEnter={() => onInspect(index)}
      onClick={() => onInspect(index)}
      // probabilities cluster near 1, so stretch the colour scale over 0.85–1
      style={{ "--p": r3(Math.max(0, (token.p - 0.85) / 0.15)), "--d": `${300 + index * 90}ms` } as CSSProperties}
      className={cn(
        "prob relative inline-block rounded-[0.12em] transition-colors duration-200",
        active && "bg-[color-mix(in_oklab,var(--prob-color)_16%,transparent)]",
        className,
      )}
    >
      {token.text}
      <span
        aria-hidden="true"
        className="bar-in absolute inset-x-[0.04em] -bottom-[0.04em] h-[0.055em] min-h-[2px] rounded-full bg-(--prob-color) opacity-80"
      />
    </span>
  );
}

export function InferenceHero({ status, actions }: { status: ReactNode; actions: ReactNode }) {
  // Inspector: which token is under the pointer (null = sequence summary)
  const [inspected, setInspected] = useState<number | null>(null);
  // Sampler
  const [temperature, setTemperature] = useState(0.7);
  const [sampled, setSampled] = useState(0);
  const [shown, setShown] = useState(taglines[0].text);
  const [streaming, setStreaming] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const probs = softmax(
    taglines.map((t) => t.logit),
    temperature,
  );

  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current);
  }, []);

  const stream = (text: string) => {
    if (timer.current) clearInterval(timer.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(text);
      setStreaming(false);
      return;
    }
    const pieces = text.match(/\s*\S+/g) ?? [text];
    let n = 0;
    setShown("");
    setStreaming(true);
    timer.current = setInterval(() => {
      n += 1;
      setShown(pieces.slice(0, n).join(""));
      if (n >= pieces.length) {
        if (timer.current) clearInterval(timer.current);
        timer.current = null;
        setStreaming(false);
      }
    }, 70);
  };

  const sample = (t = temperature) => {
    const p = softmax(
      taglines.map((c) => c.logit),
      t,
    );
    let r = Math.random();
    let i = 0;
    while (i < p.length - 1 && r >= p[i]) {
      r -= p[i];
      i += 1;
    }
    setSampled(i);
    stream(taglines[i].text);
  };

  const token = inspected === null ? null : ALL[inspected];
  const step = (dir: 1 | -1) =>
    setInspected((i) => (i === null ? (dir === 1 ? 0 : ALL.length - 1) : (i + dir + ALL.length) % ALL.length));

  let index = 0;

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-12">
      {/* ---------------- output ---------------- */}
      <div className="min-w-0" onPointerLeave={(e) => e.pointerType === "mouse" && setInspected(null)}>
        <div className="enter" style={{ "--d": "0ms" } as CSSProperties}>
          {status}
        </div>

        <p className="enter mt-8 font-mono text-[10.5px] text-muted-foreground sm:text-xs" style={{ "--d": "40ms" } as CSSProperties}>
          <span className="text-brand-rose">{">"}</span> generate(prompt=<span className="text-foreground">&quot;who builds production AI?&quot;</span>)
        </p>

        <h1
          aria-label="Hemachandran Dhinakaran"
          className="mt-3 font-serif text-[clamp(3.1rem,15vw,4.5rem)] leading-[0.95] tracking-[-0.02em] sm:text-8xl lg:text-[6.5rem]"
        >
          {nameTokens.map((line, li) => (
            <span key={li} aria-hidden="true" className={cn("enter-text block", li === 1 && "italic")} style={{ "--d": `${li * 90}ms` } as CSSProperties}>
              {line.map((t) => {
                const i = index++;
                return <TokenSpan key={i} token={t} index={i} active={inspected === i} onInspect={setInspected} />;
              })}
            </span>
          ))}
        </h1>

        <p className="enter-text mt-6 text-xl font-medium tracking-tight sm:text-2xl" style={{ "--d": "180ms" } as CSSProperties}>
          <span className="sr-only">Enterprise AI Engineer</span>
          <span aria-hidden="true">
            {roleTokens.map((t, k) => {
              const i = index++;
              return (
                <span key={i}>
                  {k > 0 && " "}
                  <TokenSpan token={t} index={i} active={inspected === i} onInspect={setInspected} />
                </span>
              );
            })}
          </span>
        </p>

        {/* phone: the console sits further down, so echo the inspected token here */}
        <p aria-hidden="true" className="mt-2 h-4 font-mono text-[11px] text-muted-foreground lg:hidden">
          {token && (
            <>
              &quot;{token.text}&quot; p {fmt(token.p)} · runner-up &quot;{token.alts[0][0]}&quot; {fmt(token.alts[0][1])}
            </>
          )}
        </p>

        <p className="enter-text mt-2 grid max-w-xl text-base text-pretty text-muted-foreground sm:text-xl" style={{ "--d": "240ms" } as CSSProperties}>
          {/* every candidate, invisible, in the same cell: the line is always
              as tall as the longest one, so re-sampling never shifts layout */}
          {taglines.map((c) => (
            <span key={c.text} aria-hidden="true" className="invisible col-start-1 row-start-1">
              {c.text}
            </span>
          ))}
          <span className="sr-only" aria-live="polite">
            {streaming ? "" : shown}
          </span>
          <span aria-hidden="true" className={cn("col-start-1 row-start-1", streaming && "caret")}>
            {shown}
          </span>
        </p>

        <div className="enter mt-8" style={{ "--d": "320ms" } as CSSProperties}>
          {actions}
        </div>
      </div>

      {/* ---------------- console ---------------- */}
      <section
        aria-label="Inference console"
        className="enter overflow-hidden rounded-2xl border bg-card/80 shadow-[0_1px_0_0_var(--border),0_24px_60px_-30px_rgb(0_0_0/0.35)] backdrop-blur"
        style={{ "--d": "260ms" } as CSSProperties}
      >
        <header className="flex items-center gap-2 border-b px-4 py-2.5 font-mono text-[11px] text-muted-foreground">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-brand-rose/70" />
            <span className="size-2.5 rounded-full bg-brand-amber/70" />
            <span className="size-2.5 rounded-full bg-ok/70" />
          </span>
          <span className="ml-2">inference console</span>
          <span className="ml-auto">hemz-v8 · fp16</span>
        </header>

        {/* token inspector */}
        <div className="border-b px-4 py-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">Token inspector</h2>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous token"
                className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next token"
                className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          <div aria-live="polite" className="mt-3 min-h-[7.25rem] font-mono text-xs">
            {token ? (
              <>
                <p className="text-muted-foreground">
                  token <span className="text-foreground">&quot;{token.text}&quot;</span> · {inspected! + 1}/{ALL.length}
                </p>
                <p className="mt-0.5 text-muted-foreground">
                  p <span className="text-foreground">{fmt(token.p)}</span> · logprob{" "}
                  <span className="text-foreground">{fmt(logprob(token.p))}</span>
                </p>
                <ul className="mt-3 space-y-1.5" aria-label="Top candidates">
                  {[[token.text, token.p] as [string, number], ...token.alts].map(([text, p], k) => (
                    <li key={text} className="prob grid grid-cols-[6.5rem_1fr_2.5rem] items-center gap-2" style={{ "--p": p } as CSSProperties}>
                      <span className={cn("truncate", k === 0 ? "text-foreground" : "text-muted-foreground")}>{text}</span>
                      <span className="h-1.5 overflow-hidden rounded-full bg-muted">
                        <span className="block h-full rounded-full bg-(--prob-color)" style={{ width: `${r3(Math.max(p * 100, 1.5))}%` }} />
                      </span>
                      <span className="text-right text-muted-foreground tabular-nums">{fmt(p)}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <p className="text-muted-foreground">
                  sequence · <span className="text-foreground">{ALL.length} tokens</span>
                </p>
                <p className="mt-0.5 text-muted-foreground">
                  logprob <span className="text-foreground">{fmt(SEQ_LOGPROB)}</span> · perplexity{" "}
                  <span className="text-foreground">{PERPLEXITY.toFixed(3)}</span>
                </p>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  <span className="hidden sm:inline">Hover</span>
                  <span className="sm:hidden">Tap</span> a token in the headline (or step with the arrows) to see
                  what else the model considered.
                </p>
              </>
            )}
          </div>
        </div>

        {/* temperature sampler */}
        <div className="px-4 py-4">
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">Tagline sampler</h2>
            <span className="font-mono text-[11px] text-muted-foreground">softmax(logits / T)</span>
          </div>

          <ol className="mt-3 space-y-1" aria-label="Tagline probabilities">
            {taglines.map((c, k) => (
              <li
                key={c.text}
                className="prob relative grid grid-cols-[1fr_2.5rem] items-center gap-2 overflow-hidden rounded-md px-2 py-1 font-mono text-[11px]"
                style={{ "--p": r3(Math.min(1, probs[k] * 1.6)) } as CSSProperties}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 bg-[color-mix(in_oklab,var(--prob-color)_22%,transparent)] transition-[width] duration-300 ease-out"
                  style={{ width: `${r3(probs[k] * 100)}%` }}
                />
                <span className={cn("relative truncate", k === sampled ? "text-foreground" : "text-muted-foreground")}>
                  {k === sampled ? "› " : "  "}
                  {c.text}
                </span>
                <span className="relative text-right text-muted-foreground tabular-nums">{fmt(probs[k])}</span>
              </li>
            ))}
          </ol>

          <div className="mt-4 flex items-center gap-2 sm:gap-3">
            <label htmlFor="temperature" className="font-mono text-[11px] text-muted-foreground">
              T
            </label>
            <input
              id="temperature"
              type="range"
              min={0.1}
              max={2}
              step={0.05}
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              onPointerUp={(e) => sample(Number((e.target as HTMLInputElement).value))}
              onKeyUp={(e) => {
                if (/^Arrow|^Home$|^End$|^Page/.test(e.key)) sample(Number((e.target as HTMLInputElement).value));
              }}
              aria-valuetext={`temperature ${temperature.toFixed(2)}`}
              className="h-1.5 w-0 min-w-0 flex-1 cursor-pointer appearance-none rounded-full bg-[linear-gradient(90deg,var(--brand-amber),var(--brand-rose),var(--brand-violet))] accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-background [&::-moz-range-thumb]:bg-foreground [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:shadow"
            />
            <output htmlFor="temperature" className="w-9 text-right font-mono text-xs tabular-nums">
              {temperature.toFixed(2)}
            </output>
            <button
              type="button"
              onClick={() => sample()}
              className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border bg-background px-3 font-mono text-xs transition-colors hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <Dices className="size-3.5" aria-hidden="true" /> sample
            </button>
          </div>
          <p className="mt-2 font-mono text-[11px] text-muted-foreground">
            {temperature < 0.4 ? "greedy-ish: it'll say the sensible thing." : temperature > 1.3 ? "high temperature: anything goes." : "balanced: mostly sensible, occasionally fun."}
          </p>
        </div>
      </section>
    </div>
  );
}
