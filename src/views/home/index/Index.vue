<template>
  <div class="index">
    <div class="header">
      <Header @leftClick="onLeftClick" @centerClick="onCenterClick" @rightClick="onRightClick"></Header>
    </div>
    <div class="scroll-list-wrap">
      <cube-scroll ref="scroll" :data="datas" :options="options">
        <cube-slide ref="slide" :data="swipers" :interval="2000" @change="changePage">
          <cube-slide-item v-for="(item, index) in swipers" :key="index" @click.native="clickHandler(item, index)">
            <a :href="item.url">
              <img :src="item.image" />
            </a>
          </cube-slide-item>
          <template #dots="props">
            <span class="dot" :class="{ active: props.current === index }" v-for="(item, index) in props.dots" :key="index">{{ index + 1 }}</span>
          </template>
        </cube-slide>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import Header from '../../../components/home/index/Header'
export default {
  name: 'index',
  data: function () {
    return {
      datas: [],
      swipers: [],
      options: {}
    }
  },
  components: { Header },
  methods: {
    onLeftClick() {
      this.$router.push('/map')
    },
    onCenterClick() {
      this.$router.push('/home/search')
    },
    onRightClick() {
      this.$router.replace('/login')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@assets/css/variable.styl'
.index
  position absolute
  left 0
  right 0
  bottom 60px
  top 0
  background-color pink
  .header
    position fixed
    z-index 999
    left 0
    top 0
    width 100%
    height 50px
  .scroll-list-wrap
    width 100%
    height 100%
    .dot
      width 8px
      height 5px
      border-radius 5px
      &.active
        width 15px
        background-color #FF3B00
</style>
