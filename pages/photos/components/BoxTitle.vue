<template>
  <view class="title-box">
    <view class="title">{{title}}</view>
    <slot></slot>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    }
  }
}
</script>

<style lang="scss" scoped>
.title-box {
  display: flex;
  align-items: center;
  gap: 20rpx;
  .title {
    flex: 1;
    min-width: 0;
    color: var(--txt-color1);
    font-size: 28rpx;
    line-height: 70rpx;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>