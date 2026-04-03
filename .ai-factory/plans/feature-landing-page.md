# Plan: Trak Holding Landing Page

**Branch:** `feature/landing-page`
**Created:** 2026-03-26
**Description:** Full implementation of one-page landing website for Trak Holding LLC — 7 screen sections, Industrial Premium dark theme, Astro SSG + Tailwind CSS v4.

## Settings

| Setting | Value |
|---------|-------|
| Testing | No |
| Logging | Standard (form success/error, video load errors) |
| Docs | No |
| Map | Static SVG (no external API) |

## Tasks

### Phase 1: Foundation

**Task 1: Инициализация Astro-проекта и Tailwind CSS** ✅
- Create Astro project with TypeScript strict mode
- Configure Tailwind CSS v4 with design tokens:
  - `dark`: #111827, `accent`: #1D7ACC, `white`: #FFFFFF, `gray-sub`: #94A3B8, `card`: #1E293B
- Set up global.css with Tailwind directives and custom font imports
- Files: `astro.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `package.json`, `src/styles/global.css`

**Task 2: Типы данных и файлы данных** (blocked by: Task 1) ✅
- Create TypeScript interfaces: Vehicle, Material, Location, Stat
- Populate all data from TZ (5 vehicle types, 6 materials, 19 locations, 5 stats)
- Files: `src/types/index.ts`, `src/data/fleet.ts`, `src/data/materials.ts`, `src/data/locations.ts`, `src/data/stats.ts`

**Task 3: Базовый лейаут и навигация** (blocked by: Task 1) референс сайта = volvotrucks.com
- BaseLayout.astro: HTML5 head, SEO meta tags, OG tags, favicon, global styles
- Header.astro: fixed navbar, logo TX (SVG), nav links with smooth scroll anchors, mobile burger menu
- Footer.astro: copyright 2013-2026, contact info
- index.astro: compose all sections
- Files: `src/components/layout/BaseLayout.astro`, `Header.astro`, `Footer.astro`, `src/pages/index.astro`

**Task 4: UI-компоненты** (blocked by: Task 1)
- Button.astro: primary (blue #1D7ACC) and outline (transparent + white border) variants
- Card.astro: dark bg #1E293B, white text, blue icon accents, hover glow effect
- Badge.astro: colored info badge (for license notice)
- ScrollToTop.astro: fixed bottom-right, appears on scroll
- Files: `src/components/ui/Button.astro`, `Card.astro`, `Badge.astro`, `ScrollToTop.astro`

### Phase 2: Sections (Screens 1-4)

> **Commit checkpoint after Phase 2** — `feat: add foundation, hero, fleet, materials, and advantages sections`

**Task 5: Экран 1 — Hero** (blocked by: Tasks 3, 4)
- Looped video background (autoplay, muted, loop) with dark gradient overlay 50%
- Heading "СИЛА В ДВИЖЕНИИ", subheading with company description
- Two CTA buttons: "ОСТАВИТЬ ЗАЯВКУ" (primary), "СМОТРЕТЬ РОЛИК" (outline)
- Lazy-load video, placeholder image fallback
- Logging: console.warn on video load failure
- File: `src/components/sections/Hero.astro`

**Task 6: Экран 2 — Автопарк** (blocked by: Tasks 2, 4)
- Grid: 3 cols (lg), 2 cols (md), 1 col (mobile)
- 5 vehicle cards from fleet.ts data, each with: photo placeholder, name, year, capacity, volume, drive, count
- SVG icons for specs (tonnage, volume, drive type)
- Hover effect: blue border glow
- File: `src/components/sections/Fleet.astro`

**Task 7: Экран 3 — Что перевозим** (blocked by: Tasks 2, 4)
- Grid 3x2 of material cards (6 items from materials.ts)
- Each card: texture placeholder + name + description
- License badge: "ЛИЦЕНЗИЯ НА ОБРАЩЕНИЕ С ОТХОДАМИ I-IV КЛАССА ОПАСНОСТИ" (blue bg, white text)
- File: `src/components/sections/Materials.astro`

**Task 8: Экран 4 — Преимущества** (blocked by: Task 2)
- 5 stat blocks in row (desktop) / column (mobile): С 2013, 11+, 24/7, I-IV, GPS
- Scroll-triggered counter animation (IntersectionObserver)
- Additional benefits list below stats
- Files: `src/components/sections/Advantages.astro`, `src/scripts/counter.ts`

### Phase 3: Sections (Screens 5-7)

> **Commit checkpoint after Phase 3** — `feat: add geography, about, and contact sections`

**Task 9: Экран 5 — География** (blocked by: Task 2)
- Custom SVG map of Western Siberia with 19 location dots
- Highlight badge: "НОВОЕ НАПРАВЛЕНИЕ: Ковыктинское месторождение"
- Sector icons row: Нефтяники | Дорожники | Строители | Заводы
- File: `src/components/sections/Geography.astro`

**Task 10: Экран 6 — О компании** (blocked by: Task 3)
- Company story text block from TZ
- Photo placeholder area (team/base/trucks at work)
- File: `src/components/sections/About.astro`

**Task 11: Экран 7 — Контакты и форма** (blocked by: Tasks 3, 4)
- Form: name, phone, cargo dropdown (7 options), comment (optional)
- Submit via Telegram Bot API (PUBLIC_TELEGRAM_BOT_TOKEN, PUBLIC_TELEGRAM_CHAT_ID env vars)
- Success/error feedback to user
- Contact info: phone, WhatsApp, email
- Logging: console.log on form submit success, console.error on failure
- Files: `src/components/sections/Contact.astro`, `src/scripts/form.ts`

### Phase 4: Polish

> **Final commit** — `feat: add smooth scroll, mobile menu, final polish`

**Task 12: Smooth scroll, мобильное меню, финальная сборка** (blocked by: Tasks 5-11)
- Smooth scroll for nav anchor links
- Mobile burger menu toggle animation
- ScrollToTop button behavior (show on scroll > 300px)
- Verify responsive design on all breakpoints
- Run `astro build`, fix any errors
- Files: `src/scripts/smooth-scroll.ts`, verify all components

## Commit Plan

| Checkpoint | After Tasks | Message |
|-----------|-------------|---------|
| 1 | 1-4 | `chore: initialize astro project with tailwind, data layer, and ui components` |
| 2 | 5-8 | `feat: add hero, fleet, materials, and advantages sections` |
| 3 | 9-11 | `feat: add geography, about, and contact form sections` |
| 4 | 12 | `feat: add smooth scroll, mobile menu, and final polish` |

## Environment Variables

```env
PUBLIC_TELEGRAM_BOT_TOKEN=<your-bot-token>
PUBLIC_TELEGRAM_CHAT_ID=<your-chat-id>
```
