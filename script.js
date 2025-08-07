// Navigation mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

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

// Animation au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.timeline-item, .skill-item, .education-item, .interest-category, .contact-item');
    elementsToAnimate.forEach(el => observer.observe(el));
});

// Navbar background au scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Gestion du formulaire de contact
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Récupération des données du formulaire
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
        const message = contactForm.querySelector('textarea').value;
        
        // Validation basique
        if (!name || !email || !subject || !message) {
            showNotification('Veuillez remplir tous les champs', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Veuillez entrer une adresse email valide', 'error');
            return;
        }
        
        // Simulation d'envoi (remplacer par votre logique d'envoi)
        showNotification('Message envoyé avec succès !', 'success');
        contactForm.reset();
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
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
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

// Animation des compétences au hover
document.querySelectorAll('.skill-item').forEach(skill => {
    skill.addEventListener('mouseenter', () => {
        const level = skill.querySelector('.skill-level');
        if (level) {
            level.style.transform = 'scaleX(1.1)';
        }
    });
    
    skill.addEventListener('mouseleave', () => {
        const level = skill.querySelector('.skill-level');
        if (level) {
            level.style.transform = 'scaleX(1)';
        }
    });
});

// Animation des statistiques
function animateStats() {
    const stats = document.querySelectorAll('.stat-item h3');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
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

// Déclencher l'animation des stats quand la section est visible
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Effet de parallaxe pour la grille cyber
window.addEventListener('scroll', () => {
    const cyberGrid = document.querySelector('.cyber-grid');
    if (cyberGrid) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        cyberGrid.style.transform = `translateY(${rate}px)`;
    }
});

// Gestion des liens sociaux (à personnaliser)
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = link.querySelector('i').className;
        
        let url = '#';
        if (platform.includes('linkedin')) {
            url = 'https://linkedin.com/in/votre-profil';
        } else if (platform.includes('github')) {
            url = 'https://github.com/votre-username';
        } else if (platform.includes('twitter')) {
            url = 'https://twitter.com/votre-username';
        }
        
        if (url !== '#') {
            window.open(url, '_blank');
        } else {
            showNotification('Lien en cours de configuration', 'info');
        }
    });
});

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

// Gestion des erreurs
window.addEventListener('error', (e) => {
    console.error('Erreur détectée:', e.error);
});

// Mode sombre (optionnel - à implémenter si souhaité)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
}

// Charger les préférences utilisateur
document.addEventListener('DOMContentLoaded', () => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
    }
});

// Gestion des cartes de projets
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        // Rendre les cartes visibles par défaut
        card.classList.add('visible');
        // Animation d'apparition avec délai
        card.style.animationDelay = `${0.1 * (index + 1)}s`;
        
        // Effet de parallaxe au hover
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
        
        // Gestion des liens de projets
        const projectLinks = card.querySelectorAll('.project-link');
        projectLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const linkText = link.textContent.trim();
                
                if (linkText.includes('Voir le projet')) {
                    showNotification('Lien vers le projet en cours de configuration', 'info');
                } else if (linkText.includes('Code source')) {
                    showNotification('Lien vers le code source en cours de configuration', 'info');
                }
            });
        });
        
        // Effet de clic pour mobile (alternative au hover)
        let touchStartY = 0;
        let touchEndY = 0;
        
        card.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        });
        
        card.addEventListener('touchend', (e) => {
            touchEndY = e.changedTouches[0].clientY;
            const touchDiff = touchStartY - touchEndY;
            
            // Si le swipe est vers le haut, déclencher l'effet flip
            if (touchDiff > 50) {
                const cardInner = card.querySelector('.card-inner');
                cardInner.style.transform = 'rotateY(180deg) scale(1.05)';
                
                // Remettre à zéro après 3 secondes
                setTimeout(() => {
                    cardInner.style.transform = 'rotateY(0deg) scale(1)';
                }, 3000);
            }
        });
    });
    
    // Animation des cartes au scroll (optionnel)
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Les cartes sont déjà visibles par défaut
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    projectCards.forEach(card => {
        projectObserver.observe(card);
    });
});

// Effet de particules pour les cartes (optionnel)
function createParticleEffect(element) {
    const particles = 10;
    const colors = ['#2563eb', '#3b82f6', '#1e40af'];
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;
        
        const rect = element.getBoundingClientRect();
        const x = rect.left + Math.random() * rect.width;
        const y = rect.top + Math.random() * rect.height;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        document.body.appendChild(particle);
        
        // Animation de la particule
        const animation = particle.animate([
            { 
                transform: 'translate(0, 0) scale(1)',
                opacity: 1 
            },
            { 
                transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0)`,
                opacity: 0 
            }
        ], {
            duration: 1000 + Math.random() * 1000,
            easing: 'ease-out'
        });
        
        animation.onfinish = () => {
            particle.remove();
        };
    }
}

// Ajouter l'effet de particules aux cartes (optionnel)
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Créer un effet de particules au hover (optionnel)
            // createParticleEffect(card);
        });
    });
});

// Amélioration de l'accessibilité pour les cartes
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedCard = document.querySelector('.project-card:focus');
        if (focusedCard) {
            const cardInner = focusedCard.querySelector('.card-inner');
            const currentTransform = cardInner.style.transform;
            
            if (currentTransform.includes('rotateY(180deg)')) {
                cardInner.style.transform = 'rotateY(0deg) scale(1)';
            } else {
                cardInner.style.transform = 'rotateY(180deg) scale(1.05)';
            }
        }
    }
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