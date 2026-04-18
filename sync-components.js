const fs = require('fs');
const path = require('path');

const dir = process.cwd();

const SOCIAL_LINKS = {
    FACEBOOK: "https://facebook.com/vedishamarketing",
    INSTAGRAM: "https://instagram.com/vedishamarketing",
    TWITTER: "https://x.com/vedishamarketing",
    LINKEDIN: "https://linkedin.com/company/vedishamarketing",
    YOUTUBE: "https://youtube.com/@vedishamarketing"
};

function getHeader(lang, currentFile) {
  const isMr = lang === 'mr';
  const prefix = isMr ? '/mr/' : '/';
  const home = isMr ? 'मुख्यपृष्ठ' : 'Home';
  const about = isMr ? 'आमच्याबद्दल' : 'About';
  const services = isMr ? 'सेवा' : 'Services';
  const work = isMr ? 'कार्य' : 'Work';
  const cta = isMr ? 'योजना सुरू करा' : 'Start a Plan';
  const brand = isMr ? 'वेदिशा मार्केटिंग' : 'Vedisha Marketing';
  const skip = isMr ? 'मुख्य आशयाकडे जा' : 'Skip to content';
  const menu = isMr ? 'मेनू' : 'Menu';

  const otherLangLabel = isMr ? 'EN' : 'मराठी';
  const currentLangLabel = isMr ? 'मराठी' : 'EN';

  // Logic for lang switcher to target current page in other language
  let otherLangUrl;
  if (isMr) {
    otherLangUrl = '/' + currentFile;
  } else {
    otherLangUrl = '/mr/' + currentFile;
  }

  // Verify if target file exists, if not fallback to index
  const targetPath = path.join(dir, otherLangUrl);
  if (!fs.existsSync(targetPath)) {
    otherLangUrl = isMr ? '/index.html' : '/mr/index.html';
  }

  const switcher = isMr
    ? `<a href="${otherLangUrl}" style="text-decoration: none; color: inherit; opacity: 0.7;">EN</a> | <span style="color: var(--c-accent);">मराठी</span>`
    : `<span style="color: var(--c-accent);">EN</span> | <a href="${otherLangUrl}" style="text-decoration: none; color: inherit; opacity: 0.7;">मराठी</a>`;

  return `  <header class="site-header" id="site-header">
    <a class="skip-link" href="#main">${skip}</a>
    <div class="site-header__inner">
      <a href="${prefix}index.html" class="site-brand" aria-label="${brand} ${isMr?'होम':'Home'}">
         <div class="site-brand__mark">V</div>
         <span class="site-brand__text">${brand}</span>
      </a>
      <nav class="site-nav" id="site-nav" aria-label="${isMr?'मुख्य नेव्हिगेशन':'Primary navigation'}">
        <a href="${prefix}index.html">${home}</a>
        <a href="${prefix}about.html">${about}</a>
        <a href="${prefix}services.html">${services}</a>
        <a href="${prefix}work.html">${work}</a>
        <div class="lang-switcher" style="display: inline-flex; gap: 8px; margin: 0 15px; font-weight: 600; font-size: 0.9rem;">
          ${switcher}
        </div>
        <a href="${prefix}contact.html" class="site-nav__cta">${cta}</a>
      </nav>
      <button class="nav-toggle" id="navToggle" aria-label="${isMr?'मेनू उघडा':'Toggle menu'}" aria-expanded="false">
        <span>${menu}</span>
      </button>
    </div>
  </header>`;
}

