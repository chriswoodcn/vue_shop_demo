export default {
  created () {
    document.title = this.$route.meta.title
  },
  activated () {
    document.title = this.$route.meta.title
  }
}
