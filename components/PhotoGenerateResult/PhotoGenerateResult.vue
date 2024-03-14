<template>
  <view class="result-wrapper">
    <view class="result-inner" :style="styleInfo">
      <view class="item" v-for="(src, index) in imgs" :key="index">
        <image @tap.stop="previewImage" :src="src" mode="aspectFit"></image>
      </view>
    </view>
    <view class="img-header" @tap.stop>
      <view class="down-box" @tap="handleDownload">
        <uni-icons custom-prefix="iconfont-qm" type="icon-qm-download-1" color="var(--txt-color2)" size="20" />
        <text>下载</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      imgs: [
          'https://st-cn.chaojiyuyan.cn/upload/user_task/draw/10/10/26514-387039005.png',
          'https://st-cn.chaojiyuyan.cn/upload/user_task/draw/10/10/26514-387039005.png',
          // 'https://st-cn.chaojiyuyan.cn/upload/user_task/draw/10/10/26514-387039005.png',
          // 'https://st-cn.chaojiyuyan.cn/upload/user_task/draw/10/10/26514-387039005.png',
      ]
    }
  },
  methods: {
    previewImage() {
      uni.previewImage({
        urls: this.imgs
      });
    },
    handleDownload() {
      this.imgs.forEach(src => {
        this.downLoadFile(src);
      })
    },
  },
  computed: {
    imgNums() {
      return this.imgs.length;
    },
    styleInfo() {
      const {windowWidth} = uni.getSystemInfoSync();
      let columnCount = 1;
      if(750 < windowWidth) {
        columnCount = this.imgNums;
      } else {
        columnCount = this.imgNums > 1 ? 2 : 1;
      }
      return {
        'grid-template-columns': `repeat(${columnCount}, 1fr)`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.result-wrapper {
  border-radius: 20rpx;
  background: #1F2937;
  box-sizing: border-box;
  border: 2rpx solid #494C55;
  padding: 4rpx;
  margin-bottom: 30rpx;
  position: relative;
}
.result-inner {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 10rpx;
  .item {
    min-width: 0;
    min-height: 300px;
    image {
      width: 100%;
      height: 100%;
    }
  }
}
.img-header {
  background: #303235;
  position: absolute;
  top: 0;
  right: 0;
  padding: 4rpx 20rpx;
  cursor: pointer;
  border-radius: 0 10px;
}


//@media screen and (min-width: 750px) {
//  .branner-imgs-box {
//    grid-template-columns: repeat(2, 1fr);
//  }
//}
//
//@media screen and (min-width: 960px) {
//  .branner-imgs-box {
//    grid-template-columns: repeat(4, 1fr);
//  }
//}
</style>