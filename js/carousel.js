document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.portfolio__carousel');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('.portfolio__track');
        const btnPrev = carousel.querySelector('.carousel-btn--prev');
        const btnNext = carousel.querySelector('.carousel-btn--next');

        if (!track || !btnPrev || !btnNext) return;

        // Calculates exact width of 1 card + gap
        const getStepAmount = () => {
            const card = track.querySelector('.card-reel');
            if (!card) return 300;
            
            const cardWidth = card.getBoundingClientRect().width;
            const gap = parseFloat(window.getComputedStyle(track).gap) || 16;
            
            return cardWidth + gap; // Advances exactly 1 position (e.g., 1,2,3,4 -> 2,3,4,5)
        };

        btnNext.addEventListener('click', () => {
            track.scrollBy({ left: getStepAmount(), behavior: 'smooth' });
        });

        btnPrev.addEventListener('click', () => {
            track.scrollBy({ left: -getStepAmount(), behavior: 'smooth' });
        });

        // Update button visual states
        const updateButtons = () => {
            const maxScroll = track.scrollWidth - track.clientWidth;
            
            // Disable Prev button if at the start
            btnPrev.style.opacity = track.scrollLeft <= 5 ? '0.3' : '1';
            btnPrev.style.pointerEvents = track.scrollLeft <= 5 ? 'none' : 'auto';
            
            // Disable Next button if at the end
            btnNext.style.opacity = track.scrollLeft >= maxScroll - 5 ? '0.3' : '1';
            btnNext.style.pointerEvents = track.scrollLeft >= maxScroll - 5 ? 'none' : 'auto';
        };

        track.addEventListener('scroll', updateButtons);
        window.addEventListener('resize', updateButtons);
        updateButtons();
    });
});