---
name: audit-ui
description: Audite un écran, une section ou un composant du portfolio par rapport à la charte visuelle et aux bonnes pratiques UI/UX et d'accessibilité actuelles, et rend une liste de constats priorisés avec captures. À utiliser quand Gilbert demande de relire, critiquer, vérifier ou améliorer l'interface d'une page, en desktop ou en mobile.
argument-hint: "[page, URL ou composant]"
---

# Audit UI : $ARGUMENTS

Tu observes et tu recommandes. Tu ne corriges rien sans l'accord de Gilbert.

## Étapes

1. **Cible** : identifie la page et ses fichiers (`src/views/`, `src/components/`). URL par défaut : l'aperçu `dev` https://portfolio-git-dev-gigi603s-projects.vercel.app (ou `npm run serve` en local).
2. **Référentiel** : relis `.claude/rules/style-visuel.md` et la section « Règles de contenu » de `CLAUDE.md`. Fais au moins 3 recherches web et lis 3 pages sur les bonnes pratiques actuelles liées à l'écran (ex. formulaire, navigation, étude de cas). Cite les sources.
3. **Captures** avec Playwright : desktop 1440 px et mobile 390 px, en haut de page et après défilement, en FR et en EN, plus les états utiles (survol, focus clavier, erreur, vide, envoyé).
4. **Passe en revue** avec cette grille :
   - [ ] Charte : couleurs, typographie Urbanist, arrondis, néons au bon endroit, rien hors palette.
   - [ ] Hiérarchie : un recruteur comprend en 5 secondes qui est Gilbert et où cliquer.
   - [ ] Contrastes calculés (`node .claude/skills/direction-visuelle/scripts/contraste.mjs "#texte" "#fond"`) : texte ≥ 4,5:1, gros texte et éléments d'interface ≥ 3:1.
   - [ ] Clavier : ordre de tabulation logique, focus visible sur fond sombre.
   - [ ] Mobile : zones tactiles ≥ 24 × 24 px (WCAG 2.5.8), pas de défilement horizontal, encoche iPhone respectée.
   - [ ] Textes : FR et EN complets, pas de `[À CONFIRMER]`, règles de contenu respectées.
   - [ ] Images : texte alternatif, poids raisonnable.
   - [ ] Mouvement : animations coupées si `prefers-reduced-motion`.
5. **Rends le rapport** dans `/mnt/project-files/qa/audit-ui-<page>-<date>.md` :

```markdown
## Résumé
[3 phrases : état général, le problème le plus important, la priorité]

## Constats
| # | Priorité | Où | Constat | Pourquoi (règle ou source) | Proposition |
|---|----------|----|---------|----------------------------|-------------|
| 1 | Bloquant | ... | ... | WCAG 1.4.3 | ... |

## Ce qui marche bien
## Sources
```

   Priorités : **Bloquant** (accessibilité AA ratée, bug, règle de contenu violée), **Important** (gêne le recruteur ou sort de la charte), **Amélioration** (finition).

## Points de vigilance

- Chaque constat s'appuie sur une capture, une mesure ou une source, jamais sur un goût personnel.
- Classe au plus 10 constats, les plus utiles d'abord.
- Pour un audit d'accessibilité complet, passe la main au sous-agent `accessibilite`.
