## 2025-05-15 - [Font Loading & Scroll Performance]
**Learning:** Using CSS `@import` for fonts creates a sequential loading waterfall that blocks rendering. Consolidating into HTML `<link>` tags with `preconnect` allows parallel downloads. Additionally, unthrottled scroll listeners can cause significant jank; `requestAnimationFrame` and `passive: true` are essential for maintaining 60fps.
**Action:** Always prefer `<link>` over `@import` for critical assets and wrap scroll/resize handlers in `requestAnimationFrame`.

## 2025-05-16 - [CSS Waterfall Elimination via Script Injection]
**Learning:** Using `@import` inside page-specific CSS files to load a `global.css` creates a sequential waterfall (HTML -> Page CSS -> Global CSS) that significantly delays the Critical Rendering Path. In a static site without a complex bundler, automating the injection of global styles directly into HTML `<head>` using maintenance scripts is the most efficient way to achieve parallel loading without manual overhead.
**Action:** Remove `@import` from CSS and use `sync-components.js` or equivalent build scripts to manage global asset injection with relative path awareness.

## 2026-04-20 - [Optimizing Google Fonts Overhead]
**Learning:** Including unused variable fonts (like Bricolage Grotesque) or redundant fonts (Inter vs Plus Jakarta Sans) in Google Fonts URLs adds unnecessary latency and download size. Variable fonts can be large, and every extra font-family in the query string increases the time for the browser to download the CSS and initiate font requests. Duplicate font links across the same page further compound this issue and can lead to malformed HTML.
**Action:** Always audit the design system to ensure only used fonts are requested. Consolidate font-families into a single Google Fonts request and verify that no duplicate links exist across the entire project's HTML files.
