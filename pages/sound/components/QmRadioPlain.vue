<template>
  <view class="radio-container">
    <view class="item" v-for="(item, index) in list" :key="`${index}-${item.id}`" :class="{active: currentVal === item.id}"
          @tap="currentVal = item.id"
          >{{item.name}}</view>
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    list: {
      type: Array,
      required: true
    }
  },
  computed: {
    currentVal: {
      get() {
        return this.value || ''
      },
      set(val) {
        this.$emit('update:value', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.radio-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20rpx;
  .item {
    min-width: 0;
    color: #bbb;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 72rpx;
    border-radius: 16rpx;
    border: 1px solid #B9B9B9;
    background: #fdfdfd;
    font-size: 28rpx;
    &.active {
      background: #fff;
      border-color: #545454;
      color: #606060;
    }
  }
}
</style>