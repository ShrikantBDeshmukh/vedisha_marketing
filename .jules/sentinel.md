## 2025-05-24 - Google Maps iFrame Hardening
**Vulnerability:** Google Maps iframes were included without sandbox or referrerpolicy attributes, potentially allowing the iframe to perform actions like opening popups, executing scripts in the parent context (if from the same origin, though not the case here), or leaking referrer data.
**Learning:** Even trusted third-party embeds should be restricted to the minimum necessary permissions to follow the principle of least privilege.
**Prevention:** Always use the `sandbox` attribute for iframes and set a restrictive `referrerpolicy`.

## 2025-05-24 - Clickjacking Protection
**Vulnerability:** The site lacked `frame-ancestors 'none'` in its Content-Security-Policy, making it susceptible to clickjacking attacks where the site could be embedded in a malicious iframe.
**Learning:** `X-Frame-Options: DENY` is good for legacy support, but modern security requires `frame-ancestors 'none'` in CSP for robust protection.
**Prevention:** Standardize security headers to include both `X-Frame-Options` and CSP `frame-ancestors` directive.
