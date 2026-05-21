document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /**
     * 1. Motion UI: Intersection Observer for fade-up effects
     * Optimization: Unobserve elements once visible to reduce main-thread work.
     */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Performance: Stop observing once the element is visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

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

    /**
     * 3. Fluid Progress Bar (Reading Progress)
     * Optimization: Use transform: scaleX() for compositor-only updates and rAF throttling.
     * Optimization: Cache scrollHeight via ResizeObserver to avoid layout thrashing.
     */
    const injectProgressBar = () => {
        const progressContainer = document.createElement('div');
        // Performance: pointer-events: none prevents the bar from interfering with clicks
        progressContainer.style = 'position:fixed; top:0; left:0; width:100%; height:3px; z-index:2000; background:transparent; pointer-events:none;';

        const progressBar = document.createElement('div');
        // Performance: Use scaleX and transform-origin for GPU acceleration
        progressBar.style = 'width:100%; height:100%; background:var(--c-accent); transform:scaleX(0); transform-origin:left; will-change:transform; transition: transform 0.1s;';

        progressContainer.appendChild(progressBar);
        document.body.appendChild(progressContainer);

        let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        // Update scrollHeight only when document height changes
        if (window.ResizeObserver) {
            new ResizeObserver(() => {
                scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            }).observe(document.documentElement);
        }

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollTop = window.scrollY || document.documentElement.scrollTop;
                    const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
                    progressBar.style.transform = `scaleX(${progress})`;
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    };

    injectProgressBar();
});
