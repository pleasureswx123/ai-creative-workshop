<template>
  <view class="ft">
    <view class="title" v-if="info.prompt">{{info.prompt}}</view>
    <u-gap v-else height="30" bgColor="#fff"></u-gap>
    <view class="info">{{info.model_style_name}}</view>
    <view class="info">{{info.lora_name}}</view>
    <view class="info">{{info.controlnet_type}}</view>
    <view class="info">{{info.scale}}</view>
    <view class="info">生成时间{{info.create_time}}</view>
    <view class="info">{{info.jifen_consume}}</view>
<!--    <view class="info">opacity: 0.5;</view>-->
  </view>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
.ft {
  padding: 0 30rpx 10rpx;
  .title {
    font-size: 24rpx;
    padding: 20rpx 0;
    line-height: 1.8;
    border-bottom: 1rpx solid rgba(0,0,0,.05);
    margin-bottom: 30rpx;
  }
  .info {
    display: inline-block;
    margin: 0 15rpx 15rpx 0;
    color: rgba(0,0,0,.5);
  }
}
</style>