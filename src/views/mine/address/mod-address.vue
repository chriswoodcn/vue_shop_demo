<template>
  <div class="mod-address">
    <nav-header class="header" title="修改收货地址"></nav-header>
    <div class='main'>
      <ul>
        <li>收货人</li>
        <li><input type="text" placeholder="收货人姓名" v-model="name"/></li>
      </ul>
      <ul>
        <li>联系方式</li>
        <li><input type="text" placeholder="联系人手机号" v-model="cellphone"/></li>
      </ul>
      <ul>
        <li>所在地区</li>
        <li>
          <input type="text" placeholder="请选择所在地区" class='area' readOnly :value="showArea" @click="isArea=true"/>
        </li>
      </ul>
      <ul>
        <li>详细地址</li>
        <li><input type="text" placeholder="街道详细地址" v-model="address"/></li>
      </ul>
      <ul>
        <li>设置为默认地址</li>
        <li><input type="checkbox" v-model="isDefault"/></li>
      </ul>
      <div class='submit-save' @click="submit()">修改</div>
      <div class='submit-del' @click="delAddress()">删除</div>
    </div>
    <!--    <van-popup v-model="isArea">-->
    <!--      <van-area :area-list="areaList" @cancel="isArea=false" @confirm="selectArea"/>-->
    <!--    </van-popup>-->
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  // import { Toast, Area, Popup, Dialog } from 'vant'
  import areaData from '../../../assets/data/area'

  export default {
    name: 'address-mod',
    data () {
      return {
        name: '',
        cellphone: '',
        showArea: '',
        address: '',
        isDefault: false,
        areaList: areaData,
        isArea: false,
        province: '',
        city: '',
        area: ''
      }
    },
    created () {
      this.$utils.safeUser(this)
      this.isSubmit = true
      this.aid = this.$route.query.aid ? this.$route.query.aid : ''
      this.getAddressInfo({
        aid: this.aid,
        success: (res) => {
          this.name = res.data.name
          this.cellphone = res.data.cellphone
          this.showArea = res.data.province + ' ' + res.data.city + ' ' + res.data.area
          this.address = res.data.address
          this.province = res.data.province
          this.city = res.data.city
          this.area = res.data.area
          this.isDefault = res.data.isdefault === '1'
        }
      })
    },
    mounted () {
      document.title = this.$route.meta.title
    },
    methods: {
      ...mapActions({
        modAddress: 'address/modAddress',
        getAddressInfo: 'address/getAddressInfo',
        asyncDelAddress: 'address/delAddress'
      }),
      _toast (msg) {
        this.$createToast({
          txt: msg,
          type: 'txt'
        })
      },
      submit () {
        if (this.name.match(/^\s*$/)) {
          // Toast('请输入收货人姓名')
          this._toast('请输入收货人姓名')
          return
        }
        if (this.cellphone.match(/^\s*$/)) {
          // Toast('请输入联系人手机号')
          this._toast('请输入联系人手机号')
          return
        }
        if (!this.cellphone.match(/^1[0-9][0-9]\d{8}$/)) {
          // Toast('您输入的手机号格式不正确')
          this._toast('您输入的手机号格式不正确')
          return
        }
        if (this.showArea.match(/^\s*$/)) {
          // Toast('请选择所在地区')
          this._toast('请选择所在地区')
          return
        }
        if (this.address.match(/^\s*$/)) {
          // Toast('请输入详细地址')
          this._toast('请输入详细地址')
          return
        }
        if (this.isSubmit) {
          this.isSubmit = false
          this.modAddress({
            aid: this.aid,
            name: this.name,
            cellphone: this.cellphone,
            province: this.province,
            area: this.area,
            city: this.city,
            address: this.address,
            isdefault: this.isDefault ? '1' : '0',
            success: (res) => {
              if (res.code === 200) {
                this.$createToast({
                  txt: '修改成功!',
                  time: 2000,
                  onTimeout: () => {
                    this.$router.go(-1)
                  }
                }).show()
              }
            }
          })
        }
      },
      // 删除收货地址
      delAddress () {
        this.$createDialog({
          type: 'confirm',
          content: '确认要删除吗？',
          confirmBtn: {
            text: '确定',
            href: 'javascript:;'
          },
          cancelBtn: {
            text: '取消',
            href: 'javascript:;'
          },
          onConfirm: () => {
            this.asyncDelAddress({
              aid: this.aid,
              success: () => {
                this.$router.go(-1)
              }
            })
          }
        }).show()
        // Dialog.confirm({
        //   title: '',
        //   message: '确认要删除吗？'
        // }).then(() => {
        //   this.asyncDelAddress({
        //     aid: this.aid,
        //     success: () => {
        //       this.$router.go(-1)
        //     }
        //   })
        // }).catch(() => {
        //
        // })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@assets/css/variable.styl'
  .mod-address
    width: 100%
    height: 100vh
    overflow: hidden
    background-color: $color-background
    font-size $font-size-medium

    .main
      width: 90%
      margin 0 auto
      margin-top: 10px

      ul
        width: 100%
        height 40px
        line-height 40px
        border-bottom: 1px solid $color-text-ll
        display: flex
        align-items: center

        li
          margin-left: 10px
          display flex
          flex-direction column
          justify-content center

          &:nth-child(2)
            width: 62%
            height: 100%

          input[type='text']
            width: 100%
            height: 95%
            font-size $font-size-small

          input[type='checkbox']
            width: 15px
            height: 15px

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

      .submit-del
        width: 80%
        height: 30px
        line-height 30px
        text-align center
        background-color: $color-text-ll
        border-radius: 5px
        margin: 0 auto
        color: $color-text-l
        margin-top: 0.4rem
</style>
