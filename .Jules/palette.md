## 2026-04-17 - [Variable Scope in Shared Components]
**Learning:** In static HTML projects using shared JavaScript files (like js/header.js), variable collisions can occur if the shared script is included on pages that also contain manual or older versions of the same component structure. Using generic variable names like 'menuToggle' can cause "Redeclaration" errors if the page already has a script or global variable with that name.
**Action:** Use specific, prefixed variable names (e.g., 'headerMenuToggle' instead of 'menuToggle') for DOM elements in shared scripts to ensure compatibility across all pages, including those with legacy or duplicate content.

## 2026-05-22 - [Accessible Interactive Cards]
**Learning:** Interactive "cards" or "tiles" that use inline `onclick` often lack keyboard support and screen reader context. Simply adding a click listener is insufficient for true accessibility.
**Action:** Always implement the following for interactive cards: `role="button"`, `tabindex="0"`, `aria-expanded` (if toggling state), and `aria-labelledby` linked to the card's internal heading. In JS, handle both `click` and `keydown` (Enter/Space) to ensure all users can interact with the element.

## 2026-06-15 - [Navigation & Scroll Accessibility]
**Learning:** Fixed headers (e.g., 5rem height) occlude content when navigating via anchor links. Additionally, using only color to indicate the active navigation state fails WCAG accessibility standards for low-vision or color-blind users.
**Action:** Set `scroll-padding-top` on the `html` element equal to the header height to fix anchor occlusion. For active navigation links, always include a non-color visual indicator like an underline (`text-decoration: underline`) or an offset border.
