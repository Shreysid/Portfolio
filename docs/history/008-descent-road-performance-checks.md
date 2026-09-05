# Rooftop crossing, descent, and road landing

## Summary
Experience ascends, the camera crosses at rooftop height, Work descends, and Connect looks down toward the road.

## Motivation
Create a continuous, reversible journey and retain a small startup payload and bounded rendering work.

## Design
The route uses absolute scroll positions. Project order remains Sotto, demoDAG, SonicBits, with their physical positions reversed in the building. The final contact card is centered over procedural road tiles.

## Implementation
src/camera.js isolates deterministic camera poses for testing. The renderer adds downward pitch and inverse rays for facade character placement. Crosswalk loops now clip to canvas bounds, avoiding off-screen draw work at high elevations. Adaptive resizing cannot queue a duplicate animation chain. No dependencies, images, models, or fonts were added.

## Files Changed
src/camera.js, src/App.jsx, src/town.js, src/styles.css, tests/camera.test.js, .ai/STATUS.md, .ai/HANDOFF.md.

## Verification and measured scope
- Production build passes; output approximately 66.63 KB JS, 2.64 KB CSS, 0.40 KB HTML, all gzip estimates. Hosting must actually enable compression to realize those transfer sizes.
- Three Node tests pass: route stages, continuity/reversibility, and finite bounded drawing commands over 61 sampled positions per profile.
- Maximum sampled canvas commands: 12,594 at 1100×760 Auto; 5,263 at 760×525 Lite; 3,824 at 390×844 Lite.
- These counts use a mock context and do not measure rasterization, GPU cost, frame rate, startup paint, input latency, or actual device performance.
- Browser screenshot review confirms the road-facing Connect composition.
- Chrome DevTools MCP is unavailable. CPU/network throttling, FCP/LCP/CLS, and browser frame-time tracing were not performed. No universal smoothness claim is supported.

## Tradeoffs
The street is procedural Canvas 2D perspective, not a free-roaming 3D environment. Automatic quality uses optional device hints and measured draw duration. The 30 FPS ceiling is a target, not a measured achievement.

## Future Work
Connect Chrome DevTools MCP for a cold-load production-build audit with desktop and throttled-mobile profiles; test a physical low-end phone. Suggested MCP server configuration:

```json
{"chrome-devtools":{"type":"local","command":["npx","-y","chrome-devtools-mcp@latest"]}}
```
