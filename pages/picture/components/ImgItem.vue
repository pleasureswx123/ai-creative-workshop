<template>
  <view class="pictrue-box">
    <u-swiper height="100%" :current="current" :list="imgUrls" imgMode="aspectFit"
              :autoplay="false" @change="change" @click="handleClick">
      <template v-if="isShowIndicator">
        <view slot="indicator" class="indicator">
          <view class="indicator__dot" v-for="(item, index) in imgUrls" :key="index"
                :class="[index === current && 'indicator__dot--active']">
          </view>
        </view>
      </template>
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
    isShowIndicator() {
      return false
      // return this.imgUrls.length > 1
    },
    currentImg() {
      return this.imgUrls?.[this.current] || ''
    }
  },
  methods: {
    handleClick() {
      uni.previewImage({
        urls: this.imgUrls
      });
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
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: var(--txt-color5);
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

.indicator {
  @include flex(row);
  justify-content: center;
  
  &__dot {
    height: 6px;
    width: 6px;
    border-radius: 100px;
    background-color: rgba(255, 255, 255, 0.35);
    margin: 0 5px;
    transition: background-color 0.3s;
    
    &--active {
      background-color: #ffffff;
    }
  }
}

.indicator-num {
  padding: 2px 0;
  background-color: rgba(0, 0, 0, 0.35);
  border-radius: 100px;
  width: 35px;
  @include flex;
  justify-content: center;
  
  &__text {
    color: #FFFFFF;
    font-size: 12px;
  }
}
</style>