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

- **React 19** + React Router (HashRouter)
- **Tailwind CSS 3** + tailwindcss-animate
- **Framer Motion** — page transitions, scroll animations, 3D tilt cards
- **next-themes** — dark/light with View Transitions API circular reveal
- **Lucide React** — icons
- **Sonner** — toast notifications
- **CRACO** — CRA config override
- **gh-pages** — deployment to GitHub Pages
- **Fonts:** Syne (display), Instrument Sans (body), IBM Plex Mono (data)

---

## Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── profile.png
├── src/
│   ├── data/
│   │   └── portfolio.js        # All content: profile, links, experience, education, skills, projects
│   ├── pages/
│   │   ├── HomePage.jsx         # Main page (profile, about, skills overview, connect, experience, education)
│   │   ├── ProjectsPage.jsx     # Projects grid
│   │   └── SkillsPage.jsx       # Skills detail page (radar chart, animated bars, stats)
│   ├── components/
│   │   ├── LatentField.jsx      # 3D embedding-space hero (canvas, drag to orbit)
│   │   ├── TiltCard.jsx         # Pointer-driven 3D tilt card with glare
│   │   └── ui/                  # badge, separator, sonner (shadcn/ui)
│   ├── lib/
│   │   └── utils.js             # cn() helper
│   ├── App.js                   # Root layout, topbar nav, theme toggle, routing
│   ├── App.css                  # All custom styles
│   ├── index.js                 # Entry point (ThemeProvider, HashRouter, Toaster)
│   └── index.css                # Tailwind directives, CSS variables, fonts
├── craco.config.js              # Webpack aliases, watchOptions
├── tailwind.config.js
├── package.json
└── postcss.config.js
```

---

## Local Development

### Prerequisites

- **Node.js 18+** and **npm**

### Setup

```bash
cd frontend
npm install
npm start
```

The dev server runs at `http://localhost:3000`.

### Content Updates

All portfolio content lives in **`src/data/portfolio.js`**:

- `profile` — name, avatar, taglines, about paragraphs
- `links` — GitHub, LinkedIn, Medium, email, resume URL
- `experience` — work history entries
- `education` — degrees and certifications
- `skills` — categorized skills with proficiency levels
- `projects` — project cards with tags, links, descriptions

Edit that single file to update any content. No other files need to change for content-only updates.

---

## Deployment to GitHub Pages

### First-time setup

1. Make sure `package.json` has:

   ```json
   "homepage": "https://hemachandrand.github.io",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

2. `gh-pages` is already a dev dependency.

### Deploy after making changes

```bash
cd frontend
npm run deploy
```

This will:

1. Build an optimized production bundle (`npm run build` via `predeploy`)
2. Push the `build/` folder to the `gh-pages` branch
3. GitHub Pages serves it at **<https://hemachandrand.github.io>**

### GitHub repo settings

Go to **Settings → Pages** and ensure:

- **Source:** Deploy from a branch
- **Branch:** `gh-pages` / `/ (root)`

Changes typically go live within 1–2 minutes after deploy.

---

## Key Features

- **Latent Field Hero** — interactive 3D embedding of real skill domains: drag to orbit, pointer parallax, deterministic layout (seeded PRNG), pauses off-screen, respects reduced motion
- **Full-bleed Name Lockup** — each line of the name is measured against the loaded display font and sized to span the column exactly on any viewport
- **Career Trace** — experience plotted as spans on a shared timeline, observability-style
- **3D Tilt Cards** — spring-smoothed pointer tilt with glare sweep on project cards (hover devices only)
- **Theme Toggle** — dark/light with circular mask reveal animation (View Transitions API)
- **IST Status** — live status indicator with time-aware messages (work hours, evening, sleep, weekend gaming)
- **Visitor Counter** — global count via counterapi.dev with session dedupe
- **Contact Modal** — sends via FormSubmit.co with mailto: fallback
- **Skills Page** — inferno-ramp confidence bars, category filter tabs, animated counters
- **Rotating Taglines** — animated text cycling through taglines
- **Responsive** — mobile-first, works on all screen sizes

---

## License

MIT
