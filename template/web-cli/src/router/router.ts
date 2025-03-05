export const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import("@/views/home.vue")
    },
    {
        path:"/404",
        name:"404",
        component: ()=> import("@/views/404.vue")
    }
]