## 2025-05-15 - Iframe Sandboxing and Information Leakage Prevention
**Vulnerability:** Exposed sensitive files (`vedisha_marketing_export.zip`, `server.log`) and lack of defense-in-depth for third-party iframes and modern clickjacking headers.
**Learning:** Hardening an existing site requires a balance between strict security (CSP, sandbox) and maintaining third-party functionality (Google Maps). Overly restrictive sandboxing (e.g., omitting `allow-forms`) can break map interactivity.
**Prevention:** Always verify third-party embeds visually after applying `sandbox` attributes. Standardize modern headers like `frame-ancestors 'none'` over deprecated ones like `X-XSS-Protection`. Prevent recurring information leakage by adding broad patterns (`*.log`, `*.zip`) to `.gitignore` early.
