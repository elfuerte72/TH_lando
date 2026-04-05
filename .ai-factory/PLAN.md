# Plan: Мобильная адаптация лендинга Trak Holding

**Mode:** Fast
**Created:** 2026-04-03
**Testing:** Да
**Logging:** Не требуется (CSS/HTML/JS правки)
**Docs:** Нет

## Результаты анализа

Проведён глубокий аудит всех компонентов сайта на мобильную совместимость. Обнаружены проблемы по 4 категориям:

### Критические (ломают layout)
- Hero stats row переполняет viewport 360px (4 элемента × 80px + gap-12)
- Fleet thumbnail nav переполняет 360px (368px минимум vs 344px доступно)
- Видео `truck.mp4` — 63MB с `preload="auto"` — критически для мобильного интернета
- `team.png` — 6.7MB без сжатия

### Высокие (функциональная деградация)
- `min-h-screen` вместо `dvh` — контент скрывается за iOS Safari chrome
- CSS scroll-driven parallax не работает на iOS (все браузеры WebKit)
- Scroll listeners без `{ passive: true }` — блокируют оптимизацию скролла
- Fleet swipe без axis-locking — вертикальный скролл конфликтует с carousel

### Средние (UX деградация)
- Hamburger tap target ~40×28px (минимум 44×44px)
- GSAP ScrollTrigger threshold 92% — может не сработать на коротких viewports
- `group-hover:` залипает на iOS после тапа (нет `active:` альтернатив)
- SVG карта labels ~4-5px — нечитабельно на мобильных
- Lenis перехватывает touch-scroll, подавляет rubber-band на iOS

### Низкие (косметические)
- Footer `gap-10` — чрезмерно высокий footer на мобильных
- Нет safe-area-insets для iPhone X+ home indicator
- Нет poster на video
- Fleet PNGs 575-818KB без WebP

## Tasks

### Phase 1: Критические исправления layout (Tasks 1-3)

**Task 1: Оптимизация Hero секции** ✅
- Файлы: `Hero.astro`, `global.css`
- Stats row → `grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8`
- `min-h-screen` → `min-h-[100dvh]` с fallback
- Video: poster, `preload="metadata"`, рассмотреть мобильную версию
- `pb-32` → `pb-24` на мобильных

**Task 2: Header мобильная доступность** ✅
- Файл: `Header.astro`
- Hamburger tap target → 44×44px
- Phone link padding
- `aria-expanded`, Escape handler
- `{ passive: true }` на scroll listeners
- `viewport-fit=cover` + safe-area-insets

**Task 3: Fleet карусель** ✅
- Файл: `Fleet.astro`
- Thumbnails: `w-16 sm:w-20 lg:w-24`, `gap-2 sm:gap-4`
- Touch axis-locking
- Specs table collapse на мобильных
- `md:` промежуточный breakpoint

### Phase 2: Производительность (Task 4)

**Task 4: Оптимизация изображений** ✅
- `team.png` → WebP < 300KB
- Fleet PNG → WebP
- Удалить дубликаты и unused файлы
- `srcset`/`sizes` для responsive images
- `<picture>` с media query для desktop-only элементов

### Phase 3: Секции и взаимодействие (Tasks 5-7)

**Task 5: Materials + Advantages** ✅
- Download button tap target → 44px
- `active:` variants для touch feedback
- ScrollTrigger thresholds: 92%/90% → 85%

**Task 6: Geography + About** ✅
- SVG labels: скрыть/увеличить на мобильных
- Card padding: `p-5 sm:p-8`
- SVG pulse оптимизация

**Task 7: Lenis + GSAP mobile** ✅
- `smoothTouch: false` или отключение Lenis на мобильных
- `{ passive: true }` для всех scroll listeners

### Phase 4: Финал (Tasks 8-9)

**Task 8: Footer + глобальные правки** ✅
- `gap-6 md:gap-10`
- Safe-area-insets
- `{ passive: true }` на scroll listener

**Task 9: Тестирование** *(blocked by 1-8)* ✅
- Playwright тесты на viewport'ах: 360px, 375px, 390px, 768px
- Landscape mode
- Чек-лист из 12 пунктов

## Commit Plan

| Checkpoint | Tasks | Commit message |
|---|---|---|
| 1 | Tasks 1-3 | `fix: resolve critical mobile layout overflow issues in hero, header, fleet` |
| 2 | Task 4 | `perf: optimize images — convert to WebP, add srcset, remove unused assets` |
| 3 | Tasks 5-7 | `fix: improve mobile UX — touch targets, scroll thresholds, Lenis config` |
| 4 | Tasks 8-9 | `fix: footer mobile spacing, safe-area-insets, and mobile testing` |
