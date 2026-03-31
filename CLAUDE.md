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

Astro 6 static site (SSG) with Tailwind CSS v4, GSAP animations, and Lenis smooth scroll. Deploys to Vercel.

### Page composition

Single page (`src/pages/index.astro`) composes 7 section components in order:
Hero → Fleet → Materials → Advantages → Geography → About → Contact

Each section is a self-contained `.astro` component in `src/components/sections/`.
Layout components (Header, Footer) are in `src/components/layout/`. Header handles: transparent→solid scroll transition, active nav link highlighting via IntersectionObserver, and mobile hamburger menu.

### Data layer

Typed data arrays in `src/data/` (fleet, materials, locations, stats) with interfaces defined in `src/types/index.ts`. Components import data directly — no CMS or content collections. `stats.ts` also exports `navigation`, `contactInfo`, and `advantages` used by Header and multiple sections.

### Client-side JavaScript

Astro components use `<script>` tags (not `client:` directives) for:
- GSAP ScrollTrigger animations and counters
- Fleet carousel with keyboard/touch/autoplay controls
- Lenis smooth scrolling (initialized in layout)
- Contact form submission to Telegram Bot API

### Styling

Tailwind v4 integrated via `@tailwindcss/vite` plugin in `astro.config.ts`. Design tokens defined as CSS custom properties in `src/styles/global.css`:
- Background: `#0a0a0d`, accent: `#1D7ACC`
- Fonts: Barlow Condensed (headings), Inter (body)
- Custom keyframe animations (fade-in, slide-up, pulse-glow, grain)

### Environment variables

Contact form requires: `PUBLIC_TELEGRAM_BOT_TOKEN`, `PUBLIC_TELEGRAM_CHAT_ID`

### Path aliases

`@/*` maps to `src/*` (configured in tsconfig.json).

### Animation patterns

Two animation systems coexist — choose the right one:
- **CSS-only** (`global.css`): hero text reveals, fade-ins with staggered delays (`.hero-fade-1` through `-5`), scroll-driven parallax (Chromium only via `animation-timeline: scroll()`)
- **GSAP ScrollTrigger**: counter animations, fleet carousel, complex scroll-linked effects. Initialized alongside Lenis in `index.astro`'s root `<script>` tag.

Lenis ↔ GSAP sync is critical: `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add(...)` in `index.astro`. New ScrollTrigger-based animations must work within this setup.

A third animation system — **IntersectionObserver** — handles lightweight scroll reveals (`.scroll-reveal` / `.visible` class toggle) in `index.astro`'s root script and active nav highlighting in `Header.astro`. Use this for simple show-on-scroll; use GSAP for anything needing timeline control.

### Vercel deployment

Static output deployed to Vercel. No server-side functions — contact form calls Telegram Bot API directly from the client using `PUBLIC_*` env vars.

## Key conventions

- All user-facing text is in Russian
- Mobile-first responsive approach
- Section IDs match nav anchors (e.g., `#fleet`, `#materials`, `#contact`)
- Images stored in `public/images/` organized by section (fleet/, materials/, etc.)
- Tailwind v4 design tokens defined in `@theme` block in `global.css` — use these variables (e.g., `var(--color-accent)`) rather than hardcoding hex values
- Each section component is self-contained: markup, styles, and `<script>` logic in one `.astro` file
- Project context and plans live in `.ai-factory/`
