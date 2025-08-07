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

// Mode sombre/clair
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Changer l'icône
    const icon = themeToggle.querySelector('i');
    icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
});

// Charger le thème sauvegardé
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
const icon = themeToggle.querySelector('i');
icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

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

// Carousel des témoignages
let currentSlide = 0;
const testimonialItems = document.querySelectorAll('.testimonial-item');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

function showSlide(index) {
    testimonialItems.forEach(item => item.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonialItems[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialItems.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + testimonialItems.length) % testimonialItems.length;
    showSlide(currentSlide);
}

// Événements pour les boutons du carousel
if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
}

// Événements pour les dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Auto-play du carousel
setInterval(nextSlide, 5000);

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

// Effet de particules en arrière-plan
function createParticles() {
    const particlesBg = document.getElementById('particles-bg');
    if (!particlesBg) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--primary-color);
            border-radius: 50%;
            opacity: 0.3;
            pointer-events: none;
        `;
        
        // Position aléatoire
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Animation
        particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        particlesBg.appendChild(particle);
    }
}

// Créer les particules après le chargement
setTimeout(createParticles, 1000);

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
        const platform = link.querySelector('i').className;
        
        let url = '#';
        if (platform.includes('linkedin')) {
            url = 'https://linkedin.com/in/samuel-dev';
        } else if (platform.includes('github')) {
            url = 'https://github.com/samuel-dev';
        } else if (platform.includes('twitter')) {
            url = 'https://twitter.com/samuel_dev';
        } else if (platform.includes('dribbble')) {
            url = 'https://dribbble.com/samuel-dev';
        }
        
        if (url !== '#') {
            window.open(url, '_blank');
        } else {
            showNotification('Lien en cours de configuration', 'info');
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
    
    // Navigation du carousel au clavier
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
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

// Animation des cartes flottantes
document.querySelectorAll('.floating-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 2}s`;
});

// Effet de parallaxe pour les cartes flottantes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxCards = document.querySelectorAll('.floating-card');
    
    parallaxCards.forEach((card, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        card.style.transform = `translateY(${yPos}px)`;
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

// Animation des étoiles de notation
document.querySelectorAll('.testimonial-rating i').forEach((star, index) => {
    star.addEventListener('mouseenter', () => {
        // Colorer toutes les étoiles jusqu'à celle-ci
        document.querySelectorAll('.testimonial-rating i').forEach((s, i) => {
            if (i <= index) {
                s.style.color = '#fbbf24';
                s.style.transform = 'scale(1.2)';
            }
        });
    });
    
    star.addEventListener('mouseleave', () => {
        // Remettre toutes les étoiles à leur état normal
        document.querySelectorAll('.testimonial-rating i').forEach(s => {
            s.style.color = '#fbbf24';
            s.style.transform = 'scale(1)';
        });
    });
});

console.log('Portfolio Samuel - Développeur Frontend Freelance chargé avec succès ! 🚀'); 