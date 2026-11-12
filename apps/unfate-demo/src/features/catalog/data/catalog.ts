import ammImage from '@/assets/images/course-amm.webp'

export interface UpcomingCourse {
  id: string
  title: string
  meta: string
  duration: string
  price: string
  /** Background photo, or the dotted dark pattern of the Figma card */
  image?: string
}

export const upcomingCourses: UpcomingCourse[] = [
  { id: 'perps', title: 'Perps Trading', meta: '6 lessons - Expert', duration: '30min', price: '$150' },
  { id: 'amm', title: 'Automated Market Makers', meta: '11 lessons - Intermediate', duration: '45min', price: '$150', image: ammImage },
]

export interface CardColor {
  id: string
  label: string
  background: string
  text: string
}

/** Colours of the Progress card palette (pencil button), from the Figma prototype */
export const cardColors: CardColor[] = [
  { id: 'green', label: 'Green', background: '#1F9D66', text: '#ffffff' },
  { id: 'blue', label: 'Blue', background: '#1A73E8', text: '#ffffff' },
  { id: 'yellow', label: 'Yellow', background: '#F5B800', text: '#14142b' },
  { id: 'purple', label: 'Purple', background: '#7B3FE4', text: '#ffffff' },
  { id: 'orange', label: 'Orange', background: '#F26B1D', text: '#14142b' },
  { id: 'pink', label: 'Pink', background: '#D63A70', text: '#ffffff' },
]

export type CatalogFilter = 'all' | 'ongoing' | 'favorites' | 'completed'
