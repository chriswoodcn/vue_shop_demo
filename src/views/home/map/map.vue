<template>
  <div class="map">
    <div class="header">
      <div class="back iconfont icon-arrow-right-copy-copy-copy-copy" @click="$router.go(-1)"></div>
      <div class="title">地图</div>
    </div>
    <div class="search">
      <input type="text" v-model="searchWord" placeholder="请输入您所在的地区">
      <i class="iconfont icon-sousuo" @click="searchClick"></i>
    </div>
    <div class="map-container">
      <baidu-map class="baidu-map" ak="zb18k7Sn55uUauHn9xqqFp0mjI5AntYx" :center="map.center"
                 :zoom="map.zoom" @ready="mapReady" @click="mapClick">
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"/>
        <bm-geolocation ref="geolocation" anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true"
                        :autoLocation="isAutoLocation"/>
        <template v-if="keyword">
          <bm-local-search :auto-viewport="true" :keyword="keyword" :location="keyword" :selectFirstResult="true"
                           @searchcomplete="searchcomplete" :panel="false"></bm-local-search>
        </template>
        <bm-marker v-if="markerPoint.lng!== 0&&markerPoint.lat!== 0" :position="markerPoint" :clicking="false">
          <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen">{{formatted_address}}
          </bm-info-window>
        </bm-marker>
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
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
  import { BmNavigation, BmLocalSearch, BmMarker, BmInfoWindow, BmGeolocation } from 'vue-baidu-map'
  import { mapMutations } from 'vuex'
  import { getLocationInfo } from '@/api/map'

  export default {
    name: 'baidumap',
    data() {
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
        },
        show: false,
        markerPoint: {
          lng: 0,
          lat: 0
        },
        formatted_address: '',
        isAutoLocation: false
      }
    },
    components: {
      BaiduMap,
      BmNavigation,
      BmGeolocation,
      BmLocalSearch,
      BmMarker,
      BmInfoWindow
    },
    created() {
      // https的域名才支持了,浏览器自带的定位
      // if (navigator.geolocation) {
      //   navigator.geolocation.getCurrentPosition((pos) => {
      //     console.log(pos)
      //     this.map.center.lat = pos.coords.latitude
      //     this.map.center.lng = pos.coords.longitude
      //   })
      // }
      // this.$createDialog({
      //   type: 'confirm',
      //   content: '是否自动定位获取您的模糊位置',
      //   confirmBtn: {
      //     text: '确定',
      //     active: true,
      //     href: 'javascript:;'
      //   },
      //   cancelBtn: {
      //     text: '取消',
      //     active: true,
      //     href: 'javascript:;'
      //   },
      //   onConfirm: () => {
      //     console.log(this.$refs.geolocation)
      //     this.isAutoLocation = true
      //   }
      // }).show()
    },
    methods: {
      ...mapMutations({ setAddress: 'user/SET_USERADDRESS' }),
      mapReady({ Bmap, map }) {
        this.map.center = '北京'
        this.map.zoom = 15
      },
      mapClick({ point }) {
        this.formatted_address = ''
        this.markerPoint = point
        this.infoWindowOpen()
        // 根据坐标转位置信息
        getLocationInfo(this.markerPoint).then(res => {
          // console.log(11111111111111111111)
          // console.log(res)
          if (res.status === 0) {
            this.formatted_address = res.result.formatted_address
            this.results.province = res.result.addressComponent.province
            this.results.city = res.result.addressComponent.city
            const listItem = {
              title: res.result.addressComponent.district + res.result.addressComponent.street,
              address: this.formatted_address
            }
            this.results.lists = []
            this.results.lists.push(listItem)
            // console.log(this.results)
          } else {
            this.$createToast(
              {
                type: 'txt',
                txt: '获取地址失败,请您重新选择'
              }
            ).show()
          }
        })
      },
      searchClick() {
        if (this.searchWord.trim()) {
          this.keyword = this.searchWord.trim()
        }
      },
      searchcomplete(results) {
        console.log(results)
        if (results === undefined || results.Ir.length <= 0) {
          this.$createToast({
            type: 'txt',
            txt: '您搜索的地址不存在,请重新输入'
          }).show()
          return
        }
        this.$set(this.results, 'province', results.province || '')
        this.$set(this.results, 'city', results.city || '')
        this.$set(this.results, 'lists', results.Ir || '')
      },
      handlerAddressChoose({ title, address }) {
        this.setAddress({
          title,
          address
        })
        this.$router.replace('/home')
      },
      infoWindowClose() {
        this.show = false
      },
      infoWindowOpen() {
        this.show = true
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
            width 30px
            padding-left 10px

          .title
            font-size $font-size-medium
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
