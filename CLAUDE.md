# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

One-page landing site for Trak Holding (bulk cargo transportation, Russia). Dark cinematic industrial design. Russian language throughout.

## Commands

- `npm run dev` — dev server at localhost:4321
- `npm run build` — production build to `dist/`
- `npm run preview` — preview production build
- `npm run check` — TypeScript checking via `astro check`

No test framework or linter is configured.

## Architecture

Astro 6 static site (SSG) with Tailwind CSS v4, GSAP animations, and Lenis smooth scroll. Deploys to Amvera Cloud.

### Page composition

Single page (`src/pages/index.astro`) composes 6 section components in order:
Hero → Fleet → Materials → Advantages → Geography → About

Each section is a self-contained `.astro` component in `src/components/sections/`.
Layout components (Header, Footer) are in `src/components/layout/`. Header handles: transparent→solid scroll transition, active nav link highlighting via IntersectionObserver, and mobile hamburger menu.

### Data layer

Typed data arrays in `src/data/` (fleet, materials, locations, stats) with interfaces defined in `src/types/index.ts`. Components import data directly — no CMS or content collections. `stats.ts` also exports `navigation`, `contactInfo`, and `advantages` used by Header, Footer, and multiple sections.

### Client-side JavaScript

Astro components use `<script>` tags (not `client:` directives) for:
- GSAP ScrollTrigger animations and counters
- Fleet carousel with keyboard/touch controls
- Lenis smooth scrolling (initialized in `index.astro`)

### Styling

Tailwind v4 integrated via `@tailwindcss/vite` plugin in `astro.config.ts`. Design tokens defined as CSS custom properties in `src/styles/global.css`:
- Background: `#0a0a0d`, accent: `#1D7ACC`
- Fonts: Barlow Condensed (headings), Inter (body)
- Custom keyframe animations (fade-in, slide-up, pulse-glow, grain)

### Path aliases

`@/*` maps to `src/*` (configured in tsconfig.json).

### Animation patterns

Two animation systems coexist — choose the right one:
- **CSS-only** (`global.css`): hero text reveals, fade-ins with staggered delays (`.hero-fade-1` through `-5`), scroll-driven parallax (Chromium only via `animation-timeline: scroll()`)
- **GSAP ScrollTrigger**: counter animations, fleet carousel, background parallax, staggered entrance effects. Each section manages its own GSAP animations in its `<script>` tag.

Lenis ↔ GSAP sync is critical: `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add(...)` in `index.astro`. New ScrollTrigger-based animations must work within this setup.

**IntersectionObserver** is used only in `Header.astro` for active nav link highlighting. Do not apply `transform`-based scroll reveals to `<section>` elements — this causes subpixel gaps between sections visible as flickering lines during scroll.

### Amvera Cloud deployment

Static output deployed to Amvera Cloud (amvera.ru) via Docker multi-stage build (Node.js 20 → nginx). Configuration files:
- `amvera.yml` — Amvera project config (points to Dockerfile)
- `Dockerfile` — multi-stage: build with Node.js, serve with nginx
- `nginx.conf` — custom nginx config (gzip, caching, security headers)
- `.dockerignore` — excludes dev/AI files from build context

Auto-deploy from GitHub: connect repo `elfuerte72/TH_lando`, branch `main` in Amvera dashboard.

`vite.server.allowedHosts: true` is set in `astro.config.ts` for ngrok/tunnel compatibility.

#### Amvera setup steps
1. Зарегистрироваться на amvera.ru
2. Создать проект (тип: приложение)
3. Подключить GitHub-репозиторий elfuerte72/TH_lando
4. Выбрать ветку main для автодеплоя
5. Привязать кастомный домен (при необходимости)

### Geography section: build-time SVG

`Geography.astro` reads `russia-new.svg` from the project root at build time via `node:fs` and renders an inline SVG map with computed city marker positions using an affine geo→SVG projection. This runs only during SSG build, not client-side.

## Key conventions

- All user-facing text is in Russian
- Mobile-first responsive approach
- Section IDs match nav anchors (e.g., `#fleet`, `#materials`, `#about`)
- Images stored in `public/images/` organized by section (fleet/, materials/, etc.)
- Tailwind v4 design tokens defined in `@theme` block in `global.css` — use these variables (e.g., `var(--color-accent)`) rather than hardcoding hex values
- Each section component is self-contained: markup, styles, and `<script>` logic in one `.astro` file
- Project context and plans live in `.ai-factory/`
