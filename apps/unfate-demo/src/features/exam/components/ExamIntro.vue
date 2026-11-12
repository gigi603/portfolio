<script setup lang="ts">
import BaseButton from '@/shared/ui/BaseButton.vue'
import confetti from '@/assets/images/exam-confetti.webp'
import { faCircleArrowLeft, faCircleArrowRight, faCircleCheck, faRotateLeft } from '@/shared/icons'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

withDefaults(defineProps<{ questionCount: number; passMark: number; resumeAt?: number | null }>(), { resumeAt: null })
const emit = defineEmits<{ start: []; resume: []; back: [] }>()
</script>

<template>
  <div class="card intro">
    <h1 class="big-title" tabindex="-1" data-page-heading>{{ t('exam.title') }}</h1>
    <img :src="confetti" alt="" class="intro-img" />
    <p class="lead"><span class="text-blue">{{ t('exam.congrats') }}</span> {{ t('exam.intro', { n: questionCount }) }}</p>
    <i18n-t keypath="exam.passIntro" tag="p" class="lead" scope="global">
      <template #score><span class="text-blue">{{ t('exam.passScore', { mark: passMark }) }}</span></template>
      <template #certificate><span class="text-blue">{{ t('exam.certificateWord') }}</span></template>
    </i18n-t>
    <p v-if="resumeAt" class="lead resume-note"><b>{{ t('exam.resumeAt', { n: resumeAt, total: questionCount }) }}</b></p>
  </div>
  <div class="actions actions-split">
    <template v-if="resumeAt">
      <BaseButton variant="secondary" @click="emit('start')"><FontAwesomeIcon :icon="faRotateLeft" /> {{ t('exam.restart') }}</BaseButton>
      <BaseButton @click="emit('resume')">{{ t('exam.resume') }} <FontAwesomeIcon :icon="faCircleArrowRight" /></BaseButton>
    </template>
    <template v-else>
      <BaseButton variant="secondary" @click="emit('back')"><FontAwesomeIcon :icon="faCircleArrowLeft" /> {{ t('exam.previous') }}</BaseButton>
      <BaseButton @click="emit('start')">{{ t('exam.start') }} <FontAwesomeIcon :icon="faCircleCheck" /></BaseButton>
    </template>
  </div>
</template>

<style scoped>
.intro { text-align: center; }
.big-title { font-size: clamp(26px, 3.4vw, 34px); font-weight: 800; margin-bottom: 20px; }
.intro-img { width: 100%; height: 170px; object-fit: cover; border-radius: 12px; }
.lead { text-align: left; margin-top: 16px; font-size: 17px; line-height: 1.75; }
.lead .text-blue { font-weight: 600; }
</style>
