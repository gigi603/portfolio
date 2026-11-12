import { describe, expect, it } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { defineComponent } from 'vue'
import CourseOutline from './CourseOutline.vue'
import { useProgressStore } from '../stores/progress'

const Empty = defineComponent({ template: '<div />' })

async function mountOutline(path: string) {
  const pinia = createPinia()
  setActivePinia(pinia)
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/course/defi', name: 'course', component: Empty },
      { path: '/course/defi/lesson/:lesson', name: 'lesson', component: Empty },
      { path: '/course/defi/exam', name: 'exam', component: Empty },
    ],
  })
  await router.push(path)
  const wrapper = mount(CourseOutline, { global: { plugins: [pinia, router], components: { FontAwesomeIcon } } })
  await flushPromises()
  return { wrapper, router }
}

describe('CourseOutline', () => {
  it('unfolds a chapter on click without changing page', async () => {
    const { wrapper, router } = await mountOutline('/course/defi')
    const chapter = wrapper.find('button.chapter')
    expect(chapter.attributes('aria-expanded')).toBe('false')
    await chapter.trigger('click')
    expect(chapter.attributes('aria-expanded')).toBe('true')
    expect(router.currentRoute.value.name).toBe('course')
    expect(wrapper.find('#outline-chapter-0 a.lesson').text()).toContain('Blockchain technology')
    await chapter.trigger('click')
    expect(chapter.attributes('aria-expanded')).toBe('false')
  })

  it('opens the chapter of the current lesson and marks completed lessons', async () => {
    const { wrapper } = await mountOutline('/course/defi/lesson/1')
    useProgressStore().completeLesson(0)
    await flushPromises()
    expect(wrapper.find('button.chapter').attributes('aria-expanded')).toBe('true')
    expect(wrapper.find('#outline-chapter-0 a.lesson').classes()).toContain('is-done')
  })
})
