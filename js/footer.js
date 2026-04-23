(function () {
  'use strict';

  const existing = document.querySelector('.site-footer');
  // If it already exists and has content, we might not want to overwrite it
  // unless we want "auto-updating" from JS.
  // The user wants a shared, auto-updating footer.

  const path = (window.location.pathname || '').toLowerCase();
  const inInsightsFolder = path.includes('/insights/');
  const base = inInsightsFolder ? '../' : '';

  const footerHtml = `
  <div class="bg-white border-t border-slate-200 pt-16 pb-8 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 pb-12 border-b border-slate-100">
        <div>
          <h4 class="font-bold text-slate-900 mb-4 uppercase tracking-wider text-[10px]">Waluj MIDC Hub</h4>
          <ul class="space-y-2 text-xs text-slate-500 font-medium">
            <li><a href="${base}web-development-in-waluj-midc.html" class="hover:text-blue-600 transition">Web Development</a></li>
            <li><a href="${base}seo-services-in-waluj-midc.html" class="hover:text-blue-600 transition">SEO Services</a></li>
            <li><a href="${base}digital-marketing-in-waluj-midc.html" class="hover:text-blue-600 transition">Digital Marketing</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-slate-900 mb-4 uppercase tracking-wider text-[10px]">Shendra MIDC Hub</h4>
          <ul class="space-y-2 text-xs text-slate-500 font-medium">
            <li><a href="${base}web-development-in-shendra-midc.html" class="hover:text-blue-600 transition">Web Development</a></li>
            <li><a href="${base}seo-services-in-shendra-midc.html" class="hover:text-blue-600 transition">SEO Services</a></li>
            <li><a href="${base}digital-marketing-in-shendra-midc.html" class="hover:text-blue-600 transition">Digital Marketing</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-slate-900 mb-4 uppercase tracking-wider text-[10px]">CIDCO Local Hub</h4>
          <ul class="space-y-2 text-xs text-slate-500 font-medium">
            <li><a href="${base}web-development-in-cidco.html" class="hover:text-blue-600 transition">Web Development</a></li>
            <li><a href="${base}seo-services-in-cidco.html" class="hover:text-blue-600 transition">SEO Services</a></li>
            <li><a href="${base}digital-marketing-in-cidco.html" class="hover:text-blue-600 transition">Digital Marketing</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-slate-900 mb-4 uppercase tracking-wider text-[10px]">Chikalthana Hub</h4>
          <ul class="space-y-2 text-xs text-slate-500 font-medium">
            <li><a href="${base}web-development-in-chikalthana.html" class="hover:text-blue-600 transition">Web Development</a></li>
            <li><a href="${base}seo-services-in-chikalthana.html" class="hover:text-blue-600 transition">SEO Services</a></li>
            <li><a href="${base}digital-marketing-in-chikalthana.html" class="hover:text-blue-600 transition">Digital Marketing</a></li>
          </ul>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-12">
        <div class="lg:col-span-2">
          <a href="${base}index.html" class="flex items-center gap-3 text-slate-900 font-extrabold text-2xl tracking-tight mb-4" aria-label="Vedisha Marketing Home">
            <span class="bg-slate-900 text-white w-10 h-10 flex items-center justify-center rounded-xl shadow-md" aria-hidden="true">V</span>
            <span>Vedisha Marketing</span>
          </a>
          <p class="text-slate-500 text-sm leading-relaxed max-w-sm">
            Crafted with <a href="https://codwebsolutions.com" target="_blank" rel="noopener noreferrer" class="text-teal-600 hover:text-teal-700 font-semibold">Codweb Solutions</a> —
            built with care for clarity, speed, and trust in Chhatrapati Sambhajinagar.
          </p>
        </div>
        <div>
          <h4 class="font-bold text-slate-900 mb-4 uppercase tracking-wider text-sm">Company</h4>
          <ul class="space-y-3 text-slate-600 font-medium">
            <li><a href="${base}index.html" class="hover:text-teal-600 transition">Home</a></li>
            <li><a href="${base}about.html" class="hover:text-teal-600 transition">About Us</a></li>
            <li><a href="${base}services.html" class="hover:text-teal-600 transition">Services</a></li>
            <li><a href="${base}work.html" class="hover:text-teal-600 transition">Portfolio</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-slate-900 mb-4 uppercase tracking-wider text-sm">Services</h4>
          <ul class="space-y-3 text-slate-600 font-medium">
            <li><a href="${base}meta-google-ads-management.html" class="hover:text-teal-600 transition">Paid Ads</a></li>
            <li><a href="${base}local-lead-combo.html" class="hover:text-teal-600 transition">Local Lead Combo</a></li>
            <li><a href="${base}static-website-seo-launch.html" class="hover:text-teal-600 transition">SEO Launch</a></li>
            <li><a href="${base}content-geo.html" class="hover:text-teal-600 transition">Geo Content Hubs</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-slate-900 mb-4 uppercase tracking-wider text-sm">Get in Touch</h4>
          <ul class="space-y-3 text-slate-600 font-medium">
            <li><a href="tel:+919404124875" class="hover:text-teal-600 transition">+91 94041 24875</a></li>
            <li><a href="https://wa.me/919404124875" class="hover:text-emerald-600 transition">WhatsApp Support</a></li>
            <li><a href="mailto:vedishamarketing@gmail.com" class="hover:text-teal-600 transition">vedishamarketing@gmail.com</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-sm text-slate-500">&copy; 2026 Vedisha Marketing. All rights reserved.</p>
        <ul class="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-medium" aria-label="Legal links">
          <li><a href="${base}privacy-policy.html" class="hover:text-slate-900">Privacy Policy</a></li>
          <li><a href="${base}terms-of-service.html" class="hover:text-slate-900">Terms of Service</a></li>
        </ul>
      </div>
    </div>
  </div>
  <button class="fixed bottom-6 right-6 p-3 bg-slate-900 text-white rounded-full shadow-lg opacity-0 pointer-events-none transition-opacity duration-300 hover:bg-slate-800" id="backToTop" aria-label="Back to top" style="z-index:999;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><polyline points="18 15 12 9 6 15"/></svg></button>
  `;

  let footer = existing;
  if (!footer) {
    footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.id = 'site-footer';
    document.body.appendChild(footer);
  }
  footer.innerHTML = footerHtml;

  /* ── Back-to-Top Button Logic ── */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    const SCROLL_THRESHOLD = 400;
    const toggleBackToTop = () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        backToTop.classList.remove('opacity-0', 'pointer-events-none');
        backToTop.classList.add('opacity-100', 'pointer-events-auto');
      } else {
        backToTop.classList.add('opacity-0', 'pointer-events-none');
        backToTop.classList.remove('opacity-100', 'pointer-events-auto');
      }
    };
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    toggleBackToTop();
  }

})();
