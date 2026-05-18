## 2025-05-18 - Sensitive File Exposure & Iframe Hardening

**Vulnerability:** Exposure of `vedisha_marketing_export.zip` (potential backup/source leak) and `server.log` (internal path/IP leakage) in the web root. Lack of sandbox restrictions on Google Maps iframes.

**Learning:** Static site exports and development logs are frequently forgotten in the root directory, making them accessible to any visitor or crawler. Third-party iframes without sandbox attributes can theoretically execute malicious scripts or redirect the parent page if the provider is compromised.

**Prevention:** Explicitly exclude `*.log` and `*.zip` in `.gitignore` to prevent accidental commits. Implement `sandbox` and `referrerpolicy` on all iframes as a defense-in-depth measure. Ensure the sandbox includes necessary flags (`allow-forms`, `allow-popups-to-escape-sandbox`) for interactive widgets like Google Maps.
