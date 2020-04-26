<template>
  <div class="map">
    <div class="header">
      <div class="back iconfont icon-arrow-right-copy-copy-copy-copy" @click="$router.go(-1)"></div>
      <div class="title">地图</div>
    </div>
    <div class="search">
      <input type="text" v-model="searchWord" placeholder="请输入您所在的地区">
      <i class="iconfont icon-sousuo" @click="keyword = searchWord.trim()"></i>
    </div>
    <div class="map-container">
      <baidu-map class="baidu-map" ak="zb18k7Sn55uUauHn9xqqFp0mjI5AntYx" :center="map.center"
                 :zoom="map.zoom" @ready="mapReady">
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"/>
        <bm-local-search :auto-viewport="true" :keyword="keyword" :location="keyword" :selectFirstResult="true"
                         @searchcomplete="searchcomplete" :panel="false"></bm-local-search>
      </baidu-map>
      <div class="mask"></div>
    </div>
    <div class="res-list">
      <template v-if="results.lists.length > 0">
        <div class="has-data" v-for="(item,index) in results.lists" :key="index" @click="handlerAddressChoose(item)">
          <div class="res-header">
            <div class="iconfont address-icon icon-weibiaoti-3"></div>
            <div class="title">{{item.title}}</div>
          </div>
          <div class="more-info">
            <div class="address">
              {{item.address}}
            </div>
            <div class="phoneNumber">{{item.phoneNumber}}</div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="no-data">暂无搜索结果...</div>
      </template>
    </div>
  </div>
</template>

<script>
  // 东丽湖阅湖苑6号楼
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
  import { BmNavigation, BmLocalSearch } from 'vue-baidu-map'
  import { mapMutations } from 'vuex'

  export default {
    name: 'baidumap',
    data () {
      return {
        map: {
          center: {
            lng: 0,
            lat: 0
          },
          zoom: 3
        },
        searchWord: '',
        keyword: '',
        results: {
          province: '',
          city: '',
          lists: []
        }
      }
    },
    components: {
      BaiduMap,
      BmNavigation,
      BmLocalSearch
    },
    mounted () {
    },
    methods: {
      ...mapMutations({ setAddress: 'user/SET_USERADDRESS' }),
      mapReady ({ Bmap, map }) {
        this.map.center = '北京'
        this.map.zoom = 15
      },
      searchcomplete (results) {
        if (results === undefined) return
        this.$set(this.results, 'province', results.province || '')
        this.$set(this.results, 'city', results.city || '')
        this.$set(this.results, 'lists', results.Ir || '')
      },
      handlerAddressChoose ({ title }) {
        this.setAddress({ title })
        this.$router.replace('/home')
      }
    }
  }
</script>
}

<style lang="stylus" scoped>
  @import '~@assets/css/variable.styl'
  @import '~@assets/css/mixin.styl'
  .map
    position fixed
    left 0
    right 0
    top 0
    bottom 60px
    font-size $font-size-medium
    color $color-text-l

    .header
      position relative
      height 50px
      font-size $font-size-large-x
      border-bottom 1px solid $color-text-ll

      .back
        width 50px
        height 50px
        text-align center
        line-height 50px

      .title
        height 50px
        line-height 50px
        font-size $font-size-large
        color $color-text
        position absolute
        left 50%
        top 50%
        transform translate(-50%, -50%)

    .search
      width 100%
      height 40px
      display flex
      align-items center
      justify-content center

      input
        width 80%
        outline none
        height 28px
        border-radius 10px
        padding 0 10px
        border 1px solid $color-text-ll
        box-sizing border-box

      .iconfont
        position absolute
        right 25px
        width 50px
        height 28px
        line-height 28px
        text-align center
        background-color $color-text-l
        color $color-background
        border-top-right-radius 10px
        border-bottom-right-radius 10px

    .map-container
      position relative
      width 375px
      height 375px

      .baidu-map
        width 100%
        height 100%

      .mask
        position absolute
        left 0
        bottom 0
        width 100%
        height 25px
        background-color $color-background

    .res-list
      position relative
      z-index 2
      margin-top -25px
      width 375px
      height 170px
      overflow-y scroll

      .has-data
        margin 5px 10px
        border-bottom 1px dashed $color-text-ll
        font-size $font-size-medium
        background-color $color-background
        display flex
        flex-direction column

        &:last-child
          margin-bottom 50px

        .res-header
          display flex
          flex-direction row
          justify-content flex-start
          align-items center
          height 20px

          .address-icon
            width 50px
            padding-left 10px

          .title
            font-size $font-size-medium
            padding-left 10px
            no-wrap()

        .more-info
          font-size $font-size-small
          padding-left 10px
          margin 5px 0

          .address
            overflow hidden
            padding-bottom 5px
            no-wrap()

          .phoneNumber
            color blue

      .no-data
        height 100px
        width 100%
        line-height 100px
        text-align center
        font-size $font-size-medium-x
</style>
