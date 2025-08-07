// Initialisation AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 2000);
});

// Navigation mobile
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu mobile quand on clique sur un lien
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navigation smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background au scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});



// Animation de texte typing
const typingText = document.getElementById('typing-text');
const texts = ['expériences web interactives.', 'sites modernes.', 'applications performantes.'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause à la fin
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500; // Pause avant de recommencer
    }
    
    setTimeout(typeText, typeSpeed);
}

// Démarrer l'animation de typing après le chargement
setTimeout(typeText, 1000);

// Animation des statistiques
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 30);
    });
}

// Observer pour déclencher l'animation des stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Filtres du portfolio
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Retirer la classe active de tous les boutons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Ajouter la classe active au bouton cliqué
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.classList.remove('hidden');
                item.style.animation = 'fadeInUp 0.6s ease-out';
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// Effet Matrix
class MatrixEffect {
    constructor() {
        this.canvas = document.getElementById('matrix-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
        this.drops = [];
        this.fontSize = 14;
        this.columns = 0;
        this.isHovered = false;
        
        this.init();
    }
    
    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        // Gestion du hover
        const matrixBg = document.getElementById('matrix-bg');
        matrixBg.addEventListener('mouseenter', () => {
            this.isHovered = true;
        });
        
        matrixBg.addEventListener('mouseleave', () => {
            this.isHovered = false;
        });
        
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = [];
        
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = 1;
        }
    }
    
    animate() {
        // Créer un dégradé pour le fond
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, 'rgba(15, 23, 42, 0.1)');
        gradient.addColorStop(0.5, 'rgba(30, 41, 59, 0.08)');
        gradient.addColorStop(1, 'rgba(248, 250, 252, 0.05)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#8b5cf6';
        this.ctx.font = `${this.fontSize}px monospace`;
        
        for (let i = 0; i < this.drops.length; i++) {
            const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;
            
            // Effet de dispersion au hover
            if (this.isHovered) {
                const offsetX = (Math.random() - 0.5) * 20;
                const offsetY = (Math.random() - 0.5) * 20;
                this.ctx.fillText(text, x + offsetX, y + offsetY);
            } else {
                this.ctx.fillText(text, x, y);
            }
            
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            
            this.drops[i]++;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialiser l'effet Matrix
const matrixEffect = new MatrixEffect();

// Animation de la sphère 3D
const floatingSphere = document.getElementById('floating-sphere');
if (floatingSphere) {
    floatingSphere.addEventListener('click', () => {
        floatingSphere.style.transform = 'scale(1.2) rotateY(360deg)';
        setTimeout(() => {
            floatingSphere.style.transform = '';
        }, 1000);
    });
}

// Formulaire de contact
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Récupération des données du formulaire
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('#name').value;
        const email = contactForm.querySelector('#email').value;
        const subject = contactForm.querySelector('#subject').value;
        const message = contactForm.querySelector('#message').value;
        
        // Validation basique
        if (!name || !email || !subject || !message) {
            showNotification('Veuillez remplir tous les champs', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Veuillez entrer une adresse email valide', 'error');
            return;
        }
        
        // Simulation d'envoi
        showNotification('Message envoyé avec succès !', 'success');
        contactForm.reset();
        
        // Réinitialiser les labels
        const labels = contactForm.querySelectorAll('label');
        labels.forEach(label => {
            label.style.top = '1rem';
            label.style.fontSize = '1rem';
            label.style.color = 'var(--text-secondary)';
        });
    });
}

// Validation email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Système de notification
function showNotification(message, type = 'info') {
    // Supprimer les notifications existantes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Créer la notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Styles pour la notification
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Ajouter les styles pour l'animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
        .notification-close:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
    
    // Ajouter au DOM
    document.body.appendChild(notification);
    
    // Gestion de la fermeture
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-fermeture après 5 secondes
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Animation des cartes de services
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Animation des cartes du portfolio
document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Animation des badges technologiques
document.querySelectorAll('.tech-badge').forEach((badge, index) => {
    badge.addEventListener('mouseenter', () => {
        badge.style.transform = 'scale(1.2) rotate(10deg)';
    });
    
    badge.addEventListener('mouseleave', () => {
        badge.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Gestion des liens sociaux
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href && href !== '#') {
            window.open(href, '_blank');
        }
    });
});

// Gestion du téléchargement du CV
const cvDownload = document.querySelector('.cv-download a');
if (cvDownload) {
    cvDownload.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('Téléchargement du CV en cours...', 'info');
        // Ici vous pouvez ajouter la logique de téléchargement
    });
}

