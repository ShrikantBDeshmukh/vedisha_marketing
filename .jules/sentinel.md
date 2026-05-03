
## 2025-05-14 - [Iframe Hardening & CSP Synchronization]
**Vulnerability:** External iframes (Google Maps) lacked sandbox and referrer-policy attributes, potentially allowing for cross-origin attacks or information leakage. Additionally, the CSP was out of sync with the application's Tailwind CDN dependency.
**Learning:** Hardening third-party integrations with 'sandbox' and 'referrerpolicy' provides defense-in-depth even for trusted sources like Google Maps. CSP must be maintained alongside functional dependencies to prevent security controls from breaking core UI.
**Prevention:** Always implement 'sandbox' and 'referrerpolicy' for external iframes. Periodically audit the CSP against used scripts and third-party assets.
