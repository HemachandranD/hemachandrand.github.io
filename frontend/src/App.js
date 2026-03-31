import { useState, useEffect, useCallback, useRef } from "react";
import { useTheme } from "next-themes";
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "@/App.css";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import SkillsPage from "./pages/SkillsPage";
import { profile } from "./data/portfolio";

// Synthesize a subtle toggle sound using Web Audio API
function playToggleSound(mode) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();

    // Primary tone
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (mode === "light") {
      // Bright ascending chime
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.25);
    } else {
      // Soft descending tone
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    }

    // Cleanup
    setTimeout(() => ctx.close(), 500);
  } catch {
    // Silently fail if audio not available
  }
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleTheme = useCallback(() => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";

    // Play toggle sound
    playToggleSound(newTheme);

    // Use View Transitions API for circular reveal if supported
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setTheme(newTheme);
      });
    } else {
      setTheme(newTheme);
    }
  }, [resolvedTheme, setTheme]);

  if (!mounted) return <div className="w-5 h-5" />;

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-btn"
      title="Toggle theme"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={resolvedTheme}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="flex items-center justify-center"
        >
          {resolvedTheme === "dark" ? (
            <Sun className="w-[18px] h-[18px]" />
          ) : (
            <Moon className="w-[18px] h-[18px]" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}

function App() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* ===== Top Navigation Bar ===== */}
      <header className="topbar">
        <div className="topbar-inner">
          {/* Left: HD Logo */}
          <NavLink to="/" className="topbar-logo">
            HD
          </NavLink>

          {/* Right: Nav links + theme toggle */}
          <div className="topbar-right">
            {/* Desktop nav links */}
            <nav className="topbar-nav">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `topbar-link ${isActive ? "active" : ""}`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/projects"
                className={({ isActive }) =>
                  `topbar-link ${isActive ? "active" : ""}`
                }
              >
                Projects
              </NavLink>
              <NavLink
                to="/skills"
                className={({ isActive }) =>
                  `topbar-link ${isActive ? "active" : ""}`
                }
              >
                Skills
              </NavLink>
            </nav>

            {/* Separator */}
            <div className="topbar-separator" />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-btn"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mobile-dropdown"
          >
            <nav className="flex flex-col gap-1">
              <NavLink
                to="/"
                end
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `mobile-nav-link ${isActive ? "active" : ""}`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/projects"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `mobile-nav-link ${isActive ? "active" : ""}`
                }
              >
                Projects
              </NavLink>
              <NavLink
                to="/skills"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `mobile-nav-link ${isActive ? "active" : ""}`
                }
              >
                Skills
              </NavLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== Main Content ===== */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/skills" element={<SkillsPage />} />
        </Routes>
      </main>
    </div>
  );
}

function ThemeToggleMobile() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-5 h-5" />;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={resolvedTheme}
          initial={{ rotate: -90, scale: 0, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {resolvedTheme === "dark" ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}

export default App;
