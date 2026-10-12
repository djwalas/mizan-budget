# Contribuer à Mizan

Merci de vouloir améliorer le projet. Mizan est encore une première version; les retours d’usage concrets sont particulièrement utiles.

## Signaler un bug ou proposer une idée

Dans une issue, indique :

- le navigateur et l’appareil utilisés;
- les étapes pour reproduire le problème;
- le résultat attendu et le résultat observé;
- si possible, une capture d’écran sans données personnelles.

Pour une nouvelle fonctionnalité, explique d’abord le besoin réel auquel elle répond. Évite de joindre une sauvegarde JSON contenant des dépenses privées.

## Modifications du code

1. Crée une branche dédiée à ta modification.
2. Garde l’application utilisable sans compte, sans serveur et sans dépendance externe, sauf décision discutée dans une issue.
3. Vérifie l’interface en français et en arabe, sur mobile et sur ordinateur.
4. Vérifie l’ajout, la suppression, le changement de mois, le budget, l’export CSV et la sauvegarde/restauration JSON.
5. Ouvre `index.html` dans un navigateur ou lance `python3 -m http.server 8000`.
6. Décris ce que tu as testé dans ta pull request.

## Principes

- Ne pas ajouter de suivi publicitaire ni envoyer des informations de dépenses à un serveur.
- Ne jamais demander ou committer de clés API, mots de passe ou données réelles d’utilisateurs.
- Garder les textes compréhensibles et accessibles, y compris en mode RTL.
- Ne pas déclarer de nombre d’utilisateurs, d’étoiles GitHub ou de téléchargements sans mesure vérifiable.
