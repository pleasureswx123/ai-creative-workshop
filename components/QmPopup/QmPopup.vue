<template>
  <u-popup
      :show="show"
      mode="bottom"
      @close="$emit('close')"
      overlayStyle="background: #000"
      :round="round"
      :safeAreaInsetBottom="safeAreaInsetBottom">
    <view class="pop-container">
      <view class="pop-body-container">
        <view class="top-bar">
          <text class="title">{{title}}</text>
          <view class="close-box">
            <icon @tap="$emit('close')" color="var(--txt-color1)" type="cancel" size="30" />
          </view>
        </view>
        <slot name="tips"></slot>
        <view class="pop-main-content">
          <slot></slot>
        </view>
        <view class="footer-bar">
          <view class="btn-box" @tap="$emit('confirm')">确 定</view>
        </view>
      </view>
    </view>
  </u-popup>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '标题'
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    },
    round: {
      type: [Boolean, String, Number],
      default: 8
    }
  }
}
</script>

<style lang="scss" scoped>
.pop-container {
  background: var(--bg-color1);
  color: var(--txt-color1);
  font-size: 28rpx;
  height: 100vh;
  position: relative;
  overflow: hidden;
  .pop-body-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    .pop-main-content {
      padding: 0 30rpx;
      flex: 1;
      min-height: 0;
      overflow: hidden;
      position: relative;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
  }
  .top-bar {
    height: 150rpx;
    color: #fff;
    font-size: 32rpx;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    padding: 0 100rpx;
    border-bottom: 1px solid rgba(255,255,255,.1);
    .close-box {
      position: absolute;
      top: 50%;
      right: 40rpx;
      display: grid;
      place-items: center;
      background: rgba(0,0,0,.5);
      width: 60rpx;
      height: 60rpx;
      border-radius: 50%;
      transform: translate3d(0, -50%, 0);
    }
  }
  .footer-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 30rpx;
    height: 150rpx;
    box-sizing: border-box;
    display: grid;
    place-items: center;
    z-index: 100;
    .btn-box {
      width: 80%;
      background: red;
      margin: 0 auto;
      height: 80rpx;
      border-radius: 80rpx;
      text-align: center;
      line-height: 80rpx;
      position: relative;
      font-size: 28rpx;
      font-weight: bold;
    }
  }
}
@supports (-webkit-touch-callout: none) {
  .pop-container {
    height: 100dvh;
  }
}
</style>