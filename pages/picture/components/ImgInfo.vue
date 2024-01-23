<template>
  <view class="upload-img-container">
    <view class="img-header" v-if="imgInfo">
      <view>{{imgInfo.width}}*{{imgInfo.height}}</view>
      <view>{{imgInfo.size}}</view>
      <uni-icons v-if="isShowClose" custom-prefix="iconfont-qm" type="icon-qm-close" color="#878787" size="20" @tap="() => {!generating && $emit('del')}" />
    </view>
    <view class="img-el">
      <image :src="src" mode="aspectFit" @load="handleLoad" />
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
    isShowClose: {
      type: Boolean,
      default: true
    },
    size: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      width: '',
      height: ''
    }
  },
  methods: {
    handleLoad(res) {
      const {width, height} = res.detail || {};
      this.width = width;
      this.height = height;
    }
  },
  computed: {
    imgInfo() {
      const fileSizeInBytes = +this.size || 0;
      const fileSizeInKB = fileSizeInBytes / 1024;
      const fileSizeInMB = fileSizeInKB / 1024;
      // console.log(`File size: ${fileSizeInBytes} bytes`);
      // console.log(`File size: ${fileSizeInKB} KB`);
      // console.log(`File size: ${fileSizeInMB} MB`);
      const size = fileSizeInBytes < 1024 ? `${fileSizeInBytes.toFixed(2)}b` : (fileSizeInKB < 1024 ? `${fileSizeInKB.toFixed(2)}kb` : `${fileSizeInMB.toFixed(2)}mb`)
      return {
        width: this.width,
        height: this.height,
        size
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
</style>