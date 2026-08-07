document.addEventListener("DOMContentLoaded", () => {
    const videos = document.querySelectorAll(".card-reel__thumb");
    const isTouchDevice = window.matchMedia("(hover: none)").matches;

    if (isTouchDevice) {
        // MOBILE: Tap video to play / Tap again to pause
        videos.forEach((video) => {
            video.addEventListener("click", () => {
                if (video.paused) {
                    // Pause all other videos so only 1 plays at a time (prevents lag)
                    videos.forEach((v) => { if (v !== video) v.pause(); });
                    video.muted = true;
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            });
        });
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
