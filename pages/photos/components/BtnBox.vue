<template>
  <view class="btn-box" @tap="$emit('cb')">
    <view class="btn-txt">
      <uni-icons custom-prefix="iconfont-qm" type="icon-qm-plus" color="var(--txt-color1)" size="22" />
      <view>{{txt}}</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    txt: {
      type: String,
      default: '按钮'
    }
  },
}
</script>

<style lang="scss" scoped>
.btn-box {
  color: #fff;
  background: #23242C;
  border-radius: 10rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80rpx;
  cursor: pointer;
  .btn-txt {
    display: flex;
    align-items: center;
    gap: 6rpx;
    font-size: 28rpx;
    line-height: 1;
  }
}
</style>