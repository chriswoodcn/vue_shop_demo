<template>
  <div class="home">
    <router-view></router-view>
    <div class="bottom-tabbar border-1px">
      <div
        class="tab"
        v-for="(item, index) in tabs"
        :key="item.label"
        @click="onclick(index)"
        :class="{ active: selectedIndex === index }"
        ref="tabs"
      >
        <i :class="item.icon"></i>
        <p class="text">{{ item.label }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      tabs: [
        {
          label: '首页',
          icon: 'iconfont icon-shouye',
          path: '/home/index'
        },
        {
          label: '分类',
          icon: 'iconfont icon-fenlei',
          path: '/home/classify'
        },
        {
          label: '购物车',
          icon: 'iconfont icon-gouwuche',
          path: '/home/cart'
        },
        {
          label: '我的',
          icon: 'iconfont icon-wode',
          path: '/home/mine'
        }
      ]
    }
  },
  mounted() {},
  computed: {
    selectedIndex() {
      return this.tabs.findIndex((item) => {
        return this.$route.path.split('/')[2] === item.path.split('/')[2]
      })
    }
  },
  methods: {
    onclick(id) {
      if (id !== this.selectedIndex) {
        this.$router.replace(this.tabs[id].path)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@assets/css/variable.styl'
.home
  position relative
  width 100vw
  height 100vh

  .bottom-tabbar
    position fixed
    z-index 1
    left 0
    bottom 0
    width 100vw
    height 60px
    box-sizing border-box
    border-top 1px solid #eee
    display flex

    .tab
      box-sizing border-box
      flex 1
      width 100%
      height 100%
      font-size $font-size-medium
      font-weight 700
      text-align center
      padding 10px 0 0 0

      &.active
        color red

      .iconfont
        display block
        font-size 22px
        height 30px
        width 30px
        margin 0 auto
</style>
