document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            // Check if this card is currently expanded
            const isExpanded = card.classList.contains('expanded');

            // Optional: Close all other cards before opening this one (accordion style)
            // Remove the next 3 lines if you want cards to open independently without closing others
            serviceCards.forEach(c => {
                c.classList.remove('expanded');
            });

            // Toggle logic
            if (!isExpanded) {
                card.classList.add('expanded');
            }
        });
    });
});
