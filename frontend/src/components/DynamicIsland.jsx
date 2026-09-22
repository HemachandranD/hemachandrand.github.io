import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion, useMotionValue, animate as animateTo } from "framer-motion";
import { Mail } from "lucide-react";
import { useUI } from "../lib/ui";

const TIME_ZONE = "America/New_York";

// What I'm probably up to right now, by local (Eastern) hour
function statusFor({ hour, weekday }) {
    const isWeekend = weekday === "Sat" || weekday === "Sun";

    if (isWeekend && hour >= 21) return { emoji: "🎮", short: "Weekend mode", text: "Weekend vibes — definitely not gaming... okay maybe a little", tone: "indigo" };
    if (isWeekend && hour < 3) return { emoji: "🕹️", short: "One more match", text: "One more match... said that 3 matches ago", tone: "indigo" };
    if (hour >= 6 && hour < 9) return { emoji: "☕", short: "Booting up", text: "Brewing coffee & booting up", tone: "amber" };
    if (hour >= 9 && hour < 12) return { emoji: "💻", short: "In flow", text: "Deep in code — morning flow state", tone: "green" };
    if (hour >= 12 && hour < 14) return { emoji: "🍜", short: "Refueling", text: "Refueling for the afternoon sprint", tone: "amber" };
    if (hour >= 14 && hour < 18) return { emoji: "🚀", short: "Shipping", text: "Shipping features & breaking builds", tone: "green" };
    if (hour >= 18 && hour < 21) return { emoji: "🌙", short: "Side quests", text: "Evening experiments & side quests", tone: "violet" };
    if (hour >= 21 && hour < 23) return { emoji: "📚", short: "Winding down", text: "Winding down — reading & reflecting", tone: "blue" };
    return { emoji: "😴", short: "Recharging", text: "Recharging for tomorrow's builds", tone: "gray" };
}

const partsFmt = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
    weekday: "short",
    timeZoneName: "short", // EDT in summer, EST in winter
});

// Eastern wall-clock time; Intl handles the EDT/EST switch
function easternNow() {
    const parts = Object.fromEntries(partsFmt.formatToParts(new Date()).map((p) => [p.type, p.value]));
    const h12 = parseInt(parts.hour, 10) % 12;
    return {
        hour: parts.dayPeriod === "PM" ? h12 + 12 : h12,
        weekday: parts.weekday,
        label: `${parts.hour}:${parts.minute} ${parts.dayPeriod}`,
        zone: parts.timeZoneName,
    };
}

// Re-render only when the displayed minute changes
function useEastern() {
    const [now, setNow] = useState(easternNow);
    useEffect(() => {
        const t = setInterval(() => {
            const next = easternNow();
            setNow((prev) => (prev.label === next.label && prev.zone === next.zone ? prev : next));
        }, 5000);
        return () => clearInterval(t);
    }, []);
    return now;
}

const EXPANDED_MAX = 360;
const SPRING = { type: "spring", stiffness: 380, damping: 32, mass: 0.9 };

