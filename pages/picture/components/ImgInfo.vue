<template>
  <view class="upload-img-container">
    <view class="img-header" v-if="imgInfo">
      <view>{{imgInfo.width}}*{{imgInfo.height}}</view>
      <view v-if="imgInfo.sizeStr">{{imgInfo.sizeStr}}</view>
      <template v-if="showDownload">
        <view class="down-box" @tap="handleDownload">
          <uni-icons custom-prefix="iconfont-qm" type="icon-qm-download-1" color="#878787" size="20" />
          <text>下载</text>
        </view>
      </template>
      <uni-icons v-if="!showDownload && !generating" custom-prefix="iconfont-qm" type="icon-qm-close" color="#878787" size="20" @tap="$emit('del')" />
    </view>
    <view class="img-el">
      <image :src="src" mode="aspectFit" @tap="previewImage" @load="handleLoad" />
      <view class="generating-box" v-if="generating">
        <view>
          <view class="icon-box">
            <uni-icons custom-prefix="iconfont-qm" type="icon-qm-loading-1" color="#878787" size="40" />
          </view>
          <view>正在生成中</view>
        </view>
      </view>
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
    generating: {
      type: Boolean,
      default: false
    },
    showDownload: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 0
    }
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
      debugger
      this.downLoadVideoOrImgOrAudioFile({src: this.src, fileType: 'image'}).then(res => {
        this.info = res;
      })
    }
  },
  computed: {
    handleDownload() {
      if(this.info.size) {
        this.saveToLocal(this.info);
      } else {
        this.downLoadVideoOrImgOrAudioFile({
          src: this.src,
          fileType: 'image'
        }).then(res => {
          this.saveToLocal(res);
        });
      }
    },
    imgInfo() {
      const {size = 0} = this.info || {};
      const fileSizeInBytes = +(size || this.size) || 0;
      const fileSizeInKB = fileSizeInBytes / 1024;
      const fileSizeInMB = fileSizeInKB / 1024;
      // console.log(`File size: ${fileSizeInBytes} bytes`);
      // console.log(`File size: ${fileSizeInKB} KB`);
      // console.log(`File size: ${fileSizeInMB} MB`);
      const sizeStr = !!fileSizeInBytes && (fileSizeInBytes < 1024 ? `${fileSizeInBytes.toFixed(2)}b` : (fileSizeInKB < 1024 ? `${fileSizeInKB.toFixed(2)}kb` : `${fileSizeInMB.toFixed(2)}mb`))
      return {
        width: this.width,
        height: this.height,
        sizeStr
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.upload-img-container {
  width: 100%;
  border-radius: 6rpx;
  margin-bottom: 16rpx;
  position: relative;
  overflow: hidden;
  border: 1px dashed #ccc;
  background: #f6f6f6;
  box-sizing: border-box;
  padding: 4rpx 30rpx 30rpx;
  .img-header {
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
  .img-el {
    position: relative;
    overflow: hidden;
    border-radius: 6rpx;
    image {
      display: block;
      max-width: 100%;
      margin: 0 auto;
      background: #fff;
    }
    .generating-box {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: #9a9a9a;
      font-size: 30rpx;
      background: rgba(0,0,0,.5);
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