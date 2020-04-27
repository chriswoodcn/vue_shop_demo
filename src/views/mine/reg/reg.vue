<template>
  <div class="reg">
    <div class="header">
      <div class="back iconfont icon-arrow-right-copy-copy-copy-copy" @click="$router.go(-1)"></div>
      <div class="title">会员注册</div>
    </div>
    <div class='main'>
      <div class='cellphone-wrap'>
        <div class='cellphone'><input type="tel" @input="checkCellphone" placeholder="请输入手机号" v-model="cellphone"/>
        </div>
        <div :class="{'code-btn':true, success:isSendMsgCode}" @click="getMsgCode">{{msgCodeText}}</div>
      </div>
      <div class='code-wrap'><input type="text" placeholder="请输入短信验证码" v-model="msgCode"/></div>
      <div class='password-wrap'>
        <div class='password'><input :type="isOpen?'text':'password'" placeholder="请输入密码" v-model="password"/></div>
        <div class='switch iconfont icon-yanjing-bi' :class="{'icon-yanjing':isOpen}" @click="isOpen=!isOpen"/>
      </div>
      <div class="inputs"><input type="text" placeholder="验证码" v-model="vcode"/>
        <div class="vcode-img"><img :src="showCode" @click="changVCode($event)"/></div>
      </div>
      <div class='sure-btn' @click="submit()">注册</div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { URL, TOKEN } from '@/assets/js/conf/config.js'
  import baseMixins from '../../../assets/js/mixins/baseMixins'

  export default {
    name: 'reg',
    mixins: [baseMixins],
    data () {
      return {
        showCode: URL + '/vcode/chkcode?token=' + TOKEN,
        vcode: '',
        cellphone: '',
        msgCode: '',
        password: '',
        isOpen: false,
        isSendMsgCode: false,
        msgCodeText: '获取短信验证码'
      }
    },
    created () {
      this.timer = null
      this.isSubmit = true
    },
    methods: {
      ...mapActions({
        checkVCode: 'user/checkVCode',
        isReg: 'user/isReg',
        regUser: 'user/regUser'
      }),
      _toast (msg) {
        this.$createToast({
          txt: msg,
          type: 'txt'
        }).show()
      },
      // 重新获取验证码
      changVCode (e) {
        e.target.src = URL + '/vcode/chkcode?token=' + TOKEN + '&random=' + new Date().getTime()
      },
      // 提交注册
      async submit () {
        if (this.vcode.match(/^\s*$/)) {
          this._toast('请输入图文验证码')
          return
        }
        const vcodeData = await this.checkVCode({ vcode: this.vcode })
        if (vcodeData.code !== 200) {
          this._toast('验证码不正确')
          return
        }
        if (this.cellphone.match(/^\s*$/)) {
          this._toast('请输入手机号')
          return
        }
        if (!this.cellphone.match(/^1[0-9][0-9]\d{8}$/)) {
          this._toast('您输入的手机号格式不正确')
          return
        }
        const regData = await this.isReg({ username: this.cellphone })
        if (regData.data.isreg === '1') {
          this._toast('此手机号已注册过，请更换手机号')
          return
        }
        if (this.msgCode.match(/^\s*$/)) {
          this._toast('请输入短信验证码')
          return
        }
        if (this.password.match(/^\s*$/)) {
          this._toast('请输入密码')
          return
        }
        if (this.isSubmit) {
          this.isSubmit = false
          this.regUser({
            cellphone: this.cellphone,
            password: this.password,
            vcode: this.vcode,
            success: (res) => {
              if (res.code === 200) {
                this.$router.push('/login?from=reg')
              } else {
                this._toast(res.data)
              }
            }
          })
        }
      },
      // 获取短信验证码
      async getMsgCode () {
        if (this.isSendMsgCode) {
          if (this.vcode.match(/^\s*$/)) {
            this._toast('请输入图文验证码')
            return
          }
          const vcodeData = await this.checkVCode({ vcode: this.vcode })
          if (vcodeData.code !== 200) {
            this._toast('您输入的图文验证码不正确')
            return
          }
          if (this.cellphone.match(/^\s*$/)) {
            this._toast('请输入手机号码')
            return
          }
          if (!this.cellphone.match(/^1[0-9][0-9]\d{8}$/)) {
            this._toast('您输入的手机号格式不正确')
            return
          }
          const regData = await this.isReg({ username: this.cellphone })
          if (regData.data.isreg === '1') {
            this._toast('此手机号已注册过，请更换手机号')
            return
          }
          this.isSendMsgCode = false
          let time = 10
          this.msgCodeText = '重新获取(' + time + ')'
          this.timer = setInterval(() => {
            if (time > 0) {
              time--
              this.msgCodeText = '重新获取(' + time + ')'
            } else {
              clearInterval(this.timer)
              this.msgCodeText = '获取短信验证码'
              this.isSendMsgCode = true
            }
          }, 1000)
        }
      },
      checkCellphone () {
        let isChecked = true
        if (this.cellphone.match(/^\s*$/)) {
          isChecked = false
        }
        if (!this.cellphone.match(/^1[0-9][0-9]\d{8}$/)) {
          isChecked = false
        }
        if (isChecked) {
          this.isSendMsgCode = true
        } else {
          this.isSendMsgCode = false
        }
      }
    },
    beforeDestroy () {
      clearInterval(this.timer)
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@assets/css/variable.styl'
  @import '~@assets/css/mixin.styl'
  .reg
    font-size $font-size-medium
    width 100%
    height 100vh
    background-color $color-background
    color $color-text

    .header
      position relative
      height 50px
      font-size $font-size-large-x
      border-bottom 1px solid $color-text-ll
      background-color $color-theme
      color $color-background

      .back
        width 50px
        height 50px
        text-align center
        line-height 50px

      .title
        height 50px
        line-height 50px
        font-size $font-size-large
        position absolute
        left 50%
        top 50%
        transform translate(-50%, -50%)

    .main
      width: 80%
      margin 30px auto 0

      .cellphone-wrap
        width: 100%
        height: 30px
        line-height 30px
        margin: 0 auto
        display: flex
        justify-content: space-between

        .cellphone
          width: 65%
          height: 100%
          border: 1px solid $color-text-ll
          border-radius: 5px
          margin-right 2px

          input
            padding-left: 10px

        .code-btn
          width: 34%
          height: 100%
          border: 1px solid $color-text-ll
          border-radius: 5px
          text-align: center
          background-color: $color-background-d
          font-size $font-size-small

          &.success
            background: $color-background
            border: 1px solid $color-theme
            color: $color-theme

      .code-wrap
        width: 100%
        height: 30px
        line-height 30px
        margin: 0 auto
        border-radius: 5px
        border: 1px solid $color-background-d
        margin-top: 20px

        input
          width 100%
          padding 0 10px
          box-sizing border-box

      .password-wrap
        position relative
        width: 100%
        height: 30px
        line-height 30px
        margin: 0 auto
        border-radius: 5px
        border: 1px solid $color-background-d
        margin-top: 20px

        input
          width 100%
          padding 0 40px 0 10px
          box-sizing border-box

        .switch
          width 30px
          height 30px
          line-height 30px
          position absolute
          top 50%
          right 0
          transform translateY(-50%)

      .inputs
        width: 100%
        height: 30px
        line-height 30px
        border: 1px solid $color-background-d
        border-radius: 5px
        margin: 20px auto 40px
        position: relative

        input
          width 60%
          padding 0 10px

      .vcode-img
        width: 35%
        height: 80%
        position: absolute
        right: 0
        top: 10%
        border-left: 1px solid $color-background-d
        text-align: center

        img
          width: 90%
          height: 100%

      .sure-btn
        width: 85%;
        height: 36px
        margin: 0 auto;
        background: $color-theme
        font-size: $font-size-large
        color: $color-background
        line-height: 36px
        text-align: center
        border-radius: 5px
</style>
