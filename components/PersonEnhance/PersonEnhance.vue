<template>
  <view class="enhance-wrapper">
    <view class="title">细节改善：人物专用</view>
    <view class="enhance-box">
      <view
          class="item"
          v-for="item in options"
          :key="item.value"
          :class="{active: currentValue === item.value}"
          @tap="currentValue = item.value"
      >{{item.name}}</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      options: [
        {name: '脸部强化',value: 'face'},
        {name: '女人脸强化',value: 'girl-face'},
        {name: '男人脸强化',value: 'boy-face'},
        {name: '手部强化',value: 'hand'},
        {name: '眼睛强化',value: 'eyes'},
      ]
    }
  },
  computed: {
    currentValue: {
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
.enhance-wrapper {
  padding: 0 10rpx 10rpx;
  border-radius: 10rpx;
  background: #25262B;
  box-sizing: border-box;
  border: 2rpx solid #373A40;
  font-size: 24rpx;
  margin-bottom: 10rpx;
  .title {
    height: 60rpx;
    line-height: 60rpx;
  }
  .enhance-box {
    padding: 10rpx;
    border-radius: 6px;
    background: #141517;
    text-align: center;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: center;
    .item {
      min-width: 0;
      cursor: pointer;
      padding: 10rpx 0;
      border-radius: 6rpx;
      &.active {
        font-weight: bold;
        background: var(--red-color1);
      }
    }
  }
}
</style>