# Hemachandran Dhinakaran — Portfolio

Personal site for **Hemachandran Dhinakaran**, Enterprise AI Engineer.

**Live:** [hemachandrand.github.io](https://hemachandrand.github.io)

**Design concept: "Inference".** The portfolio of someone who builds agents
and LLM observability behaves like a model you can inspect. Every signature
component is a piece of LLM/observability tooling turned into UI:

| Section | Rendered as |
| --- | --- |
| Hero | Model output: the name is BPE-style tokens with confidence bars; an **inference console** shows each token's logprob and runner-up candidates, and a **temperature sampler** reshapes the softmax over taglines and streams a new one |
| Header | A **trace bar**: every page section is a span on a timeline, with a playhead that follows the scroll |
| About | A **model card** (architecture, training run, checkpoints, evals, limitations…) |
| Expertise | Three **attention heads** (previous-token, induction, attention-sink heatmaps) |
| Experience | A **Jaeger-style waterfall**: roles as spans on a time axis, expandable into attributes |
| Work | Projects in a 2D **embedding space**, clustered by domain and linked to the cards |
| Skills | The stack drawn **like a model architecture**: layers read bottom-up as a forward pass, with observability and MLOps as side streams |
| Contact | A pending **tool call**, `send_message({...})`, you can run |
| ⌘K | **Retrieval** over the site, with similarity scores |
| Footer | Live **inference stats** for the page you're reading |

Every page is prerendered to static HTML at build time and served by GitHub
Pages, so the first paint doesn't wait for JavaScript. Interactivity hydrates
on top, and everything degrades gracefully (the career spans use native
`<details>`, the headline is plain text in the HTML).

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | **Next.js 16** (App Router, `output: "export"`, React Compiler) |
| UI runtime | **React 19** |
| Language | **TypeScript** (strict) |
| Styling | **Tailwind CSS 4** + `tw-animate-css`, OKLCH design tokens |
| Components | **shadcn/ui** (Radix primitives: Dialog, Tooltip, Command/cmdk, Sonner) |
| Signature UI | Custom components in `src/components/inference/` (token stream, sampler, trace bar, waterfall, embedding map, attention heads, model card, architecture diagram) |
| Effects | Magic UI BlurFade for scroll reveals |
| Animation | **Motion** (`motion/react`, loaded via `LazyMotion`) |
| Theme | `next-themes`, circular reveal via the View Transitions API |
| Icons / fonts | Lucide; Instrument Serif (display), Geist Sans & Geist Mono, all self-hosted |
| Hosting | GitHub Actions → `gh-pages` branch → GitHub Pages |

shadcn/ui components are copied into the repo (that's how the library is
meant to be used), so they can be tuned to the design. Colour carries meaning:
the violet → rose → amber ramp encodes probability/confidence everywhere it
appears (token bars, sampler, heatmaps, similarity scores).

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
│   ├── inference/          # The signature components (see the table above)
│   ├── magicui/            # BlurFade (scroll reveals)
│   ├── site/               # App shell: header, footer, command menu, contact dialog, theme toggle
│   └── *.tsx               # Project card & generated cover art, section heading, icons
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

- **Inference hero**: hover (or tap) any token to inspect it; step through tokens with the console arrows; drag the temperature and hit *sample* to stream a new tagline
- **Trace bar**: see where you are on the page; click a span to jump
- **⌘K / Ctrl K / `/`**: retrieval over pages, sections, every project, profiles and actions (message, copy email, switch theme), ranked by similarity
- **Embedding map**: hover a point to highlight its card (and vice versa), click a cluster to filter, click a point to jump to it; `/projects/#<id>` deep links scroll to and highlight a card
- **Contact tool call**: validated form posting to FormSubmit, with a mail-app fallback and a honeypot for bots
- **Live status pill**: what I'm probably doing right now, by my local (Eastern) time
- **Theme**: warm-paper light and ink dark, with a circular reveal, remembered per visitor
- **Accessibility**: skip link, labelled controls, keyboard paths for every interaction, focus management in dialogs, correct heading order, reduced-motion support throughout (Lighthouse accessibility 100 on every page)
- **SEO**: per-page titles and canonicals, Open Graph/Twitter cards, JSON-LD `Person`, sitemap, robots
- **Legacy links**: old `/#/projects`-style URLs redirect to the real pages

---

## License

MIT
