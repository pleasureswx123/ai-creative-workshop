<template>
  <view class="radio-container">
    <view class="item" v-for="(item, index) in list" :key="index" :class="{active: currentVal === item.id}"
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
    cursor: pointer;
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 72rpx;
    border-radius: 16rpx;
    border: 1px dashed var(--txt-color3);
    background: var(--bg-color2);
    color: var(--txt-color2);
    font-size: 28rpx;
    &.active {
      border-color: red;
      //background: var(--bg-color1);
      color: var(--txt-color1);
    }
  }
}
@media screen and (min-width: 750px) {
  .radio-container {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>