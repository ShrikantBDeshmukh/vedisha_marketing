## 2026-04-17 - [Variable Scope in Shared Components]
**Learning:** In static HTML projects using shared JavaScript files (like js/header.js), variable collisions can occur if the shared script is included on pages that also contain manual or older versions of the same component structure. Using generic variable names like 'menuToggle' can cause "Redeclaration" errors if the page already has a script or global variable with that name.
**Action:** Use specific, prefixed variable names (e.g., 'headerMenuToggle' instead of 'menuToggle') for DOM elements in shared scripts to ensure compatibility across all pages, including those with legacy or duplicate content.

## 2026-05-22 - [Accessible Interactive Cards]
**Learning:** Interactive "cards" or "tiles" that use inline `onclick` often lack keyboard support and screen reader context. Simply adding a click listener is insufficient for true accessibility.
**Action:** Always implement the following for interactive cards: `role="button"`, `tabindex="0"`, `aria-expanded` (if toggling state), and `aria-labelledby` linked to the card's internal heading. In JS, handle both `click` and `keydown` (Enter/Space) to ensure all users can interact with the element.

## 2026-05-24 - [Design System Consistency in JS-injected UI]
**Learning:** When programmatically injecting UI components (like scroll-to-top buttons or progress bars) via JavaScript, it's critical to use existing CSS variables (e.g., `var(--c-accent)`) rather than hardcoded hex values. This ensures that the dynamic UI respects theme changes and remains consistent with the rest of the site's design system.
**Action:** Always check the project's CSS for established design tokens and use them as the primary color source in `element.style` or class definitions, providing a sensible fallback if necessary.
