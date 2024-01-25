<template>
  <page-meta page-style="background: #fff" />
  <view class="page-container">
    <HistoryItem v-for="item in 10" :key="item" @playAudio="handlePlayAudio"></HistoryItem>
    <view class="btn-container">
      <view class="btn-box" @tap="jump">新的合成</view>
    </view>
  </view>
</template>

<script>
import HistoryItem from './components/HistoryItem.vue';
export default {
  components: {
    HistoryItem
  },
  data() {
    return {
      audioContext: null
    }
  },
  methods: {
    jump() {
      uni.$u.route({
        url: 'pages/sound/index'
      })
    },
    handlePlayAudio(context) {
      this.pauseAudio();
      this.stopAudio();
      this.audioContext =  context;
      this.playAudio();
    },
    playAudio() {
      if (this.audioContext) {
        this.audioContext.play();
      }
    },
    pauseAudio() {
      if (this.audioContext) {
        this.audioContext.pause();
      }
    },
    stopAudio() {
      if (this.audioContext) {
        this.audioContext.stop();
      }
    },
    updateTime() {
      if (this.audioContext) {
        this.audioContext.onTimeUpdate(() => {
          this.currentTime = this.audioContext.currentTime.toFixed(2);
        });
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  padding-top: 36rpx;
  padding-bottom: calc(100rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(100rpx + env(safe-area-inset-bottom));
  font-size: 24rpx;
}
.btn-container {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  height: 140rpx;
  padding-top: 20rpx;
  background: rgba(255,255,255,.1);
}
.btn-box {
  width: 50%;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 10rpx;
  font-size: 28rpx;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  position: relative;
  background: #0030DA;
  color: #fff;
  gap: 4rpx;
}
</style>