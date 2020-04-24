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
    component: () => import('@/views/home/home.vue'),
    meta: { keepAlive: false },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import(/* webpackChunkName: "home" */ '@/views/home/index/index.vue'),
        meta: {
          keepAlive: true,
          title: '商城'
        }
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import(/* webpackChunkName: "cart" */ '@/views/home/cart/cart.vue'),
        meta: { title: '购物车' }
      },
      {
        path: 'classify',
        name: 'classify',
        component: () => import(/* webpackChunkName: "classify" */ '@/views/home/classify/classify.vue'),
        meta: { title: '分类' },
        redirect: '/home/classify/item',
        children: [
          {
            path: 'item',
            name: 'classify-item',
            component: () => import('@/views/home/classify/classify_item.vue'),
            meta: { title: '商品分类' }
          }
        ]
      },
      {
        path: 'mine',
        name: 'mine',
        component: () => import(/* webpackChunkName: "mine" */ '@/views/mine/mine.vue'),
        meta: { keepAlive: true }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL, // 自动获取根目录路径
  scrollBehavior: (to, from, pos) => {
    return (
      pos || {
        x: 0,
        y: 0
      }
    )
  },
  routes
})

export default router
