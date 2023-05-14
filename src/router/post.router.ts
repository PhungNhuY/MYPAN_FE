import type { RouteRecordRaw } from "vue-router";

const postRouters: Array<RouteRecordRaw> = [
    {
        path: 'post',
        children: [
            {
                path: 'search/:textsearch',
                component: () => import('@/views/pages/SearchPost.vue'),
                meta: {
                    private: true
                },
            },
            {
                path: 'create',
                component: () => import('@/views/pages/CreatePost.vue'),
                meta: {
                    private: true
                },
            },
            {
                path: 'update/:id',
                component: () => import('@/views/pages/UpdatePost.vue'),
                meta: {
                    private: true,
                },
            },
            {
                path: ':id',
                component: () => import('@/views/pages/PostPage.vue'),
                meta: {
                },
            },
        ],
    }
];

export default postRouters;