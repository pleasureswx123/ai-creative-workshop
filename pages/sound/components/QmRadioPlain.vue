<template>
  <view class="radio-container">
    <view class="item" v-for="(item, index) in list" :key="`${index}-${item.value}`" :class="{active: currentVal === item.value}"
          @tap="currentVal = item.value"
          >{{item.label}}</view>
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      list: [
        { label: '能用男声', value: '1'},
        { label: '解说小帅', value: '2'},
        { label: '沉稳男声', value: '3'},
        { label: '通用女声', value: '4'},
        { label: '解说小美', value: '5'},
        { label: '文艺女声', value: '6'},
      ]
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