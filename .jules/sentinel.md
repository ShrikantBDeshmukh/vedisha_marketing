## 2025-05-15 - Production CSP Hardening for Tailwind-reliant Static Sites
**Vulnerability:** Clickjacking and excessive script/iframe permissions.
**Learning:** In a static HTML environment relying heavily on the Tailwind Play CDN (`cdn.tailwindcss.com`), implementing a strict Content Security Policy (CSP) must explicitly whitelist the CDN in the `script-src` directive. Failure to do so results in a site-wide layout collapse.
**Prevention:** Always audit external CDN dependencies before deploying strict CSP `script-src 'self'` policies. Combine global `_headers` hardening (e.g., `frame-ancestors 'none'`) with element-level attribute hardening (e.g., `sandbox` on iframes) for defense-in-depth.
