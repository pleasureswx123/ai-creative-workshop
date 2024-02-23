<template>
  <view class="item-box" :class="{active}" @tap="$emit('select', info)">
    <view class="pic-box">
      <image mode="aspectFit" :src="info.img_url"></image>
    </view>
    <view class="txt-box">
      <view class="title">{{info.title}}</view>
      <view class="content">{{info.content}}</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => ({})
    },
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.item-box {
  border: 1px solid #000;
  border-radius: 20rpx;
  background-color: #23242C;
  padding-bottom: 20rpx;
  position: relative;
  overflow: hidden;
  &.active {
    border-color: #ff0000;
  }
  .pic-box {
    width: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    position: relative;
    margin-bottom: 20rpx;
    border-radius: 20rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .txt-box {
    padding: 0 10rpx;
  }
  .title {
    color: #fff;
    font-size: 28rpx;
    line-height: 1.5;
    max-width: 100%;
  
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .content {
    padding-top: 10rpx;
    color: #909193;
    font-size: 24rpx;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>