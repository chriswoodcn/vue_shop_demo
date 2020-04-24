import { getNavsData, getSwiperData, getGoodsData, getRecomGoodsData } from '@/api/index'

export default {
  namespaced: true,
  state: {
    navs: [],
    swipers: [],
    goods: [],
    recomGoods: []
  },
  mutations: {
    SET_NAVS(state, payload) {
      state.navs = payload.navs
    },
    SET_SWIPERS(state, payload) {
      state.swipers = payload.swipers
    },
    SET_GOODS(state, payload) {
      state.goods = payload.goods
    },
    SET_RECOMGOODS(state, payload) {
      state.recomGoods = payload.recomGoods
    }
  },
  actions: {
    getNavs(conText, payload) {
      getNavsData().then((res) => {
        if (res.code === 200) {
          conText.commit('SET_NAVS', { navs: res.data })
        }
      })
    },
    getSwipers(conText, payload) {
      getSwiperData().then((res) => {
        if (res.code === 200) {
          conText.commit('SET_SWIPERS', { swipers: res.data })
        }
      })
    },
    getGoods(conText, payload) {
      getGoodsData().then((res) => {
        if (res.code === 200) {
          conText.commit('SET_GOODS', { goods: res.data })
        }
      })
    },
    getRecomGoods(conText, payload) {
      getRecomGoodsData().then((res) => {
        if (res.code === 200) {
          conText.commit('SET_RECOMGOODS', { recomGoods: res.data })
        }
      })
    }
  },
  getters: {
    navs: (state) => state.navs,
    swipers: (state) => state.swipers,
    goods: (state) => state.goods,
    recomGoods: (state) => state.recomGoods
  }
}
