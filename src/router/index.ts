import MainLayoutVue from '@/views/layouts/MainLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/pages/HomePage.vue';
import authRouter from './auth.router';
import postRouters from './post.router';
import authMiddleware from './authMiddleware';
import profileRouter from './profile.router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainLayout',
      component: MainLayoutVue,
      children: [
        { 
          path: '', 
          component: HomePage, 
          meta: {
          },
        },

        ...authRouter,
        ...postRouters,
        ...profileRouter,

        // catch not found
        {
          path: '/:pathMatch(.*)*',
          component: () => import('@/views/pages/NotFound.vue'),
        }
      ]
    },
  ]
})



router.beforeEach(authMiddleware);

export default router
