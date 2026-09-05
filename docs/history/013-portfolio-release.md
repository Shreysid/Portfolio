# Portfolio rebuild release

## Summary
Replace the placeholder site with the procedural React/Vite portfolio while retaining repository ancestry.

## Motivation
Publish the new implementation through a reviewable branch and preserve the existing production integration.

## Design
Use portfolio-rebuild for development and a pull request into master. Vercel builds the static Vite output. Historical commits remain available; fork-network membership is a separate GitHub setting.

## Implementation
Version only application source, tests, public crawler files, dependency lockfile, and documentation. Exclude local resumes, environment files, build output, and workspace metadata. Explicit Vercel configuration replaces any framework auto-detection based on the old website.

## Files Changed
Application source, public files, tests, documentation, package manifests, index.html, .gitignore, and vercel.json.

## Tradeoffs
Historical commits retain the placeholder implementation. Detaching the fork does not erase ancestry. The existing production branch remains master.

## Verification
Run the production build and five tests before publishing. Verify deployment status after merging; a successful build alone is not deployment confirmation.

## Future Work
Confirm the live domain serves the new deployment and record any repository detachment constraints.
