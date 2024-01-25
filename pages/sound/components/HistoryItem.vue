<template>
  <view class="container">
    <view class="date">2024-4-15   21:02</view>
    <view class="content">在一个安静的小镇上，人们都在忙碌地过着自己的生活。其中一个普通的小酒馆里，一个神秘而迷人的陌生人走进了门口。他身穿一件古老的黑色外套，看起来异常与众不同。随着他的步伐，所有人都停下手中的动作，目光集中在他身上。</view>
    <view class="voice-container">
      <uni-icons custom-prefix="iconfont-qm" type="icon-qm-speaker1" color="#5d5d5d" size="20" />
      <view class="wave-box">
        <uni-icons custom-prefix="iconfont-qm" type="icon-qm-soundwave" color="#5d5d5d" size="20" />
        <uni-icons class="ml-5" custom-prefix="iconfont-qm" type="icon-qm-soundwave" color="#5d5d5d" size="18" />
        <uni-icons class="ml-5" custom-prefix="iconfont-qm" type="icon-qm-soundwave" color="#5d5d5d" size="20" />
      </view>
      <view class="duration">{{duration}}</view>
      <uni-icons @tap="playAudio" custom-prefix="iconfont-qm" type="icon-qm-play1" color="#0830d9" size="22" />
      <uni-icons @tap="downloadAudio" custom-prefix="iconfont-qm" type="icon-qm-download11" color="#0830d9" size="22" />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      audioUrl: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3',
      audioContext: null,
      currentTime: 0,
      duration: ''
    }
  },
  mounted() {
    this.getDuration();
  },
  beforeDestroy() {
    if (this.audioContext) {
      this.audioContext.destroy();
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
      // this.downLoadVideoOrImgOrAudioFile({
      //   src: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4',
      //   fileType: 'video'
      // });
      // return;
      // this.downLoadVideoOrImgOrAudioFile({
      //   src: 'https://web-assets.dcloud.net.cn/unidoc/zh/uni-app.png',
      //   fileType: 'image'
      // });
      // return
      this.downLoadVideoOrImgOrAudioFile({
        src: this.audioUrl,
        fileType: 'audio'
      });
    },
    playAudio() {
      this.$emit('playAudio', this.audioContext)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #fbfbfb;
  padding: 20rpx 50rpx 30rpx;
  border-top: 1rpx solid #f2f2f2;
  border-bottom: 1rpx solid #f2f2f2;
  margin-bottom: 30rpx;
  box-shadow: 0 0 10rpx #f2f2f2;
}
.date {
  color: #000;
  font-size: 28rpx;
  padding-bottom: 20rpx;
}
.content {
  color: #646060;
  font-size: 28rpx;
  padding-bottom: 40rpx;
}
.voice-container {
  height: 85rpx;
  border-radius: 100rpx;
  border: 1rpx solid #EBEBEB;
  background: #FDFDFD;
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
    color: #7a7a7a;
    font-size: 24rpx;
  }
}
</style>