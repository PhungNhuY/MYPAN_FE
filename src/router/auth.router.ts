import type { RouteRecordRaw } from "vue-router";

const authRouters: Array<RouteRecordRaw> = [
    {
        path: 'auth',
        children: [
            {
                path: 'login',
                component: () => import('@/views/pages/LoginPage.vue'),
                meta: {
                    public: true,
                    onlyWhenLoggedOut: true,
                },
            },
            {
                path: 'register',
                component: () => import('@/views/pages/RegisterPage.vue'),
                meta: {
                    public: true,
                    onlyWhenLoggedOut: true,
                },
            }
        ],
    }
];

export default authRouters;