# Mizan — budget personnel au Maroc

**Mizan** est une petite application web gratuite et open source pour suivre ses dépenses en dirhams marocains (MAD). Elle fonctionne dans le navigateur, sans compte ni serveur, en français ou en arabe.

> **Statut : première version (prototype fonctionnel).** Le projet a besoin de tests avec de vrais utilisateurs et de contributions avant de pouvoir être considéré comme largement adopté.

## Fonctionnalités

- Ajouter et supprimer des dépenses par date et catégorie.
- Suivre un budget mensuel en MAD et voir le montant restant.
- Consulter la répartition des dépenses par catégorie.
- Filtrer l’historique par catégorie.
- Exporter les dépenses en CSV et sauvegarder/restaurer les données en JSON.
- Interface française/arabe avec prise en charge du sens droite-à-gauche.
- Données stockées uniquement dans le stockage local du navigateur; aucune connexion à un serveur n’est faite par l’application.
- Aucun framework, compte, clé API ou dépendance externe.

## Démarrer

1. Télécharge les fichiers du dépôt ou clone-le :
   ```bash
   git clone https://github.com/TON-COMPTE/mizan-budget.git
   cd mizan-budget
   ```
2. Ouvre `index.html` dans un navigateur récent. Pour servir le dossier en local :
   ```bash
   python3 -m http.server 8000
   ```
   Puis ouvre `http://localhost:8000`.

Les dépenses sont conservées sur l’appareil et dans le navigateur utilisés. **Effacer les données du navigateur peut effacer les dépenses** : utilise régulièrement le bouton de sauvegarde JSON si tu veux garder une copie.

## Publier gratuitement avec GitHub Pages

1. Crée un dépôt public nommé `mizan-budget` sur ton propre compte GitHub.
2. Ajoute les fichiers de ce dossier à la racine du dépôt.
3. Dans le dépôt, ouvre **Settings → Pages**, puis choisis le déploiement depuis la branche `main` et le dossier `/ (root)`.
4. Attends la publication indiquée par GitHub Pages et teste le lien sur téléphone et ordinateur.

Ne publie pas tes propres dépenses, sauvegardes ou informations personnelles dans le dépôt. Le dépôt contient le code de l’application, pas les données personnelles des utilisateurs.

## Contribuer

Les rapports de bugs, idées et améliorations sont bienvenus. Consulte [`CONTRIBUTING.md`](CONTRIBUTING.md). Avant de proposer une fonctionnalité, décris le problème qu’elle résout et vérifie qu’elle ne transmet pas de données privées.

## Confidentialité et sécurité

Mizan ne collecte, ne transmet ni ne synchronise aucune donnée. Le stockage local n’est pas chiffré : n’utilise pas l’application sur un appareil partagé sans le verrouiller, et ne saisis pas d’informations sensibles. Les sauvegardes exportées sont des fichiers lisibles — garde-les en lieu sûr.

## Licence

Ce projet est distribué sous licence MIT. Voir [`LICENSE`](LICENSE).
