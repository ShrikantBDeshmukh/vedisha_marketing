## 2025-05-07 - Sensitive Files in Repository Root
**Vulnerability:** Large site backups (`.zip`) and local server logs (`.log`) were found committed to the repository root.
**Learning:** Development and export artifacts can be accidentally included in the codebase if they are not explicitly listed in `.gitignore`. This leads to significant information leakage and bloat.
**Prevention:** Ensure `.gitignore` covers common export and log patterns, and periodically audit the root directory for non-source files.
