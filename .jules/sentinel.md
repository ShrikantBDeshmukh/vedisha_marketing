## 2025-04-20 - [Enhanced Iframe Security Pattern]
**Vulnerability:** Defense-in-depth against potential vulnerabilities in third-party embedded content (Google Maps).
**Learning:** For external embeds, implementing `sandbox` and `referrerpolicy` provides an additional layer of security. Combining `allow-scripts` and `allow-same-origin` is often necessary for map functionality but should be used selectively.
**Prevention:** Always apply restrictive sandbox attributes to third-party iframes where possible.
