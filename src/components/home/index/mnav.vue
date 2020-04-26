<template>
  <div class="nav">
    <ul class="item" v-for="(item, index) in navs" :key="index" @click="$router.push('/home/classify/item?cid=' + item.cid)">
      <li><img v-lazy="item.image" /></li>
      <li>{{ item.title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'mnav',
  props: {
    navs: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@assets/css/variable.styl'
.nav
  height 80px
  padding  10px 10px 0 10px
  display flex
  justify-content space-around
  background-color $color-background
  margin 10px 0
  .item
    display flex
    flex-direction column
    justify-content center
    font-size $font-size-small
    text-align center
    width 70px
    height 70px
    img
      width 40px
      height 40px
      margin-bottom 10px
</style>
