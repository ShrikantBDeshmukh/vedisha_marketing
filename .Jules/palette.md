## 2026-04-17 - [Variable Scope in Shared Components]
**Learning:** In static HTML projects using shared JavaScript files (like js/header.js), variable collisions can occur if the shared script is included on pages that also contain manual or older versions of the same component structure. Using generic variable names like 'menuToggle' can cause "Redeclaration" errors if the page already has a script or global variable with that name.
**Action:** Use specific, prefixed variable names (e.g., 'headerMenuToggle' instead of 'menuToggle') for DOM elements in shared scripts to ensure compatibility across all pages, including those with legacy or duplicate content.

## 2026-05-22 - [Accessible Interactive Cards]
**Learning:** Interactive "cards" or "tiles" that use inline `onclick` often lack keyboard support and screen reader context. Simply adding a click listener is insufficient for true accessibility.
**Action:** Always implement the following for interactive cards: `role="button"`, `tabindex="0"`, `aria-expanded` (if toggling state), and `aria-labelledby` linked to the card's internal heading. In JS, handle both `click` and `keydown` (Enter/Space) to ensure all users can interact with the element.

## 2026-05-24 - [Injected UI Component Visibility]
**Learning:** UI elements injected programmatically via JavaScript (like floating action buttons or cookie banners) can easily become "ghost" elements if their CSS is missing from the global stylesheet. These elements occupy space in the DOM and can be focused by screen readers or keyboard users, but remain invisible to sighted users, creating a confusing and broken experience.
**Action:** When working with JS-injected components, verify that their CSS classes are defined in `global.css` or a similarly shared asset. Always perform a visual verification on both mobile and desktop viewports to ensure these dynamic elements are correctly positioned and visible as intended.
