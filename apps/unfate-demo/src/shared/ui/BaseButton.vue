<script setup lang="ts">
// Buttons of the Unfate design system (Figma components Bouton/Grand, Bouton/Verre…)
withDefaults(defineProps<{
  variant?: 'primary' | 'success' | 'secondary' | 'outline' | 'ghost' | 'glass'
  size?: 'md' | 'lg'
  block?: boolean
  type?: 'button' | 'submit'
  disabled?: boolean
}>(), { variant: 'primary', size: 'md', block: false, type: 'button', disabled: false })
</script>

<template>
  <button :type="type" :disabled="disabled" class="btn" :class="[`btn-${variant}`, `btn-${size}`, { 'btn-block': block }]">
    <slot />
  </button>
</template>

<style scoped>
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 48px; padding: 0 24px; border-radius: 12px; font-weight: 700; font-size: 16px; transition: background-color .15s, border-color .15s, box-shadow .15s; }
.btn:disabled { cursor: not-allowed; }
.btn-lg { min-height: 56px; font-size: 17px; }
.btn-block { width: 100%; }
.btn-primary { background: var(--uf-blue); color: #fff; box-shadow: 0 8px 20px rgb(30 150 252 / 28%); }
.btn-primary:hover:not(:disabled) { background: var(--uf-blue-dark); }
.btn-success { background: var(--uf-green-strong); color: #fff; box-shadow: 0 8px 20px rgb(31 157 102 / 28%); }
.btn-success:hover:not(:disabled) { background: var(--uf-green-dark); }
.btn-primary:disabled, .btn-success:disabled { background: #c8cedb; color: #fff; box-shadow: none; }
.btn-secondary { background: var(--uf-bg); border: 2px solid #c7cbd8; color: var(--uf-text); }
.btn-secondary:hover { border-color: var(--uf-muted); }
.btn-outline { background: #fff; border: 1.5px solid #d6d8e7; font-weight: 600; font-size: 14px; }
.btn-outline:hover { border-color: var(--uf-blue); }
.btn-ghost { background: #fff; border: 2px solid var(--uf-blue); color: var(--uf-blue-dark); min-height: 42px; font-size: 14px; }
.btn-glass { min-height: 0; padding: 12px 16px; border-radius: 8px; background: rgb(255 255 255 / 28%); backdrop-filter: blur(8px); color: #fff; font-weight: 800; text-shadow: 0 1px 2px rgb(0 0 0 / 15%); }
.btn-glass:hover:not(:disabled) { background: rgb(255 255 255 / 40%); }
.btn-glass:disabled { cursor: default; }
</style>
