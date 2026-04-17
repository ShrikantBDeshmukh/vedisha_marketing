(() => {
  'use strict';

  const existing = document.querySelector('.site-header');
  if (existing) return;

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

  const header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = `
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

  document.body.insertAdjacentElement('afterbegin', header);

  const toggle = header.querySelector('.nav-toggle');
  const nav = header.querySelector('#site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    document.addEventListener('click', (e) => {
      if (!nav.classList.contains('is-open')) return;
      if (header.contains(e.target)) return;
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }
})();

