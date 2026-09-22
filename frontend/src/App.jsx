import { useState, useEffect, useCallback, useMemo, lazy, Suspense } from "react";
import { useTheme } from "next-themes";
import { Routes, Route, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Sun, Moon, Search, Home, FolderGit2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LiquidGlass from "./components/LiquidGlass";
import Spotlight from "./components/Spotlight";
import ContactModal from "./components/ContactModal";
import { UIContext } from "./lib/ui";
import "@/App.css";

const HomePage = lazy(() => import("./pages/HomePage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const SkillsPage = lazy(() => import("./pages/SkillsPage"));

const NAV = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/projects", label: "Projects", icon: FolderGit2 },
  { to: "/skills", label: "Skills", icon: Sparkles },
];

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleTheme = useCallback(() => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    // View Transitions API circular reveal where supported
    if (document.startViewTransition) {
      document.startViewTransition(() => setTheme(newTheme));
    } else {
      setTheme(newTheme);
    }
  }, [resolvedTheme, setTheme]);

  if (!mounted) return <div className="icon-btn" />;

  const dark = resolvedTheme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="glass glass-round icon-btn theme-btn"
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={dark ? "sun" : "moon"}
          className="theme-glyph"
          initial={{ y: dark ? 14 : -14, rotate: dark ? 0 : -90, opacity: 0, scale: 0.4 }}
          animate={{ y: 0, rotate: 0, opacity: 1, scale: 1 }}
          exit={{ y: dark ? 14 : -14, rotate: dark ? 0 : 90, opacity: 0, scale: 0.4 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          {dark ? <Sun className="w-[17px] h-[17px]" /> : <Moon className="w-[17px] h-[17px]" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

// Tabs with a droplet of glass that slides (and stretches) between them,
// like the iOS tab bar selection lens.
function Tabs({ lensId, withIcons = false }) {
  const location = useLocation();
  return (
    <nav className="tabs" aria-label="Primary">
      {NAV.map(({ to, label, icon: Icon, end }) => {
        const active = end ? location.pathname === to : location.pathname.startsWith(to);
        return (
          <NavLink key={to} to={to} end={end} className={`tab ${active ? "active" : ""}`}>
            {active && (
              <motion.span
                layoutId={lensId}
                className="tab-lens"
                transition={{ type: "spring", stiffness: 480, damping: 34, mass: 0.9 }}
              />
            )}
            {withIcons && <Icon className="tab-icon" aria-hidden="true" />}
            <span className="tab-label">{label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}

// Compact the floating bar once the page scrolls, like Safari's toolbar
function useCompactOnScroll() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return compact;
}

const BASE_TITLE = "Hemachandran Dhinakaran — Enterprise AI Engineer";
const ROUTE_TITLES = {
  "/projects": `Projects · ${BASE_TITLE}`,
  "/skills": `Skills · ${BASE_TITLE}`,
};

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const compact = useCompactOnScroll();
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const ui = useMemo(
    () => ({
      openContact: () => setContactOpen(true),
      openSpotlight: () => setSpotlightOpen(true),
    }),
    []
  );

  // Redirect old HashRouter-era links (/#/projects) to real paths
  useEffect(() => {
    if (window.location.hash.startsWith("#/")) {
      navigate(window.location.hash.slice(1), { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // a jump to a home section scrolls itself (see HomePage)
    if (!location.state?.scrollTo) window.scrollTo(0, 0);
    document.title = ROUTE_TITLES[location.pathname] ?? BASE_TITLE;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // ⌘K / Ctrl+K anywhere, or "/" when not typing, opens Spotlight
  useEffect(() => {
    const onKey = (e) => {
      const typing = /INPUT|TEXTAREA|SELECT/.test(e.target.tagName) || e.target.isContentEditable;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setContactOpen(false);
        setSpotlightOpen((o) => !o);
      } else if (e.key === "/" && !typing && !contactOpen) {
        e.preventDefault();
        setSpotlightOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [contactOpen]);

  return (
    <UIContext.Provider value={ui}>
      <div className="app-shell">
        <LiquidGlass />

        {/* Ambient light the glass refracts */}
        <div className="aurora" aria-hidden="true">
          <span className="blob b1" />
          <span className="blob b2" />
          <span className="blob b3" />
          <span className="blob b4" />
        </div>

        <a href="#main" className="skip-link">Skip to content</a>

        {/* ===== Floating glass toolbar ===== */}
        <header className={`topbar ${compact ? "topbar-compact" : ""}`}>
          <div className="glass glass-pill topbar-pill">
            <NavLink to="/" className="brand" aria-label="Hemz — home">
              Hemz<span className="brand-dot" aria-hidden="true">.</span>
            </NavLink>
            <div className="topbar-tabs">
              <Tabs lensId="lens-top" />
            </div>
            <button
              type="button"
              className="search-btn"
              onClick={() => setSpotlightOpen(true)}
              aria-label="Search (⌘K)"
              aria-keyshortcuts={isMac ? "Meta+K" : "Control+K"}
            >
              <Search className="w-4 h-4" aria-hidden="true" />
              <span className="search-btn-text">Search</span>
              <kbd className="kbd search-kbd">{isMac ? "⌘" : "Ctrl"} K</kbd>
            </button>
          </div>
          <ThemeToggle />
        </header>

        {/* ===== iOS-style tab bar (mobile) ===== */}
        <div className="tabbar-wrap">
          <div className="glass glass-pill tabbar">
            <Tabs lensId="lens-bottom" withIcons />
          </div>
          <button
            type="button"
            className="glass glass-round tabbar-search"
            onClick={() => setSpotlightOpen(true)}
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* ===== Main content ===== */}
        <main id="main" className="main-content">
          <Suspense fallback={<div className="min-h-screen" />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/skills" element={<SkillsPage />} />
            </Routes>
          </Suspense>
        </main>

        <Spotlight isOpen={spotlightOpen} onClose={() => setSpotlightOpen(false)} />
        <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      </div>
    </UIContext.Provider>
  );
}

export default App;
