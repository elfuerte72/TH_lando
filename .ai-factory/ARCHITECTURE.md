# Architecture: Component-Based Static Site (Layered)

## Overview
Simple component-based architecture for a static landing page built with Astro SSG and Tailwind CSS. Each screen section is an independent Astro component composed into a single page. No runtime server, no database, no complex state management — just static HTML generation with minimal client-side JavaScript for interactivity (slider, animations, form submission).

This is the simplest viable architecture for a one-page marketing site. Astro's island architecture handles the boundary between static content and interactive components naturally.

## Decision Rationale
- **Project type:** One-page landing (7 screens), no dynamic content
- **Tech stack:** Astro SSG + Tailwind CSS + TypeScript
- **Key factor:** Maximum simplicity — no business logic, no data layer, just presentation
- **Team size:** 1 developer
- **Scale:** Static site, CDN-served, no scaling concerns

## Folder Structure
```
src/
├── pages/
│   └── index.astro              # Single page, composes all sections
├── components/
│   ├── layout/
│   │   ├── Header.astro         # Fixed navigation bar
│   │   ├── Footer.astro         # Footer with copyright
│   │   └── BaseLayout.astro     # HTML head, meta tags, global styles
│   ├── sections/
│   │   ├── Hero.astro           # Screen 1: video background, CTA
│   │   ├── Fleet.astro          # Screen 2: vehicle cards slider/grid
│   │   ├── Materials.astro      # Screen 3: transported materials grid
│   │   ├── Advantages.astro     # Screen 4: stats counters + benefits
│   │   ├── Geography.astro      # Screen 5: map + work locations
│   │   ├── About.astro          # Screen 6: company info
│   │   └── Contact.astro        # Screen 7: form + contact details
│   ├── ui/
│   │   ├── Button.astro         # Reusable button (primary, outline)
│   │   ├── Card.astro           # Vehicle/material card
│   │   ├── Counter.astro        # Animated number counter
│   │   ├── Badge.astro          # License/info badge
│   │   └── ScrollToTop.astro    # Back-to-top button
│   └── icons/                   # SVG icon components
│       └── *.astro
├── scripts/
│   ├── counter.ts               # Scroll-triggered counter animation
│   ├── smooth-scroll.ts         # Smooth scroll for nav links
│   └── form.ts                  # Telegram bot form submission
├── styles/
│   └── global.css               # Tailwind directives, custom properties
├── data/
│   ├── fleet.ts                 # Vehicle fleet data (typed)
│   ├── materials.ts             # Materials data (typed)
│   ├── locations.ts             # Geography points data
│   └── stats.ts                 # Advantage numbers data
└── types/
    └── index.ts                 # Shared TypeScript interfaces
public/
├── images/
│   ├── fleet/                   # Vehicle photos
│   ├── materials/               # Material texture photos
│   └── logo/                    # Logo variants (white, color)
├── video/
│   └── hero.mp4                 # Hero background video
└── favicon.ico                  # TX favicon
```

## Dependency Rules

- ✅ `pages/` → imports `components/layout/` and `components/sections/`
- ✅ `components/sections/` → imports `components/ui/`, `data/`, `types/`
- ✅ `components/ui/` → imports `types/`, `components/icons/`
- ✅ `scripts/` → standalone client-side modules, no server imports
- ❌ `components/ui/` must NOT import `components/sections/` (no upward dependencies)
- ❌ `data/` must NOT import components (data is pure typed objects)
- ❌ No component should directly call external APIs — form submission goes through `scripts/form.ts`

## Layer Communication

```
index.astro (page)
  └── BaseLayout.astro (layout wrapper)
       ├── Header.astro (navigation)
       ├── Hero.astro ──── hero.mp4 (public/)
       ├── Fleet.astro ──── fleet.ts (data)
       ├── Materials.astro ── materials.ts (data)
       ├── Advantages.astro ── stats.ts (data) + counter.ts (script)
       ├── Geography.astro ── locations.ts (data)
       ├── About.astro
       ├── Contact.astro ──── form.ts (script → Telegram API)
       └── Footer.astro
```

- **Static content:** Rendered at build time by Astro (zero JS shipped)
- **Interactive islands:** Counter animations, form submission, slider — use `<script>` tags or `client:visible` directive for deferred loading

