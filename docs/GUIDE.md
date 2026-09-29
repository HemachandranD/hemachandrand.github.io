# Editing & Deploying This Site

## Where the content lives

Everything you'd want to change day to day is in **one file**:

```
src/data/portfolio.ts
```

| Export | Drives |
| --- | --- |
| `site` | Site URL, default title and meta description |
| `profile` | Name, title, rotating taglines, hero summary, about paragraphs, avatar, time zone for the status pill |
| `email` | Contact form recipient, "Copy email" actions |
| `links` | GitHub / LinkedIn / Medium / resume |
| `experience` | The career trace on the home page |
| `education` | Foundations section |
| `skills` | The three core expertise cards (home + skills page) |
| `stackSkills` | "Everything underneath" tiles on the skills page |
| `industries` | "Built for" strip and the industries stat |
| `projectCategories` | Filter chips on the projects page |
| `projects` | Project cards, command-menu entries, home "Recent builds" (first three) |
| `toolbox` | The scrolling tool marquee |
| `yearsOfExperience` | Derived from `CAREER_START`; never hardcode years elsewhere |

Notes:

- **Experience dates** use `"YYYY-MM"`; set `end: null` for the current role.
  Period labels and durations ("2 yrs 3 mos") are computed.
- **Projects** are listed newest first. `id` must be unique and URL-safe; it's
  the anchor for `/projects/#<id>` links. Links are optional: set any of
  `liveUrl`, `githubUrl` (the project repo, not your profile) or `articleUrl`,
  and only those buttons show.
- A project without `image` gets generated constellation cover art
  (`src/components/project-cover.tsx`), unique per `id`. To use a screenshot,
  put it in `public/` and set `image: "/my-shot.webp"`.
- `links.resume` stays `null` until you have a real URL; the Resume button
  only appears once it's set.
- New skill icon? Add it to `SkillIcon` in `portfolio.ts` and to the map in
  `src/components/skill-icon.tsx`.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Before pushing, `npm run lint && npm run build` catches anything CI would.

## Deployment

Pushing to `master` triggers `.github/workflows/deploy.yml`, which lints,
builds the static export and publishes `out/` to the `gh-pages` branch. No
manual steps. It also rebuilds on the 1st of each month to keep date-derived
numbers current.

## Contact form

The form posts to [FormSubmit](https://formsubmit.co) (no backend needed on
GitHub Pages). The very first submission sends an activation email to the
recipient address; confirm it once and messages flow from then on. If the
service is unreachable, the visitor's mail app opens with the message
pre-filled.

## Social preview image

`public/og.png` is the card shown when the site is shared on LinkedIn/X/Slack.
If your name or title changes, replace it with any 1200×630 PNG.
