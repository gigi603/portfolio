<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { faCircleArrowRight, faPen, faTrophy } from '@/shared/icons'
import SegmentedBar from '@/shared/ui/SegmentedBar.vue'
import { cardColors } from '../data/catalog'
import { usePreferencesStore } from '../stores/preferences'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{ title: string; image: string; lessonsDone: number; total: number; actionLabel?: string; exam?: { done: number; total: number } | null }>()
// Every lesson done: the exam step appears at the end of the bar. The course moves to "Completed" only once the exam is passed.
const examStep = computed(() => props.total > 0 && props.lessonsDone >= props.total)
const emit = defineEmits<{ continue: [] }>()

const preferences = usePreferencesStore()
const paletteOpen = ref(false)

function pick(id: string): void {
  preferences.setCardColor(id)
  paletteOpen.value = false
}

function closeOnOutsideClick(): void {
  paletteOpen.value = false
}
onMounted(() => document.addEventListener('click', closeOnOutsideClick))
onBeforeUnmount(() => document.removeEventListener('click', closeOnOutsideClick))
</script>

<template>
  <div class="progress-card" :style="{ background: preferences.cardColor.background, color: preferences.cardColor.text }">
    <div class="top">
      <img :src="image" alt="" class="thumb" />
      <div>
        <p class="title">{{ title }}</p>
        <p class="sub">{{ exam ? t('common.examProgress', exam) : examStep ? t('catalog.examToPass') : t('catalog.lessonsCompleted', { done: lessonsDone, total }) }}</p>
      </div>
      <button type="button" class="pencil" :aria-label="t('catalog.changeColor')" :aria-expanded="paletteOpen" @click.stop="paletteOpen = !paletteOpen">
        <FontAwesomeIcon :icon="faPen" />
      </button>
    </div>
    <div class="bar">
      <SegmentedBar class="lessons" :value="lessonsDone" :total="total" :label="t('common.courseProgress')" />
      <span v-if="examStep" class="exam-step"><FontAwesomeIcon :icon="faTrophy" /> {{ exam ? `${exam.done}/${exam.total}` : t('common.exam') }}</span>
    </div>
    <div v-if="paletteOpen" class="palette" @click.stop>
      <button
        v-for="color in cardColors"
        :key="color.id"
        type="button"
        class="swatch"
        :class="{ 'is-on': preferences.cardColorId === color.id }"
        :style="{ background: color.background }"
        :aria-label="t(`catalog.colors.${color.id}`)"
        :aria-pressed="preferences.cardColorId === color.id"
        @click="pick(color.id)"
      ></button>
    </div>
    <button type="button" class="go" @click="emit('continue')">{{ actionLabel ?? (examStep ? t('exam.start') : t('common.continue')) }} <FontAwesomeIcon :icon="faCircleArrowRight" /></button>
  </div>
</template>

<style scoped>
.progress-card { position: relative; border-radius: 14px; padding: 14px; transition: background-color .2s; }
.top { display: flex; gap: 12px; align-items: center; padding-right: 34px; }
.thumb { width: 42px; height: 42px; border-radius: 8px; object-fit: cover; flex: none; }
.title { font-weight: 700; font-size: 13px; line-height: 1.3; }
.sub { font-size: 12px; opacity: .9; margin-top: 2px; }
.pencil { position: absolute; top: 10px; right: 10px; width: 30px; height: 30px; border-radius: 50%; background: rgb(255 255 255 / 25%); color: inherit; display: grid; place-items: center; font-size: 12px; }
.bar { display: flex; align-items: center; gap: 6px; margin: 14px 0 12px; }
.lessons { flex: 1; }
/* Exam step, still to pass: an outlined pill with the trophy, after the 11 lesson segments */
.exam-step { flex: none; display: inline-flex; align-items: center; gap: 5px; padding: 2px 8px; border-radius: 999px; border: 1.5px dashed currentColor; font-size: 11px; font-weight: 700; line-height: 1.4; }
/* Same translucent "glass" button as on the course banners, so it reads as a button.
   Text keeps the card's text colour: white, or dark on the yellow and orange cards for contrast. */
.go { display: inline-flex; gap: 8px; align-items: center; padding: 10px 14px; border-radius: 8px; background: rgb(255 255 255 / 28%); backdrop-filter: blur(8px); font-weight: 800; font-size: 13px; color: inherit; transition: background-color .15s; }
.go:hover { background: rgb(255 255 255 / 40%); }
.palette { position: absolute; z-index: 5; top: 46px; right: 8px; display: flex; gap: 8px; padding: 10px; background: #fff; border-radius: 12px; box-shadow: 0 10px 30px rgb(20 20 43 / 18%); }
.swatch { width: 26px; height: 26px; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 0 0 1px #d6d8e7; }
.swatch.is-on { box-shadow: 0 0 0 2px var(--uf-text); }
</style>
