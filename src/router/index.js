import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/home/index',
    component: () => import('@/views/home/Home.vue'),
    meta: { keepAlive: true },
    children: [{ path: 'index', component: () => import(/* webpackChunkName: "home" */ '@/views/home/index/Index.vue') },
      { path: 'cart', component: () => import(/* webpackChunkName: "cart" */ '@/views/home/cart/Cart.vue') },
      { path: 'search', component: () => import(/* webpackChunkName: "search" */ '@/views/home/search/Search.vue') },
      { path: 'mine', component: () => import(/* webpackChunkName: "mine" */ '@/views/mine/Mine.vue') }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL, // 自动获取根目录路径
  scrollBehavior: (to, from, pos) => {
    return pos || { x: 0, y: 0 }
  },
  routes
})

export default router
