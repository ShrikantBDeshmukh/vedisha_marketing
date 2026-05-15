## 2025-05-15 - Accessible Hybrid Navigation
**Learning:** Implementing a navigation menu that supports hover, click, and keyboard focus simultaneously requires a synchronized state management approach. Using a simple `toggle()` on click can conflict with `focusin` or `mouseenter` events. Explicit `openMenu` and `closeMenu` functions, combined with a small `mouseleave` timeout, provide a much smoother and more predictable experience across all input methods.
**Action:** Always use explicit state-setting functions (open/close) rather than toggle for multi-input interactive components.

## 2025-05-15 - Global Focus Consistency
**Learning:** Important accessibility features like `focus-visible` outlines often start as local styles on the home page but are easily forgotten on sub-pages.
**Action:** Audit and centralize all accessibility-related CSS (focus states, skip links) into `global.css` early in the development process to ensure a consistent experience for keyboard and screen reader users site-wide.
