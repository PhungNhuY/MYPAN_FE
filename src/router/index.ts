import MainLayoutVue from '@/views/layouts/MainLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/pages/HomePage.vue'
import authRouter from './auth.router'
import { useAlertStore } from '@/stores/Alert.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainLayout',
      component: MainLayoutVue,
      children: [
        { path: '', component: HomePage, },
        authRouter,

        // catch not found
        {
          path: '/:pathMatch(.*)*',
          component: () => import('@/views/pages/NotFound.vue'),
        }
      ]
    },
  ]
})

router.beforeEach(async (to) => {
  // clear alert on route change
  const alertStore = useAlertStore();
  alertStore.clear();
});

export default router
