## 2025-05-15 - [Iframe Sandboxing & CSP Hardening]
**Vulnerability:** External iframes lacked sandbox restrictions and the Content Security Policy was missing frame-ancestors protection, leaving the site vulnerable to potential clickjacking and unauthorized script execution from embedded content.
**Learning:** Even static marketing sites that embed common services like Google Maps should implement defense-in-depth measures like iframe sandboxing to limit the capabilities of the embedded content.
**Prevention:** Always apply `sandbox` and `referrerpolicy` to third-party iframes and maintain a robust CSP with `frame-ancestors 'none'` to prevent malicious framing.
