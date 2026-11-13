<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { CourseOutline, useCourse, useProgressStore } from '@/features/course'
import { faChevronDown, faListCheck, faTrophy, faXmark } from '@/shared/icons'
import { useI18n } from 'vue-i18n'

// Progress on tablets and phones, where the right panel is hidden.
// Lesson and exam: a compact strip (steps done + segments) that opens the full outline in a bottom sheet.
// The course page already lists the chapters, and the catalogue and settings pages show the progress card
// under their title, so the strip is only added on lessons and the exam.
const { t } = useI18n()
const route = useRoute()
const progress = useProgressStore()
const { course } = useCourse()

const learning = computed(() => ['lesson', 'exam'].includes(String(route.name)))

const sheet = ref<HTMLDialogElement | null>(null)

function open(): void {
  sheet.value?.showModal()
}
function close(): void {
  sheet.value?.close()
}
// Tapping the dimmed area outside the sheet closes it
function onBackdrop(event: MouseEvent): void {
  if (event.target === sheet.value) close()
}
// Choosing a lesson in the outline changes the page: the sheet closes by itself
watch(() => route.fullPath, close)
</script>

<template>
  <div v-if="learning" class="mobile-progress">
    <button type="button" class="strip" aria-haspopup="dialog" :aria-label="t('side.openOutline')" @click="open">
      <FontAwesomeIcon :icon="faListCheck" class="strip-icon" />
      <span class="strip-text">
        <span class="strip-title">{{ course.title }}</span>
        <span class="strip-count">{{ t('course.stepsCompleted', { done: progress.stepsDone, total: progress.totalSteps }) }} <FontAwesomeIcon :icon="faTrophy" :class="progress.examPassed ? 'text-green' : 'text-soft'" /></span>
        <span class="segments" aria-hidden="true"><span v-for="n in progress.totalSteps" :key="n" :class="{ 'is-on': n <= progress.stepsDone }"></span></span>
      </span>
      <span class="strip-action">{{ t('side.showOutline') }} <FontAwesomeIcon :icon="faChevronDown" /></span>
    </button>
    <dialog ref="sheet" class="sheet" :aria-label="t('course.outline')" @click="onBackdrop">
      <div class="sheet-inner">
        <div class="sheet-head">
          <span class="handle" aria-hidden="true"></span>
          <p class="sheet-title">{{ t('course.outline') }}</p>
          <button type="button" class="close" :aria-label="t('side.closeOutline')" @click="close"><FontAwesomeIcon :icon="faXmark" /></button>
        </div>
        <CourseOutline />
      </div>
    </dialog>
  </div>
</template>

<style scoped>
.mobile-progress { display: none; }
@media (max-width: 1180px) {
  .mobile-progress { display: block; margin-bottom: 20px; }
}
.strip { display: flex; align-items: center; gap: 12px; width: 100%; padding: 12px 14px; background: #fff; border: 1px solid var(--uf-line); border-radius: 14px; font: inherit; text-align: left; color: var(--uf-text); box-shadow: 0 6px 18px rgb(20 20 43 / 6%); }
.strip:hover { border-color: var(--uf-blue); }
.strip-icon { flex: none; font-size: 18px; color: var(--uf-blue-dark); }
.strip-text { flex: 1; min-width: 0; display: grid; gap: 4px; }
.strip-title { font-weight: 700; font-size: 14px; line-height: 1.3; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.strip-count { display: flex; gap: 6px; align-items: center; font-size: 11px; font-weight: 600; letter-spacing: .6px; color: var(--uf-muted); }
.segments { display: grid; grid-template-columns: repeat(6, 1fr); gap: 3px; }
.segments span { height: 5px; background: #e1e4ec; border-radius: 3px; }
.segments span.is-on { background: var(--uf-green); }
.strip-action { flex: none; display: flex; gap: 6px; align-items: center; font-size: 13px; font-weight: 700; color: var(--uf-blue-dark); }
.strip-action svg { font-size: 11px; }
/* Bottom sheet: modal, closes with the X, Escape, or a tap on the dimmed page */
.sheet { margin: auto auto 0; width: 100%; max-width: 560px; max-height: 85vh; padding: 0; border: 0; border-radius: 20px 20px 0 0; background: #fff; color: var(--uf-text); }
.sheet::backdrop { background: rgb(20 20 43 / 45%); }
.sheet[open] { animation: rise .25s ease-out; }
@keyframes rise { from { transform: translateY(40px); opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .sheet[open] { animation: none; } }
.sheet-inner { padding: 8px 20px 28px; }
.sheet-head { position: sticky; top: 0; z-index: 1; display: flex; align-items: center; justify-content: space-between; padding: 14px 0 12px; margin-bottom: 8px; background: #fff; border-bottom: 1px solid var(--uf-line); }
.handle { position: absolute; top: 2px; left: 50%; width: 40px; height: 4px; margin-left: -20px; border-radius: 2px; background: #d6d8e7; }
.sheet-title { font-weight: 800; font-size: 17px; }
.close { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; background: #f0f1f5; font-size: 18px; color: var(--uf-text); }
.close:hover { background: var(--uf-blue-bg); }
</style>
