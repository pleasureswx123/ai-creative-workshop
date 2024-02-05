<template>
  <view class="upload-video-container">
    <view class="video-header" v-if="videoInfo">
      <view>{{videoInfo.width}}*{{videoInfo.height}}</view>
      <view v-if="videoInfo.duration">{{videoInfo.duration}}</view>
      <view v-if="showDownload" class="down-box" @tap="handleDownload">
        <uni-icons custom-prefix="iconfont-qm" type="icon-qm-download-1" color="#878787" size="20" />
        <text>下载</text>
      </view>
      <uni-icons v-if="!showDownload && !generating" custom-prefix="iconfont-qm" type="icon-qm-close" color="var(--txt-color2)" size="30" @tap="$emit('del')" />
    </view>
    <view class="main-con-box">
      <video class="video-box" object-fit="contain" :src="src" @loadedmetadata="loadedmetadata" />
      <Generating v-if="generating"></Generating>
    </view>
  </view>
</template>

<script>
import Generating from './Generating.vue'

export default {
  components: { Generating },
  props: {
    src: {
      type: String,
      required: true
    },
    generating: {
      type: Boolean,
      default: false
    },
    showDownload: {
      type: Boolean,
      default: false
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
      this.width = width;
      this.height = height;
      this.duration = duration;
    },
    handleDownload() {
      this.downLoadFile(this.src);
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
  border: 1px dashed var(--txt-color3);
  background: var(--bg-color2);
  box-sizing: border-box;
  padding: 4rpx 30rpx 30rpx;
  .video-header {
    height: 80rpx;
    display: flex;
    align-items: center;
    gap: 50rpx;
    font-size: 24rpx;
    color: var(--txt-color2);
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
.main-con-box {
  background: var(--bg-color2);
  aspect-ratio: 16 / 9;
  position: relative;
  overflow: hidden;
  .video-box {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>