# Sotto observed timing

## Summary
Added a Sotto timing highlight: approximately two seconds to first audio and 13 ms text capture.

## Motivation
Show a concrete performance observation while distinguishing playback startup from full audio generation.

## Design
The result is explicitly labeled as one observed run, not a universal guarantee or a repeated benchmark.

## Implementation
The supplied Sotto status screenshot reads “Speaking - capture 13 ms, first audio 2 secs” at 1.00× playback speed. Hardware, input length, and warm/cold model state were not recorded. The screenshot supports neither an under-two-second claim nor total-generation latency. The screenshot itself is not published because it contains unrelated desktop content.

## Files Changed
src/content.js and this history entry.

## Tradeoffs
A single app-reported observation is useful evidence, but cannot establish typical or percentile latency.

## Future Work
Record hardware, text length, warm-up state, and repeated time-to-first-audio measurements.
