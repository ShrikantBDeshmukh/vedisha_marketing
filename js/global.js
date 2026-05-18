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
                // Performance Optimization: Unobserve after animation is triggered
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
        // Performance: Added pointer-events: none to avoid hit-testing overhead
        progressContainer.style = 'position:fixed; top:0; left:0; width:100%; height:3px; z-index:2000; background:transparent; pointer-events:none;';

        const progressBar = document.createElement('div');
        // Performance: Using transform: scaleX(0) and transform-origin: left to avoid layout reflows
        // Added will-change: transform to promote to compositor layer
        progressBar.style = 'width:100%; height:100%; background:var(--c-accent); transform: scaleX(0); transform-origin: left; will-change: transform; transition: transform 0.1s;';
        progressContainer.appendChild(progressBar);
        document.body.appendChild(progressContainer);

        let scrollHeight = 0;
        let ticking = false;

        const updateScrollHeight = () => {
            scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        };

        // Initialize scroll height
        updateScrollHeight();

        // Performance: Use ResizeObserver if available to accurately track document height changes
        if (window.ResizeObserver) {
            const ro = new ResizeObserver(updateScrollHeight);
            ro.observe(document.body);
        } else {
            // Fallback for older browsers
            window.addEventListener('resize', updateScrollHeight, { passive: true });
        }

        const updateProgress = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) : 0;
            // Clamping progress between 0 and 1
            const clampedProgress = Math.max(0, Math.min(1, progress));
            progressBar.style.transform = `scaleX(${clampedProgress})`;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                // Performance: Throttle scroll updates using requestAnimationFrame
                requestAnimationFrame(updateProgress);
                ticking = true;
            }
        }, { passive: true });
    };
    injectProgressBar();

});
