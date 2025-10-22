# Gestion Atelier - MERN minimal

Ce dépôt contient une application MERN minimale pour gérer un atelier de réparation et le service client.

Structure:

- server/ : backend Node.js + Express + MongoDB
- client/ : frontend React

Prérequis:

- Node.js 18+
- MongoDB local ou Atlas

Démarrage serveur:

1. cd server
2. npm install
3. créer un fichier `.env` avec `MONGO_URI` si besoin
4. npm run dev

Démarrage client:

1. cd client
2. npm install
3. npm start

L'application fournit des endpoints REST pour gérer `clients`, `devices` et `tickets`.
