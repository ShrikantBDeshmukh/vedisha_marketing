document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Filter Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const clientLogos = document.querySelectorAll('.client-logo');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            // Filter logos
            clientLogos.forEach(logo => {
                // Determine if logo matches filter
                if (filterValue === 'all' || logo.getAttribute('data-category').includes(filterValue)) {
                    logo.classList.remove('hidden-category');
                    // Small delay to trigger reflow and ensure transition happens
                    setTimeout(() => {
                        logo.classList.add('visible');
                    }, 50);
                } else {
                    logo.classList.remove('visible');
                    // Wait for transition end before actually hiding display
                    setTimeout(() => {
                        if (!logo.classList.contains('visible')) {
                            logo.classList.add('hidden-category');
                        }
                    }, 400); // Matches CSS transition duration
                }
            });
        });
    });

    // Scroll Fade-in Logic
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered delay for grid items
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 50);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all logos and testimonials that are initially in DOM (ignoring filtered out ones)
    const animatableElements = document.querySelectorAll('.client-logo, .testimonial-block');
    animatableElements.forEach(el => scrollObserver.observe(el));
});
