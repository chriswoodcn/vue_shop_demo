import Vue from 'vue'
import Vuex from 'vuex'
// import user from './modules/user'
import index from './modules/index'
import goods from './modules/goods'
import search from './modules/search'
// import goodsReview from './modules/goods/review'
// import cart from './modules/cart'
// import address from './modules/address'
// import order from './modules/order'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    // user,
    index,
    goods,
    search
    // goodsReview,
    // cart,
    // address,
    // order
  },
  // strict: debug,
  plugins: debug ? [createLogger()] : []
})

export default store
