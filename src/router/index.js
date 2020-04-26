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
        component: () => import(/* webpackChunkName: "index" */ '@/views/home/index/index.vue'),
        meta: {
          keepAlive: true,
          title: 'VUE商城'
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
            component: () => import('@/components/home/classify/classify_item.vue'),
            meta: { title: '商品分类' }
          }
        ]
      },
      {
        path: 'search',
        name: 'search',
        component: () => import(/* webpackChunkName: "search" */ '@/views/home/search/search.vue'),
        meta: { title: '搜索' },
        children: [
          {
            path: 'panel',
            name: 'search-panel',
            component: () => import('@/views/home/search/search_panel.vue'),
            meta: { title: '搜索' }
          }
        ]
      },
      {
        path: 'mine',
        name: 'mine',
        component: () => import(/* webpackChunkName: "mine" */ '@/views/mine/mine.vue'),
        meta: { title: '个人中心' }
      },
      {
        path: '/map',
        name: 'map',
        component: () => import('@/views/home/map/map.vue'),
        meta: { title: '地图' }
      }
    ]
  },
  {
    path: '/goods/details',
    name: 'details',
    component: () => import('@/views/home/goods/details.vue'),
    redirect: '/goods/details/item',
    children: [
      {
        path: 'item',
        name: 'details-item',
        component: () => import('@/components/home/goods/details_item.vue')
      },
      {
        path: 'content',
        name: 'details-content',
        component: () => import('@/components/home/goods/details_content.vue')
      },
      {
        path: 'review',
        name: 'details-review',
        component: () => import('@/components/home/goods/details_review.vue')
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
