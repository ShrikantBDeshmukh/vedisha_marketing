# Sentinel Security Journal

## 2026-05-12 - Hardening Third-Party Iframes
**Vulnerability:** Third-party iframes (like Google Maps) were included without `sandbox` or `referrerpolicy` attributes, potentially allowing for unwanted script execution or data leakage if the third-party source were compromised.
**Learning:** Even trusted third-party content should be restricted using the principle of least privilege. `sandbox` attributes provide a critical layer of defense.
**Prevention:** Always include restrictive `sandbox` and `referrerpolicy` attributes on all iframes.

## 2026-05-12 - Repository Hygiene and Data Leaks
**Vulnerability:** Sensitive artifacts like `server.log` and large ZIP exports were present in the root directory.
**Learning:** Local development logs and one-off exports can easily leak sensitive information (IPs, user paths, system structure) if committed.
**Prevention:** Maintain a strict `.gitignore` for `*.log` and `*.zip` files and regularly audit the repository for temporary artifacts.
