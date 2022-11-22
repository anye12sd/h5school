import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const mainIndex = () => import(/* webpackChunkName: "mainIndex" */ '@/components/HelloWorld.vue')
const success = () => import(/* webpackChunkName: "success" */ '@/components/success.vue')

const router = new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            redirect: '/mainIndex'
        },
        {
            path: '/mainIndex',
            component: mainIndex
        },
        {
            path: '/success',
            component: success
        },
    ]
})
export default router