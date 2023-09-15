import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeComponent from '../views/HomeComponent.vue'


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
    path: '/contact',
    name: 'ContactComponent',
    component: () => import('../views/ContactComponent.vue')
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
  routes
})

export default router
