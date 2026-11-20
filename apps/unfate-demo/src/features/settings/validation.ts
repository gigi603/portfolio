import type { Profile } from '@/features/auth'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type ProfileError = 'name' | 'email'

/** Returns what is wrong (shown as settings.errorName / settings.errorEmail), or null when the profile can be saved */
export function validateProfile(profile: Profile): ProfileError | null {
  if (!profile.firstName.trim() || !profile.lastName.trim()) return 'name'
  if (!EMAIL_PATTERN.test(profile.email.trim())) return 'email'
  return null
}
