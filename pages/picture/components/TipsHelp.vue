<template>
  <view class="tips-box">
    <uni-icons custom-prefix="iconfont-qm" type="icon-qm-tips" color="#909399" size="20" />
    <view>{{info.content}}</view>
    <view class="tips-img">
      <image :src="info.img_url"></image>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style lang="scss" scoped>
.tips-box {
  margin-top: 48rpx;
  padding: 40rpx 80rpx;
  color: #000;
  font-size: 26rpx;
  border-radius: 20rpx;
  border: 1rpx solid #EFEFEF;
  background: #F5F7FA;
  .icon-qm-tips {
    position: absolute;
    transform: translate3d(-50rpx, 2rpx, 0);
  }
  .tips-img {
    margin-top: 20rpx;
    aspect-ratio: 4 / 3;
    /deep/ image {
      width: 100%;
      height: 100%;
      border-radius: 10rpx;
    }
  }
}
</style>