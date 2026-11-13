// Texts for each project live in src/i18n (projects.<id>)
const projects = [
  { 
    id: '4', 
    name: "Unfate",
    // Shown first on a full-width card in the project grid
    featured: true,
    sections: ['context', 'challenge', 'decisions', 'evolution', 'outcome', 'retro'],
    url_website:"",
    // Coded demo of the V2: separate Vue 3 app in apps/unfate-demo, built into public/demo/unfate + recordings in public/videos.
    // One recording per language: {locale} becomes fr or en.
    demo: {
      path: '/demo/unfate/',
      video: '/videos/unfate-demo-{locale}.mp4',
      poster: '/videos/unfate-demo-{locale}.jpg',
      videoMobile: '/videos/unfate-demo-mobile-{locale}.mp4',
      posterMobile: '/videos/unfate-demo-mobile-{locale}.jpg',
    },
    // V1 (with the founder) next to V2 (rebuilt with Claude in Figma), shown inside the "evolution" section
    evolution: {
      pairs: [
        { key: 'lesson', before: require("@/assets/images/projects/unfate/v1-lecon.webp"), after: require("@/assets/images/projects/unfate/v2-lecon.webp") },
        { key: 'quiz', before: require("@/assets/images/projects/unfate/v1-quiz.webp"), after: require("@/assets/images/projects/unfate/v2-quiz.webp") },
        { key: 'certificate', before: require("@/assets/images/projects/unfate/v1-certificat.webp"), after: require("@/assets/images/projects/unfate/v2-certificat.webp") },
      ],
      extras: [
        { key: 'system', src: require("@/assets/images/projects/unfate/v2-fondations.webp") },
      ],
    },
    img:require("@/assets/images/projects/vignette-unfate.webp"),
    images: [
      // V2 screens, captured from the coded demo
      { key: 'login', src:require("@/assets/images/projects/unfate/gallery/connexion.webp") },
      { key: 'catalog', src:require("@/assets/images/projects/unfate/gallery/catalogue.webp") },
      { key: 'course', src:require("@/assets/images/projects/unfate/gallery/cours.webp") },
      { key: 'lesson', src:require("@/assets/images/projects/unfate/gallery/lecon.webp") },
      { key: 'examIntro', src:require("@/assets/images/projects/unfate/gallery/intro-examen.webp") },
      { key: 'question', src:require("@/assets/images/projects/unfate/gallery/question.webp") },
      { key: 'score', src:require("@/assets/images/projects/unfate/gallery/score.webp") },
      { key: 'certificate', src:require("@/assets/images/projects/unfate/gallery/certificat.webp") },
    ],
  },
  { 
    id: '1', 
    name: "SPCoach",
    sections: ['context', 'challenge', 'decisions', 'outcome', 'retro'],
    img:require("@/assets/images/projects/vignette-spcoach.webp"),
    url_website: "http://spcoach.fr/",
    images: [
      { key: 'intro', src:require("@/assets/images/projects/gallery/spcoach-intro.webp") },
      { key: 'pricing', src:require("@/assets/images/projects/gallery/spcoach-tarifs.jpg") },
      { key: 'confirmation', src:require("@/assets/images/projects/SPCoach/page-de-confirmation-min.png") },
    ],
  },
  { 
    id: '2', 
    name: "Melodie Yeremian",
    sections: ['context', 'challenge', 'decisions', 'outcome', 'retro'],
    img:require("@/assets/images/projects/vignette-melodieyeremian.webp"),
    url_website: "https://melodieyeremian.com/",
    images: [
      { key: 'services', src:require("@/assets/images/projects/gallery/melodie-prestations.jpg") },
      { key: 'pricing', src:require("@/assets/images/projects/gallery/melodie-tarifs.webp") },
      { key: 'shop', src:require("@/assets/images/projects/gallery/melodie-boutique.webp") },
    ],
  }
]

export default projects
