// Public API of the exam feature
export { questions, PASS_MARK } from './data/questions'
export type { Question } from './data/questions'
export { useExamStore } from './stores/exam'
export { default as ExamIntro } from './components/ExamIntro.vue'
export { default as ExamQuestion } from './components/ExamQuestion.vue'
export { default as ExamScore } from './components/ExamScore.vue'
export { default as ExamResults } from './components/ExamResults.vue'
export { default as CertificateCard } from './components/CertificateCard.vue'
