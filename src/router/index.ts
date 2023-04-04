import MainLayoutVue from '@/views/layouts/MainLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/pages/HomePage.vue'
import authRouter from './auth.router'
import { useAuthStore } from '@/stores/Auth.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainLayout',
      component: MainLayoutVue,
      children: [
        { path: '', component: HomePage, },
        { path: 'getMe', component: () => import('@/views/pages/ProfilePage.vue')},
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

router.beforeEach(async (to, from) => {
  // // redirect to login page if not logged in and trying to access a restricted page 
  // console.log(from.fullPath);
  console.log(to.fullPath);
  
  
  const protectedPages = ['/getMe'];
  const authRequired = protectedPages.includes(to.path);
  const authStore = useAuthStore();
  console.log(authStore.user);
  
  if (authRequired && !authStore.user?.email) {
      authStore.returnUrl = to.fullPath;
      return '/auth/login';
  }
});

export default router
