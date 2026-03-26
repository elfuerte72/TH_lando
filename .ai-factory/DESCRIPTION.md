# Project: Trak Holding Landing Page

## Overview
One-page landing website for "Trak Holding" LLC — a trucking company specializing in bulk cargo transportation across Western Siberia and the Far North (KHMAO, YANAO). Industrial Premium style: dark theme, bold typography, minimal text, maximum visuals.

## Core Features
- Hero section with looped AI-generated background video, dark overlay
- Fleet showcase: horizontal slider/grid with 5 vehicle types (11 units total)
- Materials transported: 6 card grid with macro texture photos
- Statistics with scroll-triggered counter animations
- Interactive geography map with work locations across Western Siberia
- Company about section
- Contact form with Telegram bot integration for lead capture
- Fixed navigation, smooth scroll, back-to-top button
- License badge: hazardous waste classes I-IV

## Tech Stack
- **Language:** TypeScript
- **Framework:** Astro (SSG)
- **Styling:** Tailwind CSS v4
- **Animations:** CSS + minimal JS (scroll-triggered counters)
- **Form backend:** Telegram Bot API (serverless function)
- **Hosting:** Vercel (static deployment)
- **Map:** Yandex Maps API or static SVG map

## Design System
- **Dark background:** `#111827`
- **Blue accent:** `#1D7ACC`
- **White text:** `#FFFFFF`
- **Gray subtext:** `#94A3B8`
- **Card background:** `#1E293B`
- **Style:** Industrial Premium — dark theme, powerful typography

## Architecture Notes
- Static site generation (SSG) — no server-side runtime
- 7 screen sections, each as an Astro component
- Lazy-loaded video and optimized images
- Form submission via Telegram Bot API (Vercel serverless function or direct API call)
- SEO meta tags for regional search queries
- Mobile-first responsive design

## Non-Functional Requirements
- Performance: Lighthouse score 90+, lazy video/image loading
- SEO: meta tags for "перевозка сыпучих грузов ХМАО ЯНАО", "самосвалы Тюмень", "вывоз бурового шлама"
- Accessibility: semantic HTML, proper heading hierarchy
- Responsive: mobile, tablet, desktop breakpoints
- Favicon from company logo (TX)

## Architecture
See `.ai-factory/ARCHITECTURE.md` for detailed architecture guidelines.
Pattern: Component-Based Static Site (Layered)
