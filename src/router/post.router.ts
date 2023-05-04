import type { RouteRecordRaw } from "vue-router";

const postRouters: Array<RouteRecordRaw> = [
    {
        path: 'post',
        children: [
            {
                path: ':id',
                component: () => import('@/views/pages/PostPage.vue'),
                meta: {
                },
            },
            {
                path: 'create',
                component: () => import('@/views/pages/CreatePost.vue'),
                meta: {
                    private: true
                },
            },
        ],
    }
];

export default postRouters;