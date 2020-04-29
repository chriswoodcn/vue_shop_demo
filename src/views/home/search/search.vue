<template>
  <div class="search">
    <div class="search-header">
      <div class="back iconfont icon-arrow-right-copy-copy-copy-copy" @click="$router.go(-1)"></div>
      <div class="search-wrap">
        <div class="search-input-wrap">
          <input type="text" class="input" placeholder="请输入宝贝名称" v-model="keyword"/>
          <div type="button" class="search-btn iconfont icon-sousuo" @click="goSearch()"></div>
        </div>
      </div>
    </div>
    <div class="search-main" v-if="historyKeywords.length > 0">
      <div class="search-title-wrap">
        <div class="search-title">最近搜索</div>
        <div class="bin iconfont icon-jiahao" @click="clearHistoryKeywords()"></div>
      </div>
      <div class="search-keywords-wrap">
        <div class="keywords" v-for="(item, index) in historyKeywords" :key="index" @click="goSearch(item)">{{ item }}
        </div>
      </div>
    </div>
    <div class="search-main">
      <div class="search-title-wrap">
        <div class="search-title">热门搜索</div>
      </div>
      <div class="search-keywords-wrap">
        <div class="keywords" v-for="(item, index) in hotKeywords" :key="index" @keyup.enter="goSearch(item.title)"
             @click="goSearch(item.title)">
          {{ item.title }}
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapMutations, mapState, mapActions } from 'vuex'

  export default {
    name: 'my-search',
    data() {
      return {
        keyword: ''
      }
    },
    created() {
      this.keywords = this.historyKeywords ? this.historyKeywords : []
      this.getHotKeyword()
    },
    computed: {
      ...mapState({
        historyKeywords: (state) => state.search.historyKeywords,
        hotKeywords: (state) => state.search.hotKeywords
      })
    },
    methods: {
      ...mapMutations({
        SET_KEYWORDS: 'search/SET_KEYWORDS',
        CLEAR_KEYWORDS: 'search/CLEAR_KEYWORDS'
      }),
      ...mapActions({
        getHotKeyword: 'search/getHotKeyword'
      }),
      goSearch(keyword) {
        const tmpKeyword = keyword || this.keyword || ''
        if (tmpKeyword === this.$route.query.keyword) {
          return
        }
        this.keyword = tmpKeyword
        if (tmpKeyword) {
          if (this.keywords.length > 0) {
            for (let i = 0; i < this.keywords.length; i++) {
              if (this.keywords[i] === tmpKeyword) {
                this.keywords.splice(i--, 1)
              }
            }
          }
          this.keywords.unshift(tmpKeyword)
          this.SET_KEYWORDS({ historyKeywords: this.keywords })
        }
        this.$router.replace('/home/search/panel?keyword=' + tmpKeyword)
        // 重置panel视图滚动到顶部
        if (this.$children[0] && this.$children[0].scrollGoods) {
          this.$children[0].scrollGoods.scrollTo(0, 0, 300)
        }
      },
      clearHistoryKeywords() {
        console.log(this.historyKeywords)
        if (this.historyKeywords.length > 0) {
          this.dialog = this.$createDialog({
            type: 'confirm',
            content: '确认要删除吗?',
            confirmBtn: {
              text: '确定',
              active: true,
              disabled: false,
              href: 'javascript:;'
            },
            cancelBtn: {
              text: '取消',
              active: true,
              disabled: false,
              href: 'javascript:;'
            },
            onConfirm: () => {
              this.CLEAR_KEYWORDS()
            }
          })
          this.dialog.show()
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@assets/css/variable.styl'
  .search
    position fixed
    z-index 2
    left 0
    right 0
    bottom 0
    top 0
    background-color $color-background
    font-size $font-size-medium-x

    .search-header
      height 50px
      width 100%
      display flex

      .back
        flex 0 0 50px
        font-size 26px
        color $color-text-ll
        width 50px
        line-height 50px
        text-align center

      .search-wrap
        flex 1
        display flex
        padding-left 20px
        align-items center

        .search-input-wrap
          display flex
          overflow hidden
          height 28px
          width 280px
          border-radius 5px
          line-height 28px
          border 1px solid $color-text-ll

          .input
            flex 1
            heihgt 100%
            font-size $font-size-medium
            padding 0 10px

          .search-btn
            width 50px
            height 100%
            background-color $color-text-ll
            text-align center
            line-height auto

    .search-main
      .search-title-wrap
        height 20px
        margin 10px 20px 0
        color $color-text
        font-weight 700
        border-bottom 1px solid $color-text-ll
        display flex
        justify-content space-between

        .bin
          font-size $font-size-medium-x
          transform rotate(45deg)
          color $color-text-l

      .search-keywords-wrap
        display flex
        flex-wrap wrap
        margin 10px 20px

        .keywords
          padding 5px 10px
          border 1px solid $color-text-ll
          border-radius 10px
          margin 5px 10px 5px 0
          color $color-text-l
</style>
