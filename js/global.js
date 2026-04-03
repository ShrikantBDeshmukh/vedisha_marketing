document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // 1. Inject Noise Overlay
    const noise = document.createElement('div');
    noise.classList.add('noise-overlay');
    document.body.appendChild(noise);

    // 2. Inject Progress Bar
    const progressContainer = document.createElement('div');
    progressContainer.classList.add('reading-progress-container');
    const progressBar = document.createElement('div');
    progressBar.classList.add('reading-progress-bar');
    progressContainer.appendChild(progressBar);
    document.body.appendChild(progressContainer);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = Math.min(progress, 100) + '%';
    });
});
