<template>
  <div class="divider"
       :style="dividerStyle">
  </div>
</template>

<script>
  export default {
    name: 'divider',
    props: {
      dividerStyle: {
        type: Object,
        default () {
          return {
            width: '100%',
            height: '10px',
            backgroundColor: '#eeeeee'
          }
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@assets/css/variable.styl'
  .divider
    margin 0 auto
</style>
