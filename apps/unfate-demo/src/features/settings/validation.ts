import type { Profile } from '@/features/auth'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Returns an error message, or null when the profile can be saved */
export function validateProfile(profile: Profile): string | null {
  if (!profile.firstName.trim() || !profile.lastName.trim()) return 'Please fill in your first and last name.'
  if (!EMAIL_PATTERN.test(profile.email.trim())) return 'Please enter a valid email address.'
  return null
}
