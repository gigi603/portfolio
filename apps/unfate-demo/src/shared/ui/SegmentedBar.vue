<script setup lang="ts">
// Progress split into one segment per lesson (Figma: "Barre segmentée (leçons)").
// Colours come from the parent through --bar-track and --bar-fill.
defineProps<{ value: number; total: number; label: string }>()
</script>

<template>
  <div class="segmented-bar" role="progressbar" :aria-label="label" aria-valuemin="0" :aria-valuemax="total" :aria-valuenow="value" :aria-valuetext="`${value} of ${total}`">
    <span v-for="n in total" :key="n" :class="{ 'is-on': n <= value }"></span>
  </div>
</template>

<style scoped>
.segmented-bar { display: grid; grid-template-columns: repeat(v-bind(total), 1fr); gap: var(--bar-gap, 3px); }
.segmented-bar span { height: var(--bar-height, 7px); border-radius: var(--bar-radius, 4px); background: var(--bar-track, rgb(255 255 255 / 30%)); }
.segmented-bar span.is-on { background: var(--bar-fill, currentColor); }
</style>
