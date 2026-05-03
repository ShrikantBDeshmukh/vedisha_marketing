## 2026-04-17 - [Variable Scope in Shared Components]
**Learning:** In static HTML projects using shared JavaScript files (like js/header.js), variable collisions can occur if the shared script is included on pages that also contain manual or older versions of the same component structure. Using generic variable names like 'menuToggle' can cause "Redeclaration" errors if the page already has a script or global variable with that name.
**Action:** Use specific, prefixed variable names (e.g., 'headerMenuToggle' instead of 'menuToggle') for DOM elements in shared scripts to ensure compatibility across all pages, including those with legacy or duplicate content.

## 2026-05-22 - [Accessible Interactive Cards]
**Learning:** Interactive "cards" or "tiles" that use inline `onclick` often lack keyboard support and screen reader context. Simply adding a click listener is insufficient for true accessibility.
**Action:** Always implement the following for interactive cards: `role="button"`, `tabindex="0"`, `aria-expanded` (if toggling state), and `aria-labelledby` linked to the card's internal heading. In JS, handle both `click` and `keydown` (Enter/Space) to ensure all users can interact with the element.

## 2026-05-03 - [Mobile Menu Toggle Feedback]
**Learning:** For mobile navigation menus, a simple hamburger icon that doesn't change state when active provides poor visual feedback. Users benefit from the icon swapping to a "Close" (X) symbol when the menu is expanded, reinforcing the current state and the action required to dismiss it.
**Action:** Implement icon swapping for menu toggles by updating the button's `innerHTML` with the appropriate SVG based on the `aria-expanded` state. Ensure `aria-label` is also present for screen reader accessibility on these icon-only buttons.
