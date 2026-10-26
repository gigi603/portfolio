---
name: publier
description: Vérifie la branche dev puis la publie sur main (gilbert-trinidad.com) après l'accord de Gilbert.
disable-model-invocation: true
---

# Publier le portfolio

Ne lance cette procédure que si Gilbert l'a demandée. La fusion dans `main` met le site en ligne.

1. Mets `dev` à jour (`git pull origin dev`) et vérifie qu'il n'y a rien de non commité.
2. Lance `npm run lint` puis `npm run build`. S'il y a une erreur, arrête et explique-la simplement.
3. Vérifie les textes : chaque clé de `src/i18n/fr.js` existe dans `en.js`, aucun `[À CONFIRMER]` ne reste dans les textes visibles.
4. Fais relire par les sous-agents `qa-site` et `accessibilite`, et résume leurs points bloquants.
5. Donne à Gilbert l'aperçu Vercel de `dev` (https://portfolio-git-dev-gigi603s-projects.vercel.app) et la liste des changements depuis `main` (`git log main..dev --oneline`, en langage simple).
6. **Attends le « oui, publie » explicite de Gilbert.** Sans lui, arrête-toi ici.
7. Fusionne `dev` dans `main` et pousse, en préfixant les commandes par `ACCORD_GILBERT=1` (sinon le garde-fou `.claude/hooks/proteger-main.sh` les bloque) : `git checkout main && ACCORD_GILBERT=1 git merge dev && ACCORD_GILBERT=1 git push origin main`.
8. Reviens sur `dev` (`git checkout dev`) et vérifie que gilbert-trinidad.com affiche la nouvelle version.
