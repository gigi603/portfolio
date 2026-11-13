<script setup lang="ts">
import { faCircleArrowRight } from '@/shared/icons'
import SegmentedBar from '@/shared/ui/SegmentedBar.vue'
import { useI18n } from 'vue-i18n'

// Right panel before any course is started: a preview of the progress card at 0, with "Get Started",
// so the learner sees what will fill up here.
defineProps<{ title: string; image: string; total: number }>()
const emit = defineEmits<{ start: [] }>()
const { t } = useI18n()
</script>

<template>
  <div class="preview">
    <div class="top">
      <img :src="image" alt="" class="thumb" />
      <div>
        <p class="name">{{ title }}</p>
        <p class="sub">{{ t('catalog.lessonsCompleted', { done: 0, total }) }}</p>
      </div>
    </div>
    <SegmentedBar class="bar" :value="0" :total="total" :label="t('common.courseProgress')" />
    <p class="hint">{{ t('side.empty') }}</p>
    <button type="button" class="go" @click="emit('start')">{{ t('catalog.getStarted') }} <FontAwesomeIcon :icon="faCircleArrowRight" /></button>
  </div>
</template>

<style scoped>
.preview { border-radius: 14px; padding: 14px; background: var(--uf-blue-bg); border: 1px solid #cfe5fb; }
.top { display: flex; gap: 12px; align-items: center; }
.thumb { width: 42px; height: 42px; border-radius: 8px; object-fit: cover; flex: none; }
.name { font-weight: 700; font-size: 13px; line-height: 1.3; }
.sub { font-size: 12px; color: var(--uf-muted); margin-top: 2px; }
.bar { --bar-track: #c9e0f7; margin: 14px 0 10px; }
.hint { font-size: 12px; line-height: 1.45; color: var(--uf-muted); margin-bottom: 12px; }
.go { display: inline-flex; gap: 8px; align-items: center; padding: 10px 14px; border-radius: 8px; background: var(--uf-blue); color: #fff; font-weight: 800; font-size: 13px; box-shadow: 0 6px 16px rgb(30 150 252 / 25%); }
.go:hover { background: var(--uf-blue-dark); }
</style>
