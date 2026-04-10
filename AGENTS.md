# AGENTS.md

> Project map for AI agents. Keep this file up-to-date as the project evolves.

## Project Overview
One-page cinematic landing site for Trak Holding (bulk cargo transportation, Russia). Astro 6 SSG with Tailwind CSS v4, GSAP animations, and Lenis smooth scroll. Deployed to Amvera Cloud.

## Tech Stack
- **Language:** TypeScript
- **Framework:** Astro 6 (SSG)
- **Styling:** Tailwind CSS v4
- **Animations:** GSAP 3 + ScrollTrigger, Lenis smooth scroll
- **Deployment:** Amvera Cloud (nginx via Docker, static)

## Project Structure
```
TH_land/
├── .ai-factory/              # AI context and project specs
│   ├── DESCRIPTION.md        # Project specification and tech stack
│   └── ARCHITECTURE.md       # Architecture decisions (generated)
├── .claude/
│   └── skills/               # Installed agent skills
│       ├── astro/            # Astro framework skill (skills.sh)
│       ├── gsap-core/        # GSAP core API skill (skills.sh)
│       ├── gsap-scrolltrigger/ # GSAP ScrollTrigger skill (skills.sh)
│       └── aif-*/            # AI Factory built-in skills
├── src/
│   ├── components/
│   │   ├── layout/           # Header.astro, Footer.astro
│   │   └── sections/         # Hero, Fleet, Materials, Advantages, Geography, About
│   ├── data/                 # Typed data arrays (fleet, materials, locations, stats)
│   ├── pages/
│   │   └── index.astro       # Single page — composes sections, initializes Lenis
│   ├── styles/
│   │   └── global.css        # Tailwind v4 @theme tokens, CSS animations
│   └── types/
│       └── index.ts          # TypeScript interfaces for data layer
├── public/
│   └── images/               # Static assets organized by section (fleet/, materials/)
├── scripts/
│   └── postbuild-css.mjs     # Post-build CSS processing
├── russia-new.svg            # SVG map source for Geography section (build-time)
├── astro.config.ts           # Astro + Vite configuration
├── package.json              # Dependencies
├── amvera.yml                # Amvera Cloud deployment config
├── Dockerfile                # Multi-stage build: Node.js 20 → nginx
├── nginx.conf                # Custom nginx config (gzip, caching, security)
├── .dockerignore             # Docker build context exclusions
├── AGENTS.md                 # This file — project structure map
└── CLAUDE.md                 # Agent instructions and preferences
```

## Key Entry Points
| File | Purpose |
|------|---------|
| `src/pages/index.astro` | Single page entry — composes sections, initializes Lenis |
| `astro.config.ts` | Astro + Vite configuration |
| `src/styles/global.css` | Design tokens, CSS custom properties, keyframe animations |
| `src/data/stats.ts` | Navigation, contact info, advantages data |
| `src/types/index.ts` | TypeScript interfaces for all data types |
| `amvera.yml` | Amvera Cloud deployment config |
| `Dockerfile` | Multi-stage Docker build (Node.js → nginx) |
| `nginx.conf` | Custom nginx: gzip, caching, security headers |

## Sections (6 screens)
| # | Section | Component |
|---|---------|-----------|
| 1 | Hero + Navigation | Hero.astro + Header.astro |
| 2 | Fleet (Автопарк) | Fleet.astro |
| 3 | Materials (Что перевозим) | Materials.astro |
| 4 | Advantages (Преимущества) | Advantages.astro |
| 5 | Geography (География) | Geography.astro |
| 6 | About (О компании) | About.astro + Footer.astro |

## AI Context Files
| File | Purpose |
|------|---------|
| AGENTS.md | This file — project structure map |
| .ai-factory/DESCRIPTION.md | Project specification and tech stack |
| .ai-factory/ARCHITECTURE.md | Architecture decisions and guidelines |
| CLAUDE.md | Agent instructions and preferences |
