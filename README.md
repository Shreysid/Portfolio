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

Vercel deploys `master`. The settings in `vercel.json` run `npm ci` and `npm run build`, then serve `dist/`.

SEO metadata is in `index.html`. The canonical URL, `public/robots.txt`, and `public/sitemap.xml` all point to `https://shreyas.ink/`; update them together if the domain changes.

Documentation and tests are kept locally in ignored `docs/` and `tests/` directories and aren't included in a fresh clone. Local resumes, environment files, and build output are ignored too.
