import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeComponent from '../views/HomeComponent.vue'
//dazda

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeComponent',
    component: HomeComponent
  },
  {
    path: '/practices',
    name: 'PracticesComponent',
    component: () => import('../views/PracticesComponent.vue')
  },
  {
    path: '/projects',
    name: 'ProjectsComponent',
    component: () => import('../views/ProjectsComponent.vue')
  },
  {
    path: "/project/:id",
    name: "ProjectDetailComponent",
    props: true,
    component: () => import('../views/ProjectDetailComponent.vue')
  },
  {
    path: '/politique',
    name: 'PolitiqueComponent',
    component: () => import('../views/PolitiqueComponent.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      // Wait for the page to render before scrolling to the section
      return new Promise(resolve => {
        setTimeout(() => resolve({ selector: to.hash, offset: { x: 0, y: 96 }, behavior: 'smooth' }), 100)
      })
    }
    return savedPosition || { x: 0, y: 0 }
  }
})

export default router
