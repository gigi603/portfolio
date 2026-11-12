import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { DEMO_ACCOUNT, useSessionStore } from './session'

describe('session store', () => {
  beforeEach(() => setActivePinia(createPinia()))

  it('asks for both fields', () => {
    const session = useSessionStore()
    expect(session.login('', '')).toEqual({ ok: false, error: 'Please enter your email and password.' })
    expect(session.loggedIn).toBe(false)
  })

  it('refuses a wrong password', () => {
    const session = useSessionStore()
    expect(session.login(DEMO_ACCOUNT.email, 'nope').ok).toBe(false)
  })

  it('accepts the demo account, whatever the email case', () => {
    const session = useSessionStore()
    expect(session.login(' Alex.Jones@gmail.com ', DEMO_ACCOUNT.password).ok).toBe(true)
    expect(session.loggedIn).toBe(true)
  })

  it('connects the wallet when signing in with a wallet', () => {
    const session = useSessionStore()
    session.loginWith('wallet')
    expect(session.walletConnected).toBe(true)
    session.logout()
    expect(session.walletConnected).toBe(false)
  })

  it('uses the new email to sign in after a profile change', () => {
    const session = useSessionStore()
    session.updateProfile({ firstName: 'Sam', lastName: 'Lee', email: 'sam@example.com' })
    expect(session.fullName).toBe('Sam Lee')
    expect(session.login('sam@example.com', DEMO_ACCOUNT.password).ok).toBe(true)
  })
})
