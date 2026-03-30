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

### Data layer

Typed data arrays in `src/data/` (fleet, materials, locations, stats) with interfaces defined in `src/types/index.ts`. Components import data directly — no CMS or content collections.

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

## Key conventions

- All user-facing text is in Russian
- Mobile-first responsive approach
- Section IDs match nav anchors (e.g., `#fleet`, `#materials`, `#contact`)
- Images stored in `public/images/` organized by section (fleet/, materials/, etc.)
- Project context and plans live in `.ai-factory/`
