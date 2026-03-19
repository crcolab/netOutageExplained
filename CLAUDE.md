# CLAUDE.md

## Project Overview

Interactive scroll-driven news story website explaining network outages. The goal is to make technical networking concepts visually understandable for general audiences through animations.

## Tech Stack

- **Vite** for dev server and bundling
- **TypeScript** for all application code
- **Intersection Observer API** for scroll-triggered animations
- **SVG + Canvas** for visual storytelling graphics

## Development

```bash
npm install       # Install dependencies
npm run dev       # Start dev server
npm run build     # Production build
npm run preview   # Preview production build
```

## Architecture

- `index.html` — Root HTML with narrative structure (scroll sections, chapters)
- `src/main.ts` — Entry point, initializes scroll observers and animations
- `src/animations/` — Modular animation controllers per chapter/section
- `src/style.css` — Global styles, scroll-section layout, typography, responsive design

## Key Patterns

- Each narrative section uses a "scroll-graphic + scroll-steps" pattern: a sticky graphic panel alongside scrollable text steps
- Animations are triggered by Intersection Observer as steps enter the viewport
- Canvas is used for particle/packet animations; SVG for network diagrams and static illustrations
- All animations should be performant (requestAnimationFrame, GPU-composited transforms)

## Content Structure

1. Hero — Title and hook
2. Chapter 1: The Invisible Network — Physical internet infrastructure
3. Chapter 2: How Data Travels — Packets, BGP, DNS
4. Chapter 3: What Goes Wrong — Cable cuts, DNS failures, BGP hijacks, DDoS
5. Chapter 4: The Human Cost — Real-world impact
6. Chapter 5: How It Gets Fixed — Redundancy, monitoring, repair
