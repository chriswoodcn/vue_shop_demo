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

Vue.config.productionTip = false
// Vue.prototype.$config = config
Vue.prototype.$utils = utils
Vue.use(VueLazyload, {
  loading: require('@/assets/images/common/lazyImg.jpg')
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
