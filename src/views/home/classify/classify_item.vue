<template>
  <div ref="goods-classify-content" class="goods-content-main">
    <div v-show="goods.length > 0">
      <div class="goods-wrap" v-for="(item, index) in goods" :key="index">
        <div class="classify-name" v-if="item.goods">{{ item.title }}</div>
        <div class="goods-items-wrap" v-if="item.goods">
          <ul class="goods-items" v-for="(item2, index2) in item.goods" :key="index2" @click="$router.push('/goods/details?gid=' + item2.gid)">
            <li class="img"><img v-lazy="item2.image" /></li>
            <li class="text">{{ item2.title }}</li>
          </ul>
        </div>
      </div>
      <div class="footer">没有更多了</div>
    </div>
    <div v-show="goods.length <= 0" class="no-data">商品上新中,敬请期待...</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import IScroll from '../../../assets/js/libs/iscroll'

export default {
  methods: {
    ...mapActions({
      getGoods: 'goods/getGoods'
    }),
    init(cid) {
      this.getGoods({
        cid: cid,
        success: () => {
          this.$nextTick(() => {
            this.scrollPanel.refresh()
          })
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      goods: 'goods/goods'
    })
  },
  created() {
    this.cid = this.$route.query.cid ? this.$route.query.cid : ''
    this.init(this.cid)
  },
  mounted() {
    this.$refs['goods-classify-content'].addEventListener('touchmove', (e) => {
      e.preventDefault()
    })
    this.scrollPanel = new IScroll(this.$refs['goods-classify-content'], {
      scrollX: false,
      scrollY: true,
      preventDefault: false
    })
  },
  beforeRouteUpdate(to, from, next) {
    // console.log(to.query.cid)
    this.init(to.query.cid)
    next()
  },
  beforeDestroy() {
    this.$refs['goods-classify-content'].removeEventListener('touchmove', (e) => {
      e.preventDefault()
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~@assets/css/variable.styl'
.goods-content-main
  width 100%
  height 547px
  overflow hidden
  font-size $font-size-medium

  .no-data
    width: 100%
    heihgt 547px
    line-height 547px
    text-align center
    font-size $font-size-large

  .goods-wrap
    width 90%
    margin 10px auto

    .classify-name
      height 40px
      line-height 40px
      padding-left 10px
      font-size $font-size-medium-x
      background-color $color-background
      border-bottom 1px solid $color-text-ll
      border-top-left-radius 5px
      border-top-right-radius 5px

    .goods-items-wrap
      display flex
      flex-wrap wrap
      background-color $color-background
      overflow hidden
      padding 20px 10px
      border-bottom-left-radius 5px
      border-bottom-right-radius 5px

      .goods-items
        width 33.33%
        height 120px
        display flex
        flex-direction column
        align-items center
        justify-content space-around

        img
          width 60px
          height 60px
          margin 5px auto

        .text
          width 90%
          height 15px
          overflow hidden

  .footer
    height 50px
    text-align center
    line-height 30px
    font-size $font-size-small
    color $color-text-l
</style>
