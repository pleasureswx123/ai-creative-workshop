<template>
  <view class="box-container">
    <BoxTitle :title="title">
      <slot name="HdRight"></slot>
    </BoxTitle>
    <view class="box-content">
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
  padding: 0 30rpx;
  margin-bottom: 20rpx;
  .box-content {
  }
}
</style>