import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

/** The only account of the demo, shown on the login screen */
export const DEMO_ACCOUNT = { email: 'alex.jones@gmail.com', password: 'unfate' } as const

export interface Profile {
  firstName: string
  lastName: string
  email: string
}

export type LoginResult = { ok: true } | { ok: false; error: string }

const defaultProfile = (): Profile => ({ firstName: 'Alex', lastName: 'Jones', email: DEMO_ACCOUNT.email })

export const useSessionStore = defineStore('session', () => {
  const loggedIn = ref(false)
  const walletConnected = ref(false)
  const profile = ref<Profile>(defaultProfile())

  const fullName = computed(() => `${profile.value.firstName} ${profile.value.lastName}`.trim())

  function login(email: string, password: string): LoginResult {
    if (!email.trim() || !password) return { ok: false, error: 'Please enter your email and password.' }
    const matches = email.trim().toLowerCase() === profile.value.email.toLowerCase() && password === DEMO_ACCOUNT.password
    if (!matches) return { ok: false, error: 'Incorrect email or password. Use the demo account below.' }
    loggedIn.value = true
    return { ok: true }
  }

  /** Google and wallet buttons sign straight into the demo account */
  function loginWith(provider: 'google' | 'wallet'): void {
    if (provider === 'wallet') walletConnected.value = true
    loggedIn.value = true
  }

  function logout(): void {
    loggedIn.value = false
    walletConnected.value = false
  }

  function toggleWallet(): void {
    walletConnected.value = !walletConnected.value
  }

  function updateProfile(next: Profile): void {
    profile.value = { ...next }
  }

  function reset(): void {
    loggedIn.value = false
    walletConnected.value = false
    profile.value = defaultProfile()
  }

  return { loggedIn, walletConnected, profile, fullName, login, loginWith, logout, toggleWallet, updateProfile, reset }
})
