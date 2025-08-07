# Portfolio Samuel Lepinay - Cybersécurité

## 📋 Description

Portfolio professionnel moderne et responsive pour Samuel Lepinay, étudiant en cybersécurité à Guardia Cybersecurity School. Ce portfolio présente son parcours, ses compétences techniques et ses projets dans le domaine de la sécurité informatique.

## 🚀 Fonctionnalités

### Design & UX
- **Design moderne** avec thème cybersécurité
- **Responsive** : adapté mobile, tablette et desktop
- **Animations fluides** et interactions intuitives
- **Navigation smooth scroll** entre les sections
- **Menu mobile** avec hamburger

### Sections incluses
- **Accueil** : Présentation personnelle avec call-to-action
- **À propos** : Description détaillée et statistiques
- **Compétences** : Soft skills et langues/technologies avec niveaux
- **Expériences** : Timeline des projets et expériences professionnelles
- **Formation** : Parcours académique
- **Centres d'intérêt** : Passions et hobbies
- **Contact** : Informations de contact et formulaire

### Fonctionnalités techniques
- **Formulaire de contact** avec validation
- **Système de notifications** pour les interactions
- **Animations au scroll** pour une meilleure expérience
- **Optimisation SEO** et accessibilité
- **Gestion des erreurs** et fallbacks

## 🛠️ Technologies utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Styles modernes avec variables CSS et Grid/Flexbox
- **JavaScript ES6+** : Interactivité et animations
- **Font Awesome** : Icônes
- **Google Fonts** : Typographie Inter

## 📁 Structure du projet

```
PorteFolio/
├── index.html          # Page principale
├── style.css           # Styles CSS
├── script.js           # JavaScript interactif
└── README.md           # Documentation
```

## 🎨 Personnalisation

### Couleurs
Les couleurs sont définies dans les variables CSS (`:root`) :
- `--primary-color` : Bleu principal (#2563eb)
- `--secondary-color` : Bleu secondaire (#1e40af)
- `--cyber-gradient` : Dégradé cybersécurité

### Contenu
Pour modifier le contenu :
1. **Informations personnelles** : Modifier les sections correspondantes dans `index.html`
2. **Compétences** : Ajouter/supprimer des éléments dans les sections `.skills-grid`
3. **Expériences** : Modifier les éléments `.timeline-item`
4. **Contact** : Mettre à jour les informations dans la section contact

### Liens sociaux
Dans `script.js`, modifier les URLs dans la fonction de gestion des liens sociaux :
```javascript
if (platform.includes('linkedin')) {
    url = 'https://linkedin.com/in/votre-profil';
} else if (platform.includes('github')) {
    url = 'https://github.com/votre-username';
}
```

## 🚀 Installation et utilisation

### Méthode simple
1. Télécharger tous les fichiers
2. Ouvrir `index.html` dans un navigateur web
3. Le portfolio est prêt à utiliser !

### Serveur local (recommandé)
```bash
# Avec Python
python -m http.server 8000

# Avec Node.js
npx serve .

# Avec PHP
php -S localhost:8000
```

Puis ouvrir `http://localhost:8000` dans votre navigateur.

## 📱 Responsive Design

Le portfolio s'adapte automatiquement à :
- **Mobile** : < 768px
- **Tablette** : 768px - 1024px
- **Desktop** : > 1024px

## 🔧 Configuration avancée

### Formulaire de contact
Le formulaire actuel simule l'envoi. Pour une vraie fonctionnalité :
1. Configurer un backend (PHP, Node.js, etc.)
2. Modifier la fonction de soumission dans `script.js`
3. Ajouter la validation côté serveur

### Analytics
Ajouter Google Analytics ou autre outil de tracking :
```html
<!-- Dans le head de index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

### SEO
Le portfolio inclut déjà :
- Meta tags de base
- Structure sémantique HTML5
- Alt text pour les images
- URLs propres avec ancres

## 🎯 Optimisations incluses

- **Performance** : CSS et JS minifiés, images optimisées
- **Accessibilité** : Navigation clavier, contrastes appropriés
- **SEO** : Meta tags, structure sémantique
- **Sécurité** : Validation des formulaires, XSS protection

## 📞 Support

Pour toute question ou modification :
- Vérifier la documentation
- Consulter les commentaires dans le code
- Tester sur différents navigateurs

## 📄 Licence

Ce projet est sous licence MIT. Libre d'utilisation et de modification.

---

**Développé avec ❤️ pour Samuel Lepinay** 