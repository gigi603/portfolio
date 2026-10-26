# Portfolio de Gilbert Trinidad

Site personnel de Gilbert Trinidad, Product Designer / Builder à Paris : il présente Gilbert et ses projets (SPCoach, Mélodie Yeremian, Atypikhouse, Unfate). Site en ligne : gilbert-trinidad.com.

Gilbert ne code pas : il dirige Claude, qui écrit tout le code, et il valide chaque livrable. Réponds-lui en français, simplement, sans jargon technique inutile.

## Stack

- Vue 2 + Vue Router (Vue CLI), Tailwind 2 (`@tailwindcss/postcss7-compat`), AOS pour les animations.
- vue-i18n : français par défaut, anglais en option. Textes dans `src/i18n/fr.js` et `src/i18n/en.js`.
- Données des projets : `src/db/projects.js` (images, liens) ; leurs textes sont dans `src/i18n` (`projects.<id>`).
- Formulaire de contact : EmailJS, identifiants dans `.env` (publics par nature, ils finissent dans le bundle).
- Réglages : `src/config.js` (lien de réservation, vide sur `cdi`).
- Déploiement : Vercel, automatique à chaque push sur GitHub, Node 22.x.

## Commandes

- `npm run serve` : aperçu local sur http://localhost:8080
- `npm run build` : build de production (à lancer avant toute publication)
- `npm run lint` : vérification du code

## Branches

- `dev` : branche de travail par défaut. Tout changement va ici.
- `cdi` : version pour les recruteurs.
- `freelance` : ancienne version freelance, gardée telle quelle. Ne pas modifier.
- `main` : production (gilbert-trinidad.com). Jamais de push ni de fusion sans l'accord explicite de Gilbert.

## Règles de contenu (non négociables)

- N'invente jamais de chiffre, de client, de citation ni de témoignage. S'il manque une info, écris `[À CONFIRMER]` et demande à Gilbert.
- Pas de durée de projet.
- WordPress n'apparaît que sur la page du projet Mélodie.
- Le site ne mentionne jamais une recherche de CDI ni « freelance » dans le titre de Gilbert.
- Sur l'IA : « je dirige l'IA et je vérifie chaque livrable », jamais « l'IA fait tout ».
- Tout texte visible existe en français ET en anglais.

## Style visuel

Le style actuel est conservé : violet `#9535d7` dominant, formes arrondies, titres en Montserrat, texte en Poppins, ombres douces teintées de violet. Détails dans `.claude/rules/style-visuel.md`.

## Façon de travailler

- Avant de produire un travail (design, texte, code, audit) : au moins 3 recherches web et 3 pages lues sur les bonnes pratiques actuelles, sources citées.
- Montre le résultat à Gilbert (capture ou aperçu) avant de le considérer comme fini.
- Ne versionne aucun secret ni info privée : le dépôt est public.
