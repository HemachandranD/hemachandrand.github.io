import { useMemo } from "react";

// ============================================================
// ProjectCover — generated constellation art for projects that
// don't have a screenshot yet. Deterministic per project id, so
// every card keeps its own recognizable "embedding".
// Colors walk the site's inferno ramp.
// ============================================================

const RAMP = ["#FFB224", "#F0527C", "#B266FF", "#FF7847", "#FFD166", "#D654C8"];

// Same deterministic PRNG the latent field uses
function mulberry32(seed) {
    return function () {
        let t = (seed += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const W = 320;
const H = 180;

export default function ProjectCover({ seed = 1, label = "" }) {
    const { points, edges, color } = useMemo(() => {
        const rand = mulberry32(seed * 7919 + 20180618);
        const color = RAMP[seed % RAMP.length];

        // two loose clusters of points, kept away from the edges
        const points = [];
        const clusters = [
            { cx: 70 + rand() * 60, cy: 55 + rand() * 40, n: 7 },
            { cx: 190 + rand() * 60, cy: 80 + rand() * 45, n: 8 },
        ];
        clusters.forEach(({ cx, cy, n }) => {
            for (let i = 0; i < n; i++) {
                points.push({
                    x: cx + (rand() - 0.5) * 95,
                    y: cy + (rand() - 0.5) * 70,
                    r: 1.2 + rand() * 2.1,
                });
            }
        });

        // each point links to its nearest neighbor — one pass, no dupes
        const edges = [];
        points.forEach((p, i) => {
            let best = -1;
            let bestD = Infinity;
            points.forEach((q, j) => {
                if (i === j) return;
                const d = (p.x - q.x) ** 2 + (p.y - q.y) ** 2;
                if (d < bestD) { bestD = d; best = j; }
            });
            if (best > i) edges.push([i, best]);
            else if (best >= 0 && !edges.some(([a, b]) => a === best && b === i)) edges.push([best, i]);
        });

        return { points, edges, color };
    }, [seed]);

    return (
        <svg
            viewBox={`0 0 ${W} ${H}`}
            className="proj-cover"
            role="img"
            aria-label={label ? `${label} — generated cover art` : "generated cover art"}
            preserveAspectRatio="xMidYMid slice"
        >
            {/* soft wash of the project's ramp color */}
            <defs>
                <radialGradient id={`pc-glow-${seed}`} cx="30%" cy="25%" r="85%">
                    <stop offset="0%" stopColor={color} stopOpacity="0.16" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </radialGradient>
            </defs>
            <rect width={W} height={H} fill={`url(#pc-glow-${seed})`} />

            {/* faint plotting grid */}
            {[...Array(7)].map((_, i) => (
                <line key={`v${i}`} x1={(i + 1) * 40} y1="0" x2={(i + 1) * 40} y2={H} stroke="currentColor" strokeOpacity="0.05" />
            ))}
            {[...Array(4)].map((_, i) => (
                <line key={`h${i}`} x1="0" y1={(i + 1) * 40} x2={W} y2={(i + 1) * 40} stroke="currentColor" strokeOpacity="0.05" />
            ))}

            {edges.map(([a, b], i) => (
                <line
                    key={`e${i}`}
                    x1={points[a].x} y1={points[a].y}
                    x2={points[b].x} y2={points[b].y}
                    stroke={color} strokeOpacity="0.35" strokeWidth="0.8"
                />
            ))}
            {points.map((p, i) => (
                <circle key={`p${i}`} cx={p.x} cy={p.y} r={p.r} fill={color} fillOpacity="0.85" />
            ))}
        </svg>
    );
}
