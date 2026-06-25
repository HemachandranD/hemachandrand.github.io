import { useState, useEffect, useCallback, useRef, lazy, Suspense } from "react";
import { useTheme } from "next-themes";
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "@/App.css";

const HomePage = lazy(() => import("./pages/HomePage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const SkillsPage = lazy(() => import("./pages/SkillsPage"));

const NAV = [
  { to: "/", label: "home", end: true },
  { to: "/projects", label: "projects" },
  { to: "/skills", label: "skills" },
];

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

  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-btn"
      title="Toggle theme"
      aria-label="Toggle theme"
    >
      <div className="theme-toggle-scene">
        <AnimatePresence mode="wait" initial={false}>
          {resolvedTheme === "dark" ? (
            <motion.div
              key="sun-rising"
              className="theme-toggle-orb"
              initial={{ y: 20, scale: 0.3, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.3, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
            >
              <Sun className="w-[18px] h-[18px]" />
              <motion.div
                className="sun-rays"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4, ease: "easeOut" }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="moon-rising"
              className="theme-toggle-orb"
              initial={{ y: -20, scale: 0.3, opacity: 0, rotate: -90 }}
              animate={{ y: 0, scale: 1, opacity: 1, rotate: 0 }}
              exit={{ y: -20, scale: 0.3, opacity: 0, rotate: 90 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
            >
              <Moon className="w-[18px] h-[18px]" />
              <motion.div
                className="moon-glow"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5, 1.2], opacity: [0, 0.4, 0.2] }}
                transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          className="theme-horizon"
          animate={{
            background: resolvedTheme === "dark"
              ? "linear-gradient(90deg, transparent, hsl(220 60% 50% / 0.4), transparent)"
              : "linear-gradient(90deg, transparent, hsl(35 90% 55% / 0.5), transparent)",
          }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </button>
  );
}

// Hide status bar on scroll down, reveal on scroll up
function useScrollDirection() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      if (y > lastY.current && y > 80) setHidden(true);
      else setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { hidden, scrolled };
}

function App() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { hidden, scrolled } = useScrollDirection();

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background font-sans relative overflow-x-hidden">
      {/* Soft violet bloom background */}
      <div className="stream-bg" aria-hidden="true" />

      {/* ===== Top navigation ===== */}
      <header
        className={`topnav ${hidden && !mobileMenuOpen ? "topnav-hidden" : ""} ${scrolled ? "topnav-scrolled" : ""}`}
      >
        <div className="topnav-inner">
          <NavLink to="/" className="brand" aria-label="Home">
            HD<span className="blink" aria-hidden="true" />
          </NavLink>

          <div className="nav-right">
            <nav className="nav">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="nav-sep" />
            <ThemeToggle />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-btn"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mobile-overlay"
          >
            <nav className="mobile-overlay-nav">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: 30, filter: "blur(8px)" }}
                  transition={{ duration: 0.35, delay: i * 0.08, ease: "easeOut" }}
                >
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `mobile-overlay-link ${isActive ? "active" : ""}`
                    }
                  >
                    <span className="mobile-overlay-num">0{i + 1}</span>
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== Main content ===== */}
      <main className="main-content">
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/skills" element={<SkillsPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
