# 📱 Téléphone d'Hortense - Aide de Jeu Interactive

Cette application React simule le smartphone d'une personne disparue. Elle a été créée spécifiquement comme aide de jeu (Prop) pour le scénario de jeu de rôle **"Citrouilles, Sushis et Marmelade"** (L'Appel de Cthulhu).

Les joueurs (Investigateurs) peuvent manipuler ce faux téléphone pour découvrir des indices, fouiller l'historique web, lire les SMS et comprendre ce qui est arrivé à la victime.

## 🕵️‍♂️ Fonctionnalités du Téléphone

* **Écran de verrouillage PIN :** Pour bloquer l'accès initial (se bloque après plusieurs erreurs).
* **Météo dynamique :** Affiche la météo en temps réel de Tokyo.
* **SMS dynamiques :** Conversations avec ses proches, messages effrayants de la secte et alertes bancaires à l'étranger.
* **Historique des appels :** Appels manqués suspects et messages vocaux.
* **Galerie Photo :** Dossier public et dossier caché par un mot de passe.
* **Historique Web (Chrome) :** Fausses recherches internet pour brouiller les pistes.
* **Application Notes :** Journal intime et ressentis de la victime.
* **Appareil Photo "Maudit" :** Réservé aux Maîtres du Jeu taquins (Jump scare intégré).
* **Batterie dynamique :** La batterie se vide en temps réel (le MJ peut la recharger avec un clic secret).

## 🛠️ Installation et Lancement (Pour le MJ)

Ce projet utilise [React](https://reactjs.org/) et [Vite](https://vitejs.dev/).

### Prérequis
* [Node.js](https://nodejs.org/) installé sur votre ordinateur.

### Étapes

1. **Cloner ou télécharger le projet :**
   \`\`\`bash
   git clone <url-du-repo>
   cd phone-app
   \`\`\`

2. **Installer les dépendances :**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configurer l'environnement :**
   Créez un fichier \`.env\` à la racine du projet et ajoutez votre clé API OpenWeatherMap (pour que le widget météo de Tokyo fonctionne) :
   \`\`\`env
   VITE_API_KEY=votre_cle_api_ici
   \`\`\`

4. **Lancer le serveur local :**
   \`\`\`bash
   npm run dev
   \`\`\`
   L'application sera accessible (généralement sur \`http://localhost:5173\`). Vous pouvez partager cet écran avec vos joueurs ou la déployer en ligne.

## 📝 Personnalisation
Toutes les données de l'enquête (SMS, historique, appels) sont modifiables sans toucher au code React. Allez simplement dans le dossier \`src/data/\` et modifiez les fichiers \`.json\`.
