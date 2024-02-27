<template>
  <view class="tabs-box">
    <view
        class="item"
        v-for="item in options"
        :key="item.value"
        :class="{active: current === item.value}"
        @tap="current = item.value">
      {{item.name}}
    </view>
  </view>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => ([
        {name: '', value: ''}
      ])
    },
    value: {
      type: [String, Number],
      default: ''
    }
  },
  computed: {
    current: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('update:value', val)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.tabs-box {
  display: flex;
  align-items: center;
  gap: 8rpx;
  margin-bottom: 30rpx;
  .item {
    flex: 1;
    min-width: 0;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 8rpx;
    background: rgba(127, 134, 145, .3);
    text-align: center;
    font-size: 28rpx;
    font-weight: bold;
    cursor: pointer;
    &.active {
      background: var(--red-color1);
    }
  }
}
</style>