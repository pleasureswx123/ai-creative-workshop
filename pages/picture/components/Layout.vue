<template>
  <page-meta page-style="background: var(--bg-color1)" />
  <view class="page-container">
    <QmNavTop></QmNavTop>
    <view class="page-main">
      <view style="min-height: 150%">
        <slot></slot>
      </view>
    </view>
    <view class="page-footer">
      <slot name="footer"></slot>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.page-container {
  background: var(--bg-color1);
  min-height: 100vh;
  .page-main {
    padding: 0 30rpx 400rpx;
    //-webkit-overflow-scrolling: touch;
    //overflow-x: hidden;
    //overflow-y: auto;
  }
  .page-footer {
    height: 140rpx;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    z-index: 1;
  }
}
</style>