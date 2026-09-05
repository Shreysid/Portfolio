# Experience building ascent

## Summary
Experience now ascends a dedicated four-floor building, showing roles chronologically: NeuroFlares, freelance work, Cisco, and StudioDrop.

## Motivation
Extend the scroll-driven project exploration to career history, keeping one role visible at each stop.

## Design
The Experience link starts at the earliest role. Four anchor links allow direct floor navigation. After the current role, the camera leaves the career building and continues to the existing project building.

## Implementation
Career stops derive from the existing experience data in reverse order. The procedural renderer supports labeled landmarks with differing floor counts. Camera travel pauses for each ascent and resumes between buildings. Role cards remain normal HTML, accessible with reduced motion and keyboard navigation.

## Files Changed
src/App.jsx, src/content.js, src/town.js, src/styles.css, .ai/STATUS.md, .ai/HANDOFF.md.

## Tradeoffs
Four scroll stops replace compact employer tabs, lengthening the page. Direct floor links let visitors skip ahead. Automatic quality adaptation remains unchanged.

## Verification
Production build and browser content checks cover chronological ordering and navigation targets. Physical-device profiling remains future work.

## Future Work
Confirm exact freelance dates; keep current employment up to date.
