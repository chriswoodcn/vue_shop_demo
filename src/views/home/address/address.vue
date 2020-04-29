<template>
  <div class="home-address">
    <nav-header title="选择收货地址"></nav-header>
    <div class='main'>
      <div class='address-nav'>
        <div class='address-nav-name-1'>配送地址</div>
        <div class='address-nav-name-2' @click="$router.push('/mine/address/add')">+添加收货地址</div>
      </div>
      <div v-show="address.length>0" class="address-list-wrapper">
        <cube-scroll :data="address">
          <div class="scroll-content">
            <div class='address-list' v-for="(item,index) in address" :key="index" @click="selectAddress(item.aid)">
              <div class='address-info-wrap'>
                <div :class="{'address-info':true, 'default':item.isdefault==='1'?true:false}">
                  <div class='person'><span>{{item.name}}</span><span>{{item.cellphone}}</span></div>
                  <div class='address'>
                    <span class='default' v-if="item.isdefault==='1'?true:false">默认</span>
                    <span class='text'>{{item.province}}{{item.city}}{{item.area}}{{item.address}}</span>
                  </div>
                </div>
              </div>
              <div class='handle-wrap'>
                <div class='edit' @click.stop="$router.push('/mine/address/mod?aid='+item.aid)"></div>
                <div class='del' @click.stop="delAddress(index,item.aid)"></div>
              </div>
            </div>
          </div>
        </cube-scroll>
      </div>
      <div class="no-data" v-show="address.length<=0">您还没有添加收货地址!</div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    name: 'home-address',
    created() {
      this.$utils.safeUser(this)
      this.getAddress()
    },
    mounted() {
      document.title = this.$route.meta.title
    },
    computed: {
      ...mapState({
        address: state => state.address.address
      })
    },
    methods: {
      ...mapActions({
        getAddress: 'address/getAddress',
        asyncDelAddress: 'address/delAddress'
      }),
      // 删除收货地址
      delAddress(index, aid) {
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
              index: index,
              aid: aid
            })
          }
        }).show()
        // Dialog.confirm({
        //   title: '',
        //   message: '确认要删除吗？'
        // }).then(() => {
        //   this.asyncDelAddress({
        //     index: index,
        //     aid: aid
        //   })
        // }).catch(() => {
        //
        // })
      },
      // 选择收货地址
      selectAddress(aid) {
        sessionStorage.addsid = aid
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@assets/css/variable.styl'
  @import '~@assets/css/mixin.styl'
  .home-address
    width: 100%
    min-height: 100vh
    background-color: $color-background
    overflow: hidden
    font-size $font-size-small
    position relative
    z-index 11

    .main
      width: 100%

      .address-nav
        height: 30px
        padding 0 10px
        background-color: #D3C6BE;
        display: flex
        justify-content: space-between
        align-items: center

      .address-list-wrapper
        height 587px

        .scroll-content
          min-height 590px

          .address-list
            width: 100%;
            height: 80px
            border-bottom: 1px solid $color-text-ll

            .address-info-wrap
              width: 90%
              height: 54px
              border-bottom: 1px dashed $color-text-ll
              margin: 0 auto
              display: flex
              align-items flex-end

              .check-mark
                width: 0.4rem
                height: 0.4rem
                background-image: url("../../../assets/images/home/cart/gou.png");
                background-size: 100%
                background-repeat: no-repeat
                background-position: center
                margin-right: 0.3rem

              .address-info.default
                width: 90%

              .address-info
                width: 100%
                height: auto

            .person
              width: 100%
              height: 0.5rem
              border-bottom: 1px solid $color-text-ll
              font-size: 0.28rem
              overflow: hidden

              span:nth-child(1)
                margin-right: 0.2rem

            .address
              width: 100%
              height: 0.6rem
              overflow: hidden
              line-height: 0.6rem
              margin-top: 0.1rem
              no-wrap()

              .text
                font-size: 0.32rem

              .default
                padding: 0.05rem 0.1rem
                background-color: $color-theme
                color: $color-background
                font-size: 0.24rem
                border-radius: 4px
                margin-right: 0.2rem

            .handle-wrap
              width: 100%
              height: 0.76rem
              display: flex
              justify-content: flex-end
              align-items: center

              .edit
                width: 0.4rem
                height: 0.4rem
                background-image: url("../../../assets/images/home/cart/edit.png")
                background-size: 100%
                background-repeat: no-repeat
                background-position: center
                margin-right: 0.3rem

              .del
                width: 0.4rem
                height: 0.4rem
                background-image: url("../../../assets/images/home/cart/del.png")
                background-size: 100%
                background-repeat: no-repeat
                background-position: center
                margin-right: 0.3rem
</style>
