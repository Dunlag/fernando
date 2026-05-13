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

            function applyTheme() {
                root.setAttribute('data-theme', next);
                try { localStorage.setItem('theme', next); } catch (e) {}
                syncIcon();
            }

            var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (reduced || !document.startViewTransition) {
                applyTheme();
                return;
            }

            var transition = document.startViewTransition(applyTheme);
            transition.ready.then(function() {
                document.documentElement.animate(
                    { clipPath: ['inset(0 0 100% 0)', 'inset(0)'] },
                    { pseudoElement: '::view-transition-new(root)', duration: 600, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }
                );
            });
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
