<template>
  <div>
    <div class='details-header'>
      <div class='back' @click="$router.go(-1)"></div>
      <div class='tab-wrap'>
        <div :class="{'tab-name':true, active:itemStyle}" @click="$router.replace('/goods/details?gid='+gid)">商品</div>
        <div :class="{'tab-name':true, active:contentStyle}" @click="$router.replace('/goods/details/content?gid='+gid)">详情</div>
        <div :class="{'tab-name':true, active:reviewStyle}" @click="$router.replace('/goods/details/review?gid='+gid)">评价</div>
      </div>
      <div id="cart-icon" class='cart-icon' @click="$router.push('/home/cart?from=details')">
        <div class='spot' v-show="$store.state.cart.cartData.length>0"></div>
      </div>
    </div>
    <div class="sub-page">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'details',
    data() {
      return {
        gid: this.$route.query.gid ? this.$route.query.gid : '',
        itemStyle: true,
        contentStyle: false,
        reviewStyle: false
      }
    },
    created() {
      this.changeTabStyle(this.$route.name)
    },
    methods: {
      changeTabStyle(name) {
        switch (name) {
          case 'goods-item':
            this.itemStyle = true
            this.contentStyle = false
            this.reviewStyle = false
            break
          case 'goods-content':
            this.itemStyle = false
            this.contentStyle = true
            this.reviewStyle = false
            break
          case 'goods-review':
            this.itemStyle = false
            this.contentStyle = false
            this.reviewStyle = true
            break
          default:
            this.itemStyle = true
            this.contentStyle = false
            this.reviewStyle = false
            break
        }
      }
    },
    beforeRouteUpdate(to, from, next) {
      this.changeTabStyle(to.name)
      next()
    }
  }
</script>

<style lang="stylus" scoped>
@import '~@assets/css/variable.styl'

</style>
