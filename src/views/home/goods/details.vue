<template>
  <div>
    <div class='details-header'>
      <div class='back iconfont icon-arrow-right-copy-copy-copy-copy' @click="$router.go(-1)"></div>
      <div class='tab-wrap'>
        <div :class="{'tab-name':true, active:itemStyle}"
             @click="$route.name !== 'details-item'&&$router.replace('/goods/details?gid='+gid)">商品
        </div>
        <div :class="{'tab-name':true, active:contentStyle}"
             @click="$route.name !== 'details-content'&& $router.replace('/goods/details/content?gid='+gid)">详情
        </div>
        <div :class="{'tab-name':true, active:reviewStyle}"
             @click="$route.name !== 'details-review' && $router.replace('/goods/details/review?gid='+gid)">
          评价
        </div>
      </div>
      <div id="cart-icon" class='cart-icon iconfont icon-gouwuche' @click="$router.push('/home/cart?from=details')">
        <div class='spot' v-show="$store.state.cart.cartData.length>0"></div>
      </div>
    </div>
    <div class="sub-page">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'mdetails',
    data () {
      return {
        gid: this.$route.query.gid ? this.$route.query.gid : '',
        itemStyle: true,
        contentStyle: false,
        reviewStyle: false,
        styles: {
          'details-item': [true, false, false],
          'details-content': [false, true, false],
          'details-review': [false, false, true]
        }
      }
    },
    created () {
      this.changeTabStyle(this.$route.name)
    },
    methods: {
      changeTabStyle (name) {
        Object.keys(this.styles).forEach(k => {
          if (k === name) {
            this.itemStyle = this.styles[k][0]
            this.contentStyle = this.styles[k][1]
            this.reviewStyle = this.styles[k][2]
          }
        })
      }
    },
    beforeRouteUpdate (to, from, next) {
      this.changeTabStyle(to.name)
      next()
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@assets/css/variable.styl'
  .details-header
    width: 100%
    height: 60px
    background-color: $color-background
    display: flex
    align-items: center
    justify-content: space-between
    position: fixed
    z-index: 10
    left: 0
    top: 0
    font-size: $font-size-large

    .back
      font-size $font-size-large-x
      color $color-text-l
      width: 60px
      height: 60px
      line-height 60px
      text-align center

    .tab-wrap
      width: 70%
      height: 100%
      display: flex
      justify-content: center

      .tab-name
        overflow: hidden
        line-height: 60px
        text-align: center
        margin-left: 9%
        margin-right: 9%

      & .active
        color $color-active
        border-bottom: solid 2px $color-active

    .cart-icon
      width: 60px
      height: 60px
      text-align center
      line-height 60px
      font-size $font-size-large-x
      position: relative
      z-index: 1

      .spot
        width: 6px
        height: 10px
        padding 0 2px
        background-color: $color-theme
        border-radius: 100%
        position: absolute;
        z-index: 1
        left: 38px
        top: 15px

  .sub-page
    width: 100%
</style>
