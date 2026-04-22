## 2026-04-22 - Iframe Hardening for Third-Party Services
**Vulnerability:** Unrestricted iframes can potentially execute malicious scripts or leak sensitive referrer information to third-party domains.
**Learning:** For static sites using third-party embeds (like Google Maps), a strict sandbox can break functionality. The specific combination of `allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox` is required for Google Maps to allow interactivity and external links ("Open in Maps") while still providing a defense-in-depth layer.
**Prevention:** Always implement `sandbox` and `referrerpolicy="strict-origin-when-cross-origin"` on all iframes, tailored to the minimum required permissions for the service.
