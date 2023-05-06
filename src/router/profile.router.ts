import type { RouteRecordRaw } from "vue-router";

const profileRouter: Array<RouteRecordRaw> = [
    {
        path: 'profile',
        children: [
            {
                path: '',
                component: () => import('@/views/pages/ProfilePage.vue'),
                meta: {
                    private: true,
                },
            }
        ],
    }
];

export default profileRouter;