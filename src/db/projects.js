// Texts for each project live in src/i18n (projects.<id>)
const projects = [
  { 
    id: '1', 
    name: "SPCoach",
    sections: ['context', 'challenge', 'approach', 'solution', 'outcome'],
    img:require("@/assets/images/projects/vignette-spcoach.png"),
    url_website: "http://spcoach.fr/",
    images: [
      { key: 'intro', src:require("@/assets/images/projects/gallery/spcoach-intro.jpg") },
      { key: 'pricing', src:require("@/assets/images/projects/gallery/spcoach-tarifs.jpg") },
      { key: 'confirmation', src:require("@/assets/images/projects/SPCoach/page-de-confirmation-min.png") },
    ],
  },
  { 
    id: '2', 
    name: "Melodie Yeremian",
    sections: ['context', 'challenge', 'approach', 'solution', 'outcome'],
    img:require("@/assets/images/projects/vignette-melodieyeremian.png"),
    url_website: "https://melodieyeremian.com/",
    images: [
      { key: 'services', src:require("@/assets/images/projects/gallery/melodie-prestations.jpg") },
      { key: 'pricing', src:require("@/assets/images/projects/gallery/melodie-tarifs.jpg") },
      { key: 'shop', src:require("@/assets/images/projects/gallery/melodie-boutique.jpg") },
    ],
  },
  { 
    id: '3', 
    name: "Atypikhouse",
    url_website:'',
    img:require("@/assets/images/projects/vignette-atypikhouse.png"),
    images: [
      { key: 'homeDesktop', src:require("@/assets/images/projects/gallery/atypikhouse-desktop.jpg") },
      { key: 'homeMobile', device: 'mobile', src:require("@/assets/images/projects/gallery/atypikhouse-mobile.jpg") },
    ],
  },
  { 
    id: '4', 
    name: "Unfate",
    url_website:"",
    img:require("@/assets/images/projects/vignette-unfate.png"),
    images: [
      { key: 'login', src:require("@/assets/images/projects/Login.svg") },
      { key: 'settings', src:require("@/assets/images/projects/Settings.svg") },
      { key: 'practice', src:require("@/assets/images/projects/Practice.svg") },
      { key: 'examInstructions', src:require("@/assets/images/projects/Exam_Instruction.svg") },
      { key: 'nextQuestion', src:require("@/assets/images/projects/Exam_next_question.svg") },
      { key: 'examPassed', src:require("@/assets/images/projects/Exam_Success.svg") },
    ],
  },
]

export default projects