<template>
  <div class="page">
    <div class='swpier-wrap swiper-container' ref="swpier-wrap">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in details.images" :key="index">
          <img :src="item"/>
        </div>
      </div>
      <div ref="swiper-pagination" class="swiper-pagination"></div>
    </div>
    <div class='goods-ele-main'>
      <div class='goods-title'>{{details.title}}</div>
      <div class='price'>¥{{details.price}}元</div>
      <ul class='sales-wrap'>
        <li>快递：{{details.freight}}元</li>
        <li>月销量{{details.sales}}件</li>
      </ul>
    </div>
    <divider></divider>
    <div class='reviews-main'>
      <div class="reviews-title">商品评价（{{total}}）</div>
      <div v-show="reviews.length>0">
        <div class='reviews-wrap'>
          <div class='reviews-list' v-for="(item,index) in reviews" :key="index">
            <div class='uinfo'>
              <div class='head'><img alt="" src="../../../assets/images/common/lazyImg.jpg" :data-echo="item.head"/>
              </div>
              <div class='nickname'>{{item.nickname}}</div>
            </div>
            <div class='reviews-content' v-html="item.content"></div>
            <div class='reviews-date'>{{item.times}}</div>
          </div>
        </div>
        <div class='reviews-more' @click="$router.push('/goods/details/review?gid='+gid)">查看更多评价</div>
      </div>
      <div class="no-data" v-show="reviews.length<=0">暂无评价！</div>
    </div>
    <div class='bottom-btn-wrap'>
      <div class='btn fav' @click="addFav()">收藏</div>
      <div class='btn cart' @click="showPanel()">加入购物车</div>
    </div>
    <div class='mask' v-show="isPanel" @click="hidePanel()"></div>
    <div ref="cart-panel" :class="isPanel?'cart-panel up':'cart-panel down'">
      <div ref="goods-info" class='goods-info'>
        <div class='close-panel-wrap'>
          <div class='spot'></div>
          <div class="line"></div>
          <div class='close iconfont icon-jiahao' @click="hidePanel()"></div>
        </div>
        <div ref="goods-img" class='goods-img'>
          <img :src="details.images && details.images[0]" alt=""/>
        </div>
        <div class='goods-wrap'>
          <div class='goods-title'>{{details.title}}</div>
          <div class='price'>¥{{details.price}}</div>
          <div class='goods-code'>商品编码:{{gid}}</div>
        </div>
      </div>
      <div class='attr-wrap'>
        <div class='attr-list' v-for="(item,index) in attrs" :key="index">
          <div class='attr-name'>{{item.title}}</div>
          <div class='val-wrap'>
            <span :class="{'val':true ,'active':item2.active}" v-for="(item2,index2) in item.values" :key="index2"
                  @click="SELECT_ATTR({index:index,index2:index2})">{{item2.value}}</span>
          </div>
        </div>
      </div>
      <div class='amount-wrap'>
        <div class='amount-name'>购买数量</div>
        <div class="amount-input-wrap">
          <div class="btn dec" @click="amount>1?--amount:1">-</div>
          <div class='amount-input'><input type="tel" :value="amount" @input="setAmount($event)"/></div>
          <div class='btn inc' @click="++amount">+</div>
        </div>
      </div>
      <div class='sure-btn' @click="sureSubmit()">确定</div>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapActions, mapGetters } from 'vuex'
  import Swiper from '../../../assets/js/libs/swiper'
  import TweenMax from '../../../assets/js/libs/TweenMax'

  export default {
    name: 'details-item',
    data () {
      return {
        isPanel: false,
        amount: 1,
        gid: this.$route.query.gid ? this.$route.query.gid : ''
      }
    },
    created () {
      this.isMove = true
      this.getDetails({
        gid: this.gid,
        success: () => {
          this.$nextTick(() => {
            document.title = this.details.title
            this.swiper = new Swiper(this.$refs['swpier-wrap'], {
              autoplay: 3000,
              pagination: this.$refs['swiper-pagination'],
              paginationType: 'fraction',
              loop: true
            })
          })
        }
      })
      console.log(this.details)
      this.getSpec({ gid: this.gid })
      this.getReviews({
        gid: this.gid,
        success: () => {
          this.$nextTick(() => {
            this.$utils.lazyImg()
          })
        }
      })
    },
    computed: {
      ...mapGetters({
        attrs: 'goods/attrs',
        details: 'goods/details',
        total: 'goodsReview/total',
        reviews: 'goodsReview/reviews',
        isLogin: 'user/isLogin'
      })
    },
    mounted () {

    },
    methods: {
      ...mapMutations({
        SELECT_ATTR: 'goods/SELECT_ATTR',
        ADD_ITEM: 'cart/ADD_ITEM'
      }),
      ...mapActions({
        getDetails: 'goods/getDetails',
        getSpec: 'goods/getSpec',
        getReviews: 'goodsReview/getReviews',
        joinFav: 'goods/addFav'
      }),
      // 显示属性面板
      showPanel () {
        this.isPanel = true
      },
      // 隐藏属性面板
      hidePanel () {
        if (this.isMove) {
          this.isPanel = false
        }
      },
      // 设置数量
      setAmount (e) {
        this.amount = e.target.value
        this.amount = this.amount.replace(/[^\d]/g, '')
        if (!this.amount || this.amount === '0') {
          this.amount = 1
        }
      },
      // 确认提交
      sureSubmit () {
        if (this.attrs.length > 0) {
          let isActive = false
          for (let i = 0; i < this.attrs.length; i++) {
            isActive = false
            for (let j = 0; j < this.attrs[i].values.length; j++) {
              if (this.attrs[i].values[j].active) {
                isActive = true
                break
              }
            }
            if (!isActive) {
              this.$createToast({
                type: 'txt',
                txt: '请选择' + this.attrs[i].title
              }).show()
              break
            }
          }
          if (isActive) {
            this.addCart()
          }
        }
      },
      // 添加购物车
      addCart () {
        if (this.isMove) {
          this.isMove = false
          const goodsImg = this.$refs['goods-img']
          const goodsInfo = this.$refs['goods-info']
          const cloneImg = goodsImg.cloneNode(true)
          const cartIcon = document.getElementById('cart-icon')
          cloneImg.style.cssText = 'position:absolute;z-index:10;left:0.2rem;top:0.2rem;width:0.4rem;height:0.4rem;border-radius:50%;'
          goodsInfo.appendChild(cloneImg)
          const cartTop = window.innerHeight - this.$refs['cart-panel'].offsetHeight
          TweenMax.to(cloneImg, 1.5, {
            bezier: {
              type: 'thru',
              curviness: 2,
              values: [{
                x: cloneImg.offsetLeft,
                y: -100
              }, {
                x: cartIcon.offsetLeft,
                y: -cartTop
              }]
            },
            onComplete: () => {
              cloneImg.remove()
              this.isMove = true

              // 加入购物车
              const attrs = []
              let param = []

              if (this.attrs.length > 0) {
                for (let i = 0; i < this.attrs.length; i++) {
                  param = []
                  for (let j = 0; j < this.attrs[i].values.length; j++) {
                    if (this.attrs[i].values[j].active) {
                      param.push({
                        paramid: this.attrs[i].values[j].vid,
                        title: this.attrs[i].values[j].value
                      })
                    }
                  }
                  attrs.push({
                    attrid: this.attrs[i].attrid,
                    title: this.attrs[i].title,
                    param: param
                  })
                }
              }

              const cartData = {
                gid: this.gid,
                title: this.details.title,
                amount: this.amount,
                price: this.details.price,
                img: this.details.images[0],
                checked: true,
                freight: this.details.freight,
                attrs: attrs
              }
              this.ADD_ITEM({ cartData: cartData })
            }
          })
          TweenMax.to(cloneImg, 0.2, {
            rotation: 360,
            repeat: -1
          })
        }
      },
      // 我的收藏
      addFav () {
        if (this.isLogin) {
          this.joinFav({
            gid: this.gid,
            success: (res) => {
              this.$createToast({
                type: 'txt',
                txt: res.data
              }).show()
            }
          })
        } else {
          this.$createToast({
            type: 'txt',
            txt: '请登录会员'
          }).show()
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@assets/css/variable.styl'
  .page
    font-size $font-size-medium

    .swpier-wrap
      width: 100%
      height: 100vw
      overflow: hidden
      position: relative
      z-index: 1
      margin-top: 60px

      .swiper-wrapper
        display flex
        flex-wrap nowrap

        img
          width 375px
          height 375px

      .swiper-pagination
        position absolute
        left 50%
        transform translateX(-50%)
        bottom 10px

    .goods-ele-main
      width: 100%
      height: auto
      background-color: #FFFFFF
      margin: 0 auto
      padding 10px 0
      font-size $font-size-medium-x

      .goods-title
        width: 90%
        color $color-text
        font-weight 700
        line-height 1.5
        margin: 0 auto

      .price
        color: $color-text-price
        width: 90%
        margin: 0 auto
        margin-top: 10px

      .sales-wrap
        width: 90%;
        margin: 0 auto;
        font-size: $font-size-small
        display: flex;
        justify-content: space-between;
        margin-top: 10px

    .reviews-main
      width: 100%
      margin-top: 15px
      overflow: hidden
      padding-bottom: 50px

      .reviews-title
        width: 90%
        margin: 0 auto
        margin-top: 10px

      .reviews-wrap
        width: 90%
        margin: 0 auto

        .reviews-list
          width: 100%
          margin-top: 10px

          .uinfo
            width: 100%
            display: flex
            height: 30px
            align-items: center
            -webkit-align-items: center

            .head
              width: 30px
              height: 30px
              margin-right: 20px

              img
                width: 100%
                height: 100%
                border-radius: 100%

            .nickname
              width: auto
              font-size: $font-size-small

          .reviews-content
            width: 100%;
            min-height 30px
            line-height 1.2
            margin: 0 auto;
            font-size: $font-size-small
            margin-top: 10px

          .reviews-date
            width: auto
            font-size: $font-size-small
            color: $color-text-l
            margin-top: 10px

      .reviews-more
        width: 30%
        height: 26px
        border: solid 1px $color-text-l
        line-height: 26px
        text-align: center
        font-size: $font-size-small
        margin: 20px auto
        border-radius: 5px

      .no-data
        width 90%
        margin 0 auto
        padding 20px 0

    .bottom-btn-wrap
      width: 100%
      height: 50px
      position: fixed
      bottom: 0
      left: 0
      z-index: 10
      display: flex

      .btn
        flex 1
        height: 100%
        font-size: $font-size-medium-x
        color: $color-background
        text-align: center
        line-height: 50px

        &.fav
          background-color: #FCB40A

        &.cart
          background-color: #CC0004

    .mask
      width: 100%
      height: 100%
      position: fixed
      left: 0
      top: 0
      z-index: 11
      background-color: $color-mask

    .cart-panel
      width: 100%
      height: 60%
      position: fixed
      z-index: 12
      left: 0
      bottom: 0
      background-color: $color-background
      transition: transform 0.3s

      &.down
        transform: translateY(120%)

      &.up
        transform: translateY(0%)

      .goods-info
        width: 90%
        margin 0 auto
        margin-top 10px
        height: 100px
        border-bottom: 1px solid $color-text-l
        display: flex
        position: relative
        z-index: 1

        .goods-img
          flex-shrink 0
          align-self center
          width: 80px
          height: 80px

          img
            width: 100%
            height: 100%

        .goods-wrap
          width: 80%
          padding-left 20px

          .goods-title
            padding 20px 0
            width: 100%
            height: 28px
            font-size: $font-size-medium
            overflow: hidden

          .price
            color: $color-text-price
            font-size: $font-size-medium

          .goods-code
            color: $color-text-l
            font-size: $font-size-small
            position: absolute;
            z-index: 1;
            right: 5px
            bottom: 0

      .attr-wrap
        width: 90%
        margin 0 auto
        overflow-y: scroll;
        overflow-scrolling: touch

        .attr-list
          width: 100%
          height: auto
          margin-top: 10px
          font-size $font-size-medium

          .attr-name
          .val-wrap
            margin-top: 10px
            display: flex
            justify-content flex-start
            flex-wrap: wrap

            .val.active
              color: $color-background
              background-color: $color-active

            .val
              background: $color-text-ll
              font-size: $font-size-small
              padding: 5px 10px
              border-radius: 2px
              margin-right: 8px
              margin-bottom: 10px

      .amount-wrap
        width: 90%
        margin 10px auto
        display: flex
        justify-content: space-between
        align-items: center
        height: 20px
        font-size $font-size-medium

        .amount-input-wrap
          width: 60px
          height: 20px
          border: 1px solid $color-text
          border-radius: 5px
          display: flex
          align-items: center
          color $color-text-l

          .dec
            border-right: 1px solid $color-text-l

          .amount-input
            width: 30px
            height: 100%

            input
              width: 100%
              height: 100%
              text-align: center

          .inc
            border-left: 1px solid $color-text-l

          .btn
            width: 20px
            height: 14px
            font-size: $font-size-small
            text-align: center
            line-height: 14px

      .sure-btn
        width: 100%
        height: 50px
        position: absolute
        bottom: 0
        left: 0
        z-index: 1
        color $color-background
        font-size: $font-size-medium-x
        background-color: #CF0005
        text-align: center
        line-height: 50px

      .close-panel-wrap
        width: 20px
        height: 50px
        position: absolute
        right: -20px
        top: -50px
        z-index: 2

        .spot
          width: 5px
          height: 5px
          position: absolute;
          z-index: 1
          bottom: 0
          left: 0
          background-color: $color-text
          border-radius: 100%

        .line
          width: 1px
          height: 30px
          background-color: $color-background
          position: absolute;
          z-index: 1;
          left: 2px
          bottom: 2px

        .close
          width: 20px
          height: 20px
          background-color $color-background
          border-radius 50%
          position: absolute;
          left: -8px
          top: 0
          z-index: 1
          font-size $font-size-small
          text-align center
          line-height 22px
          transform rotate(45deg)
</style>
