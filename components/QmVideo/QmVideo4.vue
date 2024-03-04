<template>
  <view class="video-box" id="canvasVideoBox" ref="canvasBox">
  </view>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    }
  },
  mounted() {
    window.initVideoToCanvas(this.src);
  }
}
</script>

<style lang="scss" scoped>
.video-box {
  &, video, canvas {
    width: 100%;
    height: 100%;
  }
}
</style>