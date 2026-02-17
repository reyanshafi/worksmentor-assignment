// IRCTC 2.0 - Animation Trigger Logic

document.addEventListener('DOMContentLoaded', () => {

    // Intersection Observer for staggered entries
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stagger-container')) {
                    entry.target.classList.add('animate-stagger');
                } else {
                    entry.target.classList.add('animate-in'); // Fallback
                }
                // Optional: stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe standard containers
    const containers = document.querySelectorAll('.stagger-container');
    containers.forEach(container => observer.observe(container));

    // Special handling for the sidebar
    const sidebar = document.querySelector('.lg\\:col-span-1');
    if (sidebar) {
        observer.observe(sidebar);
    }
});
