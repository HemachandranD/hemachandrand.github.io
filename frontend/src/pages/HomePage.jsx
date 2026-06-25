import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, FileText, ExternalLink, X, Send, Loader2, ArrowUpRight } from "lucide-react";
import MediumIcon from "../components/ui/MediumIcon";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { profile, links, experience, education, skills, projects } from "../data/portfolio";

// Dynamic IST status hook
function useISTStatus() {
    const [status, setStatus] = useState({ emoji: "", text: "", color: "" });

    useEffect(() => {
        const update = () => {
            const now = new Date();
            // IST = UTC + 5:30
            const utc = now.getTime() + now.getTimezoneOffset() * 60000;
            const ist = new Date(utc + 5.5 * 3600000);
            const hour = ist.getHours();
            const day = ist.getDay(); // 0 = Sunday, 6 = Saturday
            const isWeekend = day === 0 || day === 6;

            if (isWeekend && hour >= 21) {
                setStatus({ emoji: "🎮", text: "Weekend vibes — definitely not gaming... okay maybe a little", color: "bg-indigo-500" });
            } else if (isWeekend && hour < 3) {
                setStatus({ emoji: "🕹️", text: "One more match... said that 3 matches ago", color: "bg-indigo-500" });
            } else if (hour >= 6 && hour < 9) {
                setStatus({ emoji: "☕", text: "Brewing coffee & booting up", color: "bg-amber-400" });
            } else if (hour >= 9 && hour < 12) {
                setStatus({ emoji: "💻", text: "Deep in code — morning flow state", color: "bg-green-500" });
            } else if (hour >= 12 && hour < 14) {
                setStatus({ emoji: "🍜", text: "Refueling for the afternoon sprint", color: "bg-yellow-500" });
            } else if (hour >= 14 && hour < 18) {
                setStatus({ emoji: "🚀", text: "Shipping features & breaking builds", color: "bg-green-500" });
            } else if (hour >= 18 && hour < 21) {
                setStatus({ emoji: "🌙", text: "Evening experiments & side quests", color: "bg-purple-400" });
            } else if (hour >= 21 && hour < 23) {
                setStatus({ emoji: "📚", text: "Winding down — reading & reflecting", color: "bg-blue-400" });
            } else {
                setStatus({ emoji: "😴", text: "Recharging for tomorrow's builds", color: "bg-gray-400" });
            }
        };

        update();
        const interval = setInterval(update, 60000); // refresh every minute
        return () => clearInterval(interval);
    }, []);

    return status;
}

// Visitor counter hook — global count shared across all visitors via counterapi.dev
function useVisitorCount() {
    const [count, setCount] = useState(null);
    const counted = useRef(false);

    useEffect(() => {
        if (counted.current) return;
        counted.current = true;

        // Check if this session already counted (avoid double-count on refresh)
        const SESSION_KEY = "hd-counted-session";
        const alreadyCounted = sessionStorage.getItem(SESSION_KEY);

        const endpoint = alreadyCounted
            ? "https://api.counterapi.dev/v1/hemachandrand-github-io/visits"       // just read
            : "https://api.counterapi.dev/v1/hemachandrand-github-io/visits/up";   // increment + read

        fetch(endpoint)
            .then((r) => r.json())
            .then((data) => {
                if (data?.count != null) {
                    setCount(data.count);
                    if (!alreadyCounted) sessionStorage.setItem(SESSION_KEY, "1");
                }
            })
            .catch(() => {
                // If API is down, show nothing rather than a stale number
                setCount(null);
            });
    }, []);

    return count;
}

