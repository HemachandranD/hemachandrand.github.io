# Deploy Steps — hemachandrand.github.io

## Prerequisites

- Node.js v18+ installed
- Git configured with GitHub access
- Repository: `https://github.com/HemachandranD/hemachandrand.github.io`

---

## Local Development

```bash
cd frontend
npm install --legacy-peer-deps
npm start
```

Opens at `http://localhost:3000`. Hot-reloads on file changes.

---

## Deploy to GitHub Pages

### Option A: Using npm (recommended)

```bash
cd frontend
npm run deploy
```

This runs `npm run build` automatically (via `predeploy`), then pushes the `build/` folder to the `gh-pages` branch.

### Option B: Using the deploy script

```bash
cd frontend
bash ../deploy.sh
```

### Option C: Manual steps

```bash
cd frontend

# 1. Build the production bundle
npm run build

# 2. Deploy to gh-pages branch
npx gh-pages -d build
```

---

## After Deployment

1. Go to **GitHub repo → Settings → Pages**
2. Ensure **Source** is set to `gh-pages` branch, `/ (root)` folder
3. Site will be live at: **https://hemachandrand.github.io**
4. Allow 2-5 minutes for changes to propagate

---

## Troubleshooting

### `Cannot find module 'react-scripts/config/env.js'`

`react-scripts` was removed or corrupted. Fix:

```bash
cd frontend
# Ensure package.json has: "react-scripts": "5.0.1"
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### `Cannot find module 'ajv/dist/compile/codegen'`

`ajv@8` is not properly hoisted. Fix:

```bash
npm install ajv@8 --legacy-peer-deps
```

### `EBUSY: resource busy or locked` during npm install

OneDrive is locking files in `node_modules`. Fix:

1. Pause OneDrive sync (right-click tray icon → Pause syncing)
2. Close any running `npm start` or Node processes
3. Delete `node_modules` and reinstall:

```bash
cd frontend
rmdir /s /q node_modules   # Windows
npm install --legacy-peer-deps
```

4. Resume OneDrive sync after install completes

### `npm audit` shows vulnerabilities

These are all in `react-scripts` (CRA) transitive dependencies — build-time only, not in your production bundle. **Do NOT run `npm audit fix --force`** — it will downgrade `react-scripts` to `0.0.0` and break the project.

### Build fails with out-of-memory

```bash
set NODE_OPTIONS=--max-old-space-size=4096   # Windows
export NODE_OPTIONS=--max-old-space-size=4096 # Mac/Linux
npm run build
```

---

## Key Files

| File | Purpose |
|---|---|
| `frontend/package.json` | Dependencies and scripts |
| `frontend/craco.config.js` | Webpack alias (`@/` → `src/`) and watch config |
| `frontend/src/index.css` | Theme colors (CSS variables) |
| `frontend/src/App.css` | Animations and font classes |
| `frontend/src/App.js` | Main application component |
| `frontend/public/index.html` | HTML template with meta tags |
| `deploy.sh` | Bash deploy script (alternative to `npm run deploy`) |

---

## Important: Never Run These

```bash
# NEVER do this — it breaks react-scripts:
npm audit fix --force

# NEVER remove react-scripts manually:
npm uninstall react-scripts
```
