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
            },
            {
                path: 'update',
                component: () => import('@/views/pages/UpdateInfo.vue'),
            },
            {
                path: ':username',
                component: () => import('@/views/pages/OtherProfile.vue'),
            }
        ],
    }
];

export default profileRouter;