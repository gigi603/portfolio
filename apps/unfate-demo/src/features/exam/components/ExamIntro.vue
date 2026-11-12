<script setup lang="ts">
import BaseButton from '@/shared/ui/BaseButton.vue'
import confetti from '@/assets/images/exam-confetti.webp'
import { faCircleArrowLeft, faCircleCheck } from '@/shared/icons'

defineProps<{ questionCount: number; passMark: number }>()
const emit = defineEmits<{ start: []; back: [] }>()
</script>

<template>
  <div class="card intro">
    <h1 class="big-title" tabindex="-1" data-page-heading>Exam</h1>
    <img :src="confetti" alt="" class="intro-img" />
    <p class="lead"><span class="text-blue">Congratulations!</span> You finished all the lessons and learned a lot. Now is the time to test your knowledge with an exam composed of {{ questionCount }} questions. They cover the 5 chapters and come in a new random order each time.</p>
    <p class="lead">If you <span class="text-blue">score {{ passMark }} or above</span>, you get your <span class="text-blue">certificate</span>.</p>
  </div>
  <div class="actions actions-split">
    <BaseButton variant="secondary" @click="emit('back')"><FontAwesomeIcon :icon="faCircleArrowLeft" /> Previous lesson</BaseButton>
    <BaseButton @click="emit('start')">Take the exam <FontAwesomeIcon :icon="faCircleCheck" /></BaseButton>
  </div>
</template>

<style scoped>
.intro { text-align: center; }
.big-title { font-size: clamp(26px, 3.4vw, 34px); font-weight: 800; margin-bottom: 20px; }
.intro-img { width: 100%; height: 170px; object-fit: cover; border-radius: 12px; }
.lead { text-align: left; margin-top: 16px; font-size: 17px; line-height: 1.75; }
.lead .text-blue { font-weight: 600; }
</style>