// Dynamic Island — a compact live-status capsule that morphs open on
// hover or tap. The shell animates between measured sizes (not a layout
// animation), so the capsule grows as one continuous shape and the text
// inside never stretches or reflows mid-flight.
export default function DynamicIsland() {
    const now = useEastern();
    const status = statusFor(now);
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState(null);
    const { openContact } = useUI();
    const rootRef = useRef(null);
    const barRef = useRef(null);
    const detailRef = useRef(null);
    const hoverTimer = useRef(null);
    const hoverCapable = useRef(false);
    const width = useMotionValue("auto");
    const height = useMotionValue("auto");
    const radius = useMotionValue(999);
    const placed = useRef(false);

    // Measure the collapsed bar and the expanded detail
    useLayoutEffect(() => {
        const measure = () => {
            const bar = barRef.current, detail = detailRef.current, root = rootRef.current;
            if (!bar || !detail || !root) return;
            const avail = root.parentElement?.clientWidth || EXPANDED_MAX;
            // natural (collapsed) width from the pieces themselves — the
            // bar is full-width, so its own width is whatever it's given
            const cs = getComputedStyle(bar);
            const kids = [...bar.children];
            const natural =
                parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight) +
                parseFloat(cs.columnGap || 0) * (kids.length - 1) +
                kids.reduce((w, k) => w + k.offsetWidth, 0);
            const next = {
                closedW: Math.ceil(Math.min(natural, avail)),
                openW: Math.min(EXPANDED_MAX, avail),
                barH: bar.offsetHeight,
                detailH: detail.offsetHeight,
            };
            setSize((prev) =>
                prev && Object.keys(next).every((k) => prev[k] === next[k]) ? prev : next
            );
        };
        measure();
        document.fonts?.ready?.then(measure).catch(() => { });
        const ro = new ResizeObserver(measure);
        [...barRef.current.children].forEach((k) => ro.observe(k));
        ro.observe(detailRef.current);
        if (rootRef.current?.parentElement) ro.observe(rootRef.current.parentElement);
        return () => ro.disconnect();
    }, [status.short, now.label]);

    useEffect(() => {
        hoverCapable.current = window.matchMedia("(hover: hover)").matches;
        return () => clearTimeout(hoverTimer.current);
    }, []);

    useEffect(() => {
        if (!open) return;
        const onDown = (e) => {
            if (!rootRef.current?.contains(e.target)) setOpen(false);
        };
        const onKey = (e) => e.key === "Escape" && setOpen(false);
        document.addEventListener("pointerdown", onDown);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("pointerdown", onDown);
            document.removeEventListener("keydown", onKey);
        };
    }, [open]);

    // A little hover intent so grazing the pill doesn't make it flap
    const hoverTo = (value, delay) => {
        if (!hoverCapable.current) return;
        clearTimeout(hoverTimer.current);
        hoverTimer.current = setTimeout(() => setOpen(value), delay);
    };

    // Snap to the measured size once, then spring on every change
    useLayoutEffect(() => {
        if (!size) return;
        const target = {
            w: open ? size.openW : size.closedW,
            h: open ? size.barH + size.detailH : size.barH,
            r: open ? 28 : size.barH / 2,
        };
        if (!placed.current) {
            placed.current = true;
            width.set(target.w);
            height.set(target.h);
            radius.set(target.r);
            return;
        }
        const anims = [
            animateTo(width, target.w, SPRING),
            animateTo(height, target.h, SPRING),
            animateTo(radius, target.r, SPRING),
        ];
        return () => anims.forEach((a) => a.stop());
    }, [open, size, width, height, radius]);

    return (
        <motion.div
            ref={rootRef}
            className={`island ${open ? "island-open" : ""}`}
            style={{ width, height, borderRadius: radius }}
            onPointerEnter={() => hoverTo(true, 90)}
            onPointerLeave={() => hoverTo(false, 180)}
        >
            <button
                ref={barRef}
                type="button"
                className="island-bar"
                aria-expanded={open}
                aria-controls="island-detail"
                onClick={(e) => {
                    clearTimeout(hoverTimer.current);
                    // with a mouse, hover already opened it — a click
                    // shouldn't snap it shut; taps and keyboard toggle
                    const mouse = hoverCapable.current && e.detail > 0;
                    setOpen((o) => (mouse ? true : !o));
                }}
            >
                <span className={`island-dot tone-${status.tone}`} aria-hidden="true" />
                <span className="island-emoji" aria-hidden="true">{status.emoji}</span>
                <span className="island-short">{status.short}</span>
                <span className="island-time">{now.label} {now.zone}</span>
            </button>

            {/* Always rendered (so it can be measured); faded and inert
                while the capsule is closed */}
            <motion.div
                ref={detailRef}
                id="island-detail"
                className="island-detail"
                style={size ? { width: size.openW } : undefined}
                inert={!open}
                aria-hidden={!open}
                initial={false}
                animate={open ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: -6, filter: "blur(4px)" }}
                transition={open ? { duration: 0.28, delay: 0.1, ease: [0.23, 1, 0.32, 1] } : { duration: 0.12 }}
            >
                <p className="island-text">{status.text}</p>
                <div className="island-row">
                    <span className="island-meta">Eastern Time · {now.zone}</span>
                    <button
                        type="button"
                        className="island-cta"
                        tabIndex={open ? 0 : -1}
                        onClick={() => {
                            setOpen(false);
                            openContact();
                        }}
                    >
                        <Mail className="w-3.5 h-3.5" /> Say hi
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
