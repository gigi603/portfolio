import ammImage from '@/assets/images/course-amm.webp'

/** Titles and meta lines are translated in the messages (catalog.upcoming.<id>) */
export interface UpcomingCourse {
  id: 'perps' | 'amm'
  duration: string
  price: string
  /** Background photo, or the dotted dark pattern of the Figma card */
  image?: string
}

export const upcomingCourses: UpcomingCourse[] = [
  { id: 'perps', duration: '30min', price: '$150' },
  { id: 'amm', duration: '45min', price: '$150', image: ammImage },
]

/** Colour names are translated in the messages (catalog.colors.<id>) */
export interface CardColor {
  id: 'green' | 'blue' | 'yellow' | 'purple' | 'orange' | 'pink'
  background: string
  text: string
}

/** Colours of the Progress card palette (pencil button), from the Figma prototype */
export const cardColors: CardColor[] = [
  { id: 'green', background: '#1F9D66', text: '#ffffff' },
  { id: 'blue', background: '#1A73E8', text: '#ffffff' },
  { id: 'yellow', background: '#F5B800', text: '#14142b' },
  { id: 'purple', background: '#7B3FE4', text: '#ffffff' },
  { id: 'orange', background: '#F26B1D', text: '#14142b' },
  { id: 'pink', background: '#D63A70', text: '#ffffff' },
]

export type CatalogFilter = 'all' | 'ongoing' | 'favorites' | 'completed'
