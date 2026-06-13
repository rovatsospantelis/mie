import { createRouter, createWebHistory } from 'vue-router'
import { trackPageView } from '@/utils/track'

const routes = [
  { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
  { path: '/works', name: 'works', component: () => import('@/views/WorkView.vue') },
  { path: '/about', name: 'about', component: () => import('@/views/AboutView.vue') },
  { path: '/contact', name: 'contact', component: () => import('@/views/ContactView.vue') },
  // alias παλιού path
  { path: '/work', redirect: '/works' },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  trackPageView(to.fullPath, document.title)
})

router.onError((error) => {
  if (/Failed to fetch dynamically imported module/.test(error.message)) {
    window.location.reload()
  }
})

export default router
