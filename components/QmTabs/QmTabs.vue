<template>
  <view class="tabs-wrapper">
    <view
        v-for="item in options"
        :key="item.id"
        class="tabs-item"
        :class="{active: value === item.id}"
        @tap="$emit('update:value', item.id)">{{item.title || item.name}}</view>
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    options: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs-wrapper {
  padding: 30rpx 30rpx;
  display: flex;
  .tabs-item {
    height: 80rpx;
    flex: 1;
    min-width: 0;
    text-align: center;
    line-height: 80rpx;
    background: #34363f;
    color: #9a9ba0;
    border: 2rpx solid #606060;
    border-left: none;
    font-size: 28rpx;
    cursor: pointer;
    &:first-child {
      border-left: 2rpx solid #606060;
      border-radius: 70rpx 0 0 70rpx;
    }
    &:last-child {
      border-radius: 0 70rpx 70rpx 0;
    }
    &.active {
      border-color: var(--red-color1);
      background: var(--red-color1);
      color: #fff;
      font-weight: bold;
    }
  }
}
</style>