<template>
  <view class="hd">
    <view class="title">{{info.task_type_title}}</view>
    <view class="rt-hd" @tap.stop>
      <uni-icons @tap="handleDel" custom-prefix="iconfont-qm" type="icon-qm-del" color="rgba(255,255,255,.7)" size="20" />
      <view class="btn-box" :class="{disabled}" @tap="handleCb"><text>{{btnTxt}}</text></view>
    </view>
  </view>
</template>

<script>
export default {
  inject: ['handleDelTask'],
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
      return this.isVideoTaskType(this.info) ? '查看详情' : '图像处理';
    }
  },
  methods: {
    handleCb() {
      if(!this.disabled) {
        this.$emit('cb');
      }
    },
    handleDel() {
      // if(!this.disabled) {
      // task_id
      this.handleDelTask(this.info || {})
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.hd {
  display: flex;
  align-items: center;
  height: 80rpx;
  padding: 0 20rpx;
  .title {
    color: var(--txt-color1);
    font-size: 28rpx;
    flex: 1;
    min-width: 0;
    font-weight: bold;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .rt-hd {
    display: flex;
    align-items: center;
    gap: 10rpx;
    & > * {
      cursor: pointer;
    }
  }
  .btn-box {
    background: var(--red-color1);
    color: var(--txt-color4);
    font-size: 24rpx;
    line-height: 1;
    padding: 8rpx 15rpx;
    border-radius: 10rpx;
    &.disabled {
      opacity: .5;
    }
  }
}
</style>