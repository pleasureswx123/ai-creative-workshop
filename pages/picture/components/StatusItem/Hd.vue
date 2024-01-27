<template>
  <view class="hd">
    <view class="title">{{info.task_type_title}}</view>
    <view class="btn" @tap.stop>
      <u-button :disabled="disabled" type="info" size="small" @tap="$emit('cb')" :text="btnTxt" />
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
      return +this.info.task_type === 2 ? '播放' : '图像处理';
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
    color: #000;
    font-size: torpx(16);
    flex: 1;
    min-width: 0;
  }
  .btn {
    font-size: 60rpx;
    //font-size: torpx(14);
    //border: 1px solid rgba(0,0,0,1);
    //color: rgba(0,0,0,1);
    //border-radius: torpx(4);
    //padding: 3rpx 15rpx;
  }
}
</style>