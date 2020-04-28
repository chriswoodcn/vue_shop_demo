<template>
  <div class="profile">
    <nav-header class="header" title="个人资料"></nav-header>
    <div class='main'>
      <ul class='head'>
        <li>头像</li>
        <li><img :src="showHead" alt=""/><input ref="headfile" type="file" @change="uploadHead"/></li>
      </ul>
      <ul class='list'>
        <li>昵称</li>
        <li><input type="text" placeholder="请设置昵称" v-model="nickname"/></li>
        <li class='arrow'></li>
      </ul>
      <ul class='list'>
        <li>性别</li>
        <li><input type="text" placeholder="请选择性别" :value="showGender" readonly @click="handleChooseGender"/></li>
        <li class='arrow'></li>
      </ul>
      <div class='submit-save' @click="submit()">保存</div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'profile',
    data () {
      return {
        genders: [
          { name: '男' },
          { name: '女' }
        ],
        showGender: '',
        gender: '',
        showHead: require('../../../assets/images/user/my/default-head.png'),
        nickname: '',
        head: ''
      }
    },
    created () {
      this.$utils.safeUser(this)
      this.isSubmit = true
      this.getUserInfo({
        success: (data) => {
          this.nickname = data.nickname
          this.gender = data.gender
          this.showGender = this.gender === '1' ? '男' : this.gender === '2' ? '女' : ''
          this.showHead = data.head ? data.head : require('../../../assets/images/user/my/default-head.png')
        }
      })
    },
    mounted () {
      document.title = this.$route.meta.title
    },
    methods: {
      ...mapActions({
        asyncUploadHead: 'user/uploadHead',
        updateUserInfo: 'user/updateUserInfo',
        getUserInfo: 'user/getUserInfo'
      }),
      _toast (msg) {
        this.$createToast({
          txt: msg,
          type: 'txt'
        }).show()
      },
      submit () {
        if (this.nickname.match(/^\s*$/)) {
          // Toast('请输入昵称')
          this._toast('请输入昵称')
          return
        }
        if (this.gender.match(/^\s*$/)) {
          // Toast('请选择性别')
          this._toast('请选择性别')
          return
        }
        if (this.isSubmit) {
          this.isSubmit = false
          this.updateUserInfo({
            nickname: this.nickname,
            gender: this.gender,
            head: this.head,
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
                this._toast(res.data)
              }
            }
          })
        }
      },
      handleChooseGender () {
        const column = [{
          text: '男',
          value: '1'
        }, {
          text: '女',
          value: '2'
        }]
        this.$createPicker({
          title: '请选择性别',
          data: [column],
          onSelect: this.selectGender
        }).show()
      },
      // 选择性别
      selectGender (val, index, txt) {
        this.showGender = txt
        this.gender = val
      },
      // 上传头像
      uploadHead (e) {
        if (e.target.files[0]) {
          this.asyncUploadHead({
            headfile: e.target.files[0],
            success: (res) => {
              if (res.code === 200) {
                this.showHead = 'http://vueshop.glbuys.com/userfiles/head/' + res.data.msbox
                this.head = res.data.msbox
              }
            }
          })
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@assets/css/variable.styl'
  .profile
    width: 100%
    height: 100vh
    background-color: $color-background
    font-size $font-size-medium

    .main
      width: 90%
      margin 10px 10px 0

      ul.head
        width: 100%
        height: 50px
        border-bottom: 1px solid $color-text-ll
        display: flex
        align-items: center
        justify-content: space-between

        li:nth-child(1)
          margin-left: 5%

        li:nth-child(2)
          width: 45px
          height: 45px
          margin-right: 5%
          position: relative

          img
            width: 100%
            height: 100%
            border-radius: 50%

          input
            width: 100%
            height: 95%
            position: absolute
            z-index: 1
            left: 0
            top: 0
            opacity: 0

      ul.list
        width: 100%
        height: 40px
        border-bottom: 1px solid $color-text-ll
        display: flex;
        align-items: center
        justify-content: space-between

        li:nth-child(1)
          margin-left: 5%

        li:nth-child(2)
          width: 50%
          height: 100%
          margin-left: 20%

          input
            width: 100%
            height: 95%
            text-align: right

        li.arrow
          width: 0.4rem
          height: 0.4rem
          background-image: url("../../../assets/images/common/right_arrow.png")
          background-size: 100%
          background-repeat: no-repeat
          background-position: center
          margin-right: 3%

      .submit-save
        width: 80%
        height: 30px
        line-height 30px
        text-align center
        background-color: $color-theme
        border-radius: 5px
        margin: 0 auto
        color: $color-background
        margin-top: 0.4rem
</style>
