import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/index',
            name: 'index',
            component: () => import('./views/Index.vue'),
            redirect: 'home',
            children: [
                // 首页
                {
                    path: '/home',
                    name: 'home'
                },
                // 个人中心
                {
                    path: '/personal',
                    name: 'personal'
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
