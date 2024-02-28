<template>
  <view class="slider-wrapper">
    <view class="slider-box">
      <u-slider
          v-model="currentValue"
          step="0.1" min="0.1" max="1"
          activeColor="var(--red-color1)"
          inactiveColor="var(--txt-color5)"
          block-size="15"
          block-color="var(--txt-color6)" />
    </view>
    <view class="tips">强度{{currentValue}}</view>
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
        this.$emit('update:value', +(value.toFixed(1)))
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.slider-wrapper {
  display: flex;
  align-items: center;
  gap: 20rpx;
  color: #fff;
  font-size: 28rpx;
  padding-top: 26rpx;
  .slider-box {
    flex: 1;
    min-width: 0;
    /deep/ {
      uni-slider {
        margin: 0 0 0 10px;
      }
      uni-slider .uni-slider-handle-wrapper {
        height: 2px!important;
      }
    }
  }
  .tips {
    width: 100rpx;
    text-align: right;
    font-size: 24rpx;
    color: rgba(255,255,255,.5)
  }
}
</style>