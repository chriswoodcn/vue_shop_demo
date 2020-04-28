<template>
  <div class="order-end">
    <nav-header title="下单成功"></nav-header>
    <div class='main'>
      <div class='list success'>下单成功！</div>
      <div class='list ordernum'>订单编号：{{orderNum}}</div>
      <div class='list' @click="$router.push('/mine/order')">查看订单</div>
      <div class='pay-btn'>去付款</div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    name: 'order-end',
    created () {
      this.$utils.safeUser(this)
      this.getOrderNum()
    },
    computed: {
      ...mapState({
        orderNum: state => state.order.orderNum
      })
    },
    methods: {
      ...mapActions({
        getOrderNum: 'order/getOrderNum'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@assets/css/variable.styl'
  @import '~@assets/css/mixin.styl'
  .order-end
    width: 100%
    min-height: 100vh
    background-color: $color-background
    overflow: hidden
    font-size $font-size-medium

    .main
      width: 100%
      margin-top: 30px

      .list
        width: 100%
        text-align: center
        margin-bottom: 20px

        &.success
          color: #E51B19

        &.ordernum
          color: #F17F1F

      .pay-btn
        width: 160px
        height: 30px
        color: $color-background
        text-align: center
        margin: 0 auto
        background-color: #0a8ddf
        line-height: 30px
        border-radius: 5px
</style>