## Key Principles

1. **Data separate from presentation** — All content (fleet specs, materials, stats) lives in `src/data/` as typed TypeScript objects. Components render data, they don't define it. This makes content updates trivial.

2. **Section independence** — Each section component is self-contained. It receives no props from other sections, fetches its own data from `src/data/`. Sections can be reordered or removed without breaking others.

3. **Minimal client JS** — Astro ships zero JS by default. Only add client-side scripts for: counter animation (Intersection Observer), form submission (fetch to Telegram API), smooth scroll. No framework runtime on the client.

4. **Design tokens in Tailwind config** — Colors (#111827, #1D7ACC, etc.) defined once in `tailwind.config.ts` as named tokens. Components use semantic names (`bg-dark`, `text-accent`, `bg-card`), never raw hex values.

5. **Mobile-first responsive** — All components designed mobile-first with Tailwind breakpoints (`md:`, `lg:`). Grid layouts collapse to single column on mobile.

## Code Examples

### Section component with typed data
```astro
---
// src/components/sections/Fleet.astro
import { fleet } from '../../data/fleet';
import Card from '../ui/Card.astro';
---

<section id="fleet" class="py-20 bg-dark">
  <div class="container mx-auto px-4">
    <h2 class="text-4xl font-bold text-white mb-4">НАШ АВТОПАРК</h2>
    <p class="text-gray-sub mb-12">
      11 единиц техники. Все — полный привод 6×6.
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {fleet.map((vehicle) => (
        <Card
          name={vehicle.name}
          year={vehicle.year}
          capacity={vehicle.capacity}
          volume={vehicle.volume}
          drive={vehicle.drive}
          count={vehicle.count}
          image={vehicle.image}
        />
      ))}
    </div>
  </div>
</section>
```

### Typed data file
```typescript
// src/data/fleet.ts
import type { Vehicle } from '../types';

export const fleet: Vehicle[] = [
  {
    name: 'SHACMAN X3000',
    year: '2022–2023',
    capacity: 30,
    volume: 19,
    drive: '6×6',
    count: 6,
    image: '/images/fleet/shacman-x3000.webp',
  },
  // ... more vehicles
];
```

### Client-side script (counter animation)
```typescript
// src/scripts/counter.ts
const counters = document.querySelectorAll('[data-counter]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target as HTMLElement;
    const target = parseInt(el.dataset.counter!, 10);
    animateCounter(el, target);
    observer.unobserve(el);
  });
}, { threshold: 0.5 });

counters.forEach((el) => observer.observe(el));

function animateCounter(el: HTMLElement, target: number) {
  let current = 0;
  const step = Math.ceil(target / 60);
  const interval = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current.toString();
    if (current >= target) clearInterval(interval);
  }, 16);
}
```

### Form submission to Telegram
```typescript
// src/scripts/form.ts
const TELEGRAM_BOT_TOKEN = import.meta.env.PUBLIC_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.PUBLIC_TELEGRAM_CHAT_ID;

async function submitForm(data: FormData): Promise<boolean> {
  const name = data.get('name') as string;
  const phone = data.get('phone') as string;
  const cargo = data.get('cargo') as string;
  const comment = data.get('comment') as string;

  const text = [
    '📋 Новая заявка с сайта',
    `👤 Имя: ${name}`,
    `📞 Телефон: ${phone}`,
    `📦 Груз: ${cargo}`,
    comment ? `💬 Комментарий: ${comment}` : '',
  ].filter(Boolean).join('\n');

  const res = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: 'HTML' }),
    }
  );
  return res.ok;
}
```

## Anti-Patterns

- ❌ **Don't use React/Vue islands unless truly needed** — Astro components handle most interactivity. Only use framework islands for complex stateful widgets (e.g., an interactive map component)
- ❌ **Don't put content text directly in components** — Keep all translatable/editable content in `src/data/` files for easy updates
- ❌ **Don't use `client:load` everywhere** — Prefer `client:visible` or `client:idle` to avoid blocking page load with unnecessary JS
- ❌ **Don't hardcode colors** — Use Tailwind theme tokens, not raw hex values in components
- ❌ **Don't skip image optimization** — Use Astro's `<Image>` component or pre-optimized WebP images in `public/`
