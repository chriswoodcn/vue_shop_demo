<template>
  <div class="fav">
    <nav-header class="header" title="我的收藏"></nav-header>
    <div class='main'>
      <cube-scroll :data="favs">
        <div class="scroll-content">
          <div class='goods-list' v-for="(item,index) in favs" :key="index">
            <div class='image'>
              <img :data-echo="item.image" src="../../../assets/images/common/lazyImg.jpg" alt=""/>
            </div>
            <div class='title'>{{item.title}}</div>
            <div class='price'>¥{{item.price}}</div>
            <div class='btn-wrap'>
              <div class='btn' @click="$router.push('/goods/details?gid='+item.gid)">购买</div>
              <div class='btn' @click="delFav(index,item.fid)">删除</div>
            </div>
          </div>
        </div>
      </cube-scroll>
    </div>
    <div class="no-data" v-show="false">您还没有收藏商品！</div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import UpRefresh from '../../../assets/js/libs/uprefresh'

  export default {
    name: 'fav',
    mounted () {
      document.title = this.$route.meta.title
    },
    created () {
      this.$utils.safeUser(this)
      this.pullUp = new UpRefresh()
      this.getFav({
        page: 1,
        success: (pageNum) => {
          this.$nextTick(() => {
            this.$utils.lazyImg()
            this.pullUp.init({
              curPage: 1,
              maxPage: parseInt(pageNum),
              offsetBottom: 100
            }, (page) => {
              this.getFavPage({
                page: page,
                success: () => {
                  this.$utils.lazyImg()
                }
              })
            })
          })
        }
      })
    },
    computed: {
      ...mapState({
        favs: state => state.user.favs
      })
    },
    methods: {
      ...mapActions({
        getFav: 'user/getFav',
        getFavPage: 'user/getFavPage',
        asyncDelFav: 'user/delFav'
      }),
      // 删除收藏
      delFav (index, fid) {
        this.$createDialog({
          type: 'confirm',
          content: '确认要删除吗?',
          confirmBtn: {
            text: '确定',
            href: 'javascript:;'
          },
          cancelBtn: {
            text: '取消',
            href: 'javascript:;'
          },
          onConfirm: () => {
            this.asyncDelFav({
              index: index,
              fid: fid,
              success: () => {
                this.$nextTick(() => {
                  this.$utils.lazyImg()
                })
              }
            })
          }
        }).show()
      }
    },
    beforeDestroy () {
      this.pullUp.uneventSrcoll()
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@assets/css/variable.styl'
  .fav
    width: 100%;
    min-height: 100vh;
    background-color: $color-text-ll

    .main
      width 100%
      height 617px
      overflow hidden

      .scroll-content
        width 96vw
        margin 0 auto
        min-height 630px
        padding-top 10px
        display: flex
        justify-content space-between
        flex-wrap wrap
        box-sizing: border-box

        .goods-list
          width: 45vw
          height: 260px
          margin 0 5px 20px
          background-color $color-background
          border-radius 5px
          padding 10px
          box-sizing border-box
          font-size: $font-size-medium

          .image
            width: 120px
            height: 120px
            margin: 0 auto

            img
              width: 100%
              height: 100%

          .title
            width: 100%
            height: 28px
            overflow: hidden
            font-size: $font-size-medium
            margin-top: 10px

          .price
            font-size: $font-size-medium
            color: $color-text-price
            margin-top: 15px

          .btn-wrap
            width: 100%
            display: flex
            justify-content: space-between
            margin-top: 15px

            .btn
              width: 60px
              border: 1px solid $color-theme
              color: $color-theme
              border-radius: 5px
              text-align: center
              padding 2px 2px

</style>
