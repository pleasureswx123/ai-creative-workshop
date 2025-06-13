<template>
  <view class="tabs-container" v-if="list.length">
    <scroll-view class="tabs-inner-box" scroll-x="true">
      <view
          v-for="item in list"
          :key="item.id"
          class="item"
          :class="{active: currentValue === item.id, highlight: item.highlight}"
          @tap="currentValue = item.id"
      >
        <text>{{item.name}}</text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
      default: '100'
    },
    list: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    currentValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('update:value', value);
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.tabs-container {
  width: 100%;
  height: 90rpx;
  overflow: hidden;
}
.tabs-inner-box {
  white-space: nowrap;
  width: 100%;
  height: 90rpx;
  .item {
    display: inline-block;
    padding: 0 14rpx;
    margin: 0 6rpx;
    height: 90rpx;
    line-height: 90rpx;
    color: #606266;
    font-size: 28rpx;
    position: relative;
    cursor: pointer;
    &.active {
      font-size: 30rpx;
      color: var(--red-color1);
      font-weight: bold;
      &:after {
        content: '';
        display: block;
        position: absolute;
        width: 20%;
        height: 2rpx;
        background: var(--red-color1);
        bottom: 12rpx;
        left: 50%;
        transform: translate3d(-50%, 0, 0);
      }
    }
    &.highlight {
      background: var(--red-color1);
      color: #fff;
      border-radius: 0 30rpx 0 30rpx;
    }
    .flag {
      display: none;
      position: absolute;
      top: 8rpx;
      right: 0;
      background: var(--red-color1);
      font-size: 16rpx;
      line-height: 16rpx;
      padding: 4rpx 8rpx;
      color: #fff;
      border-radius: 20rpx;
      &.show {
        display: block;
      }
    }
  }
}
</style>