<template>
  <div class="mine-order">
    <!--    <SubHeader :title="headerTitle"></SubHeader>-->
    <nav-header class="header" :title="headerTitle"></nav-header>
    <OrderTags :status="status"></OrderTags>
    <div class='main'>
      <cube-scroll>
        <div class="scroll-content">
          <router-view></router-view>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
  import OrderTags from '@/components/mine/order/order-tags'

  export default {
    name: 'mine-order',
    data () {
      return {
        status: this.$route.query.status ? this.$route.query.status : 'all',
        headerTitle: '全部订单'
      }
    },
    components: {
      OrderTags
    },
    methods: {
      getTitle () {
        switch (this.status) {
          case 'all':
            this.headerTitle = '全部订单'
            document.title = this.headerTitle
            break
          case '0':
            this.headerTitle = '待付款'
            document.title = this.headerTitle
            break
          case '1':
            this.headerTitle = '待收货'
            document.title = this.headerTitle
            break
          case '2':
            this.headerTitle = '待评价'
            document.title = this.headerTitle
            break
          default:
            this.headerTitle = '全部订单'
            document.title = this.headerTitle
            break
        }
      }
    },
    mounted () {
      this.getTitle()
    },
    beforeRouteUpdate (to, from, next) {
      this.status = to.query.status
      this.getTitle()
      next()
    },
    created () {
      this.$utils.safeUser(this)
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@assets/css/variable.styl'
  .mine-order
    width: 100%
    min-height: 100vh
    background-color: $color-background

    .main
      width: 100%
      height 577px
      overflow hidden
      .scroll-content
        min-height 580px
        padding-bottom 50px
</style>
