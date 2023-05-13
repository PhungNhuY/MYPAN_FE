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
            {
                path: 'collection/create',
                component: () => import('@/views/pages/admin/CreateCollection.vue'),
                meta: {
                    private: true,
                    requiredPermissions: 'admin',
                },
            },
            {
                path: 'collection/update/:id',
                component: () => import('@/views/pages/admin/UpdateCollection.vue'),
                meta: {
                    private: true,
                    requiredPermissions: 'admin',
                },
            },
            {
                path: 'report',
                component: () => import('@/views/pages/admin/ReportPage.vue'),
                meta: {
                    private: true,
                    requiredPermissions: 'admin',
                },
            },
        ],
    }
];

export default adminRouter;