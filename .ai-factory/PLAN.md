# Plan: Обновление секции «География работ» — MapLibre GL JS

**Branch:** feature/landing-page
**Created:** 2026-03-31
**Mode:** Fast

## Settings

- **Testing:** Нет
- **Logging:** Standard
- **Docs:** Нет

## Overview

Заменить текстовую сетку локаций в секции Geography на интерактивную карту MapLibre GL JS с тайлами OpenFreeMap. 19 маркеров по координатам из `locations.ts`, тёмная тема, кастомные маркеры в стиле проекта.

## Tasks

### Phase 1: Установка зависимостей

- [x] **Task 1:** Установить `maplibre-gl`
  - `npm install maplibre-gl`
  - Файлы: `package.json`, `package-lock.json`

### Phase 2: Реализация карты

- [x] **Task 2:** Переписать `Geography.astro` — MapLibre карта вместо текстовой сетки
  - Файлы: `src/components/sections/Geography.astro`
  - Заменить `<div class="grid grid-cols-2 sm:grid-cols-3 ...">` на контейнер `<div id="geography-map">`
  - В `<script>`:
    - Импорт `maplibre-gl` и CSS
    - Инициализация карты: OpenFreeMap dark tiles, центр ~63°N 70°E (ХМАО/ЯНАО), zoom 4
    - Итерация по `locations` — добавление маркеров с попапами
    - Highlight-маркер для Ковыктинского месторождения (другой цвет/размер)
    - fitBounds для охвата всех точек
  - Сохранить sidebar: «Новое направление» + «Секторы работы»

- [x] **Task 3:** Стилизация карты под дизайн проекта
  - Файлы: `src/components/sections/Geography.astro`, `src/styles/global.css` (при необходимости)
  - Кастомные CSS-маркеры: пульсирующие точки accent-цвета (`#1D7ACC`)
  - Highlight-маркер: отличающийся стиль (больше, другой цвет)
  - Попапы: тёмный фон, шрифт Inter
  - Адаптивность: мобильные — карта full-width, высота 300-400px; десктоп — в сетке 3/5
  - Скрыть/минимизировать стандартные контролы MapLibre
  - Опционально: GSAP ScrollTrigger для анимации появления секции

## Commit Plan

Один коммит после завершения всех задач.

## Tech Notes

- **MapLibre GL JS:** ~210KB, WebGL vector tiles, BSD лицензия
- **OpenFreeMap:** бесплатные тайлы без API-ключа, dark style доступен
- **Данные:** координаты уже есть в `src/data/locations.ts` (lat/lng для всех 19 точек)
- **Интеграция:** `<script>` блок в Astro-компоненте, как остальные секции проекта
