<template>
  <page-meta page-style="background: #fff" />
  <view class="page-container">
    <HistoryItem v-for="item in 10" :key="item" @playAudio="handlePlayAudio"></HistoryItem>
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
  padding-bottom: calc(10rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(10rpx + env(safe-area-inset-bottom));
  font-size: 24rpx;
}
</style>