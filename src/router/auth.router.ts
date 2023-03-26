export default {
    path: 'auth',
    children: [
        { path: 'login', component: () => import('@/views/pages/LoginPage.vue') },
        { path: 'register', component: () => import('@/views/pages/RegisterPage.vue') },
    ]
}