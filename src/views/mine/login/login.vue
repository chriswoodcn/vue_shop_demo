<template>
  <div class="login">
    <!--    <div class="header">-->
    <!--      <div class="back iconfont icon-arrow-right-copy-copy-copy-copy" @click="$router.go(-1)"></div>-->
    <!--      <div class="title">会员登录</div>-->
    <!--    </div>-->
    <nav-header class="header" title="会员登录"></nav-header>
    <div class='main login-main'>
      <div class='code-wrap'>
        <div class="label">手机号码</div>
        <input class="code" type="text" placeholder="请输入手机号码" v-model="cellphone"/></div>
      <div class='code-wrap'>
        <div class="label">密码</div>
        <div class='code'><input :type="isOpen?'text':'password'" placeholder="请输入密码" v-model="password"/></div>
        <div class='switch iconfont icon-yanjing-bi' :class="{'icon-yanjing':isOpen}" @click="isOpen=!isOpen"/>
      </div>
      <div class='sure-btn' @click="doLogin()">登录</div>
      <div class="fastreg-wrap">
        <div><img src="../../../assets/images/home/index/forget.png" alt="忘记密码"/> 忘记密码</div>
        <div @click="$router.push('/reg')"><img src="../../../assets/images/home/index/reg.png" alt="忘记密码"/> 快速注册</div>
      </div>
      <div class="other-login-wrap">
        <div class="hd-other-login">
          <div class="title">其他登录方式</div>
        </div>
        <ul class="bd-other-login">
          <li class="item" @click="otherLoginClick"><i class="iconfont icon-weixin"></i>
            <p>微信</p></li>
          <li class="item" @click="otherLoginClick"><i class="iconfont icon-weibo"></i>
            <p>微博</p></li>
          <li class="item" @click="otherLoginClick"><i class="iconfont icon-zhifubao"></i>
            <p>支付宝</p></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import baseMixins from '../../../assets/js/mixins/baseMixins'

  export default {
    name: 'login',
    mixins: [baseMixins],
    data () {
      return {
        isOpen: false,
        cellphone: '',
        password: ''
      }
    },
    methods: {
      ...mapActions({
        login: 'user/login'
      }),
      _toast (msg) {
        this.$createToast({
          txt: msg,
          type: 'txt'
        }).show()
      },
      doLogin () {
        if (this.cellphone.match(/^\s*$/)) {
          this._toast('请输入手机号')
          return
        }
        if (!this.cellphone.match(/^1[0-9][0-9]\d{8}$/)) {
          this._toast('您输入的手机号格式不正确')
          return
        }
        if (this.password.match(/^\s*$/)) {
          this._toast('请输入密码')
          return
        }
        this.login({
          cellphone: this.cellphone,
          password: this.password,
          success: (res) => {
            if (res.code === 200) {
              console.log(this.$route.query.from)
              if (this.$route.query.from === 'reg') {
                this.$router.go(-3)
              } else {
                this.$router.go(-1)
              }
            } else {
              this._toast(res.data)
            }
          }
        })
      },
      otherLoginClick () {
        this._toast('抱歉,相关功能接口暂未开通')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@assets/css/variable.styl'
  @import '~@assets/css/mixin.styl'
  .login
    font-size $font-size-medium
    width 100%
    height 100vh
    background-color $color-background
    color $color-text

    .main
      width: 100%
      padding-top: 20px

      .code-wrap
        width: 80%
        height: 30px
        margin: 0 auto
        display flex
        align-items center
        position relative

        &:nth-child(2)
          margin 20px auto

        .label
          width 60px
          text-align right

        .code
          flex 1
          height 26px
          border-radius 5px
          margin-left 10px
          padding 0 10px
          border 1px solid $color-text-ll

          input
            line-height 26px

        .switch
          width 26px
          height 26px
          line-height 26px
          position absolute
          top 50%
          right 10px
          transform translateY(-50%)

      .sure-btn
        width: 70%
        height: 30px
        margin: 0 auto
        background: $color-theme
        font-size: $font-size-large
        color: $color-background
        line-height: 30px
        text-align: center
        border-radius: 5px

      .fastreg-wrap
        width: 60%
        display: flex
        justify-content: space-between
        font-size: $font-size-medium
        margin: 20px auto

        img
          width: 16px
          height: 16px
          vertical-align: middle

      .other-login-wrap
        margin-top 50px
        height 100px

        .hd-other-login
          position relative
          width 80%
          margin 0 auto
          border-bottom 1px solid $color-text-ll
          font-size $font-size-medium

          .title
            width 30%
            background-color $color-background
            padding 0 20px
            height 20px
            line-height 20px
            margin-bottom -10px
            position absolute
            left 50%
            bottom 0
            transform translateX(-50%)

        .bd-other-login
          padding 20px 50px
          display flex
          justify-content space-around

          .item
            display flex
            flex-direction column
            justify-content space-between
            text-align center

            .iconfont
              font-size $font-size-large-x
              margin-bottom 10px
              color $color-theme
</style>
