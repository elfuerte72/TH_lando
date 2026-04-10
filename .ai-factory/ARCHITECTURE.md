# Architecture: Layered Architecture

## Overview
Layered Architecture — простое разделение ответственности по горизонтальным слоям. Для статического одностраничного лендинга на Astro SSG это оптимальный выбор: проект не содержит серверной бизнес-логики, баз данных или сложных доменных моделей. Архитектура следует естественной иерархии Astro: страницы → компоненты → данные → типы.

## Decision Rationale
- **Project type:** Статический одностраничный лендинг (SSG)
- **Tech stack:** Astro 6, TypeScript, Tailwind CSS v4, GSAP, Lenis
- **Key factor:** Отсутствие серверной логики и базы данных — нет нужды в сложных паттернах

## Folder Structure
```
src/
├── pages/                  # Presentation layer — точки входа (маршруты)
│   └── index.astro         # Единственная страница, композиция секций
├── components/             # UI layer — визуальные компоненты
│   ├── layout/             # Структурные компоненты (Header, Footer)
│   └── sections/           # Секции лендинга (Hero, Fleet, Materials, etc.)
├── data/                   # Data layer — типизированные массивы данных
│   ├── fleet.ts            # Данные автопарка
│   ├── materials.ts        # Данные перевозимых материалов
│   ├── locations.ts        # Данные географии
│   └── stats.ts            # Навигация, контакты, преимущества
├── types/                  # Type layer — TypeScript интерфейсы
│   └── index.ts            # Все интерфейсы для data layer
└── styles/                 # Cross-cutting — глобальные стили
    └── global.css          # Tailwind v4 @theme токены, CSS-анимации
```

## Dependency Rules
Зависимости идут строго сверху вниз:

- ✅ `pages/` → `components/` → `data/` → `types/`
- ✅ `styles/` используется всеми слоями (cross-cutting)
- ✅ `components/sections/` импортируют данные из `data/`
- ✅ `components/layout/` импортируют навигацию/контакты из `data/stats.ts`
- ❌ `data/` НЕ импортирует из `components/`
- ❌ `types/` НЕ импортирует ни из какого другого слоя
- ❌ `components/sections/` НЕ импортируют друг друга напрямую

## Layer/Module Communication
- **Pages → Components:** Astro-импорт компонентов, композиция в разметке
- **Components → Data:** Прямой ES-импорт типизированных массивов
- **Data → Types:** Импорт интерфейсов для типизации экспортов
- **Между секциями:** Общение только через shared data (`stats.ts`), не через прямые импорты

## Key Principles

1. **Самодостаточность секций** — каждый `.astro` компонент в `sections/` содержит разметку, стили и `<script>` логику в одном файле. Нет разделения на отдельные файлы стилей или скриптов.

2. **Данные отделены от представления** — все контентные данные живут в `src/data/` с типизацией из `src/types/`. Компоненты не содержат хардкод данных.

3. **Две системы анимаций** — CSS-only для простых эффектов (fade-in, parallax), GSAP ScrollTrigger для сложных (каунтеры, карусель, staggered entrance). Не смешивать: один элемент — одна система.

4. **Build-time vs Client-side** — SVG-карта в Geography рендерится при сборке через `node:fs`. Остальной JS — клиентский через `<script>` теги. Lenis ↔ GSAP синхронизация инициализируется в `index.astro`.

5. **Design tokens через CSS Custom Properties** — цвета, шрифты и т.д. определены в `@theme` блоке `global.css`. Использовать `var(--color-accent)` вместо хардкод hex-значений.

## Code Examples

### Типичный компонент секции
```astro
---
// src/components/sections/Example.astro
import type { ExampleItem } from '@/types';
import { exampleData } from '@/data/example';
---

<section id="example" class="py-20 bg-[var(--color-bg)]">
  {exampleData.map((item: ExampleItem) => (
    <div class="text-[var(--color-accent)]">{item.title}</div>
  ))}
</section>

<script>
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  gsap.registerPlugin(ScrollTrigger);

  // Анимация привязана к секции — self-contained
  gsap.from('#example .item', {
    scrollTrigger: { trigger: '#example', start: 'top 80%' },
    y: 40, opacity: 0, stagger: 0.1
  });
</script>
```

### Типичный файл данных
```typescript
// src/data/example.ts
import type { ExampleItem } from '@/types';

export const exampleData: ExampleItem[] = [
  { id: 1, title: 'Заголовок', description: 'Описание' },
];
```

## Anti-Patterns
- ❌ **Импорт между секциями** — секции не должны зависеть друг от друга; общие данные через `data/`
- ❌ **GSAP + CSS анимация на одном элементе** — конфликтует; выбирать одну систему
- ❌ **Transform на `<section>`** — вызывает субпиксельные щели при скролле (задокументировано в CLAUDE.md)
- ❌ **Хардкод цветов** — использовать CSS custom properties из `global.css`
- ❌ **`client:` директивы** — проект использует `<script>` теги, не island-архитектуру
- ❌ **Данные в компонентах** — весь контент должен быть в `src/data/` с типами из `src/types/`
