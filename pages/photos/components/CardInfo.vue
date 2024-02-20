<template>
  <view class="slide-container">
    <view class="img-box">
      <image mode="aspectFit" :src="info.url || info.img_url"></image>
    </view>
    <view class="info-box">
      <view class="info-hd">
        <view class="title">{{info.title}}</view>
        <u-icon class="pointer" name="trash" size="30rpx" color="rgba(255,255,255,.5)" @tap="$emit('cb')"></u-icon>
      </view>
      <view>
        <slot></slot>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
}
</script>

<style lang="scss" scoped>
.slide-container {
  margin-top: 20rpx;
  background-color: #23242C;
  display: flex;
  height: 160rpx;
  align-items: center;
  padding: 20rpx;
  box-sizing: border-box;
  border-radius: 10rpx;
  gap: 20rpx;
  .img-box {
    height: 120rpx;
    width: 120rpx;
    image {
      background-color: #000;
      width: 100%;
      height: 100%;
      display: block;
      border-radius: 10rpx;
    }
  }
  .info-box {
    flex: 1;
    min-width: 0;
  }
  .info-hd {
    display: flex;
    align-items: center;
    gap: 20rpx;
    font-size: 28rpx;
    color: #fff;
    .title {
      flex: 1;
      min-width: 0;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>