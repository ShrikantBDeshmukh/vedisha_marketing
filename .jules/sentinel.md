## 2026-05-10 - Iframe Hardening and Repository Hygiene
**Vulnerability:** Information leakage through unmanaged local logs/exports and lack of iframe sandboxing.
**Learning:** Static site repositories often accumulate development artifacts like `server.log` or `.zip` exports that may contain sensitive configuration or user data. Additionally, third-party iframes (like Google Maps) should always be sandboxed as a defense-in-depth measure.
**Prevention:** Use a robust `.gitignore` to exclude `*.log`, `*.zip`, and `dist/` by default. Apply `sandbox` attributes to all iframes with the minimum necessary permissions (`allow-scripts allow-same-origin` for Google Maps).
