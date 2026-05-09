## 2025-05-15 - [Font Loading & Scroll Performance]
**Learning:** Using CSS `@import` for fonts creates a sequential loading waterfall that blocks rendering. Consolidating into HTML `<link>` tags with `preconnect` allows parallel downloads. Additionally, unthrottled scroll listeners can cause significant jank; `requestAnimationFrame` and `passive: true` are essential for maintaining 60fps.
**Action:** Always prefer `<link>` over `@import` for critical assets and wrap scroll/resize handlers in `requestAnimationFrame`.

## 2025-05-16 - [CSS Waterfall Elimination via Script Injection]
**Learning:** Using `@import` inside page-specific CSS files to load a `global.css` creates a sequential waterfall (HTML -> Page CSS -> Global CSS) that significantly delays the Critical Rendering Path. In a static site without a complex bundler, automating the injection of global styles directly into HTML `<head>` using maintenance scripts is the most efficient way to achieve parallel loading without manual overhead.
**Action:** Remove `@import` from CSS and use `sync-components.js` or equivalent build scripts to manage global asset injection with relative path awareness.

## 2025-05-17 - [Optimized Scroll & Viewport Monitoring]
**Learning:** Animating `width` triggers heavy layout reflows on every scroll frame. Switching to `transform: scaleX()` moves the workload to the compositor thread for 60fps smoothness. Additionally, keeping `IntersectionObserver` active for elements that have already entered the viewport wastes CPU cycles; calling `unobserve()` after the first intersection significantly reduces tracking overhead.
**Action:** Use `transform` for scroll-linked animations and `unobserve()` in Intersection Observers after trigger to conserve browser resources.
