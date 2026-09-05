# ASCII town rebuild

## Summary

Replaced the WebGL city with a character-rendered perspective town and compact portfolio panels.

## Motivation

Reduce loading and drawing costs while presenting a terminal-like city.

## Design

Four districts share a continuous street. A location label and map track the journey. Normal HTML sections preserve readable content and keyboard navigation.

## Implementation

Canvas 2D projects deterministic building faces into a bounded glyph grid. Scroll updates are coalesced. Drawing stops at rest and in hidden tabs. Resolution and frame rate are capped, with automatic Lite fallback after slow frames. Reduced-motion mode holds the camera still.

## Files Changed

- src/App.jsx, src/town.js, src/styles.css
- package.json and package-lock.json
- README.md

## Tradeoffs

The renderer provides perspective and forward travel without full 3D lighting or free navigation. The street is deliberately simple. Content remains provisional until real case studies are added.

## Validation

Production build passes. JavaScript payload fell from about 326 KB to 64 KB gzip. A local 24-frame sample measured mobile 390 × 844 Auto at 7.7 ms median / 11.7 ms p95, and 1400 × 900 Lite at 10.7 ms median / 12.7 ms p95. The shipped canvas additionally caps width at 1100. These measure drawing on the development machine, not physical low-end devices.

## Future Work

Add actual project content and test on representative physical phones. Introduce street landmarks within the same rendering budget.
