<template>
  <view class="ft">
    <view class="title" v-if="info.prompt">{{info.prompt}}</view>
    <u-gap v-else height="30"></u-gap>
    <view class="info" v-if="info.model_style_name">{{info.model_style_name}}</view>
    <view class="info" v-if="info.lora_name">{{info.lora_name}}</view>
    <view class="info" v-if="info.controlnet_type">{{info.controlnet_type}}</view>
    <view class="info" v-if="info.scale">{{info.scale}}</view>
    <view class="info" v-if="info.create_time">生成时间 {{info.create_time}}</view>
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
  color: var(--txt-color1);
  .title {
    color: var(--txt-color1);
    font-size: 24rpx;
    padding: 20rpx 0;
    line-height: 1.8;
    border-bottom: 1rpx solid var(--txt-color3);
    margin-bottom: 30rpx;
  }
  .info {
    display: inline-block;
    margin: 0 15rpx 15rpx 0;
    color: var(--txt-color2);
  }
}
</style>