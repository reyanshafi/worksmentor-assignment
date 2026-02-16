// Component Loader
async function loadComponent(elementId, componentPath) {
    const el = document.getElementById(elementId);
    if (!el) return;

    try {
        const response = await fetch(componentPath);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const html = await response.text();
        el.innerHTML = html;

        // Re-initialize mobile menu if navbar loads
        if (elementId === 'navbar-container') {
            initializeMobileMenu();
        }
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
    }
}

// Mobile Menu
function initializeMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.nav-links-mobile');
    const hamburger = document.querySelector('.hamburger');

    if (btn && menu && hamburger) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
            menu.classList.toggle('flex');
            hamburger.classList.toggle('active');
        });
    }
}

// Smooth Scroll
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

// Scroll Animator Class
class ScrollAnimator {
    constructor() {
        this.observer = null;
        this.options = {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    this.observer.unobserve(entry.target); // Once animated, stop observing
                }
            });
        }, this.options);
        this.observe();
    }

    observe() {
        // Find all elements that should animate and aren't already animated
        const elements = document.querySelectorAll(
            '.fade-in:not(.animate-in), .slide-up:not(.animate-in), .slide-left:not(.animate-in), .slide-right:not(.animate-in), .scale-in:not(.animate-in), .stagger-item:not(.animate-in)'
        );

        elements.forEach(el => {
            this.observer.observe(el);
        });
    }

    refresh() {
        this.observe();
    }
}

// Stagger Animation Setup
function initializeStaggerAnimation() {
    const containers = document.querySelectorAll('.stagger-container');
    containers.forEach(container => {
        const items = container.querySelectorAll('.stagger-item');
        items.forEach((item, index) => {
            item.style.transitionDelay = `${index * 80}ms`; // Slightly faster stagger
        });
    });
}

// Parallax
function initializeParallax() {
    const elements = document.querySelectorAll('.parallax');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        elements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }, { passive: true });
}

// Navbar Scroll Effect
function initializeNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });
}

// Counter Logic
function animateCounter(el) {
    const target = parseInt(el.dataset.target || el.textContent.replace(/[^0-9]/g, ''));
    if (isNaN(target)) return;
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const prefix = el.textContent.includes('₹') ? '₹' : '';
    const suffix = el.textContent.includes('+') ? '+' : (el.textContent.includes('Cr') ? 'Cr+' : (el.textContent.includes('%') ? '%' : ''));

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            el.textContent = prefix + target + suffix;
            clearInterval(timer);
        } else {
            el.textContent = prefix + Math.floor(current) + suffix;
        }
    }, 16);
}

function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
}

// Back to Top
function initializeBackToTop() {
    let btn = document.getElementById('backToTop');
    if (!btn) {
        btn = document.createElement('button');
        btn.id = 'backToTop';
        btn.className = 'fixed bottom-8 right-8 z-[60] w-12 h-12 bg-white text-primary border border-slate-200 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 opacity-0 invisible hover:bg-primary hover:text-white transform translate-y-4';
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7" /></svg>`;
        document.body.appendChild(btn);
    }

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            btn.classList.remove('opacity-0', 'invisible', 'translate-y-4');
            btn.classList.add('opacity-100', 'visible', 'translate-y-0');
        } else {
            btn.classList.add('opacity-0', 'invisible', 'translate-y-4');
            btn.classList.remove('opacity-100', 'visible', 'translate-y-0');
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Main Init Sequence
document.addEventListener('DOMContentLoaded', async () => {
    const components = [
        { id: 'navbar-container', path: 'components/navbar.html' },
        { id: 'hero-container', path: 'components/hero.html' },
        { id: 'stats-container', path: 'components/stats.html' },
        { id: 'categories-container', path: 'components/categories.html' },
        { id: 'latest-projects-container', path: 'components/latest-projects.html' },
        { id: 'features-container', path: 'components/features.html' },
        { id: 'footer-container', path: 'components/footer.html' },
        { id: 'floating-cta-container', path: 'components/floating-cta.html' }
    ];

    const animator = new ScrollAnimator();
    window.refreshAnimations = () => animator.refresh();

    for (const comp of components) {
        await loadComponent(comp.id, comp.path);
        // Slight delay to ensure DOM update is registered before refreshing animations
        await new Promise(r => setTimeout(r, 50));
        window.refreshAnimations();
        initializeStaggerAnimation(); // Re-initialize stagger delays for new items
    }

    initializeSmoothScroll();
    initializeParallax();
    initializeNavbarScroll();
    initializeCounters();
    initializeBackToTop();
});
