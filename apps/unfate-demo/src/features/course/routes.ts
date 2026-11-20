// Route helpers of the course feature, so pages and components build the same URLs
export const courseRoute = () => ({ name: 'course' }) as const
export const lessonRoute = (index: number) => ({ name: 'lesson', params: { lesson: String(index + 1) } }) as const
export const examRoute = () => ({ name: 'exam' }) as const
