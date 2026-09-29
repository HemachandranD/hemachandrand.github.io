# Hemachandran Dhinakaran — Portfolio

Personal site for **Hemachandran Dhinakaran**, Enterprise AI Engineer.

**Live:** [hemachandrand.github.io](https://hemachandrand.github.io)

Every page is prerendered to static HTML at build time and served by GitHub
Pages, so the first paint doesn't wait for JavaScript. Interactivity (command
palette, contact sheet, theme switch, project filters) hydrates on top.

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | **Next.js 16** (App Router, `output: "export"`, React Compiler) |
| UI runtime | **React 19** |
| Language | **TypeScript** (strict) |
| Styling | **Tailwind CSS 4** + `tw-animate-css`, OKLCH design tokens |
| Components | **shadcn/ui** (Radix primitives: Dialog, Tooltip, Command/cmdk, Sonner) |
| Effects | **Magic UI** (Dock, BlurFade, MagicCard, BorderBeam, NumberTicker, WordRotate, Marquee, OrbitingCircles, FlickeringGrid, ScrollProgress) |
| Animation | **Motion** (`motion/react`, loaded via `LazyMotion`) |
| Theme | `next-themes`, circular reveal via the View Transitions API |
| Icons / fonts | Lucide, Geist Sans & Geist Mono (self-hosted) |
| Hosting | GitHub Actions → `gh-pages` branch → GitHub Pages |

shadcn/ui and Magic UI components are copied into the repo (that's how both
libraries are meant to be used), so they can be tuned: the Magic UI pieces here
are adapted to respect `prefers-reduced-motion`, skip work when off-screen, and
avoid re-rendering React on pointer movement.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx          # <html>, metadata/SEO, JSON-LD, header/footer/dock
│   ├── page.tsx            # Home: hero, stats, about, expertise, experience, work, contact
│   ├── projects/page.tsx   # Projects (filterable)
│   ├── skills/page.tsx     # Skills
│   ├── not-found.tsx       # 404 (exported as 404.html)
│   ├── sitemap.ts · robots.ts · manifest.ts
│   ├── fonts.ts
│   └── globals.css         # Tailwind, design tokens, keyframes
├── components/
│   ├── ui/                 # shadcn/ui primitives
│   ├── magicui/            # Magic UI effects (adapted)
│   ├── site/               # App shell: header, dock, footer, command menu, contact dialog, theme toggle
│   └── *.tsx               # Project card & cover art, experience timeline, expertise grid…
├── data/portfolio.ts       # ALL site content
└── lib/                    # Small helpers
public/                     # Static assets (favicon, OG image, avatar)
```

---

## Local development

Requires **Node.js 20.9+** (22 recommended).

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint       # ESLint (Next.js + React Compiler rules)
npm run typecheck  # TypeScript
npm run build      # static export to out/
npm run preview    # serve out/ locally
```

### Updating content

Everything the site says lives in **`src/data/portfolio.ts`**. See
[`docs/GUIDE.md`](docs/GUIDE.md) for a field-by-field walkthrough.

---

## Deployment

Pushing to `master` runs **Deploy to GitHub Pages**
(`.github/workflows/deploy.yml`): `npm ci` → lint → `next build` → publish
`out/` to the `gh-pages` branch, which GitHub Pages serves. The workflow also
runs on the 1st of every month so build-time figures (years of experience, role
durations) stay current, and can be started by hand from the Actions tab.

Repo settings: **Settings → Pages → Source: Deploy from a branch → `gh-pages` / `/ (root)`**.

---

## Features

- **⌘K / Ctrl K / `/` command menu**: pages, sections, every project, profiles, and actions (message, copy email, switch theme)
- **Contact sheet**: validated form posting to FormSubmit, with a mail-app fallback and a honeypot for bots
- **Live status pill**: what I'm probably doing right now, by my local (Eastern) time
- **Project explorer**: category filters and text search; `/projects/#<id>` deep links scroll to and highlight a card
- **Career trace**: experience timeline with each role plotted on the whole career span
- **Dock**: macOS-style magnification on hover (mouse only, never stuck on touch)
- **Theme**: dark/light with a circular reveal, remembered per visitor
- **Accessibility**: skip link, labelled controls, focus management in dialogs, correct heading order, reduced-motion support throughout
- **SEO**: per-page titles and canonicals, Open Graph/Twitter cards, JSON-LD `Person`, sitemap, robots
- **Legacy links**: old `/#/projects`-style URLs redirect to the real pages

---

## License

MIT
