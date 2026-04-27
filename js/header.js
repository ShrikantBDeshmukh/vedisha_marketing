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
      const current = isCurrent(item.match) ? ' aria-current="page" class="text-blue-600 font-bold"' : ' class="text-slate-600 font-semibold hover:text-blue-600 transition"';
      return `<a href="${item.href}"${current}>${item.label}</a>`;
    })
    .join('');

  const newHeader = document.createElement('header');
  newHeader.className = 'fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200';
  newHeader.innerHTML = `
    <a class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 z-[100]" href="#main">Skip to content</a>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
      <a class="flex items-center gap-3 text-slate-900 font-extrabold text-2xl tracking-tight" href="${base}index.html" aria-label="Vedisha Marketing Home">
        <span class="bg-gradient-to-br from-teal-400 to-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-xl shadow-md" aria-hidden="true">V</span>
        <span>Vedisha Marketing</span>
      </a>
      <button class="md:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none" type="button" aria-expanded="false" aria-controls="mobile-nav" id="nav-toggle">
        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </button>
      <nav class="hidden md:flex items-center gap-6" aria-label="Primary navigation">
        ${linksHtml}
        <a class="ml-4 inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition shadow-sm" href="${base}contact.html">Get Free Audit</a>
      </nav>
    </div>
    <!-- Mobile Menu Overlay -->
    <div id="mobile-nav" class="hidden absolute top-20 left-0 w-full bg-white border-b border-slate-200 shadow-xl flex-col p-4 shadow-lg slide-in">
        ${navItems.map(item => `<a href="${item.href}" class="block py-3 px-4 font-semibold ${isCurrent(item.match) ? 'text-blue-600 bg-blue-50 rounded-lg' : 'text-slate-600'}">${item.label}</a>`).join('')}
        <a class="block mt-4 text-center px-6 py-3 font-bold text-white bg-blue-600 rounded-xl" href="${base}contact.html">Get Free Audit</a>
    </div>
  `;

  document.body.insertAdjacentElement('afterbegin', newHeader);
  setupEventListeners(newHeader);

  function setupEventListeners(headerEl) {
    const headerMenuToggle = headerEl.querySelector('#nav-toggle');
    const headerSiteNav = headerEl.querySelector('#mobile-nav');

    if (headerMenuToggle && headerSiteNav) {
      const closeMenu = () => {
        headerSiteNav.classList.add('hidden');
        headerSiteNav.classList.remove('flex');
        headerMenuToggle.setAttribute('aria-expanded', 'false');
        const iconPath = headerMenuToggle.querySelector('path');
        if (iconPath) iconPath.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
      };

      headerMenuToggle.addEventListener('click', () => {
        const isHidden = headerSiteNav.classList.contains('hidden');
        const iconPath = headerMenuToggle.querySelector('path');
        if (!isHidden) {
          closeMenu();
        } else {
          headerSiteNav.classList.remove('hidden');
          headerSiteNav.classList.add('flex');
          headerMenuToggle.setAttribute('aria-expanded', 'true');
          if (iconPath) iconPath.setAttribute('d', 'M6 18L18 6M6 6l12 12');
        }
      });

      document.addEventListener('click', (e) => {
        if (headerSiteNav.classList.contains('hidden')) return;
        if (headerEl.contains(e.target)) return;
        closeMenu();
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !headerSiteNav.classList.contains('hidden')) {
          closeMenu();
          headerMenuToggle.focus();
        }
      });
    }
  }
})();

