import { useState, useEffect, useLayoutEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Github, Linkedin, Mail, FileText, ExternalLink, ArrowUpRight, ArrowRight } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MediumIcon from "../components/ui/MediumIcon";
import LatentField from "../components/LatentField";
import DynamicIsland from "../components/DynamicIsland";
import Footer from "../components/Footer";
import ExpertiseCards from "../components/ExpertiseCards";
import { useUI } from "../lib/ui";
import { profile, links, experience, education, skills, projects, yearsOfExperience } from "../data/portfolio";

// Rotating tagline. Holds still for reduced-motion users, and screen
// readers get one static tagline instead of an announcement every cycle.
function RotatingText({ texts, interval = 3000 }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % texts.length);
        }, interval);
        return () => clearInterval(timer);
    }, [texts.length, interval]);

    return (
        <span className="rotating-text-wrapper">
            <span className="sr-only">{texts[0]}</span>
            <span aria-hidden="true">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="inline-block"
                    >
                        {texts[index]}
                    </motion.span>
                </AnimatePresence>
            </span>
        </span>
    );
}

function Eyebrow({ label }) {
    return (
        <div className="eyebrow-row">
            <span className="eyebrow-label">{label}</span>
        </div>
    );
}

// Hero name — words rise out of clipped lines; each line is scaled so
// it spans the column (measured from the rendered text, so it's right
// for whichever system font the visitor's device resolves).
const NAME_MAX_PX = 124;

