# When the Internet Goes Dark — Network Outages Explained

An interactive, scroll-driven visual explainer that makes network outage concepts accessible to everyday readers through animations and storytelling.

## Concept

The story opens in **Taipei Main Station** — you're trying to call a lost friend via LINE. Through scroll-triggered animations, we first show the *naive mental model* (voice packets flying through the building), then reveal how internet connectivity actually works, and what happens when it breaks.

### Scenes

1. **Scene 1: Naive Mental Model** — Pixel-art Taipei Main Station with a cinematic camera system. Zoom/pan follows the action: highlights characters, tracks data packets, dramatic train pass-bys, and ends with the twist reveal that this isn't how it works.

*More scenes coming: real network path, BGP routing, failure modes, and repair.*

## Tech Stack

- **Vite** — Fast dev server and build tool
- **TypeScript** — Type-safe application code
- Canvas for pixel-art animations with virtual camera (zoom/pan)
- Scroll-triggered animations via Intersection Observer API
- Fully responsive, mobile-friendly

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
netOutageExplained/
├── src/
│   ├── main.ts                    # Entry point, scroll observer, render loop
│   ├── animations/
│   │   └── taipeiStation.ts       # Scene 1: station pixel art + camera system
│   ├── style.css                  # Layout, typography, scroll sections
│   └── vite-env.d.ts
├── docs/
│   ├── STORYBOARD.md              # Shot-by-shot visual descriptions
│   ├── SEQUENCE.md                # Progress timeline of all events
│   └── SCREENPLAY.md              # Narrative text and dialogue
├── index.html                     # Main page structure and scroll steps
├── tsconfig.json
├── package.json
├── vite.config.ts
├── README.md
└── CLAUDE.md
```
