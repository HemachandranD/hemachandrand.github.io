// Generated constellation art for projects without a screenshot.
// Deterministic per project id, so each card keeps its own "embedding".

const RAMP = ["#B266FF", "#F0527C", "#FFB224", "#FF7847", "#D654C8", "#7C8CFF"];
const W = 320;
const H = 180;

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function layout(id: string) {
  const seed = hash(id);
  const rand = mulberry32(seed);
  const ai = seed % RAMP.length;
  const a = RAMP[ai];
  // a second, different colour for the other cluster
  const b = RAMP[(ai + 1 + ((seed >>> 8) % (RAMP.length - 1))) % RAMP.length];

  const points: { x: number; y: number; r: number; c: string }[] = [];
  [
    { cx: 80 + rand() * 50, cy: 70 + rand() * 40, n: 7, c: a },
    { cx: 200 + rand() * 50, cy: 90 + rand() * 40, n: 8, c: b },
  ].forEach(({ cx, cy, n, c }) => {
    for (let i = 0; i < n; i++) {
      points.push({ x: cx + (rand() - 0.5) * 110, y: cy + (rand() - 0.5) * 80, r: 1.4 + rand() * 2.4, c });
    }
  });

  // link each point to its nearest neighbour
  const edges = new Set<string>();
  points.forEach((p, i) => {
    let best = -1;
    let bestD = Infinity;
    points.forEach((q, j) => {
      const d = (p.x - q.x) ** 2 + (p.y - q.y) ** 2;
      if (i !== j && d < bestD) {
        bestD = d;
        best = j;
      }
    });
    edges.add(i < best ? `${i}-${best}` : `${best}-${i}`);
  });

  return { a, b, points, edges: [...edges].map((e) => e.split("-").map(Number)) };
}

export function ProjectCover({ id, className }: { id: string; className?: string }) {
  const { a, b, points, edges } = layout(id);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={className}>
      <defs>
        <radialGradient id={`glow-a-${id}`} cx="25%" cy="30%" r="70%">
          <stop offset="0%" stopColor={a} stopOpacity="0.28" />
          <stop offset="100%" stopColor={a} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`glow-b-${id}`} cx="80%" cy="75%" r="65%">
          <stop offset="0%" stopColor={b} stopOpacity="0.22" />
          <stop offset="100%" stopColor={b} stopOpacity="0" />
        </radialGradient>
        <pattern id={`grid-${id}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="currentColor" strokeOpacity="0.07" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width={W} height={H} fill={`url(#grid-${id})`} />
      <rect width={W} height={H} fill={`url(#glow-a-${id})`} />
      <rect width={W} height={H} fill={`url(#glow-b-${id})`} />
      {edges.map(([i, j]) => (
        <line
          key={`${i}-${j}`}
          x1={points[i].x}
          y1={points[i].y}
          x2={points[j].x}
          y2={points[j].y}
          stroke={points[i].c}
          strokeOpacity="0.45"
          strokeWidth="0.8"
        />
      ))}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={p.c} fillOpacity="0.9" />
      ))}
    </svg>
  );
}
