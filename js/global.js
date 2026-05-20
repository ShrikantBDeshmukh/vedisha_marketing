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
                // Performance: Stop observing once visible to save main thread cycles
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
        // Performance: Add pointer-events:none to ensure it doesn't block interactions
        progressContainer.style = 'position:fixed; top:0; left:0; width:100%; height:3px; z-index:2000; background:transparent; pointer-events:none;';
        const progressBar = document.createElement('div');
        // Performance: Use transform: scaleX(0) and transform-origin for compositor-only animations
        // and will-change: transform to hint the browser for GPU acceleration
        progressBar.style = 'width:100%; height:100%; background:var(--c-accent); transform: scaleX(0); transform-origin: left; transition: transform 0.1s; will-change: transform;';
        progressContainer.appendChild(progressBar);
        document.body.appendChild(progressContainer);

        let scrollHeight = 0;
        const updateScrollHeight = () => {
            scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        };
        updateScrollHeight();

        // Performance: Use ResizeObserver to cache scrollHeight and prevent layout thrashing
        // during scroll events. Fallback to window resize for older browsers.
        if (window.ResizeObserver) {
            const ro = new ResizeObserver(updateScrollHeight);
            ro.observe(document.body);
        } else {
            window.addEventListener('resize', updateScrollHeight, { passive: true });
        }

        let ticking = false;
        const updateProgress = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
            // Performance: Using transform instead of width avoids layout reflows and moves work to compositor
            progressBar.style.transform = `scaleX(${Math.min(progress, 1)})`;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                // Performance: Throttling with requestAnimationFrame to match display refresh rate
                window.requestAnimationFrame(updateProgress);
                ticking = true;
            }
        }, { passive: true });
    };
    injectProgressBar();

});
