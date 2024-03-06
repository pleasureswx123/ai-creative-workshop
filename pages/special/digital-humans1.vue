<template>
  <view class="page-container">
    <QmNavTop />
    <QmTabs
        :value.sync="current"
        :options="stayTunedInfo" />
    <view class="page-content">
      <VideoItem :info="currentVideoInfo" />
    </view>
  
    <QmPreviewVideo
        :showPreview.sync="showPreviewVideo"
        :info="previewVideoInfo" />
  </view>
</template>

<script>
import TunedMixins from './mixin';

export default {
  mixins: [TunedMixins],
  data() {
    return {
      current: 0,
      taskType: 10
    }
  },
  computed: {
    currentVideoInfo() {
      return this.stayTunedInfo?.[this.current] || {};
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  background: var(--bg-color1);
  padding-bottom: calc(100rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(100rpx + env(safe-area-inset-bottom));
  font-size: 24rpx;
  .page-content {
    padding: 0 40rpx;
  }
}
</style>