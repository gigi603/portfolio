---
# S'applique à tout le portfolio, SAUF à la démo Unfate (apps/unfate-demo et sa copie construite public/demo/unfate),
# qui aura sa propre charte. Les rules n'acceptent pas d'exclusion (« ! ») : on liste donc tout le reste.
paths:
  - "*"
  - "src/**/*"
  - "public/*"
  - "public/{files,videos}/**/*"
---

# Style visuel du portfolio

Cette charte ne s'applique pas à la démo Unfate (`apps/unfate-demo/`), qui a sa propre identité.

Garde ce style. Ne change pas de direction visuelle sans l'accord de Gilbert (pour explorer une nouvelle piste, utilise `/direction-visuelle`).

## Thème sombre néon (accueil, navigation, contact, études de cas) — depuis le 20/11/2026

- **Fonds** : page `#0D0B17`, cadre `#050409` avec un trait violet fin, navigation en encoche (inspirée de greymac.com).
- **Couleurs de marque** : dégradé violet `#9535D7` → bleu électrique `#6E8BFF`.
- **Typographie** : Urbanist.
- **Illustrations** : danse en trait de néon, sans cercles décoratifs.
- **Formes arrondies** : boutons en pilule, cartes et visuels entre 18 et 32 px.
- Modèle des études de cas : maquettes `/mnt/project-files/design/builda/etude-*`.

### Néons et texte (contrastes mesurés sur `#0D0B17`)

| Couleur | Ratio | Usage permis |
|---|---|---|
| `#9535D7` violet | 3,49:1 | traits, lueurs, fonds de boutons, gros titres. **Jamais en texte courant** |
| `#A64BEB` violet | 4,48:1 | gros titres seulement (échoue de peu à 4,5) |
| `#6E8BFF` bleu | 6,31:1 | texte et liens OK |
| `#C58CF2` violet clair | 7,8:1 | texte d'accent OK |
| `#8FB0FF` bleu clair | 9,11:1 | texte d'accent OK |
| `#CDC9E7` gris lavande | 12,16:1 | texte secondaire OK |
| Blanc `#FFFFFF` sur bouton `#9535D7` | 5,57:1 | texte de bouton OK |

Vérifie toute nouvelle paire avec `node .claude/skills/direction-visuelle/scripts/contraste.mjs "#texte" "#fond"`.

## Thème clair (pages politique et 404 uniquement)

- Violet `#9535d7` dominant, fonds lavande (`#f6efff`, `#fbf7ff`), texte `#111` et gris `#383a3c`.
- Titres en Montserrat (700 à 800), texte courant en Poppins.
- Ombres légères teintées de violet (ex. `0 14px 40px rgba(61, 22, 87, 0.1)`).

## Partout

- Beaucoup d'espace, une idée par section.
- Mobile d'abord : vérifie chaque changement en mobile (390 px) et desktop (1440 px), encoche iPhone comprise.
- **Majuscules** : réservées aux titres de section de l'accueil et du contact, aux petits sur-titres et étiquettes, aux boutons et aux liens de navigation, toujours avec un espacement de lettres élargi. Applique-les en CSS (`text-transform: uppercase`), jamais tapées en dur dans les textes FR/EN. Pas de majuscules sur les grands titres (h1), les titres des études de cas ni les paragraphes.
- À éviter : couleurs hors palette, icônes génériques, emoji décoratifs, Inter/Roboto/Arial, titres vagues (« Mes services », « Bienvenue »), rangées de trois cartes identiques sans raison.
- Accessibilité (WCAG 2.2 AA) : texte ≥ 4,5:1, gros texte et éléments d'interface ≥ 3:1, texte alternatif sur chaque image, focus visible sur fond sombre, navigation au clavier, animations coupées si `prefers-reduced-motion`.
