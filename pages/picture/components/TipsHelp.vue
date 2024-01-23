<template>
  <view class="tips-box">
    <uni-icons custom-prefix="iconfont-qm" type="icon-qm-tips" color="#909399" size="20" />
    <view>将"源图片"中的脸部特征识别出来，替换到"目标图片"的人物脸上，达到换脸的效果。</view>
    <view class="tips-img" v-if="$slots.default">
      <slot></slot>
    </view>
  </view>
</template>

<script>
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