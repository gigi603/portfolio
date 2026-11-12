import { createRouter, createWebHistory, type RouteLocationRaw } from 'vue-router'
import { useSessionStore } from '@/features/auth'
import { lessons, useProgressStore } from '@/features/course'
import AppLayout from '@/layouts/AppLayout.vue'
import LoginPage from '@/pages/LoginPage.vue'

declare module 'vue-router' {
  interface RouteMeta {
    /** Pages behind the login screen */
    requiresAuth?: boolean
  }
}

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: { name: 'login' } },
    { path: '/login', name: 'login', component: LoginPage },
    {
      path: '/',
      component: AppLayout,
      meta: { requiresAuth: true },
      children: [
        { path: 'courses', name: 'catalog', component: () => import('@/pages/CatalogPage.vue'), props: { filter: 'all' } },
        { path: 'ongoing', name: 'ongoing', component: () => import('@/pages/CatalogPage.vue'), props: { filter: 'ongoing' } },
        { path: 'favorites', name: 'favorites', component: () => import('@/pages/CatalogPage.vue'), props: { filter: 'favorites' } },
        { path: 'completed', name: 'completed', component: () => import('@/pages/CatalogPage.vue'), props: { filter: 'completed' } },
        { path: 'course/defi', name: 'course', component: () => import('@/pages/CoursePage.vue') },
        {
          path: 'course/defi/lesson/:lesson(\\d+)',
          name: 'lesson',
          component: () => import('@/pages/LessonPage.vue'),
          props: true,
          // Lessons open one after the other: a locked or unknown lesson sends back to the course page
          beforeEnter: (to): RouteLocationRaw | true => {
            const index = Number(to.params.lesson) - 1
            const exists = index >= 0 && index < lessons.length
            return exists && useProgressStore().canOpen(index) ? true : { name: 'course' }
          },
        },
        {
          path: 'course/defi/exam',
          name: 'exam',
          component: () => import('@/pages/ExamPage.vue'),
          beforeEnter: (): RouteLocationRaw | true => (useProgressStore().allLessonsDone ? true : { name: 'course' }),
        },
        { path: 'settings', name: 'settings', component: () => import('@/pages/SettingsPage.vue') },
      ],
    },
    { path: '/:pathMatch(.*)*', redirect: { name: 'login' } },
  ],
})

router.beforeEach(to => {
  const session = useSessionStore()
  if (to.meta.requiresAuth && !session.loggedIn) return { name: 'login', query: { redirect: to.fullPath } }
  if (to.name === 'login' && session.loggedIn) return { name: 'catalog' }
  return true
})
