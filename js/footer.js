/* =========================================
   GLOBAL FOOTER – Vedisha Marketing
   JavaScript: Back-to-top & Footer Loader
   ========================================= */

(function () {
  'use strict';

  /* ── Back-to-Top Button ── */
  const backToTop = document.getElementById('backToTop');

  if (backToTop) {
    const SCROLL_THRESHOLD = 400;

    function toggleBackToTop() {
      if (window.scrollY > SCROLL_THRESHOLD) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }

    window.addEventListener('scroll', toggleBackToTop, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Initial check in case the page is already scrolled
    toggleBackToTop();
  }

  /* ── Entrance Animation (Intersection Observer) ── */
  const footer = document.getElementById('site-footer');

  if (footer && 'IntersectionObserver' in window) {
    const animatableElements = footer.querySelectorAll(
      '.footer-brand, .footer-nav-group, .footer-copyright, .footer-legal, .footer-social'
    );

    // Apply initial hidden state
    animatableElements.forEach(function (el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease ' + (i * 0.08) + 's, transform 0.6s ease ' + (i * 0.08) + 's';
    });

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animatableElements.forEach(function (el) {
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);
  }

  /* ── Active Link Highlighting ── */
  const currentPath = window.location.pathname;
  const footerLinks = document.querySelectorAll('.footer-nav-list a');

  footerLinks.forEach(function (link) {
    if (link.getAttribute('href') === currentPath) {
      link.style.color = 'var(--footer-accent)';
      link.style.fontWeight = '500';
    }
  });
})();
