## 2025-05-21 - [Sensitive Data Exposure]
**Vulnerability:** Information leakage via 'server.log' (containing IP addresses and internal paths) and 'vedisha_marketing_export.zip' (likely containing sensitive backups).
**Learning:** Temporary artifacts generated during local development or manual exports were being tracked by Git, exposing them to anyone with repository access. Legacy security headers like 'X-XSS-Protection' were still present despite being deprecated and potentially exploitable.
**Prevention:** Maintain a strict '.gitignore' that includes broad patterns like '*.log', '*.zip', and '.history/'. Regularly audit the project root for non-source artifacts. Use modern security headers (CSP) and remove legacy ones that provide a false sense of security or introduce new risks.
