# Procedural City Portfolio

## Summary

Introduced a Vite and React portfolio concept framed as a city grown from code.

## Motivation

The portfolio needs a more distinctive way to present product work, experiments, and writing while demonstrating frontend and creative-technology ability.

## Design

The experience uses a scroll-linked Three.js scene beside accessible HTML content. The city is composed of generated road paths, modular buildings, window lights, and recursive trees.

## Implementation

- Added a Vite + React application.
- Added React Three Fiber and Three.js for the procedural visual layer.
- Built scroll-linked camera motion through four content districts.
- Added responsive navigation, semantic content sections, and a reduced-motion-friendly document layout.
- Refined the hero toward a dense computational-city composition with tiered towers, illuminated side façades, wireframe structures, procedural paving, skybridges, larger recursive trees, and embedded district signage.
- Added voxel-grown landmarks, twisting procedural towers, generated street lights, and a selective bloom pipeline to give each district a distinct architectural language and stronger nighttime depth.

## Files Changed

- `package.json`
- `index.html`
- `src/main.jsx`
- `src/App.jsx`
- `src/styles.css`

## Tradeoffs

The city deliberately uses simple generated geometry rather than imported models, prioritizing originality and load size over photorealism.

## Future Work

- Replace placeholder project copy and contact details.
- Add real case studies and optional scene quality controls.
- Add a static image fallback for browsers without WebGL.