// Rotating tagline — streams like generated output
function RotatingText({ texts, interval = 3000 }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % texts.length);
        }, interval);
        return () => clearInterval(timer);
    }, [texts.length, interval]);

    return (
        <span className="rotating-text-wrapper">
            <AnimatePresence mode="wait">
                <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="inline-block"
                >
                    {texts[index]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}

// Animated counter — counts up from 0
function AnimatedCounter({ value }) {
    const [shown, setShown] = useState(0);
    const started = useRef(false);

    useEffect(() => {
        if (value == null || started.current) return;
        started.current = true;
        const dur = 1500;
        const t0 = performance.now();
        const tick = (now) => {
            const p = Math.min((now - t0) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setShown(Math.floor(eased * value));
            if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [value]);

    return shown.toLocaleString();
}

// ===== Decoding name (the signature) =====
// Split each word into BPE-ish subword chunks that "decode" in sequence.
function tokenizeWord(word) {
    const chunks = [];
    const sizes = [3, 4, 2, 3, 5];
    let i = 0;
    let s = 0;
    while (i < word.length) {
        const len = Math.min(sizes[s % sizes.length], word.length - i);
        chunks.push(word.slice(i, i + len));
        i += len;
        s++;
    }
    return chunks;
}

function DecodingName({ name }) {
    const words = useMemo(() => name.split(" ").map(tokenizeWord), [name]);
    let counter = 0;
    return (
        <h1 className="hero-name" aria-label={name}>
            {words.map((tokens, wi) => (
                <span className="word" key={wi} aria-hidden="true">
                    {tokens.map((t, ti) => {
                        const delay = counter * 0.06;
                        counter++;
                        return (
                            <span className="tok" key={ti} style={{ animationDelay: `${delay}s` }}>
                                {t}
                            </span>
                        );
                    })}
                </span>
            ))}
        </h1>
    );
}

// Section reveal on scroll
const reveal = {
    initial: { opacity: 0, y: 20, filter: "blur(6px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] },
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

// Contact Form Modal
function ContactModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [sending, setSending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        try {
            const response = await fetch('https://formsubmit.co/ajax/hema18deena@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    _subject: `Portfolio Contact from ${formData.name}`,
                    _captcha: 'false',
                    _template: 'table',
                }),
            });

            const data = await response.json().catch(() => null);

            if (response.ok && data?.success !== 'false') {
                toast.success("Message sent! Thanks for reaching out! 🚀");
                setFormData({ name: '', email: '', message: '' });
                onClose();
            } else {
                // FormSubmit might need email activation — fall back to mailto
                const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
                const body = encodeURIComponent(
                    `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
                );
                window.open(`mailto:hema18deena@gmail.com?subject=${subject}&body=${body}`, '_blank');
                toast.info("Opening your email client as a fallback...");
                onClose();
            }
        } catch {
            // Network error — fall back to mailto
            const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
            const body = encodeURIComponent(
                `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
            );
            window.open(`mailto:hema18deena@gmail.com?subject=${subject}&body=${body}`, '_blank');
            toast.info("Opening your email client as a fallback...");
            onClose();
        } finally {
            setSending(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 18 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 18 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className="w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-border">
                                <span className="eyebrow flex items-center gap-2">
                                    <span className="dot dot-signal" /> contact.send()
                                </span>
                                <button
                                    onClick={onClose}
                                    className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground"
                                    aria-label="Close"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="p-6">
                                <p className="text-sm text-muted-foreground mb-5">Send me a message — I'll get back to you soon.</p>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="eyebrow block mb-1.5" htmlFor="contact-name">Name</label>
                                        <input
                                            id="contact-name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Your name"
                                            required
                                            className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-signal/40 transition-shadow"
                                        />
                                    </div>
                                    <div>
                                        <label className="eyebrow block mb-1.5" htmlFor="contact-email">Email</label>
                                        <input
                                            id="contact-email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="your@email.com"
                                            required
                                            className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-signal/40 transition-shadow"
                                        />
                                    </div>
                                    <div>
                                        <label className="eyebrow block mb-1.5" htmlFor="contact-message">Message</label>
                                        <textarea
                                            id="contact-message"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            placeholder="Tell me about your project..."
                                            required
                                            rows={4}
                                            className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-signal/40 transition-shadow resize-none"
                                        />
                                    </div>
                                    <button type="submit" disabled={sending} className="btn w-full">
                                        {sending ? (
                                            <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                                        ) : (
                                            <><Send className="w-4 h-4" /> Send Message</>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default function HomePage() {
    const istStatus = useISTStatus();
    const visitorCount = useVisitorCount();
    const [contactOpen, setContactOpen] = useState(false);

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

    const indexRows = [
        { key: "about", val: "7+ yrs · Enterprise AI", to: null, ext: null },
        { key: "work", val: `${projects.length} projects`, to: "/projects", ext: null },
        { key: "skills", val: `${skills.length} domains`, to: "/skills", ext: null },
        ...(links.medium ? [{ key: "writing", val: "Medium", to: null, ext: links.medium }] : []),
    ];

    return (
        <div className="max-w-[760px] mx-auto px-5 sm:px-7 pb-10">
            {/* ===== Hero ===== */}
            <section className="hero">
                <motion.div
                    className="hero-eyebrow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="accent">model</span>
                    <span>·</span>
                    <span>hemz · enterprise-ai</span>
                    {visitorCount != null && (
                        <>
                            <span>·</span>
                            <span>◍ <AnimatedCounter value={visitorCount} /> views</span>
                        </>
                    )}
                </motion.div>

                <div className="hero-top">
                    <DecodingName name={profile.name} />
                    {profile.avatarUrl && (
                        <motion.div
                            className="hero-ava"
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <img src={profile.avatarUrl} alt={profile.name} loading="lazy" />
                        </motion.div>
                    )}
                </div>

                <motion.div
                    className="gen-line"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.55 }}
                >
                    <span className="prompt">▸</span>
                    {profile.taglines && profile.taglines.length > 0 ? (
                        <RotatingText texts={profile.taglines} interval={2800} />
                    ) : (
                        profile.title
                    )}
                    <span className="caret" />
                </motion.div>

                <motion.div
                    className="hero-status"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.75 }}
                >
                    <span className={`dot ${istStatus.color} animate-pulse-dot`} />
                    <span>{istStatus.emoji} {istStatus.text}</span>
                </motion.div>

                {/* Index strip */}
                <motion.div
                    className="index-list"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.85 }}
                >
                    {indexRows.map((row) => {
                        const inner = (
                            <>
                                <span className="index-key">{row.key}</span>
                                <span className="index-val">{row.val}</span>
                                <span className="index-arrow">↗</span>
                            </>
                        );
                        if (row.to) return <Link key={row.key} to={row.to} className="index-row">{inner}</Link>;
                        if (row.ext) return <a key={row.key} href={row.ext} target="_blank" rel="noopener noreferrer" className="index-row">{inner}</a>;
                        return <div key={row.key} className="index-row">{inner}</div>;
                    })}
                </motion.div>
            </section>

            {/* ===== About ===== */}
            <motion.section className="sec" {...reveal}>
                <div className="sec-label">about</div>
                {profile.about.map((p, i) => (
                    <p key={i} className="lead">{p}</p>
                ))}
            </motion.section>

            {/* ===== Skills ===== */}
            {skills.length > 0 && (
                <motion.section className="sec" {...reveal}>
                    <div className="sec-label">skills</div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="sec-h mb-0">Domains &amp; tooling</h2>
                        <Link to="/skills" className="text-xs font-mono text-muted-foreground hover:text-signal flex items-center gap-1 transition-colors">
                            view all <ArrowUpRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="space-y-5">
                        {skills.map((cat) => (
                            <div key={cat.category}>
                                <span className="eyebrow flex items-center gap-1.5 mb-2.5">
                                    <span>{cat.icon}</span> {cat.category}
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {cat.items.map((s) => (
                                        <span key={s.name} className="token-chip">{s.name}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>
            )}

            {/* ===== Connect ===== */}
            <motion.section className="sec" {...reveal}>
                <div className="sec-label">connect</div>
                <h2 className="sec-h">Let's build something</h2>
                <div className="flex flex-wrap gap-2.5">
                    {links.github && (
                        <a href={links.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                            <Github className="w-4 h-4" /> GitHub
                        </a>
                    )}
                    {links.linkedin && (
                        <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                            <Linkedin className="w-4 h-4" /> LinkedIn
                        </a>
                    )}
                    {links.mail && (
                        <button onClick={() => setContactOpen(true)} className="btn">
                            <Mail className="w-4 h-4" /> Mail
                        </button>
                    )}
                    {links.medium && (
                        <a href={links.medium} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                            <MediumIcon className="w-4 h-4" /> Medium
                        </a>
                    )}
                    {links.resume && (
                        <a href={links.resume} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                            <FileText className="w-4 h-4" /> Resume
                        </a>
                    )}
                </div>
            </motion.section>

            {/* ===== Experience ===== */}
            {experience.length > 0 && (
                <motion.section className="sec" {...reveal}>
                    <div className="sec-label">experience</div>
                    <h2 className="sec-h">Where I've worked</h2>
                    <div>
                        {experience.map((exp, i) => (
                            <div key={i} className="xp-row">
                                <div className="xp-head">
                                    {exp.companyUrl ? (
                                        <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="xp-company">
                                            {exp.company}
                                            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                                        </a>
                                    ) : (
                                        <span className="xp-company">{exp.company}</span>
                                    )}
                                    <span className="xp-period">{exp.roles[0]?.period}</span>
                                </div>

                                {exp.roles.map((role, j) => (
                                    <div key={j}>
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
                                        style={{ left: `${tenure.bars[i].left}%` }}
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${tenure.bars[i].width}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                                    />
                                </div>

                                {exp.tags && exp.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mt-3">
                                        {exp.tags.map((tag) => <span key={tag} className="token-chip">{tag}</span>)}
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
                <motion.section className="sec" {...reveal}>
                    <div className="sec-label">education</div>
                    <h2 className="sec-h">Foundations</h2>
                    <div>
                        {education.map((edu, i) => (
                            <div key={i} className="edu-row">
                                <div>
                                    {edu.institutionUrl ? (
                                        <a href={edu.institutionUrl} target="_blank" rel="noopener noreferrer" className="edu-inst">
                                            {edu.institution}
                                            <ExternalLink className="w-3 h-3 text-muted-foreground" />
                                        </a>
                                    ) : (
                                        <span className="edu-inst">{edu.institution}</span>
                                    )}
                                    <div className="edu-degree">{edu.degree}</div>
                                </div>
                                <span className="xp-period">{edu.period}</span>
                            </div>
                        ))}
                    </div>
                </motion.section>
            )}

            {/* ===== Quote ===== */}
            {profile.quote && (
                <motion.section className="sec" {...reveal}>
                    <div className="quote-block">
                        <p className="quote-text">"{profile.quote.text}"</p>
                        <cite className="quote-cite">— {profile.quote.author}</cite>
                    </div>
                </motion.section>
            )}

            {/* ===== Footer ===== */}
            <footer className="site-footer">
                <p>© {new Date().getFullYear()} {profile.shortName || profile.name.split(" ")[0]} <span className="sep">·</span> built with love, AI &amp; coffee ☕</p>
            </footer>

            <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
        </div>
    );
}
