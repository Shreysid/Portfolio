# Production startup audit — September 5, 2026

Measured through Chrome's visible Lighthouse interface on http://127.0.0.1:4173/, serving the production build. No application code was changed for this audit.

## Results

| Metric | Desktop | Simulated mobile |
| --- | ---: | ---: |
| Performance score | 100 | 100 |
| First Contentful Paint | 337 ms | 1,319 ms |
| Largest Contentful Paint | 337 ms | 1,319 ms |
| Total Blocking Time | 0 ms | 0 ms |
| Cumulative Layout Shift | 0 | 0 |
| Speed Index | 337 ms | 1,319 ms |

Lighthouse 13.4.1, Chromium 152.0.0.0. Clean Incognito runs at approximately 13:03 and 13:05 IST. Values were read from the report metrics and its score-calculator link. Navigation mode, Performance category, clear storage enabled. Mobile used simulated throttling, emulated Moto G Power at 412×823, and the report identified Slow 4G. Desktop report identified Emulated Desktop and Custom throttling; exact desktop throttle parameters were not inspected.

An earlier normal-profile run scored 62 with 1,350 ms blocking time and explicitly warned that Chrome extensions negatively affected performance. It is not used as the clean application baseline.

## Interpretation and limits

These single-run local lab results support fast initial content display under the tested profiles. They do not establish physical low-end device frame rate, GPU cost, thermal behavior, production-host latency, or interaction latency throughout the animated journey. LCP is a content-paint metric, not proof of when every canvas pixel was ready. A 100 score is not a universal smoothness guarantee.

Mobile diagnostics included an estimated 150 ms render-blocking saving, 32 KiB unused JavaScript, and one long task, despite zero reported Total Blocking Time. No optimization was made solely on those diagnostics.

Next: record sustained scrolling on a physical low-end phone or with actual CPU throttling, and repeat startup tests after deployment. Use repeated runs before treating these values as stable benchmarks.
