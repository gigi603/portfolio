---
name: direction-visuelle
description: Propose 5 directions visuelles ou palettes de couleurs pour le portfolio ou une section, avec les contrastes WCAG vérifiés par calcul, des aperçus et une recommandation. À utiliser quand Gilbert veut explorer une nouvelle ambiance, une palette, une typographie ou un style pour une page, une section ou un composant.
argument-hint: "[page, section ou intention visuelle]"
---

# Direction visuelle : $ARGUMENTS

Une direction = une intention en une phrase + une palette + une typographie + un exemple de rendu. Gilbert choisit ; tu ne changes rien sur le site sans son accord (voir `.claude/rules/style-visuel.md`).

## Étapes

1. **Pars de l'existant** : lis `.claude/rules/style-visuel.md`, `tailwind.config.js` et `src/index.css`. Note ce qui doit rester (violet `#9535D7`, bleu électrique `#6E8BFF`, fond `#0D0B17`, Urbanist, formes arrondies, univers danse/flow) sauf si Gilbert demande une rupture.
2. **Recherche** : au moins 5 recherches web et 5 pages lues (tendances actuelles, références de portfolios, règles de contraste). Cite les sources.
3. **Propose 5 directions**, de la plus proche de l'existant à la plus audacieuse. Pour chacune :
   - nom court et intention (ce que le recruteur doit ressentir) ;
   - palette : fond, surface, texte principal, texte secondaire, accent, accent « néon », bordure, focus (hex) ;
   - typographie (titres / texte), à charger depuis Google Fonts ;
   - un aperçu : petite page HTML rendue en capture (Playwright), avec titre, paragraphe, bouton, lien, carte, champ de formulaire.
4. **Vérifie chaque contraste par calcul**, jamais à l'œil :

```bash
node ${CLAUDE_SKILL_DIR}/scripts/contraste.mjs "#texte" "#fond" "#accent" "#fond"
```

   Seuils (WCAG 2.2 AA, sans arrondi : 4,49 échoue) :
   - texte courant, liens, placeholders, texte des boutons : **≥ 4,5:1** ;
   - gros texte (≥ 24 px, ou ≥ 18,5 px en gras) : ≥ 3:1 ;
   - bordures de champs, icônes utiles, anneau de focus : ≥ 3:1 contre la couleur voisine ;
   - texte sur dégradé ou image : teste la zone la moins contrastée.
   Si une paire échoue, garde la teinte et ajuste la luminosité jusqu'à passer, puis recalcule.
5. **Rends un tableau par direction** : paire de couleurs, usage, ratio, verdict. Puis une **recommandation** argumentée (une seule) et ce qu'elle changerait sur le site.
6. **Range** les aperçus dans `/mnt/project-files/design/directions/<sujet>/` et montre-les à Gilbert.

## Points de vigilance

- **Les néons ne servent jamais au texte courant** : ils sont réservés aux traits, lueurs, illustrations et gros titres. Exemple mesuré : `#9535D7` sur `#0D0B17` = 3,49:1, donc interdit en texte courant ; une variante plus claire comme `#B98BEA` passe à 7,37:1.
- Évite le blanc pur sur noir pur en texte long (effet de halo) : préfère un blanc cassé.
- Pas d'Inter, Roboto ou Arial ; pas d'emoji décoratifs.
- La couleur seule ne doit jamais porter une information (état, erreur) : ajoute une icône ou un texte.
