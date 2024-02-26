<template>
  <view class="tool-box">
    <view
        class="item"
        v-for="item in tools"
        :key="item.type"
        :class="{active: actionType === item.type}"
        @tap="actionType = item.type">
      <uni-icons custom-prefix="iconfont-qm" :type="item.iconName" color="#fff" size="20" />
      <view v-if="item.name">{{item.name}}</view>
    </view>
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
      tools: [
        {name: '', type: 'undo', iconName: 'icon-qm-undo'},
        {name: '', type: 'reset', iconName: 'icon-qm-sync'},
        {name: '橡皮擦', type: 'eraser', iconName: 'icon-qm-eraser'},
        {name: '笔刷', type: 'brush', iconName: 'icon-qm-brush7'},
        {name: '移动图片', type: 'hand', iconName: 'icon-qm-hand2'},
      ]
    }
  },
  computed: {
    actionType: {
      get() {
        return this.value
      },
      set(action) {
        this.$emit('update:value', action)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tool-box {
  border-radius: 10rpx;
  background: #25262B;
  padding: 10rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10rpx;
  margin-bottom: 30rpx;
  .item {
    border-radius: 5px;
    height: 70rpx;
    background: #1A1B1E;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 19rpx;
    gap: 10rpx;
    cursor: pointer;
    &.active {
      background: #1971C2;
    }
  }
}
</style>