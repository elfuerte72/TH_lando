# Plan: Миграция деплоя с Vercel на Amvera Cloud

**Mode:** Fast
**Created:** 2026-04-10
**Description:** Настроить проект для деплоя на российский сервер Amvera Cloud с автодеплоем из GitHub. Текущий деплой на Vercel не подходит территориально.

## Settings
- **Testing:** Нет
- **Logging:** Minimal (деплой-конфигурация)
- **Docs:** Да, обновить

## Context

**Проблема:** Vercel территориально не подходит — серверы за рубежом. Нужен российский хостинг для лучшей скорости и доступности в РФ.

**Решение:** Amvera Cloud (amvera.ru) — российский PaaS с Git-push деплоем, поддержкой nginx для статики, GitHub-интеграцией.

**Текущее состояние:**
- Проект — Astro 6 SSG, билд выдаёт статику в `dist/`
- Билд команда: `npm run build` (включает postbuild-css.mjs для совместимости с браузерами)
- Нет привязки к Vercel в коде (нет vercel.json, нет Vercel-специфичных API)
- GitHub remote: `origin https://github.com/elfuerte72/TH_lando.git`

**Подход:** amvera.yml (нативный конфиг) + GitHub → Amvera автодеплой через дашборд.

---

## Tasks

### Phase 1: Конфигурация Amvera

#### Task 1: Создать amvera.yml ✅
**Files:** `amvera.yml` (новый), `Dockerfile` (новый)

Создать конфигурацию для Amvera Cloud:
- Среда: nginx (для раздачи статики)
- Тулчейн: Node.js 20
- Билд: `npm install` → `npm run build`
- Статическая директория: `dist/`
- Порт: 80

> Использован Dockerfile-подход вместо browser toolchain — для поддержки кастомного nginx.conf.

#### Task 2: Создать nginx.conf
**Files:** `nginx.conf` (новый)

Кастомный nginx конфиг для:
- Gzip-сжатие (html, css, js, svg, json)
- Кеширование статических ассетов (`_astro/` — 1 год immutable)
- Корректные MIME-типы для .webp, .woff2
- Security headers (X-Frame-Options, X-Content-Type-Options)
- SPA fallback не нужен (чистый SSG, одна страница)

#### Task 3: Добавить .dockerignore
**Files:** `.dockerignore` (новый)

Исключить из контекста сборки:
- `node_modules/`, `.git/`, `dist/`
- Скриншоты и изображения в корне (*.jpg, *.png, *.webp)
- `.ai-factory/`, `.claude/`

### Phase 2: Документация

#### Task 4: Обновить проектные документы
**Files:** `.ai-factory/DESCRIPTION.md`, `CLAUDE.md`, `AGENTS.md`

- DESCRIPTION.md: Deployment → Amvera Cloud
- CLAUDE.md: Добавить секцию деплоя с инструкциями
- AGENTS.md: Добавить amvera.yml и nginx.conf в ключевые файлы

Добавить пошаговую инструкцию GitHub-интеграции:
1. Зарегистрироваться на amvera.ru
2. Создать проект (тип: статический сайт)
3. Подключить GitHub-репозиторий elfuerte72/TH_lando
4. Выбрать ветку main для автодеплоя
5. Привязать кастомный домен (при необходимости)

---

## Notes
- Vercel можно оставить параллельно на время тестирования Amvera
- SSL на Amvera предоставляется автоматически (Let's Encrypt)
- Бесплатный тариф Amvera достаточен для статического лендинга
