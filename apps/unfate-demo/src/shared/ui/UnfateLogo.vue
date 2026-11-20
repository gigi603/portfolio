<script setup lang="ts">
// The real Unfate logo, exported from the Figma file (component Marque/Logo), not redrawn.
import logoUrl from '@/shared/assets/unfate-logo.svg'

withDefaults(defineProps<{ size?: number }>(), { size: 30 })
</script>

<template>
  <img class="logo" :src="logoUrl" alt="Unfate" :height="size + 2" :style="{ height: `${size + 2}px` }" />
</template>

<style scoped>
.logo { display: block; width: auto; }
</style>
