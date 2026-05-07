document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // 1. Motion UI: Intersection Observer for fade-up effects
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Performance: unobserve after showing
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply to various components
    const elementsToAnimate = document.querySelectorAll('.glass-card, .service-item, .metric-card, .work-item, .section-header, h1, h2, .fade-up');
    elementsToAnimate.forEach((el, index) => {
        if (!el.classList.contains('fade-up')) {
            el.classList.add('fade-up');
        }
        el.style.transitionDelay = `${(index % 4) * 0.1}s`;
        observer.observe(el);
    });

    // 2. Real-time Form Validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.checkValidity()) {
                    input.classList.remove('invalid');
                    input.classList.add('valid');
                } else {
                    input.classList.remove('valid');
                    input.classList.add('invalid');
                }
            });
        });
    });

    // 3. UI Enhancements: Progress Bar & Back to Top
    const injectUIExtras = () => {
        // Reading Progress Bar
        const progressContainer = document.createElement('div');
        progressContainer.style = 'position:fixed; top:0; left:0; width:100%; height:3px; z-index:2000; background:transparent; pointer-events:none;';
        const progressBar = document.createElement('div');
        progressBar.style = 'width:0%; height:100%; background:var(--c-accent, #0d9488); transition: width 0.1s;';
        progressContainer.appendChild(progressBar);
        document.body.appendChild(progressContainer);

        // Back to Top Button
        const backToTop = document.createElement('button');
        backToTop.id = 'backToTop';
        backToTop.setAttribute('aria-label', 'Back to top');
        backToTop.className = 'fixed bottom-8 right-8 z-50 p-3 rounded-full bg-slate-900 text-white shadow-lg transition-all duration-300 opacity-0 invisible translate-y-4 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2';
        backToTop.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>';
        document.body.appendChild(backToTop);

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Optimized Scroll Handling with requestAnimationFrame
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollTop = window.scrollY || document.documentElement.scrollTop;
                    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

                    // Update Progress Bar
                    if (scrollHeight > 0) {
                        const progress = (scrollTop / scrollHeight) * 100;
                        progressBar.style.width = progress + '%';
                    }

                    // Update Back to Top Visibility
                    if (scrollTop > 500) {
                        backToTop.classList.remove('opacity-0', 'invisible', 'translate-y-4');
                        backToTop.classList.add('opacity-100', 'visible', 'translate-y-0');
                    } else {
                        backToTop.classList.add('opacity-0', 'invisible', 'translate-y-4');
                        backToTop.classList.remove('opacity-100', 'visible', 'translate-y-0');
                    }

                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    };

    injectUIExtras();
});
