<template>
  <div class="card">
    <div class="title">
      <div class="line"></div>
      <h4>{{ data.title }}</h4>
    </div>
    <template v-if="data.items.length === 7">
      <div class="content">
        <div class="goods-column" @click="$router.push('/goods/details?gid='+(data.items && data.items[0].gid))">
          <div class="goods-title">{{ data.items && data.items[0].title }}</div>
          <div class="goods-des">
            <div class="goods-tip">现价特惠</div>
            <div class="goods-price" v-if="data.items[0].price">{{ data.items && data.items[0].price }}元</div>
          </div>
          <div class="goods-image">
            <img v-lazy="data.items && data.items[0].image" alt=""/>
          </div>
        </div>
        <div class="goods-rows">
          <div class="goods-row" @click="$router.push('/goods/details?gid='+(data.items && data.items[1].gid))">
            <div>
              <div class="goods-row-title">
                {{ data.items && data.items[1].title }}
              </div>
              <div class="goods-row-des">
                品质精挑
              </div>
            </div>
            <div class="goods-row-image">
              <img v-lazy="data.items && data.items[1].image" alt=""/>
            </div>
          </div>
          <div class="goods-row" @click="$router.push('/goods/details?gid='+(data.items && data.items[2].gid))">
            <div>
              <div class="goods-row-title">
                {{ data.items && data.items[2].title }}
              </div>
              <div class="goods-row-des">
                品质精挑
              </div>
            </div>
            <div class="goods-row-image">
              <img v-lazy="data.items && data.items[2].image" alt=""/>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="goods-list" @click="$router.push('/goods/details?gid='+(data.items && data.items[3].gid))">
          <div class="goods-list-title">{{ data.items[3].title }}</div>
          <div class="goods-list-image">
            <img v-lazy="data.items[3].image" alt=""/>
          </div>
          <div class="goods-list-price-line">¥{{ data.items[3].price }}</div>
          <div class="goods-list-price">¥{{ data.items[3].price * 2 }}</div>
        </div>
        <div class="goods-list" @click="$router.push('/goods/details?gid='+(data.items && data.items[4].gid))">
          <div class="goods-list-title">{{ data.items[4].title }}</div>
          <div class="goods-list-image">
            <img v-lazy="data.items[4].image" alt=""/>
          </div>
          <div class="goods-list-price-line">¥{{ data.items[4].price }}</div>
          <div class="goods-list-price">¥{{ data.items[4].price * 2 }}</div>
        </div>
        <div class="goods-list" @click="$router.push('/goods/details?gid='+(data.items && data.items[5].gid))">
          <div class="goods-list-title">{{ data.items[5].title }}</div>
          <div class="goods-list-image">
            <img v-lazy="data.items[5].image" alt=""/>
          </div>
          <div class="goods-list-price-line">¥{{ data.items[5].price }}</div>
          <div class="goods-list-price">¥{{ data.items[5].price * 2 }}</div>
        </div>
        <div class="goods-list" @click="$router.push('/goods/details?gid='+(data.items && data.items[6].gid))">
          <div class="goods-list-title">{{ data.items[6].title }}</div>
          <div class="goods-list-image">
            <img v-lazy="data.items[6].image" alt=""/>
          </div>
          <div class="goods-list-price-line">¥{{ data.items[6].price }}</div>
          <div class="goods-list-price">¥{{ data.items[6].price * 2 }}</div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="content">
        <div class="goods-column" @click="$router.push('/goods/details?gid='+(data.items && data.items[0].gid))">
          <div class="goods-title">{{ data.items && data.items[0].title }}</div>
          <div class="goods-des">
            <div class="goods-des-row">火爆开售</div>
          </div>
          <div class="goods-image">
            <img v-lazy="data.items && data.items[0].image" alt=""/>
          </div>
        </div>
        <div class="goods-column" @click="$router.push('/goods/details?gid='+(data.items && data.items[1].gid))">
          <div class="goods-title">{{ data.items && data.items[1].title }}</div>
          <div class="goods-des">
            <div class="goods-des-row">火爆开售</div>
          </div>
          <div class="goods-image">
            <img v-lazy="data.items && data.items[1].image" alt=""/>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="goods-list" @click="$router.push('/goods/details?gid='+(data.items && data.items[2].gid))">
          <div class="goods-list-title">{{ data.items && data.items[2].title }}</div>
          <div class="goods-list-image">
            <img v-lazy="data.items && data.items[2].image" alt=""/>
          </div>
          <div class="goods-list-price-line">¥{{ data.items && data.items[2].price }}</div>
          <div class="goods-list-price">¥{{ data.items && data.items[2].price * 2 }}</div>
        </div>
        <div class="goods-list" @click="$router.push('/goods/details?gid='+(data.items && data.items[3].gid))">
          <div class="goods-list-title">{{ data.items && data.items[3].title }}</div>
          <div class="goods-list-image">
            <img v-lazy="data.items && data.items[3].image" alt=""/>
          </div>
          <div class="goods-list-price-line">¥{{ data.items && data.items[3].price }}</div>
          <div class="goods-list-price">¥{{ data.items && data.items[3].price * 2 }}</div>
        </div>
        <div class="goods-list" @click="$router.push('/goods/details?gid='+(data.items && data.items[4].gid))">
          <div class="goods-list-title">{{ data.items && data.items[4].title }}</div>
          <div class="goods-list-image">
            <img v-lazy="data.items && data.items[4].image" alt=""/>
          </div>
          <div class="goods-list-price-line">¥{{ data.items && data.items[4].price }}</div>
          <div class="goods-list-price">¥{{ data.items && data.items[4].price * 2 }}</div>
        </div>
        <div class="goods-list" @click="$router.push('/goods/details?gid='+(data.items && data.items[5].gid))">
          <div class="goods-list-title">{{ data.items && data.items[5].title }}</div>
          <div class="goods-list-image">
            <img v-lazy="data.items && data.items[5].image" alt=""/>
          </div>
          <div class="goods-list-price-line">¥{{ data.items && data.items[5].price }}</div>
          <div class="goods-list-price">¥{{ data.items && data.items[5].price * 2 }}</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'card',
    props: {
      data: {
        type: Object,
        default () {
          return {
            title: '潮流女装',
            items: []
          }
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@assets/css/variable.styl'
  .card
    height 368px
    background $color-background
    border-radius 5px
    font-size $font-size-medium
    margin-bottom 10px

    .title
      position relative
      height 33px
      font-size $font-size-medium-x
      color #F21D4F
      border-bottom 1px solid #eee

      .line
        width 40%
        height 16px
        border-bottom 1px solid #F21D4F
        margin 0 auto

      h4
        background-color $color-background
        padding 0 10px
        position absolute
        left 50%
        top 50%
        transform translate(-50%, -50%)

    .content
      display flex
      height 175px
      border-bottom 1px solid #eee

      .goods-column
        flex 1
        display flex
        flex-direction column
        justify-content space-between
        align-items center
        padding 10px
        border-right 1px solid #eee
        width 50%
        box-sizing border-box

        &:last-child
          border-right 0

        .goods-title
          height 14px
          width 180px
          overflow hidden
          font-weight 700

        .goods-des
          display flex
          justify-content space-around
          width 100%

          .goods-tip
            flex 1

          .goods-price
            flex 1
            text-align center
            color $color-text-price

        .goods-image
          height 120px
          width 150px

          img
            width 100%
            height 100%

      .goods-rows
        display flex
        flex-direction column

        .goods-row
          flex 1
          display flex
          height 88.5px
          padding 10px

          &:first-child
            border-bottom 1px solid #eee

          .goods-row-title
            height 14px
            width 100px
            font-weight 700
            overflow hidden

          .goods-row-des
            margin-top 5px
            font-size $font-size-small
            color $color-text-l

          .goods-row-image
            width 60px
            height 60px

            img
              width 100%
              height 100%

    .footer
      display flex

      .goods-list
        flex 1

        .goods-list-title
          height 14px
          overflow hidden
          padding 0 2px
          margin 10px 0

        .goods-list-image
          width 80px
          height 80px
          margin 0 auto

          img
            width 100%
            height 100%

        .goods-list-price-line
          text-decoration line-through
          text-align center
          line-height 20px

        .goods-list-price
          text-align center
          color $color-text-price
          line-height 20px
</style>
