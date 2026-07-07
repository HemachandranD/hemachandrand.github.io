import { useEffect, useRef } from "react";

// ============================================================
// LatentField — a hand-rolled 3D embedding-space renderer.
// No WebGL library: perspective projection on a 2D canvas.
// Each cluster is a real skill domain; drag to orbit.
// ============================================================

// Deterministic PRNG so the "embedding" is identical every visit
function mulberry32(seed) {
    return function () {
        let t = (seed += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// Skill domains as clusters, colored along the inferno ramp
const CLUSTERS = [
    { label: "agents", center: [0.95, 0.30, 0.10], n: 26, spread: 0.34, color: [255, 178, 36] },
    { label: "llm-ops", center: [-0.85, 0.55, -0.30], n: 22, spread: 0.30, color: [240, 82, 124] },
    { label: "rag", center: [0.15, -0.80, 0.75], n: 20, spread: 0.28, color: [255, 120, 71] },
    { label: "ml", center: [-0.55, -0.50, 0.55], n: 22, spread: 0.32, color: [178, 102, 255] },
    { label: "cloud", center: [0.55, 0.90, -0.65], n: 18, spread: 0.30, color: [255, 209, 102] },
    { label: "observability", center: [-0.20, 0.05, -1.00], n: 20, spread: 0.28, color: [214, 84, 200] },
];

function buildUniverse() {
    const rand = mulberry32(20180618); // career start date as seed
    const gauss = () => (rand() + rand() + rand() - 1.5) * 0.82;

    const points = [];
    CLUSTERS.forEach((c, ci) => {
        for (let i = 0; i < c.n; i++) {
            points.push({
                x: c.center[0] + gauss() * c.spread,
                y: c.center[1] + gauss() * c.spread,
                z: c.center[2] + gauss() * c.spread,
                r: 1.1 + rand() * 1.5,
                ci,
            });
        }
    });

    // Edges: each point links to its 2 nearest siblings in the same cluster
    const edges = [];
    CLUSTERS.forEach((c, ci) => {
        const idx = points.map((p, i) => (p.ci === ci ? i : -1)).filter((i) => i >= 0);
        idx.forEach((i) => {
            const dists = idx
                .filter((j) => j !== i)
                .map((j) => {
                    const a = points[i], b = points[j];
                    const d = (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2;
                    return { j, d };
                })
                .sort((a, b) => a.d - b.d)
                .slice(0, 2);
            dists.forEach(({ j }) => {
                if (i < j) edges.push([i, j]);
                else edges.push([j, i]);
            });
        });
    });
    // dedupe
    const seen = new Set();
    const uniqueEdges = edges.filter(([a, b]) => {
        const k = a * 1000 + b;
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
    });

    // Ambient dust for depth
    const dust = [];
    for (let i = 0; i < 90; i++) {
        dust.push({
            x: (rand() - 0.5) * 4.2,
            y: (rand() - 0.5) * 3.4,
            z: (rand() - 0.5) * 4.2,
            r: 0.5 + rand() * 0.9,
        });
    }

    return { points, edges: uniqueEdges, dust };
}

const UNIVERSE = buildUniverse();
const AXIS_LEN = 1.35;

export default function LatentField({ dark = true, className = "" }) {
    const canvasRef = useRef(null);
    const darkRef = useRef(dark);
    const redrawRef = useRef(null);
    darkRef.current = dark;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        let W = 0, H = 0, DPR = 1;
        let rotY = 0.6, rotX = -0.22;
        let velY = reduceMotion ? 0 : 0.0022;
        let velX = 0;
        let targetParX = 0, targetParY = 0, parX = 0, parY = 0;
        let dragging = false, lastPX = 0, lastPY = 0;
        let raf = null, running = false, visible = true, tabVisible = true;

        const resize = () => {
            const rect = canvas.parentElement.getBoundingClientRect();
            DPR = Math.min(window.devicePixelRatio || 1, 2);
            W = rect.width;
            H = rect.height;
            canvas.width = Math.round(W * DPR);
            canvas.height = Math.round(H * DPR);
            canvas.style.width = `${W}px`;
            canvas.style.height = `${H}px`;
        };

        const project = (x, y, z) => {
            // rotate Y then X
            const cy = Math.cos(rotY + parX), sy = Math.sin(rotY + parX);
            const cx = Math.cos(rotX + parY), sx = Math.sin(rotX + parY);
            let dx = x * cy + z * sy;
            let dz = -x * sy + z * cy;
            let dy = y * cx - dz * sx;
            dz = y * sx + dz * cx;
            const D = 3.6;
            const f = Math.min(W, H) * 0.66;
            const s = f / (dz + D);
            // On wide screens the text sits left, so the field leans right
            const centerX = W > 900 ? W * 0.62 : W * 0.5;
            return { X: centerX + dx * s, Y: H * 0.46 + dy * s, s, depth: dz };
        };

        const draw = () => {
            const isDark = darkRef.current;
            ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
            ctx.clearRect(0, 0, W, H);

            const inkAxis = isDark ? "255,255,255" : "20,23,34";
            const dustInk = isDark ? "200,205,225" : "40,45,64";

            // ---- axes (the instrument frame) ----
            ctx.lineWidth = 1;
            const axes = [
                [[-AXIS_LEN, 0, 0], [AXIS_LEN, 0, 0], "dim₀"],
                [[0, -AXIS_LEN, 0], [0, AXIS_LEN, 0], "dim₁"],
                [[0, 0, -AXIS_LEN], [0, 0, AXIS_LEN], "dim₂"],
            ];
            ctx.font = "10px 'IBM Plex Mono', monospace";
            axes.forEach(([a, b, name]) => {
                const A = project(...a), B = project(...b);
                ctx.strokeStyle = `rgba(${inkAxis},${isDark ? 0.10 : 0.13})`;
                ctx.beginPath();
                ctx.moveTo(A.X, A.Y);
                ctx.lineTo(B.X, B.Y);
                ctx.stroke();
                // ticks every 0.45 units
                for (let t = -1; t <= 1; t += 0.45) {
                    if (Math.abs(t) < 0.01) continue;
                    const P = project(a[0] ? t : 0, a[1] ? t : 0, a[2] ? t : 0);
                    ctx.fillStyle = `rgba(${inkAxis},${isDark ? 0.16 : 0.2})`;
                    ctx.fillRect(P.X - 1, P.Y - 1, 2, 2);
                }
                ctx.fillStyle = `rgba(${inkAxis},${isDark ? 0.28 : 0.34})`;
                ctx.fillText(name, B.X + 5, B.Y + 3);
            });

            // ---- dust ----
            UNIVERSE.dust.forEach((p) => {
                const P = project(p.x, p.y, p.z);
                if (P.depth < -3.0) return;
                const a = Math.max(0.03, 0.14 - P.depth * 0.035);
                ctx.fillStyle = `rgba(${dustInk},${a})`;
                ctx.beginPath();
                ctx.arc(P.X, P.Y, p.r * (P.s / 300), 0, Math.PI * 2);
                ctx.fill();
            });

            // ---- edges ----
            const proj = UNIVERSE.points.map((p) => project(p.x, p.y, p.z));
            ctx.lineWidth = 0.7;
            UNIVERSE.edges.forEach(([i, j]) => {
                const A = proj[i], B = proj[j];
                const [r, g, b] = CLUSTERS[UNIVERSE.points[i].ci].color;
                const depth = (A.depth + B.depth) * 0.5;
                const a = Math.max(0.04, (isDark ? 0.22 : 0.28) - depth * 0.08);
                ctx.strokeStyle = `rgba(${r},${g},${b},${a})`;
                ctx.beginPath();
                ctx.moveTo(A.X, A.Y);
                ctx.lineTo(B.X, B.Y);
                ctx.stroke();
            });

            // ---- points (painter's order, far → near) ----
            const order = UNIVERSE.points
                .map((p, i) => ({ i, depth: proj[i].depth }))
                .sort((a, b) => b.depth - a.depth);
            order.forEach(({ i }) => {
                const p = UNIVERSE.points[i];
                const P = proj[i];
                const [r, g, b] = CLUSTERS[p.ci].color;
                const a = Math.min(1, Math.max(0.12, (isDark ? 0.95 : 0.9) - P.depth * 0.28));
                const rad = Math.max(0.6, p.r * (P.s / 260));
                ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
                ctx.beginPath();
                ctx.arc(P.X, P.Y, rad, 0, Math.PI * 2);
                ctx.fill();
            });

            // ---- cluster labels ----
            ctx.font = "500 10px 'IBM Plex Mono', monospace";
            CLUSTERS.forEach((c) => {
                const P = project(c.center[0], c.center[1] + c.spread + 0.16, c.center[2]);
                if (P.depth > 1.2) return; // fade out labels far behind
                const a = Math.min(0.9, Math.max(0.15, 0.75 - P.depth * 0.35));
                const [r, g, b] = c.color;
                const text = c.label.toUpperCase();
                ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
                const w = ctx.measureText(text).width;
                ctx.fillText(text, P.X - w / 2, P.Y);
                ctx.fillStyle = `rgba(${r},${g},${b},${a * 0.55})`;
                ctx.fillRect(P.X - 1.5, P.Y + 4, 3, 3);
            });
        };

        const tick = () => {
            raf = null;
            if (!visible || !tabVisible) { running = false; return; }
            if (!dragging) {
                rotY += velY;
                rotX += velX;
                // inertia decays back to gentle auto-orbit
                if (!reduceMotion) velY += (0.0022 - velY) * 0.02;
                else velY *= 0.94;
                velX *= 0.94;
                rotX = Math.max(-1.1, Math.min(1.1, rotX));
            }
            parX += (targetParX - parX) * 0.05;
            parY += (targetParY - parY) * 0.05;
            draw();
            const still =
                reduceMotion && !dragging &&
                Math.abs(velY) < 0.0001 && Math.abs(velX) < 0.0001 &&
                Math.abs(targetParX - parX) < 0.001 && Math.abs(targetParY - parY) < 0.001;
            if (still) { running = false; return; }
            raf = requestAnimationFrame(tick);
            running = true;
        };

        const wake = () => {
            if (!running && !raf) { running = true; raf = requestAnimationFrame(tick); }
        };

        // ---- interaction ----
        const onPointerDown = (e) => {
            dragging = true;
            lastPX = e.clientX;
            lastPY = e.clientY;
            canvas.style.cursor = "grabbing";
            canvas.setPointerCapture?.(e.pointerId);
            wake();
        };
        const onPointerMove = (e) => {
            if (dragging) {
                const dx = e.clientX - lastPX;
                const dy = e.clientY - lastPY;
                lastPX = e.clientX;
                lastPY = e.clientY;
                rotY += dx * 0.005;
                rotX = Math.max(-1.1, Math.min(1.1, rotX + dy * 0.003));
                velY = dx * 0.0004;
                velX = dy * 0.0002;
                draw();
            } else if (!reduceMotion) {
                const rect = canvas.getBoundingClientRect();
                targetParX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.14;
                targetParY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.10;
                wake();
            }
        };
        const onPointerUp = (e) => {
            dragging = false;
            canvas.style.cursor = "grab";
            canvas.releasePointerCapture?.(e.pointerId);
            wake();
        };
        const onPointerLeave = () => {
            targetParX = 0;
            targetParY = 0;
        };

        canvas.addEventListener("pointerdown", onPointerDown);
        canvas.addEventListener("pointermove", onPointerMove);
        canvas.addEventListener("pointerup", onPointerUp);
        canvas.addEventListener("pointercancel", onPointerUp);
        canvas.addEventListener("pointerleave", onPointerLeave);

        // ---- lifecycle ----
        const ro = new ResizeObserver(() => { resize(); draw(); });
        ro.observe(canvas.parentElement);

        const io = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible) wake();
        });
        io.observe(canvas);

        const onVis = () => {
            tabVisible = document.visibilityState === "visible";
            if (tabVisible) wake();
        };
        document.addEventListener("visibilitychange", onVis);

        resize();
        draw();
        redrawRef.current = draw;
        if (!reduceMotion) wake();

        return () => {
            if (raf) cancelAnimationFrame(raf);
            ro.disconnect();
            io.disconnect();
            document.removeEventListener("visibilitychange", onVis);
            canvas.removeEventListener("pointerdown", onPointerDown);
            canvas.removeEventListener("pointermove", onPointerMove);
            canvas.removeEventListener("pointerup", onPointerUp);
            canvas.removeEventListener("pointercancel", onPointerUp);
            canvas.removeEventListener("pointerleave", onPointerLeave);
        };
    }, []);

    // Repaint on theme flip — needed when the loop is paused (reduced motion)
    useEffect(() => {
        redrawRef.current?.();
    }, [dark]);

    return (
        <div className={`latent-field ${className}`} aria-hidden="true">
            <canvas ref={canvasRef} className="latent-canvas" />
        </div>
    );
}
