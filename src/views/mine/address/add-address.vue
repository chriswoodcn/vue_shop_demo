<template>
  <div class="add-address">
    <nav-header class="header" title="添加收货地址"></nav-header>
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
          <input type="text" placeholder="请选择所在地区" class='area' readOnly :value="showArea"
                 @click="addressPicker.show()"/>
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
      <div  class='submit-save' @click="submit()">保存</div>
    </div>
  </div>
</template>

<script>

  import { mapActions } from 'vuex'
  import areaData from '../../../assets/data/area'

  export default {
    name: 'address-add',
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
      this._initCascadeDate()
    },
    mounted () {
      document.title = this.$route.meta.title
      this.addressPicker = this.$createCascadePicker({
        title: '选择地区',
        data: this.cascaderData,
        onSelect: this.selectHandle
      })
    },
    methods: {
      ...mapActions({
        addAddress: 'address/addAddress'
      }),
      _toast (msg) {
        this.$createToast({
          txt: msg,
          type: 'txt'
        }).show()
      },
      _initCascadeDate () {
        const cascaderData = []
        const provinceNum = Object.keys(areaData.province_list)
        const cityNum = Object.keys(areaData.city_list)
        const countyNum = Object.keys(areaData.county_list)
        for (let i = 0; i < provinceNum.length; i++) {
          const item1 = {}
          item1.value = provinceNum[i]
          item1.text = areaData.province_list[provinceNum[i]]
          item1.children = []
          if (item1.value.slice(0, 1) === '9') {
            for (let j = 0; j < cityNum.length; j++) {
              if (cityNum[j].slice(0, 1) === '9') {
                const item2 = {}
                item2.value = cityNum[j]
                item2.text = areaData.city_list[cityNum[j]]
                item1.children.push(item2)
              }
            }
          }
          for (let j = 0; j < cityNum.length; j++) {
            if (cityNum[j].slice(0, 3) === provinceNum[i].slice(0, 3)) {
              const item2 = {}
              item2.value = cityNum[j]
              item2.text = areaData.city_list[cityNum[j]]
              item2.children = []
              for (let k = 0; k < countyNum.length; k++) {
                if (countyNum[k].slice(0, 4) === cityNum[j].slice(0, 4)) {
                  const item3 = {}
                  item3.value = countyNum[k]
                  item3.text = areaData.county_list[countyNum[k]]
                  item2.children.push(item3)
                }
              }
              item1.children.push(item2)
            }
          }
          cascaderData.push(item1)
        }
        this.cascaderData = cascaderData
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
          this.addAddress({
            name: this.name,
            cellphone: this.cellphone,
            province: this.province,
            area: this.area,
            city: this.city,
            address: this.address,
            isdefault: this.isDefault ? '1' : '0',
            success: (res) => {
              console.log('000000000000')
              console.log(res)
              console.log(res.code === 200)
              console.log(res.code === '200')
              if (res.code === 200) {
                console.log('111111111111')
                this.$createToast({
                  txt: '添加成功!',
                  time: 2000,
                  mask: true,
                  onTimeout: () => {
                    this.$router.go(-1)
                  }
                }).show()
              } else {
                this._toast('res.data')
              }
            }
          })
        }
      },
      selectHandle (val, index, txt) {
        const tmpVal = []
        if (txt.length > 0) {
          for (let i = 0; i < txt.length; i++) {
            tmpVal.push(txt[i])
          }
          this.province = tmpVal[0]
          this.city = tmpVal[1]
          this.area = tmpVal[2]
        }
        this.showArea = [...new Set(tmpVal)].join(' ')
      }
      // 选择所在地区
      // selectArea (val) {
      //   this.isArea = false
      //   const tmpVal = []
      //   if (val.length > 0) {
      //     for (let i = 0; i < val.length; i++) {
      //       tmpVal.push(val[i].name)
      //     }
      //     this.province = tmpVal[0]
      //     this.city = tmpVal[1]
      //     this.area = tmpVal[2]
      //   }
      //   this.showArea = tmpVal.join(' ')
      // }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@assets/css/variable.styl'
  .add-address
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
</style>