function RisingName({ name }) {
    const words = useMemo(() => name.split(" "), [name]);
    const boxRef = useRef(null);
    const wordRefs = useRef([]);
    const [sizes, setSizes] = useState([]);

    useLayoutEffect(() => {
        const fit = () => {
            const box = boxRef.current;
            if (!box) return;
            const w = box.clientWidth;
            setSizes(
                wordRefs.current.map((el) => {
                    if (!el) return null;
                    const current = parseFloat(getComputedStyle(el).fontSize);
                    const width = el.getBoundingClientRect().width;
                    return width > 0 ? Math.min((current * w * 0.995) / width, NAME_MAX_PX) : null;
                })
            );
        };
        fit();
        document.fonts?.ready?.then(fit).catch(() => { });
        const ro = new ResizeObserver(fit);
        ro.observe(boxRef.current);
        return () => ro.disconnect();
    }, [words]);

    return (
        <h1 className="hero-name" ref={boxRef} aria-label={name}>
            {words.map((word, i) => (
                <span
                    className="hero-name-line"
                    key={word}
                    aria-hidden="true"
                    style={sizes[i] ? { fontSize: `${sizes[i]}px` } : undefined}
                >
                    <motion.span
                        ref={(el) => (wordRefs.current[i] = el)}
                        className={`hero-name-word ${i === 1 ? "hero-name-accent" : ""}`}
                        initial={{ y: "112%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </h1>
    );
}

// Section reveal on scroll. No `filter` here on purpose: a leftover
// filter on an ancestor would stop the glass inside from seeing the
// page behind it (it becomes the backdrop root).
const reveal = {
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
};

// ===== Tenure timeline parsing =====
const MONTHS = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };

function toDecimalYear(token, nowDec) {
    if (!token) return null;
    if (/present|current|now/i.test(token)) return nowDec;
    const m = token.trim().match(/([A-Za-z]{3,})?\s*(\d{4})/);
    if (!m) return null;
    const year = parseInt(m[2], 10);
    const mon = m[1] ? (MONTHS[m[1].slice(0, 3).toLowerCase()] ?? 0) : 0;
    return year + mon / 12;
}

function parseSpan(period, nowDec) {
    const parts = period.split(/—|–|-|to/i).map((s) => s.trim());
    const start = toDecimalYear(parts[0], nowDec);
    const end = toDecimalYear(parts[1] ?? parts[0], nowDec);
    return { start, end };
}

// Trace span colors walk the inferno ramp, newest = hottest
const SPAN_COLORS = ["#FFB224", "#F0527C", "#B266FF", "#FF7847"];

export default function HomePage() {
    const { openContact } = useUI();
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    const isDark = !mounted || resolvedTheme !== "light";
    const location = useLocation();
    const navigate = useNavigate();

    // Spotlight can jump straight to a section, from any page. The jump
    // is one-shot: clear it from history so Back/reload don't replay it.
    useEffect(() => {
        const id = location.state?.scrollTo;
        if (!id) return;
        const t = setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
            navigate(location.pathname, { replace: true, state: null });
        }, 60);
        return () => clearTimeout(t);
    }, [location.key, location.state, location.pathname, navigate]);

    // Shared tenure timeline (earliest start → now)
    const tenure = useMemo(() => {
        const now = new Date();
        const nowDec = now.getFullYear() + now.getMonth() / 12;
        const spans = experience.map((exp) => {
            const periods = exp.roles.map((r) => parseSpan(r.period, nowDec));
            const start = Math.min(...periods.map((p) => p.start).filter((n) => n != null));
            const end = Math.max(...periods.map((p) => p.end).filter((n) => n != null));
            return { start, end };
        });
        const tlStart = Math.min(...spans.map((s) => s.start));
        const tlEnd = Math.max(nowDec, ...spans.map((s) => s.end));
        const range = tlEnd - tlStart || 1;
        return {
            tlStart: Math.floor(tlStart),
            bars: spans.map((s) => ({
                left: ((s.start - tlStart) / range) * 100,
                width: Math.max(((s.end - s.start) / range) * 100, 4),
            })),
        };
    }, []);

    const widgetRows = [
        { key: "Work", val: `${projects.length} projects`, to: "/projects" },
        { key: "Skills", val: `${skills.length} focus areas`, to: "/skills" },
        ...(links.medium ? [{ key: "Writing", val: "on Medium", ext: links.medium }] : []),
    ];

    const stats = [
        { val: `${yearsOfExperience}+`, label: "years shipping AI" },
        { val: "3", label: "industries served" },
        { val: "25+", label: "builds & experiments" },
        { val: "∞", label: "curiosity" },
    ];

    return (
        <div className="home">
            {/* ===== Hero — the latent field, seen through glass ===== */}
            <section className="hero">
                <LatentField dark={isDark} className="hero-field" />

                <div className="hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.1 }}
                        className="hero-island"
                    >
                        <DynamicIsland />
                    </motion.div>

                    <RisingName name={profile.name} />

                    <motion.p
                        className="hero-tagline"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        {profile.taglines && profile.taglines.length > 0 ? (
                            <RotatingText texts={profile.taglines} interval={2800} />
                        ) : (
                            profile.title
                        )}
                    </motion.p>

                    <motion.div
                        className="hero-actions"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.75 }}
                    >
                        {links.mail && (
                            <button type="button" onClick={openContact} className="btn btn-primary">
                                <Mail className="w-4 h-4" /> Get in touch
                            </button>
                        )}
                        <Link to="/projects" className="glass glass-pill btn btn-glass">
                            See the work <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>

                    {/* Widget — the lookup table, as an iOS widget */}
                    <motion.div
                        className="glass glass-card widget"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.9 }}
                    >
                        <div className="widget-head">
                            <span>Index</span>
                            <button
                                type="button"
                                className="widget-about"
                                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                            >
                                {yearsOfExperience}+ yrs · about me ↓
                            </button>
                        </div>
                        {widgetRows.map((row) => {
                            const inner = (
                                <>
                                    <span className="widget-key">{row.key}</span>
                                    <span className="widget-val">{row.val}</span>
                                    <ArrowUpRight className="widget-arrow" aria-hidden="true" />
                                </>
                            );
                            return row.to ? (
                                <Link key={row.key} to={row.to} className="widget-row">{inner}</Link>
                            ) : (
                                <a key={row.key} href={row.ext} target="_blank" rel="noopener noreferrer" className="widget-row">{inner}</a>
                            );
                        })}
                    </motion.div>

                    <motion.p
                        className="hero-hint"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.4 }}
                    >
                        <span className="hint-desktop">drag the field to orbit · every cluster is a real skill domain</span>
                        <span className="hint-touch">every glowing cluster is a real skill domain</span>
                    </motion.p>
                </div>
            </section>

            <div className="page-body">
                {/* ===== About — bento ===== */}
                <motion.section id="about" className="sec" {...reveal}>
                    <Eyebrow label="About" />
                    <h2 className="sec-h">Demos are easy. <span className="dim">Production is the point.</span></h2>
                    <div className="bento">
                        {profile.avatarUrl && (
                            <figure className="glass glass-card bento-photo">
                                <img src={profile.avatarUrl} alt={profile.name} loading="lazy" />
                                <figcaption className="glass glass-pill photo-caption">Hemz · human, not synthetic</figcaption>
                            </figure>
                        )}
                        <div className="glass glass-card bento-text">
                            {profile.about.map((p, i) => (
                                <p key={i} className="lead">{p}</p>
                            ))}
                        </div>
                        {stats.map((s) => (
                            <div key={s.label} className="glass glass-card bento-stat">
                                <span className="stat-val">{s.val}</span>
                                <span className="stat-label">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* ===== Skills preview ===== */}
                {skills.length > 0 && (
                    <motion.section className="sec" {...reveal}>
                        <Eyebrow label="Skills" />
                        <div className="sec-head-row">
                            <h2 className="sec-h">What I build</h2>
                            <Link to="/skills" className="glass glass-pill view-all">
                                View all <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                        <ExpertiseCards />
                    </motion.section>
                )}

                {/* ===== Experience — the career trace ===== */}
                {experience.length > 0 && (
                    <motion.section id="experience" className="sec" {...reveal}>
                        <Eyebrow label="Experience" />
                        <h2 className="sec-h">The career trace</h2>
                        <div className="glass glass-card trace">
                            <div className="trace-meta">
                                <span>career.run()</span>
                                <span>{experience.length} spans · {tenure.tlStart} → now</span>
                            </div>
                            {experience.map((exp, i) => (
                                <div key={exp.company} className="xp-row">
                                    <div className="xp-head">
                                        {exp.companyUrl ? (
                                            <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="xp-company">
                                                {exp.company}
                                                <ExternalLink className="w-3.5 h-3.5 xp-ext" />
                                            </a>
                                        ) : (
                                            <span className="xp-company">{exp.company}</span>
                                        )}
                                        <span className="xp-period">{exp.roles[0]?.period}</span>
                                    </div>

                                    {exp.roles.map((role) => (
                                        <div key={role.title}>
                                            <div className="xp-role">
                                                {role.title}
                                                {role.type && <span className="xp-type">{role.type}</span>}
                                            </div>
                                            {role.description && <p className="xp-desc">{role.description}</p>}
                                        </div>
                                    ))}

                                    <div className="tenure-track">
                                        <motion.div
                                            className="tenure-fill"
                                            style={{
                                                left: `${tenure.bars[i].left}%`,
                                                background: SPAN_COLORS[i % SPAN_COLORS.length],
                                                boxShadow: `0 0 14px ${SPAN_COLORS[i % SPAN_COLORS.length]}88`,
                                            }}
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${tenure.bars[i].width}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                                        />
                                    </div>

                                    {exp.tags && exp.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mt-3">
                                            {exp.tags.map((tag) => <span key={tag} className="chip chip-sm">{tag}</span>)}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="tenure-scale">
                                <span>{tenure.tlStart}</span>
                                <span>now</span>
                            </div>
                        </div>
                    </motion.section>
                )}

                {/* ===== Education ===== */}
                {education.length > 0 && (
                    <motion.section id="education" className="sec" {...reveal}>
                        <Eyebrow label="Education" />
                        <h2 className="sec-h">Foundations</h2>
                        <div className="edu-grid">
                            {education.map((edu) => (
                                <div key={edu.institution} className="glass glass-card edu-tile">
                                    <span className="xp-period">{edu.period}</span>
                                    {edu.institutionUrl ? (
                                        <a href={edu.institutionUrl} target="_blank" rel="noopener noreferrer" className="edu-inst">
                                            {edu.institution}
                                            <ExternalLink className="w-3 h-3 xp-ext" />
                                        </a>
                                    ) : (
                                        <span className="edu-inst">{edu.institution}</span>
                                    )}
                                    <div className="edu-degree">{edu.degree}</div>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* ===== Connect ===== */}
                <motion.section id="connect" className="sec" {...reveal}>
                    <div className="glass glass-card connect">
                        <div className="connect-glow" aria-hidden="true" />
                        <Eyebrow label="Connect" />
                        <h2 className="connect-h">Let's build something real.</h2>
                        <p className="connect-note">
                            Open to hard problems in agents, LLM systems, and everything it takes to run them in production.
                        </p>
                        <div className="connect-actions">
                            {links.mail && (
                                <button type="button" onClick={openContact} className="btn btn-primary">
                                    <Mail className="w-4 h-4" /> Send a message
                                </button>
                            )}
                            {links.github && (
                                <a href={links.github} target="_blank" rel="noopener noreferrer" className="glass glass-pill btn btn-glass">
                                    <Github className="w-4 h-4" /> GitHub
                                </a>
                            )}
                            {links.linkedin && (
                                <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="glass glass-pill btn btn-glass">
                                    <Linkedin className="w-4 h-4" /> LinkedIn
                                </a>
                            )}
                            {links.medium && (
                                <a href={links.medium} target="_blank" rel="noopener noreferrer" className="glass glass-pill btn btn-glass">
                                    <MediumIcon className="w-4 h-4" /> Medium
                                </a>
                            )}
                            {links.resume && (
                                <a href={links.resume} target="_blank" rel="noopener noreferrer" className="glass glass-pill btn btn-glass">
                                    <FileText className="w-4 h-4" /> Resume
                                </a>
                            )}
                        </div>
                    </div>
                </motion.section>

                <Footer />
            </div>
        </div>
    );
}
