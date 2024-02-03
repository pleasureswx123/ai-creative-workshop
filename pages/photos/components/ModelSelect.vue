<template>
  <BoxLayout title="模型选择">
    <view class="mode-box" @tap="$emit('showPopFunc')">
      <image :src="info.img_url" mode="aspectFill"></image>
      <view class="info">
        <view class="title">{{info.title}}</view>
        <view class="content">{{info.content}}</view>
      </view>
      <uni-icons custom-prefix="iconfont-qm" type="icon-qm-arrow-right" color="#ff0000" size="14" />
    </view>
  </BoxLayout>
</template>

<script>
import BoxLayout from "./BoxLayout.vue";
export default {
  props: {
    info: {
      type: Object,
      default: () => ({
        // model_style_id: 24,
        // title: 'sushi厚涂',
        // img_url: 'https://aigc.chaojiyuyan.cn/upload/app/draw/CCA17B08DA-darkSushiMixMix_225D-scale-0_50x.jpg',
        // content: '基于sD15训练或微调的各种大模型，对各种画风lora的兼容表现更好兼顾出图质量和速度。',
      })
    }
  },
  components: {BoxLayout},
}
</script>

<style lang="scss" scoped>
.mode-box {
  display: flex;
  align-items: center;
  gap: 30rpx;
  background: #23242C;
  height: 160rpx;
  padding-right: 20rpx;
  border-radius: 20rpx;
  overflow: hidden;
  image {
    width: 150rpx;
    height: 100%;
    display: block;
  }
  .info {
    flex: 1;
    min-width: 0;
    .title {
      font-size: 28rpx;
      color: #fff;
      padding-bottom: 16rpx;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .content {
      color: rgba(255,255,255,.5);
      font-size: 24rpx;
      line-height: 1.6;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
}
</style>