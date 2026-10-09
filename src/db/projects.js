// Texts for each project live in src/i18n (projects.<id>)
const projects = [
  { 
    id: '1', 
    name: "SPCoach",
    sections: ['context', 'challenge', 'approach', 'solution', 'outcome'],
    img:require("@/assets/images/projects/vignette-spcoach.png"),
    url_website: "http://spcoach.fr/",
    images: [
      { src:require("@/assets/images/projects/SPCoach/intro-min.png") },
      { src:require("@/assets/images/projects/SPCoach/mes-tarifs-min.png") },
      { src:require("@/assets/images/projects/SPCoach/page-de-confirmation-min.png") },

    ],
  },
  { 
    id: '2', 
    name: "Melodie Yeremian",
    sections: ['context', 'challenge', 'approach', 'solution', 'outcome'],
    img:require("@/assets/images/projects/vignette-melodieyeremian.png"),
    url_website: "https://melodieyeremian.com/",
    images: [
      { src:require("@/assets/images/projects/MelodieYeremian/melodieyeremian-boutique.png") },
      { src:require("@/assets/images/projects/MelodieYeremian/melodieyeremian-prestations.png") },
      { src:require("@/assets/images/projects/MelodieYeremian/melodieyeremian-tarifs.png") },

    ],
  },
  { 
    id: '3', 
    name: "Atypikhouse",
    url_website:'',
    img:require("@/assets/images/projects/vignette-atypikhouse.png"),
    images: [
      { src:require("@/assets/images/projects/Atypikhouse/Atypikhouse-home-desktop.png") },
      { src:require("@/assets/images/projects/Atypikhouse/Atypikhouse-home-mobile.png") },
    ],
  },
  { 
    id: '4', 
    name: "Unfate",
    url_website:"",
    img:require("@/assets/images/projects/vignette-unfate.png"),
    images: [
      { src:require("@/assets/images/projects/Login.svg") },
      { src:require("@/assets/images/projects/Settings.svg") },
      { src:require("@/assets/images/projects/Exam_Instruction.svg") },
      { src:require("@/assets/images/projects/Exam_next_question.svg") },
      { src:require("@/assets/images/projects/Exam_Success.svg") },
      { src:require("@/assets/images/projects/Practice.svg") },
    ],
  },
]

export default projects