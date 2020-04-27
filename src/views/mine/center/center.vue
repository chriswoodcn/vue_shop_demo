<template>
  <div class="center">
    <div class="header">
      <div class="back iconfont icon-arrow-right-copy-copy-copy-copy" @click="$router.go(-1)"></div>
      <div class="title">个人中心</div>
    </div>
    <div class='user-info-wrap'>
      <div class='head'>
        <img :src="head?head:require('../../../assets/images/user/my/default-head.png')" alt=""/>
      </div>
      <div class='nickname'>{{nickname?nickname:'昵称'}}</div>
      <div class='points'>我的积分：{{points}}</div>
    </div>
    <div class='order-name-wrap'>
      <div class='order-name'>全部订单</div>
      <div class='show-order' @click="$router.push('/mine/order')">查看全部订单 &gt;</div>
    </div>
    <div class='order-status-wrap'>
      <div class='item' @click="$router.push('/mine/order?status=0')">
        <div class='icon wait'></div>
        <div class='text'>待支付</div>
      </div>
      <div class='item' @click="$router.push('/mine/order?status=1')">
        <div class='icon take'></div>
        <div class='text'>待收货</div>
      </div>
      <div class='item' @click="$router.push('/mine/order/review?status=2')">
        <div class='icon comment'></div>
        <div class='text'>待评价</div>
      </div>
    </div>
    <div class="menu-list-wrap">
      <ul @click="goPage('/mine/profile')">
        <li>个人资料</li>
        <li></li>
      </ul>
      <ul @click="goPage('/mine/address')">
        <li>收货地址</li>
        <li></li>
      </ul>
      <ul @click="goPage('/mine/bind_cellphone')">
        <li>绑定手机</li>
        <li></li>
      </ul>
      <ul @click="goPage('/mine/mod_password')">
        <li>修改密码</li>
        <li></li>
      </ul>
      <ul @click="goPage('/mine/fav')">
        <li>我的收藏</li>
        <li></li>
      </ul>
      <div class='btn' @click="isLogin?outLogin():goPage('/login')">{{isLogin?'安全退出':'登录/注册'}}</div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import baseMixins from '../../../assets/js/mixins/baseMixins'

  export default {
    name: 'mine',
    mixins: [baseMixins],
    mounted () {
      document.title = this.$route.meta.title
    },
    created () {
      this.getUserInfo()
    },
    methods: {
      ...mapActions({
        asyncOutLogin: 'user/outLogin',
        getUserInfo: 'user/getUserInfo'
      }),
      goPage (url) {
        this.$router.push(url)
      },
      outLogin () {
        // Dialog.confirm({
        //   title: '',
        //   message: '确认要退出吗？'
        // }).then(() => {
        //   this.asyncOutLogin();
        // }).catch(() => {
        //   // on cancel
        // });
      }
    },
    computed: {
      ...mapState({
        isLogin: state => state.user.isLogin,
        nickname: state => state.user.nickname,
        head: state => state.user.head,
        points: state => state.user.points
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@assets/css/variable.styl'
  @import '~@assets/css/mixin.styl'
  .center
    width 100%
    height 100vh
    background-color $color-background
    color $color-text
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

    .user-info-wrap
      width: 100%
      height 100px
      background $color-theme
      position: relative
      z-index: 1
      color: $color-background
      font-size: $font-size-small

      .head
        width: 50px
        height: 50px
        position: absolute
        z-index: 1
        left: 5%
        bottom: 15%

        img
          width: 100%
          height: 100%
          border-radius: 100%

      .nickname
        no-wrap()
        position: absolute
        z-index: 1
        left: 27%
        bottom: 40%

      .points
        width: auto
        height: auto
        white-space: nowrap
        position: absolute
        z-index: 1
        left: 27%
        bottom: 20%

    .order-name-wrap
      width: 100%;
      height: 40px
      display: flex;
      justify-content: space-between;
      align-items: center;
      overflow: hidden;

      .order-name
        font-size $font-size-medium-x
        margin-left: 5%

      .show-order
        margin-right: 5%

    .order-status-wrap
      width: 80%
      margin 0 auto
      height: 60px
      display: flex
      justify-content: space-around
      align-items: center
      font-size $font-size-medium

      .item
        width: 60px
        height: 60px
        display flex
        flex-direction column
        justify-content center
        align-items center

        .icon
          width: 26px
          height: 26px

          &.wait
            background-image: url("../../../assets/images/user/my/pay.png")
            background-size: 100%
            background-repeat: no-repeat
            background-position: center

          &.take
            background-image: url("../../../assets/images/user/my/shouhuo.png")
            background-size: 100%
            background-repeat: no-repeat
            background-position: center

          &.comment
            background-image: url("../../../assets/images/user/my/comment.png")
            background-size: 100%
            background-repeat: no-repeat
            background-position: center

        .text
          width: 100%
          margin-top 10px
          text-align center

    .menu-list-wrap
      height: auto
      padding 10px 20px

      ul
        width: 100%
        height: 40px
        border-bottom: 1px solid $color-text-ll
        display: flex;
        justify-content: space-between;
        align-items: center;

        li:nth-child(2)
          width: 15px
          height: 15px
          background-image: url("../../../assets/images/common/right_arrow.png")
          background-size: 100%
          background-repeat: no-repeat
          background-position: center

      .btn
        width: 60%
        height: 36px
        background-color: $color-theme
        color $color-background
        border-radius: 5px;
        text-align: center;
        line-height: 36px
        margin 30px auto
</style>
