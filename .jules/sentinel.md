## 2025-05-14 - Rejected CSP Relaxation for Dev CDNs
**Vulnerability:** Whitelisting development-focused CDNs (like cdn.tailwindcss.com) in script-src.
**Learning:** Even if a script is present in HTML templates, whitelisting its dev-only CDN version in production CSP increases supply-chain risk and uses non-optimized runtime compilers. Hardening was prioritized over whitelisting existing patterns that violate production standards.
**Prevention:** Always use build-time CSS/JS compilation for production instead of whitelisting runtime compilers in CSP.

## 2025-05-14 - Iframe Hardening for Third-Party Embeds
**Vulnerability:** Permissive iframes (Google Maps) lacking sandbox and referrer controls.
**Learning:** Third-party embeds like Google Maps should be restricted using `sandbox` with minimal required permissions (`allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox`) and `referrerpolicy="strict-origin-when-cross-origin"` to prevent data leakage and provide defense-in-depth.
**Prevention:** Standardize all iframe embeds with required security attributes.
