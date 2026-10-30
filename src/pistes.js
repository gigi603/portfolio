// Maquettes d'identité danse (Léa) : ?piste=a|b|c sur l'accueil. Ne pas fusionner tel quel.
export const PISTE = (new URLSearchParams(window.location.search).get('piste') || '').toLowerCase()

export const PISTES = {
  a: {
    name: 'Piste A · Flow',
    icons: {
      chips: { research: 'casque', wireframes: 'flow', prototyping: 'basket', ui: 'egaliseur', ai: 'vinyle', launch: 'projecteur' },
      skills: ['casque', 'flow', 'projecteur'],
      eyebrows: { work: 'vinyle', testimonials: 'casque', skills: 'flow', about: 'basket' },
      about: ['flow', 'basket'],
    },
    plates: [
      { icon: 'casque', title: 'Écouter le son', text: 'Avant de bouger, on écoute.' },
      { icon: 'flow', title: 'Trouver le flow', text: 'Le mouvement qui ne s\'arrête pas.' },
      { icon: 'basket', title: 'Poser le pas', text: 'Chaque appui compte.' },
      { icon: 'vinyle', title: 'Rejouer la boucle', text: 'On recommence jusqu\'à ce que ça tombe juste.' },
    ],
    lead: 'Je conçois des produits web qui ont <em class="flow-word">du flow</em> : des parcours fluides pour vos utilisateurs, mis en ligne avec une équipe d\'agents Claude que je dirige. Je vérifie chaque livrable.',
    eyebrows: { work: 'Des parcours qui coulent', testimonials: 'Retours clientes', skills: 'Mon flow de travail', about: 'Le rythme, hors écran' },
    skillLabels: null,
    messages: {
      skills: { subtitle: 'Du problème au produit en ligne, sans casser le flow.' },
      contact: { title: 'Un projet qui manque de flow ?' },
    },
    dance: {
      title: 'Le flow, je l\'ai appris en dansant',
      text: 'Le hip-hop m\'a appris à sentir quand un mouvement accroche. C\'est le même réflexe quand je teste un parcours : je cherche l\'endroit où l\'utilisateur perd le rythme.',
      cards: null,
    },
  },
  b: {
    name: 'Piste B · Chorégraphe',
    icons: {
      chips: { research: 'casque', wireframes: 'pas', prototyping: 'metronome', ui: 'egaliseur', ai: 'cypher', launch: 'projecteur' },
      skills: ['casque', 'pas', 'projecteur'],
      eyebrows: { work: 'projecteur', testimonials: 'micro', skills: 'pas', about: 'basket' },
      about: ['pas', 'projecteur'],
      cards: ['metronome', 'vinyle', 'cypher'],
    },
    plates: null,
    lead: 'Je conçois des produits web qui ont <em class="flow-word">du flow</em>. Je chorégraphie une équipe d\'agents Claude : je pose le rythme, l\'IA exécute, je vérifie chaque pas avant la mise en ligne.',
    count: '5 · 6 · 7 · 8',
    eyebrows: { work: 'Le showcase', testimonials: 'Après le show', skills: 'La choré en trois temps', about: 'Hors scène' },
    skillLabels: ['Temps 1 · Écouter le son', 'Temps 2 · Monter la choré', 'Temps 3 · Envoyer sur scène'],
    messages: {
      about: { p1End: ' à Paris, avec un passé de développeur web. Je travaille avec un crew d\'agents Claude que j\'ai créé : recherche, design, rédaction, code et tests. Je fixe la direction, je tranche et je vérifie chaque livrable avant qu\'il parte en ligne.' },
      contact: { title: 'On se lance ? 5, 6, 7, 8.' },
    },
    dance: {
      title: 'Ce que la danse m\'a appris sur le design',
      text: null,
      cards: [
        { pose: 'toprock', title: 'La musicalité', text: 'Sentir le bon moment. Une interaction réussie tombe sur le temps, ni trop tôt ni trop tard.' },
        { pose: 'freeze', title: 'Le freestyle', text: 'S\'adapter quand le son change. Quand un test contredit la maquette, je rejoue la séquence.' },
        { pose: 'final', title: 'Le cypher', text: 'Montrer son passage au cercle et écouter le retour. La critique fait partie de la choré.' },
      ],
    },
  },
  c: {
    name: 'Piste C · Cypher',
    icons: {
      chips: { research: 'micro', wireframes: 'pas', prototyping: 'vinyle', ui: 'egaliseur', ai: 'cypher', launch: 'couronne' },
      skills: ['micro', 'enceinte', 'couronne'],
      eyebrows: { work: 'projecteur', testimonials: 'cypher', skills: 'couronne', about: 'casquette' },
      about: ['micro', 'cypher'],
    },
    plates: [
      { icon: 'micro', title: 'Prendre le micro', text: 'Annoncer le passage.' },
      { icon: 'cypher', title: 'Entrer dans le cercle', text: 'Chacun son tour au centre.' },
      { icon: 'egaliseur', title: 'Caler sur le beat', text: 'Le détail tombe sur le temps.' },
      { icon: 'couronne', title: 'Gagner le round', text: 'Le retour du cercle décide.' },
    ],
    lead: 'Je conçois des produits web : je freestyle sur les idées, puis je cale chaque détail sur le beat. Mon crew d\'agents Claude livre, je vérifie chaque passage.',
    eyebrows: { work: 'Le showcase', testimonials: 'Ce qu\'en dit le cercle', skills: 'Mes trois rounds', about: 'Hors du cercle' },
    skillLabels: ['Round 1', 'Round 2', 'Round 3'],
    messages: {
      skills: { subtitle: 'Trois rounds, du premier beat au produit en ligne.' },
      contact: { title: 'Entre dans le cercle.' },
    },
    dance: {
      title: 'Le cypher',
      text: 'Le cercle où chacun passe au centre, puis écoute les autres. C\'est comme ça que je travaille avec mon crew d\'agents : chacun fait son passage, je donne le retour.',
      cards: null,
    },
  },
}

// Piste A allégée : la danse reste dans le hero, la méthode, la section « Hors écran » et le contact
PISTES.l = {
  ...PISTES.a,
  name: 'Piste A · allégée',
  light: true,
  eyebrows: { ...PISTES.a.eyebrows },
}

// Variante de « Ce que je fais » : ?methode=icones | discussion | fil
// La piste A allégée prend le fil d'Ariane par défaut (choix de Gilbert, 30/10)
export const METHODE = (new URLSearchParams(window.location.search).get('methode') || (PISTE === 'l' ? 'fil' : '')).toLowerCase()

export const CURRENT = PISTES[PISTE] || null

export function applyPisteMessages(i18n) {
  if (CURRENT) i18n.mergeLocaleMessage('fr', CURRENT.messages)
}
