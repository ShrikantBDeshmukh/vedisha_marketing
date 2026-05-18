## 2025-05-15 - [Font Loading & Scroll Performance]
**Learning:** Using CSS `@import` for fonts creates a sequential loading waterfall that blocks rendering. Consolidating into HTML `<link>` tags with `preconnect` allows parallel downloads. Additionally, unthrottled scroll listeners can cause significant jank; `requestAnimationFrame` and `passive: true` are essential for maintaining 60fps.
**Action:** Always prefer `<link>` over `@import` for critical assets and wrap scroll/resize handlers in `requestAnimationFrame`.

## 2025-05-16 - [CSS Waterfall Elimination via Script Injection]
**Learning:** Using `@import` inside page-specific CSS files to load a `global.css` creates a sequential waterfall (HTML -> Page CSS -> Global CSS) that significantly delays the Critical Rendering Path. In a static site without a complex bundler, automating the injection of global styles directly into HTML `<head>` using maintenance scripts is the most efficient way to achieve parallel loading without manual overhead.
**Action:** Remove `@import` from CSS and use `sync-components.js` or equivalent build scripts to manage global asset injection with relative path awareness.

## 2025-05-18 - [Scroll Performance & Reflow Elimination]
**Learning:** Animating `width` on a high-frequency scroll event causes continuous layout reflows, which are expensive. Switching to `transform: scaleX()` moves the work to the compositor. Additionally, caching `scrollHeight` using `ResizeObserver` is more robust than `window.resize` as it catches height changes from dynamic content like expanded accordions or lazy-loaded images without causing layout thrashing.
**Action:** Use CSS transforms for scroll-linked animations and `ResizeObserver` for robust layout property caching.
