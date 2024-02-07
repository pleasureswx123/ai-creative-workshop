<template>
  <view class="img-box">
    <image
        @tap="previewImage"
        :src="src"
        mode="aspectFit" />
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
  },
  methods: {
    previewImage() {
      uni.previewImage({
        urls: [this.src]
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.img-box {
  border: 2rpx solid rgba(255,255,255,.1);
  background: rgba(255,255,255,.01);
  border-radius: 8rpx;
  padding: 8rpx;
  margin-bottom: 8rpx;
  image {
    width: 100%;
  }
}
</style>