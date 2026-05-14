## 2025-05-17 - Sensitive File Exposure & Header Hardening
**Vulnerability:** Sensitive files (`server.log`, `vedisha_marketing_export.zip`) were committed to the repository, and the CSP lacked modern clickjacking protection while using deprecated headers.
**Learning:** Development logs and bulk exports are often accidentally staged. Obsolete headers like `X-XSS-Protection` can sometimes introduce vulnerabilities in modern browsers and should be replaced by robust CSP directives.
**Prevention:** Maintain a strict `.gitignore` for `*.log` and `*.zip` files. Use `frame-ancestors 'none'` in CSP for modern clickjacking defense instead of relying solely on `X-Frame-Options`.
