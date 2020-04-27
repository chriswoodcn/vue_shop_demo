<template>
  <div class="mine">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'mine'
  }
</script>

<style lang="stylus" scoped>
  @import '~@assets/css/variable.styl'
  .mine
    width 100%
    height auto
</style>
