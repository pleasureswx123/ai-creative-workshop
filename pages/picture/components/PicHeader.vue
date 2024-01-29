<template>
  <view class="header-box">
    <view class="hd">{{title}}</view>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    }
  }
}
</script>

<style lang="scss" scoped>
.header-box {
  padding-bottom: 10rpx;
}
.hd {
  display: none;
  color: #000;
  text-align: center;
  font-size: 28rpx;
  padding: 60rpx 0;
}
</style>