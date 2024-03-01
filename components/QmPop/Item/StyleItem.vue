<template>
  <view class="item-box" :class="{active}" @tap="$emit('select', info)">
    <view class="pic-box">
      <image mode="aspectFit" :src="info.img_url"></image>
    </view>
    <view class="title">{{info.title}}</view>
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
    border-color: var(--red-color1);
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
  .title {
    color: #fff;
    font-size: 28rpx;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-align: center;
  }
}
</style>