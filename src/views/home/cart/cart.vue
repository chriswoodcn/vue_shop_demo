<template>
  <div class="cart-main">
    <div class="header">
      <div class="title">购物车</div>
    </div>
    <div class="cart-list-wrapper">
      <cube-scroll :data="cartData">
      <div class='cart-list' v-for="(item,index) in cartData" :key="index">
        <div :class="{'select-btn':true, 'active':item.checked}" @click="selectItem(index)"></div>
        <div class='image-wrap'>
          <div class='image'><img :src="item.img"/></div>
        </div>
        <div class='goods-wrap'>
          <div class='goods-title'>{{item.title}}</div>
          <div class='goods-attr'>
          <span v-for="(item2,index2) in item.attrs" :key="index2">{{item2.title}}：
              <template v-for="item3 in item2.param">{{item3.title}}</template>
          </span>
          </div>
          <div class='buy-wrap'>
            <div class='price'>¥{{item.price}}</div>
            <div class="amount-input-wrap">
              <div :class="item.amount>1?'btn dec':'btn dec active'" @click="DEC_AMOUNT({index:index})">-
              </div>
              <div class='amount-input'><input type="tel" :value="item.amount"
                                               @input="SET_AMOUNT({index:index,amount:$event.target.value})"/>
              </div>
              <div class='btn inc' @click="INC_AMOUNT({index:index})">+</div>
            </div>
          </div>
        </div>
        <div class='del' @click="delItem(index)">删除</div>
      </div>
      </cube-scroll>
    </div>
    <div class='orderend-wrap'>
      <div class='select-area'>
        <div class='select-wrap' @click="allSelect()">
          <div :class="{'select-btn':true, active:isAllSelect}"></div>
          <div class='select-text'>全选</div>
        </div>
        <div class='total'>运费：<span>¥{{freight}}</span>&nbsp;&nbsp;合计：<span>¥{{total}}</span></div>
      </div>
      <div :class="total>0?'orderend-btn':'orderend-btn disable'" @click="statement()">去结算</div>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapState, mapGetters } from 'vuex'
  import baseMixins from '../../../assets/js/mixins/baseMixins'

  export default {
    name: 'cart',
    mixins: [baseMixins],
    data () {
      return {
        isAllSelect: true
      }
    },
    created () {
      this.checkAllSelect()
    },
    mounted () {
      document.title = this.$route.meta.title
    },
    computed: {
      ...mapState({
        cartData: state => state.cart.cartData
      }),
      ...mapGetters({
        total: 'cart/total',
        freight: 'cart/freight'
      })
    },
    methods: {
      ...mapMutations({
        DEL_ITEM: 'cart/DEL_ITEM',
        SET_AMOUNT: 'cart/SET_AMOUNT',
        INC_AMOUNT: 'cart/INC_AMOUNT',
        DEC_AMOUNT: 'cart/DEC_AMOUNT',
        SELECT_ITEM: 'cart/SELECT_ITEM',
        ALL_SELECT_ITEM: 'cart/ALL_SELECT_ITEM'
      }),
      // 删除商品
      delItem (index) {
        this.DEL_ITEM({ index: index })
        this.checkAllSelect()
      },
      // 选择商品
      selectItem (index) {
        this.SELECT_ITEM({ index: index })
        if (this.cartData.length > 0) {
          let isChecked = true
          for (let i = 0; i < this.cartData.length; i++) {
            if (!this.cartData[i].checked) {
              isChecked = false
              break
            }
          }
          this.isAllSelect = isChecked
        } else {
          this.isAllSelect = false
        }
      },
      // 全选
      allSelect () {
        if (this.cartData.length > 0) {
          this.isAllSelect = !this.isAllSelect
          this.ALL_SELECT_ITEM({ checked: this.isAllSelect })
        }
      },
      // 检测是否全选
      checkAllSelect () {
        if (this.cartData.length > 0) {
          let isChecked = true
          for (let i = 0; i < this.cartData.length; i++) {
            if (!this.cartData[i].checked) {
              isChecked = false
              break
            }
          }
          this.isAllSelect = isChecked
        } else {
          this.isAllSelect = false
        }
      },
      // 去结算
      statement () {
        if (this.total > 0) {
          this.$router.push('/order')
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@assets/css/variable.styl'
  @import '~@assets/css/mixin.styl'
  .cart-main
    position fixed
    left 0
    right 0
    top 0
    bottom 60px
    font-size $font-size-medium
    color $color-text-l
    background-color $color-text-ll

    .header
      position relative
      height 50px
      background-color $color-background
      font-size $font-size-large-x

      .title
        height 50px
        line-height 50px
        font-size $font-size-large
        color $color-text
        position absolute
        left 50%
        top 50%
        transform translate(-50%, -50%)

    .cart-list-wrapper
      position absolute
      left 0
      right 0
      top 50px
      bottom 40px
      width 100%
      overflow hidden

      .cart-list
        width: 90%
        margin 10px auto 0
        padding 10px 10px
        box-sizing border-box
        min-height 100px
        background-color: $color-background
        display: flex
        justify-content space-around
        align-items: center
        border-radius 5px
        &:last-child
          margin-bottom 50px
        .select-btn
          width: 18px
          height: 18px
          border: $color-background-d solid 1px
          border-radius: 100%
          margin-right: 10px

          &.active
            background-image: url("../../../assets/images/home/cart/checkmark.png");
            background-size: 100%
            background-repeat: no-repeat
            background-position: center
            border: $color-background solid 1px

        .image-wrap
          width: 50px
          height 50px
          margin-right: 10px

          .image
            img
              width: 100%
              height: 100%

        .del
          width: 30px
          text-align: center
          font-size: $font-size-small

        .goods-wrap
          width: 60%
          font-size: 0.24rem

        .goods-title
          width: 100%
          font-size $font-size-medium
          line-height 1.5
          margin-bottom 5px
          no-wrap()

        .goods-attr
          width: 100%
          line-height 1.5

          span
            padding-right: 5px

        .buy-wrap
          width: 100%
          height: 30px
          display: flex
          justify-content: space-between
          align-items: center

          .price
            font-size: $font-size-small-s
            color: $color-theme
            line-height 12px

          .amount-input-wrap
            width: 80px
            height: 20px
            border: 1px solid $color-text-ll
            margin-right: 5px
            border-radius: 5px
            display: flex
            align-items: center

            .btn
              width: 27px
              height: 14px
              font-size: $font-size-small-s
              text-align: center
              line-height: 15px

            .dec
              border-right: 1px solid $color-text-ll

            .inc
              border-left: 1px solid $color-text-ll

            .amount-input
              flex 1
              height: 100%

              input
                width: 100%
                height: 100%
                text-align: center

    .orderend-wrap
      width: 100%
      height: 40px
      background: $color-background
      position: fixed
      z-index: 10
      left: 0
      bottom: 60px
      border-top: 1px solid $color-background-d
      display: flex

      .select-area
        height: 100%
        flex: 3
        display: flex
        display: -webkit-flex
        justify-content: space-between
        align-items: center

        .select-wrap
          display: flex
          align-items: center

          .select-text
            padding-left 10px

          .select-btn
            width: 18px
            height: 18px
            border: 1px solid $color-background-d
            border-radius: 50%
            margin-left: 10px

            &.active
              background-image: url("../../../assets/images/home/cart/checkmark.png")
              background-size: 100%
              background-repeat: no-repeat
              background-position: center
              border 1px solid $color-background

      .orderend-btn
        height: 100%
        flex: 1
        background: $color-theme
        color: #FFFFFF
        text-align: center
        line-height: 40px

        &.disable
          background: $color-background-dd

      .total
        font-size: $font-size-small
        margin-right: 10px

        span
          color: $color-theme
</style>
