<template>
  <view class="generating-wrapper">
    <view class="generating-inner">
      <view class="generating-box">
        <view>
          <view class="icon-box">
            <uni-icons custom-prefix="iconfont-qm" type="icon-qm-loading-1" color="var(--txt-color4)" size="50" />
          </view>
          <view>等待生成...</view>
          <view v-if="tips" class="tips-txt">{{tips}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState('PictureInfo', ['taskDetail']),
    tips() {
      return this.taskDetail?.tip || ''
    },
  }
}
</script>

<style lang="scss" scoped>
.generating-wrapper {
  width: 100%;
  border-radius: 6rpx;
  margin-bottom: 16rpx;
  position: relative;
  overflow: hidden;
  border: 1px dashed var(--txt-color3);
  background: var(--bg-color2);
  box-sizing: border-box;
  padding: 30rpx;
  .generating-inner {
    background: var(--bg-color2);
    aspect-ratio: 16 / 9;
    position: relative;
    overflow: hidden;
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.generating-box {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--txt-color2);
  font-size: 28rpx;
  background: var(--txt-color7);
  .icon-box {
    width: 100%;
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .iconfont-qm {
    animation: rotate 1s linear infinite;
  }
  .tips-txt {
    padding: 40rpx 30rpx 0;
  }
}
</style>