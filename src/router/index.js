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
            component: () => import(/* webpackChunkName: "classify" */'@/components/home/classify/classify_item.vue'),
            meta: { title: '商品分类' }
          }
        ]
      },
      {
        path: 'search',
        name: 'search',
        component: () => import(/* webpackChunkName: "search" */'@/views/home/search/search.vue'),
        meta: { title: '搜索' },
        children: [
          {
            path: 'panel',
            name: 'search-panel',
            component: () => import(/* webpackChunkName: "search" */'@/views/home/search/search_panel.vue'),
            meta: { title: '搜索' }
          }
        ]
      },
      {
        path: 'center',
        name: 'center',
        component: () => import(/* webpackChunkName: "center" */ '@/views/mine/center/center.vue'),
        meta: { title: '个人中心' }
      },
      {
        path: 'map',
        name: 'map',
        component: () => import(/* webpackChunkName: "map" */ '@/views/home/map/map.vue'),
        meta: { title: '地图' }
      },
      {
        path: 'order',
        name: 'order',
        component: () => import(/* webpackChunkName: "home-order" */'@/views/home/order/order.vue'),
        meta: { title: '确认订单' }
      },
      {
        path: 'order/end',
        name: 'order-end',
        component: () => import(/* webpackChunkName: "home-order" */'@/views/home/order/order-end.vue'),
        meta: { title: '完成订单' }
      },
      {
        path: 'address',
        name: 'home-address',
        component: () => import(/* webpackChunkName: "home-address" */'@/views/home/address/address.vue')
      }
    ]
  },
  {
    path: '/goods/details',
    name: 'details',
    component: () => import(/* webpackChunkName: "details" */'@/views/home/goods/details.vue'),
    redirect: '/goods/details/item',
    children: [
      {
        path: 'item',
        name: 'details-item',
        component: () => import(/* webpackChunkName: "details-item" */'@/components/home/goods/details_item.vue')
      },
      {
        path: 'content',
        name: 'details-content',
        component: () => import(/* webpackChunkName: "details-content" */'@/components/home/goods/details_content.vue')
      },
      {
        path: 'review',
        name: 'details-review',
        component: () => import(/* webpackChunkName: "details-review" */'@/components/home/goods/details_review.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/mine/login/login.vue'),
    meta: {
      keepAlive: false,
      title: '会员登录'
    }
  },
  {
    path: '/reg',
    name: 'reg',
    component: () => import('@/views/mine/reg/reg.vue'),
    meta: {
      keepAlive: false,
      title: '会员注册'
    }
  },
  {
    path: '/mine',
    name: 'mine',
    redirect: '/home/center',
    component: () => import('@/views/mine/mine.vue'),
    children: [
      {
        path: 'order',
        name: 'mine-order',
        component: () => import('@/views/mine/order/order.vue'),
        redirect: '/mine/order/list',
        meta: { auth: true },
        children: [
          {
            path: 'list',
            name: 'order-list',
            component: () => import('@/views/mine/order/list.vue'),
            meta: { auth: true }
          },
          {
            path: 'review',
            name: 'order-review',
            component: () => import('@/views/mine/order/review.vue'),
            meta: { auth: true }
          }
        ]
      },
      {
        path: 'order/details',
        name: 'order-details',
        component: () => import('@/views/mine/order/details.vue'),
        meta: {
          auth: true,
          title: '订单详情'
        }
      },
      {
        path: 'order/add_review',
        name: 'order-add-review',
        component: () => import('@/views/mine/order/add-review.vue'),
        meta: {
          auth: true,
          title: '评价'
        }
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/mine/profile/profile.vue'),
        meta: {
          auth: true,
          title: '个人资料'
        }
      },
      {
        path: 'address',
        name: 'address',
        component: () => import('@/views/mine/address/address.vue'),
        meta: {
          auth: true,
          title: '收货地址管理'
        }
      },
      {
        path: 'address/add',
        name: 'address-add',
        component: () => import('@/views/mine/address/add-address.vue'),
        meta: {
          auth: true,
          title: '添加收货地址'
        }
      },
      {
        path: 'address/mod',
        name: 'address-mod',
        component: () => import('@/views/mine/address/mod-address.vue'),
        meta: {
          auth: true,
          title: '修改收货地址'
        }
      },
      {
        path: 'bind_cellphone',
        name: 'bind-cellphone',
        component: () => import('@/views/mine/bind-cellphone/bind-cellphone.vue'),
        meta: {
          auth: true,
          title: '绑定手机号'
        }
      },
      {
        path: 'mod_password',
        name: 'mod-password',
        component: () => import('@/views/mine/mod-password/mod-password.vue'),
        meta: {
          auth: true,
          title: '修改密码'
        }
      },
      {
        path: 'fav',
        name: 'fav',
        component: () => import('@/views/mine/fav/fav.vue'),
        meta: {
          auth: true,
          title: '我的收藏'
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
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

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    // eslint-disable-next-line
    if (Boolean(localStorage.isLogin)) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
