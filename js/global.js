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
                // Performance: Stop observing once visible to reduce main-thread overhead
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
        // Performance: Ensure container doesn't intercept pointer events
        progressContainer.style = 'position:fixed; top:0; left:0; width:100%; height:3px; z-index:2000; background:transparent; pointer-events:none;';

        const progressBar = document.createElement('div');
        // Performance: Use transform: scaleX() instead of width to avoid layout reflows.
        // Moving updates to the compositor thread significantly improves scroll smoothness.
        progressBar.style = 'width:100%; height:100%; background:var(--c-accent); transform: scaleX(0); transform-origin: left; will-change: transform; transition: transform 0.1s linear;';

        progressContainer.appendChild(progressBar);
        document.body.appendChild(progressContainer);

        let ticking = false;

        const updateProgress = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

            if (scrollHeight > 0) {
                // Performance: Clamp progress between 0 and 1
                const progress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
                progressBar.style.transform = `scaleX(${progress})`;
            }

            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                // Performance: Throttle high-frequency scroll events using requestAnimationFrame
                window.requestAnimationFrame(updateProgress);
                ticking = true;
            }
        }, { passive: true });
    };
    injectProgressBar();

});
