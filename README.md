# Shreyas's portfolio

[Take a walk through the site](https://shreyas.ink/)

My portfolio is a small blue town drawn with 0s and 1s. Scroll to move through the streets, climb a building through my work history, then head down another to explore my projects. The walk ends at street level with ways to get in touch.

The buildings are drawn in code. There are no imported 3D models: React handles the page, and Canvas 2D draws the town.

## Run it locally

Use Node.js 22.12 or newer and npm.

```sh
npm ci
npm run dev
```

For a production build and local preview:

```sh
npm run build
npm run preview
```

## How it works

Scroll position controls the camera, so you can retrace the route by scrolling back up. The text and links are HTML, separate from the canvas.

Rendering is capped at 30 fps and stops when the scene settles or the tab is hidden. Canvas resolution is bounded, and device hints and slow frames automatically lower the detail. Reduced-motion settings keep the scene still while the page remains scrollable. These choices keep the rendering budget small; they aren't a guarantee of smooth performance on every device.

The main files are:

- `src/content.js`: experience, projects, and contact links.
- `src/camera.js`: the scroll route and camera transitions.
- `src/town.js`: buildings, streets, and drawing code.
- `src/App.jsx` and `src/styles.css`: page layout and rendering controls.

## Deployment

Cloudflare Workers serves `https://shreyas.ink/` from `dist/`, configured in `wrangler.jsonc`. The initial deployment was uploaded through the dashboard on September 8, 2026. The alternate URL is `https://shreyas-portfolio.shreysid2352.workers.dev/`.

To set up analytics, add `shreyas.ink` in Cloudflare Web Analytics, select manual JS snippet installation, and copy the public site token into `.env.local` using `.env.example`. Do not use an account API token. Production builds include the beacon when this value is set; local development does not send analytics. Automatic snippet injection should be disabled to avoid loading the beacon twice.

```sh
npx wrangler login
npm run deploy:check
npm run deploy
```

The Cloudflare build requires the analytics token, so deployment fails clearly if tracking has not been configured. Regular `npm run build` remains available for local checks without an account.

Cloudflare Workers Builds is connected to `Shreysid/Portfolio`. Pushes to `migrate-cloudflare` deploy production with `npm run build:cloudflare` followed by `npx wrangler deploy`. The public analytics token is set as a build variable. Builds for other branches are disabled. The default `master` branch still needs the migration merged before it can become the production build branch.

For manual updates, use the CLI commands above or upload a ZIP of the contents of `dist/` through the existing Worker's New deployment screen.

Cloudflare Web Analytics recorded a page view and a visit during cutover verification. To check future deployments, load the live site with browser developer tools open. Confirm `beacon.min.js` loads and a beacon request succeeds; navigate away or switch tabs if needed. Check Cloudflare Web Analytics after a few minutes, with the hostname and date filters selected correctly. Repeat visits are not necessarily distinct visitors, and browser blockers can prevent client-side analytics from loading.

SEO metadata is in `index.html`. The canonical URL, `public/robots.txt`, and `public/sitemap.xml` all point to `https://shreyas.ink/`; update them together if the domain changes.

Documentation and tests are kept locally in ignored `docs/` and `tests/` directories and aren't included in a fresh clone. Local resumes, environment files, and build output are ignored too.
