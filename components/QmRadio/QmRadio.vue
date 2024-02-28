<template>
  <view class="radio-box">
    <view
        v-for="item in options"
        :key="item.value"
        class="item"
        :class="{active: item.value === currentVal}"
        @tap="currentVal = item.value"
      >{{item.label}}</view>
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    currentVal: {
      get() {
        return `${this.value || ''}`
      },
      set(value) {
        this.$emit('update:value', `${value}`);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.radio-box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30rpx;
  .item {
    background-color: #23242C;
    border-radius: 20rpx;
    border: 1px solid #23242C;
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    color: rgba(255,255,255,.5);
    font-size: 28rpx;
    &.active {
      color: #fff;
      border-color: var(--red-color1);
    }
  }
}
</style>