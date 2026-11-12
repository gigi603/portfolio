<script setup lang="ts">
import { computed } from 'vue'

// Continuous progress bar on images (Figma: course card and course banner):
// a translucent white track, filled in solid white.
const props = defineProps<{ value: number; total: number; label: string }>()
const percent = computed(() => (props.total > 0 ? Math.min(100, Math.round((props.value / props.total) * 100)) : 0))
</script>

<template>
  <div class="progress-line" role="progressbar" :aria-label="label" aria-valuemin="0" :aria-valuemax="total" :aria-valuenow="value" :aria-valuetext="`${value} of ${total}`">
    <span class="fill" :style="{ width: `${percent}%` }"></span>
  </div>
</template>

<style scoped>
.progress-line { position: relative; width: 184px; max-width: 100%; height: 14px; border-radius: 9px; overflow: hidden; background: rgb(255 255 255 / 35%); }
.fill { position: absolute; inset: 0 auto 0 0; background: #fff; transition: width .4s ease; }
</style>
