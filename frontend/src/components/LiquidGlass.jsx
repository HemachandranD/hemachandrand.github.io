import { useEffect, useState } from "react";

// ============================================================
// LiquidGlass — the refraction engine behind every `.glass` surface.
//
// Every glass surface gets blur + saturation + a specular rim in CSS
// (works everywhere). On Chromium, which can run SVG filters inside
// `backdrop-filter`, we go further: a displacement map generated here
// bends the backdrop near each surface's edge, like light through a
// thick glass lens. Safari/Firefox keep the frosted fallback.
// ============================================================

// Encode a displacement field as an RGBA image: R/G = 0.5 ± offset.
function paint(w, h, fn) {
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d");
    const img = ctx.createImageData(w, h);
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const [dx, dy] = fn(x + 0.5, y + 0.5);
            const i = (y * w + x) * 4;
            img.data[i] = Math.round(127.5 + dx * 127.5);
            img.data[i + 1] = Math.round(127.5 + dy * 127.5);
            img.data[i + 2] = 128;
            img.data[i + 3] = 255;
        }
    }
    ctx.putImageData(img, 0, 0);
    return c.toDataURL("image/png");
}

// Rounded-rect edge lens: neutral in the middle; inside a band along the
// edge it samples from further out, so the backdrop just beyond the rim
// is squeezed into it, the way a thick glass edge bends light.
function edgeMap(w, h, r, band) {
    const cx = w / 2, cy = h / 2;
    return paint(w, h, (x, y) => {
        const qx = Math.abs(x - cx) - (cx - r);
        const qy = Math.abs(y - cy) - (cy - r);
        const outside = Math.hypot(Math.max(qx, 0), Math.max(qy, 0));
        const sdf = outside + Math.min(Math.max(qx, qy), 0) - r;
        const depth = -sdf; // distance inside the shape
        if (depth >= band) return [0, 0];
        let nx, ny;
        if (qx > 0 && qy > 0) {
            const len = Math.hypot(qx, qy) || 1;
            nx = (qx / len) * Math.sign(x - cx);
            ny = (qy / len) * Math.sign(y - cy);
        } else if (qx > qy) {
            nx = Math.sign(x - cx); ny = 0;
        } else {
            nx = 0; ny = Math.sign(y - cy);
        }
        const t = 1 - Math.max(0, depth) / band;
        const s = t * t;
        return [nx * s, ny * s];
    });
}

function supportsRefraction() {
    if (typeof window === "undefined") return false;
    if (window.matchMedia("(prefers-reduced-transparency: reduce)").matches) return false;
    const brands = navigator.userAgentData?.brands ?? [];
    const chromium = brands.some((b) => /Chromium|Google Chrome|Microsoft Edge/.test(b.brand));
    return chromium && CSS.supports("backdrop-filter", "blur(1px)");
}

// One filter per surface family, each map drawn at that family's
// typical aspect ratio so the edge band keeps a sane thickness.
const FAMILIES = [
    { id: "lg-pill", scale: 34, map: () => edgeMap(420, 56, 28, 20) },
    { id: "lg-card", scale: 46, map: () => edgeMap(400, 300, 26, 34) },
    { id: "lg-round", scale: 30, map: () => edgeMap(120, 120, 60, 26) },
];

export default function LiquidGlass() {
    const [maps, setMaps] = useState(null);

    useEffect(() => {
        if (!supportsRefraction()) return;
        setMaps(Object.fromEntries(FAMILIES.map((f) => [f.id, f.map()])));
        document.documentElement.classList.add("lg-refract");
        return () => document.documentElement.classList.remove("lg-refract");
    }, []);

    // Specular highlight follows the pointer across whichever glass
    // surface it's over — one listener for the whole page.
    useEffect(() => {
        if (!window.matchMedia("(hover: hover)").matches) return;
        let raf = 0;
        let last = null;
        const onMove = (e) => {
            last = e;
            if (raf) return;
            raf = requestAnimationFrame(() => {
                raf = 0;
                const el = last.target.closest?.(".glass");
                if (!el) return;
                const r = el.getBoundingClientRect();
                el.style.setProperty("--mx", `${((last.clientX - r.left) / r.width) * 100}%`);
                el.style.setProperty("--my", `${((last.clientY - r.top) / r.height) * 100}%`);
            });
        };
        document.addEventListener("pointermove", onMove, { passive: true });
        return () => {
            document.removeEventListener("pointermove", onMove);
            cancelAnimationFrame(raf);
        };
    }, []);

    if (!maps) return null;

    return (
        <svg className="lg-defs" aria-hidden="true" focusable="false">
            {FAMILIES.map((f) => (
                <filter
                    key={f.id}
                    id={f.id}
                    x="0%"
                    y="0%"
                    width="100%"
                    height="100%"
                    colorInterpolationFilters="sRGB"
                >
                    {/* no explicit subregion: the map then spans the
                        surface's own box (an explicit one misaligns it) */}
                    <feImage
                        href={maps[f.id]}
                        preserveAspectRatio="none"
                        result="map"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="map"
                        scale={f.scale}
                        xChannelSelector="R"
                        yChannelSelector="G"
                    />
                </filter>
            ))}
        </svg>
    );
}
