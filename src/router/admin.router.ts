import type { RouteRecordRaw } from "vue-router";

const adminRouter: Array<RouteRecordRaw> = [
    {
        path: 'admin',
        children: [
            {
                path: 'collection',
                component: () => import('@/views/pages/admin/CollectionPage.vue'),
                meta: {
                    private: true,
                    requiredPermissions: 'admin',
                },
            },
        ],
    }
];

export default adminRouter;