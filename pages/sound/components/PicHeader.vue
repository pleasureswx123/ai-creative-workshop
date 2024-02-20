<template>
  <view class="hd">{{title}}</view>
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
.hd {
  color: var(--txt-color2);
  text-align: center;
  font-size: 28rpx;
  padding: 60rpx 0;
}
</style>