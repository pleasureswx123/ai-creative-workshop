<template>
  <view class="nav-top-bar-container">
    <view class="nav-top-bar">
      <navMenu></navMenu>
    </view>
    <view class="nav-top-place"></view>
  </view>
</template>

<script>
import navMenu from "../navMeun";

export default {
  components: {
    navMenu
  }
}
</script>

<style lang="scss" scoped>
.nav-top-bar-container {
  background: #000;
  border-bottom: 1rpx solid rgba(255,255,255,.1);
  .nav-top-bar, .nav-top-place {
    height: 80rpx;
  }
  .nav-top-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: var(--bg-color1);
    z-index: 99;
  }
}
</style>