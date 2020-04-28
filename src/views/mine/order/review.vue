<template>
  <div>
    <div class='order-list' v-for="(item,index) in reviewOrders" :key="index"
         @click="$router.push('/mine/order/details?ordernum='+item.ordernum)">
      <div class='ordernum-wrap'>
        <div class='ordernum'>订单编号：{{item.ordernum}}</div>
        <div class='status'>{{item.status === '0' ? '待付款':item.status ==='1' ? '待收货':'已收货'}}</div>
      </div>
      <div class='item-list' v-for="(item2,index2) in item.goods" :key="index2">
        <div class='image'><img v-lazy="item2.image" alt=""/></div>
        <div class='title'>{{item2.title}}</div>
        <div class='amount'>x {{item2.amount}}</div>
        <div class='status-btn'
             @click.stop="$router.push('/mine/order/add_review?gid='+item2.gid+'&ordernum='+item.ordernum+'')">
          {{item2.isreview === '0' ? '评价' :' 追加评价'}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import UpRefresh from '../../../assets/js/libs/uprefresh'

  export default {
    name: 'order-reivew',
    methods: {
      ...mapActions({
        getReviewOrder: 'order/getReviewOrder',
        getReviewOrderPage: 'order/getReviewOrderPage'
      })
    },
    computed: {
      ...mapState({
        reviewOrders: state => state.order.reviewOrders
      })
    },
    created () {
      this.$utils.safeUser(this)
      this.pullUp = new UpRefresh()
      this.getReviewOrder({
        page: 1,
        success: (pageNum) => {
          this.$nextTick(() => {
            this.$utils.lazyImg()
          })
          this.pullUp.init({
            curPage: 1,
            maxPage: parseInt(pageNum),
            offsetBottom: 100
          }, (page) => {
            this.getReviewOrderPage({ page: page })
          })
        }
      })
    },
    beforeDestroy () {
      this.pullUp.uneventSrcoll()
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@assets/css/variable.styl'
  .order-list
    width: 90%
    height: auto
    margin 0 auto
    margin-bottom 20px

    .ordernum-wrap
      height: 30px
      border-bottom: 1px solid $color-text-ll
      display: flex
      justify-content: space-between
      padding-left: 2%
      padding-right: 2%
      align-items: center
      font-size $font-size-small

      .status
        width: auto
        height: auto

    .item-list
      width: 100%
      min-height: 100px
      border-bottom: 1px solid $color-text-ll
      position: relative;
      z-index: 1
      font-size $font-size-small

      .image
        width: 50px
        height: 50px
        position: absolute
        z-index: 1
        left: 2%
        top: 50%
        transform translateY(-50%)

        img
          width: 100%
          height: 100%

      .title
        width: 72%
        height: auto
        line-height 1.5
        position: absolute
        z-index: 1
        left: 22%
        top: 20%

      .amount
        position: absolute
        z-index: 1
        right: 2%
        bottom: 30%
        color: $color-text-l

      .status-btn
        position: absolute
        z-index: 1
        right: 2%
        bottom: 2%
        color: $color-text-l
        padding 3px 6px
        border 1px solid $color-theme
        border-radius 5px
</style>
