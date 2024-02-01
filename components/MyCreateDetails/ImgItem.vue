<template>
  <view class="pictrue-box">
    <u-swiper height="100%" :current="current" :list="imgUrls" imgMode="aspectFit"
              :autoplay="false" @change="change" @click="handleClick">
    </u-swiper>
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
  data() {
    return {
      current: 0
    }
  },
  computed: {
    imgUrls() {
      return this.info?.img_urls || []
    },
  },
  methods: {
    handleClick() {
      // uni.previewImage({
      //   urls: this.imgUrls
      // });
    },
    change({current}) {
      this.current = current || 0;
      this.$emit('change', this.current);
    }
  }
}
</script>

<style lang="scss" scoped>
.pictrue-box {
  width: 100%;
  height: 100%;
  /deep/ {
    .u-swiper__wrapper__item__wrapper__image {
      background-color: #000!important;
    }
    .u-swiper__wrapper__item, .u-swiper__wrapper__item__wrapper {
      background: #000!important;
    }
    uni-image>div, uni-image>img {
      background-color: #000!important;
    }
  }
}
</style>