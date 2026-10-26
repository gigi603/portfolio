---
name: etude-de-cas
description: Rédige ou retravaille l'étude de cas d'un projet du portfolio (SPCoach, Mélodie, Atypikhouse, Unfate…) en FR et EN. À utiliser quand Gilbert demande d'écrire, d'enrichir ou de revoir une étude de cas.
argument-hint: "[nom du projet]"
---

# Étude de cas : $ARGUMENTS

Public visé : un recruteur pressé qui embauche un Product Designer. Il doit comprendre en 30 secondes le rôle de Gilbert et le résultat.

## Étapes

1. **Lis l'existant** : l'entrée du projet dans `src/db/projects.js` et ses textes `projects.<id>` dans `src/i18n/fr.js` et `en.js`.
2. **Liste les faits connus** et ce qui manque. Ne complète jamais un manque par une supposition : pose la question à Gilbert ou laisse `[À CONFIRMER]`.
3. **Recherche** : au moins 3 recherches web et 3 pages lues sur les bonnes pratiques actuelles d'études de cas de Product Designer. Cite les sources.
4. **Rédige** selon les sections du projet (`context`, `challenge`, `decisions`, `outcome`, `retro`) :
   - en haut, le résultat et le rôle de Gilbert ;
   - contexte et problème ;
   - décisions et compromis (le pourquoi, pas seulement le quoi) ;
   - résultat, sans chiffre inventé ;
   - ce qu'il ferait autrement.
5. **Relis-toi en recruteur** : qu'est-ce qui fait générique ? Qu'est-ce qui manque pour croire Gilbert ? Corrige.
6. **Écris FR puis EN** dans les deux fichiers i18n, mêmes clés.
7. **Montre** le texte à Gilbert avec ce qui reste à confirmer, avant de pousser sur `dev`.
