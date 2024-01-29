<template>
  <view class="upload-video-container">
    <view class="video-header" v-if="videoInfo">
      <view>{{videoInfo.width}}*{{videoInfo.height}}</view>
      <view v-if="videoInfo.duration">{{videoInfo.duration}}</view>
      <view class="down-box" @tap="handleDownload">
        <uni-icons custom-prefix="iconfont-qm" type="icon-qm-download-1" color="#878787" size="20" />
        <text>下载</text>
      </view>
    </view>
    <view class="pictrue-box">
      <video class="video-box" object-fit="contain" :src="src" @loadedmetadata="loadedmetadata" />
    </view>
  </view>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      width: '',
      height: '',
      duration: ''
    }
  },
  methods: {
    loadedmetadata(res) {
      const {width, height, duration} = res.detail || {};
      debugger
      this.width = width;
      this.height = height;
      this.duration = duration;
    },
    handleDownload() {
      console.log('视频:视频下载')
      this.downLoadVideoOrImgOrAudioFile({
        src: this.src,
        fileType: 'video'
      }).then(res => {
        this.saveToLocal(res);
      });
    },
  },
  computed: {
    videoInfo() {
      return {
        width: this.width,
        height: this.height,
        duration: `${(this.duration || 0).toFixed(2)}秒`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-video-container {
  width: 100%;
  border-radius: 6rpx;
  margin-bottom: 16rpx;
  position: relative;
  overflow: hidden;
  border: 1px dashed #ccc;
  background: #f6f6f6;
  box-sizing: border-box;
  padding: 4rpx 30rpx 30rpx;
  .video-header {
    height: 80rpx;
    display: flex;
    align-items: center;
    gap: 50rpx;
    font-size: 24rpx;
    color: #7b7b7b;
    .icon-qm-close {
      margin-left: auto;
    }
  }
}
.down-box {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 4rpx;
  font-size: 24rpx;
}
.pictrue-box {
  background-color: #E0D4C9;
  aspect-ratio: 16 / 9;
  .video-box {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>