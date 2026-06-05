// ========================================
// MARATHON CONCEPT - JAVASCRIPT
// ========================================

// Sincroniza --nav-height con la altura real del nav
function syncNavHeight() {
    const nav = document.querySelector('.main-nav');
    if (nav) {
        document.documentElement.style.setProperty('--nav-height', nav.offsetHeight + 'px');
    }
}
syncNavHeight();
window.addEventListener('resize', syncNavHeight);

// Smooth Scroll para enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#reserva') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const navHeight = document.querySelector('.main-nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar transparente/opaco según scroll
const nav = document.querySelector('.main-nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        nav.style.background = 'rgba(0, 0, 0, 0.98)';
        nav.style.boxShadow = '0 2px 20px rgba(212, 255, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(0, 0, 0, 0.95)';
        nav.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Animación de entrada para secciones
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animaciones a secciones
document.querySelectorAll('.section-container, .reserve-content, .quote-container').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease-out';
    observer.observe(section);
});

// Efecto parallax suave en hero + fade de la barra lateral
const sidebarLeft = document.getElementById('sidebarLeft');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const viewH = window.innerHeight;
    const hero = document.querySelector('.hero');

    // Parallax + fade del hero
    if (hero && scrolled < viewH) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / viewH);
    }

    // Fade de la barra lateral amarilla
    // Empieza a desvanecerse al 20% del scroll y desaparece al 80% del viewport
    if (sidebarLeft) {
        const fadeStart = viewH * 0.2;
        const fadeEnd   = viewH * 0.8;
        if (scrolled <= fadeStart) {
            sidebarLeft.style.opacity = '1';
            sidebarLeft.style.transform = 'translateX(0)';
        } else if (scrolled >= fadeEnd) {
            sidebarLeft.style.opacity = '0';
            sidebarLeft.style.transform = 'translateX(-100%)';
        } else {
            const progress = (scrolled - fadeStart) / (fadeEnd - fadeStart);
            sidebarLeft.style.opacity = (1 - progress).toString();
            sidebarLeft.style.transform = `translateX(${-progress * 100}%)`;
        }
    }

    // Parallax sutil en secciones full-bleed
    document.querySelectorAll('.fullbleed-bg, .influence-bg').forEach(bg => {
        const rect = bg.parentElement.getBoundingClientRect();
        if (rect.top < viewH && rect.bottom > 0) {
            const offset = (rect.top / viewH) * 40;
            bg.style.transform = `translateY(${offset}px)`;
        }
    });
});

// Glitch effect aleatorio en el logo
const heroLogo = document.querySelector('.hero-logo h1');
if (heroLogo) {
    setInterval(() => {
        if (Math.random() > 0.95) {
            heroLogo.style.textShadow = `
                ${Math.random() * 10 - 5}px 0 rgba(212, 255, 0, 0.8),
                ${Math.random() * 10 - 5}px 0 rgba(255, 0, 255, 0.8)
            `;

            setTimeout(() => {
                heroLogo.style.textShadow = '';
            }, 50);
        }
    }, 2000);
}

// Efecto hover en botones con resplandor
document.querySelectorAll('.btn-reserva, .btn-hero-primary, .btn-reserve-now').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });

    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Animación de las hazard stripes
const hazardStripes = document.querySelector('.hazard-stripes');
if (hazardStripes) {
    let position = 0;
    setInterval(() => {
        position += 0.5;
        hazardStripes.style.backgroundPosition = `${position}px 0`;
    }, 50);
}

// Efecto de typing en el texto del hero (opcional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Log de carga
console.log('%c🎮 MARATHON CONCEPT LOADED', 'color: #d4ff00; font-size: 20px; font-weight: bold; background: #000; padding: 10px;');
console.log('%cEstilo Marathon Oficial Activado ⚡', 'color: #ff00ff; font-size: 14px;');

// Prevenir comportamiento por defecto en links dummy
document.querySelectorAll('a[href="#"], a[href="#reserva"], a[href="#noticias"], a[href="#multimedia"], a[href="#creadores"], a[href="#ayuda"], a[href="#tienda"], a[href="#cuenta"], a[href="#espanol"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Link clicked:', link.textContent.trim());
    });
});

// Loading fade in
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiSequence.join('')) {
        document.body.style.filter = 'hue-rotate(180deg)';
        console.log('%c🎉 EASTER EGG ACTIVADO!', 'color: #ff0033; font-size: 24px; font-weight: bold;');

        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 5000);
    }
});
