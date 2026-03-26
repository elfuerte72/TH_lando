# AGENTS.md

> Project map for AI agents. Keep this file up-to-date as the project evolves.

## Project Overview
One-page landing website for "Trak Holding" LLC — bulk cargo transportation company. Industrial Premium dark theme, 7 screen sections, Astro SSG + Tailwind CSS.

## Tech Stack
- **Language:** TypeScript
- **Framework:** Astro (SSG)
- **Styling:** Tailwind CSS v4
- **Form backend:** Telegram Bot API
- **Hosting:** Vercel
- **Map:** Yandex Maps API / static SVG

## Project Structure
```
TH_land/
├── .ai-factory/           # AI context and project specs
│   ├── DESCRIPTION.md     # Project specification and tech stack
│   └── ARCHITECTURE.md    # Architecture decisions (generated)
├── .claude/
│   └── skills/            # Installed agent skills
│       └── astro/         # Astro framework skill
├── src/
│   ├── pages/             # Astro pages (index.astro)
│   ├── components/        # Section components (Hero, Fleet, Materials, etc.)
│   ├── layouts/           # Base layout
│   └── styles/            # Global styles, Tailwind config
├── public/                # Static assets (images, video, favicon)
├── astro.config.ts        # Astro configuration
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript config
├── package.json           # Dependencies
├── AGENTS.md              # This file — project structure map
└── TZ_TrakHolding_Website.md  # Original specification (in Russian)
```

## Key Entry Points
| File | Purpose |
|------|---------|
| src/pages/index.astro | Main landing page |
| astro.config.ts | Astro framework configuration |
| tailwind.config.ts | Design tokens and Tailwind setup |
| TZ_TrakHolding_Website.md | Full project specification |

## Sections (7 screens)
| # | Section | Component |
|---|---------|-----------|
| 1 | Hero + Navigation | Hero.astro |
| 2 | Fleet (Автопарк) | Fleet.astro |
| 3 | Materials (Что перевозим) | Materials.astro |
| 4 | Advantages (Преимущества) | Advantages.astro |
| 5 | Geography (География) | Geography.astro |
| 6 | About (О компании) | About.astro |
| 7 | Contact Form + Footer | Contact.astro |

## AI Context Files
| File | Purpose |
|------|---------|
| AGENTS.md | This file — project structure map |
| .ai-factory/DESCRIPTION.md | Project specification and tech stack |
| .ai-factory/ARCHITECTURE.md | Architecture decisions and guidelines |
| TZ_TrakHolding_Website.md | Original detailed specification |
