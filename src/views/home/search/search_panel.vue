<template>
  <div class="search-panel">
    <div class="search-top">
      <div class="order-main">
        <div class="order" @click="selectAll()">
          <div class="order-text" :class="{ active: orders.isAll }">综合</div>
          <div class="order-icon iconfont icon-jiantou-copy" :class="{ active: orders.isAll }"></div>
        </div>
        <div class="order" @click="selectPrice()">
          <div class="order-text" :class="{ active: orders.isPriceUp || orders.isPriceDown }">价格</div>
          <div class="order-icon">
            <div class="iconfont icon-jiantou" :class="{ active: orders.isPriceUp }"></div>
            <div class="iconfont icon-jiantou-copy" :class="{ active: orders.isPriceDown }"></div>
          </div>
        </div>
        <div class="order" @click="selectSales()">
          <div class="order-text" :class="{ active: orders.isSalesOrder }">销量</div>
          <div class="order-icon iconfont icon-jiantou-copy" :class="{ active: orders.isSalesOrder }"></div>
        </div>
        <div class="order" @click="selectFilter">
          <div class="order-text" :class="{ active: orders.isFilter }">筛选</div>
        </div>
      </div>
    </div>
    <div class="scroll-goods" ref="scrollGoods">
      <div class="goods-main">
        <div
          class="goods-list"
          ref="goodsList"
          v-for="(item, index) in searchData"
          :key="index"
          @click="$router.push('/goods/details?gid=' + item.gid)"
        >
          <div class="image"><img v-lazy="item.image"/></div>
          <div class="goods-content">
            <div class="goods-title">{{ item.title }}</div>
            <div class="price">¥{{ item.price }}</div>
            <div class="sales">
              销量<span>{{ item.sales }}</span
            >件
            </div>
          </div>
        </div>
        <div class="more" v-show="searchData.length > 0 && ismore">下拉加载更多...</div>
        <div class="no-more" v-show="searchData.length > 0 && isnomore">没有更多了...</div>
        <div class="no-data" v-show="searchData.length <= 0">没有相关商品！</div>
      </div>
    </div>

    <div ref="mask" class="mask" v-show="isScreen" @click="isScreen = false"></div>

    <div ref="screen" class="screen" v-show="isScreen">
      <div class="attr-list">
        <div class="attr-wrap">
          <div class="attr-title-wrap" @click="isClassify = !isClassify">
            <div class="attr-name">分类</div>
            <div
              :class="{ 'iconfont icon-arrow-right-copy-copy-copy': !isClassify, 'iconfont icon-arrow-right-copy': isClassify }"></div>
          </div>
          <div class="item-wrap" v-show="!isClassify">
            <div
              v-for="(item, index) in classifys"
              :key="index"
              :class="{ item: true, active: item.active }"
              @click="selectClassify({ index: index })"
            >
              {{ item.title }}
            </div>
          </div>
        </div>
        <div class="attr-wrap">
          <div class="attr-title-wrap" @click="HIDE_PRICE()">
            <div class="attr-name">价格区间</div>
            <div class="price-wrap" @click.stop>
              <div class="price-input">
                <input ref="input" type="tel" placeholder="最低价" :value="minPrice"
                       @input="SET_MINPRICE({ minPrice: $event.target.value })"/>
              </div>
              <div class="price-line"></div>
              <div class="price-input">
                <input type="tel" placeholder="最高价" :value="maxPrice"
                       @input="SET_MAXPRICE({ maxPrice: $event.target.value })"/>
              </div>
            </div>
            <div
              :class="{ 'iconfont icon-arrow-right-copy-copy-copy': !priceData.isHide, 'iconfont icon-arrow-right-copy': priceData.isHide }"></div>
          </div>
          <div class="item-wrap" v-show="!priceData.isHide">
            <div
              :class="{ item: true, active: item.active }"
              v-for="(item, index) in priceData.items"
              :key="index"
              @click="SELECT_PRICE({ index: index })"
            >
              {{ item.price1 }}-{{ item.price2 }}
            </div>
          </div>
        </div>
        <div>
          <div class="attr-wrap" v-for="(item, index) in attrs" :key="index">
            <div class="attr-title-wrap" @click="HIDE_ATTR({ index: index })">
              <div class="attr-name">{{ item.title }}</div>
              <div
                :class="{ 'iconfont icon-arrow-right-copy-copy-copy': !item.isHide, 'iconfont icon-arrow-right-copy': item.isHide }"></div>
            </div>
            <div class="item-wrap" v-show="!item.isHide">
              <div
                :class="{ item: true, active: item2.active }"
                v-for="(item2, index2) in item.param"
                :key="index2"
                @click="SELECT_ATTR({ index: index, index2: index2 })"
              >
                {{ item2.title }}
              </div>
            </div>
          </div>
        </div>
        <!--          <div style="width: 100%; height: 1.2rem;"></div>-->
      </div>
      <div class="handel-wrap">
        <div class="item">
          共<span>{{ total }}</span
        >件
        </div>
        <div class="item reset" @click="resetScreen()">全部重置</div>
        <div class="item sure" @click="sureSubmit()">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import IScroll from '../../../assets/js/libs/iscroll'

  export default {
    name: 'search-panel',
    data () {
      return {
        orders: {
          isAll: true,
          isPriceUp: false,
          isPriceDown: false,
          isSalesOrder: false,
          isFilter: false
        },
        otype: 'all',
        isScreen: false,
        isClassify: false,
        isPullDownUpdating: false,
        isPullUpLoading: false,
        currentPage: 1,
        totalPage: 1,
        ismore: true,
        isnomore: false,
        keyword: this.$route.query.keyword || ''
      }
    },
    computed: {
      ...mapGetters({
        classifys: 'search/classifys',
        priceData: 'search/priceData',
        minPrice: 'search/minPrice',
        maxPrice: 'search/maxPrice',
        attrs: 'search/attrs',
        searchData: 'search/searchData',
        cid: 'search/cid',
        params: 'search/params',
        total: 'search/total'
      })
    },
    created () {
      this.pos = {}
      this.otype = 'all'
      // 获取分类数据
      this.getClassify({
        success: () => {
          this.$nextTick(() => {
            this.scrollScreen.refresh()
          })
        }
      })
      this.resetScreen()
      // 获取搜索数据,默认类型otype为all
      this.__init()
      this.getAttrs({
        keyword: this.keyword,
        success: () => {
          this.$nextTick(() => {
            this.scrollScreen.refresh()
          })
        }
      })
      console.log(this.$parent.keyword)
    },
    mounted () {
      this.$refs.screen.addEventListener('touchmove', this._disableScreenTochmove)
      this.$refs.scrollGoods.addEventListener('touchmove', this._disableScreenTochmove)
      this.scrollScreen = new IScroll(this.$refs.screen, {
        scrollX: false,
        scrollY: true,
        preventDefault: false
      })
      this.scrollGoods = new IScroll(this.$refs.scrollGoods, {
        scrollX: false,
        scrollY: true,
        preventDefault: false,
        probeType: 2
      })
      this.scrollGoods.on('scroll', () => {
        // 下拉刷新
        if (!this.isPullDownUpdating) {
          if (this.scrollGoods.y > 60) {
            this.isPullDownUpdating = true
            setTimeout(() => {
              this.__init()
              this.isPullDownUpdating = false
            }, 300)
          }
        }
        // 上拉加载
        if (!this.isPullUpLoading) {
          if (this.scrollGoods.y < this.scrollGoods.maxScrollY - 60) {
            this.isPullUpLoading = true
            setTimeout(() => {
              if (this.currentPage < this.totalPage) {
                this.currentPage += 1
              }
              if (this.currentPage === this.totalPage) {
                this.ismore = false
                this.isnomore = true
              }
              this.__init({ type: 'add' })
              this.isPullUpLoading = false
            }, 300)
          }
        }
      })
    },
    methods: {
      ...mapActions({
        getClassify: 'search/getClassify',
        selectClassify: 'search/selectClassify',
        getSearch: 'search/getSearch',
        getSearchPage: 'search/getSearchPage',
        getAttrs: 'search/getAttrs',
        resetScreen: 'search/resetScreen'
      }),
      ...mapMutations({
        HIDE_PRICE: 'search/HIDE_PRICE',
        SELECT_PRICE: 'search/SELECT_PRICE',
        SET_MINPRICE: 'search/SET_MINPRICE',
        SET_MAXPRICE: 'search/SET_MAXPRICE',
        HIDE_ATTR: 'search/HIDE_ATTR',
        SELECT_ATTR: 'search/SELECT_ATTR',
        SET_PARAMS: 'search/SET_PARAMS'
      }),
      selectAll () {
        this._singleOrder('isAll')
        this.otype = 'all'
        this.__init()
      },
      selectPrice () {
        if (this.orders.isPriceUp) {
          this._singleOrder('isPriceDown')
          this.otype = 'down'
          this.__init()
        } else if (this.orders.isPriceDown) {
          this._singleOrder('isPriceUp')
          this.otype = 'up'
          this.__init()
        } else {
          this._singleOrder('isPriceUp')
          this.otype = 'up'
          this.__init()
        }
      },
      // 销量排序
      selectSales () {
        this._singleOrder('isSalesOrder')
        this.otype = 'sales'
        this.__init()
      },
      selectFilter () {
        this.isScreen = true
        this._singleOrder('isFilter')
        this.$nextTick(() => {
          this.scrollScreen.refresh()
        })
      },
      // 禁用touchmove事件
      _disableScreenTochmove (e) {
        e.preventDefault()
      },
      __init (positions = { type: 'normal' }) {
        // 搜索选项配置
        const jsonParams = {
          keyword: this.keyword,
          otype: this.otype,
          cid: this.cid,
          price1: this.minPrice,
          price2: this.maxPrice,
          param: JSON.stringify(this.params)
        }
        // console.log(this.keyword)
        // console.log(this.otype)
        // console.log(this.cid)
        // console.log(this.minPrice)
        // console.log(this.maxPrice)
        // console.log(this.params)
        // console.log('------------------')
        if (positions.type === 'normal') {
          this.getSearch({
            ...jsonParams,
            success: (pageNum) => {
              this.totalPage = pageNum
              this.$nextTick(() => {
                this.scrollGoods.refresh()
              })
            }
          })
        }
        if (positions.type === 'add') {
          this.getSearchPage({
            ...jsonParams,
            page: this.currentPage,
            success: () => {
              this.$nextTick(() => {
                this.scrollGoods.refresh()
              })
            }
          })
        }
      },
      sureSubmit () {
        this.isScreen = false
        this.__init()
        this.ismore = false
        this.isnomore = false
        this.scrollGoods.off('scroll')
      },
      _singleOrder (key) {
        Object.keys(this.orders).forEach((k) => {
          this.$set(this.orders, k, false)
          this.$set(this.orders, key, true)
        })
      }
    },
    beforeRouteUpdate (to, from, next) {
      this.keyword = to.query.keyword
      this._singleOrder('isAll')
      this.otype = 'all'
      this.resetScreen()
      this.__init()
      this.getAttrs({
        keyword: this.keyword,
        success: () => {
          this.$nextTick(() => {
            this.scrollScreen.refresh()
          })
        }
      })
      // 下拉加载页面数据重置
      this.currentPage = 1
      this.totalPage = 1
      next()
    },
    beforeDestroy () {
      this.$refs.screen.removeEventListener('touchmove', this._disableScreenTochmove)
      this.$refs.scrollGoods.removeEventListener('touchmove', this._disableScreenTochmove)
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@assets/css/variable.styl'
  .search-panel
    position fixed
    z-index 3
    background-color $color-background
    left 0
    top 50px
    right 0
    bottom 0

    .search-top
      height 30px
      line-height 30px

      .order-main
        display flex
        justify-content space-around
        align-items center
        border-bottom 1px solid $color-text-ll

        .order
          display flex
          height 30px

          .order-text
            margin-right 5px

          & .active
            color $color-theme

          .order-icon
            display flex
            flex-direction column

            .iconfont
              flex 1
              line-height 16px

            & .active
              color $color-theme

    .scroll-goods
      height 587px
      overflow hidden
      background-color $color-background-d

      .goods-main
        padding-bottom 50px
        min-height 687px

        .goods-list
          display flex
          height 100px
          margin 10px 10px
          padding 10px 10px
          border-radius 5px
          background-color $color-background

          .image
            flex 0 0 100px
            height 100px
            margin-right 20px

            img
              width 100%
              height 100%

          .goods-content
            display flex
            flex-direction column
            justify-content space-around

            .goods-title
              color $color-text-d
              height 31px
              overflow hidden

            .price
              color $color-text-price

            .sales
              font-size $font-size-small

              span
                color $color-sub-theme

        .more, .no-more
          height 50px
          text-align center
          line-height 50px
          color $color-text-l

        .no-data
          text-align center
          line-height 100px
          color $color-text-l

    .mask
      position fixed
      z-index 5
      left 0
      right 0
      top 0
      bottom 0
      background-color $color-mask

    .screen
      position fixed
      z-index 5
      left 75px
      right 0
      top 0
      bottom 0
      padding 0 15px
      background-color $color-background

      .attr-list
        min-height 680px
        padding-bottom 80px

        .attr-title-wrap
          position relative
          display flex
          height 40px
          justify-content flex-start
          line-height 40px
          font-size $font-size-medium-x
          border-bottom 1px solid rgba(255, 69, 0, .2)

          .attr-name
            flex 0 0 80px

          .price-wrap
            display flex
            flex 1

            input
              width 60px
              height 20px
              border 1px solid $color-text-ll
              border-radius 5px
              color $color-text-l
              font-size $font-size-medium

          .iconfont
            position absolute
            right 0
            top 0

        .item-wrap
          padding 10px 0
          display flex
          justify-content flex-start
          flex-wrap wrap

          .item
            width 80px
            height 30px
            text-align center
            line-height 30px
            margin 5px 5px
            background-color $color-background-d
            border-radius 5px

          & .active
            background-color $color-theme
            color $color-background

      .handel-wrap
        position absolute
        z-index 6
        left 0
        right 0
        bottom 0
        height 50px
        display flex
        background-color $color-background

        .item
          width 100%
          height 50px
          line-height 50px
          text-align center

          span
            color $color-theme

        .reset
          background-color $color-background-d

        .sure
          background-color $color-theme
          color $color-background
</style>
