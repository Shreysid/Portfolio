# Portfolio SEO metadata

## Summary
Added descriptive search metadata, social sharing tags, structured profile data, and crawler files.

## Motivation
Identify the portfolio owner, current role, and engineering focus clearly to search engines and link-preview clients.

## Design
Use https://shreyas.ink/ as the canonical URL based on the public profile and resume. All metadata is delivered in initial HTML rather than injected at runtime. Page fragments are sections, not separate sitemap URLs.

## Implementation
Added a role-focused title and description; canonical, robots, author, Open Graph, and Twitter summary tags; linked Person, WebSite, and ProfilePage JSON-LD. Vite copies public/robots.txt and public/sitemap.xml into the production output. Existing visible content and rendering are unchanged.

## Files Changed
index.html, public/robots.txt, public/sitemap.xml, tests/metadata.test.js, .ai/STATUS.md, .ai/HANDOFF.md.

## Tradeoffs
No social image URL is advertised because no dedicated public share image exists. No keyword stuffing, fabricated ratings, or unsupported structured-data claims are included. Metadata does not guarantee rankings or rich-result eligibility. The page body still requires JavaScript.

## Verification
Build and metadata tests check canonical consistency, JSON syntax and entity relationships, and crawler files. Deployment and search indexing were not performed.

## Future Work
If the production domain changes, update canonical, Open Graph URL, JSON-LD IDs, robots sitemap URL, and sitemap location together. Add a dedicated raster social card when available. Configure staging deployments with noindex independently; keep production indexable.
