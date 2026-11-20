<script setup lang="ts">
import UnfateLogo from '@/shared/ui/UnfateLogo.vue'
import { faTrophy } from '@/shared/icons'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Certificate (design B): course visual on the left with the medal, details on the right.
// Order follows certificate best practice: name, then course, then date / score / number.
defineProps<{ name: string; courseTitle: string; score: number; date: string; image: string; number: string }>()
</script>

<template>
  <section class="certificate" :aria-label="t('exam.certificate')">
    <div class="band" :style="{ backgroundImage: `url(${image})` }">
      <span class="medal"><FontAwesomeIcon :icon="faTrophy" /></span>
      <p class="band-title">{{ t('exam.certificate') }}</p>
    </div>
    <div class="body">
      <UnfateLogo :size="26" />
      <p class="muted awarded">{{ t('exam.awardedTo') }}</p>
      <h1 class="name" tabindex="-1" data-page-heading>{{ name }}</h1>
      <p class="muted">{{ t('exam.forCompleting') }}</p>
      <p class="course">{{ courseTitle }}</p>
      <dl class="facts">
        <div><dt>{{ t('exam.certDate') }}</dt><dd>{{ date }}</dd></div>
        <div><dt>{{ t('exam.certScore') }}</dt><dd>{{ score }}/100</dd></div>
        <div><dt>{{ t('exam.certNumber') }}</dt><dd>{{ number }}</dd></div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.certificate { display: grid; grid-template-columns: 240px 1fr; background: #fff; border-radius: var(--uf-radius); overflow: hidden; box-shadow: 0 10px 30px rgb(20 20 43 / 8%); }
.band { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; padding: 32px 20px; background-size: cover; background-position: center; color: #fff; text-align: center; }
.medal { display: grid; place-items: center; width: 72px; height: 72px; border-radius: 50%; background: rgb(255 255 255 / 25%); box-shadow: 0 0 0 6px rgb(255 255 255 / 35%); font-size: 30px; backdrop-filter: blur(6px); }
.band-title { font-size: 19px; font-weight: 800; line-height: 1.25; text-shadow: 0 1px 6px rgb(0 0 0 / 25%); max-width: 160px; }
.body { padding: clamp(26px, 4vw, 44px) clamp(22px, 4vw, 48px); }
.muted { color: var(--uf-muted); }
.awarded { margin-top: 24px; }
.name { font-size: clamp(30px, 4vw, 42px); font-weight: 800; line-height: 1.15; margin: 4px 0 12px; }
.course { font-size: clamp(18px, 2vw, 21px); font-weight: 700; margin: 4px 0 26px; }
.facts { display: flex; flex-wrap: wrap; gap: 14px 0; }
.facts div { padding: 0 24px; border-left: 1px solid var(--uf-line); }
.facts div:first-child { padding-left: 0; border-left: 0; }
dt { order: 2; color: var(--uf-muted); font-size: 13px; }
dd { margin: 0; font-weight: 700; }
.facts div { display: flex; flex-direction: column; }
@media (max-width: 760px) {
  .certificate { grid-template-columns: 1fr; }
  .band { flex-direction: row; padding: 20px; }
  .medal { width: 52px; height: 52px; font-size: 22px; }
  .facts { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .facts div { padding: 0; border-left: 0; }
}
</style>
