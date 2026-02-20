// Mobile menu toggle + Theme toggle
document.addEventListener('DOMContentLoaded', function() {

    // ---- Sidebar fade on scroll (home page only) ----
    const sidebar = document.getElementById('homeSidebar');
    if (sidebar) {
        const fadeStart = window.innerHeight * 0.25;
        const fadeEnd   = window.innerHeight * 0.85;

        function updateSidebar() {
            const scrolled = window.pageYOffset;
            if (scrolled <= fadeStart) {
                sidebar.style.opacity   = '1';
                sidebar.style.transform = 'translateX(0)';
            } else if (scrolled >= fadeEnd) {
                sidebar.style.opacity   = '0';
                sidebar.style.transform = 'translateX(-100%)';
            } else {
                const progress = (scrolled - fadeStart) / (fadeEnd - fadeStart);
                sidebar.style.opacity   = (1 - progress).toString();
                sidebar.style.transform = `translateX(${-progress * 100}%)`;
            }
        }

        window.addEventListener('scroll', updateSidebar, { passive: true });
        updateSidebar();
    }

    // ---- Mobile menu ----
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(event) {
            event.stopPropagation();
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.navbar')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');

        // Check for saved theme preference or default to dark mode
        const currentTheme = localStorage.getItem('theme') || 'dark';
        htmlElement.setAttribute('data-theme', currentTheme);
        updateThemeIcon(currentTheme);

        themeToggle.addEventListener('click', function(event) {
            event.stopPropagation();
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });

        function updateThemeIcon(theme) {
            if (!themeIcon) return;
            themeIcon.classList.toggle('fa-sun', theme === 'dark');
            themeIcon.classList.toggle('fa-moon', theme !== 'dark');
        }
    }
});
