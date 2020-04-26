<template>
  <div class="mlist" @click="$router.push('/goods/details?gid='+(data.gid && data.gid))">
    <div class="image"><img v-lazy="data.image" /></div>
    <div class="desc">{{ data.title }}</div>
    <div class="price">¥{{ data.price }}</div>
  </div>
</template>

<script>
export default {
  name: 'mlist',
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@assets/css/variable.styl'
.mlist
  height 230px
  width 170px
  font-size $font-size-medium
  margin 10px auto 0
  box-sizing border-box
  padding 10px
  background-color $color-background
  .image
    width 140px
    height 140px
    margin 0 auto
    img
      width 100%
      height 100%
  .desc
    width 100%
    height 18px
    overflow hidden
    padding 10px 0
  .price
    padding 10px 0
    color $color-text-price
</style>
