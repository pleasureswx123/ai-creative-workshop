<template>
  <view class="brush-box">
    <view class="brush-inner" ref="brushSizeBox">
      <u-slider
          v-model="currentValue"
          step="1" min="1" max="100"
          activeColor="var(--red-color1)"
          inactiveColor="var(--txt-color5)"
          block-size="20"
          block-color="var(--txt-color6)" />
    </view>
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: [Number, String]
    },
  },
  computed: {
    currentValue: {
      get() {
        return +this.value
      },
      set(value) {
        this.$emit('update:value', +value)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.brush-box {
  height: 0;
  position: relative;
  .brush-inner {
    position: absolute;
    top: 0;
    left: 50%;
    width: 90%;
    max-width: 500px;
    height: 60rpx;
    transform: translate3d(-50%, -60rpx, 0);
    /deep/ {
      uni-slider {
        margin: 0;
      }
      uni-slider .uni-slider-handle-wrapper {
        height: 10px!important;
      }
    }
  }
}
</style>