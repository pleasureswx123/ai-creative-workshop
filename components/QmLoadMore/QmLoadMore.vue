<template>
  <uni-load-more
      :status="status"
      :contentText="contentText"
  ></uni-load-more>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      default: '' //  more/loading/noMore
    }
  },
  data() {
    return {
      contentText: {
        contentdown: '上拉显示更多',
        contentrefresh: '正在加载...',
        contentnomore: '没有更多数据了',
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
