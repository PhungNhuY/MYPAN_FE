import type { RouteRecordRaw } from "vue-router";

const authRouters: Array<RouteRecordRaw> = [
    {
        path: 'auth',
        children: [
            {
                path: 'login',
                component: () => import('@/views/pages/LoginPage.vue'),
                meta: {
                    onlyWhenLoggedOut: true,
                },
            },
            {
                path: 'register',
                component: () => import('@/views/pages/RegisterPage.vue'),
                meta: {
                    onlyWhenLoggedOut: true,
                },
            },
            {
                path: 'confirm',
                component: () => import('@/views/pages/ConfirmEmail.vue'),
            }
        ],
    }
];

export default authRouters;