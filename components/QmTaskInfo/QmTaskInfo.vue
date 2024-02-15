<template>
  <view class="ft">
    <template v-if="info.prompt">
      <view class="title">{{info.prompt}}</view>
      <view class="space-place"></view>
    </template>
    <view class="ft-con">
      <text v-if="info.task_name">{{info.task_name}}</text>
      <text v-if="info.model_style_name">{{info.model_style_name}}</text>
      <text v-if="info.lora_name">{{info.lora_name}}</text>
      <text v-if="info.controlnet_type">{{info.controlnet_type}}</text>
      <text v-if="info.img_style_name">{{info.img_style_name}}</text>
      <text v-if="info.scale">{{info.scale}}</text>
      <text v-if="info.jifen_consume">{{info.jifen_consume}}</text>
      <text v-if="info.create_time">生成时间 {{info.create_time}}</text>
      <text v-if="info.task_id">任务ID {{info.task_id}}</text>
    </view>
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
  font-size: 24rpx;
  line-height: 1.6;
  padding: 20rpx 30rpx;
  //background: linear-gradient(to right, #ff5500, #ffd200);
  .title {
    color: var(--txt-color1);
  
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
  
  
    //background: linear-gradient(to bottom, rgba(255,255,255,.9), rgba(255,255,255,.7));
    //-webkit-background-clip: text;
    //-webkit-text-fill-color: transparent;
  
  }
  .space-place {
    margin-top: 10rpx;
    height: 10rpx;
    border-top: 1rpx solid rgba(255,255,255,.2);
  }
  .ft-con {
    color: var(--txt-color2);
  
    //background: linear-gradient(to bottom, rgba(255,255,255,.7), rgba(255,255,255,.4));
    //-webkit-background-clip: text;
    //-webkit-text-fill-color: transparent;
    text {
      padding-right: 20rpx;
      display: inline-block;
    }
  }
}
</style>