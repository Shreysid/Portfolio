# Remove experience floor strip

## Summary
Removed the secondary employer-navigation strip from Experience.

## Motivation
Reduce visual clutter above the career building.

## Design
Retain the main navigation, scroll-driven career journey, building labels, and next-floor links. Project floor navigation remains unchanged.

## Implementation
The floor-navigation element now renders project links only and is hidden outside Work.

## Files Changed
src/App.jsx and this entry.

## Tradeoffs
Experience no longer has a persistent shortcut to each employer.

## Future Work
None required.
