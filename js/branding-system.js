/**
 * Vedisha Marketing - Performance Branding System
 * Handles theme switching and WCAG 2.1 accessibility compliance.
 */

(function() {
    'use strict';

    const VedishaBranding = {
        themes: {
            vanguard: 'theme-vanguard',
            authority: 'theme-authority',
            conversion: 'theme-conversion'
        },

        /**
         * Sets the site-wide theme by applying a class to the body tag.
         * @param {string} themeName - Name of the theme ('vanguard', 'authority', 'conversion')
         */
        setTheme(themeName) {
            const themeClass = this.themes[themeName];
            if (!themeClass) {
                console.error(`BrandingSystem: Theme "${themeName}" not found.`);
                return;
            }

            // Remove existing theme classes
            Object.values(this.themes).forEach(cls => {
                document.body.classList.remove(cls);
            });

            // Add new theme class
            document.body.classList.add(themeClass);
            localStorage.setItem('vedisha_theme', themeName);

            console.log(`BrandingSystem: Switched to "${themeName}" theme.`);
            this.checkAccessibility();
        },

        /**
         * Helper to convert HSL to RGB for contrast calculation
         */
        hslToRgb(h, s, l) {
            s /= 100;
            l /= 100;
            const k = n => (n + h / 30) % 12;
            const a = s * Math.min(l, 1 - l);
            const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
            return [255 * f(0), 255 * f(8), 255 * f(4)];
        },

        /**
         * Calculates relative luminance of an RGB color
         */
        getLuminance(rgb) {
            const a = rgb.map(v => {
                v /= 255;
                return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
            });
            return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
        },

        /**
         * Checks contrast ratio of current theme's accent color against white background.
         * WCAG 2.1 AA requirement: 3:1 for large text/graphical objects, 4.5:1 for normal text.
         */
        checkAccessibility() {
            const body = document.body;
            const styles = getComputedStyle(body);

            // Get HSL variables from computed styles
            const h = parseFloat(styles.getPropertyValue('--theme-h-accent'));
            const s = parseFloat(styles.getPropertyValue('--theme-s-accent'));
            const l = parseFloat(styles.getPropertyValue('--theme-l-accent'));

            if (isNaN(h) || isNaN(s) || isNaN(l)) return;

            const rgb = this.hslToRgb(h, s, l);
            const lumAccent = this.getLuminance(rgb);
            const lumWhite = 1.0; // White #FFFFFF

            const contrast = (lumWhite + 0.05) / (lumAccent + 0.05);

            console.log(`BrandingSystem: Accent color contrast ratio on white: ${contrast.toFixed(2)}:1`);

            if (contrast < 3) {
                console.warn(`%cBrandingSystem: ACCESSIBILITY WARNING - Accent color contrast ratio (${contrast.toFixed(2)}:1) is below WCAG 2.1 recommended 3:1 for graphical objects.`, 'color: #ff5f73; font-weight: bold;');

                // Suggest adjustment
                let targetL = l;
                while (targetL > 0) {
                    targetL -= 1;
                    const testRgb = this.hslToRgb(h, s, targetL);
                    const testLum = this.getLuminance(testRgb);
                    const testContrast = (lumWhite + 0.05) / (testLum + 0.05);
                    if (testContrast >= 3) {
                        console.info(`BrandingSystem: Suggested lightness for --theme-l-accent to reach 3:1 contrast: ${targetL}%`);
                        break;
                    }
                }
            } else {
                console.log('%cBrandingSystem: Accent color meets WCAG 2.1 (3:1) contrast requirements.', 'color: #63E6D4;');
            }
        },

        init() {
            const savedTheme = localStorage.getItem('vedisha_theme') || 'vanguard';
            // Wait for DOM to be fully ready if script is loaded early
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setTheme(savedTheme));
            } else {
                this.setTheme(savedTheme);
            }
        }
    };

    window.VedishaBranding = VedishaBranding;
    VedishaBranding.init();
})();
