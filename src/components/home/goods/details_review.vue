<template>
  <div class="page">
    <div class='reviews-main'>
      <div class="reviews-title">商品评价（{{total}}）</div>
      <div class='reviews-wrap' v-show="reviews.length>0">
        <div class='reviews-list' v-for="(item,index) in reviews" :key="index">
          <div class='uinfo'>
            <div class='head'><img v-lazy="item.head"/></div>
            <div class='nickname'>{{item.nickname}}</div>
          </div>
          <div class='reviews-content' v-html="item.content"></div>
          <div class='reviews-date'>{{item.times}}</div>
        </div>
      </div>
      <div class="no-data" v-show="reviews.length<=0">暂无评价！</div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import UpRefresh from '../../../assets/js/libs/uprefresh'

  export default {
    name: 'details_review',
    data () {
      return {
        gid: this.$route.query.gid ? this.$route.query.gid : ''
      }
    },
    created () {
      this.pullUp = new UpRefresh()
      this.getReviews({
        gid: this.gid,
        success: (pageNum) => {
          this.pullUp.init({
            curPage: 1,
            maxPage: parseInt(pageNum),
            offsetBottom: 100
          }, (page) => {
            this.getReviewsPage({
              gid: this.gid,
              page: page
            })
          })
        }
      })
    },
    computed: {
      ...mapGetters({
        reviews: 'goodsReview/reviews',
        total: 'goodsReview/total'
      })
    },
    methods: {
      ...mapActions({
        getReviews: 'goodsReview/getReviews',
        getReviewsPage: 'goodsReview/getReviewsPage'
      })
    },
    beforeDestroy () {
      this.pullUp.uneventSrcoll()
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@assets/css/variable.styl'
  .page
    margin: 60px 0
    font-size $font-size-medium

  .reviews-main
    width: 90%
    margin 0 auto 10px
    background-color: $color-background
    margin-top: 0.5rem
    overflow: hidden

    .reviews-title
      color: $color-text
      font-size $font-size-medium-x
      padding 10px 0

    .reviews-wrap
      width: 90%
      margin: 0 auto

      .reviews-list
        width: 100%
        margin-top: 0.4rem

        .uinfo
          width: 100%
          display: flex
          display: -webkit-flex
          height: 0.6rem
          align-items: center

          .head
            width: 0.6rem
            height: 0.6rem
            margin-right: 0.2rem

            img
              width: 100%
              height: 100%
              border-radius: 100%

          .nickname
            width: auto
            font-size: 0.28rem

      .reviews-content
        width: 100%
        margin: 0 auto
        font-size: 0.28rem
        margin-top: 0.2rem

      .reviews-date
        width: auto
        font-size: 0.28rem
        color: $color-text-l
        margin-top: 0.2rem

    .reviews-more
      width: 2.44rem
      height: 0.56rem
      border: solid 1px $color-theme
      line-height: 0.56rem
      text-align: center
      font-size: 0.28rem
      margin: 0 auto
      margin-top: 0.5rem
      border-radius: 0.1rem
</style>
