<template>
  <div class="mod-password">
    <nav-header class="header" title="修改密码"></nav-header>
    <div class='main'>
      <div class='input-wrap'>
        <input :type="isOpen?'text':'password'" placeholder="请输入不小于6位的密码" class='password' v-model="password"/>
        <div class='switch iconfont icon-yanjing-bi' :class="{'icon-yanjing':isOpen}" @click="isOpen=!isOpen"/>
      </div>
      <div class='save-btn' @click="submit">提交</div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'mod-password',
    data () {
      return {
        isOpen: false,
        password: ''
      }
    },
    mounted () {
      document.title = this.$route.meta.title
    },
    created () {
      this.$utils.safeUser(this)
    },
    methods: {
      ...mapActions({
        updatePassword: 'user/updatePassword'
      }),
      _toast (msg) {
        this.$createToast({
          txt: msg,
          type: 'txt'
        })
      },
      submit () {
        if (this.password.match(/^\s*$/)) {
          // Toast('请输入密码')
          this._toast('请输入密码')
          return
        }
        if (this.password.length < 6) {
          // Toast('密码不能小于6位')
          this._toast('密码不能小于6位')
          return
        }
        this.updatePassword({
          password: this.password,
          success: (res) => {
            if (res.code === 200) {
              this.$createToast({
                txt: '修改成功!',
                time: 2000,
                onTimeout: () => {
                  this.$router.go(-1)
                }
              }).show()
            } else {
              // Toast(res.data)
              this._toast(res.data)
            }
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@assets/css/variable.styl'
  .mod-password
    width: 100%
    min-height: 100vh
    background-color: $color-background
    font-size $font-size-medium

  .main
    width: 100%
    margin-top: 20px

    .input-wrap
      width: 90%
      height: 30px
      border: 1px solid $color-text-l
      border-radius: 5px
      margin: 0 auto
      display: flex
      position relative

      .password
        width: 75%
        height: 100%
        margin-left: 0.2rem

      .switch
        width 30px
        height 30px
        line-height 30px
        position absolute
        top 50%
        right 0
        transform translateY(-50%)

    .save-btn
      width: 90%;
      height: 30px
      background-color: $color-theme
      color: $color-background
      text-align: center;
      line-height: 30px
      margin: 0 auto;
      border-radius: 5px
      margin-top: 20px
</style>
