import { describe, expect, it } from 'vitest'
import { validateProfile } from './validation'

describe('validateProfile', () => {
  it('accepts a complete profile', () => {
    expect(validateProfile({ firstName: 'Alex', lastName: 'Jones', email: 'alex@example.com' })).toBeNull()
  })

  it('rejects an empty name or a malformed email', () => {
    expect(validateProfile({ firstName: ' ', lastName: 'Jones', email: 'alex@example.com' })).toBe('name')
    expect(validateProfile({ firstName: 'Alex', lastName: 'Jones', email: 'alex@' })).toBe('email')
  })
})
