document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const serviceCards = document.querySelectorAll('.service-card');

    const toggleCard = (card) => {
        const isExpanded = card.classList.contains('is-expanded');

        // Close all other cards (accordion style)
        serviceCards.forEach(c => {
            if (c !== card) {
                c.classList.remove('is-expanded');
                c.setAttribute('aria-expanded', 'false');
            }
        });

        // Toggle the clicked card
        if (isExpanded) {
            card.classList.remove('is-expanded');
            card.setAttribute('aria-expanded', 'false');
        } else {
            card.classList.add('is-expanded');
            card.setAttribute('aria-expanded', 'true');
        }
    };

    serviceCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevent toggling if a link is clicked
            if (e.target.closest('a')) return;
            toggleCard(card);
        });

        // Keyboard accessibility: handle Enter and Space keys
        card.addEventListener('keydown', (e) => {
            // If the event target is a link within the card, don't trigger toggle
            if (e.target.closest('a')) return;

            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault(); // Prevent page scroll on Space
                toggleCard(card);
            }
        });
    });
});
