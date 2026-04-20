## 2026-04-18 - [Challenge] Component Synchronization Whitespace
**Vulnerability:** N/A (Tooling Issue)
**Learning:** Running `node sync-components.js` can introduce significant whitespace changes and duplicates if not carefully managed, potentially obscuring meaningful security changes in diffs.
**Prevention:** Always verify the diff after running synchronization tools and consider manual application of surgical security fixes if the tool is too aggressive.
