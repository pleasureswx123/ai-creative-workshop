<template>
  <view>
    <view class="select-box" @tap="show = true">
      <view class="con">点击选择</view>
      <uni-icons custom-prefix="iconfont-qm" type="icon-qm-arrowdown2" color="rgba(255,255,255,.3)" size="40" />
    </view>
    <view v-if="show" style="color: #fff;">{{show}}</view>
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    currentValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('update:value', value)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.select-box {
  background: #323232;
  border-radius: 6rpx;
  margin-bottom: 16rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #c1c1c1;
  padding: 0 10rpx 0 30rpx;
  height: 80rpx;
  font-size: 28rpx;
  .con {
    flex: 1;
  }
}
</style>