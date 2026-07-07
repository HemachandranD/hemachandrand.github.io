import { useRef } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useMotionTemplate,
} from "framer-motion";

// ============================================================
// TiltCard — pointer-driven 3D tilt with a light glare sweep.
// Spring-smoothed so it feels physical, not jittery.
// Disabled for touch-only devices and reduced-motion users.
// ============================================================

const MAX_TILT = 6; // degrees

export default function TiltCard({ children, className = "" }) {
    const ref = useRef(null);

    const rx = useMotionValue(0);
    const ry = useMotionValue(0);
    const gx = useMotionValue(50);
    const gy = useMotionValue(50);
    const glareOpacity = useMotionValue(0);

    const srx = useSpring(rx, { stiffness: 260, damping: 22 });
    const sry = useSpring(ry, { stiffness: 260, damping: 22 });
    const sGlare = useSpring(glareOpacity, { stiffness: 200, damping: 30 });

    const glare = useMotionTemplate`radial-gradient(340px circle at ${gx}% ${gy}%, hsl(var(--signal) / 0.10), transparent 65%)`;

    const interactive = () =>
        typeof window !== "undefined" &&
        window.matchMedia("(hover: hover)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onPointerMove = (e) => {
        if (!interactive() || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        rx.set((0.5 - py) * MAX_TILT * 2);
        ry.set((px - 0.5) * MAX_TILT * 2);
        gx.set(px * 100);
        gy.set(py * 100);
        glareOpacity.set(1);
    };

    const onPointerLeave = () => {
        rx.set(0);
        ry.set(0);
        glareOpacity.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className={`tilt-card ${className}`}
            style={{
                rotateX: srx,
                rotateY: sry,
                transformStyle: "preserve-3d",
            }}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
        >
            {children}
            <motion.div
                className="tilt-glare"
                aria-hidden="true"
                style={{ background: glare, opacity: sGlare }}
            />
        </motion.div>
    );
}
