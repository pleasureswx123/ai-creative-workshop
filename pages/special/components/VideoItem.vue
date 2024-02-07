<template>
  <view class="video-wrapper">
    <view class="video-box">
      <video
          :src="src"
          object-fit="contain" />
    </view>
  </view>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: '',
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.video-wrapper {
  border: 2rpx solid rgba(255,255,255,.1);
  background: rgba(255,255,255,.01);
  border-radius: 8rpx;
  padding: 8rpx;
  margin-bottom: 8rpx;
  .video-box {
    //aspect-ratio: 9 / 16;
    video {
      width: 100%;
    }
  }
}
</style>