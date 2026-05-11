## 2025-05-15 - [Font Loading & Scroll Performance]
**Learning:** Using CSS `@import` for fonts creates a sequential loading waterfall that blocks rendering. Consolidating into HTML `<link>` tags with `preconnect` allows parallel downloads. Additionally, unthrottled scroll listeners can cause significant jank; `requestAnimationFrame` and `passive: true` are essential for maintaining 60fps.
**Action:** Always prefer `<link>` over `@import` for critical assets and wrap scroll/resize handlers in `requestAnimationFrame`.

## 2025-05-16 - [CSS Waterfall Elimination via Script Injection]
**Learning:** Using `@import` inside page-specific CSS files to load a `global.css` creates a sequential waterfall (HTML -> Page CSS -> Global CSS) that significantly delays the Critical Rendering Path. In a static site without a complex bundler, automating the injection of global styles directly into HTML `<head>` using maintenance scripts is the most efficient way to achieve parallel loading without manual overhead.
**Action:** Remove `@import` from CSS and use `sync-components.js` or equivalent build scripts to manage global asset injection with relative path awareness.

## 2026-05-11 - [Composite-only Animations for Scroll Progress]
**Learning:** Animating the 'width' property on a scroll listener triggers a full layout and paint cycle on every event, leading to significant main-thread jank. Switching to 'transform: scaleX()' allows the browser to handle the animation on the GPU (Composite-only), resulting in perfectly smooth 60fps interactions even on low-powered devices. Additionally, 'requestAnimationFrame' is critical for ensuring calculations only run once per render frame.
**Action:** Always prefer 'transform' or 'opacity' for scroll-linked animations and wrap them in 'requestAnimationFrame' with a 'ticking' flag.
