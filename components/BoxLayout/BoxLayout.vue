<template>
  <view class="box-container">
    <BoxTitle :title="title">
      <slot name="HdRight"></slot>
    </BoxTitle>
    <view>
      <slot></slot>
    </view>
  </view>
</template>

<script>
import BoxTitle from "./BoxTitle.vue";
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    }
  },
  components: {BoxTitle},
}
</script>

<style lang="scss" scoped>
.box-container {
  background: #25262B;
  box-sizing: border-box;
  border: 2rpx solid #373A40;
  padding: 0 30rpx 30rpx;
  border-radius: 10rpx;
  margin-bottom: 30rpx;
  color: #fff;
  font-size: 28rpx;
}
</style>