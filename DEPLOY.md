# Deploy: gis-pd-atlas

This is a Vite + React + TypeScript SPA.

## Option A (Recommended): Cloudflare Pages

1. Push this repo to GitHub.
2. Cloudflare Dashboard → **Pages** → **Create a project**.
3. Connect to GitHub and select this repo.
4. Build settings:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - (Optional) Node version: 18/20
5. Deploy.

### Notes
- Cloudflare Pages handles SPA routing well; no extra 404 hacks needed.

## Option B: Vercel

- Build command: `npm run build`
- Output: `dist`

## Option C: GitHub Pages

GitHub Pages is static hosting. Because this project uses React Router, you must choose one:

### C1) Use HashRouter (simplest)
- URLs look like `/#/case/corona`.
- No refresh-404 issues.

### C2) Keep BrowserRouter + 404 redirect
- Cleaner URLs.
- Requires adding a `404.html` redirect script.

If you want GitHub Pages, decide C1 or C2 before enabling Pages.
