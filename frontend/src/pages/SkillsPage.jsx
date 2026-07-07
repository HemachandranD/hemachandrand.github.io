import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills, profile, yearsOfExperience } from "../data/portfolio";

// Confidence levels read as tiers, not fake-precise percentages
function tierOf(level) {
    if (level >= 90) return "expert";
    if (level >= 85) return "daily driver";
    return "proficient";
}

// Confidence distribution across core domains — reads like a probability readout
function DomainDistribution() {
    const stats = [
        { label: "AI/ML", value: 95 },
        { label: "LLMs", value: 93 },
        { label: "Python", value: 92 },
        { label: "MLOps", value: 90 },
        { label: "Cloud", value: 88 },
        { label: "DevOps", value: 85 },
    ];

    return (
        <div>
            {stats.map((s, i) => (
                <motion.div
                    key={s.label}
                    className="dist-row"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07, ease: "easeOut" }}
                >
                    <span className="dist-label">{s.label}</span>
                    <div className="dist-bar">
                        <motion.div
                            className="dist-fill"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${s.value}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.1, delay: 0.15 + i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
                        />
                    </div>
                    <span className="dist-val">0.{s.value}</span>
                </motion.div>
            ))}
        </div>
    );
}

// Skill gauge — heat readout, colored by each skill's ramp stop
function SkillGauge({ skill, index, catIndex }) {
    const delay = catIndex * 0.12 + index * 0.07;

    return (
        <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay, ease: "easeOut" }}
        >
            <div className="gauge-head">
                <span className="gauge-name">{skill.name}</span>
                <span className="gauge-val" style={{ color: skill.color }}>
                    {tierOf(skill.level)}
                </span>
            </div>
            <div className="gauge-track">
                <motion.div
                    className="gauge-fill"
                    style={{ background: `linear-gradient(90deg, ${skill.color}55, ${skill.color})` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: delay + 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
            </div>
        </motion.div>
    );
}

export default function SkillsPage() {
    const [activeCategory, setActiveCategory] = useState(null);

    const displayed = activeCategory !== null ? [skills[activeCategory]] : skills;

    return (
        <div className="page-narrow">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="mb-10"
            >
                <div className="coord">
                    <span className="coord-xy">[ −0.958, 0.344 ]</span>
                    <span className="coord-sep">·</span>
                    <span className="coord-label">skills · telemetry</span>
                </div>
                <h1 className="page-title">Skill-space readout</h1>
                <p className="page-intro">
                    {yearsOfExperience} years of signal, plotted honestly. The readouts are confidence,
                    not ego — they move as I learn.
                </p>
            </motion.div>

            {/* Confidence distribution */}
            <motion.section
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="mb-12"
            >
                <div className="cat-head">
                    <span className="title">Confidence across domains</span>
                    <div className="rule" />
                </div>
                <DomainDistribution />
            </motion.section>

            {/* Category tabs */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="flex flex-wrap gap-2 mb-9"
            >
                <button
                    onClick={() => setActiveCategory(null)}
                    className={`skill-tab ${activeCategory === null ? "active" : ""}`}
                >
                    all
                </button>
                {skills.map((cat, i) => (
                    <button
                        key={cat.category}
                        onClick={() => setActiveCategory(activeCategory === i ? null : i)}
                        className={`skill-tab ${activeCategory === i ? "active" : ""}`}
                    >
                        <span className="cat-glyph mr-1.5">{cat.icon}</span>
                        {cat.category}
                    </button>
                ))}
            </motion.div>

            {/* Skill categories */}
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
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: catIdx * 0.1 }}
                        >
                            <div className="cat-head">
                                <span className="cat-glyph text-lg">{category.icon}</span>
                                <h2 className="title">{category.category}</h2>
                                <div className="rule" />
                            </div>

                            <div className="space-y-4">
                                {category.items.map((skill, skillIdx) => (
                                    <SkillGauge
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

            {/* Summary metrics */}
            <motion.section
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
                {[
                    { label: "years in production", value: `${yearsOfExperience}+` },
                    { label: "builds & experiments", value: "25+" },
                    { label: "industries served", value: "3" },
                    { label: "tools in rotation", value: "30+" },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.92 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.25 + i * 0.08, type: "spring", stiffness: 300 }}
                        className="metric-tile"
                    >
                        <span className="val block">{stat.value}</span>
                        <span className="label">{stat.label}</span>
                    </motion.div>
                ))}
            </motion.section>

            <footer className="site-footer">
                <p>© {new Date().getFullYear()} {profile.shortName || profile.name.split(" ")[0]} <span className="sep">·</span> mapped in latent space <span className="sep">·</span> caffeine → tokens ☕</p>
            </footer>
        </div>
    );
}
