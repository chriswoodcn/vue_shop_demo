<template>
  <div class="header" :style="headerStyle">
    <template v-if="isBack">
      <div class="back iconfont icon-arrow-right-copy-copy-copy-copy" @click="$router.go(-1)"></div>
    </template>
      <div class="title">{{title}}</div>
  </div>
</template>

<script>
  export default {
    name: 'nav-header',
    props: {
      title: {
        type: String,
        default () {
          return '标题'
        }
      },
      isBack: {
        type: Boolean,
        default () {
          return true
        }
      },
      headerStyle: {
        type: Object,
        default () {
          return {}
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@assets/css/variable.styl'
  .header
    position relative
    height 50px
    font-size $font-size-large-x
    border-bottom 1px solid $color-text-ll
    background-color $color-background
    color $color-text
    box-sizing border-box

    .back
      width 50px
      height 50px
      text-align center
      line-height 50px

    .title
      height 50px
      line-height 50px
      font-size $font-size-large
      position absolute
      left 50%
      top 50%
      transform translate(-50%, -50%)
</style>
