import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/bugs-reported',
      name: 'bugs-reported',
      component: () => import('../views/BugsReported.vue'),
    },
  ],
})

export default router
