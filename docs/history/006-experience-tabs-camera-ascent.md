# Experience tabs and project camera ascent

## Summary
Replaced the full career list with company tabs and the static project illustration with a camera path through the procedural town.

## Motivation
Reduce simultaneous text and make the project journey feel like visiting floors in one building.

## Design
Experience shows one role, date range, and short contribution list. Employer navigation is vertical on desktop and horizontal on narrow screens. Selected work approaches a marked facade, then raises the camera past three labeled floors.

## Implementation
ExperienceTabs supports arrow keys, Home, End, selected-tab focus, and panel labeling. Town interpolates travel, approach, and ascent together, drawing only while these values change. A landmark facade uses the existing projection and binary-cell renderer; nearby buildings leave its approach clear. Reduced motion preserves a static town and all readable HTML project content.

## Files Changed
src/App.jsx, src/town.js, src/styles.css, .ai/STATUS.md, .ai/HANDOFF.md.

## Tradeoffs
Canvas 2D perspective remains intentionally lightweight. This is a lateral approach and vertical ascent, not a free-roaming 3D orbit. Project links remain HTML controls accessible without interacting with the canvas.

## Verification
Production build passes. Browser accessibility inspection confirms employer tabs, selected role content, and project links.

## Future Work
Profile the ascent on physical low-end devices and refine facade details if needed.
