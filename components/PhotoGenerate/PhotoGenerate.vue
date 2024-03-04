<template>
  <view class="photo-generate-wrapper">
    <view>
      <view class="icon-box">
        <uni-icons custom-prefix="iconfont-qm" type="icon-qm-loading-1" color="var(--txt-color4)" size="50" />
      </view>
      <view>等待生成...</view>
      <view v-if="tips" class="tips-txt">{{tips}}</view>
    </view>
  </view>
</template>

<script>
export default {
  computed: {
    tips() {
      return '用户平均等待1分钟，你可放心离开本页，稍后去“我的创作”中查看结果'
    },
  }
}
</script>

<style lang="scss" scoped>
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.photo-generate-wrapper {
  border-radius: 20rpx;
  background: #1F2937;
  box-sizing: border-box;
  border: 2rpx solid #494C55;
  padding: 4rpx;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--txt-color2);
  font-size: 28rpx;
  margin-bottom: 30rpx;
  .icon-box {
    width: 100%;
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .iconfont-qm {
    animation: rotate 1s linear infinite;
  }
  .tips-txt {
    padding: 40rpx 30rpx 0;
  }
}
</style>