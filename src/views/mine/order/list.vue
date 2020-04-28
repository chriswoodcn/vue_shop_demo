<template>
  <div>
    <div class='order-list' v-for="(item,index) in orders" :key="index"
         @click="$router.push('/mine/order/details?ordernum='+item.ordernum)">
      <div class='ordernum-wrap'>
        <div class='ordernum'>订单编号：{{item.ordernum}}</div>
        <div class='status'>{{item.status==='0'?'待付款':item.status==='1'?'待收货':'已收货'}}</div>
      </div>
      <div class='item-list' v-for="(item2,index2) in item.goods" :key="index2">
        <div class='image'><img v-lazy="item2.image" alt=""/></div>
        <div class='title'>{{item2.title}}</div>
        <div class='amount'>x {{item2.amount}}</div>
      </div>
      <div class='total-wrap'>
        <div class='total'>实付金额：¥{{item.total}}</div>
        <div class="status-wrap">
          <div class='status-btn' v-if="item.status==='0'" @click.stop="cancelOrder(index,item.ordernum)">取消订单</div>
          <div class='status-btn' @click.stop="sureOrder(index,item)">
            {{item.status==='0'?'去付款':item.status==='1'?'确认收货':'已收货'}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import UpRefresh from '../../../assets/js/libs/uprefresh'

  export default {
    name: 'order-list',
    methods: {
      ...mapActions({
        getMyOrder: 'order/getMyOrder',
        getMyOrderPage: 'order/getMyOrderPage',
        asyncCancelOrder: 'order/cancelOrder',
        asyncSureOrder: 'order/sureOrder'
      }),
      getData () {
        this.getMyOrder({
          status: this.status,
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
              this.getMyOrderPage({
                status: this.status,
                page: page
              })
            })
          }
        })
      },
      // 取消订单
      cancelOrder (index, orderNum) {
        this.$createDialog({
          type: 'confirm',
          content: '确认要取消吗？',
          confirmBtn: {
            text: '确定',
            href: 'javascript:;'
          },
          cancelBtn: {
            text: '取消',
            href: 'javascript:;'
          },
          onConfirm: () => {
            this.asyncCancelOrder({
              orderNum: orderNum,
              index: index
            })
          }
        }).show()
      },
      // 确认订单
      sureOrder (index, item) {
        if (item.status !== '2') {
          this.asyncSureOrder({
            orderNum: item.ordernum,
            index: index,
            status: 2
          })
        }
      }
    },
    computed: {
      ...mapState({
        orders: state => state.order.orders
      })
    },
    created () {
      this.status = this.$route.query.status ? this.$route.query.status : 'all'
      this.pullUp = new UpRefresh()
      this.getData()
    },
    beforeDestroy () {
      this.pullUp.uneventSrcoll()
    },
    beforeRouteUpdate (to, from, next) {
      this.status = to.query.status
      this.getData()
      next()
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
        width: 72%;
        height: auto;
        line-height 1.5
        position: absolute;
        z-index: 1;
        left: 22%;
        top: 20%

      .amount
        position: absolute;
        z-index: 1;
        right: 2%;
        bottom: 20%
        color: $color-text-l

    .total-wrap
      width: 92%
      height: 30px
      border-bottom: 1px solid $color-theme
      display: flex
      align-items: center
      justify-content: space-between
      padding-left: 4%
      padding-right: 4%
      font-size $font-size-small
      .status-wrap
        display: flex
        justify-content: flex-end
        .status-btn
          text-align: center
          border: 1px solid $color-theme
          border-radius: 5px
          padding 5px 5px
          margin-left 10px

</style>
