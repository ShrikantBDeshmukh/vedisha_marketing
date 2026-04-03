document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const edgeCards = document.querySelectorAll('.edge-card');
    const trustedSection = document.querySelector('.trusted-section');

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('edge-card')) {
                    // Stagger logic could be applied here by index, but we'll just add the class
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                } else if (entry.target.classList.contains('trusted-section')) {
                    entry.target.classList.add('scrolled');
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    edgeCards.forEach(card => scrollObserver.observe(card));
    if (trustedSection) {
        scrollObserver.observe(trustedSection);
    }
});
