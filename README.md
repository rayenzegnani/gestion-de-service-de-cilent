# Gestion Atelier - MERN Application

Application complète de gestion d'atelier de réparation avec système de service client.

## 🚀 Technologies

### Backend
- **Node.js** + **Express.js**
- **MongoDB** avec Mongoose
- **JWT** pour l'authentification
- **bcryptjs** pour le hachage des mots de passe

### Frontend
- **React** 18
- **Tailwind CSS** pour le style
- **Axios** pour les requêtes HTTP

## 📋 Prérequis

- Node.js 18+ installé
- MongoDB installé et en cours d'exécution
- npm ou yarn

## ⚙️ Installation

### 1. Cloner le dépôt
```bash
git clone <repository-url>
cd gestion-de-service-de-cilent
```

### 2. Installer les dépendances

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd client
npm install
```

### 3. Configuration

#### Backend (.env)
Créer un fichier `.env` dans le dossier `server/` (ou copier `.env.example`):
```env
MONGO_URI="mongodb://localhost:27017/hestion_de_service"
JWT_SECRET="your_super_secret_jwt_key_change_this_in_production"
PORT=5000
CLIENT_URL="http://localhost:3000"
```

#### Frontend (.env)
Créer un fichier `.env` dans le dossier `client/`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Démarrer MongoDB
Assurez-vous que MongoDB est en cours d'exécution:
```bash
mongod
```

## 🎬 Démarrage

### Option 1: Démarrage manuel

#### Terminal 1 - Backend
```bash
cd server
npm run dev
```

#### Terminal 2 - Frontend
```bash
cd client
npm start
```

### Option 2: Démarrage automatique (Windows PowerShell)
```powershell
.\start.ps1
```

## 🌐 Accès à l'application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Routes disponibles**: http://localhost:5000/api/debug/routes

## 👥 Rôles utilisateurs

L'application supporte 3 types d'utilisateurs:

### 1. **Client** (rôle par défaut)
- Créer des tickets de réparation
- Voir ses propres tickets
- Suivre le statut des réparations

### 2. **Employé**
- Voir tous les tickets
- Mettre à jour le statut des tickets
- Gérer les réparations

### 3. **Admin**
- Accès complet
- Gestion des utilisateurs
- Suppression de tickets
- Statistiques complètes

## 📚 API Endpoints

### Authentification (`/api/auth`)
- `POST /register` - Créer un compte (client)
- `POST /login` - Se connecter
- `GET /me` - Informations utilisateur (protégé)

### Clients (`/api/clients`)
- `POST /` - Créer un client (authentifié)
- `GET /` - Liste des clients (authentifié)
- `GET /:id` - Détails client (authentifié)
- `PUT /:id` - Modifier (admin/employé)
- `DELETE /:id` - Supprimer (admin)

### Appareils (`/api/devices`)
- `POST /` - Créer un appareil (authentifié)
- `GET /` - Liste des appareils (authentifié)
- `GET /:id` - Détails appareil (authentifié)
- `PUT /:id` - Modifier (admin/employé)
- `DELETE /:id` - Supprimer (admin)

### Tickets (`/api/tickets`)
- `POST /` - Créer un ticket (authentifié)
- `GET /` - Liste des tickets (authentifié)
- `GET /:id` - Détails ticket (authentifié)
- `PUT /:id` - Modifier (admin/employé)
- `DELETE /:id` - Supprimer (admin)

## 🎨 Fonctionnalités

### Interface utilisateur moderne
- ✨ Design moderne avec Tailwind CSS
- 🎨 Gradients et animations
- 📱 Responsive (mobile + desktop)
- 🔐 Authentification sécurisée
- 📊 Tableaux de bord par rôle
- ⚡ Chargement en temps réel
- 🎯 Validation des formulaires

### Statuts des tickets
- 🔵 **Reçu** - Appareil enregistré
- 🟣 **Diagnostic** - Analyse en cours
- 🟡 **En Réparation** - Réparation en cours
- 🟢 **Prêt** - Prêt à récupérer
- ⚫ **Terminé** - Récupéré et terminé

## 🔒 Sécurité

- ✅ Hachage des mots de passe avec bcrypt
- ✅ Authentification JWT
- ✅ Protection des routes par rôle
- ✅ Validation des entrées
- ✅ CORS configuré
- ⚠️ En production: changer JWT_SECRET et utiliser HTTPS

## 🐛 Débogage

### Vérifier la connexion MongoDB
```bash
mongosh
show dbs
use hestion_de_service
show collections
```

### Voir les logs
- Backend: Les logs apparaissent dans le terminal du serveur
- Frontend: Ouvrir la console du navigateur (F12)

### Tester l'API
```bash
# Test de connexion
curl http://localhost:5000/

# Liste des routes
curl http://localhost:5000/api/debug/routes
```

## 📝 Scripts utiles

### Backend
```bash
npm start       # Démarrer en production
npm run dev     # Démarrer en développement (nodemon)
```

### Frontend
```bash
npm start       # Démarrer le serveur de développement
npm run build   # Build pour production
npm test        # Lancer les tests
```

## 🚧 Améliorations futures

- [ ] Tests unitaires et d'intégration
- [ ] Upload d'images pour les appareils
- [ ] Notifications par email
- [ ] Historique des modifications
- [ ] Rapports PDF
- [ ] Tableau de bord temps réel (WebSocket)
- [ ] Recherche et filtres avancés
- [ ] Internationalisation (i18n)

## 📄 Licence

Ce projet est sous licence MIT.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou un pull request.
