export const routes = [
    {
        path: '/',
        name: 'home',
        
        component: () => import("@/views/home.vue"),
        children: [
            {
                path: '/study',
                component: () => import('@/views/study.vue'),
                name: 'study',
                // meta: {
                //     title: "首页",
                //     hidden: false,
                //     // icon: 'House'
                // }
            },
            {
                path: '/work',
                component: () => import('@/views/work.vue'),
                name: 'work',
                // meta: {
                //     title: "首页",
                //     hidden: false,
                //     // icon: 'House'
                // }
            },
        ]
    },
    {
        path:"/404",
        name:"404",
        component: ()=> import("@/views/404.vue")
    }
]