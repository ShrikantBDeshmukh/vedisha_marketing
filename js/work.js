document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // 1. Filtering Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workCards = document.querySelectorAll('.work-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            workCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });

            // Re-calculate masonry layout after filtering
            setTimeout(resizeAllMasonryItems, 50);
        });
    });

    // 2. Simple Masonry Layout Logic using CSS Grid + JS span calculation
    const grid = document.querySelector('.masonry-grid');
    
    function resizeMasonryItem(item) {
        // Get the row height and gap from the grid via computed styles
        const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
        const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('gap'));
        
        // Calculate the height of the item's content
        // In our CSS, .work-card does not have a set height, we read its content bounding box
        const contentHeight = item.getBoundingClientRect().height;
        
        // Calculate how many rows this item needs to span
        const rowSpan = Math.ceil((contentHeight + rowGap) / (rowHeight + rowGap));
        
        // Set the grid-row-end property
        item.style.gridRowEnd = 'span ' + rowSpan;
    }

    function resizeAllMasonryItems() {
        if (!grid) return;
        workCards.forEach(card => {
            // Unset temporarily to measure natural height
            card.style.gridRowEnd = 'auto';
            if (!card.classList.contains('hidden')) {
                resizeMasonryItem(card);
            }
        });
    }

    // Run on load and resize
    window.addEventListener('load', resizeAllMasonryItems);
    window.addEventListener('resize', resizeAllMasonryItems);


    // 3. Modal Logic
    const modalOverlay = document.getElementById('caseModal');
    const modalClose = document.getElementById('modalClose');
    const openBtns = document.querySelectorAll('.view-case-btn');

    // DOM Elements inside modal to populate
    const mHero = document.getElementById('mHero');
    const mTitle = document.getElementById('mTitle');
    const mText = document.getElementById('mText');
    const mServices = document.getElementById('mServices');
    const mMetric1Label = document.getElementById('mMetric1Label');
    const mMetric1Val = document.getElementById('mMetric1Val');
    const mMetric2Label = document.getElementById('mMetric2Label');
    const mMetric2Val = document.getElementById('mMetric2Val');

    // Simple JSON database of projects embedded in JS for the static site
    const caseDatabase = {
        techgiant: {
            title: 'Positioning + Messaging Sprint (Sample)',
            heroImage: 'images/work-sample-1.jpg',
            text: `
                <p><strong>Context:</strong> You’re launching (or relaunching) and your message is “good” but not sharp. The homepage feels generic and ads don’t convert consistently.</p>
                <h4>What we do</h4>
                <p>We run a focused sprint to clarify positioning, define a messaging hierarchy, and package it into usable assets for your team.</p>
                <h4>Deliverables</h4>
                <ul>
                  <li>ICP + pains + jobs-to-be-done summary</li>
                  <li>Positioning statement + value props + proof points</li>
                  <li>Homepage narrative outline (sections + copy direction)</li>
                  <li>3 ad angles + hooks + example copy</li>
                </ul>
                <p><strong>Note:</strong> This is representative sample work (not a public client case study).</p>
            `,
            services: 'Positioning, Messaging, Homepage Narrative, Creative Angles',
            metric1Label: 'Typical timeline',
            metric1Val: '5–7 days',
            metric2Label: 'Primary output',
            metric2Val: 'Messaging kit'
        },
        fashion: {
            title: 'Reputation Response Kit (Sample)',
            heroImage: 'images/work-sample-2.jpg',
            text: `
                <p><strong>Context:</strong> A post, review, or news cycle starts accelerating. You need to respond without making it worse.</p>
                <h4>What we do</h4>
                <p>We build a response kit that keeps messaging consistent across internal teams and public channels.</p>
                <h4>Deliverables</h4>
                <ul>
                  <li>Holding statement + longer-form statement</li>
                  <li>FAQ for support + internal alignment notes</li>
                  <li>Escalation map + response owner checklist</li>
                  <li>Channel pack: social, email, press, website banner</li>
                </ul>
                <p><strong>Note:</strong> This is representative sample work (not a public client case study).</p>
            `,
            services: 'PR Messaging, Social Listening Setup, Response Playbooks',
            metric1Label: 'Typical timeline',
            metric1Val: '24–72h',
            metric2Label: 'Primary output',
            metric2Val: 'Response kit'
        },
        finance: {
            title: 'Creative Testing System (Sample)',
            heroImage: 'images/work-sample-3.jpg',
            text: `
                <p><strong>Context:</strong> You’re spending on ads but learning is slow. Creative feels random and landing pages aren’t aligned to each angle.</p>
                <h4>What we do</h4>
                <p>We set up a weekly test loop with structured hypotheses, reusable briefs, and consistent measurement so you can scale what works.</p>
                <h4>Deliverables</h4>
                <ul>
                  <li>Test plan (angles, hooks, offers) + success metrics</li>
                  <li>Creative brief templates + naming conventions</li>
                  <li>12 ad variations (example set) + iteration rules</li>
                  <li>2 landing page drafts aligned to top angles</li>
                </ul>
                <p><strong>Note:</strong> This is representative sample work (not a public client case study).</p>
            `,
            services: 'Performance Creative, Experiment Design, Landing Page Messaging',
            metric1Label: 'Cadence',
            metric1Val: 'Weekly',
            metric2Label: 'Primary output',
            metric2Val: 'Test system'
        }
    };

    function openModal(projectId) {
        const data = caseDatabase[projectId];
        if(!data) return;

        mTitle.textContent = data.title;
        mHero.style.backgroundImage = `url('${data.heroImage}')`;
        mText.innerHTML = data.text;
        mServices.textContent = data.services;
        mMetric1Label.textContent = data.metric1Label;
        mMetric1Val.textContent = data.metric1Val;
        mMetric2Label.textContent = data.metric2Label;
        mMetric2Val.textContent = data.metric2Val;

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    openBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            openModal(projectId);
        });
    });

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if(e.target === modalOverlay) closeModal();
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
});
