(() => {
  'use strict';

  let existingHeader = document.querySelector('.site-header');
  if (existingHeader) {
    setupEventListeners(existingHeader);
    return;
  }

  const path = (window.location.pathname || '').toLowerCase();
  const file = path.split('/').pop() || 'index.html';

  // Support both:
  // - file:// local browsing (avoid leading "/" which becomes drive root)
  // - deployed site at domain root
  const inInsightsFolder = path.includes('/insights/');
  const base = inInsightsFolder ? '../' : '';

  const navItems = [
    { href: base + 'index.html', label: 'Home', match: ['index.html', ''] },
    { href: base + 'services.html', label: 'Services', match: ['services.html'] },
    { href: base + 'ai-visibility-boost.html', label: 'AI Visibility Boost', match: ['ai-visibility-boost.html'] },
    { href: base + 'work.html', label: 'Work', match: ['work.html', 'portfolio.html', 'case-studies.html'] },
    { href: base + 'clients.html', label: 'Clients', match: ['clients.html'] },
    { href: base + 'insights.html', label: 'Insights', match: ['insights.html', 'blog.html'] },
    { href: base + 'about.html', label: 'About', match: ['about.html'] },
  ];

  const isCurrent = (matches) => matches.includes(file);

  const linksHtml = navItems
    .map((item) => {
      const current = isCurrent(item.match) ? ' aria-current="page"' : '';
      return `<a href="${item.href}"${current}>${item.label}</a>`;
    })
    .join('');

  const newHeader = document.createElement('header');
  newHeader.className = 'site-header';
  newHeader.innerHTML = `
    <a class="skip-link" href="#main">Skip to content</a>
    <div class="site-header__inner">
      <a class="site-brand" href="${base}index.html" aria-label="Vedisha Marketing Home">
        <span class="site-brand__mark" aria-hidden="true">V</span>
        <span class="site-brand__text">Vedisha Marketing</span>
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
        <span aria-hidden="true">☰</span>
        <span>Menu</span>
      </button>
      <nav class="site-nav" id="site-nav" aria-label="Primary navigation">
        ${linksHtml}
        <a class="site-nav__cta" href="${base}contact.html">Get Free Audit</a>
      </nav>
    </div>
  `;

  document.body.insertAdjacentElement('afterbegin', newHeader);
  setupEventListeners(newHeader);

  function setupEventListeners(headerEl) {
    const headerMenuToggle = headerEl.querySelector('.nav-toggle');
    const headerSiteNav = headerEl.querySelector('#site-nav');

    if (headerMenuToggle && headerSiteNav) {
      const closeMenu = () => {
        headerSiteNav.classList.remove('is-open');
        headerMenuToggle.setAttribute('aria-expanded', 'false');
      };

      headerMenuToggle.addEventListener('click', () => {
        const isOpen = headerSiteNav.classList.toggle('is-open');
        headerMenuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });

      document.addEventListener('click', (e) => {
        if (!headerSiteNav.classList.contains('is-open')) return;
        if (headerEl.contains(e.target)) return;
        closeMenu();
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && headerSiteNav.classList.contains('is-open')) {
          closeMenu();
          headerMenuToggle.focus();
        }
      });
    }
  }
})();

