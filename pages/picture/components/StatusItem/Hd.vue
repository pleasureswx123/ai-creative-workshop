<template>
  <view class="hd">
    <view class="title">{{info.task_type_title}}</view>
    <view @tap.stop>
      <view class="btn-box" :class="{disabled}" @tap="handleCb"><text>{{btnTxt}}</text></view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    btnTxt() {
      return this.isVideoTaskType(+this.info.task_type) ? '查看详情' : '图像处理';
    }
  },
  methods: {
    handleCb() {
      if(!this.disabled) {
        this.$emit('cb');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.hd {
  display: flex;
  align-items: center;
  height: 80rpx;
  padding: 0 30rpx;
  .title {
    color: var(--txt-color1);
    font-size: 26rpx;
    flex: 1;
    min-width: 0;
    font-weight: bold;
  }
  .btn-box {
    background: var(--bg-color3);
    color: var(--txt-color4);
    font-size: 24rpx;
    line-height: 1;
    padding: 8rpx 24rpx;
    border-radius: 20rpx;
    cursor: pointer;
    &.disabled {
      opacity: .5;
    }
  }
}
</style>