function getFooter(lang) {
    const isMr = lang === 'mr';
    const prefix = isMr ? '/mr/' : '/';
    const brand = isMr ? 'वेदिशा मार्केटिंग' : 'Vedisha Marketing';
    const tagline = isMr
        ? `<a href="https://codwebsolutions.com" target="_blank" rel="noopener noreferrer">Codweb Solutions</a> द्वारे निर्मित — स्पष्टता, वेग आणि विश्वासासाठी काळजीपूर्वक तयार केलेले.`
        : `Crafted with <a href="https://codwebsolutions.com" target="_blank" rel="noopener noreferrer">Codweb Solutions</a> — built with care for clarity, speed, and trust.`;

    const groups = isMr ? [
        { h: 'कंपनी', links: [['मुख्यपृष्ठ', 'index.html'], ['आमच्याबद्दल', 'about.html'], ['सेवा', 'services.html'], ['कार्य', 'work.html']] },
        { h: 'सेवा', links: [['पेड ॲड्स मॅनेजमेंट', 'meta-google-ads-management.html'], ['स्थानिक SEO पॅक', 'local-lead-combo.html'], ['SEO लॉन्च', 'static-website-seo-launch.html'], ['जिओ कंटेंट हब', 'content-geo.html'], ['इंडस्ट्रियल SEO', 'industrial-seo-waluj-midc.html'], ['रिअल इस्टेट मार्केटिंग', 'real-estate-marketing.html'], ['GMB ऑप्टिमायझेशन', 'gmb.html']] },
        { h: 'संसाधने', links: [['ब्लॉग', 'blog.html'], ['केस स्टडीज', 'case-studies.html'], ['FAQ', 'faq.html'], ['AI व्हिजिबिलिटी बूस्ट', 'ai-visibility-boost.html'], ['करिअर', 'careers.html']] },
        { h: 'संपर्क साधा', links: [['आमच्याशी संपर्क साधा', 'contact.html'], ['आम्हाला ईमेल करा', 'mailto:hello@vedishamarketing.in'], ['त्वरित प्रश्न', 'mailto:hello@vedishamarketing.in?subject=त्वरित%20प्रश्न%20-%20वेदिशा%20मार्केटिंग']] }
    ] : [
        { h: 'Company', links: [['Home', 'index.html'], ['About Us', 'about.html'], ['Services', 'services.html'], ['Work', 'work.html']] },
        { h: 'Services', links: [['Paid Ads Management', 'meta-google-ads-management.html'], ['Local SEO Pack', 'local-lead-combo.html'], ['SEO Launch', 'static-website-seo-launch.html'], ['Geo Content Hubs', 'content-geo.html'], ['Industrial SEO', 'industrial-seo-waluj-midc.html'], ['Real Estate Marketing', 'real-estate-marketing.html'], ['GMB Optimization', 'gmb.html']] },
        { h: 'Resources', links: [['Blog', 'blog.html'], ['Case Studies', 'case-studies.html'], ['FAQ', 'faq.html'], ['AI Visibility Boost', 'ai-visibility-boost.html'], ['Careers', 'careers.html']] },
        { h: 'Get in Touch', links: [['Contact Us', 'contact.html'], ['Email Us', 'mailto:hello@vedishamarketing.in'], ['Quick question', 'mailto:hello@vedishamarketing.in?subject=Quick%20question%20-%20Vedisha%20Marketing']] }
    ];

    const copyright = isMr ? `&copy; 2026 ${brand}. सर्व हक्क राखीव.` : `&copy; 2026 ${brand}. All rights reserved.`;
    const legal = isMr
        ? [['गोपनीयता धोरण', 'privacy-policy.html'], ['सेवा अटी', 'terms-of-service.html'], ['अस्वीकरण', 'disclaimer.html']]
        : [['Privacy Policy', 'privacy-policy.html'], ['Terms of Service', 'terms-of-service.html'], ['Disclaimer', 'disclaimer.html']];

    return `  <footer class="site-footer" id="site-footer">
    <div class="footer-container">
      <div class="footer-top">
        <div class="footer-brand">
          <a href="${prefix}index.html" class="footer-logo" aria-label="${brand} Home">
            <span class="logo-icon">V</span>
            <span class="logo-text">${brand}</span>
          </a>
          <p class="footer-tagline">${tagline}</p>
        </div>
        <nav class="footer-nav" aria-label="${isMr?'फूटर नेव्हिगेशन':'Footer navigation'}">
          ${groups.map(g => `
          <div class="footer-nav-group">
            <h4 class="footer-nav-heading">${g.h}</h4>
            <ul class="footer-nav-list">
              ${g.links.map(l => `<li><a href="${l[1].startsWith('mailto')?l[1]:prefix+l[1]}">${l[0]}</a></li>`).join('')}
            </ul>
          </div>`).join('')}
        </nav>
      </div>
      <div class="footer-divider"></div>
      <div class="footer-bottom">
        <p class="footer-copyright">${copyright}</p>
        <ul class="footer-legal" aria-label="${isMr?'कायदेशीर दुवे':'Legal links'}">
          ${legal.map(l => `<li><a href="${prefix}${l[1]}">${l[0]}</a></li>`).join('')}
        </ul>
        <div class="footer-social" aria-label="${isMr?'सोशल मीडिया दुवे':'Social media links'}">
          <a href="${SOCIAL_LINKS.FACEBOOK}" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="social-icon"><svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg></a>
          <a href="${SOCIAL_LINKS.INSTAGRAM}" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="social-icon"><svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
          <a href="${SOCIAL_LINKS.TWITTER}" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" class="social-icon"><svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
          <a href="${SOCIAL_LINKS.LINKEDIN}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="social-icon"><svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
          <a href="${SOCIAL_LINKS.YOUTUBE}" target="_blank" rel="noopener noreferrer" aria-label="YouTube" class="social-icon"><svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
        </div>
      </div>
    </div>
  </footer>`;
}

function processFiles(directory, lang = 'en') {
    const files = fs.readdirSync(directory);
    files.forEach(file => {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== 'css' && file !== 'js' && file !== 'images' && file !== 'components') {
                processFiles(filePath, file === 'mr' ? 'mr' : lang);
            }
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(filePath, 'utf-8');
            const currentLang = lang;
            const fileName = path.basename(filePath);

            const header = getHeader(currentLang, fileName);
            const footer = getFooter(currentLang);

            // Clean existing headers and footers
            content = content.replace(/<header[\s\S]*?<\/header>/gi, '');
            content = content.replace(/<footer[\s\S]*?<\/footer>/gi, '');

            // Standardize lang attribute
            if (currentLang === 'mr') {
              content = content.replace(/<html lang="en">/i, '<html lang="mr">');
            } else {
              content = content.replace(/<html lang="mr">/i, '<html lang="en">');
            }

            // Standardize domain to .in
            content = content.replace(/vedishamarketing\.com/gi, 'vedishamarketing.in');

            // Insert Header at start of body
            content = content.replace(/(<body[^>]*>)/i, `$1\n${header}`);

            // Insert Footer before end of body
            content = content.replace(/(<\/body>)/i, `\n${footer}\n$1`);

            // 3. Ensure global.css is present in head
            if (!content.includes('global.css')) {
                const globalCssLink = '  <link rel="stylesheet" href="/css/global.css">';
                content = content.replace(/<\/head>/i, globalCssLink + '\n</head>');
            }

            // 4. Ensure global.js is present before body end
            if (!content.includes('global.js')) {
                const globalJsLink = '  <script src="/js/global.js"></script>';
                content = content.replace(/(<\/body>)/i, globalJsLink + '\n$1');
            }

            fs.writeFileSync(filePath, content, 'utf-8');
        }
    });
}

processFiles(dir);

console.log(`Multi-language component synchronization and cleanup complete.`);
