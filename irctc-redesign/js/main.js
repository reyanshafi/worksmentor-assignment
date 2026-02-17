// IRCTC 2.0 - Core Interactions

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');

    // Live Clock Update
    const timeDisplay = document.getElementById('current-time');
    if (timeDisplay) {
        setInterval(() => {
            const now = new Date();
            timeDisplay.textContent = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });
        }, 1000);
    }

    // Header scroll state
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled', 'py-1.5', 'shadow-lg');
            header.classList.remove('py-4');
        } else {
            header.classList.remove('scrolled', 'py-1.5', 'shadow-lg');
            header.classList.add('py-4');
        }
    });

    // --- Train Filtering & Sorting ---
    const trainCards = document.querySelectorAll('.train-card');
    const trainList = document.getElementById('train-list');
    const filterCheckboxes = document.querySelectorAll('.lg\\:col-span-1 input[type="checkbox"]');
    const sortButtons = document.querySelectorAll('.sort-btn');
    const budgetSlider = document.getElementById('budget-slider');
    const budgetValue = document.getElementById('budget-value');

    function updateTrainDisplay() {
        const maxBudget = budgetSlider ? parseInt(budgetSlider.value) : 3000;
        if (budgetValue) budgetValue.textContent = `₹${maxBudget.toLocaleString()}`;

        const activeFilters = Array.from(filterCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => {
                const label = cb.nextElementSibling.textContent.toLowerCase();
                if (label.includes('free cancellation')) return 'free-cancel';
                if (label.includes('hotels')) return 'hotels';
                if (label.includes('no prepayment')) return 'no-prepay';
                return '';
            });

        trainCards.forEach(card => {
            const cardType = card.dataset.type;
            const cardPrice = parseInt(card.dataset.price);
            const matchesFilter = activeFilters.length === 0 || activeFilters.includes(cardType);
            const matchesBudget = cardPrice <= maxBudget;

            if (matchesFilter && matchesBudget) {
                card.classList.remove('hidden');
                card.classList.add('stagger-item');
            } else {
                card.classList.add('hidden');
                card.classList.remove('stagger-item');
            }
        });

        // Re-trigger animations
        const container = document.getElementById('train-list');
        if (container) {
            container.classList.remove('animate-stagger');
            void container.offsetWidth; // Trigger reflow
            container.classList.add('animate-stagger');
        }
    }

    function sortTrains(criteria) {
        const cardsArray = Array.from(trainCards);
        cardsArray.sort((a, b) => {
            if (criteria === 'price') return parseInt(a.dataset.price) - parseInt(b.dataset.price);
            if (criteria === 'duration') return parseInt(a.dataset.duration) - parseInt(b.dataset.duration);
            if (criteria === 'premium') return parseInt(b.dataset.price) - parseInt(a.dataset.price);
            return 0;
        });

        cardsArray.forEach(card => trainList.appendChild(card));

        sortButtons.forEach(btn => {
            if (btn.dataset.sort === criteria) {
                btn.classList.add('bg-gray-100', 'text-slate-800');
                btn.classList.remove('text-gray-400');
            } else {
                btn.classList.remove('bg-gray-100', 'text-slate-800');
                btn.classList.add('text-gray-400');
            }
        });

        updateTrainDisplay();
    }

    filterCheckboxes.forEach(cb => cb.addEventListener('change', updateTrainDisplay));
    sortButtons.forEach(btn => btn.addEventListener('click', () => sortTrains(btn.dataset.sort)));
    if (budgetSlider) budgetSlider.addEventListener('input', updateTrainDisplay);

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');

    function toggleMenu(show) {
        if (show) {
            mobileMenu.classList.remove('translate-x-full');
            menuOverlay.classList.remove('opacity-0', 'invisible');
            menuOverlay.classList.add('opacity-100', 'visible');
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.add('translate-x-full');
            menuOverlay.classList.add('opacity-0', 'invisible');
            menuOverlay.classList.remove('opacity-100', 'visible');
            document.body.style.overflow = '';
        }
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', () => toggleMenu(true));
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', () => toggleMenu(false));
    if (menuOverlay) menuOverlay.addEventListener('click', () => toggleMenu(false));

    // Close menu on link click
    const mobileLinks = mobileMenu?.querySelectorAll('a');
    mobileLinks?.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // Mock Search Button interaction
    const searchBtn = document.querySelector('button.bg-\\[\\#FF6600\\]');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            searchBtn.classList.add('scale-75');
            setTimeout(() => searchBtn.classList.remove('scale-75'), 150);
            updateTrainDisplay();

            // On mobile, scroll to results after search
            if (window.innerWidth < 1024) {
                document.getElementById('train-results')?.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    // --- Back to Top Button ---
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.remove('opacity-0', 'invisible', 'translate-y-10');
                backToTopBtn.classList.add('opacity-100', 'visible', 'translate-y-0');
            } else {
                backToTopBtn.classList.add('opacity-0', 'invisible', 'translate-y-10');
                backToTopBtn.classList.remove('opacity-100', 'visible', 'translate-y-0');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
