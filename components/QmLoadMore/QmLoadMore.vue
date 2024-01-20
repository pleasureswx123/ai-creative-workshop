<template>
  <u-loadmore
      :status="status"
      :line="true"
      marginTop="60rpx"
      marginBottom="60rpx"
      :loading-text="loadingText"
      :loadmore-text="loadMoreText"
      :nomore-text="noMoreText"/>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      default: '' //  loadmore || loading || nomore
    }
  },
  data() {
    return {
      loadingText: '努力加载中',
      loadMoreText: '加载更多数据',
      noMoreText: '没有更多数据'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
