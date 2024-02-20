<template>
  <view class="page-container">
    <QmNavTop></QmNavTop>
    <view class="page-content">
      <template v-for="(item, index) in stayTunedInfo">
        <ImgItem v-if="item.type === 'img'" :src="item.url" />
        <VideoItem v-if="item.type === 'video'" :info="item" :key="index" />
      </template>
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
      taskType: 9
    }
  },
}
</script>

<style lang="scss" scoped>
.page-container {
  background: var(--bg-color1);
  padding-bottom: calc(100rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(100rpx + env(safe-area-inset-bottom));
  font-size: 24rpx;
  .page-content {
    padding: 30rpx 40rpx;
  }
}
</style>