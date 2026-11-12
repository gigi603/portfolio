<script setup lang="ts">
import BaseButton from './BaseButton.vue'

// Demo-only shortcut, clearly labelled (dashed blue box), so a visitor in a hurry can skip ahead
defineProps<{ title: string; text: string; action: string }>()
const emit = defineEmits<{ run: [] }>()
</script>

<template>
  <aside class="shortcut">
    <p><b>{{ title }}</b> {{ text }}</p>
    <BaseButton variant="ghost" @click="emit('run')">{{ action }}</BaseButton>
  </aside>
</template>

<style scoped>
.shortcut { margin-top: 24px; padding: 18px 20px; border-radius: 14px; border: 2px dashed #9ccaf7; background: #f5faff; display: flex; gap: 16px; align-items: center; justify-content: space-between; flex-wrap: wrap; font-size: 14px; line-height: 1.6; }
.shortcut p { flex: 1 1 300px; }
</style>
