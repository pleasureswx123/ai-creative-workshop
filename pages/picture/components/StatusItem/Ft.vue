<template>
  <view class="ft">
    <template v-if="info.prompt">
      <view class="title">{{info.prompt}}</view>
      <view class="btsolid"></view>
    </template>
    <u-gap v-else height="30" ></u-gap>
    <view class="info" v-if="info.model_style_name">{{info.model_style_name}}</view>
    <view class="info" v-if="info.lora_name">{{info.lora_name}}</view>
    <view class="info" v-if="info.controlnet_type">{{info.controlnet_type}}</view>
    <view class="info" v-if="info.scale">{{info.scale}}</view>
    <view class="info" v-if="info.create_time">生成时间: {{info.create_time}}</view>
    <view class="info" v-if="info.jifen_consume">{{info.jifen_consume}}</view>
    <view class="info" v-if="info.task_id">任务ID: {{info.task_id}}</view>
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
  padding: 20rpx 30rpx 10rpx;
  color: var(--txt-color1);
  font-size: 26rpx;
  .title {
    color: var(--txt-color1);
    font-size: 28rpx;
    line-height: 1.8;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .btsolid {
    margin: 20rpx 0;
    height: 2rpx;
    border-top: 1rpx solid var(--txt-color3);
  }
  .info {
    display: inline-block;
    margin: 0 15rpx 15rpx 0;
    color: var(--txt-color2);
  }
}
</style>