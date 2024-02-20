<template>
  <view class="try-listen" @tap="play">
    <uni-icons custom-prefix="iconfont-qm" type="icon-qm-volume" color="var(--txt-color2)" size="20" />
    <text>试听</text>
  </view>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      audioContext: null
    }
  },
  watch: {
    url() {
      this.destroyAudio();
    }
  },
  beforeDestroy() {
    this.destroyAudio();
  },
  methods: {
    destroyAudio() {
      if(this.audioContext) {
        this.audioContext.pause();
        this.audioContext.destroy();
        this.audioContext = null;
      }
    },
    play() {
      this.destroyAudio();
      if (!this.url) {
        uni.$u.toast('请选择音色')
        return
      }
      this.audioContext = uni.createInnerAudioContext();
      this.audioContext.src = this.url;
      // 设置音量（范围：0 到 1）
      this.audioContext.volume = 0.5;
      this.audioContext.play();
    }
  }
}
</script>

<style lang="scss" scoped>
.try-listen {
  display: flex;
  align-items: center;
  gap: 4rpx;
  color: var(--txt-color2);
}
</style>