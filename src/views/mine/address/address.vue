<template>
  <div class="mine-address">
    <nav-header class="header" title="收货地址"></nav-header>
    <div class='main'>
      <div class='list' v-for="(item,index) in address" :key="index"
           @click="$router.push('/mine/address/mod?aid='+item.aid)">
        <div class='name-wrap'>
          <span>{{item.name}}</span><span>{{item.cellphone}}</span>
        </div>
        <div class='address'>
          <span v-if="item.isdefault==='1'">[默认]</span>{{item.province}}{{item.city}}{{item.area}}{{item.address}}
        </div>
        <div class='right-arrow'></div>
      </div>
      <div style="width:100%;height:1.3rem;"></div>
    </div>
    <div class='add-btn' @click="$router.push('/mine/address/add')">+ 添加新地址</div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    name: 'mine-address',
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
        getAddress: 'address/getAddress'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@assets/css/variable.styl'
  .mine-address
    width: 100%
    min-height: 100vh
    background-color: $color-background
    overflow: hidden

    .main
      width: 90%
      margin 0 auto
      margin-top: 10px
      font-size: $font-size-small

      .list
        width: 100%
        height: 50px
        border-bottom: 1px solid $color-text-ll
        position: relative

        .name-wrap
          width: auto
          height: auto
          position: absolute
          left: 3%
          top: 0.2rem

          span
            padding-right: 0.3rem

        .address
          width: auto
          height: auto
          position: absolute
          left: 3%
          top: 0.7rem

          span
            color: $color-theme

        .right-arrow
          width: 0.3rem
          height: 0.3rem
          background-image: url("../../../assets/images/common/right_arrow.png")
          background-size: 100%
          background-repeat: no-repeat
          background-position: center
          position: absolute;
          right: 3%
          top: 0.45rem

    .add-btn
      width: 80%
      height: 36px
      line-height 36px
      background-color: #EB1625
      position: fixed;
      z-index: 2;
      bottom: 20px
      left: 50%
      border-radius: 5px
      transform: translateX(-50%)
      color: $color-background
      font-size $font-size-medium-x
      text-align: center
</style>
