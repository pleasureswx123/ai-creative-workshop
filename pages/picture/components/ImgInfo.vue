<template>
  <view class="upload-img-container">
    <view class="img-header" v-if="imgInfo">
      <view>{{imgInfo.width}}*{{imgInfo.height}}</view>
      <view v-if="showDownload" class="down-box" @tap="handleDownload">
        <uni-icons custom-prefix="iconfont-qm" type="icon-qm-download-1" color="var(--txt-color2)" size="20" />
        <text>下载</text>
      </view>
      <uni-icons v-if="!showDownload && !generating" custom-prefix="iconfont-qm" type="icon-qm-close" color="var(--txt-color2)" size="20" @tap="$emit('del')" />
    </view>
    <view class="img-el">
      <image :key="src" :src="src" mode="aspectFit" @tap="previewImage" @load="handleLoad" />
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
      info: {}
    }
  },
  methods: {
    previewImage() {
      uni.previewImage({
        urls: [this.src]
      });
    },
    handleLoad(res) {
      const {width, height} = res.detail || {};
      this.width = width;
      this.height = height;
    },
    handleDownload() {
      this.downLoadFile(this.src);
    },
  },
  computed: {
    imgInfo() {
      // const {size = 0} = this.info || {};
      // const fileSizeInBytes = +(size || this.size) || 0;
      // const fileSizeInKB = fileSizeInBytes / 1024;
      // const fileSizeInMB = fileSizeInKB / 1024;
      // console.log(`File size: ${fileSizeInBytes} bytes`);
      // console.log(`File size: ${fileSizeInKB} KB`);
      // console.log(`File size: ${fileSizeInMB} MB`);
      // const sizeStr = !!fileSizeInBytes && (fileSizeInBytes < 1024 ? `${fileSizeInBytes.toFixed(2)}b` : (fileSizeInKB < 1024 ? `${fileSizeInKB.toFixed(2)}kb` : `${fileSizeInMB.toFixed(2)}mb`))
      return {
        width: this.width,
        height: this.height,
        // sizeStr
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-img-container {
  width: 100%;
  border-radius: 6rpx;
  margin-bottom: 16rpx;
  position: relative;
  overflow: hidden;
  border: 1px dashed var(--txt-color3);
  background: var(--bg-color2);
  box-sizing: border-box;
  padding: 4rpx 30rpx 30rpx;
  .img-header {
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
  .img-el {
    position: relative;
    overflow: hidden;
    border-radius: 6rpx;
    image {
      display: block;
      max-width: 100%;
      margin: 0 auto;
      background: var(--bg-color2);
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
</style>