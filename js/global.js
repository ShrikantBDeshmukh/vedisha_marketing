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
                // Optimization: stop observing once visible to save main-thread resources
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
    // Optimization: Use transform: scaleX() for compositor-only updates,
    // requestAnimationFrame for throttling, and ResizeObserver for height caching.
    const injectProgressBar = () => {
        const progressContainer = document.createElement('div');
        // Pointer-events: none ensures it doesn't block clicks; will-change hints optimization
        progressContainer.style = 'position:fixed; top:0; left:0; width:100%; height:3px; z-index:2000; background:transparent; pointer-events:none; will-change:transform;';

        const progressBar = document.createElement('div');
        // Using transform-origin: left for correct scale direction
        progressBar.style = 'width:100%; height:100%; background:var(--c-accent); transform: scaleX(0); transform-origin: left; transition: transform 0.1s linear;';

        progressContainer.appendChild(progressBar);
        document.body.appendChild(progressContainer);

        let cachedScrollHeight = 0;
        let ticking = false;

        const updateCachedDimensions = () => {
            cachedScrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        };

        // Efficiently track height changes without polling
        if (window.ResizeObserver) {
            const ro = new ResizeObserver(updateCachedDimensions);
            ro.observe(document.documentElement);
            ro.observe(document.body);
        } else {
            window.addEventListener('resize', updateCachedDimensions, { passive: true });
        }
        updateCachedDimensions();

        const updateProgress = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const progress = cachedScrollHeight > 0 ? scrollTop / cachedScrollHeight : 0;
            // scaleX is more performant than width as it avoids layout/reflow
            progressBar.style.transform = `scaleX(${Math.min(1, progress)})`;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateProgress);
                ticking = true;
            }
        }, { passive: true });
    };
    injectProgressBar();

});
