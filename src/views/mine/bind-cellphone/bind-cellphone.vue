<template>
  <div class="bind-cellphone">
    <nav-header class="header" title="绑定手机"></nav-header>
    <div class='main'>
      <div class='tip'>
        <div class='icon'></div>
        <div class='text'>新手机号验证后，即可绑定成功！</div>
      </div>
      <div class='input-wrap' style="margin-top:0.5rem">
        <input type="tel" class='cellphone' @input="checkCellphone" placeholder='绑定手机号' v-model="cellphone"/>
      </div>
      <div class='input-wrap' style="margin-top:0.2rem">
        <input type="text" class='code' placeholder='请输入短信验证码' v-model="msgCode"/>
        <div :class="{'code-btn':true, success:isSendMsgCode}" @click="getMsgCode">{{msgCodeText}}</div>
      </div>
      <div class='save-btn' @click="submit">下一步</div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'bind-cellphone',
    data () {
      return {
        cellphone: '',
        msgCode: '',
        isSendMsgCode: false,
        msgCodeText: '获取验证码'
      }
    },
    mounted () {
      document.title = this.$route.meta.title
    },
    created () {
      this.$utils.safeUser(this)
      this.timer = null
      this.isSubmit = true
    },
    methods: {
      ...mapActions({
        isReg: 'user/isReg',
        updateCellphone: 'user/updateCellphone'
      }),
      _toast (msg) {
        this.$createToast({
          txt: msg,
          type: 'txt'
        })
      },
      // 获取短信验证码
      async getMsgCode () {
        if (this.isSendMsgCode) {
          if (this.cellphone.match(/^\s*$/)) {
            // Toast('请输入手机号')
            this._toast('请输入手机号')
            return
          }
          if (!this.cellphone.match(/^1[0-9][0-9]\d{8}$/)) {
            // Toast('您输入的手机号格式不正确')
            this._toast('您输入的手机号格式不正确')
            return
          }
          const regData = await this.isReg({ username: this.cellphone })
          if (regData.data.isreg === '1') {
            // Toast('此手机号已注册过，请更换手机号')
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
      },
      // 修改手机号
      async submit () {
        if (this.cellphone.match(/^\s*$/)) {
          // Toast('请输入手机号')
          this._toast('请输入手机号')
          return
        }
        if (!this.cellphone.match(/^1[0-9][0-9]\d{8}$/)) {
          // Toast('您输入的手机号格式不正确')
          this._toast('您输入的手机号格式不正确')
          return
        }
        const regData = await this.isReg({ username: this.cellphone })
        if (regData.data.isreg === '1') {
          // Toast('此手机号已注册过，请更换手机号')
          this._toast('此手机号已注册过，请更换手机号')
          return
        }
        if (this.msgCode.match(/^\s*$/)) {
          // Toast('请输入短信验证码')
          this._toast('请输入短信验证码')
          return
        }
        if (this.isSubmit) {
          this.isSubmit = false
          this.updateCellphone({
            cellphone: this.cellphone,
            vcode: this.msgCode,
            success: (res) => {
              if (res.code === 200) {
                this.$router.go(-1)
              } else {
                // Toast(res.data)
                this._toast(res.data)
              }
            }
          })
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
  .bind-cellphone
    width: 100%
    min-height: 100vh
    background-color: $color-background
    font-size $font-size-medium
    .main
      width: 100%
      .tip
        width: 100%
        height: 40px
        background-color: #F3F5C4;
        color: #ac7700;
        display: flex;
        align-items: center;
        .icon
          width: 0.4rem
          height: 0.4rem
          background-image: url("../../../assets/images/user/mobile/tip.png")
          background-size: 100%
          background-repeat: no-repeat
          background-position: center
          margin-left: 0.4rem
          margin-right: 0.2rem
      .input-wrap
        width: 90%
        height: 30px
        line-height 30px
        border: 1px solid $color-text-ll
        border-radius: 4px
        margin: 0 auto
        overflow: hidden
        margin-top 10px
        font-size $font-size-small
        position relative
        .cellphone
          width: 93%
          margin-left: 0.2rem
        .code
          width: 93%
          margin-left: 0.2rem
        .code-btn
          padding 0 10px
          border-left:  1px solid $color-text-ll
          position absolute
          right 0
          top 0
          color: $color-text-l
          text-align: center
          &.success
            color: $color-theme

      .save-btn
        width: 90%;
        height: 30px
        background-color: $color-theme
        color: $color-background
        text-align: center
        line-height: 30px
        margin: 20px auto
        border-radius: 5px
</style>
