// import "babel-polyfill"; //es6转es5兼容IE
// import 'url-search-params-polyfill' ////让ie兼容new URLSearchParams()
import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
// import config from '@/assets/js/conf/config'
import '@/assets/css/index.styl'
import 'amfe-flexible'
import utils from '@/assets/js/libs'
import VueLazyload from 'vue-lazyload'
// import BaiduMap from 'vue-baidu-map'
// 引入全局组件
import Divider from '@/components/base/divider.vue'
import NavHeader from '@/components/base/nav-header.vue'

Vue.component('divider', Divider)
Vue.component('nav-header', NavHeader)
Vue.config.productionTip = false
Vue.prototype.$utils = utils
Vue.use(VueLazyload, {
  loading: require('@/assets/images/common/lazyImg.jpg')
})
// Vue.use(BaiduMap, {
//   ak: 'zb18k7Sn55uUauHn9xqqFp0mjI5AntYx'
// })
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
