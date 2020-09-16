import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Home from './views/home/Home.vue'
import Personal from './views/personal/Personal.vue'
import Login from './views/Login.vue'
import Map from './views/Map.vue'
import Band from './views/Band.vue'
Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        // {
        //     path: '/',
        //     name: 'index',
        //     component: Index
        // },
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/band',
            name: 'band',
            component: Band
        },
        {
            path: '/map',
            name: 'map',
            component: Map
        },
        {
            path: '/index',
            name: 'index',
            // component: () => import('./views/Index.vue'),
            component: Index,
            // redirect: 'home',
            children: [
                // 首页
                {
                    path: '/home',
                    name: 'home',
                    component: Home
                },
                // 个人中心
                {
                    path: '/personal',
                    name: 'personal',
                    component: Personal
                }
            ]
        }
    ]
})

// 进入每一个页面前的事儿
router.beforeEach((to, from, next) => {
    next()
})
/* 页面进入后的事儿
router.afterEach((to, from) => {
})
*/
export default router
