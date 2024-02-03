<template>
  <view class="tabs-box">
    <view class="item" :class="{active: current === item.id}"
          @tap="changeId(item)"
          v-for="item in tabs" :key="item.id">{{item.title}}</view>
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: [Number, String],
      default: 0
    },
    tabs: {
      type: Array,
      default: () => ([
        {id: 1, title: '模型1'},
        {id: 2, title: '模型2'},
        {id: 3, title: '模型3'},
      ])
    }
  },
  computed: {
    current: {
      get() {
        return this.value || '';
      },
      set(val) {
        this.$emit('update:value', val);
      }
    }
  },
  methods: {
    changeId({id}) {
      this.current = id;
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs-box {
  margin: 0 30rpx 20rpx;
  display: flex;
  align-items: center;
  color: var(--txt-color2);
  font-size: 28rpx;
  position: relative;
  overflow: hidden;
  .item {
    border-top: 2rpx solid #606060;
    border-right: 2rpx solid #606060;
    border-bottom: 2rpx solid #606060;
    height: 100%;
    line-height: 75rpx;
    background: var(--bg-color2);
    flex: 1;
    min-width: 0;
    text-align: center;
    &:first-child {
      border-left: 2rpx solid #606060;
      border-radius: 80rpx 0 0 80rpx;
    }
    &:last-child {
      border-radius: 0 80rpx 80rpx 0;
    }
    &.active {
      background: #ff0000;
      color: #fff;
      border-color: #ff0000;
    }
  }
}
</style>