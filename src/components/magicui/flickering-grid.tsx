"use client";

import { useEffect, useRef } from "react";

import { onIdle } from "@/lib/on-idle";
import { cn } from "@/lib/utils";

interface FlickeringGridProps {
  className?: string;
  squareSize?: number;
  gridGap?: number;
  /** Chance per second that a square changes. */
  flickerChance?: number;
  /** CSS color; read from the element so it can follow the theme. */
  color?: string;
  maxOpacity?: number;
  /** Frames per second — the effect reads as ambient even at a low rate. */
  fps?: number;
}

// Magic UI FlickeringGrid, tuned for a background: capped frame rate,
// pauses while off-screen or in a hidden tab, and draws a single still
// frame for reduced-motion visitors.
export function FlickeringGrid({
  className,
  squareSize = 3,
  gridGap = 6,
  flickerChance = 0.25,
  color = "currentColor",
  maxOpacity = 0.25,
  fps = 24,
}: FlickeringGridProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = squareSize + gridGap;
    let cols = 0;
    let rows = 0;
    let dpr = 1;
    let squares = new Float32Array(0);
    let rgb = "0,0,0";
    let raf = 0;
    let last = 0;
    let visible = false;
    let ready = false;
    let ro: ResizeObserver | undefined;

    const readColor = () => {
      const probe = document.createElement("canvas").getContext("2d");
      if (!probe) return;
      probe.fillStyle = color === "currentColor" ? getComputedStyle(wrap).color : color;
      probe.fillRect(0, 0, 1, 1);
      const [r, g, b] = probe.getImageData(0, 0, 1, 1).data;
      rgb = `${r},${g},${b}`;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const s = squareSize * dpr;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          ctx.fillStyle = `rgba(${rgb},${squares[i * rows + j]})`;
          ctx.fillRect(i * step * dpr, j * step * dpr, s, s);
        }
      }
    };

    const resize = () => {
      const { width, height } = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      cols = Math.ceil(width / step);
      rows = Math.ceil(height / step);
      squares = new Float32Array(cols * rows);
      for (let i = 0; i < squares.length; i++) squares[i] = Math.random() * maxOpacity;
      readColor();
      draw();
    };

    // Only the squares that change are repainted, so a frame costs a few
    // dozen fillRects instead of thousands.
    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      const dt = (t - last) / 1000;
      if (dt < 1 / fps) return;
      last = t;
      const p = flickerChance * Math.min(dt, 0.1);
      const s = squareSize * dpr;
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() >= p) continue;
        squares[i] = Math.random() * maxOpacity;
        const x = Math.floor(i / rows) * step * dpr;
        const y = (i % rows) * step * dpr;
        ctx.clearRect(x, y, s, s);
        ctx.fillStyle = `rgba(${rgb},${squares[i]})`;
        ctx.fillRect(x, y, s, s);
      }
    };

    const start = () => {
      if (!ready || reduce || raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    // Paint and start once the browser is idle, off the critical path.
    const init = () => {
      ready = true;
      // the observer's first callback does the initial size + paint
      ro = new ResizeObserver(resize);
      ro.observe(wrap);
      start();
    };
    const cancelIdle = onIdle(init, 1500);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(wrap);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    // Theme switches change the inherited text color
    const mo = new MutationObserver(() => {
      if (!ready) return;
      readColor();
      draw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      cancelIdle();
      stop();
      ro?.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [squareSize, gridGap, flickerChance, color, maxOpacity, fps]);

  return (
    <div ref={wrapRef} aria-hidden="true" className={cn("pointer-events-none size-full", className)}>
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}
