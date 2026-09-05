# Ocean town and experience

## Summary
Added separate Home, About, Experience, Work, and Connect destinations. Updated the palette to ocean blue and building characters to binary digits.

## Motivation
Make professional history easier to scan, shorten the introduction and project descriptions, and remove manual rendering settings.

## Design
The street walk pauses through three project stops. A lightweight illustrated building highlights one floor per project on desktop; narrow screens use compact floor links. The town remains procedural Canvas 2D, not an imported 3D asset.

## Implementation
Device CPU/memory hints and data-saving preference select initial quality. Measured slow draws reduce rendering detail and resolution. Rendering still stops at rest, pauses in hidden tabs, and respects reduced motion. Native links support direct navigation and keyboard use.

Experience follows the supplied resume: StudioDrop (April 2026–present), Cisco (November 2024–April 2026), and NeuroFlares (September 2023–February 2024). Independent freelance web and machine-learning work sits between NeuroFlares and Cisco; exact months were not supplied. The Cisco compile-time reduction is resume-reported. The resume itself and its personal contact details are not published. Project source distinctions remain intact.

## Files Changed
src/App.jsx, src/content.js, src/town.js, src/styles.css, index.html, .ai/STATUS.md, .ai/HANDOFF.md.

## Tradeoffs
The project building is an HTML/CSS illustration rather than a 3D camera orbit. Device hints are optional, so measured rendering time also informs quality. The experience card is longer than project cards to preserve four roles.

## Verification
Production build passes. Browser inspection confirms navigation destinations, experience order, binary characters, and compact project-floor highlighting. Physical low-end device performance remains unverified.

## Future Work
Confirm exact freelance dates and add verified public client case studies if available.
