# Agent Instructions for Vedisha Marketing

This repository contains the source code for the Vedisha Marketing website.

## Workflow
1.  **Modify Source**: Always edit the non-minified files in `css/` and `js/`.
2.  **Build**: After editing, run a minification tool (like `cleancss` or `terser`) to update the `.min` files.
    - Example: `npx cleancss -o css/global.min.css css/global.css`
    - Example: `npx terser js/footer.js -o js/footer.min.js --compress --mangle`
3.  **Images**: Use WebP format for all new images.
4.  **Local SEO**: Ensure all new content mentions "Chhatrapati Sambhajinagar" and targets the Marathwada region.
5.  **Shared Components**: The Header and Footer are injected via `js/header.js` and `js/footer.js`. Update these files to change the site-wide layout.

## Verification
- Test on mobile viewport (under 900px) for hamburger menu functionality.
- Ensure all `<img>` tags have `loading="lazy"`.
- Verify NAP (Name, Address, Phone) consistency in JSON-LD schema.
