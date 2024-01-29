<template>
  <view class="hd">
    <view class="title">{{info.task_type_title}}</view>
    <view @tap.stop>
      <u-button class="btn" :disabled="disabled" type="info" size="small" @tap="$emit('cb')" :text="btnTxt" />
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
    color: var(--txt-color1);
    font-size: 28rpx;
    flex: 1;
    min-width: 0;
  }
  .btn {
    color: var(--txt-color2);
    background-color: var(--bg-color2);
    font-size: 60rpx;
    border: 1px solid var(--txt-color3);
    //font-size: torpx(14);
    //border: 1px solid rgba(0,0,0,1);
    //color: rgba(0,0,0,1);
    //border-radius: torpx(4);
    //padding: 3rpx 15rpx;
  }
}
</style>