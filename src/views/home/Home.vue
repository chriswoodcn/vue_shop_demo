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
        <i slot="icon" class="icon" :class="item.icon"></i>
        <p class="text">{{ item.label }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      tabs: [
        { label: '首页', icon: 'iconfont icon-shouye', path: '/home/index' },
        { label: '搜索', icon: 'iconfont icon-fenlei', path: '/home/search' },
        { label: '购物车', icon: 'iconfont icon-gouwuche', path: '/home/cart' },
        { label: '我的', icon: 'iconfont icon-wode', path: '/home/mine' }
      ],
      selectedIndex: 0
    }
  },
  mounted() {},
  methods: {
    onclick(id) {
      this.selectedIndex = id
      this.$router.push(this.tabs[id].path)
      this.$refs.tabs[id].style.backgroundColor = '#eee'
      setTimeout(() => {
        this.$refs.tabs[id].style.backgroundColor = '#ffffff'
      }, 100)
    }
  },
  computed: {}
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
    z-index 999
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
      .icon
        display block
        font-size 22px
        height 30px
        width 30px
        margin 0 auto
</style>
