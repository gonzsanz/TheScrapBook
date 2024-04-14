import { createRouter, createWebHistory } from 'vue-router'
import NotFoundView from '../views/NotFoundView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/results',
      name: 'results',
      component: () => import('../views/ResultsView.vue')
    },
    {
      path: '/download',
      name: 'downloadBook',
      component: () => import('../views/BookInfoView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    }
  ]
})

export default router
