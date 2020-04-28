<template>
  <div class="order">
<!--    <div class="header">-->
<!--      <div class="back iconfont icon-arrow-right-copy-copy-copy-copy" @click="$router.go(-1)"></div>-->
<!--      <div class="title">订单管理</div>-->
<!--    </div>-->
    <nav-header title="确认订单"></nav-header>
    <div class='main'>
      <div class='address-wrap' @click="$router.push('/mine/address')">
        <div class='persion-info' v-show="name?true:false">
          <span>收货人：{{name}}</span><span>{{cellphone}}</span>
        </div>
        <div class='address' v-show="name?true:false">
          <img src="../../../assets/images/home/cart/map.png" alt="收货地址"/><span>{{showArea}}</span>
        </div>
        <div v-show="!name?true:false" class='address-null'>您的收货地址为空,点击添加收货地址</div>
        <div class='arrow iconfont icon-arrow-right-copy-copy'></div>
        <div class='address-border-wrap'>
          <div class='trapezoid style1'></div>
          <div class='trapezoid style2'></div>
          <div class='trapezoid style1'></div>
          <div class='trapezoid style2'></div>
          <div class='trapezoid style1'></div>
          <div class='trapezoid style2'></div>
          <div class='trapezoid style1'></div>
          <div class='trapezoid style2'></div>
          <div class='trapezoid style1'></div>
          <div class='trapezoid style2'></div>
        </div>
      </div>
      <div class='goods-wrap'>
        <cube-scroll>
          <div class="goods-content">
            <div class='goods-list' v-for="(item,index) in newCartData" :key="index">
              <div class='image'><img :src="item.img" alt=""/></div>
              <div class='goods-param'>
                <div class='title'>{{item.title}}</div>
                <div class='attr'>
                            <span v-for="(item2,index2) in item.attrs" :key="index2">{{item2.title}}：
                                <template v-for="item3 in item2.param">{{item3.title}}</template>
                            </span>
                </div>
                <div class='amount'>x {{item.amount}}</div>
                <div class='price'>￥{{item.price}}</div>
              </div>
            </div>
            <ul class='total-wrap'>
              <li>商品总额</li>
              <li>￥{{total}}</li>
            </ul>
            <ul class='total-wrap'>
              <li>运费</li>
              <li>￥{{freight}}</li>
            </ul>
          </div>
        </cube-scroll>
      </div>
    </div>
    <div class='balance-wrap'>
      <div class='price-wrap'>
        <span>实际金额：</span><span>￥{{total+freight}}</span>
      </div>
      <div class='balance-btn' @click="submitOrder()">提交订单</div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    name: 'order',
    data () {
      return {
        aid: sessionStorage.addsid,
        name: '',
        cellphone: '',
        showArea: ''
      }
    },
    computed: {
      ...mapState({
        cartData: state => state.cart.cartData
      }),
      ...mapGetters({
        total: 'cart/total',
        freight: 'cart/freight'
      }),
      newCartData () {
        if (this.cartData.length > 0) {
          const data = this.cartData.filter(item => {
            return item.checked
          })
          return data
        } else {
          return []
        }
      }
    },
    created () {
      this.$utils.safeUser(this)
      this.isSubmit = true
      if (this.aid) {
        this.getAddressInfo({
          aid: this.aid,
          success: (res) => {
            this.name = res.data.name
            this.cellphone = res.data.cellphone
            this.showArea = res.data.province + res.data.city + res.data.area + res.data.address
          }
        })
      } else {
        this.getDefaultAddress({
          success: (res) => {
            sessionStorage.addsid = res.data.aid
            this.name = res.data.name
            this.cellphone = res.data.cellphone
            this.showArea = res.data.province + res.data.city + res.data.area + res.data.address
          }
        })
      }
    },
    mounted () {
      document.title = this.$route.meta.title
    },
    methods: {
      ...mapActions({
        getAddressInfo: 'address/getAddressInfo',
        getDefaultAddress: 'address/getDefaultAddress',
        addOrder: 'order/addOrder'
      }),
      // 提交订单
      submitOrder () {
        if (this.total > 0) {
          if (this.isSubmit) {
            this.isSubmit = false
            this.addOrder({
              freight: this.freight,
              goodsData: JSON.stringify(this.cartData),
              addsid: sessionStorage.addsid,
              success: (res) => {
                if (res.code === 200) {
                  this.$router.push('/home/order/end')
                }
              }
            })
          }
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@assets/css/variable.styl'
  @import '~@assets/css/mixin.styl'
  .order
    width: 100%
    min-height: 100vh
    background-color: $color-background
    overflow: hidden
    font-size $font-size-medium

    .header
      position relative
      height 50px
      font-size $font-size-large-x
      border-bottom 1px solid $color-text-ll

      .back
        width 50px
        height 50px
        text-align center
        line-height 50px

      .title
        height 50px
        line-height 50px
        font-size $font-size-large
        color $color-text
        position absolute
        left 50%
        top 50%
        transform translate(-50%, -50%)

    .main
      width: 100%

      .address-wrap
        width: 100%
        height: 60px
        position: relative
        z-index: 1

        .address-null
          line-height 60px
          text-align center
          no-wrap()

        .address-border-wrap
          width 100%
          position: absolute
          z-index: 1
          left: 0
          bottom: 0
          display: flex

          .trapezoid
            width: 6%
            margin-left: 1%
            margin-right: 1%

            &.style1
              border-bottom: 2px solid #fdcd4d
              border-left: 5px solid transparent
              border-right: 5px solid transparent

            &.style2
              border-top: 2px solid #84614d
              border-left: 5px solid transparent
              border-right: 5px solid transparent

        .persion-info
          height: auto
          position: absolute
          z-index: 1
          left: 20px
          top: 20%
          font-size: $font-size-small
          font-weight: bold
          no-wrap()

          span:nth-child(1)
            padding-right: 30px

        .address
          width: auto
          height: auto
          position: absolute
          z-index: 1
          left: 20px
          top: 60%
          font-size: $font-size-small
          no-wrap()

          img
            width: 15px
            height: 15px
            vertical-align: middle
            margin-right: 15px

        .arrow
          width: 15px
          height: 15px
          position: absolute;
          z-index: 1;
          right: 10px
          top: 20px
          color $color-text-l

      .goods-wrap
        width: 100%
        height 507px
        padding 0 20px
        overflow: hidden
        box-sizing border-box
        background-color $color-background
        position relative
        z-index 11
        .goods-content
          width 100%
          min-height 510px
          padding-top 20px
          .goods-list
            width: 100%
            height: 2rem
            margin: 0 auto
            display: flex
            display: -webkit-flex
            align-items: center
            margin-bottom: 20px
            &.last-child
              margin-bottom 50px
            .image
              width: 50px
              height: 50px
              margin-right: 10px
              img
                width: 100%
                height: 100%
            .goods-param
              width: 75%
            .title
              width: 100%
              height: 15px
              overflow: hidden
              font-size: $font-size-small
              no-wrap()
            .attr
              width: 100%
              height: 12px
              font-size: $font-size-small-s
              margin-top: 5px
              color:$color-text-l
              span
                padding-right: 10px
            .amount
              font-size: $font-size-small-s
              color:$color-text-l
              margin-top: 5px
            .price
              font-size:  $font-size-small-s
              color: $color-theme
              margin-top: 5px

      .total-wrap
        width: 80%
        margin: 0 auto
        display: flex
        justify-content: flex-end
        margin-bottom: 10px
        &:last-child
          margin-bottom: 50px
        li
          margin-right 10px
          &:nth-child(2)
            color: $color-theme

    .balance-wrap
      width: 100%
      height: 50px
      line-height: 50px
      border-top: 1px solid $color-text-ll
      background-color $color-background
      position: fixed
      z-index: 11
      left: 0
      bottom: 0
      display: flex
      box-sizing border-box

      .price-wrap
        flex: 2
        text-align: right
        padding-right: 20px

        span:nth-child(2)
          color: $color-theme

      .balance-btn
        flex: 1
        background-color: $color-theme
        color: $color-background
        text-align: center
</style>
