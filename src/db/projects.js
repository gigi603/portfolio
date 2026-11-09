// Texts for each project live in src/i18n (projects.<id>)
const projects = [
  { 
    id: '4', 
    name: "Unfate",
    // Shown first on a full-width card in the project grid
    featured: true,
    url_website:"",
    // Figma prototype, flow « 1 · Landing (desktop) »; the file must be shared as « Anyone with the link can view »
    prototype_url: "https://www.figma.com/proto/1uOzOEze6fvcB7TqYQsuZZ/unfate?node-id=2-56&starting-point-node-id=2%3A56&scaling=scale-down-width&content-scaling=fixed&show-proto-sidebar=1",
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
