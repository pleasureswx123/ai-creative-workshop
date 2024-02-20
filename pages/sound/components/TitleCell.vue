<template>
  <view class="cell-box">
    <view>{{title}}</view>
    <view class="rt" v-if="$slots.right">
      <slot name="right"></slot>
    </view>
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
.cell-box {
  font-size: 28rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  color: var(--txt-color1);
  .rt {
    font-size: 24rpx;
    margin-left: auto;
    display: flex;
    align-items: center;
    color: var(--txt-color2);
    cursor: pointer;
  }
}
</style>