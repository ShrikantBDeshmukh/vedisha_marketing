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
                // Performance optimization: Stop observing once element is visible
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
        // Performance: Add pointer-events: none to avoid interference with clicks
        progressContainer.style = 'position:fixed; top:0; left:0; width:100%; height:3px; z-index:2000; background:transparent; pointer-events:none;';

        const progressBar = document.createElement('div');
        // Performance: Use transform instead of width to avoid layout reflows
        // Using scaleX(0) and transform-origin: left for high-performance animation
        progressBar.style = 'width:100%; height:100%; background:var(--c-accent); transition: transform 0.1s; transform: scaleX(0); transform-origin: left;';

        progressContainer.appendChild(progressBar);
        document.body.appendChild(progressContainer);

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                // Performance: Throttle scroll event using requestAnimationFrame
                window.requestAnimationFrame(() => {
                    const scrollTop = window.scrollY || document.documentElement.scrollTop;
                    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) : 0;

                    // Update scaleX instead of width
                    progressBar.style.transform = `scaleX(${progress})`;
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    };
    injectProgressBar();

});
