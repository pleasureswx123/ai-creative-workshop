<template>
  <page-meta page-style="background: var(--bg-color1)" />
  <view class="page-container">
    <view class="page-main">
      <slot></slot>
    </view>
    <view class="page-footer">
      <slot name="footer"></slot>
    </view>
  </view>
</template>

<script>

</script>

<style lang="scss" scoped>
.page-container {
  background: var(--bg-color1);
  height: 100vh;
  overflow: hidden;
  position: relative;
  .page-main {
    padding: 0 30rpx;
    height: calc(100vh - 140rpx);
    -webkit-overflow-scrolling: touch;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .page-footer {
    height: 140rpx;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
  }
}
</style>