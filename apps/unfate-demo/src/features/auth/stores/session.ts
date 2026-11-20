import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

/** The only account of the demo, shown on the login screen */
export const DEMO_ACCOUNT = { email: 'alex.jones@gmail.com', password: 'unfate' } as const

export interface Profile {
  firstName: string
  lastName: string
  email: string
}

/** Login errors are codes: the form shows them in the current language */
export type LoginError = 'empty' | 'mismatch'
export type LoginResult = { ok: true } | { ok: false; error: LoginError }

const defaultProfile = (): Profile => ({ firstName: 'Alex', lastName: 'Jones', email: DEMO_ACCOUNT.email })

export const useSessionStore = defineStore('session', () => {
  const loggedIn = ref(false)
  const walletConnected = ref(false)
  /** Demo wallet address, shortened like wallets show it */
  const walletAddress = '0x7a3F…92cE'
  const profile = ref<Profile>(defaultProfile())

  const fullName = computed(() => `${profile.value.firstName} ${profile.value.lastName}`.trim())

  function login(email: string, password: string): LoginResult {
    if (!email.trim() || !password) return { ok: false, error: 'empty' }
    const matches = email.trim().toLowerCase() === profile.value.email.toLowerCase() && password === DEMO_ACCOUNT.password
    if (!matches) return { ok: false, error: 'mismatch' }
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

  return { loggedIn, walletConnected, walletAddress, profile, fullName, login, loginWith, logout, toggleWallet, updateProfile, reset }
})
