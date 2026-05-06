## 2026-04-30 - Iframe Hardening and CSP Synchronization
**Vulnerability:** Google Maps iframes lacked `sandbox` and `referrerpolicy` attributes, and the Content Security Policy (CSP) was missing the required `https://cdn.tailwindcss.com` source, despite it being used globally.
**Learning:** Standard third-party widgets like Google Maps can be a vector for data leakage or UI redressing if not properly restricted. Furthermore, a strict CSP that doesn't mirror the actual external dependencies (like CDNs) can lead to broken site functionality when enforced.
**Prevention:** Always implement defense-in-depth for iframes using `sandbox` and `referrerpolicy`. Regularly audit the CSP against the `script-src` and `style-src` actually used in the templates to ensure synchronization.
