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
                // Optional: keep observing if you want it to re-animate
                // observer.unobserve(entry.target);
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

    // 2. Real-time Form Validation (if forms exist)
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

    // 3. Fluid Progress Bar (Reading Progress)
    const injectProgressBar = () => {
        const progressContainer = document.createElement('div');
        progressContainer.style = 'position:fixed; top:0; left:0; width:100%; height:3px; z-index:2000; background:transparent;';
        const progressBar = document.createElement('div');
        progressBar.style = 'width:0%; height:100%; background:var(--c-accent); transition: width 0.1s;';
        progressContainer.appendChild(progressBar);
        document.body.appendChild(progressContainer);

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = progress + '%';
        }, { passive: true });
    };
    injectProgressBar();

    // 4. Back to Top Button
    const injectBackToTop = () => {
        if (document.getElementById('backToTop')) return;

        const btn = document.createElement('button');
        btn.id = 'backToTop';
        btn.setAttribute('aria-label', 'Back to top');
        // Tailwind classes for styling & animation
        btn.className = 'fixed bottom-8 right-8 z-[100] p-3 bg-teal-600 text-white rounded-full shadow-lg opacity-0 translate-y-10 invisible transition-all duration-300 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2';
        btn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>`;

        document.body.appendChild(btn);

        // Click to scroll top
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Visibility on scroll
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (window.scrollY > 500) {
                        btn.classList.remove('opacity-0', 'translate-y-10', 'invisible');
                        btn.classList.add('opacity-100', 'translate-y-0', 'visible');
                    } else {
                        btn.classList.add('opacity-0', 'translate-y-10', 'invisible');
                        btn.classList.remove('opacity-100', 'translate-y-0', 'visible');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    };
    injectBackToTop();

});
