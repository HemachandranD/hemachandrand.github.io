import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, FileText, ExternalLink, Eye, X, Send, Loader2, ArrowRight } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { profile, links, experience, education, skills } from "../data/portfolio";

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

// Visitor counter hook — persists total across sessions via localStorage,
// increments by 1 each page-load (resets on fresh browser / cleared storage).
function useVisitorCount() {
    const [count, setCount] = useState(null);
    const counted = useRef(false);

    useEffect(() => {
        if (counted.current) return;    // guard against StrictMode double-run
        counted.current = true;

        const KEY = "hd-page-views";
        localStorage.removeItem("hd-visitor-count"); // clear legacy key
        const prev = parseInt(localStorage.getItem(KEY), 10) || 0;
        const next = prev + 1;
        localStorage.setItem(KEY, String(next));
        setCount(next);
    }, []);

    return count;
}

// Rotating tagline component
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
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="inline-block"
                >
                    {texts[index]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}

// Medium icon SVG
const MediumIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42S14.2 15.54 14.2 12s1.52-6.42 3.38-6.42 3.38 2.88 3.38 6.42zM24 12c0 3.17-.53 5.75-1.19 5.75S21.62 15.17 21.62 12s.53-5.75 1.19-5.75S24 8.83 24 12z" />
    </svg>
);

// Verified checkmark (Twitter/X style – blue rosette + white tick)
const VerifiedBadge = () => (
    <svg
        className="w-5 h-5 inline-block ml-1.5 flex-shrink-0"
        viewBox="0 0 22 22"
        aria-label="Verified"
    >
        <path
            fill="#1d9bf0"
            d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.855-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.706 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816z"
        />
        <path
            fill="#fff"
            d="M9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
        />
    </svg>
);

const fadeIn = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: "easeOut" },
};

