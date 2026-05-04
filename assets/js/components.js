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

  const isCurrent = (matches) => matches.includes(currentFile);

  const linksHtml = navItems
    .map((item) => {
      const current = isCurrent(item.match) ? ' aria-current="page" class="text-blue-600 font-bold"' : ' class="text-slate-600 font-semibold hover:text-blue-600 transition"';
      return `<a href="${basePath}${item.href}"${current}>${item.label}</a>`;
    })
    .join('');

  const headerHtml = `
    <a class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 z-[100]" href="#main">Skip to content</a>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
      <a class="flex items-center gap-3 text-slate-900 font-extrabold text-2xl tracking-tight" href="${basePath}index.html" aria-label="Vedisha Marketing Home">
        <span class="bg-gradient-to-br from-teal-400 to-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-xl shadow-md" aria-hidden="true">V</span>
        <span>Vedisha Marketing</span>
      </a>
      <button class="md:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none" type="button" aria-expanded="false" aria-controls="mobile-nav" id="navToggle">
        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </button>
      <nav class="hidden md:flex items-center gap-6" aria-label="Primary navigation">
        ${linksHtml}
        <a class="ml-4 inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition shadow-sm" href="${basePath}contact.html">Get Free Audit</a>
      </nav>
    </div>
    <!-- Mobile Menu Overlay -->
    <div id="mobile-nav" class="hidden absolute top-20 left-0 w-full bg-white border-b border-slate-200 shadow-xl flex-col p-4 shadow-lg slide-in">
        ${navItems.map(item => `<a href="${basePath}${item.href}" class="block py-3 px-4 font-semibold ${isCurrent(item.match) ? 'text-blue-600 bg-blue-50 rounded-lg' : 'text-slate-600'}">${item.label}</a>`).join('')}
        <a class="block mt-4 text-center px-6 py-3 font-bold text-white bg-blue-600 rounded-xl" href="${basePath}contact.html">Get Free Audit</a>
    </div>
  `;

  const footerHtml = `
    <div class="bg-white border-t border-slate-200 pt-16 pb-8 overflow-hidden w-full">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-12">
          <div class="lg:col-span-2">
            <a href="${basePath}index.html" class="flex items-center gap-3 text-slate-900 font-extrabold text-2xl tracking-tight mb-4" aria-label="Vedisha Marketing Home">
              <span class="bg-slate-900 text-white w-10 h-10 flex items-center justify-center rounded-xl shadow-md" aria-hidden="true">V</span>
              <span>Vedisha Marketing</span>
            </a>
            <p class="text-slate-500 text-sm leading-relaxed max-w-sm">
              Crafted with care for clarity, speed, and trust in Chhatrapati Sambhajinagar.
            </p>
          </div>
          <div>
            <h4 class="font-bold text-slate-900 mb-4 uppercase tracking-wider text-sm">Company</h4>
            <ul class="space-y-3 text-slate-600 font-medium list-none p-0 m-0">
              <li><a href="${basePath}index.html" class="hover:text-teal-600 transition">Home</a></li>
              <li><a href="${basePath}about.html" class="hover:text-teal-600 transition">About Us</a></li>
              <li><a href="${basePath}services.html" class="hover:text-teal-600 transition">Services</a></li>
              <li><a href="${basePath}work.html" class="hover:text-teal-600 transition">Portfolio</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-slate-900 mb-4 uppercase tracking-wider text-sm">Services</h4>
            <ul class="space-y-3 text-slate-600 font-medium list-none p-0 m-0">
              <li><a href="${basePath}meta-google-ads-management.html" class="hover:text-teal-600 transition">Paid Ads</a></li>
              <li><a href="${basePath}local-lead-combo.html" class="hover:text-teal-600 transition">Local Lead Pack</a></li>
              <li><a href="${basePath}static-website-seo-launch.html" class="hover:text-teal-600 transition">SEO Launch</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-slate-900 mb-4 uppercase tracking-wider text-sm">Get in Touch</h4>
            <ul class="space-y-3 text-slate-600 font-medium list-none p-0 m-0">
              <li><a href="tel:+919404124875" class="hover:text-teal-600 transition">+91 94041 24875</a></li>
              <li><a href="https://wa.me/919404124875" class="hover:text-emerald-600 transition">WhatsApp Support</a></li>
              <li><a href="mailto:vedishamarketing@gmail.com" class="hover:text-teal-600 transition">vedishamarketing@gmail.com</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-sm text-slate-500 m-0">&copy; 2026 Vedisha Marketing. All rights reserved.</p>
          <ul class="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-medium list-none p-0 m-0" aria-label="Legal links">
            <li><a href="${basePath}privacy-policy.html" class="hover:text-slate-900">Privacy Policy</a></li>
            <li><a href="${basePath}terms-of-service.html" class="hover:text-slate-900">Terms of Service</a></li>
          </ul>
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
        // Add absolute positioning for the header component container natively
        header.className = 'fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200';
        document.body.insertAdjacentElement('afterbegin', header);
    }
    header.innerHTML = headerHtml;

    // Footer
    let footer = document.getElementById('site-footer');
    if (!footer) {
        footer = document.createElement('footer');
        footer.id = 'site-footer';
        footer.className = 'w-full block';
        document.body.insertAdjacentElement('beforeend', footer);
    }
    footer.innerHTML = footerHtml;

    setupNavToggle();
  };

  const setupNavToggle = () => {
    const navToggle = document.getElementById('navToggle');
    const mobileNav = document.getElementById('mobile-nav');
    const toggleIconPath = navToggle ? navToggle.querySelector('path') : null;
    
    if (navToggle && mobileNav) {
      navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !expanded);
        if (!expanded) {
          mobileNav.classList.remove('hidden');
          mobileNav.classList.add('flex');
          if (toggleIconPath) toggleIconPath.setAttribute('d', 'M6 18L18 6M6 6l12 12');
        } else {
          mobileNav.classList.add('hidden');
          mobileNav.classList.remove('flex');
          if (toggleIconPath) toggleIconPath.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !mobileNav.classList.contains('hidden')) {
          navToggle.setAttribute('aria-expanded', 'false');
          mobileNav.classList.add('hidden');
          mobileNav.classList.remove('flex');
          if (toggleIconPath) toggleIconPath.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
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
