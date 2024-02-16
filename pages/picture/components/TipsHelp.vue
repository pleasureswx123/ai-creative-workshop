<template>
  <view class="tips-box">
    <uni-icons custom-prefix="iconfont-qm" type="icon-qm-tips" color="var(--txt-color2)" size="20" />
    <view>{{info.content}}</view>
    <view class="tips-img">
      <image mode="widthFix" :lazy-load="true" :src="info.img_url"></image>
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
  color: var(--txt-color2);
  font-size: 26rpx;
  border-radius: 20rpx;
  border: 1rpx solid var(--txt-color3);
  background: var(--bg-color2);
  position: relative;
  box-sizing: border-box;
  .icon-qm-tips {
    position: absolute;
    transform: translate3d(-50rpx, 2rpx, 0);
  }
  .tips-img {
    margin-top: 20rpx;
    /deep/ image {
      width: 100%;
      height: auto;
      border-radius: 10rpx;
    }
  }
}
@media screen and (min-width: 750px) {
  .tips-img {
    width: 320px;
  }
}
</style>