<template>
  <div class="classify">
    <div class="search-header">
      <div class="search">
        <i class="iconfont icon-sousuo"></i>
        <div class="text">女装 春季 韩版修身</div>
      </div>
    </div>
    <div class="scroll-wrapper">
      <div class="nav" ref="nav">
        <div>
          <div
            ref="item"
            :class="{ 'classify-item': true, active: item.active }"
            v-for="(item, index) in classifys"
            :key="index"
            @click="replacePage('/home/classify/item?cid=' + item.cid + '', index)"
          >
            {{ item.title }}
          </div>
        </div>
      </div>
      <div class="panel" ref="panel">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import IScroll from '../../../assets/js/libs/iscroll'

export default {
  data() {
    return {}
  },
  created() {
    this.cid = this.$route.query.cid ? this.$route.query.cid : ''
    this.getClassify({
      success: () => {
        this.$nextTick(() => {
          this.scrollNav.refresh()
          if (this.classifys.length > 0 && this.cid) {
            let i = 0
            for (; i < this.classifys.length; i++) {
              if (this.classifys[i].cid === this.cid) {
                break
              }
            }
            this.selectItem(i)
          } else {
            this.selectItem(0)
          }
        })
      }
    })
  },
  mounted() {
    document.title = this.$route.meta.title
    this.$refs.nav.addEventListener('touchmove', (e) => e.preventDefault())
    this.scrollNav = new IScroll(this.$refs.nav, {
      scrollX: false,
      scrollY: true,
      preventDefault: false
    })
  },
  computed: {
    ...mapGetters({
      classifys: 'goods/classifys'
    })
  },
  methods: {
    ...mapActions({
      getClassify: 'goods/getClassify'
    }),
    ...mapMutations({
      SELECT_ITEM: 'goods/SELECT_ITEM'
    }),
    replacePage(url, index) {
      this.$router.replace(url)
      this.selectItem(index)
    },
    selectItem(index) {
      // 距顶高度
      const unitHeight = this.$refs.item[0].offsetHeight
      const topHeight = unitHeight * (index - 3)
      const halfHeight = Math.ceil(this.$refs.nav.offsetHeight / 3)
      const bottomHeight = Math.ceil(this.$refs.nav.scrollHeight - topHeight)
      if (topHeight > halfHeight && bottomHeight > this.$refs.nav.offsetHeight) {
        this.scrollNav.scrollTo(0, -topHeight, 1000, IScroll.utils.ease.circular)
      }
      if (bottomHeight < this.$refs.nav.clientHeight) {
        this.scrollNav.scrollTo(0, -(this.$refs.nav.scrollHeight - this.$refs.nav.clientHeight), 1000, IScroll.utils.ease.circular)
      }
      this.SELECT_ITEM({ index: index })
    }
  },
  watch: {},
  beforeDestroy() {
    this.$refs.nav.removeEventListener('touchmove', (e) => e.preventDefault())
  }
}
</script>

<style lang="stylus" scoped>
@import '~@assets/css/variable.styl'
.classify
  background-color $color-background
  font-size $font-size-medium-x

  .search-header
    height 60px
    width 100%
    display flex
    justify-content center
    align-items center

    .search
      width 80%
      heihgt 37px
      background-color $color-background-d
      border-radius 10px
      display flex
      justify-content center
      align-items center
      color $color-text-l

      .iconfont
        height 37px
        line-height 37px
        font-size $font-size-large-x
        padding-right 20px

  .scroll-wrapper
    position absolute
    left 0
    top 60px
    right 0
    bottom 60px
    display flex

    .nav
      width 100px
      height 100%
      overflow hidden

      .classify-item
        height 50px
        text-align center
        line-height 50px
        color $color-text-l
        font-size $font-size-medium

      & .active
        box-sizing border-box
        color $color-theme
        border-left 5px solid $color-theme

    .panel
      flex 1
      height 100%
      background-color $color-background-d
      overflow hidden
</style>
