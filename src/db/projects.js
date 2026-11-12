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
        { key: 'login', before: require("@/assets/images/projects/unfate/v1-connexion.webp"), after: require("@/assets/images/projects/unfate/v2-connexion.webp") },
        { key: 'register', before: require("@/assets/images/projects/unfate/v1-inscription.webp"), after: require("@/assets/images/projects/unfate/v2-inscription.webp") },
      ],
      extras: [
        { key: 'system', src: require("@/assets/images/projects/unfate/v2-fondations.webp") },
        { key: 'lesson', tall: true, src: require("@/assets/images/projects/unfate/v2-lecon-4.webp") },
      ],
    },
    img:require("@/assets/images/projects/vignette-unfate.webp"),
    images: [
      { key: 'login', src:require("@/assets/images/projects/Login.svg") },
      { key: 'settings', src:require("@/assets/images/projects/Settings.svg") },
      { key: 'practice', src:require("@/assets/images/projects/Practice.svg") },
      { key: 'examInstructions', src:require("@/assets/images/projects/Exam_Instruction.svg") },
      { key: 'nextQuestion', src:require("@/assets/images/projects/Exam_next_question.svg") },
      { key: 'examPassed', src:require("@/assets/images/projects/Exam_Success.svg") },
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
