<template>
  <view class="details-container">
    <view class="pictrue-box">
      <video class="video-box" object-fit="contain" :src="info.video_url" :poster="info.video_cover_img" />
    </view>
  </view>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => ({})
    },
  },
}
</script>

<style lang="scss" scoped>
.details-container {
  padding: 0 30rpx;
}
.pictrue-box {
  background-color: var(--txt-color5);
  aspect-ratio: 16 / 9;
  .video-box {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>