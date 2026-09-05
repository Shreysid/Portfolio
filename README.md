# Afterhours — Shreyas’s portfolio

A React and Vite portfolio with a procedural binary town. Scroll through an introduction, four career stops, three projects, and contact links.

Run `npm install` and `npm run dev`. Run `npm run build` for production.

The town uses Canvas 2D without models, external fonts, or WebGL effects. Drawing stops at rest and in hidden tabs. Rendering targets at most 30 fps. Canvas size is capped with aspect ratio preserved. Device hints and slow draws automatically reduce detail and resolution.

Reduced-motion preferences hold the scene stationary. Normal HTML content remains scrollable. Edit content in `src/content.js`, the camera route in `src/camera.js`, and the scene in `src/town.js`.

Run `node --test tests/*.test.js` for camera and metadata checks. Deployment uses Vercel's Vite configuration in `vercel.json`, with `npm ci`, `npm run build`, and `dist` as output. The production branch is `master`.

Documentation and measured performance results are in `docs/`. Local resumes, environment files, build output, and workspace data are not part of the release.
