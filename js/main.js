document.addEventListener('DOMContentLoaded', () => {
    const statNumbers = document.querySelectorAll('.stat-card__number');
    let hasCounted = false;

    const animateCounters = () => {
        statNumbers.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    let val = Math.ceil(current);
                    if (target === 12) stat.innerText = val + 'M+';
                    else if (target === 8) stat.innerText = val + '%+';
                    else stat.innerText = val + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    if (target === 12) stat.innerText = '12M+';
                    else if (target === 8) stat.innerText = '8%+';
                    else stat.innerText = target + '+';
                }
            };
            
            updateCounter();
        });
    };

    const statsSection = document.getElementById('stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasCounted) {
                animateCounters();
                hasCounted = true;
            }
        }, { threshold: 0.4 });
        
        statsObserver.observe(statsSection);
    }
});