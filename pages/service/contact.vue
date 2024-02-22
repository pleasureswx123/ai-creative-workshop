<template>
  <view class="page-container">
    <QmNavTop></QmNavTop>
    <view class="code">
      <image src="@/static/images/code.png" mode="aspectFit"></image>
      <view>请使用微信扫一扫</view>
    </view>
  </view>

</template>

<script>
</script>

<style lang="scss" scoped>
.page-container {
  background: #0D0D0D;
  font-size: 24rpx;
  padding: 30rpx 30rpx 300rpx;
}
.code {
  font-size: 28rpx;
  text-align: center;
  padding: 30rpx 0;
  margin: 50rpx 30rpx 0;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  color: #B2B2B2;
  image {
    margin: 0 auto;
  }
}
</style>