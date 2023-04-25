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
        ],
    }
];

export default postRouters;