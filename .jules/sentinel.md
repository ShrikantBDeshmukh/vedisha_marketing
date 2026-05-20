## 2025-05-20 - Information Leakage via Unprotected Root Artifacts
**Vulnerability:** Discovery of `server.log` (access logs with IP addresses) and `vedisha_marketing_export.zip` (full site backup) in the repository root.
**Learning:** Development tools, export scripts, or local servers can leave behind sensitive artifacts that, if not explicitly ignored, get committed and exposed to the public.
**Prevention:** Strictly maintain `.gitignore` to exclude `*.log`, `*.zip`, and `.history/` directories; perform regular audits for non-source files in the root.
