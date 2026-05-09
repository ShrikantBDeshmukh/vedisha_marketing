## 2026-05-09 - Iframe Sandboxing Regression
**Vulnerability:** Insecure third-party iframes (Google Maps) missing sandbox and referrerpolicy.
**Learning:** Applying a too-restrictive sandbox (missing allow-forms) caused the Google Maps iframe to render as a blank box.
**Prevention:** Always perform visual verification (screenshots) after applying sandbox attributes to third-party content to ensure functional parity.
