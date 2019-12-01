<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render (h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      let iconclass = `icon iconfont icon-${icon}`
      vnodes.push(<span class={iconclass}></span>)
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  .iconfont {
    margin-right: 16px;
  }
  &.el-menu--collapse {
    .iconfont {
      margin-left: 20px;
    }
  }
}
</style>
