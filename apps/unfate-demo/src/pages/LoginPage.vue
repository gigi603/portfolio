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
      <!-- Decorative light blue circles: they fill the empty space around the centred form -->
      <span class="blob blob-1" aria-hidden="true"></span>
      <span class="blob blob-2" aria-hidden="true"></span>
      <span class="blob blob-3" aria-hidden="true"></span>
      <div class="login-top">
        <UnfateLogo />
        <LanguageSwitcher />
      </div>
      <LoginForm class="login-form-centred" @success="enterApp" />
    </div>
    <LoginShowcase class="login-showcase" />
  </div>
</template>

<style scoped>
.login-page { display: grid; grid-template-columns: minmax(320px, 47%) 1fr; height: 100%; overflow: auto; }
.login-top { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.login-column { position: relative; isolation: isolate; overflow: hidden; padding: 28px clamp(24px, 7vw, 90px); display: flex; flex-direction: column; gap: 22px; }
.login-top, .login-form-centred { position: relative; z-index: 1; }
/* Form centred in its half of the page, on both axes */
.login-form-centred { margin: auto; max-width: 400px; }
.blob { position: absolute; z-index: 0; border-radius: 50%; pointer-events: none; }
.blob-1 { width: 340px; height: 340px; left: -150px; top: -130px; background: #e3f1ff; }
.blob-2 { width: 420px; height: 420px; right: -190px; bottom: -190px; background: #d6eaff; }
.blob-3 { width: 120px; height: 120px; right: 40px; top: 150px; background: #eef6ff; }
@media (max-width: 760px) {
  .login-page { grid-template-columns: 1fr; }
  .login-showcase { display: none; }
  .blob { display: none; }
  .login-form-centred { margin: 0 auto; }
  .login-top { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.login-column { padding: 24px 20px 32px; }
}
</style>
