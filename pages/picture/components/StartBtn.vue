<template>
  <view class="btn-container">
    <view class="start-btn" :class="{disabled: disabled}" @tap="handleStart">
      <text>开始生成</text>
      <text class="txt">消耗10</text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleStart() {
      if (!this.disabled) {
        this.$emit('start')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-container {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  height: 140rpx;
  padding-top: 20rpx;
  background: #fff;
  box-shadow: 0 0 6rpx rgba(0,0,0,.1);
}
.start-btn {
  width: 80%;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 10rpx;
  font-size: 28rpx;
  text-align: center;
  margin: 0 auto;
  position: relative;
  background: #5ac726;
  color: #fff;
  &.disabled {
    background: #EBEBEB;
    color: #A0A0A0;
  }
  .txt {
    font-size: 24rpx;
    position: absolute;
    right: 30rpx;
    top: 50%;
    transform: translate3d(0, -50%, 0);
  }
}

</style>