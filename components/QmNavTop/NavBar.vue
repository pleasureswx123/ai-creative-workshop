<template>
  <view class="qm-nav-wrapper">
    <view class="qm-nav-box">
      <view class="lf" @tap="goHome">
        <image src="@/static/images/index/logo.png" mode="aspectFit" />
        <view class="title">首页</view>
      </view>
      <view class="menu-icon" @tap="$emit('update:value', true)">
        <u-icon name="list" color="rgba(255,255,255,.7)" size="40"></u-icon>
      </view>
    </view>
    <view class="qm-nav-box-place"></view>
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goHome() {
      uni.reLaunch({
        url: '/pages/index/index'
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.qm-nav-box, .qm-nav-box-place {
  padding: 0 0 0 30rpx;
  height: 80rpx;
  position: relative;
  overflow: hidden;
  background-color: #0D0D0D;
}
.qm-nav-box {
  border-bottom: 1rpx solid rgba(255,255,255,.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--bg-color1);
  z-index: 99;
  display: flex;
  align-items: center;
  gap: 30rpx;
  .lf {
    display: flex;
    align-items: center;
    gap: 10rpx;
    image {
      display: block;
      width: 60rpx;
      height: 58rpx;
    }
    .title {
      color: rgba(255,255,255,.7);
      font-size: 28rpx;
    }
  }
  .menu-icon {
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100rpx;
  }
  ///deep/.u-icon__icon{
  //  font-size: 28px!important;
  //  line-height: 28px!important;
  //  color: rgba(255,255,255,.7)!important;
  //}
}
</style>