document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const serviceCards = document.querySelectorAll('.service-card');

    const toggleCard = (card, event) => {
        // Prevent toggle if a link inside the card was clicked
        if (event && event.target.closest('a')) {
            return;
        }

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
        card.addEventListener('click', (e) => toggleCard(card, e));

        // Keyboard accessibility: handle Enter and Space keys
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                // If it's a link, let the default behavior happen
                if (e.target.closest('a')) return;

                e.preventDefault(); // Prevent page scroll on Space
                toggleCard(card, e);
            }
        });
    });
});
