(() => {
  'use strict';

  const path = (window.location.pathname || '').toLowerCase();
  const segments = path.split('/').filter(Boolean);
  const isInsights = segments.includes('insights');

  let basePath = './';
  if (isInsights) {
    basePath = '../';
  }

  const brandName = 'Vedisha Marketing';

  const navItems = [
    { href: 'index.html', label: 'Home', match: ['index.html', ''] },
    { href: 'services.html', label: 'Services', match: ['services.html'] },
    { href: 'ai-visibility-boost.html', label: 'AI Visibility', match: ['ai-visibility-boost.html'] },
    { href: 'work.html', label: 'Work', match: ['work.html', 'portfolio.html', 'case-studies.html'] },
    { href: 'about.html', label: 'About', match: ['about.html'] },
  ];

  const currentFile = segments[segments.length - 1] || 'index.html';

  const headerHtml = `
    <a class="skip-link" href="#main">Skip to content</a>
    <div class="site-header__inner">
      <a href="${basePath}index.html" class="site-brand" aria-label="${brandName} Home">
         <div class="site-brand__mark">V</div>
         <span class="site-brand__text">${brandName}</span>
      </a>
      <nav class="site-nav" id="site-nav" aria-label="Primary navigation">
        ${navItems.map(item => {
            const active = item.match.includes(currentFile) ? ' aria-current="page"' : '';
            return `<a href="${basePath}${item.href}"${active}>${item.label}</a>`;
        }).join('')}
        <a href="${basePath}contact.html" class="site-nav__cta">Start a Plan</a>
      </nav>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">
        <span>Menu</span>
      </button>
    </div>
  `;

  const footerHtml = `
    <div class="footer-container">
      <div class="footer-top">
        <div class="footer-brand">
          <a href="${basePath}index.html" class="footer-logo" aria-label="${brandName} Home">
            <span class="logo-icon">V</span>
            <span class="logo-text">${brandName}</span>
          </a>
          <p class="footer-tagline">Crafted with care for clarity, speed, and trust.</p>
        </div>
        <nav class="footer-nav" aria-label="Footer navigation">
          <div class="footer-nav-group">
            <h4 class="footer-nav-heading">Company</h4>
            <ul class="footer-nav-list">
              <li><a href="${basePath}index.html">Home</a></li>
              <li><a href="${basePath}about.html">About Us</a></li>
              <li><a href="${basePath}services.html">Services</a></li>
              <li><a href="${basePath}work.html">Work</a></li>
            </ul>
          </div>
          <div class="footer-nav-group">
            <h4 class="footer-nav-heading">Services</h4>
            <ul class="footer-nav-list">
              <li><a href="${basePath}meta-google-ads-management.html">Ads Management</a></li>
              <li><a href="${basePath}local-lead-combo.html">Local SEO Pack</a></li>
              <li><a href="${basePath}industrial-seo-waluj-midc.html">Industrial SEO</a></li>
            </ul>
          </div>
          <div class="footer-nav-group">
            <h4 class="footer-nav-heading">Get in Touch</h4>
            <ul class="footer-nav-list">
              <li><a href="${basePath}contact.html">Contact Us</a></li>
              <li><a href="mailto:hello@vedishamarketing.in">Email Us</a></li>
            </ul>
          </div>
        </nav>
      </div>
      <div class="footer-divider"></div>
      <div class="footer-bottom">
        <p class="footer-copyright">&copy; 2026 ${brandName}. All rights reserved.</p>
        <div class="footer-legal">
           <a href="${basePath}privacy-policy.html">Privacy</a>
           <a href="${basePath}terms-of-service.html">Terms</a>
        </div>
      </div>
    </div>
  `;

  const injectComponents = () => {
    // Header
    let header = document.getElementById('site-header');
    if (!header) {
        header = document.createElement('header');
        header.id = 'site-header';
        header.className = 'site-header';
        document.body.insertAdjacentElement('afterbegin', header);
    }
    header.innerHTML = headerHtml;

    // Footer
    let footer = document.getElementById('site-footer');
    if (!footer) {
        footer = document.createElement('footer');
        footer.id = 'site-footer';
        footer.className = 'site-footer';
        document.body.insertAdjacentElement('beforeend', footer);
    }
    footer.innerHTML = footerHtml;

    setupNavToggle();
  };

  const setupNavToggle = () => {
    const navToggle = document.getElementById('navToggle');
    const siteNav = document.getElementById('site-nav');
    if (navToggle && siteNav) {
      navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !expanded);
        siteNav.classList.toggle('is-open');
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && siteNav.classList.contains('is-open')) {
          navToggle.setAttribute('aria-expanded', 'false');
          siteNav.classList.remove('is-open');
          navToggle.focus();
        }
      });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectComponents);
  } else {
    injectComponents();
  }
})();
