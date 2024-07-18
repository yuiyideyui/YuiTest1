import { createRouter, createWebHashHistory } from 'vue-router'
let webtv = () => import('../components/webTV/WebTv.vue')
let webtvList = () => import('../components/webTV/webList/webTvList.vue')
let VTv = () => import('../components/webTV/webList/VTv/vTv.vue')
const routes = [
    {
        path: '/',
        redirect: "/webtv"
    },
    {
        path: '/webtv',
        name: 'webtv',
        component: webtv,
        meta: {
            name: 'webtv',
            role: 'admin'
        },
        // children:[
        //     {
        //         path:':id/list',
        //         name:'webtvList',
        //         component:webtvList,
        //         meta:{
        //             name:'webtvList',
        //         },
        //         //传递props
        //         props: true,
        //         children:[
        //             {
        //                 path:'VTv',
        //                 name:'/VTv',
        //                 component:VTv,
        //             }
        //         ]
        //     }
        // ]
    },
    {
        path: '/webtv/:id/list',
        name: 'webtvList',
        component: webtvList,
        props: true,
        children: [
            {
                path: 'VTv',
                name: '/VTv',
                component: VTv,
            }
        ]
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})
// router.beforeEach((to, from, next) => {
//     console.log('to', to.path, 'from', from.patn)
// })
export default router