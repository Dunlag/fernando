// ========================================
// CANVAS DE PARTÍCULAS
// ========================================
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 80;
        this.mouse = { x: null, y: null, radius: 150 };

        this.init();
        this.animate();
        this.setupEventListeners();
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Crear partículas
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Actualizar y dibujar partículas
        this.particles.forEach((particle, i) => {
            // Movimiento
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Rebote en bordes
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Interacción con mouse
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.mouse.radius && this.mouse.x !== null) {
                particle.x -= dx / distance * 2;
                particle.y -= dy / distance * 2;
            }

            // Dibujar partícula
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 255, 159, ${particle.opacity})`;
            this.ctx.fill();

            // Conectar partículas cercanas
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx2 = this.particles[j].x - particle.x;
                const dy2 = this.particles[j].y - particle.y;
                const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                if (dist < 120) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(0, 255, 159, ${0.15 * (1 - dist / 120)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        });

        requestAnimationFrame(() => this.animate());
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });

        window.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
class ScrollAnimations {
    constructor() {
        this.sections = document.querySelectorAll('.content-section');
        this.observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };

        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, this.observerOptions);

        this.sections.forEach(section => {
            observer.observe(section);
        });
    }
}

// ========================================
// PARALLAX EFFECT
// ========================================
class ParallaxEffect {
    constructor() {
        this.backgrounds = document.querySelectorAll('.section-bg');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            this.backgrounds.forEach(bg => {
                const rect = bg.getBoundingClientRect();
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.3;

                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    bg.style.transform = `translateY(${rate}px)`;
                }
            });
        });
    }
}

// ========================================
// SMOOTH SCROLL
// ========================================
class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }

    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// ========================================
// GLITCH EFFECT ALEATORIO
// ========================================
class GlitchEffect {
    constructor() {
        this.glitchElements = document.querySelectorAll('.glitch');
        this.init();
    }

    init() {
        setInterval(() => {
            this.glitchElements.forEach(element => {
                if (Math.random() > 0.95) {
                    element.style.animation = 'none';
                    setTimeout(() => {
                        element.style.animation = '';
                    }, 50);
                }
            });
        }, 3000);
    }
}

// ========================================
// CURSOR PERSONALIZADO
// ========================================
class CustomCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        document.body.appendChild(this.cursor);

        this.cursorFollower = document.createElement('div');
        this.cursorFollower.className = 'cursor-follower';
        document.body.appendChild(this.cursorFollower);

        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';

            setTimeout(() => {
                this.cursorFollower.style.left = e.clientX + 'px';
                this.cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });

        // Efecto hover en botones
        const interactiveElements = document.querySelectorAll('a, button, .faction-badge');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                this.cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.8)';
            });

            el.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                this.cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }
}

// Añadir estilos para cursor personalizado
const cursorStyles = `
    <style>
        .custom-cursor,
        .cursor-follower {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: transform 0.2s ease;
        }

        .custom-cursor {
            background: rgba(0, 255, 159, 0.8);
            box-shadow: 0 0 20px rgba(0, 255, 159, 0.6);
        }

        .cursor-follower {
            border: 2px solid rgba(0, 255, 159, 0.4);
            background: transparent;
        }

        body {
            cursor: none;
        }

        a, button {
            cursor: none;
        }
    </style>
`;
document.head.insertAdjacentHTML('beforeend', cursorStyles);

// ========================================
// INICIALIZACIÓN
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
    new ScrollAnimations();
    new ParallaxEffect();
    new SmoothScroll();
    new GlitchEffect();
    new CustomCursor();

    console.log('%c🎮 MARATHON CONCEPT LOADED', 'color: #00ff9f; font-size: 20px; font-weight: bold;');
    console.log('%cEstética sci-fi activada ✨', 'color: #00d4ff; font-size: 14px;');
});

// ========================================
// ANIMACIÓN DE LOADING
// ========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
