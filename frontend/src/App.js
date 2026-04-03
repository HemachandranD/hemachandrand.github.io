import { useState, useEffect, useCallback, useRef, lazy, Suspense } from "react";
import { useTheme } from "next-themes";
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "@/App.css";

const HomePage = lazy(() => import("./pages/HomePage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const SkillsPage = lazy(() => import("./pages/SkillsPage"));

// Atmospheric theme toggle sound — sunrise warmth or moonlit calm
function playToggleSound(mode) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const t = ctx.currentTime;

    if (mode === "light") {
      // Sunrise: warm ascending shimmer with harmonics
      const freqs = [440, 554, 659, 880]; // A major chord ascending
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        const delay = i * 0.08;
        osc.frequency.setValueAtTime(f * 0.5, t + delay);
        osc.frequency.exponentialRampToValueAtTime(f, t + delay + 0.15);
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, t + delay);
        g.gain.linearRampToValueAtTime(0.08 - i * 0.015, t + delay + 0.06);
        g.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.4);
        osc.connect(g).connect(ctx.destination);
        osc.start(t + delay);
        osc.stop(t + delay + 0.4);
      });
      // Bright shimmer sweep
      const shimmer = ctx.createOscillator();
      shimmer.type = "triangle";
      shimmer.frequency.setValueAtTime(2000, t + 0.1);
      shimmer.frequency.exponentialRampToValueAtTime(4000, t + 0.35);
      const sGain = ctx.createGain();
      sGain.gain.setValueAtTime(0, t + 0.1);
      sGain.gain.linearRampToValueAtTime(0.03, t + 0.18);
      sGain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
      shimmer.connect(sGain).connect(ctx.destination);
      shimmer.start(t + 0.1);
      shimmer.stop(t + 0.45);
    } else {
      // Moonrise: cool descending lullaby with reverb-like tail
      const freqs = [659, 554, 440, 330]; // Descending
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        const delay = i * 0.1;
        osc.frequency.setValueAtTime(f, t + delay);
        osc.frequency.exponentialRampToValueAtTime(f * 0.8, t + delay + 0.3);
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, t + delay);
        g.gain.linearRampToValueAtTime(0.07 - i * 0.012, t + delay + 0.05);
        g.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.5);
        osc.connect(g).connect(ctx.destination);
        osc.start(t + delay);
        osc.stop(t + delay + 0.5);
      });
      // Soft low hum undertone
      const hum = ctx.createOscillator();
      hum.type = "sine";
      hum.frequency.value = 110;
      const hGain = ctx.createGain();
      hGain.gain.setValueAtTime(0, t);
      hGain.gain.linearRampToValueAtTime(0.06, t + 0.15);
      hGain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
      hum.connect(hGain).connect(ctx.destination);
      hum.start(t);
      hum.stop(t + 0.6);
    }

    setTimeout(() => ctx.close(), 800);
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
        {/* Horizon line */}
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
// Floating particles — gentle sparkles drifting upward
function FloatingParticles() {
  const particles = useRef(
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 15,
      size: 1.5 + Math.random() * 2.5,
      opacity: 0.15 + Math.random() * 0.25,
    }))
  ).current;

  return (
    <div className="floating-particles" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// Hide navbar on scroll down, reveal on scroll up
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
  const rafRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--my", `${e.clientY}px`);
      rafRef.current = null;
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div
      className="min-h-screen bg-background font-sans relative overflow-x-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* ===== Animated Grid Background ===== */}
      <div className="grid-bg" />
      <div className="gradient-orbs" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <FloatingParticles />
      <div className="cursor-spotlight" />

      {/* ===== Top Navigation Bar ===== */}
      <header className={`topbar ${hidden && !mobileMenuOpen ? "topbar-hidden" : ""} ${scrolled ? "topbar-scrolled" : ""}`}>
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

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-overlay"
          >
            <nav className="mobile-overlay-nav">
              {[
                { to: "/", label: "Home", end: true },
                { to: "/projects", label: "Projects" },
                { to: "/skills", label: "Skills" },
              ].map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: 40, filter: "blur(10px)" }}
                  transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
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

      {/* ===== Main Content ===== */}
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
