<template>
  <div id="app">
    <!--简单方法实现按需缓存,一般首页缓存-->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style lang="stylus"></style>
