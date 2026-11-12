<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { LoginForm, LoginShowcase } from '@/features/auth'
import UnfateLogo from '@/shared/ui/UnfateLogo.vue'
import LanguageSwitcher from '@/shared/ui/LanguageSwitcher.vue'

const router = useRouter()
const route = useRoute()

async function enterApp(): Promise<void> {
  const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : null
  await router.push(redirect ?? { name: 'catalog' })
}
</script>

<template>
  <div class="login-page">
    <div class="login-column">
      <div class="login-top">
        <UnfateLogo />
        <LanguageSwitcher />
      </div>
      <LoginForm @success="enterApp" />
    </div>
    <LoginShowcase class="login-showcase" />
  </div>
</template>

<style scoped>
.login-page { display: grid; grid-template-columns: minmax(320px, 47%) 1fr; height: 100%; overflow: auto; }
.login-top { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.login-column { padding: 28px clamp(24px, 7vw, 90px); display: flex; flex-direction: column; gap: 22px; }
@media (max-width: 760px) {
  .login-page { grid-template-columns: 1fr; }
  .login-showcase { display: none; }
  .login-top { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.login-column { padding: 24px 20px 32px; }
}
</style>
