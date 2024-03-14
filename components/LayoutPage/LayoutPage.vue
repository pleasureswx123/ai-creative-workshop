<template>
  <view class="page-container">
    <QmNavTop></QmNavTop>
    <slot></slot>
  </view>
</template>

<script>

</script>

<style lang="scss" scoped>
.page-container {
  background: var(--bg-color1);
  padding: 30rpx 20rpx calc(160rpx + constant(safe-area-inset-bottom));
  padding: 30rpx 20rpx calc(160rpx + env(safe-area-inset-bottom));
  font-size: 28rpx;
  color: #fff;
}
</style>