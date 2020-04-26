<template>
  <div class="index">
    <div class="header-wrapper">
      <mheader :headerStyle="headerStyle" @leftClick="onLeftClick" @centerClick="onCenterClick" @rightClick="onRightClick"></mheader>
    </div>
    <div class="scroll-list-wrap">
      <cube-scroll ref="scroll" :data="data" :options="options" :scrollEvents="['scroll']" @scroll="handleScroll">
        <cube-slide class="slide" ref="slide" :data="swipers" :interval="2000">
          <cube-slide-item v-for="(item, index) in swipers" :key="index">
            <a :href="item.url">
              <img class="slide-image" :src="item.image" />
            </a>
          </cube-slide-item>
          <template #dots="props">
            <span class="dot" :class="{ active: props.current === index }" v-for="(item, index) in props.dots" :key="index">{{ index + 1 }}</span>
          </template>
        </cube-slide>

        <mnav :navs="navs"></mnav>

        <card v-for="(item, index) in goods" :key="index" :data="item"></card>

        <div class="recommend">
          <div class="text">为您推荐</div>
        </div>

        <div class="recommend-content">
          <mlist v-for="(item, index) in recomGoods" :data="item" :key="index"></mlist>
        </div>

        <div class="bottom-line"><p>我是有底线的</p></div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import baseMixins from '../../../assets/js/mixins/baseMixins'
import Mheader from '../../../components/home/index/mheader'
import Mnav from '../../../components/home/index/mnav'
import Card from '../../../components/home/index/card'
import Mlist from '../../../components/home/index/mlist'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'index',
  mixins: [baseMixins],
  data: function () {
    return {
      data: [],
      options: {
        probeType: 3,
        click: true
      },
      isScroll: false
    }
  },
  components: { Mheader, Mnav, Card, Mlist },
  created() {
    this.getNavs()
    this.getSwipers()
    this.getGoods()
    this.getRecomGoods()
  },
  computed: {
    headerStyle() {
      return !this.isScroll ? { background: 'linear-gradient(rgb(0,0,0,.2),hsla(0,0%,100%,0))' } : {}
    },
    ...mapGetters({ navs: 'index/navs', swipers: 'index/swipers', goods: 'index/goods', recomGoods: 'index/recomGoods' })
  },
  mounted() {},
  methods: {
    ...mapActions({
      getNavs: 'index/getNavs',
      getSwipers: 'index/getSwipers',
      getGoods: 'index/getGoods',
      getRecomGoods: 'index/getRecomGoods'
    }),
    handleScroll(e) {
      if (e.y <= -180) {
        this.isScroll = true
      } else {
        this.isScroll = false
      }
    },
    onLeftClick() {
      this.$router.push('/map')
    },
    onCenterClick() {
      this.$router.push('/home/search')
    },
    onRightClick() {
      this.$router.replace('/login')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@assets/css/variable.styl'
.index
  position absolute
  left 0
  right 0
  bottom 60px
  top 0
  background-color #eee
  .header-wrapper
    position fixed
    z-index 999
    left 0
    top 0
    width 100%
    height 50px
  .scroll-list-wrap
    width 100%
    height 100%
    .slide
      width 100%
      height 185px
      .slide-image
        width 100%
        height 100%
      .dot
        width 8px
        height 5px
        border-radius 5px
        margin 5px 2px
        &.active
          width 15px
          background-color #FF3B00
    .recommend
      margin 25px 0
      height 1px
      background-color $color-background-dd
      position relative
      .text
        padding 10px
        position absolute
        left 50%
        top 50%
        transform translate(-50%,-50%)
        font-size $font-size-medium-x
        background-color #eee
        color $color-theme
        font-weight 700
    .recommend-content
      display flex
      flex-wrap wrap
      margin-bottom 40px
    .bottom-line
      position relative
      width 50%
      margin 0 auto
      height 40px
      border-top 1px solid $color-text-l
      p
        position absolute
        left 50%
        top 0
        transform translate(-50%,-60%)
        width 100px
        height 40px
        padding 0 10px
        color $color-text-l
        line-height 50px
        text-align center
        font-size  $font-size-medium
        background-color $color-text-ll
</style>
