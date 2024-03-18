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
      this.$emit('playAudio', this.info);
      return
      this.$refs.waveContainer.$el.innerHTML = '';
      // 创建 canvas 元素
      const canvas = document.createElement('canvas');
      canvas.style = 'width: 100%; height: 100%;'
      canvas.width = 400;
      canvas.height = 70;
      // 创建音频元素
      const audioElement = document.createElement('audio');
      // audioElement.src = 'https://st-cn.chaojiyuyan.cn/upload/user_task/dub/02/2/2_79_1706850603_78724.mp3'; // 设置音频文件路径
      audioElement.src = this.info.dub_url; // 设置音频文件路径
      audioElement.crossOrigin = 'anonymous'; // 设置跨域属性
      // 将 canvas 和音频元素添加到其中
      this.$refs.waveContainer.$el.appendChild(canvas);
      this.$refs.waveContainer.$el.appendChild(audioElement);
      // 获取 canvas 上下文
      const ctx = canvas.getContext('2d');
      // 音频上下文
      const audioContext = new AudioContext();
      const source = audioContext.createMediaElementSource(audioElement);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      // 绘制音频频谱和波形数据
      function draw() {
        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);
        // 清空画布并设置背景色为黑色
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        // 设置频谱柱状的颜色为白色
        ctx.fillStyle = 'white';
        // 检查是否有音频数据可用
        if (dataArray.some(value => value > 0)) {
          const barWidth = (WIDTH / bufferLength) * 2.5;
          let x = 0;
          for (let i = 0; i < bufferLength; i++) {
            const barHeight = dataArray[i] / 2;
            console.log(i, barWidth, barHeight)
            // ctx.fillStyle = `rgb(${barHeight + 100}, 0, 0)`;
            ctx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight);
            x += barWidth + 1;
          }
        }
      }
      // 点击播放按钮时触发
      audioElement.addEventListener('loadedmetadata', function () {
        audioElement.play();
        console.log('音频开始播放');
        draw(); // 开始绘制音频频谱和波形数据
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: var(--bg-color2);
  padding: 20rpx 30rpx 30rpx;
  //border-top: 1rpx solid var(--txt-color2);
  //border-bottom: 1rpx solid var(--txt-color2);
  box-shadow: 0 0 5rpx rgba(255,255,255,.2);
  border-radius: 20rpx;
}
.date {
  color: var(--txt-color1);
  font-size: 28rpx;
  padding-bottom: 20rpx;
}
.content {
  color: var(--txt-color2);
  font-size: 28rpx;
  padding-bottom: 20rpx;
}
.voice-container {
  height: 85rpx;
  border-radius: 100rpx;
  border: 2rpx solid rgba(255,255,255,.1);
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