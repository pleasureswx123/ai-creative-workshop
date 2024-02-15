<template>
  <view class="img-box">
<!--    <img :src="src" alt="" />-->
    <image class="img-el" mode="widthFix" :src="src" :lazy-load="true" @tap="previewImage" />
    <!--  <image
          @tap="previewImage"
          :src="src"
          mode="aspectFill" />-->
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
  width: 100%;
  .img-el {
    display: block;
    width: 100%;
    height: auto;
  }
  //img {
  //  border: none;
  //  padding: 0;
  //  margin: 0;
  //  width: 100%;
  //  height: auto;
  //  display: block;
  //}
  //border: 2rpx solid rgba(255,255,255,.1);
  //background: rgba(255,255,255,.01);
  //border-radius: 8rpx;
  //padding: 8rpx;
  //margin-bottom: 8rpx;
}
</style>