const stagger = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: "easeOut", delay },
});

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
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />
                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 pt-6 pb-2">
                                <div>
                                    <h3 className="text-lg font-semibold tracking-tight">Get in Touch</h3>
                                    <p className="text-sm text-muted-foreground mt-0.5">Send me a message — I'll get back to you soon.</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-4">
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground block mb-1.5" htmlFor="contact-name">Name</label>
                                    <input
                                        id="contact-name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Your name"
                                        required
                                        className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-shadow"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground block mb-1.5" htmlFor="contact-email">Email</label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="your@email.com"
                                        required
                                        className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-shadow"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground block mb-1.5" htmlFor="contact-message">Message</label>
                                    <textarea
                                        id="contact-message"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Tell me about your project..."
                                        required
                                        rows={4}
                                        className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-shadow resize-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={sending}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 disabled:opacity-50 transition-colors"
                                >
                                    {sending ? (
                                        <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                                    ) : (
                                        <><Send className="w-4 h-4" /> Send Message</>
                                    )}
                                </button>
                            </form>
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

    return (
        <div className="max-w-[640px] mx-auto px-5 sm:px-6 py-10 sm:py-16">
            {/* ===== Profile Header ===== */}
            <motion.section {...fadeIn} className="profile-header mb-10">
                <div className="flex items-center gap-5">
                    {/* Avatar - large rounded rectangle */}
                    <div className="profile-avatar-wrapper flex-shrink-0">
                        <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-2xl overflow-hidden bg-muted border-2 border-border flex items-center justify-center">
                            {profile.avatarUrl ? (
                                <img
                                    src={profile.avatarUrl}
                                    alt={profile.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-3xl font-bold text-muted-foreground">
                                    {profile.name.split(" ").map(w => w[0]).join("")}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        {/* Name + Verified */}
                        <div className="flex items-center gap-1 mb-0.5">
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
                                {profile.name.split(' ').slice(0, -1).join(' ')}{' '}
                                <span className="inline-flex items-center whitespace-nowrap">
                                    {profile.name.split(' ').slice(-1)[0]}
                                    <VerifiedBadge />
                                </span>
                            </h1>
                            {visitorCount != null && (
                                <div className="flex items-center gap-1 text-muted-foreground ml-2" title="Page views">
                                    <Eye className="w-3.5 h-3.5" />
                                    <span className="text-xs font-medium tabular-nums">
                                        {visitorCount.toLocaleString()}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Rotating Tagline */}
                        <div className="text-sm text-muted-foreground h-6 flex items-center">
                            {profile.taglines && profile.taglines.length > 0 ? (
                                <RotatingText texts={profile.taglines} interval={2800} />
                            ) : (
                                profile.title
                            )}
                        </div>

                        {/* Dynamic IST Status */}
                        <div className="flex items-center gap-2 mt-3">
                            <span className={`w-2 h-2 rounded-full ${istStatus.color} animate-pulse-dot`} />
                            <span className="text-[13px] text-muted-foreground">
                                {istStatus.emoji} {istStatus.text}
                            </span>
                        </div>
                    </div>
                </div>
            </motion.section>

            <Separator className="my-8" />

            {/* ===== About ===== */}
            <motion.section {...stagger(0.05)} className="mb-10">
                <h2 className="text-lg font-semibold mb-4 tracking-tight">About</h2>
                <div className="space-y-3">
                    {profile.about.map((paragraph, i) => (
                        <p key={i} className="text-[14px] leading-[1.7] text-muted-foreground">
                            <span className="text-foreground mr-1.5">•</span>
                            {paragraph}
                        </p>
                    ))}
                </div>
            </motion.section>

            <Separator className="my-8" />

            {/* ===== Skills Overview ===== */}
            {skills.length > 0 && (
                <motion.section {...stagger(0.08)} className="mb-10">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-lg font-semibold tracking-tight">Skills</h2>
                        <Link
                            to="/skills"
                            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                        >
                            View all <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {skills.map((cat, ci) => (
                            <motion.div
                                key={cat.category}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.35, delay: ci * 0.08 }}
                                className="skill-group"
                            >
                                <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                    <span>{cat.icon}</span> {cat.category}
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {cat.items.map((skill, si) => (
                                        <motion.span
                                            key={skill.name}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.25, delay: ci * 0.08 + si * 0.04 }}
                                            className="skill-chip"
                                        >
                                            {skill.name}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>
            )}

            {skills.length > 0 && <Separator className="my-8" />}

            {/* ===== Connect ===== */}
            <motion.section {...stagger(0.1)} className="mb-10">
                <h2 className="text-lg font-semibold mb-4 tracking-tight">Connect</h2>
                <div className="flex flex-wrap gap-2.5">
                    {links.github && (
                        <a href={links.github} target="_blank" rel="noopener noreferrer" className="connect-pill">
                            <Github className="w-4 h-4" />
                            GitHub
                        </a>
                    )}
                    {links.linkedin && (
                        <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="connect-pill">
                            <Linkedin className="w-4 h-4" />
                            LinkedIn
                        </a>
                    )}
                    {links.mail && (
                        <button onClick={() => setContactOpen(true)} className="connect-pill">
                            <Mail className="w-4 h-4" />
                            Mail
                        </button>
                    )}
                    {links.medium && (
                        <a href={links.medium} target="_blank" rel="noopener noreferrer" className="connect-pill">
                            <MediumIcon className="w-4 h-4" />
                            Medium
                        </a>
                    )}
                    {links.resume && (
                        <a href={links.resume} target="_blank" rel="noopener noreferrer" className="connect-pill">
                            <FileText className="w-4 h-4" />
                            Resume
                        </a>
                    )}
                </div>
            </motion.section>

            <Separator className="my-8" />

            {/* ===== Experience ===== */}
            {experience.length > 0 && (
                <motion.section {...stagger(0.15)} className="mb-10">
                    <h2 className="text-lg font-semibold mb-6 tracking-tight">Experience</h2>
                    <div className="space-y-4">
                        {experience.map((exp, i) => (
                            <div key={i} className="timeline-card">
                                <div className="flex items-start gap-4">
                                    {/* Company icon */}
                                    <div className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm font-semibold text-muted-foreground">
                                            {exp.company.charAt(0)}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        {/* Company name */}
                                        <div className="flex items-center gap-1.5">
                                            {exp.companyUrl ? (
                                                <a
                                                    href={exp.companyUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="font-semibold text-[15px] hover:underline underline-offset-4 inline-flex items-center gap-1"
                                                >
                                                    {exp.company}
                                                    <ExternalLink className="w-3 h-3 text-muted-foreground" />
                                                </a>
                                            ) : (
                                                <span className="font-semibold text-[15px]">{exp.company}</span>
                                            )}
                                        </div>

                                        {/* Roles */}
                                        {exp.roles.map((role, j) => (
                                            <div key={j} className="mt-2">
                                                <h4 className="text-sm font-medium text-foreground">{role.title}</h4>
                                                <div className="flex flex-wrap gap-x-6 gap-y-1 mt-1.5">
                                                    <div className="text-xs text-muted-foreground">
                                                        <span className="font-medium text-foreground/70">Employment Type</span>{" "}
                                                        {role.type}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        <span className="font-medium text-foreground/70">Employment Period</span>{" "}
                                                        {role.period}
                                                    </div>
                                                </div>
                                                {role.description && (
                                                    <p className="text-[13px] text-muted-foreground mt-2 leading-relaxed">
                                                        {role.description}
                                                    </p>
                                                )}
                                            </div>
                                        ))}

                                        {/* Tech Tags */}
                                        {exp.tags && exp.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mt-3">
                                                {exp.tags.map((tag) => (
                                                    <span key={tag} className="tech-tag">{tag}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>
            )}

            {experience.length > 0 && <Separator className="my-8" />}

            {/* ===== Education ===== */}
            {education.length > 0 && (
                <motion.section {...stagger(0.2)} className="mb-10">
                    <h2 className="text-lg font-semibold mb-6 tracking-tight">Education</h2>
                    <div className="space-y-4">
                        {education.map((edu, i) => (
                            <div key={i} className="timeline-card">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm font-semibold text-muted-foreground">
                                            {edu.institution.charAt(0)}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-1.5">
                                            {edu.institutionUrl ? (
                                                <a
                                                    href={edu.institutionUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="font-semibold text-[15px] hover:underline underline-offset-4 inline-flex items-center gap-1"
                                                >
                                                    {edu.institution}
                                                    <ExternalLink className="w-3 h-3 text-muted-foreground" />
                                                </a>
                                            ) : (
                                                <span className="font-semibold text-[15px]">{edu.institution}</span>
                                            )}
                                        </div>
                                        <h4 className="text-sm font-medium mt-1.5">{edu.degree}</h4>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {edu.period}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>
            )}

            {education.length > 0 && <Separator className="my-8" />}

            {/* ===== Quote ===== */}
            {profile.quote && (
                <motion.section {...stagger(0.25)} className="mb-10">
                    <div className="quote-block">
                        <p className="text-[14px] italic text-muted-foreground leading-relaxed pl-6">
                            "{profile.quote.text}"
                        </p>
                        <cite className="text-xs text-muted-foreground/60 mt-3 block not-italic uppercase tracking-widest font-medium pl-6">
                            {profile.quote.author}
                        </cite>
                    </div>
                </motion.section>
            )}

            {/* ===== Footer ===== */}
            <footer className="site-footer mt-4">
                <p>© {new Date().getFullYear()} {profile.shortName || profile.name.split(" ")[0]}</p>
                <p className="mt-1">Built with love, AI and Coffee ☕</p>
            </footer>

            {/* Contact Form Modal */}
            <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
        </div>
    );
}
