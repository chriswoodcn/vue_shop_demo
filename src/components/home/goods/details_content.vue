<template>
  <div class="page">
    <div class='content' v-html="details.bodys"></div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'details_content',
    computed: {
      ...mapGetters({
        details: 'goods/details'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@assets/css/variable.styl'
  .page
    margin: 60px 0

  .content
    width: 90%
    margin: 0 auto
    padding 10px 0
    font-size: $font-size-medium
    line-height 1.5
</style>
