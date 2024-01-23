<template>
  <view class="pictrue-box">
    <video class="video-box"
           object-fit="contain"
           :src="src"
    />
  </view>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.pictrue-box {
  background-color: #E0D4C9;
  aspect-ratio: 16 / 9;
  .video-box {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>