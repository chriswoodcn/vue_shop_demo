<template>
  <div class='tags-wrap'>
    <div :class="{tags:true, active:status==='all'?true:false}" @click="$router.replace('/mine/order?status=all')">
      全部订单
    </div>
    <div :class="{tags:true, active:status==='0'?true:false}" @click="$router.replace('/mine/order?status=0')">待付款</div>
    <div :class="{tags:true, active:status==='1'?true:false}" @click="$router.replace('/mine/order?status=1')">待收货</div>
    <div :class="{tags:true, active:status==='2'?true:false}" @click="$router.replace('/mine/order/review?status=2')">
      待评价
    </div>
  </div>
</template>

<script>
  export default {
    name: 'order-tags',
    props: {
      status: {
        type: String,
        default: 'all'
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@assets/css/variable.styl'
  .tags-wrap
    width: 100%
    height: 40px
    line-height 40px
    font-size $font-size-medium
    background-color: $color-background
    position: relative
    border-bottom: 1px solid $color-text-ll
    display: flex
    box-sizing border-box

    .tags
      width: 25%
      height: 100%
      text-align: center
      &.active
        border-bottom: 1px solid $color-theme
</style>
