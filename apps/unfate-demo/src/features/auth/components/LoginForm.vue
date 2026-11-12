<script setup lang="ts">
import { reactive, ref } from 'vue'
import BaseButton from '@/shared/ui/BaseButton.vue'
import TextField from '@/shared/ui/TextField.vue'
import { useToast } from '@/shared/composables/useToast'
import { faWallet } from '@/shared/icons'
import { DEMO_ACCOUNT, useSessionStore } from '../stores/session'

const emit = defineEmits<{ success: [] }>()

const session = useSessionStore()
const toast = useToast()
const form = reactive({ email: '', password: '', remember: true })
const error = ref('')

function submit(): void {
  const result = session.login(form.email, form.password)
  if (!result.ok) {
    error.value = result.error
    return
  }
  error.value = ''
  emit('success')
}

function loginWith(provider: 'google' | 'wallet'): void {
  session.loginWith(provider)
  emit('success')
}

function fillDemoAccount(): void {
  form.email = DEMO_ACCOUNT.email
  form.password = DEMO_ACCOUNT.password
  error.value = ''
}

function notInDemo(feature: string): void {
  toast.show(`${feature} is not part of this demo.`)
}
</script>

<template>
  <form class="login-form" novalidate @submit.prevent="submit">
    <h1 class="title" tabindex="-1" data-page-heading>Log in</h1>
    <p class="subtitle">Pick up your DeFi lessons where you left off.</p>

    <div class="providers">
      <BaseButton variant="outline" block @click="loginWith('google')">
        <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.7 1.2 9.1 3.6l6.8-6.8C35.8 2.5 30.3 0 24 0 14.6 0 6.6 5.4 2.6 13.3l7.9 6.2C12.4 13.7 17.7 9.5 24 9.5z" /><path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 7l7.4 5.7c4.3-4 6.9-9.9 6.9-17.2z" /><path fill="#FBBC05" d="M10.5 28.7c-.5-1.4-.8-3-.8-4.7s.3-3.2.8-4.7l-7.9-6.2C.9 16.5 0 20.1 0 24s.9 7.5 2.6 10.9l7.9-6.2z" /><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.4-5.7c-2.1 1.4-4.8 2.2-8.5 2.2-6.3 0-11.6-4.2-13.5-10l-7.9 6.2C6.6 42.6 14.6 48 24 48z" /></svg>
        Continue with Google
      </BaseButton>
      <BaseButton variant="outline" block @click="loginWith('wallet')">
        <FontAwesomeIcon :icon="faWallet" class="text-blue" />
        Continue with a wallet
      </BaseButton>
    </div>
    <p class="divider"><span>or with your email</span></p>

    <TextField v-model.trim="form.email" label="Email" type="email" autocomplete="username" :invalid="!!error" described-by="login-error" @update:model-value="error = ''" />
    <TextField v-model="form.password" label="Password" type="password" autocomplete="current-password" :invalid="!!error" described-by="login-error" @update:model-value="error = ''" />
    <p id="login-error" class="error" role="alert">{{ error }}</p>

    <div class="row">
      <label class="check"><input v-model="form.remember" type="checkbox" /> Remember me</label>
      <button type="button" class="link" @click="notInDemo('Password reset')">Forgot password?</button>
    </div>
    <BaseButton type="submit" size="lg" block>Log in</BaseButton>

    <div class="demo-account">
      <p>Demo account: <b>{{ DEMO_ACCOUNT.email }}</b> / <b>{{ DEMO_ACCOUNT.password }}</b></p>
      <button type="button" class="link link-strong" @click="fillDemoAccount">Fill in for me</button>
    </div>
    <p class="signup">New to Unfate? <button type="button" class="link" @click="notInDemo('Sign-up')">Create an account</button></p>
  </form>
</template>

<style scoped>
.login-form { max-width: 360px; width: 100%; }
.title { font-size: 28px; font-weight: 800; }
.subtitle { color: var(--uf-muted); font-size: 15px; margin: 6px 0 20px; line-height: 1.5; }
.providers { display: grid; gap: 12px; }
.divider { display: flex; align-items: center; gap: 12px; color: var(--uf-muted); font-size: 13px; margin: 16px 0 4px; }
.divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: #d6d8e7; }
.error { color: #c4262c; font-size: 14px; font-weight: 500; min-height: 20px; margin-top: 8px; }
.row { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin: 6px 0 18px; font-size: 14px; flex-wrap: wrap; }
.check { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; }
.check input { width: 16px; height: 16px; accent-color: var(--uf-blue); }
.link { color: var(--uf-blue-dark); font-weight: 500; }
.link:hover { text-decoration: underline; }
.link-strong { font-weight: 700; margin-top: 4px; text-decoration: underline; text-underline-offset: 3px; }
.demo-account { margin-top: 18px; padding: 14px 16px; border-radius: 12px; background: var(--uf-blue-bg); font-size: 14px; line-height: 1.6; }
.signup { margin-top: 22px; font-size: 14px; }
</style>
