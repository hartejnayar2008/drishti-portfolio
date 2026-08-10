document.addEventListener("DOMContentLoaded", () => {
    const videos = document.querySelectorAll(".card-reel__thumb");
    const isTouchDevice = window.matchMedia("(hover: none)").matches;

    if (isTouchDevice) {
        // MOBILE: Auto-play whichever video is currently scrolled into view
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.6 // Video plays when 60% of it is visible on screen
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const video = entry.target;
                if (entry.isIntersecting) {
                    video.muted = true;
                    video.play().catch(() => {
                        // Autoplay blocked or prevented by browser power-saver mode
                    });
                } else {
                    video.pause();
                }
            });
        }, observerOptions);

        videos.forEach((video) => observer.observe(video));

    } else {
        // DESKTOP: Hover to play / Mouse leave to pause
        videos.forEach((video) => {
            video.addEventListener("mouseenter", () => {
                video.muted = true;
                video.play().catch(() => {});
            });

            video.addEventListener("mouseleave", () => {
                video.pause();
            });
        });
    }
});
