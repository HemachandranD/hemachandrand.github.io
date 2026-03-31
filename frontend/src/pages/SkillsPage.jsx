import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "../data/portfolio";

// Animated number counter
function AnimatedNumber({ value, duration = 1.5 }) {
    const [displayed, setDisplayed] = useState(0);

    return (
        <motion.span
            className="tabular-nums"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            onViewportEnter={() => {
                let start = 0;
                const step = value / (duration * 60);
                const timer = setInterval(() => {
                    start += step;
                    if (start >= value) {
                        start = value;
                        clearInterval(timer);
                    }
                    setDisplayed(Math.round(start));
                }, 1000 / 60);
            }}
        >
            {displayed}
        </motion.span>
    );
}

// Skill bar – monochrome, matching portfolio palette
function SkillBar({ skill, index, catIndex }) {
    const delay = catIndex * 0.15 + index * 0.08;

    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay, ease: "easeOut" }}
            className="group"
        >
            <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] font-medium text-foreground">
                    {skill.name}
                </span>
                <span className="text-xs font-semibold text-muted-foreground">
                    <AnimatedNumber value={skill.level} duration={1 + delay} />%
                </span>
            </div>
            <div className="relative h-2 rounded-full bg-muted overflow-hidden">
                {/* Main bar */}
                <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-foreground/80"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
                {/* Shimmer sweep */}
                <motion.div
                    className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
                    initial={{ x: "-100%" }}
                    whileInView={{ x: "500%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: delay + 1, ease: "easeInOut" }}
                />
            </div>
        </motion.div>
    );
}

// Radar/hexagon SVG for the overall stats visualization
function StatsRadar() {
    const stats = [
        { label: "AI/ML", value: 95 },
        { label: "MLOps", value: 90 },
        { label: "Cloud", value: 88 },
        { label: "Python", value: 92 },
        { label: "LLMs", value: 93 },
        { label: "DevOps", value: 85 },
    ];

    const cx = 100, cy = 100, r = 70;
    const n = stats.length;

    const getPoint = (i, val) => {
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
        const dist = (val / 100) * r;
        return [cx + dist * Math.cos(angle), cy + dist * Math.sin(angle)];
    };

    const gridLevels = [25, 50, 75, 100];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex justify-center"
        >
            <svg viewBox="0 0 200 200" className="w-64 h-64 sm:w-72 sm:h-72">
                {/* Grid rings */}
                {gridLevels.map((level) => (
                    <polygon
                        key={level}
                        points={Array.from({ length: n }, (_, i) => getPoint(i, level).join(",")).join(" ")}
                        fill="none"
                        stroke="hsl(var(--border))"
                        strokeWidth="0.5"
                        opacity={0.6}
                    />
                ))}

                {/* Axis lines */}
                {stats.map((_, i) => {
                    const [px, py] = getPoint(i, 100);
                    return <line key={i} x1={cx} y1={cy} x2={px} y2={py} stroke="hsl(var(--border))" strokeWidth="0.5" opacity={0.4} />;
                })}

                {/* Data polygon */}
                <motion.polygon
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    points={stats.map((s, i) => getPoint(i, s.value).join(",")).join(" ")}
                    fill="hsl(var(--foreground) / 0.08)"
                    stroke="hsl(var(--foreground))"
                    strokeWidth="1.5"
                />

                {/* Data points */}
                {stats.map((s, i) => {
                    const [px, py] = getPoint(i, s.value);
                    return (
                        <motion.circle
                            key={i}
                            cx={px}
                            cy={py}
                            r="3"
                            fill="hsl(var(--foreground))"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 300 }}
                        />
                    );
                })}

                {/* Labels */}
                {stats.map((s, i) => {
                    const [px, py] = getPoint(i, 115);
                    return (
                        <text
                            key={i}
                            x={px}
                            y={py}
                            textAnchor="middle"
                            dominantBaseline="central"
                            className="fill-muted-foreground"
                            fontSize="7"
                            fontWeight="500"
                        >
                            {s.label}
                        </text>
                    );
                })}
            </svg>
        </motion.div>
    );
}

export default function SkillsPage() {
    const [activeCategory, setActiveCategory] = useState(null);

    const displayed = activeCategory !== null
        ? [skills[activeCategory]]
        : skills;

    return (
        <div className="max-w-[700px] mx-auto px-5 sm:px-6 py-10 sm:py-16">
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-10"
            >
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                    Skills & Expertise
                </h1>
                <p className="text-sm text-muted-foreground">
                    7+ years of leveling up across AI, ML, and cloud engineering.
                </p>
            </motion.div>

            {/* Radar Chart */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mb-12"
            >
                <StatsRadar />
            </motion.section>

            {/* Category Tabs */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="flex flex-wrap gap-2 mb-8"
            >
                <button
                    onClick={() => setActiveCategory(null)}
                    className={`skill-tab ${activeCategory === null ? "active" : ""}`}
                >
                    All
                </button>
                {skills.map((cat, i) => (
                    <button
                        key={cat.category}
                        onClick={() => setActiveCategory(activeCategory === i ? null : i)}
                        className={`skill-tab ${activeCategory === i ? "active" : ""}`}
                    >
                        <span className="mr-1.5">{cat.icon}</span>
                        {cat.category}
                    </button>
                ))}
            </motion.div>

            {/* Skill Categories */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCategory ?? "all"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-10"
                >
                    {displayed.map((category, catIdx) => (
                        <motion.section
                            key={category.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: catIdx * 0.1 }}
                        >
                            {/* Category Header */}
                            <div className="flex items-center gap-2.5 mb-5">
                                <span className="text-xl">{category.icon}</span>
                                <h2 className="text-base font-semibold tracking-tight">
                                    {category.category}
                                </h2>
                                <div className="flex-1 h-px bg-border ml-2" />
                            </div>

                            {/* Skill Bars */}
                            <div className="space-y-4 pl-1">
                                {category.items.map((skill, skillIdx) => (
                                    <SkillBar
                                        key={skill.name}
                                        skill={skill}
                                        index={skillIdx}
                                        catIndex={catIdx}
                                    />
                                ))}
                            </div>
                        </motion.section>
                    ))}
                </motion.div>
            </AnimatePresence>

            {/* Summary Stats */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
                {[
                    { label: "Years XP", value: "7+", icon: "⚡" },
                    { label: "Projects", value: "25+", icon: "🚀" },
                    { label: "Certifications", value: "5+", icon: "🏆" },
                    { label: "Tech Stack", value: "30+", icon: "🛠️" },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 300 }}
                        whileHover={{ y: -4 }}
                        className="text-center p-4 rounded-xl border border-border bg-card hover:shadow-md transition-shadow"
                    >
                        <span className="text-2xl block mb-1">{stat.icon}</span>
                        <span className="text-xl font-bold block">{stat.value}</span>
                        <span className="text-xs text-muted-foreground">{stat.label}</span>
                    </motion.div>
                ))}
            </motion.section>
        </div>
    );
}
