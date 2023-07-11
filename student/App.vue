<script>
  export default {
    onLaunch () {
      // 加载系统信息
      this.$store.dispatch('SystemInfo')
    },
    onShow () {
    },
    onHide () {
    }
  }
</script>

<style lang="scss">
@import "@/uni_modules/uview-ui/index.scss";
@import "@/static/style.scss";
@import "@/static/ueditor/iframe.css";
</style>
