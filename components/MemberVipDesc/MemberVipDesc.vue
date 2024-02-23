<template>
  <view class="mdesc-box">
    <image class="logo" src="@/static/images/index/logo.png" mode="aspectFit" />
    <view class="name">超级语言AI</view>
    <view class="vip-title-box">
      <view class="title-line">
        <view class="title-container">
          <view class="title">VIP会员权益</view>
        </view>
      </view>
    </view>
    <view class="vip-desc-box">
      <view class="vip-desc">
        <view class="info-row" v-for="(txt, index) in tips" :key="index">
          <uni-icons custom-prefix="iconfont-qm" type="icon-qm-good" color="#F0BB8B" size="15" />
          <view class="txt">{{txt}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tips: [
        '每月赠送算力额度',
        '服务器排队优先特权',
        '无限创作储存空间'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.mdesc-box {
  padding: 30rpx;
  .logo {
    display: block;
    width: 80rpx;
    height: 80rpx;
    margin: 0 auto 10rpx;
  }
  .name {
    text-align: center;
    font-size: 32rpx;
    line-height: 42rpx;
    background: linear-gradient(93deg, #F1CDAD 7%, #EEA25C 103%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
  }
}
.vip-title-box {
  padding: 0 60rpx;
  height: 100rpx;
  display: flex;
  align-items: center;
  .title-line {
    width: 100%;
    height: 0;
    border-bottom: 2rpx dashed #EFB681;
    position: relative;
    .title-container {
      padding: 0 20rpx;
      background-color: #0D0D0D;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
    .title {
      white-space: nowrap;
      font-size: 64rpx;
      font-weight: bold;
      background: linear-gradient(92deg, #F1CDAD 7%, #EEA25C 103%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
  }
}
.vip-desc-box {
  display: flex;
  align-items: center;
  justify-content: center;
}
.vip-desc {
  .info-row {
    display: flex;
    align-items: center;
    gap: 10rpx;
    font-size: 30rpx;
    line-height: 55rpx;
    .txt {
      color: #fff;
      background: linear-gradient(97deg, #F1CDAD 9%, #EEA25C 101%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
  }
}
</style>