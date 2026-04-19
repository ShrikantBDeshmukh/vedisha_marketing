document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const serviceCards = document.querySelectorAll('.service-card');

    const toggleCard = (card) => {
        const isExpanded = card.classList.contains('expanded');

        // Close all other cards (accordion style)
        serviceCards.forEach(c => {
            if (c !== card) {
                c.classList.remove('expanded');
                c.setAttribute('aria-expanded', 'false');
            }
        });

        // Toggle the clicked card
        if (isExpanded) {
            card.classList.remove('expanded');
            card.setAttribute('aria-expanded', 'false');
        } else {
            card.classList.add('expanded');
            card.setAttribute('aria-expanded', 'true');
        }
    };

    serviceCards.forEach(card => {
        card.addEventListener('click', () => toggleCard(card));

        // Keyboard accessibility: handle Enter and Space keys
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault(); // Prevent page scroll on Space
                toggleCard(card);
            }
        });
    });
});
