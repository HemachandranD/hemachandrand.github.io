# Editing & Deploying This Site

## Where the content lives

Everything you'd want to change day-to-day is in **one file**:

```
frontend/src/data/portfolio.js
```

| Export | Drives |
| --- | --- |
| `profile` | Name, taglines, about paragraphs, quote, avatar |
| `links` | GitHub / LinkedIn / Medium / mail / resume buttons |
| `experience` | The career trace on the homepage |
| `education` | Foundations section |
| `skills` | Skill domains on the homepage + skills page |
| `projects` | Cards on the projects page |
| `yearsOfExperience` | Derived from `CAREER_START` — never hardcode years elsewhere |

Notes:

- `links.resume` is `null` until you set a real URL — the Resume button
  stays hidden while it's null, so you never ship a dead link.
- Each project's `githubUrl` should point at the **project repo**, not
  your profile. Leave it `null` to hide the button.
- A project with `image: null` gets generated constellation cover art
  (`src/components/ProjectCover.jsx`). Add a real screenshot by setting
  `image` to a path under `frontend/public/`.

## Run locally

```bash
cd frontend
npm install
npm run dev        # http://localhost:3000
```

## Deployment

Pushing to `master` triggers `.github/workflows/deploy.yml`, which
builds the site with Vite and publishes `frontend/dist` to the
`gh-pages` branch. No manual steps.

Manual fallback from your machine:

```bash
cd frontend
npm run deploy     # builds + pushes dist/ to gh-pages
```

## Social preview image

`frontend/public/og.png` is the card shown when the site is shared on
LinkedIn/X/Slack. If you change your name or title, regenerate it (any
1200×630 PNG works) and keep the `og:image` meta in
`frontend/index.html` pointing at it.