// Amélioration de l'accessibilité
document.addEventListener('keydown', (e) => {
    // Navigation au clavier
    if (e.key === 'Escape') {
        const activeMenu = document.querySelector('.nav-menu.active');
        if (activeMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Optimisation des performances
window.addEventListener('scroll', () => {
    // Throttle pour les animations au scroll
    if (!window.scrollTimeout) {
        window.scrollTimeout = setTimeout(() => {
            // Code pour les animations au scroll si nécessaire
            window.scrollTimeout = null;
        }, 16);
    }
});

// Gestion des erreurs
window.addEventListener('error', (e) => {
    console.error('Erreur détectée:', e.error);
});

// Préchargement des images et optimisation
window.addEventListener('load', () => {
    // Ajouter une classe pour indiquer que la page est chargée
    document.body.classList.add('loaded');
    
    // Optimisation des performances
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
});

// Animation des éléments flottants
document.querySelectorAll('.floating-element').forEach((element, index) => {
    element.style.animationDelay = `${index * 2}s`;
    
    element.addEventListener('mouseenter', () => {
        element.style.transform = 'scale(1.5) rotate(360deg)';
        element.style.opacity = '1';
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = '';
        element.style.opacity = '';
    });
});

// Animation des liens du portfolio
document.querySelectorAll('.portfolio-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const linkText = link.textContent.trim();
        
        if (linkText.includes('Voir le projet')) {
            showNotification('Lien vers le projet en cours de configuration', 'info');
        } else if (linkText.includes('Code source') || linkText.includes('Design')) {
            showNotification('Lien vers le code source en cours de configuration', 'info');
        }
    });
});

// Animation des prix des services
document.querySelectorAll('.service-price').forEach(price => {
    price.addEventListener('mouseenter', () => {
        price.style.transform = 'scale(1.1)';
        price.style.color = '#fbbf24';
    });
    
    price.addEventListener('mouseleave', () => {
        price.style.transform = 'scale(1)';
        price.style.color = 'white';
    });
});

// Effet de focus pour les éléments de formulaire
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => {
        const label = input.nextElementSibling;
        if (label && label.tagName === 'LABEL') {
            label.style.top = '-0.5rem';
            label.style.fontSize = '0.875rem';
            label.style.color = 'var(--primary-color)';
        }
    });
    
    input.addEventListener('blur', () => {
        const label = input.nextElementSibling;
        if (label && label.tagName === 'LABEL' && !input.value) {
            label.style.top = '1rem';
            label.style.fontSize = '1rem';
            label.style.color = 'var(--text-secondary)';
        }
    });
});

// Effet de parallaxe pour les éléments flottants
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Animation des éléments au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.querySelectorAll('.service-card, .portfolio-item, .contact-item').forEach(el => {
    scrollObserver.observe(el);
});

// Section "Ce que je sais faire" - Interactions
const demoBtn = document.getElementById('demo-btn');
if (demoBtn) {
    let clickCount = 0;
    const messages = [
        'Interaction détectée !',
        'JavaScript en action',
        'Effet de particules',
        'Animation fluide',
        'Réactivité maximale'
    ];
    
    demoBtn.addEventListener('click', () => {
        clickCount++;
        const message = messages[clickCount % messages.length];
        
        // Animation du bouton
        demoBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            demoBtn.style.transform = 'scale(1.05)';
        }, 100);
        
        // Notification
        showNotification(message, 'success');
        
        // Effet de particules
        createParticleEffect(demoBtn);
    });
}

// Fonction pour créer un effet de particules
function createParticleEffect(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${centerX}px;
            top: ${centerY}px;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (i / 8) * Math.PI * 2;
        const distance = 50 + Math.random() * 30;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        particle.animate([
            { 
                transform: 'translate(0, 0) scale(1)',
                opacity: 1 
            },
            { 
                transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`,
                opacity: 0 
            }
        ], {
            duration: 600 + Math.random() * 400,
            easing: 'ease-out'
        }).onfinish = () => particle.remove();
    }
}

// Animation de typing pour la démo terminal
const typingDemo = document.getElementById('typing-demo');
if (typingDemo) {
    const demoTexts = [
        'console.log("Hello World");',
        'const skills = ["JS", "CSS", "HTML"];',
        'function animate() { ... }',
        'npm install awesome-package'
    ];
    
    let demoTextIndex = 0;
    let demoCharIndex = 0;
    let isDemoDeleting = false;
    
    function typeDemoText() {
        const currentText = demoTexts[demoTextIndex];
        
        if (isDemoDeleting) {
            typingDemo.textContent = currentText.substring(0, demoCharIndex - 1);
            demoCharIndex--;
        } else {
            typingDemo.textContent = currentText.substring(0, demoCharIndex + 1);
            demoCharIndex++;
        }
        
        let typeSpeed = isDemoDeleting ? 30 : 80;
        
        if (!isDemoDeleting && demoCharIndex === currentText.length) {
            typeSpeed = 2000; // Pause à la fin
            isDemoDeleting = true;
        } else if (isDemoDeleting && demoCharIndex === 0) {
            isDemoDeleting = false;
            demoTextIndex = (demoTextIndex + 1) % demoTexts.length;
            typeSpeed = 1000; // Pause avant de recommencer
        }
        
        setTimeout(typeDemoText, typeSpeed);
    }
    
    // Démarrer l'animation de typing après un délai
    setTimeout(typeDemoText, 2000);
}

// Animation des cartes de démo au hover
document.querySelectorAll('.demo-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Animation des éléments SVG
document.querySelectorAll('.animated-svg').forEach(svg => {
    svg.addEventListener('mouseenter', () => {
        const circle = svg.querySelector('.svg-circle');
        const path = svg.querySelector('.svg-path');
        
        if (circle) circle.style.animationDuration = '1s';
        if (path) path.style.animationDuration = '0.8s';
    });
    
    svg.addEventListener('mouseleave', () => {
        const circle = svg.querySelector('.svg-circle');
        const path = svg.querySelector('.svg-path');
        
        if (circle) circle.style.animationDuration = '3s';
        if (path) path.style.animationDuration = '2s';
    });
});

console.log('Portfolio Samuel - Développeur Frontend Freelance avec effet Matrix chargé avec succès ! 🚀'); 