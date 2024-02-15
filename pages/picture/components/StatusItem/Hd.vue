<template>
  <view class="hd">
    <view class="title">{{info.task_type_title}}</view>
    <view @tap.stop>
      <u-button class="btn" :disabled="disabled" type="info" size="mini" @tap="$emit('cb')" :text="btnTxt" />
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
    font-size: 28rpx;
    flex: 1;
    min-width: 0;
  }
  .btn {
    //color: var(--txt-color2);
    //background-color: var(--bg-color2);
    background: var(--bg-color3);
    color: var(--txt-color4);
    font-size: 24rpx;
    border: 1px solid var(--txt-color3);
    //font-size: torpx(14);
    //border: 1px solid rgba(0,0,0,1);
    //color: rgba(0,0,0,1);
    //border-radius: torpx(4);
    //padding: 3rpx 15rpx;
    /deep/ .u-button__text {
      font-size: 24rpx!important;
    }
  }
}
</style>