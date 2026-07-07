# Hemachandran Dhinakaran — Portfolio

Personal portfolio site for **Hemachandran Dhinakaran**, Enterprise AI Engineer.

**Live:** [hemachandrand.github.io](https://hemachandrand.github.io)

**Design concept — "Latent Space":** the site is styled as a navigable
embedding space. The hero is a hand-rolled 3D point-cloud of real skill
domains (drag to orbit — no WebGL library, just perspective projection on a
2D canvas), sections are marked with mono coordinates, the career timeline
renders like a distributed trace, and the accent palette follows the
inferno heatmap ramp (violet → rose → ember).

---

## Tech Stack

- **React 19** + React Router (BrowserRouter with a GitHub Pages SPA fallback)
- **Vite** — dev server & production build
- **Tailwind CSS 3** + tailwindcss-animate
- **Framer Motion** — page transitions, scroll animations, 3D tilt cards
- **next-themes** — dark/light with View Transitions API circular reveal
- **Lucide React** — icons
- **Sonner** — toast notifications
- **gh-pages** via GitHub Actions — deployment
- **Fonts:** Syne (display), Instrument Sans (body), IBM Plex Mono (data)

---

## Project Structure

```
frontend/
├── index.html                   # Vite entry — meta, OG tags, JSON-LD, SPA redirect decode
├── public/
│   ├── 404.html                 # GitHub Pages SPA fallback redirect
│   ├── favicon.svg + PNG icons  # Favicon, apple-touch, manifest icons
│   ├── og.png                   # Social share card (1200×630)
│   ├── manifest.webmanifest
│   ├── robots.txt / sitemap.xml
│   └── profile.png
├── src/
│   ├── data/
│   │   └── portfolio.js         # ALL content: profile, links, experience, education, skills, projects
│   ├── pages/
│   │   ├── HomePage.jsx         # Hero, about, skills overview, experience, education, connect
│   │   ├── ProjectsPage.jsx     # Projects grid
│   │   └── SkillsPage.jsx       # Skills detail page
│   ├── components/
│   │   ├── LatentField.jsx      # 3D embedding-space hero (canvas, drag to orbit)
│   │   ├── TiltCard.jsx         # Pointer-driven 3D tilt card with glare
│   │   ├── ProjectCover.jsx     # Generated constellation art for image-less projects
│   │   └── ui/                  # badge, separator, sonner (shadcn/ui)
│   ├── lib/utils.js             # cn() helper
│   ├── App.jsx                  # Root layout, nav, theme toggle, routes, per-route titles
│   ├── App.css                  # All custom styles
│   ├── main.jsx                 # Entry (ThemeProvider, MotionConfig, BrowserRouter)
│   └── index.css                # Tailwind directives, CSS variables
├── vite.config.mjs
├── tailwind.config.js
└── package.json
```

---

## Local Development

Requires **Node.js 20+**.

```bash
cd frontend
npm install
npm run dev        # http://localhost:3000
```

### Content updates

All portfolio content lives in **`src/data/portfolio.js`** — see
[`docs/GUIDE.md`](docs/GUIDE.md) for a field-by-field walkthrough
(including how the resume button, project GitHub links, and generated
cover art behave).

---

## Deployment

Pushing to `master` runs the **Deploy to GitHub Pages** workflow
(`.github/workflows/deploy.yml`), which builds with Vite and publishes
`frontend/dist` to the `gh-pages` branch. GitHub Pages serves that
branch at <https://hemachandrand.github.io>.

Manual fallback:

```bash
cd frontend
npm run deploy     # build + push dist/ to gh-pages
```

Repo settings: **Settings → Pages → Source: Deploy from a branch →
`gh-pages` / `/ (root)`**.

---

## Key Features

- **Latent Field Hero** — interactive 3D embedding of real skill domains: drag to orbit, pointer parallax, deterministic layout (seeded PRNG), pauses off-screen, respects reduced motion, dims to an ambient layer on small screens
- **Full-bleed Name Lockup** — each line of the name is measured against the loaded display font and sized to span the column exactly on any viewport
- **Career Trace** — experience plotted as spans on a shared timeline, observability-style
- **3D Tilt Cards** — spring-smoothed pointer tilt with glare sweep on project cards (hover devices only)
- **Generated Project Covers** — deterministic constellation art for projects without screenshots
- **Theme Toggle** — dark/light with circular mask reveal animation (View Transitions API)
- **IST Status** — live status indicator with time-aware messages
- **Contact Modal** — FormSubmit.co with mailto: fallback, focus-trapped, Escape to close, honeypot spam filter
- **Accessibility** — `prefers-reduced-motion` respected end to end (Framer `MotionConfig`, canvas auto-orbit, tagline rotation), focus-visible outlines, SR-safe rotating text
- **SEO & Sharing** — real URLs per page, per-route titles, OG/Twitter cards, JSON-LD, sitemap
- **Responsive** — mobile-first, works on all screen sizes

---

## License

MIT
