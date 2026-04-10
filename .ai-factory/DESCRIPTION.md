# Project: Trak Holding Landing Page

## Overview
One-page cinematic landing site for Trak Holding LLC — a bulk cargo transportation company operating in Russia. Dark industrial design with smooth scroll animations and interactive elements.

## Core Features
- Hero section with video background and animated text reveals
- Fleet showcase carousel with keyboard/touch controls
- Materials transported — visual grid with hover effects
- Competitive advantages with animated counters
- Geography section with interactive SVG map of Russia (build-time rendered)
- About/contact section with company information

## Tech Stack
- **Language:** TypeScript
- **Framework:** Astro 6 (SSG mode)
- **Styling:** Tailwind CSS v4 (design tokens via CSS custom properties)
- **Animations:** GSAP 3 + ScrollTrigger, CSS keyframes, Lenis smooth scroll
- **Build:** Vite 7 (via Astro)
- **Deployment:** Amvera Cloud (nginx via Docker, static)

## Architecture Notes
- Single-page composition: 6 section components assembled in `index.astro`
- Data layer: typed arrays in `src/data/` with interfaces in `src/types/`
- No CMS, no content collections, no server-side functions
- Client-side JS via Astro `<script>` tags (no `client:` directives)
- Lenis ↔ GSAP sync is critical for scroll animations
- Geography SVG map uses build-time `node:fs` + affine projection

## Architecture
See `.ai-factory/ARCHITECTURE.md` for detailed architecture guidelines.
Pattern: Layered Architecture

## Non-Functional Requirements
- All user-facing text in Russian
- Mobile-first responsive design
- Performance: static SSG output, no runtime server
- Browser compatibility: CSS polyfills for older browsers
- Accessibility: semantic HTML sections with anchor navigation
