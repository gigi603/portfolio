---
paths:
  - "src/**/*.vue"
  - "src/index.css"
  - "tailwind.config.js"
---

# Style visuel du portfolio

> **Mise à jour du 20/11/2026 (accord de Gilbert)** : l'accueil, la navigation et le contact passent en thème sombre « néon » : fond `#0D0B17`, cadre `#050409` avec un trait violet fin et une navigation en encoche (inspirée de greymac.com), police Urbanist, dégradé violet `#9535D7` → bleu électrique `#6E8BFF`, illustrations de danse en trait de néon. Depuis le 20/11/2026 au soir, les études de cas (pages projet) passent aussi en thème sombre néon, sur le modèle des maquettes /mnt/project-files/design/builda/etude-*. Le style clair ci-dessous ne vaut plus que pour les autres pages (politique, 404).

Garde le style actuel. Ne change pas de direction visuelle sans l'accord de Gilbert.

- **Couleur dominante : violet `#9535d7`** pour les boutons, liens, états actifs et le mot clé des titres. Fonds clairs lavande (`#f6efff`, `#fbf7ff`), texte quasi noir (`#111`) et gris (`#383a3c`).
- **Formes arrondies** : boutons en pilule (`border-radius: 9999px`), cartes et visuels entre 18 et 32 px.
- **Typographie** : titres en Montserrat (700 à 800), texte courant en Poppins. Aucune autre police.
- **Profondeur douce** : ombres légères teintées de violet (ex. `0 14px 40px rgba(61, 22, 87, 0.1)`), dégradés seulement dans la famille violet-rose existante.
- **Beaucoup d'espace**, une idée par section.
- Mobile d'abord : vérifie chaque changement en largeur mobile et desktop.

À éviter : couleurs hors palette, icônes génériques, emoji décoratifs, Inter/Roboto/Arial, libellés tout en majuscules, titres vagues (« Mes services », « Bienvenue »), rangées de trois cartes identiques sans raison.

Accessibilité : contraste suffisant (WCAG 2.2 AA), texte alternatif sur chaque image, focus visible, navigation au clavier.
