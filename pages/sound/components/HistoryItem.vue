<template>
  <view class="container">
    <view class="date">{{info.create_time}}</view>
    <view class="content">{{info.content}}</view>
    <view class="voice-container">
      <uni-icons custom-prefix="iconfont-qm" type="icon-qm-speaker1" color="var(--txt-color2)" size="20" />
      <view class="wave-box">
        <uni-icons custom-prefix="iconfont-qm" type="icon-qm-soundwave" color="var(--txt-color2)" size="20" />
        <uni-icons class="ml-5" custom-prefix="iconfont-qm" type="icon-qm-soundwave" color="var(--txt-color2)" size="18" />
        <uni-icons class="ml-5" custom-prefix="iconfont-qm" type="icon-qm-soundwave" color="var(--txt-color2)" size="20" />
      </view>
      <view class="duration">{{info.dub_duration}}</view>
      <uni-icons @tap="playAudio" class="pointer" custom-prefix="iconfont-qm" type="icon-qm-play1" color="var(--txt-color1)" size="22" />
      <uni-icons @tap="downloadAudio" class="pointer" custom-prefix="iconfont-qm" type="icon-qm-download11" color="var(--txt-color1)" size="22" />
    </view>
  </view>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  methods: {
    getDuration() {
      if (!this.audioContext) {
        this.audioContext = uni.createInnerAudioContext();
        this.audioContext.src = this.audioUrl;
        this.audioContext.onCanplay(() => {
          const seconds = (this.audioContext?.duration || 0).toFixed(2);
          this.duration = `${seconds} 秒`
        });
      }
    },
    downloadAudio() {
      this.downLoadFile(this.info.dub_url);
    },
    playAudio() {
      this.$emit('playAudio', this.info)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: var(--bg-color2);
  padding: 20rpx 50rpx 30rpx;
  //border-top: 1rpx solid var(--txt-color2);
  //border-bottom: 1rpx solid var(--txt-color2);
  box-shadow: 0 0 5rpx var(--txt-color2);
}
.date {
  color: var(--txt-color1);
  font-size: 28rpx;
  padding-bottom: 20rpx;
}
.content {
  color: var(--txt-color2);
  font-size: 28rpx;
  padding-bottom: 40rpx;
}
.voice-container {
  height: 85rpx;
  border-radius: 100rpx;
  border: 1rpx solid var(--txt-color3);
  background: var(--txt-color7);
  display: flex;
  align-items: center;
  padding: 0 40rpx;
  gap: 20rpx;
  .wave-box {
    display: flex;
    align-items: center;
    transform: translate3d(-20rpx, 0, 0);
    .ml-5 {
      margin-left: -5rpx;
    }
  }
  .duration {
    margin-right: auto;
    color: var(--txt-color2);
    font-size: 24rpx;
  }
}
</style>