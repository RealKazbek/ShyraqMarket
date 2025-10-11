# 🖼️ PUBLIC ASSETS — Documentation

## 📁 Overview

Папка `/public/` хранит **все статические файлы** проекта **Shyraq Market**:  
иконки, изображения, шрифты, медиа и SEO-файлы.

Эта структура оптимизирована для **Next.js**, **Vercel CDN** и **SEO-производительности**.

---

## 📂 Directory Structure

```
public/
├─ icons/
│   ├─ ui/             → интерфейсные иконки (поиск, крест, стрелки)
│   ├─ roles/          → иконки ролей (пользователи, админ, курьер)
│   ├─ system/         → системные иконки (корзина, каталог)
│   └─ misc/           → прочие (файлы, глобус, и т.п.)
│
├─ images/
│   ├─ banners/        → баннеры (главная, акции, доставка)
│   ├─ products/       → изображения товаров и заглушки
│   ├─ avatars/        → фото профиля пользователей / курьеров
│   ├─ ui/             → логотипы, декоративные элементы
│   └─ backgrounds/    → фоновые изображения и текстуры
│
├─ fonts/              → локальные шрифты (.woff2)
│
├─ seo/
│   ├─ og/             → изображения Open Graph для соцсетей
│   ├─ robots.txt      → управление индексацией
│   ├─ sitemap.xml     → карта сайта для поисковиков
│   └─ humans.txt      → информация о разработчиках
│
├─ videos/             → короткие mp4/webm ролики (баннеры, промо)
│
├─ sounds/             → звуки уведомлений (например, добавление в корзину)
│
├─ manifest.json       → PWA-манифест для Progressive Web App
└─ favicon.ico         → иконка сайта
```

---

## 🧱 Naming Rules

| Тип             | Формат                      | Пример                                  |
| --------------- | --------------------------- | --------------------------------------- |
| **SVG иконки**  | `lowercase-with-dash`       | `search.svg`, `cart-outline.svg`        |
| **Изображения** | `category-description.webp` | `banner-main.webp`, `phone-sample.webp` |
| **Шрифты**      | `FontName-Weight.woff2`     | `Inter-Regular.woff2`                   |
| **SEO**         | `og-page.webp`              | `og-home.webp`, `og-product.webp`       |
| **Видео**       | `context-name.webm`         | `promo-delivery.webm`                   |

> 💡 Используй **WebP** формат для изображений (лучшая компрессия и поддержка в Next.js).

---

## 🧭 Import Examples

### Иконки

```ts
import searchIcon from "@/public/icons/ui/search.svg";
import cartIcon from "@/public/icons/system/cart.svg";
```

### Изображения

```ts
import banner from "@/public/images/banners/main-banner.webp";
import logo from "@/public/images/ui/logo-light.png";
```

### Аватар по умолчанию

```ts
import defaultAvatar from "@/public/images/avatars/default.png";
```

---

## ⚙️ Best Practices

- ✅ Все файлы именуй **в нижнем регистре**, без пробелов и кириллицы.
- ✅ SVG — только оптимизированные (`svgo`, Figma → Export as SVG).
- ✅ Изображения ≤ **300KB**, баннеры ≤ **1MB**.
- ✅ Для Next.js `Image` указывай `width` и `height`.
- ✅ Каждая пустая папка содержит `.gitkeep` для сохранения структуры в Git.
- ✅ Для SEO страниц обязательно добавляй `og/` изображения.

---

## 🚀 Deployment Notes

- Все ассеты кэшируются через **Vercel CDN**.
- Изменение имени файла → обновление кэша автоматически.
- Для редких изменений лучше использовать **новое имя файла** (например, `logo-v2.png`).
- Путь `/public/...` автоматически доступен как `/...` на фронтенде (без `/public` в URL).

---

**Author:** `Kazbek Assanbek`  
**Last Updated:** `2025-10-11`
