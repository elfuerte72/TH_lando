---
name: Desktop and mobile parity
description: Always maintain both desktop and mobile versions — never break desktop while working on mobile adaptations
type: feedback
---

При работе над мобильной адаптацией НИКОГДА не ломать десктопную версию. Пользователь разрабатывает для обоих платформ одновременно.

**Why:** Пользователь несколько раз обнаруживал что десктоп сломан после мобильных правок.
**How to apply:** Всегда проверять десктоп (1440px) после каждого изменения. Использовать CSS media queries вместо Tailwind sm:/md: prefixes для custom CSS классов.
