<template>
  <view class="pictrue-box" :style="boxStyle">
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
  computed: {
    boxStyle() {
      const [width, height] = this.info?.scale?.split('*') || [];
      return {
        // 'aspect-ratio': (!!+width && !!+height) ? `${width} / ${height}` : '16 / 9'
        // 'aspect-ratio': '576 / 1024'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.pictrue-box {
  width: 100%;
  background-color: var(--txt-color5);
  //aspect-ratio: 16 / 9;
  height: 100%;
  max-height: 100%;
  .video-box {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>