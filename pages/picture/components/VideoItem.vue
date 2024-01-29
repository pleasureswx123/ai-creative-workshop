<template>
  <view class="pictrue-box">
    <video class="video-box" object-fit="contain" :src="info.video_url" :poster="info.video_cover_img" />
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