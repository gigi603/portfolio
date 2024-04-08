const projects = [
  { 
    id: '1', 
    name: "SPCoach",
    description: "Sophie Pratt is a freelance coach with a diploma in psychopractice. She offers coaching and therapy services for individuals and companies to improve self-confidence and implement strategies for better communication in companies or in everyday life. ",
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
    name: "Atypikhouse",
    description: "Atypikhouse is an atypical accommodation rental platform. You'll find the change of scenery and tranquillity you need.",
    url_website:'',
    img:require("@/assets/images/projects/vignette-atypikhouse.png"),
    images: [
      { src:require("@/assets/images/projects/Atypikhouse/Atypikhouse-home-desktop.png") },
      { src:require("@/assets/images/projects/Atypikhouse/Atypikhouse-home-mobile.png") },
    ],
  },
  { 
    id: '3', 
    name: "Unfate",
    description: "Unfate is a learning platform that aims to teach a subject as clearly and comprehensively as possible. Many people are unable to find all the information on a single site and have to surf the web to find it here and there. Unfate aims to offer the best courses so that people don't have to look elsewhere for lack of information. One of the special features of this platform is that courses are purchased via cryptocurrencies.",
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