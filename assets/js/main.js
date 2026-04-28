(function() {
    'use strict';

    // ---- Theme toggle ----
    var root = document.documentElement;
    var toggle = document.getElementById('themeToggle');
    var icon = document.getElementById('themeIcon');

    function syncIcon() {
        if (!icon) return;
        var current = root.getAttribute('data-theme');
        icon.textContent = current === 'dark' ? 'light_mode' : 'dark_mode';
    }
    syncIcon();

    if (toggle) {
        toggle.addEventListener('click', function() {
            var current = root.getAttribute('data-theme') || 'light';
            var next = current === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            try { localStorage.setItem('theme', next); } catch (e) {}
            syncIcon();
        });
    }

    // ---- Mobile menu ----
    var hamburger = document.getElementById('hamburger');
    var navMenu = document.getElementById('navMenu');

    function closeMenu() {
        if (!navMenu || !hamburger) return;
        navMenu.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
    }

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            var isOpen = navMenu.classList.toggle('is-open');
            hamburger.classList.toggle('is-open');
            hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        document.addEventListener('click', function(e) {
            if (!e.target.closest('.navbar')) closeMenu();
        });

        navMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', closeMenu);
        });
    }
})();
