import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import {
    Search, Home, FolderGit2, Sparkles, User, Briefcase, GraduationCap,
    Mail, Github, Linkedin, SunMoon, Copy, CornerDownLeft,
} from "lucide-react";
import { toast } from "sonner";
import MediumIcon from "./ui/MediumIcon";
import { projects, links } from "../data/portfolio";
import { useFocusTrap } from "../lib/useFocusTrap";
import { useUI } from "../lib/ui";

// Spotlight — an Apple-style ⌘K palette over the whole site: jump to a
// page or section, open a project, reach a profile, or run an action.
export default function Spotlight({ isOpen, onClose }) {
    const [query, setQuery] = useState("");
    const [active, setActive] = useState(0);
    const panelRef = useRef(null);
    const listRef = useRef(null);
    const navigate = useNavigate();
    const { resolvedTheme, setTheme } = useTheme();
    const { openContact } = useUI();

    useFocusTrap(isOpen, panelRef, onClose, "input");

    // Start fresh on every open. Done while rendering (not in an effect)
    // so keys typed the instant it opens land in an already-empty field.
    const [wasOpen, setWasOpen] = useState(isOpen);
    if (isOpen !== wasOpen) {
        setWasOpen(isOpen);
        if (isOpen) {
            setQuery("");
            setActive(0);
        }
    }

    const items = useMemo(() => {
        const go = (to, section) => () =>
            navigate(to, section ? { state: { scrollTo: section } } : undefined);
        const open = (url) => () => window.open(url, "_blank", "noopener,noreferrer");
        const all = [
            { group: "Pages", label: "Home", icon: Home, run: go("/") },
            { group: "Pages", label: "Projects", hint: `${projects.length} builds`, icon: FolderGit2, run: go("/projects") },
            { group: "Pages", label: "Skills", icon: Sparkles, run: go("/skills") },
            { group: "Sections", label: "About", icon: User, run: go("/", "about") },
            { group: "Sections", label: "Experience", icon: Briefcase, run: go("/", "experience") },
            { group: "Sections", label: "Education", icon: GraduationCap, run: go("/", "education") },
            { group: "Actions", label: "Send a message", icon: Mail, run: () => openContact() },
            {
                group: "Actions",
                label: "Copy email address",
                icon: Copy,
                run: () => {
                    const email = links.mail?.replace(/^mailto:/, "") ?? "";
                    navigator.clipboard?.writeText(email).then(
                        () => toast.success("Email copied"),
                        () => toast.info(email)
                    );
                },
            },
            {
                group: "Actions",
                label: `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`,
                icon: SunMoon,
                run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
            },
            ...projects.map((p) => ({
                group: "Projects",
                label: p.title,
                hint: p.subtitle,
                icon: FolderGit2,
                keywords: p.tags.join(" "),
                run: open(p.githubUrl || p.liveUrl || p.mediumUrl),
                disabled: !(p.githubUrl || p.liveUrl || p.mediumUrl),
            })),
            ...(links.github ? [{ group: "Profiles", label: "GitHub", icon: Github, run: open(links.github) }] : []),
            ...(links.linkedin ? [{ group: "Profiles", label: "LinkedIn", icon: Linkedin, run: open(links.linkedin) }] : []),
            ...(links.medium ? [{ group: "Profiles", label: "Medium", icon: MediumIcon, run: open(links.medium) }] : []),
        ];
        return all.filter((i) => !i.disabled);
    }, [navigate, openContact, resolvedTheme, setTheme]);

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return items;
        return items.filter((i) =>
            `${i.label} ${i.hint ?? ""} ${i.group} ${i.keywords ?? ""}`.toLowerCase().includes(q)
        );
    }, [items, query]);

    useEffect(() => setActive(0), [query]);

    // Keep the highlighted row in view while arrowing through
    useEffect(() => {
        listRef.current
            ?.querySelector(`[data-idx="${active}"]`)
            ?.scrollIntoView({ block: "nearest" });
    }, [active]);

    const run = (item) => {
        if (!item) return;
        onClose();
        // let the palette start closing before navigating or opening
        requestAnimationFrame(() => item.run());
    };

    const onKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((a) => (results.length ? (a + 1) % results.length : 0));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((a) => (results.length ? (a - 1 + results.length) % results.length : 0));
        } else if (e.key === "Enter") {
            e.preventDefault();
            run(results[active]);
        }
    };

    let lastGroup = null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="spot-root">
                    <motion.div
                        className="sheet-scrim"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.16 } }}
                        onClick={onClose}
                    />
                    <motion.div
                        ref={panelRef}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Search the site"
                        className="glass glass-card spot"
                        initial={{ opacity: 0, y: -16, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97, transition: { duration: 0.16 } }}
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    >
                        <div className="spot-input-row">
                            <Search className="w-5 h-5 spot-glass" aria-hidden="true" />
                            <input
                                // focus synchronously on mount so the first
                                // keystrokes after "/" or ⌘K aren't lost
                                autoFocus
                                className="spot-input"
                                placeholder="Search pages, projects…"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={onKeyDown}
                                role="combobox"
                                aria-expanded="true"
                                aria-controls="spot-list"
                                aria-activedescendant={results[active] ? `spot-opt-${active}` : undefined}
                                autoComplete="off"
                                spellCheck="false"
                            />
                            <kbd className="kbd">esc</kbd>
                        </div>
                        <div className="spot-list" id="spot-list" role="listbox" ref={listRef}>
                            {results.length === 0 && (
                                <p className="spot-empty">No results for “{query}”</p>
                            )}
                            {results.map((item, idx) => {
                                const Icon = item.icon;
                                const header = item.group !== lastGroup ? item.group : null;
                                lastGroup = item.group;
                                return (
                                    <div key={`${item.group}-${item.label}`}>
                                        {header && <div className="spot-group">{header}</div>}
                                        <div
                                            id={`spot-opt-${idx}`}
                                            data-idx={idx}
                                            role="option"
                                            aria-selected={idx === active}
                                            className={`spot-item ${idx === active ? "active" : ""}`}
                                            onMouseMove={() => idx !== active && setActive(idx)}
                                            onClick={() => run(item)}
                                        >
                                            {idx === active && (
                                                <motion.span
                                                    layoutId="spot-lens"
                                                    className="spot-lens"
                                                    transition={{ type: "spring", stiffness: 520, damping: 40 }}
                                                />
                                            )}
                                            <span className="spot-icon"><Icon className="w-4 h-4" /></span>
                                            <span className="spot-label">{item.label}</span>
                                            {item.hint && <span className="spot-hint">{item.hint}</span>}
                                            {idx === active && <CornerDownLeft className="w-3.5 h-3.5 spot-enter" aria-hidden="true" />}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="spot-foot">
                            <span><kbd className="kbd">↑</kbd><kbd className="kbd">↓</kbd> navigate</span>
                            <span><kbd className="kbd">↵</kbd> open</span>
                            <span className="spot-foot-brand">Spotlight · hemz</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
