# Public projects and professional introduction

## Summary
Replaced placeholder content with a professional introduction and three selected public projects.

## Motivation
Help visitors understand the engineer behind the town and inspect concrete work without searching a repository list.

## Design
Five walk-through stops introduce Shreyas, Sotto, demoDAG, SonicBits, and contact links. Each project explains its purpose and implementation, then links to evidence. Content remains ordinary semantic HTML over the decorative canvas.

## Implementation
Content lives in src/content.js. The active district follows section positions rather than assuming equal section heights. Cards expand to fit text on narrow screens. The canvas renderer and its idle, reduced-motion, and lightweight modes remain unchanged. No dependencies or remote assets were added.

## Sources and editorial limits
Reviewed all 39 repositories returned by the public profile endpoint on September 5, 2026, including original repository READMEs where available. Forks and tutorial repositories were not selected as original work.

- https://github.com/Shreysid/Shreysid — public profile supplies name, Software Engineer 1 at Cisco, a year of freelance work, iOS release, and social links. Employment is self-reported; reconfirm before publishing if outdated.
- https://github.com/Shreysid/Sotto — README supports local Kokoro/FluidAudio speech, shortcuts, speed settings, pronunciation substitutions, and preview status. Models require an initial download.
- https://github.com/Shreysid/demoDAG — README and backend/main.py support the graph editor, Zustand/local persistence, FastAPI, and NetworkX DAG checks.
- https://github.com/Shreysid/SonicBits — public repository contains the Next.js product website, not iOS app source. The public profile links its App Store release. Store availability could not be independently verified during this update, so no current ratings, downloads, pricing, or app feature claims are used.
- https://www.linkedin.com/in/shreyas-sid/ — contact destination provided by the public profile.

No private repositories, local resume, employment outcomes, invented metrics, or client names are used.

## Files Changed
src/content.js, src/App.jsx, src/styles.css, index.html, .ai/STATUS.md, .ai/HANDOFF.md, and this entry.

## Tradeoffs
Concise descriptions show technical scope without pretending to be measured case studies. SonicBits distinguishes the released product from the available public source. Additional text lengthens the journey on mobile.

## Future Work
Add verified outcomes, screenshots, and deeper case studies when available. Confirm the employment title and App Store listing before publishing.
