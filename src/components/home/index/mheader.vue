<template>
  <div class="header" :style="headerStyle">
    <div class="left" @click.prevent="leftClick">
      <i :class="data.icon"></i>
      <i class="address">{{userAddress}}</i>
    </div>
    <div class="center" @click.prevent="centerClick">
      <div class="search">
        <i class="iconfont icon-sousuo"></i>
        <p>{{ data.center }}</p>
      </div>
    </div>
    <div class="right" @click.prevent="rightClick">
      <template v-if="!isLogin">
        <p>{{ data.right }}</p>
      </template>
      <template v-else>
        <p class="iconfont icon-ren"></p>
      </template>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'mheader',
    props: {
      data: {
        type: Object,
        default () {
          return {
            icon: 'iconfont icon-weibiaoti-3',
            center: '女装 春季韩版',
            right: '登录'
          }
        }
      },
      headerStyle: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    computed: {
      ...mapGetters({
        userAddress: 'user/userAddress',
        isLogin: 'user/isLogin'
      })
    },
    methods: {
      leftClick () {
        this.$emit('leftClick')
      },
      centerClick () {
        this.$emit('centerClick')
      },
      rightClick () {
        this.$emit('rightClick', this.isLogin)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@assets/css/variable.styl'
  .header
    display flex
    padding 10px 20px 0
    height 50px
    box-sizing border-box
    line-height 40px
    text-align center
    font-weight 700
    color #eee
    background linear-gradient(rgb(235, 22, 37), hsla(0, 0%, 100%, 0))

    .left
      flex 0 0 40px
      height 40px
      display flex
      flex-direction column
      font-size 30px
      line-height 25px

      i
        font-style normal
        height 20px

      .address
        font-size $font-size-small

    .center
      flex 1
      display flex
      justify-content center
      align-items center

      .search
        display flex
        justify-content flex-start
        align-items center
        width 95%
        height 26px
        box-sizing border-box
        border-radius 5px
        font-size $font-size-small
        padding 0 10px
        background-color rgba(255, 255, 255, .3)

        i
          padding-right 10px

    .right
      flex 0 0 40px
      width 40px
      height 100%
      font-size $font-size-medium-x

      .iconfont
        font-size 26px
</style>
