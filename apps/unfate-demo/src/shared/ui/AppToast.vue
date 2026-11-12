<script setup lang="ts">
import { useToast } from '@/shared/composables/useToast'

const { message } = useToast()
</script>

<template>
  <!-- Always-present live region, so screen readers announce every new message -->
  <div class="toast-region" role="status" aria-live="polite">
    <Transition name="toast">
      <p v-if="message" class="toast">{{ message }}</p>
    </Transition>
  </div>
</template>

<style scoped>
.toast-region { position: absolute; z-index: 50; left: 50%; bottom: 24px; transform: translateX(-50%); width: max-content; max-width: calc(100% - 32px); pointer-events: none; }
.toast { background: var(--uf-text); color: #fff; padding: 12px 18px; border-radius: 12px; font-size: 14px; font-weight: 600; text-align: center; box-shadow: 0 10px 30px rgb(20 20 43 / 25%); }
.toast-enter-active, .toast-leave-active { transition: opacity .2s, transform .2s; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(8px); }
@media (max-width: 760px) {
  .toast-region { bottom: auto; top: 12px; }
  .toast-enter-from, .toast-leave-to { transform: translateY(-8px); }
}
</style>
