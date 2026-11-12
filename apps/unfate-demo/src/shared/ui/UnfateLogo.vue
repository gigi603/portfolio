<script setup lang="ts">
withDefaults(defineProps<{ size?: number; label?: boolean }>(), { size: 30, label: true })
</script>

<template>
  <span class="logo">
    <svg :width="size" :height="size" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d="M3 9.5c3.2-3.4 6.4-4 9.6-1.6l6.8 9.6c2.4 3.4 5 3.6 7.6.4V4.6c.9-.6 1.9-.9 2.9-1V25c-3.6 4.2-7.6 4.3-10.8-.1l-6.6-9.3c-2.2-3.1-4.9-3.2-7.4-.4v13.5c-.7.5-1.4.8-2.1.9V9.5z" fill="currentColor" />
    </svg>
    <span v-if="label" class="logo-text">Unfate</span>
  </span>
</template>

<style scoped>
.logo { display: inline-flex; align-items: center; gap: 8px; color: #111; }
.logo-text { font-weight: 800; font-size: 21px; letter-spacing: -0.2px; }
</style>
