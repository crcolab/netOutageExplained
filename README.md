# When the Internet Goes Dark — Network Outages Explained

An interactive, scroll-driven visual explainer that makes network outage concepts accessible to everyday readers through animations and storytelling.

## Concept

This project uses scroll-triggered animations to walk readers through:

1. **The Invisible Network** — What the internet physically looks like (cables, routers, data centers)
2. **How Data Travels** — Packets, routing, BGP, and DNS explained visually
3. **What Goes Wrong** — Cable cuts, DNS failures, BGP hijacks, DDoS attacks
4. **The Human Cost** — Real-world impact on hospitals, banking, emergency services
5. **How It Gets Fixed** — Redundancy, monitoring, and repair

## Tech Stack

- **Vite** — Fast dev server and build tool
- **TypeScript** — Type-safe application code
- SVG and Canvas for visual storytelling
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
│   ├── main.ts           # Entry point
│   ├── animations/       # Scroll-triggered animation modules
│   ├── style.css         # Layout, typography, scroll sections
│   └── vite-env.d.ts     # Vite type declarations
├── index.html            # Main page structure and narrative
├── tsconfig.json
├── package.json
├── vite.config.ts
├── README.md
└── CLAUDE.md
```
