## 2025-05-21 - [Sensitive Data Leakage via Log and Backup Files]
**Vulnerability:** Discovery of `server.log` (access logs with IP addresses and request paths) and `vedisha_marketing_export.zip` (unprotected site backup) in the repository root.
**Learning:** Development-time artifacts (logs and exports) are frequently left in the root directory and can be accidentally committed if not explicitly ignored, leading to information leakage.
**Prevention:** Ensure `*.log`, `*.zip`, and other common artifact patterns are included in the global `.gitignore` before deployment. Periodically audit the repository root for unexpected binary or text artifacts.
