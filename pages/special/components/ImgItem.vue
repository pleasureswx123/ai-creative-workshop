<template>
  <view class="img-box">
<!--    <img :src="src" alt="" />-->
    <image class="img-el" mode="widthFix" :src="src" :lazy-load="true" />
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
    height: auto;
    width: 100%;
  }
}

@media screen and (min-width: 750px) {
  .img-box .img-el {
    width: 320px;
    margin: 0 auto;
  }
}
</style>