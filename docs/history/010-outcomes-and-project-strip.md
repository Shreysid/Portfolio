# Outcome highlights and project navigation cleanup

## Summary
Removed the secondary project floor strip and added prominent outcome highlights to career and project cards.

## Motivation
Make contributions easier to assess without adding unsupported performance or adoption claims.

## Design
Each highlight separates its headline result, what it measures, and a short explanation. Quantitative results are used only where supplied evidence exists; project capabilities and release milestones remain qualitative.

## Implementation
Outcomes are maintained in src/content.js and displayed by the shared card component. Resume-reported metrics: Cisco compile time reduced by 86%; NeuroFlares static-asset delivery time reduced by more than 30%; StudioDrop pipeline processes hundreds of images concurrently. These are self-reported career results, not independently benchmarked here.

Sotto's sub-two-second speech example is not published as a benchmark pending hardware, input size, warm/cold model state, and metric definition. No arbitrary values, user counts, revenue, or percentage improvements are added. Public project evidence supports local speech, DAG validation, and the SonicBits release milestone.

## Files Changed
src/App.jsx, src/content.js, src/styles.css, and this entry.

## Tradeoffs
Highlights add some card height. Qualitative outcomes are more accurate than numeric placeholders when measurements are unavailable.

## Future Work
Collect reproducible Sotto time-to-first-audio measurements and measured project usage or task-completion outcomes.
